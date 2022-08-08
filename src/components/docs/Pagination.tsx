import React from "react";
import { VStack, Text, Grid, GridItem, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { allDocs, Doc } from "contentlayer/generated";

import { sortDocs } from "./utils";

function PaginationItem({ title, href, direction }: PaginationItemProps) {
  return (
    <GridItem w="100%" role="group" visibility={href ? "visible" : "hidden"}>
      {href && (
        <NextLink href={href} passHref>
          <Link _hover={{ textDecoration: "none" }}>
            <VStack
              alignItems={direction === "next" ? "flex-end" : "flex-start"}
              padding="16px"
              borderWidth="1px"
              borderColor="soul.borderGrey"
              borderStyle="solid"
              borderRadius="lg"
            >
              <Text>{direction === "next" ? "Next" : "Previous"}</Text>
              <Text
                fontSize="lg"
                fontWeight="bold"
                _groupHover={{ color: "soul.pink.200" }}
              >
                {title}
              </Text>
            </VStack>
          </Link>
        </NextLink>
      )}
    </GridItem>
  );
}

type PaginationItemProps = {
  title: string;
  href?: string;
  direction: "next" | "prev";
};

export default function Pagination({ currentDocId }: Props) {
  const sortedDocs = sortDocs(allDocs);
  const index = sortedDocs.findIndex((doc) => doc._id === currentDocId);

  const prevDoc: Doc | undefined = sortedDocs[index - 1];
  const nextDoc: Doc | undefined = sortedDocs[index + 1];

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
      <PaginationItem
        href={prevDoc?.url}
        direction="prev"
        title={prevDoc?.title}
      />
      <PaginationItem
        href={nextDoc?.url}
        direction="next"
        title={nextDoc?.title}
      />
    </Grid>
  );
}

type Props = {
  currentDocId: string;
};
