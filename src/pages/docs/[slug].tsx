import { useEffect } from "react";
import Head from "next/head";
import { Text, Box } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMDXComponent } from "next-contentlayer/hooks";

import { allDocs, Doc } from "contentlayer/generated";
import Page from "src/components/Page";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { DocStyleWrapper } from "src/components/docs/UI";

export async function getStaticPaths() {
  const paths = allDocs.map((doc: Doc) => doc.url);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: any }) {
  const doc = allDocs.find(
    (doc: Doc) => doc._raw.flattenedPath === params.slug
  );
  return { props: { doc } };
}

const DocLayout = ({ doc }: { doc: Doc }) => {
  const { data: session } = useSession();
  const MDXContent = useMDXComponent(doc.body.code);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  // TODO: Create a sidebar to navigate docs pages

  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <Page>
        <NavBar
          onSignIn={() => signIn("soul")}
          onSignOut={signOut}
          isSignedIn={!!session}
        />

        <Box>
          <Text fontSize="3xl">{doc.title}</Text>
        </Box>
        <DocStyleWrapper>
          <MDXContent />
        </DocStyleWrapper>
      </Page>
      <Footer />
    </>
  );
};

export default DocLayout;
