import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { i as useToggle } from "../_libs/usehooks-ts.mjs";
import { f as ORPCError } from "../_libs/@orpc/client+[...].mjs";
import { m as orpc } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Ct as e, cn as o, on as o$1 } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { a as FormMessage, i as FormLabel, o as useAppForm, r as FormItem, t as FormControl } from "./tanstack-form-BM1OX7UY.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { n as getReadableErrorMessage } from "./error-message-ClkvUIO8.mjs";
import { t as Route } from "./resume-password-CDs0QSuw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-password-Dqg-iqMJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({ password: zod_default.string().min(6).max(64) });
function RouteComponent() {
	const navigate = useNavigate();
	const { redirect } = Route.useSearch();
	const [showPassword, toggleShowPassword] = useToggle(false);
	const { mutate: verifyPassword } = useMutation(orpc.resume.verifyPassword.mutationOptions());
	const [username, slug] = (0, import_react.useMemo)(() => {
		const [username, slug] = redirect.split("/").slice(1);
		if (!username || !slug) throw navigate({ to: "/" });
		return [username, slug];
	}, [redirect, navigate]);
	const form = useAppForm({
		defaultValues: { password: "" },
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value, formApi }) => {
			const toastId = toast.loading(i18n._({ id: "1Qc25t" }));
			verifyPassword({
				username,
				slug,
				password: value.password
			}, {
				onSuccess: () => {
					toast.dismiss(toastId);
					navigate({
						to: redirect,
						replace: true
					});
				},
				onError: (error) => {
					if (error instanceof ORPCError && error.code === "INVALID_PASSWORD") {
						toast.dismiss(toastId);
						formApi.setFieldMeta("password", (meta) => ({
							...meta,
							isTouched: true,
							errors: [{ message: i18n._({ id: "GLlnzI" }) }],
							errorMap: {
								...meta.errorMap,
								onSubmit: { message: i18n._({ id: "GLlnzI" }) }
							}
						}));
					} else toast.error(getReadableErrorMessage(error, i18n._({ id: "N2cywy" })), { id: toastId });
				}
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-bold text-2xl tracking-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "twTgNR" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground leading-relaxed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "osXzL9" })
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8ZsakT" }) }),
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
			type: "submit",
			className: "w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VAOn4r" })]
		})]
	})] });
}
//#endregion
export { RouteComponent as component };
