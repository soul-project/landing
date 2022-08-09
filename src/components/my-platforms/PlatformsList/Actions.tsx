import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { HStack, useDisclosure, useToast, IconButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";

import { DestroyArgs, destroy, getMyList } from "src/modules/platforms/actions";

import EditPlatformModal from "./Actions/EditPlatformModal";
import { DeletePlatformDialog } from "./Actions/DeletePlatformDialog";

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
  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onDeleteDialogOpen,
    onClose: onDeleteDialogClose,
  } = useDisclosure();
  const { mutate: destroyPlatform, isLoading } = useMutation<
    any,
    void,
    DestroyArgs
  >((args) => destroy(args), {
    onSuccess: async () => {
      toast({
        title: "Platform deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      await queryClient.invalidateQueries(getMyList.key);
      onDeleteDialogClose();
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
      <DeletePlatformDialog
        isOpen={isDeleteDialogOpen}
        onClose={onDeleteDialogClose}
        isDeleting={isLoading}
        onDelete={() =>
          destroyPlatform({
            accessToken: session!.accessToken,
            platformId,
          })
        }
      />
      <HStack justifyContent="flex-end">
        <IconButton
          icon={<EditIcon mt="0px" />}
          aria-label="Edit platform"
          disabled={!session || platformId === SOUL_PLATFORM_ID}
          onClick={onOpenEditModal}
        />
        <IconButton
          icon={<DeleteIcon color="red" mt="0px" />}
          aria-label="Delete platform"
          disabled={!session || platformId === SOUL_PLATFORM_ID}
          onClick={onDeleteDialogOpen}
        />
      </HStack>
    </>
  );
}

type Props = {
  platformId: number;
};
