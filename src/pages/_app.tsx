import { useState, useEffect } from "react";
import { ChakraProvider, CSSReset, useToast } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import NextNProgress from "nextjs-progressbar";
import { initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";
import { initializePerformance } from "firebase/performance";
import { onMessage } from "firebase/messaging";
import "@fontsource/snippet";

import theme from "src/theme";
import "src/styles/prism-one-dark.css";
import useFcm from "src/hooks/useFCM";

import { FIREBASE_APP_CONFIG } from "../config/firebaseConfig";

function FCMWrapper({ children }: React.PropsWithChildren<{}>) {
  const toast = useToast();
  const fcmSession = useFcm();

  useEffect(() => {
    if (fcmSession) {
      const { messaging } = fcmSession;
      onMessage(messaging, (message) => {
        toast({
          title: message.notification?.title,
          description: message.notification?.body,
          status: "info",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      });
    }
  }, [fcmSession, toast]);

  return <>{children}</>;
}

function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (
      typeof window !== undefined &&
      FIREBASE_APP_CONFIG.apiKey &&
      process.env.NODE_ENV === "production"
    ) {
      const app = initializeApp(FIREBASE_APP_CONFIG);
      initializeAnalytics(app);
      initializePerformance(app);
    }
  }, []);

  return (
    <SessionProvider
      session={session}
      refetchInterval={1800}
      refetchOnWindowFocus={false}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ChakraProvider theme={theme}>
            <CSSReset />
            <NextNProgress
              color="var(--chakra-colors-soul-pink-200)"
              options={{ showSpinner: false }}
            />
            <FCMWrapper>
              <Component {...pageProps} />
            </FCMWrapper>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
