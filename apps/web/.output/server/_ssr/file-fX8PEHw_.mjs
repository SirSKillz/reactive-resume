import { i as slugify } from "./string-DY6EtMBd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/file-fX8PEHw_.js
function generateFilename(prefix, extension) {
	return `${slugify(prefix)}${extension ? `.${extension}` : ""}`;
}
function downloadWithAnchor(blob, filename) {
	const a = document.createElement("a");
	const url = URL.createObjectURL(blob);
	a.href = url;
	a.rel = "noopener";
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(() => URL.revokeObjectURL(url), 5e3);
}
//#endregion
export { generateFilename as n, downloadWithAnchor as t };
