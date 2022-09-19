import { useEffect, useState } from "react";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { NextPage } from "next";

import Footer from "src/components/Footer";
import Head from "src/components/Head";
import Page from "src/components/Page";
import CTAContent from "src/components/index/CTAContent";
import Navbar from "src/components/Navbar";
import AccessTokenModal from "src/components/index/AccessTokenModal";
import { POSITIVE_EMOJIS } from "src/components/constants";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [loginEmoji, setLoginEmoji] = useState(
    POSITIVE_EMOJIS[Math.floor(Math.random() * POSITIVE_EMOJIS.length)]
  );
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

  useEffect(() => {
    setLoginEmoji(
      POSITIVE_EMOJIS[Math.floor(Math.random() * POSITIVE_EMOJIS.length)]
    );
  }, []);

  return (
    <>
      {session && (
        <AccessTokenModal
          isOpen={isAccessTokenModalOpen}
          onClose={onCloseAccessTokenModal}
        />
      )}
      <Head />
      <Page>
        <Navbar hideAccessTokenButton />
        {status !== "loading" && (
          <Stack
            justifyContent="center"
            alignItems="center"
            direction="row"
            margin={["auto auto", "auto auto", "auto 0"]}
          >
            <Stack direction="column" spacing={4} alignItems="center">
              <CTAContent
                username={session?.user.username}
                onShowAccessTokenModal={onOpenAccessTokenModal}
                loginEmoji={loginEmoji}
              />
            </Stack>
          </Stack>
        )}
      </Page>
      <Footer />
    </>
  );
};

export default Home;
