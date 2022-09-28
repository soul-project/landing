import NextHead from "next/head";

export default function Head({ subTitle }: Props) {
  return (
    <NextHead>
      <title>{subTitle ? `${subTitle} | Soul` : "Soul"}</title>
      <meta
        name="description"
        content="Soul, an identity provider for a connected social media eco-system."
      />
      <link rel="icon" href="/soul.svg" />
    </NextHead>
  );
}

type Props = {
  subTitle?: string;
};
