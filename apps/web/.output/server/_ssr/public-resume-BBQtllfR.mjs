import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { d as getRouteApi } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { n as createResumePdfBlob } from "./pdf-document-B-TL3j4e.mjs";
import { m as orpc } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { An as c, un as e } from "../_libs/phosphor-icons__react.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as BrandIcon } from "./brand-icon-WdLQXPMU.mjs";
import { t as LoadingScreen } from "./loading-screen-CCLlz1nZ.mjs";
import { n as generateFilename, t as downloadWithAnchor } from "./file-fX8PEHw_.mjs";
import { t as ResumePreview } from "./preview-Cj7IClou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-resume-BBQtllfR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var publicResumeRoute = getRouteApi("/$username/$slug");
function PublicResumeRoute() {
	const { username, slug } = publicResumeRoute.useParams();
	const { data: resume } = useQuery(orpc.resume.getBySlug.queryOptions({ input: {
		username,
		slug
	} }));
	const [isPrinting, setIsPrinting] = (0, import_react.useState)(false);
	const onDownloadPDF = (0, import_react.useCallback)(async () => {
		if (!resume) return;
		const filename = generateFilename(resume.name || resume.data.basics.name || resume.slug, "pdf");
		const toastId = toast.loading(i18n._({ id: "UC7fTw" }));
		setIsPrinting(true);
		try {
			downloadWithAnchor(await createResumePdfBlob(resume.data), filename);
		} catch {
			toast.error(i18n._({ id: "ru4Jfk" }));
		} finally {
			setIsPrinting(false);
			toast.dismiss(toastId);
		}
	}, [resume]);
	if (!resume) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto my-12 flex flex-col items-center gap-12 print:m-0 print:block print:max-w-full print:px-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePreview, {
			data: resume.data,
			pageGap: "1rem",
			pageScale: 1.25,
			pageLayout: "vertical",
			pageClassName: "print:w-full! w-full max-w-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
			className: "flex justify-center print:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandIcon, {
				variant: "icon",
				className: "size-8 opacity-60"
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		size: "icon-lg",
		variant: "outline",
		disabled: isPrinting,
		onClick: onDownloadPDF,
		"aria-label": i18n._({ id: "KMdYRY" }),
		title: i18n._({ id: "KMdYRY" }),
		className: "fixed right-6 bottom-6 z-50 rounded-full bg-background/95 opacity-70 shadow-lg backdrop-blur transition-opacity hover:opacity-100 print:hidden",
		children: isPrinting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { className: "size-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, { className: "size-5" })
	})] });
}
//#endregion
export { PublicResumeRoute };
