import React from "react";
import { Code } from "@chakra-ui/react";

export default function InlineCode({ children }: React.PropsWithChildren) {
  return <Code mt="0px">{children}</Code>;
}
