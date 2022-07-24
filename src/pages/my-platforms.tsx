import React from "react";
import { NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { VStack, useDisclosure } from "@chakra-ui/react";

import Head from "src/components/Head";
import Page from "src/components/Page";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import AddNewPlatformModal from "src/components/my-platforms/AddNewPlatformModal";
import Header from "src/components/my-platforms/Header";

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
  return { props: { session } };
}

const MyPlatforms: NextPage = () => {
  const { data: session } = useSession();
  const {
    isOpen: isAddNewPlatformModalOpen,
    onOpen: onOpenAddNewPlatformModal,
    onClose: onCloseAddNewPlatformModal,
  } = useDisclosure();
  return (
    <>
      <AddNewPlatformModal
        isOpen={isAddNewPlatformModalOpen}
        onClose={onCloseAddNewPlatformModal}
      />
      <Head />
      <Page>
        <NavBar
          onSignIn={() => signIn("soul")}
          onSignOut={signOut}
          isSignedIn={!!session}
        />
        <VStack>
          <Header onOpen={onOpenAddNewPlatformModal} />
        </VStack>
      </Page>
      <Footer />
    </>
  );
};

export default MyPlatforms;
