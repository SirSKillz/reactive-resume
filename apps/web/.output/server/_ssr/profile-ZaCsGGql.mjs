import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { r as useStore } from "../_libs/@tanstack/react-form+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { t as M } from "../_libs/ts-pattern.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Mn as o, l as r, o as r$1 } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { a as FormMessage, i as FormLabel, o as useAppForm, r as FormItem, t as FormControl } from "./tanstack-form-BM1OX7UY.mjs";
import { t as Separator$1 } from "./separator-BDL9Bvz5.mjs";
import { t as DashboardHeader } from "./header-Cf1o68Wv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { d as AnimatePresence, l as motion } from "../_libs/framer-motion.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { n as getReadableErrorMessage } from "./error-message-ClkvUIO8.mjs";
import { t as Route } from "./profile-DxfNUm6e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-ZaCsGGql.js
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({
	name: zod_default.string().trim().min(1).max(64),
	username: zod_default.string().trim().min(1).max(64).regex(/^[a-z0-9._-]+$/, { message: "Username can only contain lowercase letters, numbers, dots, hyphens and underscores." }),
	email: zod_default.email().trim()
});
function RouteComponent() {
	const router = useRouter();
	const { session } = Route.useRouteContext();
	const form = useAppForm({
		defaultValues: {
			name: session.user.name,
			username: session.user.username,
			email: session.user.email
		},
		validators: { onSubmit: formSchema },
		onSubmit: async ({ value }) => {
			const { error } = await authClient.updateUser({
				name: value.name,
				username: value.username,
				displayUsername: value.username
			});
			if (error) {
				toast.error(getReadableErrorMessage(error, i18n._({ id: "PRt3N6" })));
				return;
			}
			toast.success(i18n._({ id: "R-Yx9f" }));
			form.reset({
				name: value.name,
				username: value.username,
				email: session.user.email
			});
			router.invalidate();
			if (value.email !== session.user.email) {
				const { error } = await authClient.changeEmail({
					newEmail: value.email,
					callbackURL: "/dashboard/settings/profile"
				});
				if (error) {
					toast.error(getReadableErrorMessage(error, i18n._({ id: "0dOnIU" })));
					return;
				}
				toast.success(i18n._({ id: "H9l09X" }));
				form.reset({
					name: value.name,
					username: value.username,
					email: session.user.email
				});
				router.invalidate();
			}
		}
	});
	const onCancel = () => {
		form.reset();
	};
	const isDirty = useStore(form.store, (s) => s.isDirty);
	const handleResendVerificationEmail = async () => {
		const toastId = toast.loading(i18n._({ id: "deDz65" }));
		const { error } = await authClient.sendVerificationEmail({
			email: session.user.email,
			callbackURL: "/dashboard/settings/profile"
		});
		if (error) {
			toast.error(getReadableErrorMessage(error, i18n._({ id: "FNmgma" })), { id: toastId });
			return;
		}
		toast.success(i18n._({ id: "hYxMTR" }), { id: toastId });
		router.invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: r,
				title: i18n._({ id: "vERlcd" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
				initial: {
					opacity: 0,
					y: -20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .25,
					ease: "easeOut"
				},
				className: "grid max-w-xl gap-6 will-change-[transform,opacity]",
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
									autoComplete: "name",
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
									autoComplete: "username",
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
									autoComplete: "email",
									placeholder: i18n._({ id: "wrLOeW" }),
									className: "lowercase",
									name: field.name,
									value: field.state.value,
									onBlur: field.handleBlur,
									onChange: (event) => field.handleChange(event.target.value)
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors }),
								M(session.user.emailVerified).with(true, () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-x-1.5 text-green-700 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "QDEWii" })]
								})).with(false, () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-x-1.5 text-amber-600 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$1, { className: "size-3.5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VBTGXl" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "|" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											variant: "link",
											className: "h-auto gap-x-1.5 p-0! text-inherit text-xs",
											onClick: handleResendVerificationEmail,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "TvnDiq" })
										})
									]
								})).exhaustive()
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						initial: false,
						mode: "popLayout",
						children: isDirty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: -8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -8
							},
							transition: {
								duration: .16,
								ease: "easeOut"
							},
							className: "flex items-center gap-x-4 justify-self-end will-change-[transform,opacity]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "reset",
								variant: "ghost",
								onClick: onCancel,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dEgA5A" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "submit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "IUwGEM" })
							})]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
