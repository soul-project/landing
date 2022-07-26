import React from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";

import { create, CreateArgs, getMyList } from "src/modules/platforms/actions";

import { FormValues } from "./form";
import PlatformFormModal from "./shared/PlatformFormModal";

export default function AddNewPlatformModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutateAsync: createPlatform } = useMutation<any, void, CreateArgs>(
    (args) => create(args),
    {
      onError: (err: any) => {
        toast({
          title: "Platform creation failed.",
          description: err.response.data.constraints
            ? err.response.data.constraints.join(" ")
            : err.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      },
      onSuccess: async () => {
        toast({
          title: "Platform created.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        await queryClient.invalidateQueries(getMyList.key);
        onClose();
      },
    }
  );

  if (!session) return null;

  const handleSubmit = async (values: FormValues) => {
    await createPlatform({
      accessToken: session.accessToken,
      ...values,
    });
  };

  return (
    <PlatformFormModal
      initialValues={{ name: "", redirectUris: [""] }}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
      onClose={onClose}
      title="Create new platform"
    />
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
