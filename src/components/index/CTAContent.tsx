import { Button, Text, Link } from "@chakra-ui/react";

export default function CTAContent() {
  return (
    <>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        textAlign={["center", "center", "left"]}
      >
        Start your journey with us today!
      </Text>
      <Text maxW="500px" textAlign={["center", "center", "left"]}>
        Soul is a user authentication and identity provider built for a
        decentralized social media eco-system. <strong>Join us</strong> now by
        registering, and we&apos;ll keep in touch.
      </Text>
      <p>
        <Link
          href="https://login.soul-network.com/register"
          _hover={{ textDecoration: "initial" }}
          display="inline-block"
        >
          <Button type="button">Join us</Button>
        </Link>
      </p>
    </>
  );
}
