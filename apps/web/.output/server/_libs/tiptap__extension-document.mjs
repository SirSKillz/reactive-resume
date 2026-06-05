import { a as Node3 } from "./@tiptap/core+[...].mjs";
//#region ../../node_modules/.pnpm/@tiptap+extension-document@_a6d5a83c4f35f5a9e65e429bfb973c8c/node_modules/@tiptap/extension-document/dist/index.js
var Document = Node3.create({
	name: "doc",
	topNode: true,
	content: "block+",
	renderMarkdown: (node, h) => {
		if (!node.content) return "";
		return h.renderChildren(node.content, "\n\n");
	}
});
//#endregion
export { Document as t };
