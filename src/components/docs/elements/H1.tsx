import React from "react";

import Header from "./Header";

function H1({ children }: Props) {
  return (
    <Header fontSize="3xl" mt="2rem">
      {children}
    </Header>
  );
}

type Props = {
  children: React.ReactElement[];
};

export default H1;
