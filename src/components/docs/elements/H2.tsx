import React from "react";

import Header from "./Header";

function H2({ children }: Props) {
  return <Header fontSize="2xl">{children}</Header>;
}

type Props = {
  children: string;
};

export default H2;
