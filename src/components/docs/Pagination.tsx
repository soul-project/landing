import React from "react";
import { VStack, Text, Grid, GridItem, Link } from "@chakra-ui/react";
import NextLink from "next/link";

function PaginationItem({ title, href, direction }: PaginationItemProps) {
  return (
    <GridItem w="100%" role="group">
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
    </GridItem>
  );
}

type PaginationItemProps = {
  title: string;
  href: string;
  direction: "next" | "prev";
};

export default function Pagination() {
  // TODO: Implement pagination correctly
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
      <PaginationItem href="/" direction="prev" title="Another topic" />
      <PaginationItem href="/" direction="next" title="Another topic" />
    </Grid>
  );
}
