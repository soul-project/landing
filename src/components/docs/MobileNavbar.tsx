import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Text,
  AccordionPanel,
  HStack,
  Link,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { allDocs } from "contentlayer/generated";

import { sortDocs } from "./utils";

export default function MobileNavbar({ currentDocId }: Props) {
  return (
    <Accordion
      display={["block", "block", "block", "none", "none"]}
      allowMultiple
      w="full"
      position="sticky"
      top="0px"
      zIndex={1}
      bgColor="soul.bgGrey"
    >
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <Text fontSize="2xl">
              <AccordionButton
                padding="16px 0px"
                bg="none"
                _hover={{ bg: "none" }}
              >
                <HStack w="full" spacing="16px">
                  {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                  <Text>Menu</Text>
                </HStack>
              </AccordionButton>
            </Text>
            <AccordionPanel pb="16px" px="0px">
              <VStack alignItems="flex-start" spacing="12px">
                <Text fontWeight="bold" padding="0px 8px">
                  Documentation
                </Text>
                {sortDocs(allDocs).map((doc) => (
                  <NextLink passHref href={doc.url} key={doc._id}>
                    <Link
                      _hover={{ textDecoration: "none" }}
                      fontWeight={currentDocId === doc._id ? "bold" : "normal"}
                      bgColor={
                        currentDocId === doc._id
                          ? "soul.pink.lightTranslucent"
                          : "none"
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
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

type Props = {
  currentDocId: string;
};
