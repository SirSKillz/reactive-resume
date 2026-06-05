import { x as deepEqual } from "./@tanstack/react-router+[...].mjs";
//#region ../../node_modules/.pnpm/@tanstack+router-core@1.169.2/node_modules/@tanstack/router-core/dist/esm/searchMiddleware.js
/**
* Remove optional or default-valued search params from navigations.
*
* - Pass `true` (only if there are no required search params) to strip all.
* - Pass an array to always remove those optional keys.
* - Pass an object of default values; keys equal (deeply) to the defaults are removed.
*
* @returns A search middleware suitable for route `search.middlewares`.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/stripSearchParamsFunction
*/
function stripSearchParams(input) {
	return ({ search, next }) => {
		if (input === true) return {};
		const result = { ...next(search) };
		if (Array.isArray(input)) input.forEach((key) => {
			delete result[key];
		});
		else Object.entries(input).forEach(([key, value]) => {
			if (deepEqual(result[key], value)) delete result[key];
		});
		return result;
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@tanstack+router-core@1.169.2/node_modules/@tanstack/router-core/dist/esm/ssr/handlerCallback.js
function defineHandlerCallback(handler) {
	return handler;
}
//#endregion
export { stripSearchParams as n, defineHandlerCallback as t };
