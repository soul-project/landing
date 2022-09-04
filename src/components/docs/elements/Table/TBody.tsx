import { Tbody } from "@chakra-ui/react";

export default function TBody({ children }: Props) {
  return <Tbody>{children}</Tbody>;
}

type Props = {
  children: React.ReactElement[];
};
