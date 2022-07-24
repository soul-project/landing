import React from "react";
import { NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import Head from "src/components/Head";
import Page from "src/components/Page";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";

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

  return (
    <>
      <Head />
      <Page>
        <NavBar
          onSignIn={() => signIn("soul")}
          onSignOut={signOut}
          isSignedIn={!!session}
        />
      </Page>
      <Footer />
    </>
  );
};

export default MyPlatforms;
