import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { i as useToggle } from "../_libs/usehooks-ts.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Yn as r, cn as o, on as o$1 } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { a as FormMessage, i as FormLabel, o as useAppForm, r as FormItem, t as FormControl } from "./tanstack-form-BM1OX7UY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { t as SocialAuth } from "./social-auth-DrIkum2W.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-uTBGL8rz.mjs";
import { t as Route } from "./register-332moyFm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-DxuLo_FE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({
	name: zod_default.string().min(3).max(64),
	username: zod_default.string().min(3).max(64).trim().toLowerCase().regex(/^[a-z0-9._-]+$/, { message: "Username can only contain lowercase letters, numbers, dots, hyphens and underscores." }),
	email: zod_default.email().toLowerCase(),
	password: zod_default.string().min(6).max(64)
});
function RouteComponent() {
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [showPassword, toggleShowPassword] = useToggle(false);
	const { flags } = Route.useRouteContext();
	const form = useAppForm({
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: ""
		},
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading(i18n._({ id: "P1wwqN" }));
			const { error } = await authClient.signUp.email({
				name: value.name,
				email: value.email,
				password: value.password,
				username: value.username,
				displayUsername: value.username,
				callbackURL: "/dashboard"
			});
			if (error) {
				toast.error(error.message || i18n._({ id: "xbubZG" }), { id: toastId });
				return;
			}
			setSubmitted(true);
			toast.dismiss(toastId);
		}
	});
	if (submitted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostSignupScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-bold text-2xl tracking-tight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "mpt9T-" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
					id: "jwDCxh",
					components: { 0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "link",
						nativeButton: false,
						className: "h-auto gap-1.5 px-1! py-0",
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
		}),
		!flags.disableEmailAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-6",
			onSubmit: (event) => {
				event.preventDefault();
				event.stopPropagation();
				form.handleSubmit();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "name",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "6YtxFj" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								min: 3,
								max: 64,
								autoComplete: "section-register name",
								placeholder: i18n._({ id: "tzDI-P" }),
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (event) => field.handleChange(event.target.value)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "username",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "7sNhEz" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								min: 3,
								max: 64,
								autoComplete: "section-register username",
								placeholder: i18n._({ id: "C5FAaq" }),
								className: "lowercase",
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (event) => field.handleChange(event.target.value)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "email",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hzKQCy" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "email",
								autoComplete: "section-register email",
								placeholder: i18n._({ id: "wrLOeW" }),
								className: "lowercase",
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (event) => field.handleChange(event.target.value)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
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
									autoComplete: "section-register new-password",
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "submit",
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "e-RpCP" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialAuth, { requestSignUp: true })
	] });
}
function PostSignupScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-bold text-2xl tracking-tight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "37ukDF" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "xrssau" })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "RqGmBh" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "L15gWt" }) })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			nativeButton: false,
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "xGVfLh" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {})
				]
			})
		})
	] });
}
//#endregion
export { RouteComponent as component };
