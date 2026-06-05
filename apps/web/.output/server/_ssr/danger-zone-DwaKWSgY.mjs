import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { m as orpc } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { o as r, p as o } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { n as useConfirm } from "./use-confirm-DokHH3b4.mjs";
import { t as Separator$1 } from "./separator-BDL9Bvz5.mjs";
import { t as DashboardHeader } from "./header-Cf1o68Wv.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { l as motion } from "../_libs/framer-motion.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { n as getReadableErrorMessage } from "./error-message-ClkvUIO8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/danger-zone-DwaKWSgY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONFIRMATION_TEXT = "delete";
function RouteComponent() {
	const confirm = useConfirm();
	const navigate = useNavigate();
	const [confirmationText, setConfirmationText] = (0, import_react.useState)("");
	const isConfirmationValid = confirmationText === CONFIRMATION_TEXT;
	const { mutate: deleteAccount } = useMutation(orpc.auth.deleteAccount.mutationOptions());
	const handleDeleteAccount = async () => {
		if (!await confirm(i18n._({ id: "74F7N_" }), {
			description: i18n._({ id: "UvtmFw" }),
			confirmText: i18n._({ id: "7VpPHA" }),
			cancelText: i18n._({ id: "dEgA5A" })
		})) return;
		const toastId = toast.loading(i18n._({ id: "O71YIC" }));
		deleteAccount(void 0, {
			onSuccess: async () => {
				toast.success(i18n._({ id: "gmJH7Y" }), { id: toastId });
				await authClient.signOut();
				navigate({ to: "/" });
			},
			onError: (error) => {
				toast.error(getReadableErrorMessage(error, i18n._({ id: "Lb-vqP" })), { id: toastId });
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: r,
				title: i18n._({ id: "ZQKLI1" })
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "WFHI0W" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						type: "text",
						value: confirmationText,
						onChange: (e) => setConfirmationText(e.target.value),
						placeholder: i18n._({
							id: "o7xOt6",
							values: { CONFIRMATION_TEXT }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "justify-self-end will-change-transform",
						whileHover: !isConfirmationValid ? void 0 : {
							y: -1,
							scale: 1.01
						},
						whileTap: !isConfirmationValid ? void 0 : { scale: .98 },
						transition: {
							duration: .14,
							ease: "easeOut"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "destructive",
							onClick: handleDeleteAccount,
							disabled: !isConfirmationValid,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vzX5FB" })]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
