import React from "react";
import { UnorderedList as ChakraUnorderedList } from "@chakra-ui/react";

export default function UnorderedList(props: Props) {
  return <ChakraUnorderedList {...props} />;
}

type Props = React.ComponentProps<typeof ChakraUnorderedList>;
