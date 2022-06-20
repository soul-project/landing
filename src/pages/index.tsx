import { Box, Stack } from "@chakra-ui/react";
import { signIn, signOut, getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";

import Footer from "src/components/Footer";
import Head from "src/components/Head";
import Page from "src/components/Page";
import CTAContent from "src/components/index/CTAContent";
import NavBar from "src/components/NavBar";

import Logo from "../../public/logo.png";

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  return {
    props: { session },
  };
}

const Home: NextPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  return (
    <div>
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
            <CTAContent username={session?.user.username} />
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
    </div>
  );
};

export default Home;
