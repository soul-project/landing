import React from "react";
import { OrderedList as ChakraOrderedList } from "@chakra-ui/react";

export default function OrderedList(props: Props) {
  return <ChakraOrderedList {...props} />;
}

type Props = React.ComponentProps<typeof ChakraOrderedList>;
