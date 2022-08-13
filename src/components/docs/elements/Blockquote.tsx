import React from "react";
import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";

export default function Blockquote({ children }: Props) {
  return (
    <Box
      padding="0 16px"
      css={css`
        * {
          margin-top: 0px;
        }
      `}
      borderLeft="4px solid var(--chakra-colors-soul-borderGrey)"
      color="soul.mutedGrey"
    >
      {children}
    </Box>
  );
}

type Props = {
  children: React.ReactElement[];
};
