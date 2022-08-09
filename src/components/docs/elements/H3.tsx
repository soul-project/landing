import React from "react";

import Header from "./Header";

function H3({ children }: Props) {
  return <Header fontSize="xl">{children}</Header>;
}

type Props = {
  children: React.ReactElement[];
};

export default H3;
