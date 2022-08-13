import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

// TODO: Move these into the individual components themselves and deprecate this
export const DocStyleWrapper = styled(Box)`
  width: 100%;

  // Global style block
  * {
    margin-top: var(--chakra-space-3);
  }

  // List styles

  ul,
  ol {
    margin-left: var(--chakra-space-8);
  }

  li {
    margin-top: var(--chakra-space-1);
  }

  code {
    margin-top: 0px;
  }
`;
