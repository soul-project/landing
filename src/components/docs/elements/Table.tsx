import { TableContainer, Table as ChakraTable } from "@chakra-ui/react";

export default function Table({ children }: Props) {
  return (
    <TableContainer mt="1rem">
      <ChakraTable variant="striped">{children}</ChakraTable>
    </TableContainer>
  );
}

type Props = {
  children: React.ReactElement[];
};
