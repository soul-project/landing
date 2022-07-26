import { Button, HStack, Link } from "@chakra-ui/react";

export default function NavBar({ onSignIn, isSignedIn, onSignOut }: Props) {
  return (
    <HStack justifyContent="space-between" padding="32px 0px">
      {isSignedIn && (
        <HStack spacing="16px">
          <Link href="/">Home</Link>
          <Link href="/my-platforms">My platforms</Link>
        </HStack>
      )}
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
