import React from "react";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { VStack, useDisclosure } from "@chakra-ui/react";
import { dehydrate, QueryClient } from "react-query";

import Head from "src/components/Head";
import Page from "src/components/Page";
import Footer from "src/components/Footer";
import Navbar from "src/components/Navbar";
import AddNewPlatformModal from "src/components/my-platforms/AddNewPlatformModal";
import Header from "src/components/my-platforms/Header";
import { getMyList } from "src/modules/platforms/actions";
import PlatformsList from "src/components/my-platforms/PlatformsList";

import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(ctx: any) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
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

  return {
    props: {
      session: { ...session, error: session.error ?? null },
      dehydratedState: dehydrate(queryClient),
    },
  };
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
