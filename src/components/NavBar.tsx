import { Button, HStack } from "@chakra-ui/react";

export default function NavBar({ onSignIn, status, onSignOut }: Props) {
  return (
    <HStack justifyContent="flex-end" padding="32px 0px">
      <Button
        variant="link"
        onClick={() => (status === "authenticated" ? onSignOut() : onSignIn())}
        isLoading={status === "loading"}
      >
        {status === "authenticated" ? "Logout" : "Login"}
      </Button>
    </HStack>
  );
}

type Props = {
  onSignIn: () => void;
  onSignOut: () => void;
  status: "authenticated" | "loading" | "unauthenticated";
};
