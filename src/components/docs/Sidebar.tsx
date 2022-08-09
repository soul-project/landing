import React from "react";
import { Box, VStack, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { allDocs } from "contentlayer/generated";

import { sortDocs } from "./utils";

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
          <NextLink passHref href={doc.url} key={doc._id}>
            <Link
              _hover={{ textDecoration: "none" }}
              fontWeight={currentDocId === doc._id ? "bold" : "normal"}
              bgColor={
                currentDocId === doc._id ? "soul.pink.lightTranslucent" : "none"
              }
              padding="4px 8px"
              w="100%"
              borderRadius="md"
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
