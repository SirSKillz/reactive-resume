import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Yn as r } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { a as FormMessage, i as FormLabel, o as useAppForm, r as FormItem, t as FormControl } from "./tanstack-form-BM1OX7UY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-W1Elca0X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({ email: zod_default.email() });
function RouteComponent() {
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const form = useAppForm({
		defaultValues: { email: "" },
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading(i18n._({ id: "fGKKVV" }));
			const { error } = await authClient.requestPasswordReset({
				email: value.email,
				redirectTo: "/auth/reset-password"
			});
			if (error) {
				toast.error(error.message || i18n._({ id: "B6gvGw" }), { id: toastId });
				return;
			}
			setSubmitted(true);
			toast.dismiss(toastId);
		}
	});
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostForgotPasswordScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-bold text-2xl tracking-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "glx6on" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
				id: "8FLkpW",
				components: { 0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "link",
					className: "h-auto gap-1.5 px-1! py-0",
					nativeButton: false,
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/auth/login",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "4cmgzk" }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {})
						]
					})
				}) }
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-6",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
			name: "email",
			children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hzKQCy" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						type: "email",
						autoComplete: "email",
						placeholder: i18n._({ id: "wrLOeW" }),
						name: field.name,
						value: field.state.value,
						onBlur: field.handleBlur,
						onChange: (event) => field.handleChange(event.target.value)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			type: "submit",
			className: "w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "oAkefL" })
		})]
	})] });
}
function PostForgotPasswordScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-bold text-2xl tracking-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "37ukDF" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Mp92ys" })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		nativeButton: false,
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "mailto:",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "yDsjJE" })
		})
	})] });
}
//#endregion
export { RouteComponent as component };
