import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime, t as useRender } from "../_libs/@base-ui/react+[...].mjs";
import { n as createFormHookContexts, t as createFormHook } from "../_libs/@tanstack/react-form+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { i as InputGroupInput } from "./input-group-BUPwXtm5.mjs";
import { t as Label } from "./label-DOBCpxYa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tanstack-form-BM1OX7UY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FormItemContext = import_react.createContext({
	id: "",
	hasError: false
});
function useFormItem() {
	return import_react.useContext(FormItemContext);
}
function FormItem({ className, hasError = false, ...props }) {
	const id = import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItemContext.Provider, {
		value: {
			id,
			hasError
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "form-item",
			className: cn("grid gap-1.5", className),
			...props
		})
	});
}
function FormLabel({ className, ...props }) {
	const { id, hasError } = useFormItem();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-slot": "form-label",
		"data-error": hasError,
		className: cn("mb-0.5 data-[error=true]:text-destructive", className),
		htmlFor: `${id}-form-item`,
		...props
	});
}
function FormControl({ render, ...props }) {
	const { id, hasError } = useFormItem();
	return useRender({
		defaultTagName: "div",
		render,
		state: { slot: "form-control" },
		props: {
			id: `${id}-form-item`,
			"data-slot": "form-control",
			"aria-describedby": hasError ? `${id}-form-item-description ${id}-form-item-message` : `${id}-form-item-description`,
			"aria-invalid": hasError,
			...props
		}
	});
}
function FormDescription({ className, ...props }) {
	const { id } = useFormItem();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-slot": "form-description",
		id: `${id}-form-item-description`,
		className: cn("text-muted-foreground text-xs leading-normal", className),
		...props
	});
}
function extractErrorMessage(errors) {
	if (!errors || errors.length === 0) return void 0;
	for (const err of errors) {
		if (!err) continue;
		if (typeof err === "string") return err;
		if (typeof err === "object" && "message" in err && typeof err.message === "string") return err.message;
	}
}
function FormMessage({ className, errors, ...props }) {
	const { id, hasError } = useFormItem();
	const body = extractErrorMessage(errors);
	if (!body) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		id: `${id}-form-item-message`,
		"data-error": hasError,
		"data-slot": "form-message",
		className: cn("line-clamp-1 text-xs", hasError ? "text-destructive" : "text-muted-foreground", className),
		...props,
		children: body
	});
}
var { fieldContext, formContext, useFieldContext } = createFormHookContexts();
function TextField({ label, description, formItemClassName, ...props }) {
	const field = useFieldContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
		hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
		className: formItemClassName,
		children: [
			label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: label }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
				...props,
				name: field.name,
				value: field.state.value,
				onBlur: field.handleBlur,
				onChange: (event) => field.handleChange(event.target.value)
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors }),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormDescription, { children: description }) : null
		]
	});
}
function InputGroupTextField({ label, description, formItemClassName, ...props }) {
	const field = useFieldContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
		hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
		className: formItemClassName,
		children: [
			label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: label }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
				...props,
				name: field.name,
				value: field.state.value,
				onBlur: field.handleBlur,
				onChange: (event) => field.handleChange(event.target.value)
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors }),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormDescription, { children: description }) : null
		]
	});
}
function NumberField({ label, description, formItemClassName, ...props }) {
	const field = useFieldContext();
	const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
	const value = Number.isFinite(field.state.value) ? field.state.value : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
		hasError,
		className: formItemClassName,
		children: [
			label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: label }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
				...props,
				type: "number",
				name: field.name,
				value,
				onBlur: field.handleBlur,
				onChange: (event) => field.handleChange(event.target.valueAsNumber)
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors }),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormDescription, { children: description }) : null
		]
	});
}
var { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		InputGroupTextField,
		NumberField,
		TextField
	},
	fieldContext,
	formComponents: {},
	formContext
});
//#endregion
export { FormMessage as a, FormLabel as i, FormDescription as n, useAppForm as o, FormItem as r, withForm as s, FormControl as t };
