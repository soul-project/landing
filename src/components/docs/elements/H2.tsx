import React from "react";

import Header from "./Header";

function H2({ children }: Props) {
  return (
    <Header fontSize="2xl" mt="3rem">
      {children}
    </Header>
  );
}

type Props = {
  children: React.ReactElement[];
};

export default H2;
