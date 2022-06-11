import { Box, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";

import Footer from "src/components/Footer";
import Head from "src/components/Head";
import Page from "src/components/Page";
import CTAForm from "src/components/index/CTAForm";
import { useWaitlist } from "src/hooks/useWaitlist";

import Logo from "../../public/logo.png";

const Home: NextPage = () => {
  const { isSubmitting, isSuccess, postNewWaitlist } = useWaitlist();

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
            <CTAForm
              isSuccess={isSuccess}
              isSubmitting={isSubmitting}
              submitWaitlist={(email) => postNewWaitlist(email)}
            />
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
