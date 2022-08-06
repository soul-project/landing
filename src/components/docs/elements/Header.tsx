import React from "react";
import { Text, Link, HTMLChakraProps } from "@chakra-ui/react";

export function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}

function Header({ children, fontSize }: Props) {
  const anchor = getAnchor(children);
  const link = `#${anchor}`;
  return (
    <Text id={anchor} fontSize={fontSize} fontWeight="bold">
      <Link
        href={link}
        position="absolute"
        opacity={0}
        transform="translate(-1em, -11px)"
        width="1em"
        _hover={{ opacity: 1 }}
      >
        #
      </Link>
      {children}
    </Text>
  );
}

type Props = {
  children: string;
  fontSize: HTMLChakraProps<"p">["fontSize"];
};

export default Header;
