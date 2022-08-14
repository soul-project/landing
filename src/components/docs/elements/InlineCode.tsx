import { Code } from "@chakra-ui/react";

export default function InlineCode({ children }: Props) {
  return <Code mt="0px">{children}</Code>;
}

type Props = {
  children: React.ReactElement[];
};
