import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

export const DocStyleWrapper = styled(Box)`
  // Global style block
  * {
    margin-top: var(--chakra-space-3);
  }

  // Header styles
  h1 {
    font-size: var(--chakra-fontSizes-3xl);
  }

  h2 {
    font-size: var(--chakra-fontSizes-2xl);
  }

  h3 {
    font-size: var(--chakra-fontSizes-xl);
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
