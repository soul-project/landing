import { Box, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

import Footer from "components/Footer";
import Head from "components/Head";
import Page from "components/Page";
// import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head />
      <Page>
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="5xl" fontWeight="bold" color="white">
            Hello World
          </Text>
        </Box>
      </Page>
      <Footer />
    </div>
  );
};

export default Home;
