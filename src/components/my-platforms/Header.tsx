import { AddIcon } from "@chakra-ui/icons";
import { HStack, Button, Text, Divider } from "@chakra-ui/react";

export default function Header({ onOpen }: Props) {
  // FIXME: how do we handle multiple similar titles
  return (
    <>
      <HStack w="100%" justifyContent="space-between" px="16px">
        <Text fontSize="3xl" fontWeight="bold">
          My platforms
        </Text>
        {/* TODO: Use icon buttons instead */}
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
