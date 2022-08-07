import { Box, Text, VStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function TOCBar({ headers }: Props) {
  let largestHeaderLevel = 6;
  return (
    <Box
      position="sticky"
      top="104px"
      right="0px"
      overflowY="auto"
      width="192px"
      flexShrink={0}
      // display={["none", "block"]} // TODO: Fix this and make the sidebar
      // disappear when the window is too small
    >
      <VStack alignItems="flex-start">
        <Text fontWeight="bold">On this page</Text>
        {headers.map(({ content, anchorId, heading }) => {
          let level: number | undefined = undefined;
          if (heading < largestHeaderLevel) {
            largestHeaderLevel = heading;
          } else {
            level = heading;
          }
          return (
            <Box key={anchorId} pl={level && `${level - 1}rem`}>
              <NextLink passHref href={`#${anchorId}`}>
                <Link display="inline">
                  <Text>{content}</Text>
                </Link>
              </NextLink>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}

type Props = {
  headers: { heading: number; content: string; anchorId: string }[];
};
