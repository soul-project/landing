import { useState } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import NextNProgress from "nextjs-progressbar";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

import theme from "src/theme";
import "src/styles/prism-one-dark.css";

import { firebaseConfig } from "../config/firebaseConfig";

function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  if (typeof window !== undefined && firebaseConfig.apiKey) {
    const app = initializeApp(firebaseConfig);
    isSupported().then((yes) => (yes ? getAnalytics(app) : null));
  }

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ChakraProvider theme={theme}>
            <CSSReset />
            <NextNProgress
              color="var(--chakra-colors-soul-pink-200)"
              options={{ showSpinner: false }}
            />
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
