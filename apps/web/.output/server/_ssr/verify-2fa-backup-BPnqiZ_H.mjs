import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { f as Link, g as useRouter, m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Mn as o, Xn as r } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { a as FormMessage, o as useAppForm, r as FormItem, t as FormControl } from "./tanstack-form-BM1OX7UY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-2fa-backup-BPnqiZ_H.js
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({ code: zod_default.string().trim() });
function RouteComponent() {
	const router = useRouter();
	const navigate = useNavigate();
	const form = useAppForm({
		defaultValues: { code: "" },
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading(i18n._({ id: "SXcmcA" }));
			const formattedCode = `${value.code.slice(0, 5)}-${value.code.slice(5)}`;
			const { error } = await authClient.twoFactor.verifyBackupCode({ code: formattedCode });
			if (error) {
				toast.error(error.message || i18n._({ id: "BAeCSs" }), { id: toastId });
				return;
			}
			toast.dismiss(toastId);
			await router.invalidate();
			navigate({
				to: "/dashboard",
				replace: true
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-bold text-2xl tracking-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "FZNDIB" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8l-loI" })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-6",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
			name: "code",
			children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				className: "justify-self-center",
				hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					maxLength: 10,
					className: "max-w-xs",
					name: field.name,
					value: field.state.value,
					onBlur: field.handleBlur,
					onChange: (event) => field.handleChange(event.target.value)
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-x-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "outline",
				className: "flex-1",
				nativeButton: false,
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/auth/verify-2fa",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "sr0UJD" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				type: "submit",
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "uSMfoN" })]
			})]
		})]
	})] });
}
//#endregion
export { RouteComponent as component };
