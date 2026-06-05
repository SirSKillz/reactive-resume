import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { i as useToggle } from "../_libs/usehooks-ts.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { cn as o, on as o$1 } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { a as FormMessage, i as FormLabel, o as useAppForm, r as FormItem, t as FormControl } from "./tanstack-form-BM1OX7UY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { t as Route } from "./reset-password-BrCqh_to.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-5IxDblZh.js
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({ password: zod_default.string().min(6).max(64) });
function RouteComponent() {
	const navigate = useNavigate();
	const { token } = Route.useSearch();
	const [showPassword, toggleShowPassword] = useToggle(false);
	const form = useAppForm({
		defaultValues: { password: "" },
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading(i18n._({ id: "qzR3YP" }));
			const { error } = await authClient.resetPassword({
				token,
				newPassword: value.password
			});
			if (error) {
				toast.error(error.message || i18n._({ id: "9V-upP" }), { id: toastId });
				return;
			}
			toast.success(i18n._({ id: "X2cmDC" }), { id: toastId });
			navigate({ to: "/auth/login" });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-bold text-2xl tracking-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "slOprG" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "15fhbV" })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-6",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
			name: "password",
			children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "7vhWI8" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-x-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							min: 6,
							max: 64,
							type: showPassword ? "text" : "password",
							autoComplete: "new-password",
							name: field.name,
							value: field.state.value,
							onBlur: field.handleBlur,
							onChange: (event) => field.handleChange(event.target.value)
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "icon",
							variant: "ghost",
							onClick: toggleShowPassword,
							"aria-label": showPassword ? i18n._({ id: "Pw01g0" }) : i18n._({ id: "7C-Jn5" }),
							children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			type: "submit",
			className: "w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "KbS2K9" })
		})]
	})] });
}
//#endregion
export { RouteComponent as component };
