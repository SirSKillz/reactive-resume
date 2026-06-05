import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { t as Spinner } from "./spinner-DIYcuS2L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview.shared-CKH-Mds_.js
var import_jsx_runtime = require_jsx_runtime();
var PDF_PAGE_RENDER_SCALE = 4;
var MAX_PREVIEW_CANVAS_PIXELS = 16777216;
var DEFAULT_PDF_PAGE_SIZE = {
	height: 841.89,
	width: 595.28
};
var normalizeResumePreviewProps = ({ pageGap = 40, pageLayout = "horizontal", pageScale = 1, showPageNumbers = false, ...props }) => ({
	...props,
	pageGap,
	pageLayout,
	pageScale,
	showPageNumbers
});
var getPreviewCanvasScale = (width, height) => {
	const devicePixelRatio = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
	const desiredScale = Math.max(PDF_PAGE_RENDER_SCALE, devicePixelRatio);
	if (width * height * desiredScale * desiredScale <= MAX_PREVIEW_CANVAS_PIXELS) return desiredScale;
	return Math.sqrt(MAX_PREVIEW_CANVAS_PIXELS / (width * height));
};
var getScaledPreviewPageSize = (pageSize, pageScale) => ({
	height: pageSize.height * pageScale,
	width: pageSize.width * pageScale
});
var getResumePreviewPageCount = (data) => Math.max(1, data?.metadata.layout.pages.length ?? 1);
function ResumePreviewLoader({ pageCount = 1, pageClassName, pageGap = 40, pageLayout = "horizontal", pageScale = 1, showPageNumbers = false }) {
	const pageSize = getScaledPreviewPageSize(DEFAULT_PDF_PAGE_SIZE, pageScale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex justify-start gap-(--resume-preview-page-gap)", pageLayout === "horizontal" ? "flex-row items-start" : "flex-col items-center"),
		style: { "--resume-preview-page-gap": pageGap },
		children: Array.from({ length: pageCount }, (_, index) => {
			const pageNumber = index + 1;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "shrink-0",
				children: [showPageNumbers ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "mb-1 font-medium text-[0.625rem] text-muted-foreground",
					children: [
						"Page ",
						pageNumber,
						" of ",
						pageCount
					]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "img",
					"aria-label": `Loading resume page ${pageNumber} of ${pageCount}`,
					style: pageSize,
					className: cn("aspect-page overflow-hidden rounded-md bg-white", pageClassName),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-10" })
				})]
			}, pageNumber);
		})
	});
}
//#endregion
export { getScaledPreviewPageSize as a, getResumePreviewPageCount as i, ResumePreviewLoader as n, normalizeResumePreviewProps as o, getPreviewCanvasScale as r, DEFAULT_PDF_PAGE_SIZE as t };
