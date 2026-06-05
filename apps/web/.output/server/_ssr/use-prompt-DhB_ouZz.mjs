import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog$1 } from "./alert-dialog-hkVUrrj_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-prompt-DhB_ouZz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PromptContext = import_react.createContext(null);
function PromptDialogProvider({ children }) {
	const inputRef = import_react.useRef(null);
	const [state, setState] = import_react.useState({
		open: false,
		resolve: null,
		title: "",
		value: "",
		description: void 0,
		defaultValue: void 0,
		confirmText: void 0,
		cancelText: void 0,
		inputProps: void 0
	});
	const cancelText = state.cancelText ?? i18n._({ id: "dEgA5A" });
	const confirmText = state.confirmText ?? i18n._({ id: "7VpPHA" });
	import_react.useEffect(() => {
		if (!state.open) return;
		setTimeout(() => {
			if (!inputRef.current) return;
			inputRef.current.focus();
		}, 0);
	}, [state.open]);
	const prompt = import_react.useCallback(async (title, options) => {
		return new Promise((resolve) => {
			setState({
				open: true,
				resolve,
				title,
				value: options?.defaultValue ?? "",
				description: options?.description,
				defaultValue: options?.defaultValue,
				confirmText: options?.confirmText,
				cancelText: options?.cancelText,
				inputProps: options?.inputProps
			});
		});
	}, []);
	const handleConfirm = import_react.useCallback(() => {
		if (state.resolve) state.resolve(state.value);
		setState((prev) => ({
			...prev,
			open: false,
			resolve: null
		}));
	}, [state.resolve, state.value]);
	const handleCancel = import_react.useCallback(() => {
		if (state.resolve) state.resolve(null);
		setState((prev) => ({
			...prev,
			open: false,
			resolve: null
		}));
	}, [state.resolve]);
	const handleValueChange = import_react.useCallback((e) => {
		setState((prev) => ({
			...prev,
			value: e.target.value
		}));
	}, []);
	const handleKeyDown = import_react.useCallback((e) => {
		if (e.key === "Enter") handleConfirm();
	}, [handleConfirm]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PromptContext.Provider, {
		value: { prompt },
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog$1, {
			open: state.open,
			onOpenChange: (open) => !open && handleCancel(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: state.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
					className: cn(!state.description && "sr-only"),
					children: state.description
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					ref: inputRef,
					value: state.value,
					onKeyDown: handleKeyDown,
					onChange: handleValueChange,
					...state.inputProps
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					onClick: handleCancel,
					children: cancelText
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: handleConfirm,
					children: confirmText
				})] })
			] })
		})]
	});
}
function usePrompt() {
	const context = import_react.useContext(PromptContext);
	if (!context) throw new Error("usePrompt must be used within a <PromptDialogProvider />.");
	return context.prompt;
}
//#endregion
export { usePrompt as n, PromptDialogProvider as t };
