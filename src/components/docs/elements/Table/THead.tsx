import { Thead } from "@chakra-ui/react";

export default function THead({ children }: Props) {
  return <Thead>{children}</Thead>;
}

type Props = {
  children: React.ReactElement[] | React.ReactElement;
};
