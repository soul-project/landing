import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";

import theme from "src/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
