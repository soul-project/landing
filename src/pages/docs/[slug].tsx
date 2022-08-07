import { useEffect } from "react";
import Head from "next/head";
import { Text, HStack, VStack } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMDXComponent } from "next-contentlayer/hooks";
import dynamic from "next/dynamic";

import { allDocs, Doc } from "contentlayer/generated";
import Page from "src/components/Page";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { DocStyleWrapper } from "src/components/docs/UI";
import Sidebar from "src/components/docs/Sidebar";
import * as elements from "src/components/docs/elements";
import TOCBar from "src/components/docs/TOCBar";

const CodeBlock = dynamic(
  () => import("src/components/docs/elements/CodeBlock"),
  {
    ssr: false,
  }
);

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
        <HStack alignItems="flex-start" spacing="20px">
          <Sidebar currentDocId={doc._id} />
          <VStack alignItems="flex-start" w="100%" flexShrink={2}>
            <Text fontSize="4xl" fontWeight="bold">
              {doc.title}
            </Text>
            <DocStyleWrapper>
              <MDXContent
                components={{
                  pre: CodeBlock,
                  h1: elements.H1,
                  h2: elements.H2,
                  h3: elements.H3,
                }}
              />
              {/* 
                TODO: Try to specify replacement for the lists instead
                https://tomekdev.com/posts/anchors-for-headings-in-mdx
               */}
            </DocStyleWrapper>
          </VStack>
          <TOCBar headers={doc.headerList} />
        </HStack>
      </Page>
      <Footer />
    </>
  );
};

export default DocLayout;
