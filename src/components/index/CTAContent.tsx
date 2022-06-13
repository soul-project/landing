import { Button, Text, Link, Box, Stack } from "@chakra-ui/react";

export default function CTAContent() {
  return (
    <>
      <Box
        fontSize="4xl"
        fontWeight="bold"
        textAlign={["center", "center", "left"]}
      >
        <Text
          color="soul.blue"
          display="inline-block"
          textDecoration="underline"
        >
          Start your journey
        </Text>{" "}
        <Text display="inline-block">with us today! 🎉</Text>
      </Box>
      <Text maxW="500px" textAlign={["center", "center", "left"]}>
        Soul is a user authentication and identity provider built for a
        decentralized social media eco-system 🤲. <strong>Join us</strong> now
        by registering, and we&apos;ll keep in touch via email.
      </Text>
      <Stack direction="row" justifyContent={["center", "center", "left"]}>
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
        <Link
          href="https://api.soul-network.com/docs"
          _hover={{ textDecoration: "initial" }}
          display="inline-block"
          target="_blank"
        >
          <Button type="button">Integrate with us!</Button>
        </Link>
      </Stack>
    </>
  );
}
