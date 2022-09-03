import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export default function DocLink({ href, isSelected = false, label }: Props) {
  return (
    <NextLink passHref href={href}>
      <ChakraLink
        _hover={{ textDecoration: "none" }}
        fontWeight={isSelected ? "bold" : "normal"}
        bgColor={isSelected ? "soul.pink.lightTranslucent" : "none"}
        padding="4px 8px"
        w="100%"
        borderRadius="md"
        target={href.startsWith("/") ? undefined : "_blank"}
      >
        {label}
      </ChakraLink>
    </NextLink>
  );
}

type Props = {
  href: string;
  label: string;
  isSelected?: boolean;
};
