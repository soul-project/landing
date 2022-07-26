import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { HStack, Button, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";

import { DestroyArgs, destroy, getMyList } from "src/modules/platforms/actions";

import EditPlatformModal from "./Actions/EditPlatformModal";

export default function Actions({ platformId }: Props) {
  const { data: session } = useSession();
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
    onSuccess: () => queryClient.invalidateQueries(getMyList.key),
  });

  return (
    <>
      <EditPlatformModal
        platformId={platformId}
        isOpen={isEditModalOpen}
        onClose={onCloseEditModal}
      />
      <HStack justifyContent="flex-end">
        <Button disabled={!session} onClick={onOpenEditModal}>
          <EditIcon />
        </Button>
        <Button
          disabled={!session}
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
