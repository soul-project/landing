import { defineDocumentType, makeSource } from "contentlayer/source-files";

import { getAnchor } from "./src/components/docs/utils";

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the doc",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/docs/${doc._raw.flattenedPath}`,
    },
    headerList: {
      type: "list",
      resolve: (doc) => {
        const regXHeader = /(?<flag>#{1,6})\s+(?<content>.+)/g;
        const headerList = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups: { flag, content } }) => ({
            heading: flag.length,
            content,
            anchorId: getAnchor(content),
          })
        );
        return headerList;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "src/docs",
  documentTypes: [Doc],
});
