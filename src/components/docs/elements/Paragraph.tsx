import React from "react";
import { css } from "@emotion/react";

export default function Paragraph({ children }: Props) {
  return (
    <p
      css={css`
        margin-top: 20px;
      `}
    >
      {children}
    </p>
  );
}

type Props = {
  children: React.ReactElement[];
};
