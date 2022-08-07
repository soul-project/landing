import React from "react";
import { Box, VStack, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { allDocs } from "contentlayer/generated";

export default function Sidebar({ currentDocId }: Props) {
  return (
    <Box
      position="sticky"
      w="280px"
      overflowY="auto"
      top="104px"
      overscrollBehavior="contain"
      flexShrink={0}
    >
      <VStack alignItems="flex-start" spacing="16px">
        <Text fontSize="xl" fontWeight="bold">
          Documentation
        </Text>
        {/* TODO: Add position overrides to docs as well */}
        {allDocs
          .sort((a, b) =>
            a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
          )
          .map((doc) => (
            <NextLink passHref href={doc.url} key={doc._id}>
              <Link
                _hover={{ textDecoration: "none" }}
                fontWeight={currentDocId === doc._id ? "bold" : "normal"}
              >
                {doc.title}
              </Link>
            </NextLink>
          ))}
      </VStack>
    </Box>
  );
}

type Props = {
  currentDocId: string;
};
