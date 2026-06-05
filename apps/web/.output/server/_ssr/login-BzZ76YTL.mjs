import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { f as Link, g as useRouter, m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { i as useToggle } from "../_libs/usehooks-ts.mjs";
import { m as orpc } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Yn as r, cn as o, on as o$1 } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { a as FormMessage, i as FormLabel, n as FormDescription, o as useAppForm, r as FormItem, t as FormControl } from "./tanstack-form-BM1OX7UY.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { t as Route } from "./login-gMcSxuit.mjs";
import { t as SocialAuth } from "./social-auth-DrIkum2W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BzZ76YTL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({
	identifier: zod_default.string().trim().toLowerCase(),
	password: zod_default.string().trim().min(6).max(64)
});
function RouteComponent() {
	const router = useRouter();
	const navigate = useNavigate();
	const { flags } = Route.useRouteContext();
	const hasStartedConditionalPasskeyRef = (0, import_react.useRef)(false);
	const [showPassword, toggleShowPassword] = useToggle(false);
	const { data: providers = {} } = useQuery(orpc.auth.providers.list.queryOptions());
	const form = useAppForm({
		defaultValues: {
			identifier: "",
			password: ""
		},
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading(i18n._({ id: "XOxZT4" }));
			try {
				const result = value.identifier.includes("@") ? await authClient.signIn.email({
					email: value.identifier,
					password: value.password
				}) : await authClient.signIn.username({
					username: value.identifier,
					password: value.password
				});
				if (result.error) {
					toast.error(result.error.message || i18n._({ id: "oeF-HP" }), { id: toastId });
					return;
				}
				if (result.data && typeof result.data === "object" && "twoFactorRedirect" in result.data && result.data.twoFactorRedirect) {
					toast.dismiss(toastId);
					navigate({
						to: "/auth/verify-2fa",
						replace: true
					});
					return;
				}
				toast.dismiss(toastId);
				await router.invalidate();
				navigate({
					to: "/dashboard",
					replace: true
				});
			} catch {
				toast.error(i18n._({ id: "oeF-HP" }), { id: toastId });
			}
		}
	});
	(0, import_react.useEffect)(() => {
		if (!("passkey" in providers)) return;
		if (typeof window === "undefined") return;
		if (!("PublicKeyCredential" in window)) return;
		if (!PublicKeyCredential.isConditionalMediationAvailable) return;
		if (hasStartedConditionalPasskeyRef.current) return;
		hasStartedConditionalPasskeyRef.current = true;
		PublicKeyCredential.isConditionalMediationAvailable().then(async (isAvailable) => {
			if (!isAvailable) return;
			const { error } = await authClient.signIn.passkey({ autoFill: true });
			if (error) return;
			await router.invalidate();
		});
	}, [providers, router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-bold text-2xl tracking-tight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "NxCJcc" })
			}), !flags.disableSignups && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
					id: "XQAxX-",
					components: { 0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "link",
						nativeButton: false,
						className: "h-auto gap-1.5 px-1! py-0",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/auth/register",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "e4f0Up" }),
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
					name: "identifier",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hzKQCy" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								autoComplete: "section-login username webauthn",
								placeholder: i18n._({ id: "wrLOeW" }),
								className: "lowercase",
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (event) => field.handleChange(event.target.value)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "TNcvC0" }) })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "password",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8ZsakT" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									tabIndex: -1,
									variant: "link",
									nativeButton: false,
									className: "h-auto p-0 text-xs leading-none",
									render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth/forgot-password",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "jDFIo5" })
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-x-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									min: 6,
									max: 64,
									type: showPassword ? "text" : "password",
									autoComplete: "section-login current-password",
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "5lWFkC" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialAuth, {})
	] });
}
//#endregion
export { RouteComponent as component };
