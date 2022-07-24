import React from "react";
import { Spinner, VStack, Text, Center } from "@chakra-ui/react";
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

  if (!myPlatformsList)
    return (
      <Center w="100%" h="100%">
        <Spinner mt="100px" />
      </Center>
    );

  return (
    <VStack alignItems="flex-start" px="16px">
      {myPlatformsList.platforms.map((platform) => (
        <Text key={platform.id}>{platform.name}</Text>
      ))}
    </VStack>
  );
}
