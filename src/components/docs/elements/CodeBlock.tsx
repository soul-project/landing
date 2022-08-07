import React, { useEffect } from "react";
import Prism from "prismjs";

require("prismjs/components/prism-bash");

export default function CodeBlock({ children }: Props) {
  // TODO: Add a code copy functionality and also an auto-fill to fill specific key words
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  console.log(
    "🚀 ~ file: CodeBlock.tsx ~ line 16 ~ CodeBlock ~ children",
    children.props.children
  );

  return <pre>{children}</pre>;
}

type Props = {
  children: React.ReactElement;
};
