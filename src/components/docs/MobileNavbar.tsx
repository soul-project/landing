import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Text,
  AccordionPanel,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";

import { allDocs } from "contentlayer/generated";

import { sortDocs } from "./utils";
import DocLink from "./Shared/DocLink";

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
