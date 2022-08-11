import { useEffect } from "react";
import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { NextPage } from "next";
import Image from "next/image";

import Footer from "src/components/Footer";
import Head from "src/components/Head";
import Page from "src/components/Page";
import CTAContent from "src/components/index/CTAContent";
import Navbar from "src/components/Navbar";
import AccessTokenModal from "src/components/index/AccessTokenModal";

import Logo from "../../public/logo.png";

import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(ctx: any) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  return {
    props: {
      session: session ? { ...session, error: session.error ?? null } : null,
    },
  };
}

const Home: NextPage = () => {
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
        <Navbar
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
              username={session?.user.username}
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
