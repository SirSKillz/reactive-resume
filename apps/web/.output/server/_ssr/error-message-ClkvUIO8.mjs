import { f as ORPCError } from "../_libs/@orpc/client+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/error-message-ClkvUIO8.js
function getReadableErrorMessage(error, fallback) {
	if (typeof error === "string" && error) return error;
	if (error instanceof Error && error.message) return error.message;
	return fallback;
}
function getOrpcErrorMessage(error, options) {
	if (!(error instanceof ORPCError)) return getReadableErrorMessage(error, options.fallback);
	const mappedMessage = options.byCode?.[error.code];
	if (mappedMessage) return mappedMessage;
	if (options.allowServerMessage && error.message) return error.message;
	return options.fallback;
}
function getResumeErrorMessage(error) {
	return getOrpcErrorMessage(error, {
		byCode: {
			RESUME_SLUG_ALREADY_EXISTS: "A resume with this slug already exists.",
			RESUME_LOCKED: "This resume is locked. Unlock it first to make changes."
		},
		fallback: "Something went wrong. Please try again."
	});
}
//#endregion
export { getReadableErrorMessage as n, getResumeErrorMessage as r, getOrpcErrorMessage as t };
