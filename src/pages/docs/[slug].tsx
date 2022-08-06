import { useEffect } from "react";
import Head from "next/head";
import { Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMDXComponent } from "next-contentlayer/hooks";

import { allDocs, Doc } from "contentlayer/generated";
import Page from "src/components/Page";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";

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

        <div>
          <Text fontSize="3xl">{doc.title}</Text>
        </div>
        <MDXContent />
      </Page>
      <Footer />
    </>
  );
};

export default DocLayout;
