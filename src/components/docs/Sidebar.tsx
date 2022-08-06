import React from "react";
import { Box, VStack, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { allDocs } from "contentlayer/generated";

export default function Sidebar({ currentDocId }: Props) {
  return (
    <Box
      position="sticky"
      w="280px"
      height="calc(100vh - 8.125rem)"
      overflowY="auto"
      top="6.5rem"
      overscrollBehavior="contain"
      flexShrink={0}
    >
      <VStack alignItems="flex-start" spacing="16px">
        <Text fontSize="xl" fontWeight="bold">
          Documentation
        </Text>
        {allDocs.map((doc) => (
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
