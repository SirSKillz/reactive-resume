import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as useIsClient } from "../_libs/usehooks-ts.mjs";
import { l as useResumeData } from "./builder-resume-draft-BR-M94v2.mjs";
import { i as getResumePreviewPageCount, n as ResumePreviewLoader, o as normalizeResumePreviewProps } from "./preview.shared-CKH-Mds_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview-Cj7IClou.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ResumePreviewClient = (0, import_react.lazy)(() => import("./preview.browser-BELgcSjH.mjs").then((module) => ({ default: module.ResumePreviewClient })));
function ResumePreview(props) {
	const isClient = useIsClient();
	const resolvedProps = normalizeResumePreviewProps(props);
	const builderResumeData = useResumeData();
	const pageCount = getResumePreviewPageCount(resolvedProps.data ?? builderResumeData);
	if (!isClient) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePreviewLoader, {
			pageCount,
			pageClassName: resolvedProps.pageClassName,
			pageGap: resolvedProps.pageGap,
			pageLayout: resolvedProps.pageLayout,
			pageScale: resolvedProps.pageScale,
			showPageNumbers: resolvedProps.showPageNumbers
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePreviewClient, { ...resolvedProps })
	});
}
//#endregion
export { ResumePreview as t };
