import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "./@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "./@base-ui/react+[...].mjs";
//#region ../../node_modules/.pnpm/@lingui+react@6.0.1_babel-plugin-macros@3.1.0_react@19.2.6/node_modules/@lingui/react/dist/shared/react.DZONiYSA.mjs
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var tagRe = /<([a-zA-Z0-9]+)>([\s\S]*?)<\/\1>|<([a-zA-Z0-9]+)\/>/;
var voidElementTags = {
	area: true,
	base: true,
	br: true,
	col: true,
	embed: true,
	hr: true,
	img: true,
	input: true,
	keygen: true,
	link: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true,
	menuitem: true
};
function formatElements(value, elements = {}) {
	const parts = value.split(tagRe);
	if (parts.length === 1) return value;
	const uniqueId = makeCounter(0, "$lingui$");
	const tree = [];
	const before = parts.shift();
	if (before) tree.push(before);
	for (const [index, children, after] of getElements(parts)) {
		let element = typeof index !== "undefined" ? elements[index] : void 0;
		if (!element || voidElementTags[element.type] && children) {
			if (!element) console.error(`Can't use element at index '${index}' as it is not declared in the original translation`);
			else console.error(`${element.type} is a void element tag therefore it must have no children`);
			element = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
		}
		if (Array.isArray(element)) element = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: element });
		tree.push((0, import_react.cloneElement)(element, { key: uniqueId() }, children ? formatElements(children, elements) : element.props.children));
		if (after) tree.push(after);
	}
	return tree.length === 1 ? tree[0] : tree;
}
function getElements(parts) {
	if (!parts.length) return [];
	const [paired, children, unpaired, after] = parts.slice(0, 4);
	return [[
		paired || unpaired,
		children || "",
		after
	]].concat(getElements(parts.slice(4, parts.length)));
}
var makeCounter = (count = 0, prefix = "") => () => `${prefix}_${count++}`;
function TransNoContext(props) {
	const { render, component, id, message, formats, lingui: { i18n, defaultComponent } } = props;
	const { values, components } = getInterpolationValuesAndComponents(props);
	const _translation = i18n && typeof i18n._ === "function" ? i18n._(id, values, {
		message,
		formats
	}) : id;
	const translation = _translation ? formatElements(_translation, components) : null;
	if (render === null || component === null) return translation;
	const FallbackComponent = defaultComponent || RenderChildren;
	const i18nProps = {
		id,
		message,
		translation,
		children: translation
	};
	if (render && component) console.error("You can't use both `component` and `render` prop at the same time. `component` is ignored.");
	else if (render && typeof render !== "function") console.error(`Invalid value supplied to prop \`render\`. It must be a function, provided ${render}`);
	else if (component && typeof component !== "function") {
		console.error(`Invalid value supplied to prop \`component\`. It must be a React component, provided ${component}`);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackComponent, {
			...i18nProps,
			children: translation
		});
	}
	if (typeof render === "function") return render(i18nProps);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(component || FallbackComponent, {
		...i18nProps,
		children: translation
	});
}
var RenderChildren = ({ children }) => {
	return children;
};
var getInterpolationValuesAndComponents = (props) => {
	if (!props.values) return {
		values: void 0,
		components: props.components
	};
	const values = { ...props.values };
	const components = { ...props.components };
	Object.entries(props.values).forEach(([key, valueForKey]) => {
		if (typeof valueForKey === "string" || typeof valueForKey === "number") return;
		const index = Object.keys(components).length;
		components[index] = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: valueForKey });
		values[key] = `<${index}/>`;
	});
	return {
		values,
		components
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@lingui+react@6.0.1_babel-plugin-macros@3.1.0_react@19.2.6/node_modules/@lingui/react/dist/index.mjs
var LinguiContext = (0, import_react.createContext)(null);
var useLinguiInternal = (devErrorMessage) => {
	return (0, import_react.useContext)(LinguiContext);
};
function useLingui() {
	return useLinguiInternal();
}
var I18nProvider = ({ i18n, defaultComponent, children }) => {
	const latestKnownLocale = (0, import_react.useRef)(i18n.locale || null);
	const makeContext = (0, import_react.useCallback)(() => ({
		i18n: new Proxy(i18n, {}),
		defaultComponent,
		_: i18n.t.bind(i18n)
	}), [i18n, defaultComponent]);
	const [context, setContext] = (0, import_react.useState)(makeContext);
	(0, import_react.useEffect)(() => {
		const updateContext = () => {
			latestKnownLocale.current = i18n.locale || null;
			setContext(makeContext());
		};
		const unsubscribe = i18n.on("change", updateContext);
		if (latestKnownLocale.current !== i18n.locale) updateContext();
		return unsubscribe;
	}, [i18n, makeContext]);
	if (latestKnownLocale.current === null) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinguiContext.Provider, {
		value: context,
		children
	});
};
function Trans(props) {
	const lingui = useLinguiInternal(void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransNoContext, {
		...props,
		lingui
	});
}
//#endregion
export { Trans as n, useLingui as r, I18nProvider as t };
