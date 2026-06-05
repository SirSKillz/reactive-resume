import { Lt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { n as PDFViewer } from "./_libs/react-pdf__renderer.mjs";
import { l as useLocalizedResumeDocument } from "./_ssr/pdf-document-B-TL3j4e.mjs";
import { t as templateSchema } from "./_ssr/templates-Dd9nHz6N.mjs";
import { t as sampleResumeData } from "./_ssr/sample-3VDxHOcm.mjs";
import { t as Route } from "./_-DIJ7Ksl4.mjs";
import { n as useIsClient } from "./_libs/usehooks-ts.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_-DyZd8vIs.js
var import_jsx_runtime = require_jsx_runtime();
function TemplatePdfRoute() {
	const isClient = useIsClient();
	const templateName = Route.useParams()._splat?.split(".")[0] ?? "azurill";
	const resumeDocument = useLocalizedResumeDocument(sampleResumeData, templateSchema.parse(templateName));
	if (!isClient || !resumeDocument) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PDFViewer, {
		showToolbar: false,
		style: {
			height: "100svh",
			width: "100svw",
			border: "none"
		},
		children: resumeDocument
	});
}
//#endregion
export { TemplatePdfRoute as component };
