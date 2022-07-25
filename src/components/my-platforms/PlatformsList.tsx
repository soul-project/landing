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
  Button,
  HStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
    <TableContainer w="100%">
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th isNumeric>id</Th>
            <Th>name</Th>
            <Th>platform handle</Th>
            <Th textAlign="right">actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {myPlatformsList.platforms.map((platform, index) => (
            <Tr key={platform.id}>
              <Td isNumeric>{index + 1}</Td>
              <Td>{platform.name}</Td>
              <Td>{platform.nameHandle}</Td>
              <Td w="100%">
                <HStack justifyContent="flex-end">
                  <Button>
                    <EditIcon />
                  </Button>
                  <Button>
                    <DeleteIcon color="red" />
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
