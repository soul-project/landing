import NextLink from "next/link";
import {
  Button,
  HStack,
  IconButton,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { LockIcon } from "@chakra-ui/icons";

import AccessTokenModal from "./index/AccessTokenModal";

export default function Navbar({ hideAccessTokenButton }: Props) {
  const { data: session, status } = useSession();
  const {
    isOpen: isAccessTokenModalOpen,
    onOpen: onOpenAccessTokenModal,
    onClose: onCloseAccessTokenModal,
  } = useDisclosure();

  return (
    <>
      <AccessTokenModal
        isOpen={isAccessTokenModalOpen}
        onClose={onCloseAccessTokenModal}
      />

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

          <NextLink passHref href="/docs/getting-started">
            <Link>Docs</Link>
          </NextLink>
        </HStack>
        <HStack>
          {!!session && !hideAccessTokenButton && (
            <>
              <IconButton
                variant="outline"
                icon={<LockIcon />}
                aria-label="Open access token modal"
                onClick={onOpenAccessTokenModal}
                display={["block", "block", "none"]}
              />
              <Button
                variant="outline"
                leftIcon={<LockIcon />}
                onClick={onOpenAccessTokenModal}
                display={["none", "none", "block"]}
              >
                Access token
              </Button>
            </>
          )}

          <Button
            variant="outline"
            onClick={() => (!!session ? signOut() : signIn("soul"))}
            isLoading={status === "loading"}
          >
            {!!session ? "Logout" : "Login"}
          </Button>
        </HStack>
      </HStack>
    </>
  );
}

type Props = {
  hideAccessTokenButton?: boolean;
};
