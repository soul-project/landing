import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    soul: {
      pink: {
        light: "#fa4e9d",
        dark: "#B5179E",
        200: "#F72585",
        lightTranslucent: "rgba(247, 37, 133, 0.3)",
      },
      green: { 200: "#02DE7B" },
      blue: "#4CC9F0",
      bgGrey: "#141516",
      borderGrey: "#4d4e4f",
      mutedGrey: "#8b949e",
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "#141516",
      },
    },
  },
});

export default theme;
