import { Box, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";

import Footer from "src/components/Footer";
import Head from "src/components/Head";
import Page from "src/components/Page";
import CTAContent from "src/components/index/CTAContent";

import Logo from "../../public/logo.png";

const Home: NextPage = () => {
  return (
    <div>
      <Head />
      <Page>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          margin={["0px auto", "0px auto", ""]}
        >
          <Stack flex="1 1 0" direction="column" spacing={4}>
            <CTAContent />
          </Stack>

          <Box flex="1 1 0" display={["none", "none", "inline-block"]}>
            <Image src={Logo} alt="Soul Logo" placeholder="blur" />
          </Box>
        </Stack>
      </Page>
      <Footer />
    </div>
  );
};

export default Home;
