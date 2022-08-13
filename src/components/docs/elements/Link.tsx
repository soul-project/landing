import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Link({ children, href }: Props) {
  if (href && href.startsWith("/")) {
    return (
      <NextLink href={href} passHref>
        <ChakraLink color="soul.pink.200">{children}</ChakraLink>
      </NextLink>
    );
  }

  return (
    <ChakraLink href={href} color="soul.pink.200">
      {children}
    </ChakraLink>
  );
}

type Props = {
  children: React.ReactElement[];
  href?: string;
};
