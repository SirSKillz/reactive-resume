import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { r as useStore } from "../_libs/@tanstack/react-form+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { t as useDialogStore } from "./store-DBaE29-H.mjs";
import { n as useConfirm } from "./use-confirm-DokHH3b4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-form-blocker-vCqqIVKt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useFormBlocker(form, options) {
	const confirm = useConfirm();
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const setOnBeforeClose = useDialogStore((state) => state.setOnBeforeClose);
	const isDirty = useStore(form.store, (state) => state.isDirty);
	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
	const shouldBlockRef = (0, import_react.useRef)(options?.shouldBlock);
	(0, import_react.useEffect)(() => {
		shouldBlockRef.current = options?.shouldBlock;
	}, [options?.shouldBlock]);
	const shouldBlock = (0, import_react.useCallback)(() => {
		if (shouldBlockRef.current) return shouldBlockRef.current();
		return isDirty && !isSubmitting;
	}, [isDirty, isSubmitting]);
	const confirmClose = (0, import_react.useCallback)(async () => {
		if (!shouldBlock()) return true;
		return confirm(i18n._({ id: "GM1Rg-" }), {
			description: i18n._({ id: "LcV6TH" }),
			confirmText: i18n._({ id: "Mv8CyJ" }),
			cancelText: i18n._({ id: "GCJTE0" })
		});
	}, [shouldBlock, confirm]);
	const requestClose = (0, import_react.useCallback)(async () => {
		if (!await confirmClose()) return;
		closeDialog();
	}, [confirmClose, closeDialog]);
	(0, import_react.useEffect)(() => {
		setOnBeforeClose(confirmClose);
		return () => setOnBeforeClose(null);
	}, [confirmClose, setOnBeforeClose]);
	return { requestClose };
}
//#endregion
export { useFormBlocker as t };
