import { ExternalLinkIcon } from "@chakra-ui/icons";
import { HStack, Link, Text } from "@chakra-ui/react";

export default function EditLink({ href }: Props) {
  return (
    <Link href={href} target="_blank">
      <HStack>
        <ExternalLinkIcon />
        <Text fontWeight="light">Edit this page on GitHub</Text>
      </HStack>
    </Link>
  );
}

type Props = {
  href: string;
};
