import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Link({
  children,
  href,
}: React.PropsWithChildren<Props>) {
  const commonProps: React.ComponentProps<typeof ChakraLink> = {};

  if (typeof children === "object") {
    commonProps["display"] = "inline-block";
  }

  if (href && href.startsWith("/")) {
    return (
      <NextLink href={href} passHref>
        <ChakraLink color="soul.pink.200" {...commonProps}>
          {children}
        </ChakraLink>
      </NextLink>
    );
  }

  return (
    <ChakraLink
      href={href}
      target="_blank"
      color="soul.pink.light"
      {...commonProps}
    >
      {children}
    </ChakraLink>
  );
}

type Props = {
  href?: string;
};
