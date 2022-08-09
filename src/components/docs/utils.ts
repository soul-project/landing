import { Doc } from "contentlayer/generated";

export const sortDocs = (allDocs: Doc[]) => {
  const sortedDocs = [...allDocs];
  return sortedDocs.sort((a, b) => {
    if (a.sidebarPosition === b.sidebarPosition) {
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    }
    if (a.sidebarPosition && b.sidebarPosition) {
      return a.sidebarPosition - b.sidebarPosition;
    }
    if (a.sidebarPosition === undefined) {
      return -1;
    }
    return 1;
  });
};
