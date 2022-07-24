import { Button, HStack, Link } from "@chakra-ui/react";

export default function NavBar({ onSignIn, isSignedIn, onSignOut }: Props) {
  return (
    <HStack justifyContent="flex-end" padding="32px 0px" spacing="16px">
      {isSignedIn && <Link href="/">Home</Link>}

      {isSignedIn && <Link href="/my-platforms">My Platforms</Link>}

      <Button
        variant="link"
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
