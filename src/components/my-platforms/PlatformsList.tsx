import React from "react";
import { Spinner, VStack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

import { getMyList } from "src/modules/platforms/actions";

export default function PlatformsList() {
  const { data: session } = useSession();

  const args = {
    accessToken: session!.accessToken,
  };

  const { data: myPlatformsList } = useQuery([getMyList.key, args], () =>
    getMyList(args)
  );

  if (!myPlatformsList) return <Spinner />;

  return (
    <VStack alignItems="flex-start" px="16px">
      {myPlatformsList.platforms.map((platform) => (
        <Text key={platform.id}>{platform.name}</Text>
      ))}
    </VStack>
  );
}
