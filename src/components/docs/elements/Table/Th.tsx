import { Th as ChakraTh } from "@chakra-ui/react";

export default function Th({ children }: Props) {
  return <ChakraTh>{children}</ChakraTh>;
}

type Props = {
  children: React.ReactElement[] | React.ReactElement;
};
