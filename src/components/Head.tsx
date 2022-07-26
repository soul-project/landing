import NextHead from "next/head";

export default function Head() {
  return (
    <NextHead>
      <title>Join Soul</title>
      <meta
        name="description"
        content="Soul Network, an identity provider for a federated social media eco-system."
      />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}
