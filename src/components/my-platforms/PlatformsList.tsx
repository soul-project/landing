import React from "react";
import {
  Spinner,
  Center,
  TableContainer,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

import { getMyList } from "src/modules/platforms/actions";

import Actions from "./PlatformsList/Actions";

export default function PlatformsList() {
  const { data: session } = useSession();

  const args = {
    accessToken: session?.accessToken,
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
    <TableContainer w="100%">
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th isNumeric>id</Th>
            <Th>name</Th>
            <Th>platform handle</Th>
            <Th>created at</Th>
            <Th>updated at</Th>
            <Th textAlign="right">actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {myPlatformsList.platforms.map((platform, index) => (
            <Tr key={platform.id}>
              <Td isNumeric>{index + 1}</Td>
              <Td>{platform.name}</Td>
              <Td>{platform.nameHandle}</Td>
              <Td>{new Date(platform.createdAt).toLocaleString()}</Td>
              <Td>{new Date(platform.updatedAt).toLocaleString()}</Td>
              <Td w="100%">
                <Actions platformId={platform.id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
