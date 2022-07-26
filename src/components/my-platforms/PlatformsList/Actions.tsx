import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { HStack, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";

import { DestroyArgs, destroy, getMyList } from "src/modules/platforms/actions";

import EditPlatformModal from "./Actions/EditPlatformModal";

const SOUL_PLATFORM_ID = 2;

export default function Actions({ platformId }: Props) {
  const { data: session } = useSession();
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    isOpen: isEditModalOpen,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const { mutate: destroyPlatform, isLoading } = useMutation<
    any,
    void,
    DestroyArgs
  >((args) => destroy(args), {
    onSuccess: () => {
      toast({
        title: "Platform deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      queryClient.invalidateQueries(getMyList.key);
    },
    onError: () => {
      toast({
        title: "Platform deletion failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });

  return (
    <>
      <EditPlatformModal
        platformId={platformId}
        isOpen={isEditModalOpen}
        onClose={onCloseEditModal}
      />
      <HStack justifyContent="flex-end">
        <Button
          disabled={!session || platformId === SOUL_PLATFORM_ID}
          onClick={onOpenEditModal}
        >
          <EditIcon />
        </Button>
        <Button
          disabled={!session || platformId === SOUL_PLATFORM_ID}
          isLoading={isLoading}
          onClick={() =>
            destroyPlatform({
              accessToken: session!.accessToken,
              platformId,
            })
          }
        >
          <DeleteIcon color="red" />
        </Button>
      </HStack>
    </>
  );
}

type Props = {
  platformId: number;
};
