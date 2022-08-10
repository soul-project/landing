import { useState } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import NextNProgress from "nextjs-progressbar";

import theme from "src/theme";
import "src/styles/prism-one-dark.css";

function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

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
