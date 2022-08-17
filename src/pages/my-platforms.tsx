import React from "react";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { VStack, useDisclosure } from "@chakra-ui/react";

import Head from "src/components/Head";
import Page from "src/components/Page";
import Footer from "src/components/Footer";
import Navbar from "src/components/Navbar";
import AddNewPlatformModal from "src/components/my-platforms/AddNewPlatformModal";
import Header from "src/components/my-platforms/Header";
import PlatformsList from "src/components/my-platforms/PlatformsList";

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
        <Navbar
          onSignIn={() => signIn("soul")}
          onSignOut={signOut}
          isSignedIn={!!session}
        />
        <VStack alignItems="flex-start">
          <Header onOpen={onOpenAddNewPlatformModal} />
          <PlatformsList />
        </VStack>
      </Page>
      <Footer />
    </>
  );
};

export default MyPlatforms;
