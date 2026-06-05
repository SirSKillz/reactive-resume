import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Ft as o, Un as e, kt as o$1, nt as e$1, p as o$2 } from "../_libs/phosphor-icons__react.mjs";
import { t as useDialogStore } from "./store-DBaE29-H.mjs";
import { n as useConfirm } from "./use-confirm-DokHH3b4.mjs";
import { t as Separator$1 } from "./separator-BDL9Bvz5.mjs";
import { t as DashboardHeader } from "./header-Cf1o68Wv.mjs";
import { o as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { d as AnimatePresence, l as motion } from "../_libs/framer-motion.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { n as getReadableErrorMessage } from "./error-message-ClkvUIO8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-keys-Cr-eCREa.js
var import_jsx_runtime = require_jsx_runtime();
function RouteComponent() {
	const confirm = useConfirm();
	const queryClient = useQueryClient();
	const openDialog = useDialogStore((state) => state.openDialog);
	const { data: apiKeys = [] } = useQuery({
		queryKey: ["auth", "api-keys"],
		queryFn: () => authClient.apiKey.list(),
		select: ({ data }) => {
			if (!data) return [];
			return data.apiKeys.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).filter((key) => !!key.expiresAt && key.expiresAt.getTime() > Date.now());
		}
	});
	const onDelete = async (id) => {
		if (!await confirm(i18n._({ id: "EIcibL" }), {
			description: i18n._({ id: "juDl-c" }),
			confirmText: i18n._({ id: "cnGeoo" }),
			cancelText: i18n._({ id: "dEgA5A" })
		})) return;
		const toastId = toast.loading(i18n._({ id: "VdwCHF" }));
		const { error } = await authClient.apiKey.delete({ keyId: id });
		if (error) {
			toast.error(getReadableErrorMessage(error, i18n._({ id: "yqW9WZ" })), { id: toastId });
			return;
		}
		toast.success(i18n._({ id: "JH2NgL" }), { id: toastId });
		queryClient.invalidateQueries({ queryKey: ["auth", "api-keys"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: o,
				title: i18n._({ id: "FfSJ1Y" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4 rounded-md border bg-popover p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md bg-primary/10 p-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {
								className: "text-primary",
								size: 24
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "50In29" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground leading-relaxed",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1SIjeO" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									variant: "link",
									nativeButton: false,
									render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://docs.rxresu.me/api-reference",
										target: "_blank",
										rel: "noopener noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "j2-d_o" })]
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						className: "h-auto w-full py-3",
						onClick: () => openDialog("api-key.create", void 0),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "A9WbM0" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						initial: false,
						mode: "popLayout",
						children: apiKeys.map((key, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							className: "flex items-center gap-x-4 py-4 will-change-[transform,opacity]",
							initial: {
								opacity: 0,
								y: -16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -16
							},
							transition: {
								duration: .16,
								delay: Math.min(.12, index * .04)
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs",
										children: [key.start, "..."]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
											id: "xd2LI3",
											values: { 0: key.expiresAt?.toLocaleDateString() }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "will-change-transform",
									whileHover: {
										y: -1,
										scale: 1.03
									},
									whileTap: { scale: .96 },
									transition: {
										duration: .14,
										ease: "easeOut"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "icon",
										variant: "ghost",
										onClick: () => onDelete(key.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$2, {})
									})
								})
							]
						}, key.id))
					})] })
				]
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
