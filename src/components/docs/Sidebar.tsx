import React from "react";
import { Box, VStack, Text, Divider } from "@chakra-ui/react";

import { allDocs } from "contentlayer/generated";

import { sortDocs } from "./utils";
import DocLink from "./Shared/DocLink";

export default function Sidebar({ currentDocId }: Props) {
  return (
    <Box
      position="sticky"
      w="280px"
      overflowY="auto"
      top="104px"
      overscrollBehavior="contain"
      flexShrink={0}
      display={["none", "none", "none", "block", "block"]}
    >
      <VStack alignItems="flex-start" spacing="12px">
        <Text fontSize="xl" fontWeight="bold" padding="0px 8px">
          Documentation
        </Text>
        {sortDocs(allDocs).map((doc) => (
          <DocLink
            href={doc.url}
            key={doc._id}
            isSelected={currentDocId === doc._id}
            label={doc.title}
          />
        ))}
        <Divider />
        <DocLink
          href="https://api.soul-network.com/docs"
          label="API References"
        />
      </VStack>
    </Box>
  );
}

type Props = {
  currentDocId: string;
};
