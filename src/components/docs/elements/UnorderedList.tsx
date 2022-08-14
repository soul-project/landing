import React from "react";
import { UnorderedList as ChakraUnorderedList } from "@chakra-ui/react";

export default function UnorderedList(props: Props) {
  return <ChakraUnorderedList ml="8" {...props} />;
}

type Props = React.ComponentProps<typeof ChakraUnorderedList>;
