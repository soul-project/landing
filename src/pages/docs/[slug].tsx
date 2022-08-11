import { useEffect } from "react";
import { NextPage } from "next";
import { Text, HStack, VStack } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMDXComponent } from "next-contentlayer/hooks";
import dynamic from "next/dynamic";
import { unstable_getServerSession } from "next-auth";

import { allDocs, Doc } from "contentlayer/generated";
import Page from "src/components/Page";
import Head from "src/components/Head";
import Navbar from "src/components/Navbar";
import Footer from "src/components/Footer";
import { DocStyleWrapper } from "src/components/docs/UI";
import Sidebar from "src/components/docs/Sidebar";
import * as elements from "src/components/docs/elements";
import TOCBar from "src/components/docs/TOCBar";
import Pagination from "src/components/docs/Pagination";
import EditLink from "src/components/docs/EditLink";
import MobileNavbar from "src/components/docs/MobileNavbar";

import { authOptions } from "../api/auth/[...nextauth]";

const CodeBlock = dynamic(
  () => import("src/components/docs/elements/CodeBlock"),
  { ssr: false }
);

export async function getServerSideProps(ctx: any) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  const doc = allDocs.find(
    (doc: Doc) => doc._raw.flattenedPath === ctx.params.slug
  );
  return {
    props: {
      session: session ? { ...session, error: session.error ?? null } : null,
      doc,
    },
  };
}

const DocLayout: NextPage<{ doc: Doc }> = ({ doc }) => {
  const { data: session } = useSession();
  const MDXContent = useMDXComponent(doc.body.code);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  return (
    <>
      <Head subTitle="Documentation" />
      <Page>
        <Navbar
          onSignIn={() => signIn("soul")}
          onSignOut={signOut}
          isSignedIn={!!session}
        />
        <VStack w="full" spacing="24px">
          <MobileNavbar currentDocId={doc._id} />
          <HStack
            alignItems="flex-start"
            spacing={["0px", "0px", "0px", "20px", "20px"]}
            w="full"
          >
            <Sidebar currentDocId={doc._id} />
            <VStack alignItems="flex-start" w="100%" spacing="64px">
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
                      li: elements.ListItem,
                      ol: elements.OrderedList,
                      ul: elements.UnorderedList,
                    }}
                  />
                </DocStyleWrapper>
              </VStack>
              {doc.editUrl && <EditLink href={doc.editUrl} />}
              <Pagination currentDocId={doc._id} />
            </VStack>
            <TOCBar headers={doc.headerList} />
          </HStack>
        </VStack>
      </Page>
      <Footer />
    </>
  );
};

export default DocLayout;
