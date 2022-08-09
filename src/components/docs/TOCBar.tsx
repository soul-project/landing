import React from "react";
import { Box, Text, VStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import useHeadingsObserver from "./hooks/useHeadingsObserver";

export default function TOCBar({ headers }: Props) {
  let largestHeaderLevel = 6;
  const { activeId } = useHeadingsObserver({
    anchorIds: headers.map(({ anchorId }) => anchorId),
  });

  return (
    <Box
      position="sticky"
      top="104px"
      right="0px"
      overflowY="auto"
      width="256px"
      flexShrink={0}
      display={["none", "none", "none", "none", "block"]}
    >
      <VStack alignItems="flex-start" spacing="16px">
        <Text fontWeight="bold">On this page</Text>
        <VStack alignItems="flex-start">
          {headers.map(({ content, anchorId, heading }) => {
            let level: number | undefined = undefined;
            if (heading < largestHeaderLevel) {
              largestHeaderLevel = heading;
            } else {
              level = heading - largestHeaderLevel;
            }
            return (
              <Box key={anchorId} pl={level && `${level}rem`}>
                <NextLink passHref href={`#${anchorId}`}>
                  <Link
                    display="inline"
                    onClick={(e) => {
                      e.preventDefault();
                      document?.querySelector(`#${anchorId}`) &&
                        document.querySelector(`#${anchorId}`)!.scrollIntoView({
                          behavior: "smooth",
                        });
                    }}
                  >
                    <Text
                      fontWeight={activeId === anchorId ? "bold" : "normal"}
                    >
                      {content}
                    </Text>
                  </Link>
                </NextLink>
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
}

type Props = {
  headers: { heading: number; content: string; anchorId: string }[];
};
