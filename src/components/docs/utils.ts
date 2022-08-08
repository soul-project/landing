import { Doc } from "contentlayer/generated";

// TODO: Add position overrides to docs as well
export const sortDocs = (allDocs: Doc[]) => {
  return allDocs.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );
};
