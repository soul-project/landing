import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

export const DocStyleWrapper = styled(Box)`
  width: 100%;

  // Global style block
  * {
    margin-top: var(--chakra-space-3);
  }

  // Header styles
  h1 {
    font-size: var(--chakra-fontSizes-3xl);
    font-weight: bold;
  }

  h2 {
    font-size: var(--chakra-fontSizes-2xl);
    font-weight: bold;
  }

  h3 {
    font-size: var(--chakra-fontSizes-xl);
    font-weight: bold;
  }

  // List styles

  ul,
  ol {
    margin-left: var(--chakra-space-8);
  }

  li {
    margin-top: var(--chakra-space-1);
  }
`;
