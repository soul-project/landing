import NextLink from "next/link";
import { Button, HStack, Link } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <HStack
      justifyContent="space-between"
      padding="32px 0px"
      position={["initial", "initial", "initial", "sticky", "sticky"]}
      top="0px"
      bgColor="soul.bgGrey"
      zIndex={1}
    >
      <HStack spacing="16px">
        <NextLink passHref href="/">
          <Link>Home</Link>
        </NextLink>

        {!!session && (
          <NextLink passHref href="/my-platforms">
            <Link>Platforms</Link>
          </NextLink>
        )}

        <NextLink passHref href="/docs/getting-started">
          <Link>Docs</Link>
        </NextLink>
      </HStack>
      <Button
        variant="outline"
        onClick={() => (!!session ? signOut() : signIn("soul"))}
        isLoading={status === "loading"}
      >
        {!!session ? "Logout" : "Login"}
      </Button>
    </HStack>
  );
}
