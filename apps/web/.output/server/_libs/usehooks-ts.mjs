import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "./@ai-sdk/react+[...].mjs";
import { t as require_lodash_debounce } from "./lodash.debounce.mjs";
//#region ../../node_modules/.pnpm/usehooks-ts@3.1.1_react@19.2.6/node_modules/usehooks-ts/dist/index.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_lodash_debounce = /* @__PURE__ */ __toESM(require_lodash_debounce(), 1);
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function useEventListener(eventName, handler, element, options) {
	const savedHandler = (0, import_react.useRef)(handler);
	useIsomorphicLayoutEffect(() => {
		savedHandler.current = handler;
	}, [handler]);
	(0, import_react.useEffect)(() => {
		const targetElement = (element == null ? void 0 : element.current) ?? window;
		if (!(targetElement && targetElement.addEventListener)) return;
		const listener = (event) => {
			savedHandler.current(event);
		};
		targetElement.addEventListener(eventName, listener, options);
		return () => {
			targetElement.removeEventListener(eventName, listener, options);
		};
	}, [
		eventName,
		element,
		options
	]);
}
function useCopyToClipboard() {
	const [copiedText, setCopiedText] = (0, import_react.useState)(null);
	return [copiedText, (0, import_react.useCallback)(async (text) => {
		if (!(navigator == null ? void 0 : navigator.clipboard)) {
			console.warn("Clipboard not supported");
			return false;
		}
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
			return false;
		}
	}, [])];
}
function useUnmount(func) {
	const funcRef = (0, import_react.useRef)(func);
	funcRef.current = func;
	(0, import_react.useEffect)(() => () => {
		funcRef.current();
	}, []);
}
function useDebounceCallback(func, delay = 500, options) {
	const debouncedFunc = (0, import_react.useRef)();
	useUnmount(() => {
		if (debouncedFunc.current) debouncedFunc.current.cancel();
	});
	const debounced = (0, import_react.useMemo)(() => {
		const debouncedFuncInstance = (0, import_lodash_debounce.default)(func, delay, options);
		const wrappedFunc = (...args) => {
			return debouncedFuncInstance(...args);
		};
		wrappedFunc.cancel = () => {
			debouncedFuncInstance.cancel();
		};
		wrappedFunc.isPending = () => {
			return !!debouncedFunc.current;
		};
		wrappedFunc.flush = () => {
			return debouncedFuncInstance.flush();
		};
		return wrappedFunc;
	}, [
		func,
		delay,
		options
	]);
	(0, import_react.useEffect)(() => {
		debouncedFunc.current = (0, import_lodash_debounce.default)(func, delay, options);
	}, [
		func,
		delay,
		options
	]);
	return debounced;
}
function useIsClient() {
	const [isClient, setClient] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setClient(true);
	}, []);
	return isClient;
}
function useTimeout(callback, delay) {
	const savedCallback = (0, import_react.useRef)(callback);
	useIsomorphicLayoutEffect(() => {
		savedCallback.current = callback;
	}, [callback]);
	(0, import_react.useEffect)(() => {
		if (!delay && delay !== 0) return;
		const id = setTimeout(() => {
			savedCallback.current();
		}, delay);
		return () => {
			clearTimeout(id);
		};
	}, [delay]);
}
function useToggle(defaultValue) {
	const [value, setValue] = (0, import_react.useState)(!!defaultValue);
	return [
		value,
		(0, import_react.useCallback)(() => {
			setValue((x) => !x);
		}, []),
		setValue
	];
}
var IS_SERVER7 = typeof window === "undefined";
function useWindowSize(options = {}) {
	let { initializeWithValue = true } = options;
	if (IS_SERVER7) initializeWithValue = false;
	const [windowSize, setWindowSize] = (0, import_react.useState)(() => {
		if (initializeWithValue) return {
			width: window.innerWidth,
			height: window.innerHeight
		};
		return {
			width: void 0,
			height: void 0
		};
	});
	const debouncedSetWindowSize = useDebounceCallback(setWindowSize, options.debounceDelay);
	function handleSize() {
		(options.debounceDelay ? debouncedSetWindowSize : setWindowSize)({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}
	useEventListener("resize", handleSize);
	useIsomorphicLayoutEffect(() => {
		handleSize();
	}, []);
	return windowSize;
}
//#endregion
export { useWindowSize as a, useToggle as i, useIsClient as n, useTimeout as r, useCopyToClipboard as t };
