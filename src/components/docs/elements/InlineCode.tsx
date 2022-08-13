import { Code } from "@chakra-ui/react";

export default function InlineCode({ children }: Props) {
  return <Code>{children}</Code>;
}

type Props = {
  children: React.ReactElement[];
};
