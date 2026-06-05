import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { h as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { s as consumeEventIterator } from "../_libs/@orpc/client+[...].mjs";
import { n as debounce, t as isEqual } from "../_libs/es-toolkit.mjs";
import { m as orpc, n as applyResumePatches, o as createResumePatches, x as streamClient } from "./client-O01ffOLq.mjs";
import { i as create, r as immer } from "../_libs/zustand.mjs";
import { o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/builder-resume-draft-BR-M94v2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var SAVE_DEBOUNCE_MS = 500;
var runtimes = /* @__PURE__ */ new Map();
var lockedToastId;
function getResumeQueryKey(id) {
	return orpc.resume.getById.queryOptions({ input: { id } }).queryKey;
}
function cloneResumeData(data) {
	return structuredClone(data);
}
function setRuntimeBaseline(resume) {
	const runtime = getRuntime(resume.id);
	runtime.baselineData = cloneResumeData(resume.data);
	runtime.hasPendingLocalChanges = false;
}
function createRuntime() {
	const abortController = new AbortController();
	const runtime = {
		abortController,
		hasPendingLocalChanges: false,
		syncResume: debounce(async (resume) => {
			const runtime = runtimes.get(resume.id);
			if (!runtime) return;
			const operations = createResumePatches(runtime.baselineData ?? cloneResumeData(resume.data), resume.data);
			if (operations.length === 0) {
				runtime.hasPendingLocalChanges = false;
				return;
			}
			const submittedData = cloneResumeData(resume.data);
			try {
				const updated = await orpc.resume.patch.call({
					id: resume.id,
					operations
				}, { signal: abortController.signal });
				runtime.queryClient?.setQueryData(getResumeQueryKey(resume.id), updated);
				runtime.baselineData = cloneResumeData(updated.data);
				const currentResume = useResumeStore.getState().resume;
				if (currentResume?.id === resume.id && isEqual(currentResume.data, submittedData)) {
					runtime.hasPendingLocalChanges = false;
					useResumeStore.getState().replaceResumeFromServer(updated);
				} else {
					runtime.hasPendingLocalChanges = true;
					useResumeStore.getState().mergeResumeMetadata(updated);
					syncCurrentResume(resume.id);
				}
				if (runtime.syncErrorToastId === void 0) return;
				toast.dismiss(runtime.syncErrorToastId);
				runtime.syncErrorToastId = void 0;
			} catch (error) {
				if (error instanceof DOMException && error.name === "AbortError") return;
				runtime.syncErrorToastId = toast.error(i18n._({ id: "_eBA-C" }), {
					id: runtime.syncErrorToastId,
					duration: Number.POSITIVE_INFINITY
				});
			}
		}, SAVE_DEBOUNCE_MS, { signal: abortController.signal })
	};
	if (typeof window !== "undefined") {
		runtime.beforeUnloadHandler = () => runtime.syncResume.flush();
		window.addEventListener("beforeunload", runtime.beforeUnloadHandler);
	}
	return runtime;
}
function getRuntime(id) {
	const existing = runtimes.get(id);
	if (existing) return existing;
	const runtime = createRuntime();
	runtimes.set(id, runtime);
	return runtime;
}
function bindRuntimeQueryClient(id, queryClient) {
	getRuntime(id).queryClient = queryClient;
}
function hasPendingLocalChanges(id) {
	return getRuntime(id).hasPendingLocalChanges;
}
function cleanupRuntime(id) {
	const runtime = runtimes.get(id);
	if (!runtime) return;
	runtime.syncResume.flush();
	runtime.abortController.abort();
	if (runtime.beforeUnloadHandler && typeof window !== "undefined") window.removeEventListener("beforeunload", runtime.beforeUnloadHandler);
	runtimes.delete(id);
}
function syncCurrentResume(id) {
	const resume = useResumeStore.getState().resume;
	if (!resume || resume.id !== id) return;
	getRuntime(id).syncResume(resume);
}
var useResumeStore = create()(immer((set, get) => ({
	resume: null,
	resumeId: void 0,
	isReady: false,
	initialize: (resume) => {
		if (resume) setRuntimeBaseline(resume);
		set((state) => {
			state.resume = resume;
			state.resumeId = resume?.id;
			state.isReady = resume !== null;
		});
	},
	reset: () => {
		set((state) => {
			state.resume = null;
			state.resumeId = void 0;
			state.isReady = false;
		});
	},
	replaceResumeDraft: (resume) => {
		set((state) => {
			state.resume = resume;
			state.resumeId = resume.id;
			state.isReady = true;
		});
	},
	replaceResumeFromServer: (resume) => {
		setRuntimeBaseline(resume);
		set((state) => {
			state.resume = resume;
			state.resumeId = resume.id;
			state.isReady = true;
		});
	},
	patchResume: (fn) => {
		set((state) => {
			if (!state.resume) return;
			fn(state.resume);
		});
	},
	mergeResumeMetadata: (resume) => {
		set((state) => {
			if (!state.resume || state.resume.id !== resume.id) return;
			state.resume.name = resume.name;
			state.resume.slug = resume.slug;
			state.resume.tags = resume.tags;
			state.resume.isLocked = resume.isLocked;
			state.resume.updatedAt = resume.updatedAt;
			state.resume.hasPassword = resume.hasPassword;
			state.resume.isPublic = resume.isPublic;
		});
	},
	updateResumeData: (fn) => {
		const currentResume = get().resume;
		if (!currentResume) return;
		if (currentResume.isLocked) {
			lockedToastId = toast.error(i18n._({ id: "NAJr4V" }), { id: lockedToastId });
			return;
		}
		set((state) => {
			if (!state.resume) return;
			fn(state.resume.data);
		});
		getRuntime(currentResume.id).hasPendingLocalChanges = true;
		syncCurrentResume(currentResume.id);
	}
})));
function useInitializeResumeStore() {
	return useResumeStore((state) => state.initialize);
}
function useResetResumeStore() {
	return useResumeStore((state) => state.reset);
}
function useMergeResumeMetadata() {
	return useResumeStore((state) => state.mergeResumeMetadata);
}
function usePatchResume() {
	return useResumeStore((state) => state.patchResume);
}
function useReplaceResumeFromServer() {
	const queryClient = useQueryClient();
	const replaceResumeFromServer = useResumeStore((state) => state.replaceResumeFromServer);
	return (0, import_react.useCallback)((resume) => {
		bindRuntimeQueryClient(resume.id, queryClient);
		queryClient.setQueryData(getResumeQueryKey(resume.id), resume);
		replaceResumeFromServer(resume);
	}, [queryClient, replaceResumeFromServer]);
}
function useBuilderResumeSelector(selector) {
	const resumeId = useParams({ strict: false }).resumeId;
	return useResumeStore((state) => {
		if (!resumeId || !state.resume || state.resume.id !== resumeId) return void 0;
		return selector(state.resume);
	});
}
function useCurrentBuilderResumeSelector(selector) {
	const selected = useBuilderResumeSelector(selector);
	if (selected === void 0) throw new Error("Resume data is required before rendering this component.");
	return selected;
}
function useResume() {
	return useBuilderResumeSelector((resume) => resume);
}
function useCurrentResume() {
	const resume = useResume();
	if (!resume) throw new Error("Resume data is required before rendering this component.");
	return resume;
}
function useResumeData() {
	return useBuilderResumeSelector((resume) => resume.data);
}
function useUpdateResumeData() {
	const queryClient = useQueryClient();
	const resumeId = useParams({ strict: false }).resumeId;
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	return (0, import_react.useCallback)((fn) => {
		if (!resumeId) return;
		bindRuntimeQueryClient(resumeId, queryClient);
		updateResumeData(fn);
	}, [
		queryClient,
		resumeId,
		updateResumeData
	]);
}
function useResumeUpdateSubscription() {
	const queryClient = useQueryClient();
	const replaceResumeFromServer = useResumeStore((state) => state.replaceResumeFromServer);
	const resumeId = useParams({ strict: false }).resumeId;
	const [_retryNonce, setRetryNonce] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!resumeId) return;
		bindRuntimeQueryClient(resumeId, queryClient);
		let didCancel = false;
		let retryTimer;
		const cancel = consumeEventIterator(streamClient.resume.updates.subscribe({ id: resumeId }), {
			onEvent: async () => {
				try {
					const resume = await orpc.resume.getById.call({ id: resumeId });
					if (hasPendingLocalChanges(resumeId)) {
						const runtime = getRuntime(resumeId);
						const currentResume = useResumeStore.getState().resume;
						const baselineData = runtime.baselineData ?? currentResume?.data;
						if (currentResume && baselineData) {
							const localOperations = createResumePatches(baselineData, currentResume.data);
							const mergedData = applyResumePatches(resume.data, localOperations);
							runtime.baselineData = cloneResumeData(resume.data);
							runtime.hasPendingLocalChanges = localOperations.length > 0;
							queryClient.setQueryData(getResumeQueryKey(resumeId), resume);
							useResumeStore.getState().replaceResumeDraft({
								...resume,
								data: mergedData
							});
							syncCurrentResume(resumeId);
						} else {
							runtime.baselineData = cloneResumeData(resume.data);
							useResumeStore.getState().mergeResumeMetadata(resume);
						}
						return;
					}
					queryClient.setQueryData(getResumeQueryKey(resumeId), resume);
					replaceResumeFromServer(resume);
				} catch (error) {
					if (error instanceof DOMException && error.name === "AbortError") return;
					console.warn("Failed to refresh resume after update event:", error);
				}
			},
			onError: (error) => {
				if (didCancel) return;
				console.warn("Resume update stream failed, reconnecting:", error);
				retryTimer = window.setTimeout(() => setRetryNonce((value) => value + 1), 2500);
			}
		});
		return () => {
			didCancel = true;
			if (retryTimer) window.clearTimeout(retryTimer);
			cancel().catch(() => {});
		};
	}, [
		queryClient,
		replaceResumeFromServer,
		resumeId
	]);
}
function useResumeCleanup() {
	const resumeId = useParams({ strict: false }).resumeId;
	const reset = useResetResumeStore();
	(0, import_react.useEffect)(() => {
		if (!resumeId) return;
		return () => {
			cleanupRuntime(resumeId);
			reset();
		};
	}, [resumeId, reset]);
}
//#endregion
export { usePatchResume as a, useResumeCleanup as c, useResumeUpdateSubscription as d, useUpdateResumeData as f, useMergeResumeMetadata as i, useResumeData as l, useCurrentResume as n, useReplaceResumeFromServer as o, useInitializeResumeStore as r, useResume as s, useCurrentBuilderResumeSelector as t, useResumeStore as u };
