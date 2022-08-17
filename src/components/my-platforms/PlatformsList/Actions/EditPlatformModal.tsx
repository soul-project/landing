import { useSession } from "next-auth/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToast } from "@chakra-ui/react";
import { FormikHelpers } from "formik";

import {
  getMyList,
  getPlatform,
  GetPlatformArgs,
  update,
  UpdateArgs,
} from "src/modules/platforms/actions";

import PlatformFormModal from "src/components/my-platforms/shared/PlatformFormModal";
import { FormValues } from "src/components/my-platforms/form";

export default function EditPlatformModal({
  isOpen,
  onClose,
  platformId,
}: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const toast = useToast();

  const getPlatformArgs: GetPlatformArgs = {
    accessToken: session?.accessToken,
    platformId,
  };
  const { data } = useQuery([getPlatform.key, getPlatformArgs], () =>
    getPlatform(getPlatformArgs)
  );
  const { mutateAsync: updatePlatform } = useMutation<any, any, UpdateArgs>(
    (args) => update(args),
    {
      onError: (err: any) => {
        toast({
          title: "Platform update failed.",
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
          title: "Platform updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        await queryClient.invalidateQueries(getMyList.key);
        await queryClient.invalidateQueries([getPlatform.key, getPlatformArgs]);
      },
    }
  );

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    await updatePlatform({
      accessToken: session?.accessToken,
      platformId,
      ...values,
    });
    actions.resetForm({ values });
  };

  if (!session) return null;

  return (
    <PlatformFormModal
      isOpen={isOpen}
      onClose={onClose}
      initialValues={
        data && { redirectUris: data.redirectUris, name: data.name }
      }
      title="Edit platform"
      handleSubmit={handleSubmit}
    />
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  platformId: number;
};
