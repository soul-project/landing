import React from "react";
import { NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { VStack, useDisclosure } from "@chakra-ui/react";
import { dehydrate, QueryClient } from "react-query";

import Head from "src/components/Head";
import Page from "src/components/Page";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import AddNewPlatformModal from "src/components/my-platforms/AddNewPlatformModal";
import Header from "src/components/my-platforms/Header";
import { getMyList } from "src/modules/platforms/actions";
import PlatformsList from "src/components/my-platforms/PlatformsList";

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  const queryClient = new QueryClient();

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }

  const getMyPlatformsListArgs = {
    accessToken: session.accessToken,
  };
  await queryClient.prefetchQuery([getMyList.key, getMyPlatformsListArgs], () =>
    getMyList(getMyPlatformsListArgs)
  );

  return { props: { session, dehydratedState: dehydrate(queryClient) } };
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
