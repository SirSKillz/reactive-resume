import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { i as pdf } from "../_libs/react-pdf__renderer.mjs";
import { l as useLocalizedResumeDocument } from "./pdf-document-B-TL3j4e.mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { d as AnimatePresence, l as motion } from "../_libs/framer-motion.mjs";
import { l as useResumeData } from "./builder-resume-draft-BR-M94v2.mjs";
import { a as getScaledPreviewPageSize, i as getResumePreviewPageCount, n as ResumePreviewLoader, r as getPreviewCanvasScale, t as DEFAULT_PDF_PAGE_SIZE } from "./preview.shared-CKH-Mds_.mjs";
import { i as getDocument, n as GlobalWorkerOptions, r as RenderingCancelledException, t as AnnotationMode } from "../_libs/pdfjs-dist.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview.browser-BELgcSjH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
var isRenderingCancelledError = (error) => error instanceof RenderingCancelledException || typeof error === "object" && error !== null && "name" in error && error.name === "RenderingCancelledException";
function PdfCanvasDocument({ children, file, onLoadSuccess }) {
	const [document, setDocument] = (0, import_react.useState)(null);
	const onLoadSuccessRef = (0, import_react.useRef)(onLoadSuccess);
	(0, import_react.useEffect)(() => {
		onLoadSuccessRef.current = onLoadSuccess;
	}, [onLoadSuccess]);
	(0, import_react.useEffect)(() => {
		let isCancelled = false;
		let loadingTask;
		let loadedDocument;
		const loadDocument = async () => {
			setDocument(null);
			const arrayBuffer = await file.arrayBuffer();
			if (isCancelled) return;
			loadingTask = getDocument({ data: new Uint8Array(arrayBuffer) });
			const pdfDocument = await loadingTask.promise;
			if (isCancelled) {
				pdfDocument.destroy();
				return;
			}
			loadedDocument = pdfDocument;
			setDocument(pdfDocument);
			onLoadSuccessRef.current(pdfDocument);
		};
		loadDocument().catch((error) => {
			if (isCancelled) return;
			console.error("Failed to load PDF document", error);
		});
		return () => {
			isCancelled = true;
			if (loadedDocument) loadedDocument.destroy();
			else if (loadingTask) loadingTask.destroy();
		};
	}, [file]);
	if (!document) return null;
	return children(document);
}
function PdfCanvasPage({ className, document, onLoadSuccess, onRenderSuccess, pageNumber, pageScale, pageSize = DEFAULT_PDF_PAGE_SIZE, showPageNumbers, totalPages }) {
	const canvasRef = (0, import_react.useRef)(null);
	const onLoadSuccessRef = (0, import_react.useRef)(onLoadSuccess);
	const onRenderSuccessRef = (0, import_react.useRef)(onRenderSuccess);
	const scaledPageSize = getScaledPreviewPageSize(pageSize, pageScale);
	(0, import_react.useEffect)(() => {
		onLoadSuccessRef.current = onLoadSuccess;
		onRenderSuccessRef.current = onRenderSuccess;
	}, [onLoadSuccess, onRenderSuccess]);
	(0, import_react.useEffect)(() => {
		let isCancelled = false;
		let renderTask;
		const renderPage = async () => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const page = await document.getPage(pageNumber);
			try {
				if (isCancelled) {
					page.cleanup();
					return;
				}
				const baseViewport = page.getViewport({ scale: 1 });
				const pageSize = {
					height: baseViewport.height,
					width: baseViewport.width
				};
				onLoadSuccessRef.current(pageNumber, pageSize);
				const width = baseViewport.width * pageScale;
				const height = baseViewport.height * pageScale;
				const renderScale = getPreviewCanvasScale(width, height);
				const canvasContext = canvas.getContext("2d");
				if (!canvasContext) return;
				canvas.style.width = `${width}px`;
				canvas.style.height = `${height}px`;
				canvas.width = Math.floor(width * renderScale);
				canvas.height = Math.floor(height * renderScale);
				canvasContext.setTransform(1, 0, 0, 1, 0, 0);
				canvasContext.clearRect(0, 0, canvas.width, canvas.height);
				const viewport = page.getViewport({ scale: pageScale });
				const transform = [
					renderScale,
					0,
					0,
					renderScale,
					0,
					0
				];
				renderTask = page.render({
					canvas,
					canvasContext,
					viewport,
					transform,
					annotationMode: AnnotationMode.DISABLE,
					background: "white"
				});
				await renderTask.promise;
				renderTask = void 0;
				if (!isCancelled) onRenderSuccessRef.current?.();
			} finally {
				page.cleanup();
			}
		};
		renderPage().catch((error) => {
			if (isRenderingCancelledError(error)) return;
			console.error(`Failed to render PDF page ${pageNumber}`, error);
		});
		return () => {
			isCancelled = true;
			if (renderTask) renderTask.cancel();
		};
	}, [
		document,
		pageNumber,
		pageScale
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "shrink-0",
		children: [showPageNumbers ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "mb-1 font-medium text-[0.625rem] text-muted-foreground",
			children: [
				"Page ",
				pageNumber,
				" of ",
				totalPages
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "img",
			"aria-label": `Resume page ${pageNumber} of ${totalPages}`,
			style: scaledPageSize,
			className: cn("aspect-page overflow-hidden rounded-md", className),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvasRef })
		})]
	});
}
var UPDATE_DEBOUNCE_MS = 100;
var CROSSFADE_DURATION_MS = 180;
var createPreviewPdf = (file, id, hasExistingPreview) => ({
	file,
	id,
	numPages: 0,
	pageSizes: {},
	phase: hasExistingPreview ? "staged" : "active",
	renderedPages: []
});
var addPreviewLayer = (layers, nextPdf) => {
	const activeLayers = layers.filter((layer) => layer.phase === "active");
	return activeLayers.length === 0 ? [nextPdf] : [...activeLayers, nextPdf];
};
var getActivePreviewLayer = (layers) => layers.find((layer) => layer.phase === "active") ?? null;
var setPreviewPageCount = (layers, layerId, numPages) => layers.map((layer) => layer.id === layerId ? {
	...layer,
	numPages
} : layer);
var setPreviewPageSize = (layers, layerId, pageNumber, pageSize) => layers.map((layer) => layer.id === layerId ? {
	...layer,
	pageSizes: {
		...layer.pageSizes,
		[pageNumber]: pageSize
	}
} : layer);
var markPreviewPageRendered = (layers, layerId, pageNumber) => {
	let shouldPromoteLayer = false;
	const nextLayers = layers.map((layer) => {
		if (layer.id !== layerId || layer.renderedPages.includes(pageNumber)) return layer;
		const renderedPages = [...layer.renderedPages, pageNumber];
		const nextLayer = {
			...layer,
			renderedPages
		};
		if (layer.phase === "staged" && renderedPages.length >= layer.numPages) {
			shouldPromoteLayer = true;
			return {
				...nextLayer,
				phase: "active"
			};
		}
		return nextLayer;
	});
	if (!shouldPromoteLayer) return nextLayers;
	return nextLayers.map((layer) => {
		if (layer.id === layerId) return layer;
		if (layer.phase === "active") return {
			...layer,
			phase: "exiting"
		};
		return layer;
	});
};
var removePreviewLayer = (layers, layerId) => layers.filter((layer) => layer.id !== layerId);
function ResumePreviewClient({ className, data, pageGap, pageLayout, pageScale, pageClassName, showPageNumbers }) {
	const builderResumeData = useResumeData();
	const resumeData = data ?? builderResumeData;
	const resumeDocument = useLocalizedResumeDocument(resumeData);
	const [previewLayers, setPreviewLayers] = (0, import_react.useState)([]);
	const pdfIdRef = (0, import_react.useRef)(0);
	const requestIdRef = (0, import_react.useRef)(0);
	const hasPreviewRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!resumeDocument) return;
		let cancelled = false;
		const requestId = ++requestIdRef.current;
		const delay = hasPreviewRef.current ? UPDATE_DEBOUNCE_MS : 0;
		const generatePdfPreview = async () => {
			try {
				const blob = await pdf(resumeDocument).toBlob();
				if (cancelled || requestId !== requestIdRef.current) return;
				const nextPdf = createPreviewPdf(blob, pdfIdRef.current++, hasPreviewRef.current);
				hasPreviewRef.current = true;
				setPreviewLayers((current) => addPreviewLayer(current, nextPdf));
			} catch {}
		};
		const timeoutId = window.setTimeout(() => {
			generatePdfPreview();
		}, delay);
		return () => {
			cancelled = true;
			window.clearTimeout(timeoutId);
		};
	}, [resumeDocument]);
	if (!resumeData) return null;
	if (!getActivePreviewLayer(previewLayers)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePreviewLoader, {
		pageCount: getResumePreviewPageCount(resumeData),
		pageClassName,
		pageGap,
		pageLayout,
		pageScale,
		showPageNumbers
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			children: previewLayers.map((visiblePdf) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": visiblePdf.phase !== "active",
				className: cn("col-start-1 row-start-1", visiblePdf.phase !== "active" && "pointer-events-none"),
				style: { "--resume-preview-page-gap": pageGap },
				initial: { opacity: visiblePdf.phase === "active" ? 1 : 0 },
				animate: { opacity: visiblePdf.phase === "active" ? 1 : 0 },
				exit: { opacity: 0 },
				transition: {
					duration: CROSSFADE_DURATION_MS / 1e3,
					ease: "easeOut"
				},
				onAnimationComplete: () => {
					if (visiblePdf.phase !== "exiting") return;
					setPreviewLayers((current) => removePreviewLayer(current, visiblePdf.id));
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfCanvasDocument, {
					file: visiblePdf.file,
					onLoadSuccess: (document) => {
						setPreviewLayers((current) => setPreviewPageCount(current, visiblePdf.id, document.numPages));
					},
					children: (document) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex justify-start gap-(--resume-preview-page-gap)", pageLayout === "horizontal" ? "flex-row items-start" : "flex-col items-center"),
						children: Array.from({ length: visiblePdf.numPages }, (_, index) => {
							const pageNumber = index + 1;
							const totalPages = visiblePdf.numPages;
							const pageSize = visiblePdf.pageSizes[pageNumber];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfCanvasPage, {
								document,
								pageSize,
								pageNumber,
								pageScale,
								totalPages,
								className: pageClassName,
								showPageNumbers,
								onLoadSuccess: (_, pageSize) => {
									setPreviewLayers((current) => setPreviewPageSize(current, visiblePdf.id, pageNumber, pageSize));
								},
								onRenderSuccess: () => {
									if (visiblePdf.phase !== "staged") return;
									setPreviewLayers((current) => markPreviewPageRendered(current, visiblePdf.id, pageNumber));
								}
							}, `${visiblePdf.id}-${pageNumber}`);
						})
					})
				})
			}, visiblePdf.id))
		})
	});
}
//#endregion
export { ResumePreviewClient };
