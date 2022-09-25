import { LockIcon } from "@chakra-ui/icons";
import { Button, Text, Link, Box, Stack, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import NextLink from "next/link";

export default function CTAContent({
  session,
  onShowAccessTokenModal,
  loginEmoji,
  onRandomizeLoginEmoji,
}: Props) {
  return (
    <Flex direction="column" alignItems="center">
      <Box fontSize={["4xl", "5xl"]} fontWeight="bold" textAlign="center">
        {session ? (
          <>
            <Text fontFamily="Snippet" fontWeight="900" display="inline">
              Hello,{" "}
            </Text>
            <Text
              color="soul.blue"
              display="inline-block"
              textDecoration="underline"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="70vw"
              verticalAlign="bottom"
            >
              {session?.user.displayName || session?.user.username}
            </Text>{" "}
            <Box as="button" onClick={onRandomizeLoginEmoji}>
              {loginEmoji}
            </Box>
          </>
        ) : (
          <>
            <Text
              color="soul.pink.light"
              display="inline-block"
              textDecoration="underline"
            >
              Start your journey
            </Text>{" "}
            <Text display="inline-block">with us today! 🎉</Text>
          </>
        )}
      </Box>
      <Box fontSize="xl" maxW="600px" textAlign="center" mt="2rem">
        {session ? (
          <Text>
            Soul is a user authentication and identity provider built for a
            connected social media eco-system 🤲. We&apos;ll be in touch with
            you shortly. In the meantime, check out our docs by clicking on{" "}
            <strong>&quot;Get started!&quot;</strong> button below.
          </Text>
        ) : (
          <Text>
            Soul is a user authentication and identity provider built for a
            connected social media eco-system 🤲. <strong>Join us</strong> now
            by registering, and we&apos;ll keep in touch via email.
          </Text>
        )}
      </Box>
      <Stack direction="row" justifyContent="center" mt="3rem">
        {!session && (
          <Link
            href="https://login.soul-network.com/register"
            _hover={{ textDecoration: "initial" }}
            display="inline-block"
          >
            <Button
              type="button"
              bg="soul.pink.light"
              _hover={{ bg: "soul.pink.dark" }}
              _active={{ bg: "soul.pink.dark" }}
            >
              Join us!
            </Button>
          </Link>
        )}
        <NextLink passHref href="/docs/getting-started">
          <Link _hover={{ textDecoration: "initial" }} display="inline-block">
            {session ? (
              <Button
                type="button"
                bg="soul.pink.200"
                _hover={{ bg: "soul.pink.dark" }}
                _active={{ bg: "soul.pink.dark" }}
              >
                Get started!
              </Button>
            ) : (
              <Button type="button">Get started!</Button>
            )}
          </Link>
        </NextLink>
        {session && (
          <Button
            type="button"
            onClick={onShowAccessTokenModal}
            leftIcon={<LockIcon />}
          >
            Access Token
          </Button>
        )}
      </Stack>
    </Flex>
  );
}

type Props = {
  session: Session | null;
  onShowAccessTokenModal: () => void;
  loginEmoji: string;
  onRandomizeLoginEmoji: () => void;
};
