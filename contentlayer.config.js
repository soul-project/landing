import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

function getAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/((\s*\S+)*)\s*/, "$1")
    .replace(/[ ]/g, "-");
}

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
        const headings = Array.from(doc.body.raw.matchAll(regXHeader));
        const headingsMap = {};
        const headerList = headings.map((headingNode) => {
          const {
            groups: { flag, content },
          } = headingNode;

          const rawAnchor = getAnchor(content);

          let anchorId = rawAnchor;
          if (rawAnchor in headingsMap) {
            anchorId = `${rawAnchor}-${headingsMap[rawAnchor] + 1}`;
            headingsMap[rawAnchor]++;
          } else {
            headingsMap[rawAnchor] = 0;
          }
          return {
            heading: flag.length,
            content,
            anchorId,
          };
        });

        return headerList;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "src/docs",
  documentTypes: [Doc],
  mdx: { rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings] },
});