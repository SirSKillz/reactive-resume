import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { m as orpc } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { $t as e, Kt as t$1, Ot as e$2, Wt as e$1, s as t } from "../_libs/phosphor-icons__react.mjs";
import { t as Skeleton } from "./skeleton-C4VsvR82.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/social-auth-DrIkum2W.js
var import_jsx_runtime = require_jsx_runtime();
function getSocialSignInOptions(provider, requestSignUp) {
	const options = {
		provider,
		callbackURL: "/dashboard"
	};
	if (requestSignUp) options.requestSignUp = true;
	return options;
}
function SocialAuth({ requestSignUp = false }) {
	const { data: providers = {}, isLoading } = useQuery(orpc.auth.providers.list.queryOptions());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-x-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "flex-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-xs tracking-wide",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "3BEoB6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "flex-1" })
		]
	}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialAuthSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialAuthButtons, {
		providers,
		requestSignUp
	})] });
}
function SocialAuthSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" })
		]
	});
}
function SocialAuthButtons({ providers, requestSignUp }) {
	const router = useRouter();
	const handleSocialLogin = async (provider) => {
		const toastId = toast.loading(i18n._({ id: "XOxZT4" }));
		const { error } = await authClient.signIn.social(getSocialSignInOptions(provider, requestSignUp));
		if (error) {
			toast.error(error.message || i18n._({ id: "oeF-HP" }), { id: toastId });
			return;
		}
		toast.dismiss(toastId);
		await router.invalidate();
	};
	const handleOAuthLogin = async () => {
		const toastId = toast.loading(i18n._({ id: "XOxZT4" }));
		const { error } = await authClient.signIn.oauth2({
			providerId: "custom",
			callbackURL: "/dashboard"
		});
		if (error) {
			toast.error(error.message || i18n._({ id: "oeF-HP" }), { id: toastId });
			return;
		}
		toast.dismiss(toastId);
		await router.invalidate();
	};
	const handlePasskeyLogin = async () => {
		const toastId = toast.loading(i18n._({ id: "XOxZT4" }));
		const { error } = await authClient.signIn.passkey({ autoFill: false });
		if (error) {
			toast.error(error.message || i18n._({ id: "oeF-HP" }), { id: toastId });
			return;
		}
		toast.dismiss(toastId);
		await router.invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "secondary",
				onClick: handleOAuthLogin,
				className: cn("hidden", "custom" in providers && "inline-flex"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {}), providers.custom]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "secondary",
				onClick: handlePasskeyLogin,
				className: cn("hidden", "passkey" in providers && "inline-flex"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "FGSN4s" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				onClick: () => handleSocialLogin("google"),
				className: cn("hidden flex-1 bg-[#4285F4] text-white hover:bg-[#4285F4]/80", "google" in providers && "inline-flex"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "eoe8BR" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				onClick: () => handleSocialLogin("github"),
				className: cn("hidden flex-1 bg-[#2b3137] text-white hover:bg-[#2b3137]/80", "github" in providers && "inline-flex"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "RkXlPZ" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				onClick: () => handleSocialLogin("linkedin"),
				className: cn("hidden flex-1 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/80", "linkedin" in providers && "inline-flex"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "gggTBm" })]
			})
		]
	});
}
//#endregion
export { SocialAuth as t };
