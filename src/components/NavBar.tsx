import NextLink from "next/link";
import { Button, HStack, Link } from "@chakra-ui/react";

export default function NavBar({ onSignIn, isSignedIn, onSignOut }: Props) {
  return (
    <HStack
      justifyContent="space-between"
      padding="32px 0px"
      position="sticky"
      top="0px"
      bgColor="soul.bgGrey"
      zIndex={9999}
    >
      <HStack spacing="16px">
        <NextLink passHref href="/">
          <Link>Home</Link>
        </NextLink>

        <NextLink passHref href="/docs/intro">
          <Link>Documentation</Link>
        </NextLink>

        {isSignedIn && (
          <NextLink passHref href="/my-platforms">
            <Link>My platforms</Link>
          </NextLink>
        )}
      </HStack>
      <Button
        variant="outline"
        onClick={() => (isSignedIn ? onSignOut() : onSignIn())}
      >
        {isSignedIn ? "Logout" : "Login"}
      </Button>
    </HStack>
  );
}

type Props = {
  onSignIn: () => void;
  onSignOut: () => void;
  isSignedIn: boolean;
};
