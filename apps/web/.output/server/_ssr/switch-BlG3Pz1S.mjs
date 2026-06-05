import { Lt as require_jsx_runtime, h as SwitchRoot, m as SwitchThumb } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { i as create, n as persist, r as immer, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/switch-BlG3Pz1S.js
var import_jsx_runtime = require_jsx_runtime();
var initialState = {
	enabled: false,
	provider: "openai",
	model: "",
	apiKey: "",
	baseURL: "",
	testStatus: "unverified"
};
var useAIStore = create()(persist(immer((set, get) => ({
	...initialState,
	set: (fn) => {
		set((draft) => {
			const prev = {
				provider: draft.provider,
				model: draft.model,
				apiKey: draft.apiKey,
				baseURL: draft.baseURL
			};
			fn(draft);
			if (draft.provider !== prev.provider || draft.model !== prev.model || draft.apiKey !== prev.apiKey || draft.baseURL !== prev.baseURL) {
				draft.testStatus = "unverified";
				draft.enabled = false;
			}
		});
	},
	reset: () => set(() => initialState),
	canEnable: () => {
		const { testStatus } = get();
		return testStatus === "success";
	},
	setEnabled: (value) => {
		const canEnable = get().canEnable();
		if (value && !canEnable) return;
		set((draft) => {
			draft.enabled = value;
		});
	}
})), {
	name: "ai-store",
	storage: createJSONStorage(() => localStorage),
	partialize: (state) => ({
		enabled: state.enabled,
		provider: state.provider,
		model: state.model,
		apiKey: state.apiKey,
		baseURL: state.baseURL,
		testStatus: state.testStatus
	})
}));
function Switch$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchRoot, {
		"data-slot": "switch",
		"data-size": size,
		className: cn("peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent outline-none transition-all after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=sm]:h-[14px] data-[size=default]:w-[32px] data-[size=sm]:w-[24px] data-disabled:cursor-not-allowed data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-50 dark:data-unchecked:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, {
			"data-slot": "switch-thumb",
			className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=default]/switch:data-checked:-translate-x-[calc(100%-2px)] rtl:group-data-[size=default]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[calc(100%-2px)] rtl:group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground"
		})
	});
}
//#endregion
export { useAIStore as n, Switch$1 as t };
