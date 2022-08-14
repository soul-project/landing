import React from "react";
import { Text, Link, HTMLChakraProps } from "@chakra-ui/react";

function Header({ children, fontSize, mt }: Props) {
  const anchorElement = children[0];
  return (
    <Text
      id={anchorElement.props.href.substring(1)}
      fontSize={fontSize}
      fontWeight="bold"
      scrollMarginTop="110px"
      role="group"
      mt={mt}
    >
      {children[1]}
      <Link
        href={anchorElement.props.href}
        opacity={0}
        width="1em"
        _groupHover={{ opacity: 1 }}
        aria-hidden={true}
        tabIndex={-1}
        pl="8px"
        color="soul.pink.200"
      >
        #
      </Link>
    </Text>
  );
}

type Props = {
  children: React.ReactElement[];
  fontSize: HTMLChakraProps<"p">["fontSize"];
  mt: HTMLChakraProps<"p">["mt"];
};

export default Header;
