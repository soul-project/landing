import React, { useEffect } from "react";
import Prism from "prismjs";

require("prismjs/components/prism-bash");

export default function CodeBlock({ children }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <>{children}</>;
}

type Props = {
  children: React.ReactNode;
};
