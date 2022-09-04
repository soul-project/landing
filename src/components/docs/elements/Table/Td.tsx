import { Td as ChakraTd } from "@chakra-ui/react";

export default function Td({ children }: Props) {
  return <ChakraTd>{children}</ChakraTd>;
}

type Props = {
  children: React.ReactElement[] | React.ReactElement;
};
