import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import { signIn, signOut, getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import axios from "axios";

import Footer from "src/components/Footer";
import Head from "src/components/Head";
import Page from "src/components/Page";
import CTAContent from "src/components/index/CTAContent";
import NavBar from "src/components/NavBar";
import AccessTokenModal from "src/components/index/AccessTokenModal";

import Logo from "../../public/logo.png";

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  if (!session) {
    return { props: {} };
  }

  try {
    const { data: user } = await axios.get<{
      id: number;
      username: string;
      user_handle: string;
    }>("https://api.soul-network.com/v1/users/me", {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    return {
      props: {
        session,
        user: {
          id: user.id,
          username: user.username,
          userHandle: user.user_handle,
        },
      },
    };
  } catch (_err) {
    return { props: {} };
  }
}

const Home: NextPage<Props> = ({ user }) => {
  const { data: session } = useSession();
  const {
    isOpen: isAccessTokenModalOpen,
    onOpen: onOpenAccessTokenModal,
    onClose: onCloseAccessTokenModal,
  } = useDisclosure();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  return (
    <>
      <AccessTokenModal
        isOpen={isAccessTokenModalOpen}
        onClose={onCloseAccessTokenModal}
        accessToken={session?.accessToken || ""}
      />
      <Head />
      <Page>
        <NavBar
          onSignIn={() => signIn("soul")}
          onSignOut={signOut}
          isSignedIn={!!session}
        />
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          margin={["auto auto", "auto auto", "auto 0"]}
        >
          <Stack flex="1 1 0" direction="column" spacing={4}>
            <CTAContent
              username={user?.username}
              onShowAccessTokenModal={onOpenAccessTokenModal}
            />
          </Stack>

          <Box
            flex="1 1 0"
            display={["none", "none", "inline-block"]}
            maxWidth="620px"
          >
            <Image src={Logo} alt="Soul Logo" placeholder="blur" />
          </Box>
        </Stack>
      </Page>
      <Footer />
    </>
  );
};

export default Home;

type Props = {
  user?: {
    id: number;
    username: string;
    userHandle: string;
  };
};
