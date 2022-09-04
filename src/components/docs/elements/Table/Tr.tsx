import { Tr as ChakraTr } from "@chakra-ui/react";

export default function Tr({ children }: Props) {
  return <ChakraTr>{children}</ChakraTr>;
}

type Props = {
  children: React.ReactElement[] | React.ReactElement;
};
