import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog$1 } from "./alert-dialog-hkVUrrj_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-confirm-DokHH3b4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ConfirmContext = import_react.createContext(null);
function ConfirmDialogProvider({ children }) {
	const [state, setState] = import_react.useState({
		open: false,
		resolve: null,
		title: "",
		description: void 0,
		confirmText: void 0,
		cancelText: void 0
	});
	const confirm = import_react.useCallback(async (title, options) => {
		return new Promise((resolve) => {
			setState({
				open: true,
				resolve,
				title,
				description: options?.description,
				confirmText: options?.confirmText,
				cancelText: options?.cancelText
			});
		});
	}, []);
	const handleConfirm = import_react.useCallback(() => {
		if (state.resolve) state.resolve(true);
		setState((prev) => ({
			...prev,
			open: false,
			resolve: null
		}));
	}, [state.resolve]);
	const handleCancel = import_react.useCallback(() => {
		if (state.resolve) state.resolve(false);
		setState((prev) => ({
			...prev,
			open: false,
			resolve: null
		}));
	}, [state.resolve]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmContext.Provider, {
		value: { confirm },
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog$1, {
			open: state.open,
			onOpenChange: (open) => !open && handleCancel(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: state.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
				className: cn(!state.description && "sr-only"),
				children: state.description
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
				onClick: handleCancel,
				children: state.cancelText ?? "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: handleConfirm,
				children: state.confirmText ?? "Confirm"
			})] })] })
		})]
	});
}
function useConfirm() {
	const context = import_react.useContext(ConfirmContext);
	if (!context) throw new Error("useConfirm must be used within a <ConfirmDialogProvider />.");
	return context.confirm;
}
//#endregion
export { useConfirm as n, ConfirmDialogProvider as t };
