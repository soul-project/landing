import { AddIcon } from "@chakra-ui/icons";
import { HStack, Text, Divider, IconButton } from "@chakra-ui/react";

export default function Header({ onOpen }: Props) {
  return (
    <>
      <HStack w="100%" justifyContent="space-between" px="16px">
        <Text fontSize="3xl" fontWeight="bold">
          My platforms
        </Text>
        <IconButton
          icon={<AddIcon mt="0px" />}
          aria-label="Add new platform"
          onClick={onOpen}
        />
      </HStack>
      <Divider />
    </>
  );
}

type Props = {
  onOpen: () => void;
};
