import { Box } from "@chakra-ui/react";
import React from "react";

export default function Page({ children }: React.PropsWithChildren<{}>) {
  return (
    <main>
      <Box
        minHeight="100vh"
        padding={["0px 16px", "0px 32px", "0px 64px"]}
        display="flex"
        flexDirection="column"
        maxW="1500px"
        mt="auto"
        mb="48px"
      >
        {children}
      </Box>
    </main>
  );
}
