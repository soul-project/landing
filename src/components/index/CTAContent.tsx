import { Button, Text, Link, Box, Stack } from "@chakra-ui/react";

export default function CTAContent({
  username,
  onShowAccessTokenModal,
}: Props) {
  return (
    <>
      <Box
        fontSize="4xl"
        fontWeight="bold"
        textAlign={["center", "center", "left"]}
      >
        {username ? (
          <>
            Hello,{" "}
            <Text
              color="soul.blue"
              display="inline-block"
              textDecoration="underline"
            >
              {username}
            </Text>{" "}
            ❤️
          </>
        ) : (
          <>
            <Text
              color="soul.blue"
              display="inline-block"
              textDecoration="underline"
            >
              Start your journey
            </Text>{" "}
            <Text display="inline-block">with us today! 🎉</Text>
          </>
        )}
      </Box>
      {username ? (
        <Text maxW="500px" textAlign={["center", "center", "left"]}>
          Soul is a user authentication and identity provider built for a
          federated social media eco-system 🤲. We&apos;ll be in touch with you
          shortly. In the meantime, check out our docs by clicking on{" "}
          <strong>&quot;Integrate with us!&quot;</strong> button below.
        </Text>
      ) : (
        <Text maxW="500px" textAlign={["center", "center", "left"]}>
          Soul is a user authentication and identity provider built for a
          federated social media eco-system 🤲. <strong>Join us</strong> now by
          registering, and we&apos;ll keep in touch via email.
        </Text>
      )}
      <Stack direction="row" justifyContent={["center", "center", "left"]}>
        {!username && (
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
        <Link
          href="https://api.soul-network.com/docs"
          _hover={{ textDecoration: "initial" }}
          display="inline-block"
          target="_blank"
        >
          <Button type="button">Integrate with us!</Button>
        </Link>
        {username && (
          <Button type="button" onClick={onShowAccessTokenModal}>
            Access Token
          </Button>
        )}
      </Stack>
    </>
  );
}

type Props = {
  username?: string;
  onShowAccessTokenModal: () => void;
};
