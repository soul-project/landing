import React from "react";
import { ListItem as ChakraListItem } from "@chakra-ui/react";

export default function ListItem(props: Props) {
  return <ChakraListItem {...props} />;
}

type Props = React.ComponentProps<typeof ChakraListItem>;
