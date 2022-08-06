import { useEffect } from "react";
import Head from "next/head";
import { Text, Box, HStack, VStack } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMDXComponent } from "next-contentlayer/hooks";

import { allDocs, Doc } from "contentlayer/generated";
import Page from "src/components/Page";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { DocStyleWrapper } from "src/components/docs/UI";
import Sidebar from "src/components/docs/Sidebar";

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
        <HStack alignItems="flex-start" spacing="20px">
          <Sidebar currentDocId={doc._id} />
          <VStack alignItems="flex-start" w="100%" flexShrink={2}>
            <Text fontSize="3xl" fontWeight="bold">
              {doc.title}
            </Text>
            <DocStyleWrapper>
              <MDXContent />
            </DocStyleWrapper>
          </VStack>
        </HStack>
      </Page>
      <Footer />
    </>
  );
};

export default DocLayout;
