import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { HStack, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";

import { DestroyArgs, destroy, getMyList } from "src/modules/platforms/actions";

export default function Actions({ platformId }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { mutate: destroyPlatform, isLoading } = useMutation<
    any,
    void,
    DestroyArgs
  >((args) => destroy(args), {
    onSuccess: () => queryClient.invalidateQueries(getMyList.key),
  });

  return (
    <HStack justifyContent="flex-end">
      <Button disabled={!session}>
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
  );
}

type Props = {
  platformId: number;
};
