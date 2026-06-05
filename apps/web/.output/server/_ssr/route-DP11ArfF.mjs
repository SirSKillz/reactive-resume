import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { n as useIsClient } from "../_libs/usehooks-ts.mjs";
import { m as orpc, t as AI_PROVIDER_DEFAULT_BASE_URLS } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { It as e, Vn as r, jn as c, n as o } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { t as Label } from "./label-DOBCpxYa.mjs";
import { t as Separator$1 } from "./separator-BDL9Bvz5.mjs";
import { t as DashboardHeader } from "./header-Cf1o68Wv.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { l as motion } from "../_libs/framer-motion.mjs";
import { t as getOrpcErrorMessage } from "./error-message-ClkvUIO8.mjs";
import { t as Combobox$1 } from "./combobox-zQflN6sS.mjs";
import { t as Spinner } from "./spinner-DIYcuS2L.mjs";
import { n as useAIStore, t as Switch$1 } from "./switch-BlG3Pz1S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DP11ArfF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var providerOptions = [
	{
		value: "openai",
		label: i18n._({ id: "iQGjpq" }),
		keywords: [
			"openai",
			"gpt",
			"chatgpt"
		],
		defaultBaseURL: AI_PROVIDER_DEFAULT_BASE_URLS.openai
	},
	{
		value: "anthropic",
		label: i18n._({ id: "C3YkrU" }),
		keywords: [
			"anthropic",
			"claude",
			"ai"
		],
		defaultBaseURL: AI_PROVIDER_DEFAULT_BASE_URLS.anthropic
	},
	{
		value: "gemini",
		label: i18n._({ id: "Vh6ZKH" }),
		keywords: [
			"gemini",
			"google",
			"bard"
		],
		defaultBaseURL: AI_PROVIDER_DEFAULT_BASE_URLS.gemini
	},
	{
		value: "vercel-ai-gateway",
		label: i18n._({ id: "ZZlPAR" }),
		keywords: [
			"vercel",
			"gateway",
			"ai"
		],
		defaultBaseURL: AI_PROVIDER_DEFAULT_BASE_URLS["vercel-ai-gateway"]
	},
	{
		value: "openrouter",
		label: i18n._({ id: "RZNay_" }),
		keywords: [
			"openrouter",
			"router",
			"multi",
			"proxy"
		],
		defaultBaseURL: AI_PROVIDER_DEFAULT_BASE_URLS.openrouter
	},
	{
		value: "ollama",
		label: i18n._({ id: "kgKsl0" }),
		keywords: [
			"ollama",
			"ai",
			"local"
		],
		defaultBaseURL: AI_PROVIDER_DEFAULT_BASE_URLS.ollama
	}
];
function AIForm() {
	const { set, model, apiKey, baseURL, provider, enabled, testStatus } = useAIStore();
	const selectedOption = (0, import_react.useMemo)(() => {
		return providerOptions.find((option) => option.value === provider);
	}, [provider]);
	const canTestConnection = model.trim().length > 0 && apiKey.trim().length > 0;
	const { mutate: testConnection, isPending: isTesting } = useMutation(orpc.ai.testConnection.mutationOptions());
	const handleProviderChange = (value) => {
		if (!value) return;
		set((draft) => {
			draft.provider = value;
		});
	};
	const handleTestConnection = () => {
		if (!canTestConnection) return;
		testConnection({
			provider,
			model: model.trim(),
			apiKey: apiKey.trim(),
			baseURL: baseURL.trim()
		}, {
			onSuccess: (data) => {
				set((draft) => {
					draft.testStatus = data ? "success" : "failure";
				});
			},
			onError: (error) => {
				set((draft) => {
					draft.testStatus = "failure";
				});
				toast.error(getOrpcErrorMessage(error, {
					byCode: {
						BAD_REQUEST: i18n._({ id: "xYRNgP" }),
						BAD_GATEWAY: i18n._({ id: "-omA93" })
					},
					fallback: i18n._({ id: "HYG2BJ" })
				}));
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "ai-provider",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "aemBRq" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox$1, {
					id: "ai-provider",
					value: provider,
					disabled: enabled,
					options: providerOptions,
					onValueChange: handleProviderChange
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "ai-model",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "scu3wk" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: "ai-model",
					name: "ai-model",
					type: "text",
					value: model,
					disabled: enabled,
					onChange: (e) => set((draft) => {
						draft.model = e.target.value;
					}),
					placeholder: i18n._({ id: "VF8vlV" }),
					autoCorrect: "off",
					autoComplete: "off",
					spellCheck: "false",
					autoCapitalize: "off"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-y-2 sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "ai-api-key",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "yRnk5W" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: "ai-api-key",
					name: "ai-api-key",
					type: "password",
					value: apiKey,
					disabled: enabled,
					onChange: (e) => set((draft) => {
						draft.apiKey = e.target.value;
					}),
					autoCorrect: "off",
					autoComplete: "off",
					spellCheck: "false",
					autoCapitalize: "off",
					"data-lpignore": "true",
					"data-bwignore": "true",
					"data-1p-ignore": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-y-2 sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "ai-base-url",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "aLSmnC" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: "ai-base-url",
					name: "ai-base-url",
					type: "url",
					value: baseURL,
					disabled: enabled,
					placeholder: selectedOption?.defaultBaseURL,
					onChange: (e) => set((draft) => {
						draft.baseURL = e.target.value;
					}),
					autoCorrect: "off",
					autoComplete: "off",
					spellCheck: "false",
					autoCapitalize: "off"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "outline",
				disabled: isTesting || enabled || !canTestConnection,
				onClick: handleTestConnection,
				children: [isTesting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : testStatus === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { className: "text-emerald-500" }) : testStatus === "failure" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "text-rose-500" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "s7uMvM" })]
			}) })
		]
	});
}
function AISettingsSection() {
	const aiEnabled = useAIStore((state) => state.enabled);
	const canEnableAI = useAIStore((state) => state.canEnable());
	const setAIEnabled = useAIStore((state) => state.setEnabled);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Jm1U-x" })
			}),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "jUBjoD" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "_ZWeEA" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "enable-ai",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "_Zv_dZ" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
					id: "enable-ai",
					checked: aiEnabled,
					disabled: !canEnableAI,
					onCheckedChange: setAIEnabled
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-x-2",
				children: [aiEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { className: "text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "text-rose-500" }), aiEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "RxzN1M" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "E_QGRL" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIForm, {})
		]
	});
}
function RouteComponent() {
	if (!useIsClient()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: r,
				title: i18n._({ id: "nbfdhU" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
				className: "grid max-w-xl gap-8 will-change-[transform,opacity]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AISettingsSection, {})
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
