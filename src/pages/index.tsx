import { Box, Stack } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { NextPage } from "next";
import Image from "next/image";

import Footer from "src/components/Footer";
import Head from "src/components/Head";
import Page from "src/components/Page";
import CTAContent from "src/components/index/CTAContent";
import NavBar from "src/components/NavBar";

import Logo from "../../public/logo.png";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <Head />
      <Page>
        <NavBar
          onSignIn={() => signIn("soul")}
          onSignOut={signOut}
          status={status}
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
