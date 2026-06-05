import { E as mergeAttributes, a as Node3, j as wrappingInputRule, t as h } from "./@tiptap/core+[...].mjs";
//#region ../../node_modules/.pnpm/@tiptap+extension-blockquot_82a9b745271abce1b06c4c7697a80291/node_modules/@tiptap/extension-blockquote/dist/index.js
var inputRegex = /^\s*>\s$/;
var Blockquote = Node3.create({
	name: "blockquote",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	content: "block+",
	group: "block",
	defining: true,
	parseHTML() {
		return [{ tag: "blockquote" }];
	},
	renderHTML({ HTMLAttributes }) {
		return /* @__PURE__ */ h("blockquote", {
			...mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			children: /* @__PURE__ */ h("slot", {})
		});
	},
	parseMarkdown: (token, helpers) => {
		var _a;
		const parseBlockChildren = (_a = helpers.parseBlockChildren) != null ? _a : helpers.parseChildren;
		return helpers.createNode("blockquote", void 0, parseBlockChildren(token.tokens || []));
	},
	renderMarkdown: (node, h) => {
		if (!node.content) return "";
		const prefix = ">";
		const result = [];
		node.content.forEach((child, index) => {
			var _a, _b;
			const linesWithPrefix = ((_b = (_a = h.renderChild) == null ? void 0 : _a.call(h, child, index)) != null ? _b : h.renderChildren([child])).split("\n").map((line) => {
				if (line.trim() === "") return prefix;
				return `${prefix} ${line}`;
			});
			result.push(linesWithPrefix.join("\n"));
		});
		return result.join(`
${prefix}
`);
	},
	addCommands() {
		return {
			setBlockquote: () => ({ commands }) => {
				return commands.wrapIn(this.name);
			},
			toggleBlockquote: () => ({ commands }) => {
				return commands.toggleWrap(this.name);
			},
			unsetBlockquote: () => ({ commands }) => {
				return commands.lift(this.name);
			}
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-b": () => this.editor.commands.toggleBlockquote() };
	},
	addInputRules() {
		return [wrappingInputRule({
			find: inputRegex,
			type: this.type
		})];
	}
});
//#endregion
export { Blockquote as t };
