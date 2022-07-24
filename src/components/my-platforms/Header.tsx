import { AddIcon } from "@chakra-ui/icons";
import { HStack, Button, Text, Divider } from "@chakra-ui/react";

export default function Header({ onOpen }: Props) {
  return (
    <>
      <HStack w="100%" justifyContent="space-between" px="16px">
        <Text fontSize="3xl" fontWeight="bold">
          My Platforms
        </Text>
        <Button onClick={onOpen}>
          <AddIcon />
        </Button>
      </HStack>
      <Divider />
    </>
  );
}

type Props = {
  onOpen: () => void;
};
