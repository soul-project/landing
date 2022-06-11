import React from "react";

export default function Page({ children }: React.PropsWithChildren<{}>) {
  return <main>{children}</main>;
}
