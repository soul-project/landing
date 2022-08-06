import Head from "next/head";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

import { allDocs, Doc } from "contentlayer/generated";

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
  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <article>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div>
          <Text fontSize="3xl">{doc.title}</Text>
        </div>
        <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
      </article>
    </>
  );
};

export default DocLayout;
