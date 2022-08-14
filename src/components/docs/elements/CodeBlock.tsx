import React, { useEffect } from "react";
import Prism from "prismjs";
import reactStringReplace from "react-string-replace";
import { Box, IconButton, useClipboard } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";

require("prismjs/components/prism-bash");

const ACCESS_TOKEN_SYMBOL = "<ACCESS_TOKEN>";

export default function CodeBlock({ children }: Props) {
  // TODO:  Maybe do the reactStrigngReplace after this component so that the
  // button will not be replaced

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const { data: session } = useSession();

  const { hasCopied, onCopy } = useClipboard(
    children.props.children.replace(
      ACCESS_TOKEN_SYMBOL,
      session?.accessToken || ACCESS_TOKEN_SYMBOL
    )
  );
  const processedSnippet = reactStringReplace(
    children.props.children,
    ACCESS_TOKEN_SYMBOL,
    (match) => session?.accessToken || match
  );

  return (
    <Box position="relative" role="group" mt="8">
      <IconButton
        aria-label="Copy code snippet"
        icon={
          hasCopied ? (
            <CheckIcon mt="0px" color="soul.green.200" />
          ) : (
            <CopyIcon mt="0px" />
          )
        }
        position="absolute"
        right="0px"
        m="8px"
        onClick={onCopy}
        _groupHover={{ opacity: 1 }}
        opacity={hasCopied ? 1 : 0}
      />
      <pre className={children.props.className}>
        <code className={children.props.className}>{processedSnippet}</code>
      </pre>
    </Box>
  );
}

type Props = {
  children: React.ReactElement;
};
