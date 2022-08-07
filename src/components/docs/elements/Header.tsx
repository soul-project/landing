import React from "react";
import { Text, Link, HTMLChakraProps } from "@chakra-ui/react";

function Header({ children, fontSize }: Props) {
  const anchorElement = children[0];
  return (
    <Text
      id={anchorElement.props.href.substring(1)}
      fontSize={fontSize}
      fontWeight="bold"
      position="relative"
      scrollMarginTop="110px"
    >
      <Link
        href={anchorElement.props.href}
        position="absolute"
        opacity={0}
        transform="translate(-1em, -11px)"
        width="1em"
        _hover={{ opacity: 1 }}
        aria-hidden={true}
        tabIndex={-1}
      >
        #
      </Link>
      {children[1]}
    </Text>
  );
}

type Props = {
  children: React.ReactElement[];
  fontSize: HTMLChakraProps<"p">["fontSize"];
};

export default Header;
