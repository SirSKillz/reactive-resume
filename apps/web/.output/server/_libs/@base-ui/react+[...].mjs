import { o as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { n as require_react } from "../@ai-sdk/react+[...].mjs";
//#region ../../node_modules/.pnpm/react@19.2.6/node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region ../../node_modules/.pnpm/react@19.2.6/node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@19.2.6/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@19.2.6/node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@19.2.6/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react(), shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@19.2.6/node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_with_selector_production();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dom@19.2.6_react@19.2.6/node_modules/react-dom/cjs/react-dom.production.js
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	}, REACT_PORTAL_TYPE = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE,
			key: null == key ? null : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.2.6";
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dom@19.2.6_react@19.2.6/node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production();
}));
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
var import_react = /* @__PURE__ */ __toESM(require_react());
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit$1() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit$1() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return node.ownerDocument ? node.ownerDocument.body : node.body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useRefWithInit.js
var UNINITIALIZED = {};
/**
* A React.useRef() that is initialized with a function. Note that it accepts an optional
* initialization argument, so the initialization function doesn't need to be an inline closure.
*
* @usage
*   const ref = useRefWithInit(sortColumns, columns)
*/
function useRefWithInit(init, initArg) {
	const ref = import_react.useRef(UNINITIALIZED);
	if (ref.current === UNINITIALIZED) ref.current = init(initArg);
	return ref;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useStableCallback.js
var useInsertionEffect = import_react[`useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)];
var useSafeInsertionEffect = useInsertionEffect && useInsertionEffect !== import_react.useLayoutEffect ? useInsertionEffect : (fn) => fn();
/**
* Stabilizes the function passed so it's always the same between renders.
*
* The function becomes non-reactive to any values it captures.
* It can safely be passed as a dependency of `React.useMemo` and `React.useEffect` without re-triggering them if its captured values change.
*
* The function must only be called inside effects and event handlers, never during render (which throws an error).
*
* This hook is a more permissive version of React 19.2's `React.useEffectEvent` in that it can be passed through contexts and called in event handler props, not just effects.
*/
function useStableCallback(callback) {
	const stable = useRefWithInit(createStableCallback).current;
	stable.next = callback;
	useSafeInsertionEffect(stable.effect);
	return stable.trampoline;
}
function createStableCallback() {
	const stable = {
		next: void 0,
		callback: assertNotCalled,
		trampoline: (...args) => stable.callback?.(...args),
		effect: () => {
			stable.callback = stable.next;
		}
	};
	return stable;
}
function assertNotCalled() {}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/safeReact.js
var SafeReact = { ...import_react };
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js
var noop = () => {};
var useIsoLayoutEffect = typeof document !== "undefined" ? import_react.useLayoutEffect : noop;
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/mergeObjects.js
function mergeObjects(a, b) {
	if (a && !b) return a;
	if (!a && b) return b;
	if (a || b) return {
		...a,
		...b
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/merge-props/mergeProps.js
var EMPTY_PROPS = {};
/**
* Merges multiple sets of React props. It follows the Object.assign pattern where the rightmost object's fields overwrite
* the conflicting ones from others. This doesn't apply to event handlers, `className` and `style` props.
*
* Event handlers are merged and called in right-to-left order (rightmost handler executes first, leftmost last).
* For React synthetic events, the rightmost handler can prevent prior (left-positioned) handlers from executing
* by calling `event.preventBaseUIHandler()`. For non-synthetic events (custom events with primitive/object values),
* all handlers always execute without prevention capability.
*
* The `className` prop is merged by concatenating classes in right-to-left order (rightmost class appears first in the string).
* The `style` prop is merged with rightmost styles overwriting the prior ones.
*
* Props can either be provided as objects or as functions that take the previous props as an argument.
* The function will receive the merged props up to that point (going from left to right):
* so in the case of `(obj1, obj2, fn, obj3)`, `fn` will receive the merged props of `obj1` and `obj2`.
* The function is responsible for chaining event handlers if needed (that is, we don't run the merge logic).
*
* Event handlers returned by the functions are not automatically prevented when `preventBaseUIHandler` is called.
* They must check `event.baseUIHandlerPrevented` themselves and bail out if it's true.
*
* @important **`ref` is not merged.**
* @param a Props object to merge.
* @param b Props object to merge. The function will overwrite conflicting props from `a`.
* @param c Props object to merge. The function will overwrite conflicting props from previous parameters.
* @param d Props object to merge. The function will overwrite conflicting props from previous parameters.
* @param e Props object to merge. The function will overwrite conflicting props from previous parameters.
* @returns The merged props.
* @public
*/
function mergeProps$1(a, b, c, d, e) {
	if (!c && !d && !e && !a) return createInitialMergedProps(b);
	let merged = createInitialMergedProps(a);
	if (b) merged = mergeInto(merged, b);
	if (c) merged = mergeInto(merged, c);
	if (d) merged = mergeInto(merged, d);
	if (e) merged = mergeInto(merged, e);
	return merged;
}
/**
* Merges an arbitrary number of React props using the same logic as {@link mergeProps}.
* This function accepts an array of props instead of individual arguments.
*
* This has slightly lower performance than {@link mergeProps} due to accepting an array
* instead of a fixed number of arguments. Prefer {@link mergeProps} when merging 5 or
* fewer prop sets for better performance.
*
* @param props Array of props to merge.
* @returns The merged props.
* @see mergeProps
* @public
*/
function mergePropsN(props) {
	if (props.length === 0) return EMPTY_PROPS;
	if (props.length === 1) return createInitialMergedProps(props[0]);
	let merged = createInitialMergedProps(props[0]);
	for (let i = 1; i < props.length; i += 1) merged = mergeInto(merged, props[i]);
	return merged;
}
function createInitialMergedProps(inputProps) {
	if (isPropsGetter(inputProps)) return { ...resolvePropsGetter(inputProps, EMPTY_PROPS) };
	return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
	if (isPropsGetter(inputProps)) return resolvePropsGetter(inputProps, merged);
	return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
	const copiedProps = { ...inputProps };
	for (const propName in copiedProps) {
		const propValue = copiedProps[propName];
		if (isEventHandler(propName, propValue)) copiedProps[propName] = wrapEventHandler(propValue);
	}
	return copiedProps;
}
/**
* Merges two sets of props. In case of conflicts, the external props take precedence.
*/
function mutablyMergeInto(mergedProps, externalProps) {
	if (!externalProps) return mergedProps;
	for (const propName in externalProps) {
		const externalPropValue = externalProps[propName];
		switch (propName) {
			case "style":
				mergedProps[propName] = mergeObjects(mergedProps.style, externalPropValue);
				break;
			case "className":
				mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
				break;
			default: if (isEventHandler(propName, externalPropValue)) mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
			else mergedProps[propName] = externalPropValue;
		}
	}
	return mergedProps;
}
function isEventHandler(key, value) {
	const code0 = key.charCodeAt(0);
	const code1 = key.charCodeAt(1);
	const code2 = key.charCodeAt(2);
	return code0 === 111 && code1 === 110 && code2 >= 65 && code2 <= 90 && (typeof value === "function" || typeof value === "undefined");
}
function isPropsGetter(inputProps) {
	return typeof inputProps === "function";
}
function resolvePropsGetter(inputProps, previousProps) {
	if (isPropsGetter(inputProps)) return inputProps(previousProps);
	return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
	if (!theirHandler) return ourHandler;
	if (!ourHandler) return wrapEventHandler(theirHandler);
	return (...args) => {
		const event = args[0];
		if (isSyntheticEvent(event)) {
			const baseUIEvent = event;
			makeEventPreventable(baseUIEvent);
			const result = theirHandler(...args);
			if (!baseUIEvent.baseUIHandlerPrevented) ourHandler?.(...args);
			return result;
		}
		const result = theirHandler(...args);
		ourHandler?.(...args);
		return result;
	};
}
function wrapEventHandler(handler) {
	if (!handler) return handler;
	return (...args) => {
		const event = args[0];
		if (isSyntheticEvent(event)) makeEventPreventable(event);
		return handler(...args);
	};
}
function makeEventPreventable(event) {
	event.preventBaseUIHandler = () => {
		event.baseUIHandlerPrevented = true;
	};
	return event;
}
function mergeClassNames(ourClassName, theirClassName) {
	if (theirClassName) {
		if (ourClassName) return theirClassName + " " + ourClassName;
		return theirClassName;
	}
	return ourClassName;
}
function isSyntheticEvent(event) {
	return event != null && typeof event === "object" && "nativeEvent" in event;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/formatErrorMessage.js
/**
* Creates a formatErrorMessage function with a custom URL and prefix.
* @param baseUrl - The base URL for the error page (e.g., 'https://base-ui.com/production-error')
* @param prefix - The prefix for the error message (e.g., 'Base UI')
* @returns A function that formats error messages with the given URL and prefix
*/
function createFormatErrorMessage(baseUrl, prefix) {
	return function formatErrorMessage(code, ...args) {
		const url = new URL(baseUrl);
		url.searchParams.set("code", code.toString());
		args.forEach((arg) => url.searchParams.append("args[]", arg));
		return `${prefix} error #${code}; visit ${url} for the full message.`;
	};
}
/**
* WARNING: Don't import this directly. It's imported by the code generated by
* `@mui/internal-babel-plugin-minify-errors`. Make sure to always use string literals in `Error`
* constructors to ensure the plugin works as expected. Supported patterns include:
*   throw new Error('My message');
*   throw new Error(`My message: ${foo}`);
*   throw new Error(`My message: ${foo}` + 'another string');
*   ...
*/
var formatErrorMessage = createFormatErrorMessage("https://base-ui.com/production-error", "Base UI");
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/root/CompositeRootContext.js
var CompositeRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useCompositeRootContext(optional = false) {
	const context = import_react.useContext(CompositeRootContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(16));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/useFocusableWhenDisabled.js
function useFocusableWhenDisabled(parameters) {
	const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
	const isFocusableComposite = composite && focusableWhenDisabled !== false;
	const isNonFocusableComposite = composite && focusableWhenDisabled === false;
	return { props: import_react.useMemo(() => {
		const additionalProps = { onKeyDown(event) {
			if (disabled && focusableWhenDisabled && event.key !== "Tab") event.preventDefault();
		} };
		if (!composite) {
			additionalProps.tabIndex = tabIndexProp;
			if (!isNativeButton && disabled) additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
		}
		if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) additionalProps["aria-disabled"] = disabled;
		if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) additionalProps.disabled = disabled;
		return additionalProps;
	}, [
		composite,
		disabled,
		focusableWhenDisabled,
		isFocusableComposite,
		isNonFocusableComposite,
		isNativeButton,
		tabIndexProp
	]) };
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/use-button/useButton.js
function useButton(parameters = {}) {
	const { disabled = false, focusableWhenDisabled, tabIndex = 0, native: isNativeButton = true, composite: compositeProp } = parameters;
	const elementRef = import_react.useRef(null);
	const compositeRootContext = useCompositeRootContext(true);
	const isCompositeItem = compositeProp ?? compositeRootContext !== void 0;
	const { props: focusableWhenDisabledProps } = useFocusableWhenDisabled({
		focusableWhenDisabled,
		disabled,
		composite: isCompositeItem,
		tabIndex,
		isNativeButton
	});
	const updateDisabled = import_react.useCallback(() => {
		const element = elementRef.current;
		if (!isButtonElement(element)) return;
		if (isCompositeItem && disabled && focusableWhenDisabledProps.disabled === void 0 && element.disabled) element.disabled = false;
	}, [
		disabled,
		focusableWhenDisabledProps.disabled,
		isCompositeItem
	]);
	useIsoLayoutEffect(updateDisabled, [updateDisabled]);
	return {
		getButtonProps: import_react.useCallback((externalProps = {}) => {
			const { onClick: externalOnClick, onMouseDown: externalOnMouseDown, onKeyUp: externalOnKeyUp, onKeyDown: externalOnKeyDown, onPointerDown: externalOnPointerDown, ...otherExternalProps } = externalProps;
			return mergeProps$1({
				type: isNativeButton ? "button" : void 0,
				onClick(event) {
					if (disabled) {
						event.preventDefault();
						return;
					}
					externalOnClick?.(event);
				},
				onMouseDown(event) {
					if (!disabled) externalOnMouseDown?.(event);
				},
				onKeyDown(event) {
					if (disabled) return;
					makeEventPreventable(event);
					externalOnKeyDown?.(event);
					if (event.baseUIHandlerPrevented) return;
					const isCurrentTarget = event.target === event.currentTarget;
					const currentTarget = event.currentTarget;
					const isButton = isButtonElement(currentTarget);
					const isLink = !isNativeButton && isValidLinkElement(currentTarget);
					const shouldClick = isCurrentTarget && (isNativeButton ? isButton : !isLink);
					const isEnterKey = event.key === "Enter";
					const isSpaceKey = event.key === " ";
					const role = currentTarget.getAttribute("role");
					const isTextNavigationRole = role?.startsWith("menuitem") || role === "option" || role === "gridcell";
					if (isCurrentTarget && isCompositeItem && isSpaceKey) {
						if (event.defaultPrevented && isTextNavigationRole) return;
						event.preventDefault();
						if (isLink || isNativeButton && isButton) {
							currentTarget.click();
							event.preventBaseUIHandler();
						} else if (shouldClick) {
							externalOnClick?.(event);
							event.preventBaseUIHandler();
						}
						return;
					}
					if (shouldClick) {
						if (!isNativeButton && (isSpaceKey || isEnterKey)) event.preventDefault();
						if (!isNativeButton && isEnterKey) externalOnClick?.(event);
					}
				},
				onKeyUp(event) {
					if (disabled) return;
					makeEventPreventable(event);
					externalOnKeyUp?.(event);
					if (event.target === event.currentTarget && isNativeButton && isCompositeItem && isButtonElement(event.currentTarget) && event.key === " ") {
						event.preventDefault();
						return;
					}
					if (event.baseUIHandlerPrevented) return;
					if (event.target === event.currentTarget && !isNativeButton && !isCompositeItem && event.key === " ") externalOnClick?.(event);
				},
				onPointerDown(event) {
					if (disabled) {
						event.preventDefault();
						return;
					}
					externalOnPointerDown?.(event);
				}
			}, !isNativeButton ? { role: "button" } : void 0, focusableWhenDisabledProps, otherExternalProps);
		}, [
			disabled,
			focusableWhenDisabledProps,
			isCompositeItem,
			isNativeButton
		]),
		buttonRef: useStableCallback((element) => {
			elementRef.current = element;
			updateDisabled();
		})
	};
}
function isButtonElement(elem) {
	return isHTMLElement(elem) && elem.tagName === "BUTTON";
}
function isValidLinkElement(elem) {
	return Boolean(elem?.tagName === "A" && elem?.href);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useMergedRefs.js
/**
* Merges refs into a single memoized callback ref or `null`.
* This makes sure multiple refs are updated together and have the same value.
*
* This function accepts up to four refs. If you need to merge more, or have an unspecified number of refs to merge,
* use `useMergedRefsN` instead.
*/
function useMergedRefs(a, b, c, d) {
	const forkRef = useRefWithInit(createForkRef).current;
	if (didChange(forkRef, a, b, c, d)) update(forkRef, [
		a,
		b,
		c,
		d
	]);
	return forkRef.callback;
}
/**
* Merges an array of refs into a single memoized callback ref or `null`.
*
* If you need to merge a fixed number (up to four) of refs, use `useMergedRefs` instead for better performance.
*/
function useMergedRefsN(refs) {
	const forkRef = useRefWithInit(createForkRef).current;
	if (didChangeN(forkRef, refs)) update(forkRef, refs);
	return forkRef.callback;
}
function createForkRef() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function didChange(forkRef, a, b, c, d) {
	return forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d;
}
function didChangeN(forkRef, newRefs) {
	return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
	forkRef.refs = refs;
	if (refs.every((ref) => ref == null)) {
		forkRef.callback = null;
		return;
	}
	forkRef.callback = (instance) => {
		if (forkRef.cleanup) {
			forkRef.cleanup();
			forkRef.cleanup = null;
		}
		if (instance != null) {
			const cleanupCallbacks = Array(refs.length).fill(null);
			for (let i = 0; i < refs.length; i += 1) {
				const ref = refs[i];
				if (ref == null) continue;
				switch (typeof ref) {
					case "function": {
						const refCleanup = ref(instance);
						if (typeof refCleanup === "function") cleanupCallbacks[i] = refCleanup;
						break;
					}
					case "object":
						ref.current = instance;
						break;
					default:
				}
			}
			forkRef.cleanup = () => {
				for (let i = 0; i < refs.length; i += 1) {
					const ref = refs[i];
					if (ref == null) continue;
					switch (typeof ref) {
						case "function": {
							const cleanupCallback = cleanupCallbacks[i];
							if (typeof cleanupCallback === "function") cleanupCallback();
							else ref(null);
							break;
						}
						case "object":
							ref.current = null;
							break;
						default:
					}
				}
			};
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/reactVersion.js
var majorVersion = parseInt("19.2.6", 10);
function isReactVersionAtLeast(reactVersionToCheck) {
	return majorVersion >= reactVersionToCheck;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/getReactElementRef.js
/**
* Extracts the `ref` from a React element, handling different React versions.
*/
function getReactElementRef(element) {
	if (!/* @__PURE__ */ import_react.isValidElement(element)) return null;
	const reactElement = element;
	const propsWithRef = reactElement.props;
	return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/empty.js
function NOOP() {}
var EMPTY_ARRAY$1 = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/getStateAttributesProps.js
function getStateAttributesProps(state, customMapping) {
	const props = {};
	for (const key in state) {
		const value = state[key];
		if (customMapping?.hasOwnProperty(key)) {
			const customProps = customMapping[key](value);
			if (customProps != null) Object.assign(props, customProps);
			continue;
		}
		if (value === true) props[`data-${key.toLowerCase()}`] = "";
		else if (value) props[`data-${key.toLowerCase()}`] = value.toString();
	}
	return props;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/resolveClassName.js
/**
* If the provided className is a string, it will be returned as is.
* Otherwise, the function will call the className function with the state as the first argument.
*
* @param className
* @param state
*/
function resolveClassName(className, state) {
	return typeof className === "function" ? className(state) : className;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/resolveStyle.js
/**
* If the provided style is an object, it will be returned as is.
* Otherwise, the function will call the style function with the state as the first argument.
*
* @param style
* @param state
*/
function resolveStyle(style, state) {
	return typeof style === "function" ? style(state) : style;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/useRenderElement.js
/**
* Renders a Base UI element.
*
* @param element The default HTML element to render. Can be overridden by the `render` prop.
* @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
* @param params Additional parameters for rendering the element.
*/
function useRenderElement(element, componentProps, params = {}) {
	const renderProp = componentProps.render;
	const outProps = useRenderElementProps(componentProps, params);
	if (params.enabled === false) return null;
	return evaluateRenderProp(element, renderProp, outProps, params.state ?? EMPTY_OBJECT);
}
/**
* Computes render element final props.
*/
function useRenderElementProps(componentProps, params = {}) {
	const { className: classNameProp, style: styleProp, render: renderProp } = componentProps;
	const { state = EMPTY_OBJECT, ref, props, stateAttributesMapping, enabled = true } = params;
	const className = enabled ? resolveClassName(classNameProp, state) : void 0;
	const style = enabled ? resolveStyle(styleProp, state) : void 0;
	const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping) : EMPTY_OBJECT;
	const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : void 0;
	const outProps = enabled ? mergeObjects(stateProps, resolvedProps) ?? {} : EMPTY_OBJECT;
	if (typeof document !== "undefined") if (!enabled) useMergedRefs(null, null);
	else if (Array.isArray(ref)) outProps.ref = useMergedRefsN([
		outProps.ref,
		getReactElementRef(renderProp),
		...ref
	]);
	else outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref);
	if (!enabled) return EMPTY_OBJECT;
	if (className !== void 0) outProps.className = mergeClassNames(outProps.className, className);
	if (style !== void 0) outProps.style = mergeObjects(outProps.style, style);
	return outProps;
}
function resolveRenderFunctionProps(props) {
	if (Array.isArray(props)) return mergePropsN(props);
	return mergeProps$1(void 0, props);
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
function evaluateRenderProp(element, render, props, state) {
	if (render) {
		if (typeof render === "function") return render(props, state);
		const mergedProps = mergeProps$1(props, render.props);
		mergedProps.ref = props.ref;
		let newElement = render;
		if (newElement?.$$typeof === REACT_LAZY_TYPE) newElement = import_react.Children.toArray(render)[0];
		return /* @__PURE__ */ import_react.cloneElement(newElement, mergedProps);
	}
	if (element) {
		if (typeof element === "string") return renderTag(element, props);
	}
	throw new Error(formatErrorMessage(8));
}
function renderTag(Tag, props) {
	if (Tag === "button") return /* @__PURE__ */ (0, import_react.createElement)("button", {
		type: "button",
		...props,
		key: props.key
	});
	if (Tag === "img") return /* @__PURE__ */ (0, import_react.createElement)("img", {
		alt: "",
		...props,
		key: props.key
	});
	return /* @__PURE__ */ import_react.createElement(Tag, props);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/button/Button.js
/**
* A button component that can be used to trigger actions.
* Renders a `<button>` element.
*
* Documentation: [Base UI Button](https://base-ui.com/react/components/button)
*/
var Button = /* @__PURE__ */ import_react.forwardRef(function Button(componentProps, forwardedRef) {
	const { render, className, disabled = false, focusableWhenDisabled = false, nativeButton = true, style, ...elementProps } = componentProps;
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		focusableWhenDisabled,
		native: nativeButton
	});
	return useRenderElement("button", componentProps, {
		state: { disabled },
		ref: [forwardedRef, buttonRef],
		props: [elementProps, getButtonProps]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js
var DialogRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useDialogRootContext(optional) {
	const dialogRootContext = import_react.useContext(DialogRootContext);
	if (optional === false && dialogRootContext === void 0) throw new Error(formatErrorMessage(27));
	return dialogRootContext;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/stateAttributesMapping.js
var TransitionStatusDataAttributes = /* @__PURE__ */ function(TransitionStatusDataAttributes) {
	/**
	* Present when the component is animating in.
	*/
	TransitionStatusDataAttributes["startingStyle"] = "data-starting-style";
	/**
	* Present when the component is animating out.
	*/
	TransitionStatusDataAttributes["endingStyle"] = "data-ending-style";
	return TransitionStatusDataAttributes;
}({});
var STARTING_HOOK = { [TransitionStatusDataAttributes.startingStyle]: "" };
var ENDING_HOOK = { [TransitionStatusDataAttributes.endingStyle]: "" };
var transitionStatusMapping = { transitionStatus(value) {
	if (value === "starting") return STARTING_HOOK;
	if (value === "ending") return ENDING_HOOK;
	return null;
} };
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/popupStateMapping.js
var CommonPopupDataAttributes = function(CommonPopupDataAttributes) {
	/**
	* Present when the popup is open.
	*/
	CommonPopupDataAttributes["open"] = "data-open";
	/**
	* Present when the popup is closed.
	*/
	CommonPopupDataAttributes["closed"] = "data-closed";
	/**
	* Present when the popup is animating in.
	*/
	CommonPopupDataAttributes[CommonPopupDataAttributes["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
	/**
	* Present when the popup is animating out.
	*/
	CommonPopupDataAttributes[CommonPopupDataAttributes["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
	/**
	* Present when the anchor is hidden.
	*/
	CommonPopupDataAttributes["anchorHidden"] = "data-anchor-hidden";
	/**
	* Indicates which side the popup is positioned relative to the trigger.
	* @type { 'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start'}
	*/
	CommonPopupDataAttributes["side"] = "data-side";
	/**
	* Indicates how the popup is aligned relative to specified side.
	* @type {'start' | 'center' | 'end'}
	*/
	CommonPopupDataAttributes["align"] = "data-align";
	return CommonPopupDataAttributes;
}({});
var CommonTriggerDataAttributes = /* @__PURE__ */ function(CommonTriggerDataAttributes) {
	/**
	* Present when the popup is open.
	*/
	CommonTriggerDataAttributes["popupOpen"] = "data-popup-open";
	/**
	* Present when a pressable trigger is pressed.
	*/
	CommonTriggerDataAttributes["pressed"] = "data-pressed";
	return CommonTriggerDataAttributes;
}({});
var TRIGGER_HOOK = { [CommonTriggerDataAttributes.popupOpen]: "" };
var PRESSABLE_TRIGGER_HOOK = {
	[CommonTriggerDataAttributes.popupOpen]: "",
	[CommonTriggerDataAttributes.pressed]: ""
};
var POPUP_OPEN_HOOK = { [CommonPopupDataAttributes.open]: "" };
var POPUP_CLOSED_HOOK = { [CommonPopupDataAttributes.closed]: "" };
var ANCHOR_HIDDEN_HOOK = { [CommonPopupDataAttributes.anchorHidden]: "" };
var triggerOpenStateMapping$1 = { open(value) {
	if (value) return TRIGGER_HOOK;
	return null;
} };
var pressableTriggerOpenStateMapping = { open(value) {
	if (value) return PRESSABLE_TRIGGER_HOOK;
	return null;
} };
var popupStateMapping = {
	open(value) {
		if (value) return POPUP_OPEN_HOOK;
		return POPUP_CLOSED_HOOK;
	},
	anchorHidden(value) {
		if (value) return ANCHOR_HIDDEN_HOOK;
		return null;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/backdrop/DialogBackdrop.js
var stateAttributesMapping$10 = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* An overlay displayed beneath the popup.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogBackdrop = /* @__PURE__ */ import_react.forwardRef(function DialogBackdrop(componentProps, forwardedRef) {
	const { render, className, style, forceRender = false, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const open = store.useState("open");
	const nested = store.useState("nested");
	const mounted = store.useState("mounted");
	return useRenderElement("div", componentProps, {
		state: {
			open,
			transitionStatus: store.useState("transitionStatus")
		},
		ref: [store.context.backdropRef, forwardedRef],
		stateAttributesMapping: stateAttributesMapping$10,
		props: [{
			role: "presentation",
			hidden: !mounted,
			style: {
				userSelect: "none",
				WebkitUserSelect: "none"
			}
		}, elementProps],
		enabled: forceRender || !nested
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/reason-parts.js
var none = "none";
var triggerPress = "trigger-press";
var triggerHover = "trigger-hover";
var triggerFocus = "trigger-focus";
var outsidePress = "outside-press";
var itemPress = "item-press";
var closePress = "close-press";
var clearPress = "clear-press";
var trackPress = "track-press";
var inputChange = "input-change";
var inputClear = "input-clear";
var inputPress = "input-press";
var focusOut = "focus-out";
var escapeKey = "escape-key";
var listNavigation = "list-navigation";
var keyboard = "keyboard";
var drag = "drag";
var cancelOpen = "cancel-open";
var siblingOpen = "sibling-open";
var disabled = "disabled";
var imperativeAction = "imperative-action";
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/createBaseUIEventDetails.js
/**
* Maps a change `reason` string to the corresponding native event type.
*/
/**
* Details of custom change events emitted by Base UI components.
*/
/**
* Details of custom generic events emitted by Base UI components.
*/
/**
* Creates a Base UI event details object with the given reason and utilities
* for preventing Base UI's internal event handling.
*/
function createChangeEventDetails(reason, event, trigger, customProperties) {
	let canceled = false;
	let allowPropagation = false;
	const custom = customProperties ?? EMPTY_OBJECT;
	return {
		reason,
		event: event ?? new Event("base-ui"),
		cancel() {
			canceled = true;
		},
		allowPropagation() {
			allowPropagation = true;
		},
		get isCanceled() {
			return canceled;
		},
		get isPropagationAllowed() {
			return allowPropagation;
		},
		trigger,
		...custom
	};
}
function createGenericEventDetails(reason, event, customProperties) {
	const custom = customProperties ?? EMPTY_OBJECT;
	return {
		reason,
		event: event ?? new Event("base-ui"),
		...custom
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/close/DialogClose.js
/**
* A button that closes the dialog.
* Renders a `<button>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogClose = /* @__PURE__ */ import_react.forwardRef(function DialogClose(componentProps, forwardedRef) {
	const { render, className, disabled = false, nativeButton = true, style, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const open = store.useState("open");
	function handleClick(event) {
		if (open) store.setOpen(false, createChangeEventDetails(closePress, event.nativeEvent));
	}
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	return useRenderElement("button", componentProps, {
		state: { disabled },
		ref: [forwardedRef, buttonRef],
		props: [
			{ onClick: handleClick },
			elementProps,
			getButtonProps
		]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useId.js
var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
	const [defaultId, setDefaultId] = import_react.useState(idOverride);
	const id = idOverride || defaultId;
	import_react.useEffect(() => {
		if (defaultId == null) {
			globalId += 1;
			setDefaultId(`${prefix}-${globalId}`);
		}
	}, [defaultId, prefix]);
	return id;
}
var maybeReactUseId = SafeReact.useId;
/**
*
* @example <div id={useId()} />
* @param idOverride
* @returns {string}
*/
function useId(idOverride, prefix) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
	}
	return useGlobalId(idOverride, prefix);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/useBaseUiId.js
/**
* Wraps `useId` and prefixes generated `id`s with `base-ui-`
* @param {string | undefined} idOverride overrides the generated id when provided
* @returns {string | undefined}
*/
function useBaseUiId(idOverride) {
	return useId(idOverride, "base-ui");
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/description/DialogDescription.js
/**
* A paragraph with additional information about the dialog.
* Renders a `<p>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogDescription = /* @__PURE__ */ import_react.forwardRef(function DialogDescription(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const id = useBaseUiId(idProp);
	store.useSyncedValueWithCleanup("descriptionElementId", id);
	return useRenderElement("p", componentProps, {
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useOnMount.js
var EMPTY$2 = [];
/**
* A React.useEffect equivalent that runs once, when the component is mounted.
*/
function useOnMount(fn) {
	import_react.useEffect(fn, EMPTY$2);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useTimeout.js
var EMPTY$1 = 0;
var Timeout = class Timeout {
	static create() {
		return new Timeout();
	}
	currentId = EMPTY$1;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	start(delay, fn) {
		this.clear();
		this.currentId = setTimeout(() => {
			this.currentId = EMPTY$1;
			fn();
		}, delay);
	}
	isStarted() {
		return this.currentId !== EMPTY$1;
	}
	clear = () => {
		if (this.currentId !== EMPTY$1) {
			clearTimeout(this.currentId);
			this.currentId = EMPTY$1;
		}
	};
	disposeEffect = () => {
		return this.clear;
	};
};
/**
* A `setTimeout` with automatic cleanup and guard.
*/
function useTimeout() {
	const timeout = useRefWithInit(Timeout.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/detectBrowser.js
var hasNavigator = typeof navigator !== "undefined";
var nav = getNavigatorData();
var platform$1 = getPlatform();
var userAgent = getUserAgent();
var isWebKit = typeof CSS === "undefined" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter:none");
var isIOS = nav.platform === "MacIntel" && nav.maxTouchPoints > 1 ? true : /iP(hone|ad|od)|iOS/.test(nav.platform);
var isFirefox = hasNavigator && /firefox/i.test(userAgent);
var isSafari = hasNavigator && /apple/i.test(navigator.vendor);
hasNavigator && /Edg/i.test(userAgent);
var isAndroid = hasNavigator && /android/i.test(platform$1) || /android/i.test(userAgent);
var isMac = hasNavigator && platform$1.toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
var isJSDOM = userAgent.includes("jsdom/");
function getNavigatorData() {
	if (!hasNavigator) return {
		platform: "",
		maxTouchPoints: -1
	};
	const uaData = navigator.userAgentData;
	if (uaData?.platform) return {
		platform: uaData.platform,
		maxTouchPoints: navigator.maxTouchPoints
	};
	return {
		platform: navigator.platform ?? "",
		maxTouchPoints: navigator.maxTouchPoints ?? -1
	};
}
function getUserAgent() {
	if (!hasNavigator) return "";
	const uaData = navigator.userAgentData;
	if (uaData && Array.isArray(uaData.brands)) return uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ");
	return navigator.userAgent;
}
function getPlatform() {
	if (!hasNavigator) return "";
	const uaData = navigator.userAgentData;
	if (uaData?.platform) return uaData.platform;
	return navigator.platform ?? "";
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/event.js
function stopEvent(event) {
	event.preventDefault();
	event.stopPropagation();
}
function isReactEvent(event) {
	return "nativeEvent" in event;
}
function isVirtualClick(event) {
	if (event.pointerType === "" && event.isTrusted) return true;
	if (isAndroid && event.pointerType) return event.type === "click" && event.buttons === 1;
	return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
	if (isJSDOM) return false;
	return !isAndroid && event.width === 0 && event.height === 0 || isAndroid && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse" || event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "touch";
}
function isMouseLikePointerType(pointerType, strict) {
	const values = ["mouse", "pen"];
	if (!strict) values.push("", void 0);
	return values.includes(pointerType);
}
function isClickLikeEvent(event) {
	const type = event.type;
	return type === "click" || type === "mousedown" || type === "keydown" || type === "keyup";
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverShared.js
function resolveValue(value, pointerType) {
	if (pointerType != null && !isMouseLikePointerType(pointerType)) return 0;
	if (typeof value === "function") return value();
	return value;
}
function getDelay(value, prop, pointerType) {
	const result = resolveValue(value, pointerType);
	if (typeof result === "number") return result;
	return result?.[prop];
}
function getRestMs(value) {
	if (typeof value === "function") return value();
	return value;
}
function isClickLikeOpenEvent(openEventType, interactedInside) {
	return interactedInside || openEventType === "click" || openEventType === "mousedown";
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingDelayGroup.js
var import_jsx_runtime = require_jsx_runtime();
var FloatingDelayGroupContext = /* @__PURE__ */ import_react.createContext({
	hasProvider: false,
	timeoutMs: 0,
	delayRef: { current: 0 },
	initialDelayRef: { current: 0 },
	timeout: new Timeout(),
	currentIdRef: { current: null },
	currentContextRef: { current: null }
});
/**
* Experimental next version of `FloatingDelayGroup` to become the default
* in the future. This component is not yet stable.
* Provides context for a group of floating elements that should share a
* `delay`. Unlike `FloatingDelayGroup`, `useDelayGroup` with this
* component does not cause a re-render of unrelated consumers of the
* context when the delay changes.
* @see https://floating-ui.com/docs/FloatingDelayGroup
* @internal
*/
function FloatingDelayGroup(props) {
	const { children, delay, timeoutMs = 0 } = props;
	const delayRef = import_react.useRef(delay);
	const initialDelayRef = import_react.useRef(delay);
	const currentIdRef = import_react.useRef(null);
	const currentContextRef = import_react.useRef(null);
	const timeout = useTimeout();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingDelayGroupContext.Provider, {
		value: import_react.useMemo(() => ({
			hasProvider: true,
			delayRef,
			initialDelayRef,
			currentIdRef,
			timeoutMs,
			currentContextRef,
			timeout
		}), [timeoutMs, timeout]),
		children
	});
}
/**
* Enables grouping when called inside a component that's a child of a
* `FloatingDelayGroup`.
* @see https://floating-ui.com/docs/FloatingDelayGroup
* @internal
*/
function useDelayGroup(context, options = { open: false }) {
	const store = "rootStore" in context ? context.rootStore : context;
	const floatingId = store.useState("floatingId");
	const { open } = options;
	const { currentIdRef, delayRef, timeoutMs, initialDelayRef, currentContextRef, hasProvider, timeout } = import_react.useContext(FloatingDelayGroupContext);
	const [isInstantPhase, setIsInstantPhase] = import_react.useState(false);
	useIsoLayoutEffect(() => {
		function unset() {
			setIsInstantPhase(false);
			currentContextRef.current?.setIsInstantPhase(false);
			currentIdRef.current = null;
			currentContextRef.current = null;
			delayRef.current = initialDelayRef.current;
		}
		if (!currentIdRef.current) return;
		if (!open && currentIdRef.current === floatingId) {
			setIsInstantPhase(false);
			if (timeoutMs) {
				const closingId = floatingId;
				timeout.start(timeoutMs, () => {
					if (store.select("open") || currentIdRef.current && currentIdRef.current !== closingId) return;
					unset();
				});
				return () => {
					timeout.clear();
				};
			}
			unset();
		}
	}, [
		open,
		floatingId,
		currentIdRef,
		delayRef,
		timeoutMs,
		initialDelayRef,
		currentContextRef,
		timeout,
		store
	]);
	useIsoLayoutEffect(() => {
		if (!open) return;
		const prevContext = currentContextRef.current;
		const prevId = currentIdRef.current;
		timeout.clear();
		currentContextRef.current = {
			onOpenChange: store.setOpen,
			setIsInstantPhase
		};
		currentIdRef.current = floatingId;
		delayRef.current = {
			open: 0,
			close: getDelay(initialDelayRef.current, "close")
		};
		if (prevId !== null && prevId !== floatingId) {
			setIsInstantPhase(true);
			prevContext?.setIsInstantPhase(true);
			prevContext?.onOpenChange(false, createChangeEventDetails(none));
		} else {
			setIsInstantPhase(false);
			prevContext?.setIsInstantPhase(false);
		}
	}, [
		open,
		floatingId,
		store,
		currentIdRef,
		delayRef,
		timeoutMs,
		initialDelayRef,
		currentContextRef,
		timeout
	]);
	useIsoLayoutEffect(() => {
		return () => {
			currentContextRef.current = null;
		};
	}, [currentContextRef]);
	return import_react.useMemo(() => ({
		hasProvider,
		delayRef,
		isInstantPhase
	}), [
		hasProvider,
		delayRef,
		isInstantPhase
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/addEventListener.js
/**
* Adds an event listener and returns a cleanup function to remove it.
*/
function addEventListener(target, type, listener, options) {
	target.addEventListener(type, listener, options);
	return () => {
		target.removeEventListener(type, listener, options);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/mergeCleanups.js
/**
* Combines multiple cleanup functions into a single cleanup function.
*/
function mergeCleanups(...cleanups) {
	return () => {
		for (let i = 0; i < cleanups.length; i += 1) {
			const cleanup = cleanups[i];
			if (cleanup) cleanup();
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useValueAsRef.js
/**
* Untracks the provided value by turning it into a ref to remove its reactivity.
*
* Used to access the passed value inside `React.useEffect` without causing the effect to re-run when the value changes.
*/
function useValueAsRef(value) {
	const latest = useRefWithInit(createLatestRef, value).current;
	latest.next = value;
	useIsoLayoutEffect(latest.effect);
	return latest;
}
function createLatestRef(value) {
	const latest = {
		current: value,
		next: value,
		effect: () => {
			latest.current = latest.next;
		}
	};
	return latest;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useAnimationFrame.js
/** Unlike `setTimeout`, rAF doesn't guarantee a positive integer return value, so we can't have
* a monomorphic `uint` type with `0` meaning empty.
* See warning note at:
* https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#return_value */
var EMPTY = null;
globalThis.requestAnimationFrame;
var Scheduler = class {
	callbacks = [];
	callbacksCount = 0;
	nextId = 1;
	startId = 1;
	isScheduled = false;
	tick = (timestamp) => {
		this.isScheduled = false;
		const currentCallbacks = this.callbacks;
		const currentCallbacksCount = this.callbacksCount;
		this.callbacks = [];
		this.callbacksCount = 0;
		this.startId = this.nextId;
		if (currentCallbacksCount > 0) for (let i = 0; i < currentCallbacks.length; i += 1) currentCallbacks[i]?.(timestamp);
	};
	request(fn) {
		const id = this.nextId;
		this.nextId += 1;
		this.callbacks.push(fn);
		this.callbacksCount += 1;
		if (!this.isScheduled || false) {
			requestAnimationFrame(this.tick);
			this.isScheduled = true;
		}
		return id;
	}
	cancel(id) {
		const index = id - this.startId;
		if (index < 0 || index >= this.callbacks.length) return;
		this.callbacks[index] = null;
		this.callbacksCount -= 1;
	}
};
var scheduler = new Scheduler();
var AnimationFrame = class AnimationFrame {
	static create() {
		return new AnimationFrame();
	}
	static request(fn) {
		return scheduler.request(fn);
	}
	static cancel(id) {
		return scheduler.cancel(id);
	}
	currentId = EMPTY;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	request(fn) {
		this.cancel();
		this.currentId = scheduler.request(() => {
			this.currentId = EMPTY;
			fn();
		});
	}
	cancel = () => {
		if (this.currentId !== EMPTY) {
			scheduler.cancel(this.currentId);
			this.currentId = EMPTY;
		}
	};
	disposeEffect = () => {
		return this.cancel;
	};
};
/**
* A `requestAnimationFrame` with automatic cleanup and guard.
*/
function useAnimationFrame() {
	const timeout = useRefWithInit(AnimationFrame.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/owner.js
function ownerDocument(node) {
	return node?.ownerDocument || document;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/visuallyHidden.js
var visuallyHiddenBase = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
};
var visuallyHidden = {
	...visuallyHiddenBase,
	position: "fixed",
	top: 0,
	left: 0
};
var visuallyHiddenInput = {
	...visuallyHiddenBase,
	position: "absolute"
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/FocusGuard.js
/**
* @internal
*/
var FocusGuard = /* @__PURE__ */ import_react.forwardRef(function FocusGuard(props, ref) {
	const [role, setRole] = import_react.useState();
	useIsoLayoutEffect(() => {
		if (isSafari) setRole("button");
	}, []);
	const restProps = {
		tabIndex: 0,
		role
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		...props,
		ref,
		style: visuallyHidden,
		"aria-hidden": role ? void 0 : true,
		...restProps,
		"data-base-ui-focus-guard": ""
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/constants.js
var FOCUSABLE_ATTRIBUTE = "data-base-ui-focusable";
var TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
var ARROW_LEFT$1 = "ArrowLeft";
var ARROW_RIGHT$1 = "ArrowRight";
var ARROW_UP$1 = "ArrowUp";
var ARROW_DOWN$1 = "ArrowDown";
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/shadowDom.js
function activeElement(doc) {
	let element = doc.activeElement;
	while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement;
	return element;
}
function contains(parent, child) {
	if (!parent || !child) return false;
	const rootNode = child.getRootNode?.();
	if (parent.contains(child)) return true;
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
function getTarget(event) {
	if ("composedPath" in event) return event.composedPath()[0];
	return event.target;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/element.js
function isTargetInsideEnabledTrigger(target, triggerElements) {
	if (!isElement(target)) return false;
	const targetElement = target;
	if (triggerElements.hasElement(targetElement)) return !targetElement.hasAttribute("data-trigger-disabled");
	for (const [, trigger] of triggerElements.entries()) if (contains(trigger, targetElement)) return !trigger.hasAttribute("data-trigger-disabled");
	return false;
}
function isEventTargetWithin(event, node) {
	if (node == null) return false;
	if ("composedPath" in event) return event.composedPath().includes(node);
	const eventAgain = event;
	return eventAgain.target != null && node.contains(eventAgain.target);
}
function isRootElement(element) {
	return element.matches("html,body");
}
function isTypeableElement(element) {
	return isHTMLElement(element) && element.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function isInteractiveElement(element) {
	return element?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${TYPEABLE_SELECTOR}`) != null;
}
function isTypeableCombobox(element) {
	if (!element) return false;
	return element.getAttribute("role") === "combobox" && isTypeableElement(element);
}
function matchesFocusVisible(element) {
	if (!element || isJSDOM) return true;
	try {
		return element.matches(":focus-visible");
	} catch (_e) {
		return true;
	}
}
function getFloatingFocusElement(floatingElement) {
	if (!floatingElement) return null;
	return floatingElement.hasAttribute("data-base-ui-focusable") ? floatingElement : floatingElement.querySelector(`[data-base-ui-focusable]`) || floatingElement;
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp$1(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/composite.js
function isDifferentGridRow(index, cols, prevRow) {
	return Math.floor(index / cols) !== prevRow;
}
function isIndexOutOfListBounds(list, index) {
	return index < 0 || index >= list.length;
}
function getMinListIndex(listRef, disabledIndices) {
	return findNonDisabledListIndex(listRef.current, { disabledIndices });
}
function getMaxListIndex(listRef, disabledIndices) {
	return findNonDisabledListIndex(listRef.current, {
		decrement: true,
		startingIndex: listRef.current.length,
		disabledIndices
	});
}
function findNonDisabledListIndex(list, { startingIndex = -1, decrement = false, disabledIndices, amount = 1 } = {}) {
	let index = startingIndex;
	do
		index += decrement ? -amount : amount;
	while (index >= 0 && index <= list.length - 1 && isListIndexDisabled(list, index, disabledIndices));
	return index;
}
function getGridNavigatedIndex(list, { event, orientation, loopFocus, onLoop, rtl, cols, disabledIndices, minIndex, maxIndex, prevIndex, stopEvent: stop = false }) {
	let nextIndex = prevIndex;
	let verticalDirection;
	if (event.key === "ArrowUp") verticalDirection = "up";
	else if (event.key === "ArrowDown") verticalDirection = "down";
	if (verticalDirection) {
		const rows = [];
		const rowIndexMap = [];
		let hasRoleRow = false;
		let visibleItemCount = 0;
		{
			let currentRowEl = null;
			let currentRowIndex = -1;
			list.forEach((el, idx) => {
				if (el == null) return;
				visibleItemCount += 1;
				const rowEl = el.closest("[role=\"row\"]");
				if (rowEl) hasRoleRow = true;
				if (rowEl !== currentRowEl || currentRowIndex === -1) {
					currentRowEl = rowEl;
					currentRowIndex += 1;
					rows[currentRowIndex] = [];
				}
				rows[currentRowIndex].push(idx);
				rowIndexMap[idx] = currentRowIndex;
			});
		}
		let hasDomRows = false;
		let inferredDomCols = 0;
		if (hasRoleRow) for (const row of rows) {
			const rowLength = row.length;
			if (rowLength > inferredDomCols) inferredDomCols = rowLength;
			if (rowLength !== cols) hasDomRows = true;
		}
		const hasVirtualizedGaps = hasDomRows && visibleItemCount < list.length;
		const verticalCols = inferredDomCols || cols;
		const navigateVertically = (direction) => {
			if (!hasDomRows || prevIndex === -1) return;
			const currentRow = rowIndexMap[prevIndex];
			if (currentRow == null) return;
			const colInRow = rows[currentRow].indexOf(prevIndex);
			const step = direction === "up" ? -1 : 1;
			for (let nextRow = currentRow + step, i = 0; i < rows.length; i += 1, nextRow += step) {
				if (nextRow < 0 || nextRow >= rows.length) {
					if (!loopFocus || hasVirtualizedGaps) return;
					nextRow = nextRow < 0 ? rows.length - 1 : 0;
					if (onLoop) {
						const clampedCol = Math.min(colInRow, rows[nextRow].length - 1);
						nextRow = rowIndexMap[onLoop(event, prevIndex, rows[nextRow][clampedCol] ?? rows[nextRow][0])] ?? nextRow;
					}
				}
				const targetRow = rows[nextRow];
				for (let col = Math.min(colInRow, targetRow.length - 1); col >= 0; col -= 1) {
					const candidate = targetRow[col];
					if (!isListIndexDisabled(list, candidate, disabledIndices)) return candidate;
				}
			}
		};
		const navigateVerticallyWithInferredRows = (direction) => {
			if (!hasVirtualizedGaps || prevIndex === -1) return;
			const colInRow = prevIndex % verticalCols;
			const rowStep = direction === "up" ? -verticalCols : verticalCols;
			const lastRowStart = maxIndex - maxIndex % verticalCols;
			const rowCount = floor(maxIndex / verticalCols) + 1;
			for (let rowStart = prevIndex - colInRow + rowStep, i = 0; i < rowCount; i += 1, rowStart += rowStep) {
				if (rowStart < 0 || rowStart > maxIndex) {
					if (!loopFocus) return;
					rowStart = rowStart < 0 ? lastRowStart : 0;
				}
				const rowEnd = Math.min(rowStart + verticalCols - 1, maxIndex);
				for (let candidate = Math.min(rowStart + colInRow, rowEnd); candidate >= rowStart; candidate -= 1) if (!isListIndexDisabled(list, candidate, disabledIndices)) return candidate;
			}
		};
		if (stop) stopEvent(event);
		const verticalCandidate = navigateVertically(verticalDirection) ?? navigateVerticallyWithInferredRows(verticalDirection);
		if (verticalCandidate !== void 0) nextIndex = verticalCandidate;
		else if (prevIndex === -1) nextIndex = verticalDirection === "up" ? maxIndex : minIndex;
		else {
			nextIndex = findNonDisabledListIndex(list, {
				startingIndex: prevIndex,
				amount: verticalCols,
				decrement: verticalDirection === "up",
				disabledIndices
			});
			if (loopFocus) {
				if (verticalDirection === "up" && (prevIndex - verticalCols < minIndex || nextIndex < 0)) {
					const col = prevIndex % verticalCols;
					const maxCol = maxIndex % verticalCols;
					const offset = maxIndex - (maxCol - col);
					if (maxCol === col) nextIndex = maxIndex;
					else nextIndex = maxCol > col ? offset : offset - verticalCols;
					if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex);
				}
				if (verticalDirection === "down" && prevIndex + verticalCols > maxIndex) {
					nextIndex = findNonDisabledListIndex(list, {
						startingIndex: prevIndex % verticalCols - verticalCols,
						amount: verticalCols,
						disabledIndices
					});
					if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex);
				}
			}
		}
		if (isIndexOutOfListBounds(list, nextIndex)) nextIndex = prevIndex;
	}
	if (orientation === "both") {
		const prevRow = floor(prevIndex / cols);
		if (event.key === (rtl ? "ArrowLeft" : "ArrowRight")) {
			if (stop) stopEvent(event);
			if (prevIndex % cols !== cols - 1) {
				nextIndex = findNonDisabledListIndex(list, {
					startingIndex: prevIndex,
					disabledIndices
				});
				if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
					nextIndex = findNonDisabledListIndex(list, {
						startingIndex: prevIndex - prevIndex % cols - 1,
						disabledIndices
					});
					if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex);
				}
			} else if (loopFocus) {
				nextIndex = findNonDisabledListIndex(list, {
					startingIndex: prevIndex - prevIndex % cols - 1,
					disabledIndices
				});
				if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex);
			}
			if (isDifferentGridRow(nextIndex, cols, prevRow)) nextIndex = prevIndex;
		}
		if (event.key === (rtl ? "ArrowRight" : "ArrowLeft")) {
			if (stop) stopEvent(event);
			if (prevIndex % cols !== 0) {
				nextIndex = findNonDisabledListIndex(list, {
					startingIndex: prevIndex,
					decrement: true,
					disabledIndices
				});
				if (loopFocus && isDifferentGridRow(nextIndex, cols, prevRow)) {
					nextIndex = findNonDisabledListIndex(list, {
						startingIndex: prevIndex + (cols - prevIndex % cols),
						decrement: true,
						disabledIndices
					});
					if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex);
				}
			} else if (loopFocus) {
				nextIndex = findNonDisabledListIndex(list, {
					startingIndex: prevIndex + (cols - prevIndex % cols),
					decrement: true,
					disabledIndices
				});
				if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex);
			}
			if (isDifferentGridRow(nextIndex, cols, prevRow)) nextIndex = prevIndex;
		}
		const lastRow = floor(maxIndex / cols) === prevRow;
		if (isIndexOutOfListBounds(list, nextIndex)) if (loopFocus && lastRow) {
			nextIndex = event.key === (rtl ? "ArrowRight" : "ArrowLeft") ? maxIndex : findNonDisabledListIndex(list, {
				startingIndex: prevIndex - prevIndex % cols - 1,
				disabledIndices
			});
			if (onLoop) nextIndex = onLoop(event, prevIndex, nextIndex);
		} else nextIndex = prevIndex;
	}
	return nextIndex;
}
/** For each cell index, gets the item index that occupies that cell */
function createGridCellMap(sizes, cols, dense) {
	const cellMap = [];
	let startIndex = 0;
	sizes.forEach(({ width, height }, index) => {
		if (width > cols) {}
		let itemPlaced = false;
		if (dense) startIndex = 0;
		while (!itemPlaced) {
			const targetCells = [];
			for (let i = 0; i < width; i += 1) for (let j = 0; j < height; j += 1) targetCells.push(startIndex + i + j * cols);
			if (startIndex % cols + width <= cols && targetCells.every((cell) => cellMap[cell] == null)) {
				targetCells.forEach((cell) => {
					cellMap[cell] = index;
				});
				itemPlaced = true;
			} else startIndex += 1;
		}
	});
	return [...cellMap];
}
/** Gets cell index of an item's corner or -1 when index is -1. */
function getGridCellIndexOfCorner(index, sizes, cellMap, cols, corner) {
	if (index === -1) return -1;
	const firstCellIndex = cellMap.indexOf(index);
	const sizeItem = sizes[index];
	switch (corner) {
		case "tl": return firstCellIndex;
		case "tr":
			if (!sizeItem) return firstCellIndex;
			return firstCellIndex + sizeItem.width - 1;
		case "bl":
			if (!sizeItem) return firstCellIndex;
			return firstCellIndex + (sizeItem.height - 1) * cols;
		case "br": return cellMap.lastIndexOf(index);
		default: return -1;
	}
}
/** Gets all cell indices that correspond to the specified indices */
function getGridCellIndices(indices, cellMap) {
	return cellMap.flatMap((index, cellIndex) => indices.includes(index) ? [cellIndex] : []);
}
function isListIndexDisabled(list, index, disabledIndices) {
	if (typeof disabledIndices === "function" ? disabledIndices(index) : disabledIndices?.includes(index) ?? false) return true;
	const element = list[index];
	if (!element) return false;
	if (!isElementVisible(element)) return true;
	return !disabledIndices && (element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true");
}
function isHiddenByStyles(styles) {
	return styles.visibility === "hidden" || styles.visibility === "collapse";
}
function isElementVisible(element, styles = element ? getComputedStyle$1(element) : null) {
	if (!element || !element.isConnected || !styles || isHiddenByStyles(styles)) return false;
	if (typeof element.checkVisibility === "function") return element.checkVisibility();
	return styles.display !== "none" && styles.display !== "contents";
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/tabbable.js
var CANDIDATE_SELECTOR = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function getParentElement(element) {
	const assignedSlot = element.assignedSlot;
	if (assignedSlot) return assignedSlot;
	if (element.parentElement) return element.parentElement;
	const rootNode = element.getRootNode();
	return isShadowRoot(rootNode) ? rootNode.host : null;
}
function getDetailsSummary(details) {
	for (const child of Array.from(details.children)) if (getNodeName(child) === "summary") return child;
	return null;
}
function isWithinOpenDetailsSummary(element, details) {
	const summary = getDetailsSummary(details);
	return !!summary && (element === summary || contains(summary, element));
}
function isFocusableCandidate(element) {
	const nodeName = element ? getNodeName(element) : "";
	return element != null && element.matches(CANDIDATE_SELECTOR) && (nodeName !== "summary" || element.parentElement != null && getNodeName(element.parentElement) === "details" && getDetailsSummary(element.parentElement) === element) && (nodeName !== "details" || getDetailsSummary(element) == null) && (nodeName !== "input" || element.type !== "hidden");
}
function isFocusableElement(element) {
	if (!isFocusableCandidate(element) || !element.isConnected || element.matches(":disabled")) return false;
	for (let current = element; current; current = getParentElement(current)) {
		const isAncestor = current !== element;
		const isSlot = getNodeName(current) === "slot";
		if (current.hasAttribute("inert")) return false;
		if (isAncestor && getNodeName(current) === "details" && !current.open && !isWithinOpenDetailsSummary(element, current) || current.hasAttribute("hidden") || !isSlot && !isVisibleInTabbableTree(current, isAncestor)) return false;
	}
	return true;
}
function isVisibleInTabbableTree(element, isAncestor) {
	const styles = getComputedStyle$1(element);
	if (!isAncestor) return isElementVisible(element, styles);
	return styles.display !== "none";
}
function getTabIndex(element) {
	const tabIndex = element.tabIndex;
	if (tabIndex < 0) {
		const nodeName = getNodeName(element);
		if (nodeName === "details" || nodeName === "audio" || nodeName === "video" || isHTMLElement(element) && element.isContentEditable) return 0;
	}
	return tabIndex;
}
function getNamedRadioInput(element) {
	if (getNodeName(element) !== "input") return null;
	const input = element;
	return input.type === "radio" && input.name !== "" ? input : null;
}
function isTabbableRadio(element, candidates) {
	const input = getNamedRadioInput(element);
	if (!input) return true;
	const checkedRadio = candidates.find((candidate) => {
		const radio = getNamedRadioInput(candidate);
		return radio?.name === input.name && radio.form === input.form && radio.checked;
	});
	if (checkedRadio) return checkedRadio === input;
	return candidates.find((candidate) => {
		const radio = getNamedRadioInput(candidate);
		return radio?.name === input.name && radio.form === input.form;
	}) === input;
}
function getComposedChildren(container) {
	if (isHTMLElement(container) && getNodeName(container) === "slot") {
		const assignedElements = container.assignedElements({ flatten: true });
		if (assignedElements.length > 0) return assignedElements;
	}
	if (isHTMLElement(container) && container.shadowRoot) return Array.from(container.shadowRoot.children);
	return Array.from(container.children);
}
function appendCandidates(container, list) {
	getComposedChildren(container).forEach((child) => {
		if (isFocusableCandidate(child)) list.push(child);
		appendCandidates(child, list);
	});
}
function appendMatchingElements(container, selector, list) {
	getComposedChildren(container).forEach((child) => {
		if (isHTMLElement(child) && child.matches(selector)) list.push(child);
		appendMatchingElements(child, selector, list);
	});
}
function isTabbable(element) {
	return isFocusableElement(element) && getTabIndex(element) >= 0;
}
function focusable(container) {
	const candidates = [];
	appendCandidates(container, candidates);
	return candidates.filter(isFocusableElement);
}
function tabbable(container) {
	const candidates = focusable(container);
	return candidates.filter((element) => getTabIndex(element) >= 0 && isTabbableRadio(element, candidates));
}
function getTabbableIn(container, dir) {
	const list = tabbable(container);
	const len = list.length;
	if (len === 0) return;
	const active = activeElement(ownerDocument(container));
	const index = list.indexOf(active);
	return list[index === -1 ? dir === 1 ? 0 : len - 1 : index + dir];
}
function getNextTabbable(referenceElement) {
	return getTabbableIn(ownerDocument(referenceElement).body, 1) || referenceElement;
}
function getPreviousTabbable(referenceElement) {
	return getTabbableIn(ownerDocument(referenceElement).body, -1) || referenceElement;
}
function getTabbableNearElement(referenceElement, dir) {
	if (!referenceElement) return null;
	const list = tabbable(ownerDocument(referenceElement).body);
	const elementCount = list.length;
	if (elementCount === 0) return null;
	const index = list.indexOf(referenceElement);
	if (index === -1) return null;
	return list[(index + dir + elementCount) % elementCount];
}
function getTabbableAfterElement(referenceElement) {
	return getTabbableNearElement(referenceElement, 1);
}
function getTabbableBeforeElement(referenceElement) {
	return getTabbableNearElement(referenceElement, -1);
}
function isOutsideEvent(event, container) {
	const containerElement = container || event.currentTarget;
	const relatedTarget = event.relatedTarget;
	return !relatedTarget || !contains(containerElement, relatedTarget);
}
function disableFocusInside(container) {
	tabbable(container).forEach((element) => {
		element.dataset.tabindex = element.getAttribute("tabindex") || "";
		element.setAttribute("tabindex", "-1");
	});
}
function enableFocusInside(container) {
	const elements = [];
	appendMatchingElements(container, "[data-tabindex]", elements);
	elements.forEach((element) => {
		const tabindex = element.dataset.tabindex;
		delete element.dataset.tabindex;
		if (tabindex) element.setAttribute("tabindex", tabindex);
		else element.removeAttribute("tabindex");
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/nodes.js
function getNodeChildren(nodes, id, onlyOpenChildren = true) {
	return nodes.filter((node) => node.parentId === id).flatMap((child) => [...!onlyOpenChildren || child.context?.open ? [child] : [], ...getNodeChildren(nodes, child.id, onlyOpenChildren)]);
}
function getNodeAncestors(nodes, id) {
	let allAncestors = [];
	let currentParentId = nodes.find((node) => node.id === id)?.parentId;
	while (currentParentId) {
		const currentNode = nodes.find((node) => node.id === currentParentId);
		currentParentId = currentNode?.parentId;
		if (currentNode) allAncestors = allAncestors.concat(currentNode);
	}
	return allAncestors;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/createAttribute.js
function createAttribute(name) {
	return `data-base-ui-${name}`;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/enqueueFocus.js
var rafId = 0;
function enqueueFocus(el, options = {}) {
	const { preventScroll = false, cancelPrevious = true, sync = false } = options;
	if (cancelPrevious) cancelAnimationFrame(rafId);
	const exec = () => el?.focus({ preventScroll });
	if (sync) {
		exec();
		return NOOP;
	}
	const currentRafId = requestAnimationFrame(exec);
	rafId = currentRafId;
	return () => {
		if (rafId === currentRafId) {
			cancelAnimationFrame(currentRafId);
			rafId = 0;
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/markOthers.js
var counters = {
	inert: /* @__PURE__ */ new WeakMap(),
	"aria-hidden": /* @__PURE__ */ new WeakMap()
};
var markerName = "data-base-ui-inert";
var uncontrolledElementsSets = {
	inert: /* @__PURE__ */ new WeakSet(),
	"aria-hidden": /* @__PURE__ */ new WeakSet()
};
var markerCounterMap = /* @__PURE__ */ new WeakMap();
var lockCount = 0;
function getUncontrolledElementsSet(controlAttribute) {
	return uncontrolledElementsSets[controlAttribute];
}
function unwrapHost(node) {
	if (!node) return null;
	return isShadowRoot(node) ? node.host : unwrapHost(node.parentNode);
}
var correctElements = (parent, targets) => targets.map((target) => {
	if (parent.contains(target)) return target;
	const correctedTarget = unwrapHost(target);
	if (parent.contains(correctedTarget)) return correctedTarget;
	return null;
}).filter((x) => x != null);
var buildKeepSet = (targets) => {
	const keep = /* @__PURE__ */ new Set();
	targets.forEach((target) => {
		let node = target;
		while (node && !keep.has(node)) {
			keep.add(node);
			node = node.parentNode;
		}
	});
	return keep;
};
var collectOutsideElements = (root, keepElements, stopElements) => {
	const outside = [];
	const walk = (parent) => {
		if (!parent || stopElements.has(parent)) return;
		Array.from(parent.children).forEach((node) => {
			if (getNodeName(node) === "script") return;
			if (keepElements.has(node)) walk(node);
			else outside.push(node);
		});
	};
	walk(root);
	return outside;
};
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert, { mark = true, markerIgnoreElements = [] }) {
	const controlAttribute = inert ? "inert" : ariaHidden ? "aria-hidden" : null;
	let counterMap = null;
	let uncontrolledElementsSet = null;
	const avoidElements = correctElements(body, uncorrectedAvoidElements);
	const markerIgnoreTargets = mark ? correctElements(body, markerIgnoreElements) : [];
	const markerIgnoreSet = new Set(markerIgnoreTargets);
	const markerTargets = mark ? collectOutsideElements(body, buildKeepSet(avoidElements), new Set(avoidElements)).filter((target) => !markerIgnoreSet.has(target)) : [];
	const hiddenElements = [];
	const markedElements = [];
	if (controlAttribute) {
		const map = counters[controlAttribute];
		const currentUncontrolledElementsSet = getUncontrolledElementsSet(controlAttribute);
		uncontrolledElementsSet = currentUncontrolledElementsSet;
		counterMap = map;
		const ariaLiveElements = correctElements(body, Array.from(body.querySelectorAll("[aria-live]")));
		const controlElements = avoidElements.concat(ariaLiveElements);
		collectOutsideElements(body, buildKeepSet(controlElements), new Set(controlElements)).forEach((node) => {
			const attr = node.getAttribute(controlAttribute);
			const alreadyHidden = attr !== null && attr !== "false";
			const counterValue = (map.get(node) || 0) + 1;
			map.set(node, counterValue);
			hiddenElements.push(node);
			if (counterValue === 1 && alreadyHidden) currentUncontrolledElementsSet.add(node);
			if (!alreadyHidden) node.setAttribute(controlAttribute, controlAttribute === "inert" ? "" : "true");
		});
	}
	if (mark) markerTargets.forEach((node) => {
		const markerValue = (markerCounterMap.get(node) || 0) + 1;
		markerCounterMap.set(node, markerValue);
		markedElements.push(node);
		if (markerValue === 1) node.setAttribute(markerName, "");
	});
	lockCount += 1;
	return () => {
		if (counterMap) hiddenElements.forEach((element) => {
			const counterValue = (counterMap.get(element) || 0) - 1;
			counterMap.set(element, counterValue);
			if (!counterValue) {
				if (!uncontrolledElementsSet?.has(element) && controlAttribute) element.removeAttribute(controlAttribute);
				uncontrolledElementsSet?.delete(element);
			}
		});
		if (mark) markedElements.forEach((element) => {
			const markerValue = (markerCounterMap.get(element) || 0) - 1;
			markerCounterMap.set(element, markerValue);
			if (!markerValue) element.removeAttribute(markerName);
		});
		lockCount -= 1;
		if (!lockCount) {
			counters.inert = /* @__PURE__ */ new WeakMap();
			counters["aria-hidden"] = /* @__PURE__ */ new WeakMap();
			uncontrolledElementsSets.inert = /* @__PURE__ */ new WeakSet();
			uncontrolledElementsSets["aria-hidden"] = /* @__PURE__ */ new WeakSet();
			markerCounterMap = /* @__PURE__ */ new WeakMap();
		}
	};
}
function markOthers(avoidElements, options = {}) {
	const { ariaHidden = false, inert = false, mark = true, markerIgnoreElements = [] } = options;
	const body = ownerDocument(avoidElements[0]).body;
	return applyAttributeToOthers(avoidElements, body, ariaHidden, inert, {
		mark,
		markerIgnoreElements
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/constants.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var DISABLED_TRANSITIONS_STYLE = { style: { transition: "none" } };
var CLICK_TRIGGER_IDENTIFIER = "data-base-ui-click-trigger";
var BASE_UI_SWIPE_IGNORE_ATTRIBUTE = "data-base-ui-swipe-ignore";
var LEGACY_SWIPE_IGNORE_ATTRIBUTE = "data-swipe-ignore";
`${BASE_UI_SWIPE_IGNORE_ATTRIBUTE}`;
`${LEGACY_SWIPE_IGNORE_ATTRIBUTE}`;
/**
* Used for dropdowns that usually strictly prefer top/bottom placements and
* use `var(--available-height)` to limit their height.
*/
var DROPDOWN_COLLISION_AVOIDANCE = { fallbackAxisSide: "none" };
/**
* Used by regular popups that usually aren't scrollable and are allowed to
* freely flip to any axis of placement.
*/
var POPUP_COLLISION_AVOIDANCE = { fallbackAxisSide: "end" };
/**
* Special visually hidden styles for the aria-owns owner element to ensure owned element
* accessibility in iOS/Safari/VoiceControl.
* The owner element is an empty span, so most of the common visually hidden styles are not needed.
* @see https://github.com/floating-ui/floating-ui/issues/3403
*/
var ownerVisuallyHidden = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingPortal.js
var PortalContext = /* @__PURE__ */ import_react.createContext(null);
var usePortalContext = () => import_react.useContext(PortalContext);
var attr = createAttribute("portal");
function useFloatingPortalNode(props = {}) {
	const { ref, container: containerProp, componentProps = EMPTY_OBJECT, elementProps } = props;
	const uniqueId = useId();
	const parentPortalNode = usePortalContext()?.portalNode;
	const [containerElement, setContainerElement] = import_react.useState(null);
	const [portalNode, setPortalNode] = import_react.useState(null);
	const setPortalNodeRef = useStableCallback((node) => {
		if (node !== null) setPortalNode(node);
	});
	const containerRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (containerProp === null) {
			if (containerRef.current) {
				containerRef.current = null;
				setPortalNode(null);
				setContainerElement(null);
			}
			return;
		}
		if (uniqueId == null) return;
		const resolvedContainer = (containerProp && (isNode(containerProp) ? containerProp : containerProp.current)) ?? parentPortalNode ?? document.body;
		if (resolvedContainer == null) {
			if (containerRef.current) {
				containerRef.current = null;
				setPortalNode(null);
				setContainerElement(null);
			}
			return;
		}
		if (containerRef.current !== resolvedContainer) {
			containerRef.current = resolvedContainer;
			setPortalNode(null);
			setContainerElement(resolvedContainer);
		}
	}, [
		containerProp,
		parentPortalNode,
		uniqueId
	]);
	const portalElement = useRenderElement("div", componentProps, {
		ref: [ref, setPortalNodeRef],
		props: [{
			id: uniqueId,
			[attr]: ""
		}, elementProps]
	});
	return {
		portalNode,
		portalSubtree: containerElement && portalElement ? /* @__PURE__ */ import_react_dom.createPortal(portalElement, containerElement) : null
	};
}
/**
* Portals the floating element into a given container element — by default,
* outside of the app root and into the body.
* This is necessary to ensure the floating element can appear outside any
* potential parent containers that cause clipping (such as `overflow: hidden`),
* while retaining its location in the React tree.
* @see https://floating-ui.com/docs/FloatingPortal
* @internal
*/
var FloatingPortal = /* @__PURE__ */ import_react.forwardRef(function FloatingPortal(componentProps, forwardedRef) {
	const { children, container, className, render, renderGuards, style, ...elementProps } = componentProps;
	const { portalNode, portalSubtree } = useFloatingPortalNode({
		container,
		ref: forwardedRef,
		componentProps,
		elementProps
	});
	const beforeOutsideRef = import_react.useRef(null);
	const afterOutsideRef = import_react.useRef(null);
	const beforeInsideRef = import_react.useRef(null);
	const afterInsideRef = import_react.useRef(null);
	const [focusManagerState, setFocusManagerState] = import_react.useState(null);
	const focusInsideDisabledRef = import_react.useRef(false);
	const modal = focusManagerState?.modal;
	const open = focusManagerState?.open;
	const shouldRenderGuards = typeof renderGuards === "boolean" ? renderGuards : !!focusManagerState && !focusManagerState.modal && focusManagerState.open && !!portalNode;
	import_react.useEffect(() => {
		if (!portalNode || modal) return;
		function onFocus(event) {
			if (portalNode && event.relatedTarget && isOutsideEvent(event)) if (event.type === "focusin") {
				if (focusInsideDisabledRef.current) {
					enableFocusInside(portalNode);
					focusInsideDisabledRef.current = false;
				}
			} else {
				disableFocusInside(portalNode);
				focusInsideDisabledRef.current = true;
			}
		}
		return mergeCleanups(addEventListener(portalNode, "focusin", onFocus, true), addEventListener(portalNode, "focusout", onFocus, true));
	}, [portalNode, modal]);
	import_react.useEffect(() => {
		if (!portalNode || open !== false) return;
		enableFocusInside(portalNode);
		focusInsideDisabledRef.current = false;
	}, [open, portalNode]);
	const portalContextValue = import_react.useMemo(() => ({
		beforeOutsideRef,
		afterOutsideRef,
		beforeInsideRef,
		afterInsideRef,
		portalNode,
		setFocusManagerState
	}), [portalNode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [portalSubtree, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalContext.Provider, {
		value: portalContextValue,
		children: [
			shouldRenderGuards && portalNode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
				"data-type": "outside",
				ref: beforeOutsideRef,
				onFocus: (event) => {
					if (isOutsideEvent(event, portalNode)) beforeInsideRef.current?.focus();
					else getPreviousTabbable(focusManagerState ? focusManagerState.domReference : null)?.focus();
				}
			}),
			shouldRenderGuards && portalNode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-owns": portalNode.id,
				style: ownerVisuallyHidden
			}),
			portalNode && /* @__PURE__ */ import_react_dom.createPortal(children, portalNode),
			shouldRenderGuards && portalNode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
				"data-type": "outside",
				ref: afterOutsideRef,
				onFocus: (event) => {
					if (isOutsideEvent(event, portalNode)) afterInsideRef.current?.focus();
					else {
						getNextTabbable(focusManagerState ? focusManagerState.domReference : null)?.focus();
						if (focusManagerState?.closeOnFocusOut) focusManagerState?.onOpenChange(false, createChangeEventDetails("focus-out", event.nativeEvent));
					}
				}
			})
		]
	})] });
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/createEventEmitter.js
function createEventEmitter() {
	const map = /* @__PURE__ */ new Map();
	return {
		emit(event, data) {
			map.get(event)?.forEach((listener) => listener(data));
		},
		on(event, listener) {
			if (!map.has(event)) map.set(event, /* @__PURE__ */ new Set());
			map.get(event).add(listener);
		},
		off(event, listener) {
			map.get(event)?.delete(listener);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTreeStore.js
/**
* Stores and manages floating elements in a tree structure.
* This is a backing store for the `FloatingTree` component.
*/
var FloatingTreeStore = class {
	nodesRef = { current: [] };
	events = createEventEmitter();
	addNode(node) {
		this.nodesRef.current.push(node);
	}
	removeNode(node) {
		const index = this.nodesRef.current.findIndex((n) => n === node);
		if (index !== -1) this.nodesRef.current.splice(index, 1);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingTree.js
var FloatingNodeContext = /* @__PURE__ */ import_react.createContext(null);
var FloatingTreeContext = /* @__PURE__ */ import_react.createContext(null);
var useFloatingParentNodeId = () => import_react.useContext(FloatingNodeContext)?.id || null;
/**
* Returns the nearest floating tree context, if available.
*/
var useFloatingTree = (externalTree) => {
	const contextTree = import_react.useContext(FloatingTreeContext);
	return externalTree ?? contextTree;
};
/**
* Registers a node into the `FloatingTree`, returning its id.
* @see https://floating-ui.com/docs/FloatingTree
*/
function useFloatingNodeId(externalTree) {
	const id = useId();
	const tree = useFloatingTree(externalTree);
	const parentId = useFloatingParentNodeId();
	useIsoLayoutEffect(() => {
		if (!id) return;
		const node = {
			id,
			parentId
		};
		tree?.addNode(node);
		return () => {
			tree?.removeNode(node);
		};
	}, [
		tree,
		id,
		parentId
	]);
	return id;
}
/**
* Provides parent node context for nested floating elements.
* @see https://floating-ui.com/docs/FloatingTree
* @internal
*/
function FloatingNode(props) {
	const { children, id } = props;
	const parentId = useFloatingParentNodeId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingNodeContext.Provider, {
		value: import_react.useMemo(() => ({
			id,
			parentId
		}), [id, parentId]),
		children
	});
}
/**
* Provides context for nested floating elements when they are not children of
* each other on the DOM.
* This is not necessary in all cases, except when there must be explicit communication between parent and child floating elements. It is necessary for:
* - The `bubbles` option in the `useDismiss()` Hook
* - Nested virtual list navigation
* - Nested floating elements that each open on hover
* - Custom communication between parent and child floating elements
* @see https://floating-ui.com/docs/FloatingTree
* @internal
*/
function FloatingTree(props) {
	const { children, externalTree } = props;
	const tree = useRefWithInit(() => externalTree ?? new FloatingTreeStore()).current;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingTreeContext.Provider, {
		value: tree,
		children
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/resolveRef.js
/**
* If the provided argument is a ref object, returns its `current` value.
* Otherwise, returns the argument itself.
*/
function resolveRef(maybeRef) {
	if (maybeRef == null) return maybeRef;
	return "current" in maybeRef ? maybeRef.current : maybeRef;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingFocusManager.js
function getEventType(event, lastInteractionType) {
	const win = getWindow(getTarget(event));
	if (event instanceof win.KeyboardEvent) return "keyboard";
	if (event instanceof win.FocusEvent) return lastInteractionType || "keyboard";
	if ("pointerType" in event) return event.pointerType || "keyboard";
	if ("touches" in event) return "touch";
	if (event instanceof win.MouseEvent) return lastInteractionType || (event.detail === 0 ? "keyboard" : "mouse");
	return "";
}
var LIST_LIMIT = 20;
var previouslyFocusedElements = [];
function clearDisconnectedPreviouslyFocusedElements() {
	previouslyFocusedElements = previouslyFocusedElements.filter((entry) => {
		return entry.deref()?.isConnected;
	});
}
function addPreviouslyFocusedElement(element) {
	clearDisconnectedPreviouslyFocusedElements();
	if (element && getNodeName(element) !== "body") {
		previouslyFocusedElements.push(new WeakRef(element));
		if (previouslyFocusedElements.length > LIST_LIMIT) previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
	}
}
function getPreviouslyFocusedElement() {
	clearDisconnectedPreviouslyFocusedElements();
	return previouslyFocusedElements[previouslyFocusedElements.length - 1]?.deref();
}
function getFirstTabbableElement(container) {
	if (!container) return null;
	if (isTabbable(container)) return container;
	return tabbable(container)[0] || container;
}
function handleTabIndex(floatingFocusElement, orderRef) {
	if (floatingFocusElement.hasAttribute("tabindex") && !floatingFocusElement.hasAttribute("data-tabindex")) return;
	if (!orderRef.current.includes("floating") && !floatingFocusElement.getAttribute("role")?.includes("dialog")) return;
	const tabbableContent = focusable(floatingFocusElement).filter((element) => {
		const dataTabIndex = element.getAttribute("data-tabindex") || "";
		return isTabbable(element) || element.hasAttribute("data-tabindex") && !dataTabIndex.startsWith("-");
	});
	const tabIndex = floatingFocusElement.getAttribute("tabindex");
	if (orderRef.current.includes("floating") || tabbableContent.length === 0) {
		if (tabIndex !== "0") floatingFocusElement.setAttribute("tabindex", "0");
	} else if (tabIndex !== "-1" || floatingFocusElement.hasAttribute("data-tabindex") && floatingFocusElement.getAttribute("data-tabindex") !== "-1") {
		floatingFocusElement.setAttribute("tabindex", "-1");
		floatingFocusElement.setAttribute("data-tabindex", "-1");
	}
}
/**
* Provides focus management for the floating element.
* @see https://floating-ui.com/docs/FloatingFocusManager
* @internal
*/
function FloatingFocusManager(props) {
	const { context, children, disabled = false, initialFocus = true, returnFocus = true, restoreFocus = false, modal = true, closeOnFocusOut = true, openInteractionType = "", nextFocusableElement, previousFocusableElement, beforeContentFocusGuardRef, externalTree, getInsideElements } = props;
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const domReference = store.useState("domReferenceElement");
	const floating = store.useState("floatingElement");
	const { events, dataRef } = store.context;
	const getNodeId = useStableCallback(() => dataRef.current.floatingContext?.nodeId);
	const ignoreInitialFocus = initialFocus === false;
	const isUntrappedTypeableCombobox = isTypeableCombobox(domReference) && ignoreInitialFocus;
	const orderRef = import_react.useRef(["content"]);
	const initialFocusRef = useValueAsRef(initialFocus);
	const returnFocusRef = useValueAsRef(returnFocus);
	const openInteractionTypeRef = useValueAsRef(openInteractionType);
	const tree = useFloatingTree(externalTree);
	const portalContext = usePortalContext();
	const preventReturnFocusRef = import_react.useRef(false);
	const isPointerDownRef = import_react.useRef(false);
	const pointerDownOutsideRef = import_react.useRef(false);
	const lastFocusedTabbableRef = import_react.useRef(null);
	const closeTypeRef = import_react.useRef("");
	const lastInteractionTypeRef = import_react.useRef("");
	const beforeGuardRef = import_react.useRef(null);
	const afterGuardRef = import_react.useRef(null);
	const mergedBeforeGuardRef = useMergedRefs(beforeGuardRef, beforeContentFocusGuardRef, portalContext?.beforeInsideRef);
	const mergedAfterGuardRef = useMergedRefs(afterGuardRef, portalContext?.afterInsideRef);
	const blurTimeout = useTimeout();
	const pointerDownTimeout = useTimeout();
	const restoreFocusFrame = useAnimationFrame();
	const isInsidePortal = portalContext != null;
	const floatingFocusElement = getFloatingFocusElement(floating);
	const getTabbableContent = useStableCallback((container = floatingFocusElement) => {
		return container ? tabbable(container) : [];
	});
	const getResolvedInsideElements = useStableCallback(() => getInsideElements?.().filter((element) => element != null) ?? []);
	import_react.useEffect(() => {
		if (disabled || !modal) return;
		function onKeyDown(event) {
			if (event.key === "Tab") {
				if (contains(floatingFocusElement, activeElement(ownerDocument(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) stopEvent(event);
			}
		}
		return addEventListener(ownerDocument(floatingFocusElement), "keydown", onKeyDown);
	}, [
		disabled,
		domReference,
		floatingFocusElement,
		modal,
		orderRef,
		isUntrappedTypeableCombobox,
		getTabbableContent
	]);
	import_react.useEffect(() => {
		if (disabled || !open) return;
		const doc = ownerDocument(floatingFocusElement);
		function clearPointerDownOutside() {
			pointerDownOutsideRef.current = false;
		}
		function onPointerDown(event) {
			const target = getTarget(event);
			const insideElements = getResolvedInsideElements();
			pointerDownOutsideRef.current = !(contains(floating, target) || contains(domReference, target) || contains(portalContext?.portalNode, target) || insideElements.some((element) => element === target || contains(element, target)));
			lastInteractionTypeRef.current = event.pointerType || "keyboard";
			if (target?.closest(`[data-base-ui-click-trigger]`)) isPointerDownRef.current = true;
		}
		function onKeyDown() {
			lastInteractionTypeRef.current = "keyboard";
		}
		return mergeCleanups(addEventListener(doc, "pointerdown", onPointerDown, true), addEventListener(doc, "pointerup", clearPointerDownOutside, true), addEventListener(doc, "pointercancel", clearPointerDownOutside, true), addEventListener(doc, "keydown", onKeyDown, true));
	}, [
		disabled,
		floating,
		domReference,
		floatingFocusElement,
		open,
		portalContext,
		getResolvedInsideElements
	]);
	import_react.useEffect(() => {
		if (disabled || !closeOnFocusOut) return;
		const doc = ownerDocument(floatingFocusElement);
		function handlePointerDown() {
			isPointerDownRef.current = true;
			pointerDownTimeout.start(0, () => {
				isPointerDownRef.current = false;
			});
		}
		function handleFocusIn(event) {
			const target = getTarget(event);
			if (isTabbable(target)) lastFocusedTabbableRef.current = target;
		}
		function handleFocusOutside(event) {
			const relatedTarget = event.relatedTarget;
			const currentTarget = event.currentTarget;
			const target = getTarget(event);
			queueMicrotask(() => {
				const nodeId = getNodeId();
				const triggers = store.context.triggerElements;
				const insideElements = getResolvedInsideElements();
				const isRelatedFocusGuard = relatedTarget?.hasAttribute(createAttribute("focus-guard")) && [
					beforeGuardRef.current,
					afterGuardRef.current,
					portalContext?.beforeInsideRef.current,
					portalContext?.afterInsideRef.current,
					portalContext?.beforeOutsideRef.current,
					portalContext?.afterOutsideRef.current,
					resolveRef(previousFocusableElement),
					resolveRef(nextFocusableElement)
				].includes(relatedTarget);
				const movedToUnrelatedNode = !(contains(domReference, relatedTarget) || contains(floating, relatedTarget) || contains(relatedTarget, floating) || contains(portalContext?.portalNode, relatedTarget) || insideElements.some((element) => element === relatedTarget || contains(element, relatedTarget)) || relatedTarget != null && triggers.hasElement(relatedTarget) || triggers.hasMatchingElement((trigger) => contains(trigger, relatedTarget)) || isRelatedFocusGuard || tree && (getNodeChildren(tree.nodesRef.current, nodeId).find((node) => contains(node.context?.elements.floating, relatedTarget) || contains(node.context?.elements.domReference, relatedTarget)) || getNodeAncestors(tree.nodesRef.current, nodeId).find((node) => [node.context?.elements.floating, getFloatingFocusElement(node.context?.elements.floating)].includes(relatedTarget) || node.context?.elements.domReference === relatedTarget)));
				if (currentTarget === domReference && floatingFocusElement) handleTabIndex(floatingFocusElement, orderRef);
				if (restoreFocus && currentTarget !== domReference && !isElementVisible(target) && activeElement(doc) === doc.body) {
					if (isHTMLElement(floatingFocusElement)) {
						floatingFocusElement.focus();
						if (restoreFocus === "popup") {
							restoreFocusFrame.request(() => {
								floatingFocusElement.focus();
							});
							return;
						}
					}
					const tabbableContent = getTabbableContent();
					const prevTabbable = lastFocusedTabbableRef.current;
					const nodeToFocus = (prevTabbable && tabbableContent.includes(prevTabbable) ? prevTabbable : null) || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
					if (isHTMLElement(nodeToFocus)) nodeToFocus.focus();
				}
				if (dataRef.current.insideReactTree) {
					dataRef.current.insideReactTree = false;
					return;
				}
				if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && (isUntrappedTypeableCombobox || relatedTarget !== getPreviouslyFocusedElement())) {
					preventReturnFocusRef.current = true;
					store.setOpen(false, createChangeEventDetails(focusOut, event));
				}
			});
		}
		function markInsideReactTree() {
			if (pointerDownOutsideRef.current) return;
			dataRef.current.insideReactTree = true;
			blurTimeout.start(0, () => {
				dataRef.current.insideReactTree = false;
			});
		}
		const domReferenceElement = isHTMLElement(domReference) ? domReference : null;
		if (!floating && !domReferenceElement) return;
		return mergeCleanups(domReferenceElement && addEventListener(domReferenceElement, "focusout", handleFocusOutside), domReferenceElement && addEventListener(domReferenceElement, "pointerdown", handlePointerDown), floating && addEventListener(floating, "focusin", handleFocusIn), floating && addEventListener(floating, "focusout", handleFocusOutside), floating && portalContext && addEventListener(floating, "focusout", markInsideReactTree, true));
	}, [
		disabled,
		domReference,
		floating,
		floatingFocusElement,
		modal,
		tree,
		portalContext,
		store,
		closeOnFocusOut,
		restoreFocus,
		getTabbableContent,
		isUntrappedTypeableCombobox,
		getNodeId,
		orderRef,
		dataRef,
		blurTimeout,
		pointerDownTimeout,
		restoreFocusFrame,
		nextFocusableElement,
		previousFocusableElement,
		getResolvedInsideElements
	]);
	import_react.useEffect(() => {
		if (disabled || !floating || !open) return;
		const portalNodes = Array.from(portalContext?.portalNode?.querySelectorAll(`[${createAttribute("portal")}]`) || []);
		const rootAncestorComboboxDomReference = (tree ? getNodeAncestors(tree.nodesRef.current, getNodeId()) : []).find((node) => isTypeableCombobox(node.context?.elements.domReference || null))?.context?.elements.domReference;
		const ariaHiddenCleanup = markOthers([
			...[
				floating,
				...portalNodes,
				beforeGuardRef.current,
				afterGuardRef.current,
				portalContext?.beforeOutsideRef.current,
				portalContext?.afterOutsideRef.current,
				...getResolvedInsideElements()
			],
			rootAncestorComboboxDomReference,
			resolveRef(previousFocusableElement),
			resolveRef(nextFocusableElement),
			isUntrappedTypeableCombobox ? domReference : null
		].filter((x) => x != null), {
			ariaHidden: modal || isUntrappedTypeableCombobox,
			mark: false
		});
		const markerCleanup = markOthers([floating, ...portalNodes].filter((x) => x != null));
		return () => {
			markerCleanup();
			ariaHiddenCleanup();
		};
	}, [
		open,
		disabled,
		domReference,
		floating,
		modal,
		orderRef,
		portalContext,
		isUntrappedTypeableCombobox,
		tree,
		getNodeId,
		nextFocusableElement,
		previousFocusableElement,
		getResolvedInsideElements
	]);
	useIsoLayoutEffect(() => {
		if (!open || disabled || !isHTMLElement(floatingFocusElement)) return;
		const previouslyFocusedElement = activeElement(ownerDocument(floatingFocusElement));
		queueMicrotask(() => {
			const initialFocusValueOrFn = initialFocusRef.current;
			const resolvedInitialFocus = typeof initialFocusValueOrFn === "function" ? initialFocusValueOrFn(openInteractionTypeRef.current || "") : initialFocusValueOrFn;
			if (resolvedInitialFocus === void 0 || resolvedInitialFocus === false) return;
			if (contains(floatingFocusElement, previouslyFocusedElement)) return;
			let focusableElements = null;
			const getDefaultFocusElement = () => {
				if (focusableElements == null) focusableElements = getTabbableContent(floatingFocusElement);
				return focusableElements[0] || floatingFocusElement;
			};
			let elToFocus;
			if (resolvedInitialFocus === true || resolvedInitialFocus === null) elToFocus = getDefaultFocusElement();
			else elToFocus = resolveRef(resolvedInitialFocus);
			elToFocus = elToFocus || getDefaultFocusElement();
			enqueueFocus(elToFocus, { preventScroll: elToFocus === floatingFocusElement });
		});
	}, [
		disabled,
		open,
		floatingFocusElement,
		ignoreInitialFocus,
		getTabbableContent,
		initialFocusRef,
		openInteractionTypeRef
	]);
	useIsoLayoutEffect(() => {
		if (disabled || !floatingFocusElement) return;
		const doc = ownerDocument(floatingFocusElement);
		addPreviouslyFocusedElement(activeElement(doc));
		function onOpenChangeLocal(details) {
			if (!details.open) closeTypeRef.current = getEventType(details.nativeEvent, lastInteractionTypeRef.current);
			if (details.reason === "trigger-hover" && details.nativeEvent.type === "mouseleave") preventReturnFocusRef.current = true;
			if (details.reason !== "outside-press") return;
			if (details.nested) preventReturnFocusRef.current = false;
			else if (isVirtualClick(details.nativeEvent) || isVirtualPointerEvent(details.nativeEvent)) preventReturnFocusRef.current = false;
			else {
				let isPreventScrollSupported = false;
				ownerDocument(floatingFocusElement).createElement("div").focus({ get preventScroll() {
					isPreventScrollSupported = true;
					return false;
				} });
				if (isPreventScrollSupported) preventReturnFocusRef.current = false;
				else preventReturnFocusRef.current = true;
			}
		}
		events.on("openchange", onOpenChangeLocal);
		function getReturnElement() {
			const returnFocusValueOrFn = returnFocusRef.current;
			let resolvedReturnFocusValue = typeof returnFocusValueOrFn === "function" ? returnFocusValueOrFn(closeTypeRef.current) : returnFocusValueOrFn;
			if (resolvedReturnFocusValue === void 0 || resolvedReturnFocusValue === false) return null;
			if (resolvedReturnFocusValue === null) resolvedReturnFocusValue = true;
			if (typeof resolvedReturnFocusValue === "boolean") {
				const el = domReference || getPreviouslyFocusedElement();
				return el && el.isConnected ? el : null;
			}
			const fallback = domReference || getPreviouslyFocusedElement();
			return resolveRef(resolvedReturnFocusValue) || fallback || null;
		}
		return () => {
			events.off("openchange", onOpenChangeLocal);
			const activeEl = activeElement(doc);
			const insideElements = getResolvedInsideElements();
			const isFocusInsideFloatingTree = contains(floating, activeEl) || insideElements.some((element) => element === activeEl || contains(element, activeEl)) || tree && getNodeChildren(tree.nodesRef.current, getNodeId(), false).some((node) => contains(node.context?.elements.floating, activeEl));
			const returnFocusValueOrFn = returnFocusRef.current;
			const returnElement = getReturnElement();
			queueMicrotask(() => {
				const tabbableReturnElement = getFirstTabbableElement(returnElement);
				const hasExplicitReturnFocus = typeof returnFocusValueOrFn !== "boolean";
				if (returnFocusValueOrFn && !preventReturnFocusRef.current && isHTMLElement(tabbableReturnElement) && (!hasExplicitReturnFocus && tabbableReturnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)) tabbableReturnElement.focus({ preventScroll: true });
				preventReturnFocusRef.current = false;
			});
		};
	}, [
		disabled,
		floating,
		floatingFocusElement,
		returnFocusRef,
		dataRef,
		events,
		tree,
		domReference,
		getNodeId,
		getResolvedInsideElements
	]);
	useIsoLayoutEffect(() => {
		if (!isWebKit || open || !floating) return;
		const activeEl = activeElement(ownerDocument(floating));
		if (!isHTMLElement(activeEl) || !isTypeableElement(activeEl)) return;
		if (contains(floating, activeEl)) activeEl.blur();
	}, [open, floating]);
	useIsoLayoutEffect(() => {
		if (disabled || !portalContext) return;
		portalContext.setFocusManagerState({
			modal,
			closeOnFocusOut,
			open,
			onOpenChange: store.setOpen,
			domReference
		});
		return () => {
			portalContext.setFocusManagerState(null);
		};
	}, [
		disabled,
		portalContext,
		modal,
		open,
		store,
		closeOnFocusOut,
		domReference
	]);
	useIsoLayoutEffect(() => {
		if (disabled || !floatingFocusElement) return;
		handleTabIndex(floatingFocusElement, orderRef);
		return () => {
			queueMicrotask(clearDisconnectedPreviouslyFocusedElements);
		};
	}, [
		disabled,
		floatingFocusElement,
		orderRef
	]);
	const shouldRenderGuards = !disabled && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		shouldRenderGuards && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
			"data-type": "inside",
			ref: mergedBeforeGuardRef,
			onFocus: (event) => {
				if (modal) {
					const els = getTabbableContent();
					enqueueFocus(els[els.length - 1]);
				} else if (portalContext?.portalNode) {
					preventReturnFocusRef.current = false;
					if (isOutsideEvent(event, portalContext.portalNode)) getNextTabbable(domReference)?.focus();
					else resolveRef(previousFocusableElement ?? portalContext.beforeOutsideRef)?.focus();
				}
			}
		}),
		children,
		shouldRenderGuards && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
			"data-type": "inside",
			ref: mergedAfterGuardRef,
			onFocus: (event) => {
				if (modal) enqueueFocus(getTabbableContent()[0]);
				else if (portalContext?.portalNode) {
					if (closeOnFocusOut) preventReturnFocusRef.current = true;
					if (isOutsideEvent(event, portalContext.portalNode)) getPreviousTabbable(domReference)?.focus();
					else resolveRef(nextFocusableElement ?? portalContext.afterOutsideRef)?.focus();
				}
			}
		})
	] });
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useClick.js
/**
* Opens or closes the floating element when clicking the reference element.
* @see https://floating-ui.com/docs/useClick
*/
function useClick(context, props = {}) {
	const store = "rootStore" in context ? context.rootStore : context;
	const dataRef = store.context.dataRef;
	const { enabled = true, event: eventOption = "click", toggle = true, ignoreMouse = false, stickIfOpen = true, touchOpenDelay = 0, reason = triggerPress } = props;
	const pointerTypeRef = import_react.useRef(void 0);
	const frame = useAnimationFrame();
	const touchOpenTimeout = useTimeout();
	const reference = import_react.useMemo(() => ({
		onPointerDown(event) {
			pointerTypeRef.current = event.pointerType;
		},
		onMouseDown(event) {
			const pointerType = pointerTypeRef.current;
			const nativeEvent = event.nativeEvent;
			const open = store.select("open");
			if (event.button !== 0 || eventOption === "click" || isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
			const openEvent = dataRef.current.openEvent;
			const openEventType = openEvent?.type;
			const hasClickedOnInactiveTrigger = store.select("domReferenceElement") !== event.currentTarget;
			const nextOpen = open && hasClickedOnInactiveTrigger || !(open && toggle && (openEvent && stickIfOpen ? openEventType === "click" || openEventType === "mousedown" : true));
			const target = getTarget(nativeEvent);
			if (isTypeableElement(target)) {
				const details = createChangeEventDetails(reason, nativeEvent, target);
				if (nextOpen && pointerType === "touch" && touchOpenDelay > 0) touchOpenTimeout.start(touchOpenDelay, () => {
					store.setOpen(true, details);
				});
				else store.setOpen(nextOpen, details);
				return;
			}
			const eventCurrentTarget = event.currentTarget;
			frame.request(() => {
				const details = createChangeEventDetails(reason, nativeEvent, eventCurrentTarget);
				if (nextOpen && pointerType === "touch" && touchOpenDelay > 0) touchOpenTimeout.start(touchOpenDelay, () => {
					store.setOpen(true, details);
				});
				else store.setOpen(nextOpen, details);
			});
		},
		onClick(event) {
			if (eventOption === "mousedown-only") return;
			const pointerType = pointerTypeRef.current;
			if (eventOption === "mousedown" && pointerType) {
				pointerTypeRef.current = void 0;
				return;
			}
			if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
			const open = store.select("open");
			const openEvent = dataRef.current.openEvent;
			const hasClickedOnInactiveTrigger = store.select("domReferenceElement") !== event.currentTarget;
			const nextOpen = open && hasClickedOnInactiveTrigger || !(open && toggle && (openEvent && stickIfOpen ? isClickLikeEvent(openEvent) : true));
			const details = createChangeEventDetails(reason, event.nativeEvent, event.currentTarget);
			if (nextOpen && pointerType === "touch" && touchOpenDelay > 0) touchOpenTimeout.start(touchOpenDelay, () => {
				store.setOpen(true, details);
			});
			else store.setOpen(nextOpen, details);
		},
		onKeyDown() {
			pointerTypeRef.current = void 0;
		}
	}), [
		dataRef,
		eventOption,
		ignoreMouse,
		store,
		stickIfOpen,
		toggle,
		frame,
		touchOpenTimeout,
		touchOpenDelay,
		reason
	]);
	return import_react.useMemo(() => enabled ? { reference } : EMPTY_OBJECT, [enabled, reference]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useClientPoint.js
function createVirtualElement(domElement, data) {
	let offsetX = null;
	let offsetY = null;
	let isAutoUpdateEvent = false;
	return {
		contextElement: domElement || void 0,
		getBoundingClientRect() {
			const domRect = domElement?.getBoundingClientRect() || {
				width: 0,
				height: 0,
				x: 0,
				y: 0
			};
			const isXAxis = data.axis === "x" || data.axis === "both";
			const isYAxis = data.axis === "y" || data.axis === "both";
			const canTrackCursorOnAutoUpdate = ["mouseenter", "mousemove"].includes(data.dataRef.current.openEvent?.type || "") && data.pointerType !== "touch";
			let width = domRect.width;
			let height = domRect.height;
			let x = domRect.x;
			let y = domRect.y;
			if (offsetX == null && data.x && isXAxis) offsetX = domRect.x - data.x;
			if (offsetY == null && data.y && isYAxis) offsetY = domRect.y - data.y;
			x -= offsetX || 0;
			y -= offsetY || 0;
			width = 0;
			height = 0;
			if (!isAutoUpdateEvent || canTrackCursorOnAutoUpdate) {
				width = data.axis === "y" ? domRect.width : 0;
				height = data.axis === "x" ? domRect.height : 0;
				x = isXAxis && data.x != null ? data.x : x;
				y = isYAxis && data.y != null ? data.y : y;
			} else if (isAutoUpdateEvent && !canTrackCursorOnAutoUpdate) {
				height = data.axis === "x" ? domRect.height : height;
				width = data.axis === "y" ? domRect.width : width;
			}
			isAutoUpdateEvent = true;
			return {
				width,
				height,
				x,
				y,
				top: y,
				right: x + width,
				bottom: y + height,
				left: x
			};
		}
	};
}
function isMouseBasedEvent(event) {
	return event != null && event.clientX != null;
}
/**
* Positions the floating element relative to a client point (in the viewport),
* such as the mouse position. By default, it follows the mouse cursor.
* @see https://floating-ui.com/docs/useClientPoint
*/
function useClientPoint(context, props = {}) {
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const floating = store.useState("floatingElement");
	const domReference = store.useState("domReferenceElement");
	const dataRef = store.context.dataRef;
	const { enabled = true, axis = "both" } = props;
	const initialRef = import_react.useRef(false);
	const cleanupListenerRef = import_react.useRef(null);
	const [pointerType, setPointerType] = import_react.useState();
	const [reactive, setReactive] = import_react.useState([]);
	const setReference = useStableCallback((newX, newY, referenceElement) => {
		if (initialRef.current) return;
		if (dataRef.current.openEvent && !isMouseBasedEvent(dataRef.current.openEvent)) return;
		store.set("positionReference", createVirtualElement(referenceElement ?? domReference, {
			x: newX,
			y: newY,
			axis,
			dataRef,
			pointerType
		}));
	});
	const handleReferenceEnterOrMove = useStableCallback((event) => {
		if (!open) setReference(event.clientX, event.clientY, event.currentTarget);
		else if (!cleanupListenerRef.current) setReactive([]);
	});
	const openCheck = isMouseLikePointerType(pointerType) ? floating : open;
	const addListener = import_react.useCallback(() => {
		if (!openCheck || !enabled) return;
		const win = getWindow(floating);
		function handleMouseMove(event) {
			if (!contains(floating, getTarget(event))) setReference(event.clientX, event.clientY);
			else {
				cleanupListenerRef.current?.();
				cleanupListenerRef.current = null;
			}
		}
		if (!dataRef.current.openEvent || isMouseBasedEvent(dataRef.current.openEvent)) {
			const cleanup = () => {
				cleanupListenerRef.current?.();
				cleanupListenerRef.current = null;
			};
			cleanupListenerRef.current = addEventListener(win, "mousemove", handleMouseMove);
			return cleanup;
		}
		store.set("positionReference", domReference);
	}, [
		openCheck,
		enabled,
		floating,
		dataRef,
		domReference,
		store,
		setReference
	]);
	import_react.useEffect(() => {
		return addListener();
	}, [addListener, reactive]);
	import_react.useEffect(() => {
		if (enabled && !floating) initialRef.current = false;
	}, [enabled, floating]);
	import_react.useEffect(() => {
		if (!enabled && open) initialRef.current = true;
	}, [enabled, open]);
	const reference = import_react.useMemo(() => {
		function setPointerTypeRef(event) {
			setPointerType(event.pointerType);
		}
		return {
			onPointerDown: setPointerTypeRef,
			onPointerEnter: setPointerTypeRef,
			onMouseMove: handleReferenceEnterOrMove,
			onMouseEnter: handleReferenceEnterOrMove
		};
	}, [handleReferenceEnterOrMove]);
	return import_react.useMemo(() => enabled ? {
		reference,
		trigger: reference
	} : {}, [enabled, reference]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useDismiss.js
var bubbleHandlerKeys = {
	intentional: "onClick",
	sloppy: "onPointerDown"
};
function alwaysFalse() {
	return false;
}
function normalizeProp(normalizable) {
	return {
		escapeKey: typeof normalizable === "boolean" ? normalizable : normalizable?.escapeKey ?? false,
		outsidePress: typeof normalizable === "boolean" ? normalizable : normalizable?.outsidePress ?? true
	};
}
/**
* Closes the floating element when a dismissal is requested — by default, when
* the user presses the `escape` key or outside of the floating element.
* @see https://floating-ui.com/docs/useDismiss
*/
function useDismiss(context, props = {}) {
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const floatingElement = store.useState("floatingElement");
	const { dataRef } = store.context;
	const { enabled = true, escapeKey: escapeKey$1 = true, outsidePress: outsidePressProp = true, outsidePressEvent = "sloppy", referencePress = alwaysFalse, referencePressEvent = "sloppy", bubbles, externalTree } = props;
	const tree = useFloatingTree(externalTree);
	const outsidePressFn = useStableCallback(typeof outsidePressProp === "function" ? outsidePressProp : () => false);
	const outsidePress$1 = typeof outsidePressProp === "function" ? outsidePressFn : outsidePressProp;
	const outsidePressEnabled = outsidePress$1 !== false;
	const getOutsidePressEventProp = useStableCallback(() => outsidePressEvent);
	const pressStartedInsideRef = import_react.useRef(false);
	const pressStartPreventedRef = import_react.useRef(false);
	const suppressNextOutsideClickRef = import_react.useRef(false);
	const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
	const touchStateRef = import_react.useRef(null);
	const cancelDismissOnEndTimeout = useTimeout();
	const clearInsideReactTreeTimeout = useTimeout();
	const clearInsideReactTree = useStableCallback(() => {
		clearInsideReactTreeTimeout.clear();
		dataRef.current.insideReactTree = false;
	});
	const isComposingRef = import_react.useRef(false);
	const currentPointerTypeRef = import_react.useRef("");
	const isReferencePressEnabled = useStableCallback(referencePress);
	const closeOnEscapeKeyDown = useStableCallback((event) => {
		if (!open || !enabled || !escapeKey$1 || event.key !== "Escape") return;
		if (isComposingRef.current) return;
		const nodeId = dataRef.current.floatingContext?.nodeId;
		const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
		if (!escapeKeyBubbles) {
			if (children.length > 0) {
				let shouldDismiss = true;
				children.forEach((child) => {
					if (child.context?.open && !child.context.dataRef.current.__escapeKeyBubbles) shouldDismiss = false;
				});
				if (!shouldDismiss) return;
			}
		}
		const eventDetails = createChangeEventDetails(escapeKey, isReactEvent(event) ? event.nativeEvent : event);
		store.setOpen(false, eventDetails);
		if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) event.stopPropagation();
	});
	const markInsideReactTree = useStableCallback(() => {
		dataRef.current.insideReactTree = true;
		clearInsideReactTreeTimeout.start(0, clearInsideReactTree);
	});
	import_react.useEffect(() => {
		if (!open || !enabled) return;
		dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
		dataRef.current.__outsidePressBubbles = outsidePressBubbles;
		const compositionTimeout = new Timeout();
		const preventedPressSuppressionTimeout = new Timeout();
		function handleCompositionStart() {
			compositionTimeout.clear();
			isComposingRef.current = true;
		}
		function handleCompositionEnd() {
			compositionTimeout.start(isWebKit$1() ? 5 : 0, () => {
				isComposingRef.current = false;
			});
		}
		function suppressImmediateOutsideClickAfterPreventedStart() {
			suppressNextOutsideClickRef.current = true;
			preventedPressSuppressionTimeout.start(0, () => {
				suppressNextOutsideClickRef.current = false;
			});
		}
		function resetPressStartState() {
			pressStartedInsideRef.current = false;
			pressStartPreventedRef.current = false;
		}
		function getOutsidePressEvent() {
			const type = currentPointerTypeRef.current;
			const computedType = type === "pen" || !type ? "mouse" : type;
			const outsidePressEventValue = getOutsidePressEventProp();
			const resolved = typeof outsidePressEventValue === "function" ? outsidePressEventValue() : outsidePressEventValue;
			if (typeof resolved === "string") return resolved;
			return resolved[computedType];
		}
		function shouldIgnoreEvent(event) {
			const computedOutsidePressEvent = getOutsidePressEvent();
			return computedOutsidePressEvent === "intentional" && event.type !== "click" || computedOutsidePressEvent === "sloppy" && event.type === "click";
		}
		function isEventWithinFloatingTree(event) {
			const nodeId = dataRef.current.floatingContext?.nodeId;
			const targetIsInsideChildren = tree && getNodeChildren(tree.nodesRef.current, nodeId).some((node) => isEventTargetWithin(event, node.context?.elements.floating));
			return isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement")) || targetIsInsideChildren;
		}
		function closeOnPressOutside(event) {
			if (shouldIgnoreEvent(event)) {
				clearInsideReactTree();
				return;
			}
			if (dataRef.current.insideReactTree) {
				clearInsideReactTree();
				return;
			}
			const target = getTarget(event);
			const inertSelector = `[${createAttribute("inert")}]`;
			const targetRoot = isElement(target) ? target.getRootNode() : null;
			const markers = Array.from((isShadowRoot(targetRoot) ? targetRoot : ownerDocument(store.select("floatingElement"))).querySelectorAll(inertSelector));
			const triggers = store.context.triggerElements;
			if (target && (triggers.hasElement(target) || triggers.hasMatchingElement((trigger) => contains(trigger, target)))) return;
			let targetRootAncestor = isElement(target) ? target : null;
			while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
				const nextParent = getParentNode(targetRootAncestor);
				if (isLastTraversableNode(nextParent) || !isElement(nextParent)) break;
				targetRootAncestor = nextParent;
			}
			if (markers.length && isElement(target) && !isRootElement(target) && !contains(target, store.select("floatingElement")) && markers.every((marker) => !contains(targetRootAncestor, marker))) return;
			if (isHTMLElement(target) && !("touches" in event)) {
				const lastTraversableNode = isLastTraversableNode(target);
				const style = getComputedStyle$1(target);
				const scrollRe = /auto|scroll/;
				const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
				const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
				const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
				const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
				const isRTL = style.direction === "rtl";
				const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
				const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
				if (pressedVerticalScrollbar || pressedHorizontalScrollbar) return;
			}
			if (isEventWithinFloatingTree(event)) return;
			if (getOutsidePressEvent() === "intentional" && suppressNextOutsideClickRef.current) {
				preventedPressSuppressionTimeout.clear();
				suppressNextOutsideClickRef.current = false;
				return;
			}
			if (typeof outsidePress$1 === "function" && !outsidePress$1(event)) return;
			const nodeId = dataRef.current.floatingContext?.nodeId;
			const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
			if (children.length > 0) {
				let shouldDismiss = true;
				children.forEach((child) => {
					if (child.context?.open && !child.context.dataRef.current.__outsidePressBubbles) shouldDismiss = false;
				});
				if (!shouldDismiss) return;
			}
			store.setOpen(false, createChangeEventDetails(outsidePress, event));
			clearInsideReactTree();
		}
		function handlePointerDown(event) {
			if (getOutsidePressEvent() !== "sloppy" || event.pointerType === "touch" || !store.select("open") || !enabled || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) return;
			closeOnPressOutside(event);
		}
		function handleTouchStart(event) {
			if (getOutsidePressEvent() !== "sloppy" || !store.select("open") || !enabled || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) return;
			const touch = event.touches[0];
			if (touch) {
				touchStateRef.current = {
					startTime: Date.now(),
					startX: touch.clientX,
					startY: touch.clientY,
					dismissOnTouchEnd: false,
					dismissOnMouseDown: true
				};
				cancelDismissOnEndTimeout.start(1e3, () => {
					if (touchStateRef.current) {
						touchStateRef.current.dismissOnTouchEnd = false;
						touchStateRef.current.dismissOnMouseDown = false;
					}
				});
			}
		}
		function addTargetEventListenerOnce(event, listener) {
			const target = getTarget(event);
			if (!target) return;
			const unsubscribe = addEventListener(target, event.type, () => {
				listener(event);
				unsubscribe();
			});
		}
		function handleTouchStartCapture(event) {
			currentPointerTypeRef.current = "touch";
			addTargetEventListenerOnce(event, handleTouchStart);
		}
		function closeOnPressOutsideCapture(event) {
			cancelDismissOnEndTimeout.clear();
			if (event.type === "pointerdown") currentPointerTypeRef.current = event.pointerType;
			if (event.type === "mousedown" && touchStateRef.current && !touchStateRef.current.dismissOnMouseDown) return;
			addTargetEventListenerOnce(event, (targetEvent) => {
				if (targetEvent.type === "pointerdown") handlePointerDown(targetEvent);
				else closeOnPressOutside(targetEvent);
			});
		}
		function handlePressEndCapture(event) {
			if (!pressStartedInsideRef.current) return;
			const pressStartedInsideDefaultPrevented = pressStartPreventedRef.current;
			resetPressStartState();
			if (getOutsidePressEvent() !== "intentional") return;
			if (event.type === "pointercancel") {
				if (pressStartedInsideDefaultPrevented) suppressImmediateOutsideClickAfterPreventedStart();
				return;
			}
			if (isEventWithinFloatingTree(event)) return;
			if (pressStartedInsideDefaultPrevented) {
				suppressImmediateOutsideClickAfterPreventedStart();
				return;
			}
			if (typeof outsidePress$1 === "function" && !outsidePress$1(event)) return;
			preventedPressSuppressionTimeout.clear();
			suppressNextOutsideClickRef.current = true;
			clearInsideReactTree();
		}
		function handleTouchMove(event) {
			if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) return;
			const touch = event.touches[0];
			if (!touch) return;
			const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX);
			const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY);
			const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			if (distance > 5) touchStateRef.current.dismissOnTouchEnd = true;
			if (distance > 10) {
				closeOnPressOutside(event);
				cancelDismissOnEndTimeout.clear();
				touchStateRef.current = null;
			}
		}
		function handleTouchMoveCapture(event) {
			addTargetEventListenerOnce(event, handleTouchMove);
		}
		function handleTouchEnd(event) {
			if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"))) return;
			if (touchStateRef.current.dismissOnTouchEnd) closeOnPressOutside(event);
			cancelDismissOnEndTimeout.clear();
			touchStateRef.current = null;
		}
		function handleTouchEndCapture(event) {
			addTargetEventListenerOnce(event, handleTouchEnd);
		}
		const doc = ownerDocument(floatingElement);
		const unsubscribe = mergeCleanups(escapeKey$1 && mergeCleanups(addEventListener(doc, "keydown", closeOnEscapeKeyDown), addEventListener(doc, "compositionstart", handleCompositionStart), addEventListener(doc, "compositionend", handleCompositionEnd)), outsidePressEnabled && mergeCleanups(addEventListener(doc, "click", closeOnPressOutsideCapture, true), addEventListener(doc, "pointerdown", closeOnPressOutsideCapture, true), addEventListener(doc, "pointerup", handlePressEndCapture, true), addEventListener(doc, "pointercancel", handlePressEndCapture, true), addEventListener(doc, "mousedown", closeOnPressOutsideCapture, true), addEventListener(doc, "mouseup", handlePressEndCapture, true), addEventListener(doc, "touchstart", handleTouchStartCapture, true), addEventListener(doc, "touchmove", handleTouchMoveCapture, true), addEventListener(doc, "touchend", handleTouchEndCapture, true)));
		return () => {
			unsubscribe();
			compositionTimeout.clear();
			preventedPressSuppressionTimeout.clear();
			resetPressStartState();
			suppressNextOutsideClickRef.current = false;
		};
	}, [
		dataRef,
		floatingElement,
		escapeKey$1,
		outsidePressEnabled,
		outsidePress$1,
		open,
		enabled,
		escapeKeyBubbles,
		outsidePressBubbles,
		closeOnEscapeKeyDown,
		clearInsideReactTree,
		getOutsidePressEventProp,
		tree,
		store,
		cancelDismissOnEndTimeout
	]);
	import_react.useEffect(clearInsideReactTree, [outsidePress$1, clearInsideReactTree]);
	const reference = import_react.useMemo(() => ({
		onKeyDown: closeOnEscapeKeyDown,
		[bubbleHandlerKeys[referencePressEvent]]: (event) => {
			if (!isReferencePressEnabled()) return;
			store.setOpen(false, createChangeEventDetails(triggerPress, event.nativeEvent));
		},
		...referencePressEvent !== "intentional" && { onClick(event) {
			if (!isReferencePressEnabled()) return;
			store.setOpen(false, createChangeEventDetails("trigger-press", event.nativeEvent));
		} }
	}), [
		closeOnEscapeKeyDown,
		store,
		referencePressEvent,
		isReferencePressEnabled
	]);
	const markPressStartedInsideReactTree = useStableCallback((event) => {
		if (!open || !enabled || event.button !== 0) return;
		const target = getTarget(event.nativeEvent);
		if (!contains(store.select("floatingElement"), target)) return;
		if (!pressStartedInsideRef.current) {
			pressStartedInsideRef.current = true;
			pressStartPreventedRef.current = false;
		}
	});
	const markInsidePressStartPrevented = useStableCallback((event) => {
		if (!open || !enabled) return;
		if (!(event.defaultPrevented || event.nativeEvent.defaultPrevented)) return;
		if (pressStartedInsideRef.current) pressStartPreventedRef.current = true;
	});
	const floating = import_react.useMemo(() => ({
		onKeyDown: closeOnEscapeKeyDown,
		onPointerDown: markInsidePressStartPrevented,
		onMouseDown: markInsidePressStartPrevented,
		onClickCapture: markInsideReactTree,
		onMouseDownCapture(event) {
			markInsideReactTree();
			markPressStartedInsideReactTree(event);
		},
		onPointerDownCapture(event) {
			markInsideReactTree();
			markPressStartedInsideReactTree(event);
		},
		onMouseUpCapture: markInsideReactTree,
		onTouchEndCapture: markInsideReactTree,
		onTouchMoveCapture: markInsideReactTree
	}), [
		closeOnEscapeKeyDown,
		markInsideReactTree,
		markPressStartedInsideReactTree,
		markInsidePressStartPrevented
	]);
	return import_react.useMemo(() => enabled ? {
		reference,
		floating,
		trigger: reference
	} : {}, [
		enabled,
		reference,
		floating
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
var import_shim = require_shim();
var import_with_selector = require_with_selector();
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	switch (getAlignment(placement)) {
		case "start":
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case "end":
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
	}
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	} : {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement":
						resetPlacement = initialPlacement;
						break;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$3 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$2 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(getSide(placement));
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			if (checkMainAxis) {
				const minSide = mainAxis === "y" ? "top" : "left";
				const maxSide = mainAxis === "y" ? "bottom" : "right";
				const min = mainAxisCoord + overflow[minSide];
				const max = mainAxisCoord - overflow[maxSide];
				mainAxisCoord = clamp$1(min, mainAxisCoord, max);
			}
			if (checkCrossAxis) {
				const minSide = crossAxis === "y" ? "top" : "left";
				const maxSide = crossAxis === "y" ? "bottom" : "right";
				const min = crossAxisCoord + overflow[minSide];
				const max = crossAxisCoord - overflow[maxSide];
				crossAxisCoord = clamp$1(min, crossAxisCoord, max);
			}
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...rawOffset
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			var _state$middlewareData, _state$middlewareData2;
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const noShift = !state.middlewareData.shift;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) availableWidth = maximumClippingWidth;
			if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) {
				const xMin = max(overflow.left, 0);
				const xMax = max(overflow.right, 0);
				const yMin = max(overflow.top, 0);
				const yMax = max(overflow.bottom, 0);
				if (isYAxis) availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
				else availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
			}
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit$1() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) return false;
	return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) if (offsetParent) {
		if (isElement(offsetParent)) scale = getScale(offsetParent);
	} else scale = getScale(element);
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement) {
		const win = getWindow(domElement);
		const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetParent && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
	const html = getDocumentElement(element);
	const scroll = getNodeScroll(element);
	const body = element.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(element);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		const visualViewportBased = isWebKit$1();
		if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	const windowScrollbarX = getWindowScrollBarX(html);
	if (windowScrollbarX <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth;
	} else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX;
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport") rect = getViewportRect(element, strategy);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
	const parentNode = getParentNode(element);
	if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) return false;
	return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let currentContainingBlockComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		if (!currentNodeIsContaining && computedStyle.position === "fixed") currentContainingBlockComputedStyle = null;
		if (elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode)) result = result.filter((ancestor) => ancestor !== currentNode);
		else currentContainingBlockComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	function setLeftRTLScrollbarOffset() {
		offsets.x = getWindowScrollBarX(documentElement);
	}
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		} else if (documentElement) setLeftRTLScrollbarOffset();
	}
	if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset();
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) refresh();
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	refresh(true);
	return cleanup;
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update, { passive: true });
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$1 = offset$2;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$1 = shift$2;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$1 = flip$2;
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$1 = size$2;
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$2 = hide$3;
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$1 = limitShift$2;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = {
		platform,
		...options
	};
	const platformWithCache = {
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+react-dom@2.1._3adcfac7fc02ac08ee35d6d428f8e922/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var index = typeof document !== "undefined" ? import_react.useLayoutEffect : function noop() {};
function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a === "function" && a.toString() === b.toString()) return true;
	let length;
	let i;
	let keys;
	if (a && b && typeof a === "object") {
		if (Array.isArray(a)) {
			length = a.length;
			if (length !== b.length) return false;
			for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
			return true;
		}
		keys = Object.keys(a);
		length = keys.length;
		if (length !== Object.keys(b).length) return false;
		for (i = length; i-- !== 0;) if (!{}.hasOwnProperty.call(b, keys[i])) return false;
		for (i = length; i-- !== 0;) {
			const key = keys[i];
			if (key === "_owner" && a.$$typeof) continue;
			if (!deepEqual(a[key], b[key])) return false;
		}
		return true;
	}
	return a !== a && b !== b;
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
	const ref = import_react.useRef(value);
	index(() => {
		ref.current = value;
	});
	return ref;
}
/**
* Provides data to position a floating element.
* @see https://floating-ui.com/docs/useFloating
*/
function useFloating$1(options) {
	if (options === void 0) options = {};
	const { placement = "bottom", strategy = "absolute", middleware = [], platform, elements: { reference: externalReference, floating: externalFloating } = {}, transform = true, whileElementsMounted, open } = options;
	const [data, setData] = import_react.useState({
		x: 0,
		y: 0,
		strategy,
		placement,
		middlewareData: {},
		isPositioned: false
	});
	const [latestMiddleware, setLatestMiddleware] = import_react.useState(middleware);
	if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware);
	const [_reference, _setReference] = import_react.useState(null);
	const [_floating, _setFloating] = import_react.useState(null);
	const setReference = import_react.useCallback((node) => {
		if (node !== referenceRef.current) {
			referenceRef.current = node;
			_setReference(node);
		}
	}, []);
	const setFloating = import_react.useCallback((node) => {
		if (node !== floatingRef.current) {
			floatingRef.current = node;
			_setFloating(node);
		}
	}, []);
	const referenceEl = externalReference || _reference;
	const floatingEl = externalFloating || _floating;
	const referenceRef = import_react.useRef(null);
	const floatingRef = import_react.useRef(null);
	const dataRef = import_react.useRef(data);
	const hasWhileElementsMounted = whileElementsMounted != null;
	const whileElementsMountedRef = useLatestRef(whileElementsMounted);
	const platformRef = useLatestRef(platform);
	const openRef = useLatestRef(open);
	const update = import_react.useCallback(() => {
		if (!referenceRef.current || !floatingRef.current) return;
		const config = {
			placement,
			strategy,
			middleware: latestMiddleware
		};
		if (platformRef.current) config.platform = platformRef.current;
		computePosition(referenceRef.current, floatingRef.current, config).then((data) => {
			const fullData = {
				...data,
				isPositioned: openRef.current !== false
			};
			if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
				dataRef.current = fullData;
				import_react_dom.flushSync(() => {
					setData(fullData);
				});
			}
		});
	}, [
		latestMiddleware,
		placement,
		strategy,
		platformRef,
		openRef
	]);
	index(() => {
		if (open === false && dataRef.current.isPositioned) {
			dataRef.current.isPositioned = false;
			setData((data) => ({
				...data,
				isPositioned: false
			}));
		}
	}, [open]);
	const isMountedRef = import_react.useRef(false);
	index(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);
	index(() => {
		if (referenceEl) referenceRef.current = referenceEl;
		if (floatingEl) floatingRef.current = floatingEl;
		if (referenceEl && floatingEl) {
			if (whileElementsMountedRef.current) return whileElementsMountedRef.current(referenceEl, floatingEl, update);
			update();
		}
	}, [
		referenceEl,
		floatingEl,
		update,
		whileElementsMountedRef,
		hasWhileElementsMounted
	]);
	const refs = import_react.useMemo(() => ({
		reference: referenceRef,
		floating: floatingRef,
		setReference,
		setFloating
	}), [setReference, setFloating]);
	const elements = import_react.useMemo(() => ({
		reference: referenceEl,
		floating: floatingEl
	}), [referenceEl, floatingEl]);
	const floatingStyles = import_react.useMemo(() => {
		const initialStyles = {
			position: strategy,
			left: 0,
			top: 0
		};
		if (!elements.floating) return initialStyles;
		const x = roundByDPR(elements.floating, data.x);
		const y = roundByDPR(elements.floating, data.y);
		if (transform) return {
			...initialStyles,
			transform: "translate(" + x + "px, " + y + "px)",
			...getDPR(elements.floating) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: strategy,
			left: x,
			top: y
		};
	}, [
		strategy,
		transform,
		elements.floating,
		data.x,
		data.y
	]);
	return import_react.useMemo(() => ({
		...data,
		update,
		refs,
		elements,
		floatingStyles
	}), [
		data,
		update,
		refs,
		elements,
		floatingStyles
	]);
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = (options, deps) => {
	const result = offset$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = (options, deps) => {
	const result = shift$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift = (options, deps) => {
	return {
		fn: limitShift$1(options).fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = (options, deps) => {
	const result = flip$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size = (options, deps) => {
	const result = size$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$1 = (options, deps) => {
	const result = hide$2(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/store/createSelector.js
/**
* The NoOptionalParams type is a utility type that checks if a function has optional or default parameters.
* If the function has optional or default parameters, it returns a string literal type with an error message.
* Otherwise, it returns the original function type.
*
* This is used to enforce that the combiner function passed to createSelector does not have optional or default parameters,
* as memoization relies on the Function.length property, which does not account for optional or default parameters.
*/
/**
* Creates a selector function that can be used to derive values from the store's state.
*
* The combiner function can have up to three additional parameters, but it **cannot have optional or default parameters**.
*
* This function accepts up to six functions and combines them into a single selector function.
* The resulting selector will take the state from the combined selectors and any additional parameters required by the combiner.
*
* The return type of the resulting selector is determined by the return type of the combiner function.
*
* @example
* const selector = createSelector(
*  (state) => state.disabled
* );
*
* @example
* const selector = createSelector(
*   (state) => state.disabled,
*   (state) => state.open,
*   (disabled, open) => ({ disabled, open })
* );
*/
var createSelector = (a, b, c, d, e, f, ...other) => {
	if (other.length > 0) throw new Error(formatErrorMessage(1));
	let selector;
	if (a && b && c && d && e && f) selector = (state, a1, a2, a3) => {
		return f(a(state, a1, a2, a3), b(state, a1, a2, a3), c(state, a1, a2, a3), d(state, a1, a2, a3), e(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a && b && c && d && e) selector = (state, a1, a2, a3) => {
		return e(a(state, a1, a2, a3), b(state, a1, a2, a3), c(state, a1, a2, a3), d(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a && b && c && d) selector = (state, a1, a2, a3) => {
		return d(a(state, a1, a2, a3), b(state, a1, a2, a3), c(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a && b && c) selector = (state, a1, a2, a3) => {
		return c(a(state, a1, a2, a3), b(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a && b) selector = (state, a1, a2, a3) => {
		return b(a(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a) selector = a;
	else throw new Error("Missing arguments");
	return selector;
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/fastHooks.js
var hooks = [];
var currentInstance = void 0;
function getInstance() {
	return currentInstance;
}
function register(hook) {
	hooks.push(hook);
}
function fastComponent(fn) {
	const FastComponent = (props, forwardedRef) => {
		const instance = useRefWithInit(createInstance).current;
		let result;
		try {
			currentInstance = instance;
			for (const hook of hooks) hook.before(instance);
			result = fn(props, forwardedRef);
			for (const hook of hooks) hook.after(instance);
			instance.didInitialize = true;
		} finally {
			currentInstance = void 0;
		}
		return result;
	};
	FastComponent.displayName = fn.displayName || fn.name;
	return FastComponent;
}
function fastComponentRef(fn) {
	return /* @__PURE__ */ import_react.forwardRef(fastComponent(fn));
}
function createInstance() {
	return { didInitialize: false };
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/store/useStore.js
var useStoreImplementation = isReactVersionAtLeast(19) ? useStoreFast : useStoreLegacy;
function useStore(store, selector, a1, a2, a3) {
	return useStoreImplementation(store, selector, a1, a2, a3);
}
function useStoreR19(store, selector, a1, a2, a3) {
	const getSelection = import_react.useCallback(() => selector(store.getSnapshot(), a1, a2, a3), [
		store,
		selector,
		a1,
		a2,
		a3
	]);
	return (0, import_shim.useSyncExternalStore)(store.subscribe, getSelection, getSelection);
}
register({
	before(instance) {
		instance.syncIndex = 0;
		if (!instance.didInitialize) {
			instance.syncTick = 1;
			instance.syncHooks = [];
			instance.didChangeStore = true;
			instance.getSnapshot = () => {
				let didChange = false;
				for (let i = 0; i < instance.syncHooks.length; i += 1) {
					const hook = instance.syncHooks[i];
					const value = hook.selector(hook.store.state, hook.a1, hook.a2, hook.a3);
					if (hook.didChange || !Object.is(hook.value, value)) {
						didChange = true;
						hook.value = value;
						hook.didChange = false;
					}
				}
				if (didChange) instance.syncTick += 1;
				return instance.syncTick;
			};
		}
	},
	after(instance) {
		if (instance.syncHooks.length > 0) {
			if (instance.didChangeStore) {
				instance.didChangeStore = false;
				instance.subscribe = (onStoreChange) => {
					const stores = /* @__PURE__ */ new Set();
					for (const hook of instance.syncHooks) stores.add(hook.store);
					const unsubscribes = [];
					for (const store of stores) unsubscribes.push(store.subscribe(onStoreChange));
					return () => {
						for (const unsubscribe of unsubscribes) unsubscribe();
					};
				};
			}
			(0, import_shim.useSyncExternalStore)(instance.subscribe, instance.getSnapshot, instance.getSnapshot);
		}
	}
});
function useStoreFast(store, selector, a1, a2, a3) {
	const instance = getInstance();
	if (!instance) return useStoreR19(store, selector, a1, a2, a3);
	const index = instance.syncIndex;
	instance.syncIndex += 1;
	let hook;
	if (!instance.didInitialize) {
		hook = {
			store,
			selector,
			a1,
			a2,
			a3,
			value: selector(store.getSnapshot(), a1, a2, a3),
			didChange: false
		};
		instance.syncHooks.push(hook);
	} else {
		hook = instance.syncHooks[index];
		if (hook.store !== store || hook.selector !== selector || !Object.is(hook.a1, a1) || !Object.is(hook.a2, a2) || !Object.is(hook.a3, a3)) {
			if (hook.store !== store) instance.didChangeStore = true;
			hook.store = store;
			hook.selector = selector;
			hook.a1 = a1;
			hook.a2 = a2;
			hook.a3 = a3;
			hook.didChange = true;
		}
	}
	return hook.value;
}
function useStoreLegacy(store, selector, a1, a2, a3) {
	return (0, import_with_selector.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, (state) => selector(state, a1, a2, a3));
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/store/Store.js
/**
* A data store implementation that allows subscribing to state changes and updating the state.
* It uses an observer pattern to notify subscribers when the state changes.
*/
var Store = class {
	/**
	* The current state of the store.
	* This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
	* To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
	* The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
	*
	* Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
	*/
	constructor(state) {
		this.state = state;
		this.listeners = /* @__PURE__ */ new Set();
		this.updateTick = 0;
	}
	/**
	* Registers a listener that will be called whenever the store's state changes.
	*
	* @param fn The listener function to be called on state changes.
	* @returns A function to unsubscribe the listener.
	*/
	subscribe = (fn) => {
		this.listeners.add(fn);
		return () => {
			this.listeners.delete(fn);
		};
	};
	/**
	* Returns the current state of the store.
	*/
	getSnapshot = () => {
		return this.state;
	};
	/**
	* Updates the entire store's state and notifies all registered listeners.
	*
	* @param newState The new state to set for the store.
	*/
	setState(newState) {
		if (this.state === newState) return;
		this.state = newState;
		this.updateTick += 1;
		const currentTick = this.updateTick;
		for (const listener of this.listeners) {
			if (currentTick !== this.updateTick) return;
			listener(newState);
		}
	}
	/**
	* Merges the provided changes into the current state and notifies listeners if there are changes.
	*
	* @param changes An object containing the changes to apply to the current state.
	*/
	update(changes) {
		for (const key in changes) if (!Object.is(this.state[key], changes[key])) {
			this.setState({
				...this.state,
				...changes
			});
			return;
		}
	}
	/**
	* Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
	*
	* @param key The key in the store's state to update.
	* @param value The new value to set for the specified key.
	*/
	set(key, value) {
		if (!Object.is(this.state[key], value)) this.setState({
			...this.state,
			[key]: value
		});
	}
	/**
	* Gives the state a new reference and updates all registered listeners.
	*/
	notifyAll() {
		const newState = { ...this.state };
		this.setState(newState);
	}
	use(selector, a1, a2, a3) {
		return useStore(this, selector, a1, a2, a3);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/store/ReactStore.js
/**
* A Store that supports controlled state keys, non-reactive values and provides utility methods for React.
*/
var ReactStore = class extends Store {
	/**
	* Creates a new ReactStore instance.
	*
	* @param state Initial state of the store.
	* @param context Non-reactive context values.
	* @param selectors Optional selectors for use with `useState`.
	*/
	constructor(state, context = {}, selectors) {
		super(state);
		this.context = context;
		this.selectors = selectors;
	}
	/**
	* Non-reactive values such as refs, callbacks, etc.
	*/
	/**
	* Synchronizes a single external value into the store.
	*
	* Note that the while the value in `state` is updated immediately, the value returned
	* by `useState` is updated before the next render (similarly to React's `useState`).
	*/
	useSyncedValue(key, value) {
		import_react.useDebugValue(key);
		useIsoLayoutEffect(() => {
			if (this.state[key] !== value) this.set(key, value);
		}, [key, value]);
	}
	/**
	* Synchronizes a single external value into the store and
	* cleans it up (sets to `undefined`) on unmount.
	*
	* Note that the while the value in `state` is updated immediately, the value returned
	* by `useState` is updated before the next render (similarly to React's `useState`).
	*/
	useSyncedValueWithCleanup(key, value) {
		const store = this;
		useIsoLayoutEffect(() => {
			if (store.state[key] !== value) store.set(key, value);
			return () => {
				store.set(key, void 0);
			};
		}, [
			store,
			key,
			value
		]);
	}
	/**
	* Synchronizes multiple external values into the store.
	*
	* Note that the while the values in `state` are updated immediately, the values returned
	* by `useState` are updated before the next render (similarly to React's `useState`).
	*/
	useSyncedValues(statePart) {
		const store = this;
		useIsoLayoutEffect(() => {
			store.update(statePart);
		}, [store, ...Object.values(statePart)]);
	}
	/**
	* Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
	* is non-undefined, the store's state at `key` is updated to match `controlled`.
	*/
	useControlledProp(key, controlled) {
		import_react.useDebugValue(key);
		const isControlled = controlled !== void 0;
		useIsoLayoutEffect(() => {
			if (isControlled && !Object.is(this.state[key], controlled)) super.setState({
				...this.state,
				[key]: controlled
			});
		}, [
			key,
			controlled,
			isControlled
		]);
	}
	/** Gets the current value from the store using a selector with the provided key.
	*
	* @param key Key of the selector to use.
	*/
	select(key, a1, a2, a3) {
		const selector = this.selectors[key];
		return selector(this.state, a1, a2, a3);
	}
	/**
	* Returns a value from the store's state using a selector function.
	* Used to subscribe to specific parts of the state.
	* This methods causes a rerender whenever the selected state changes.
	*
	* @param key Key of the selector to use.
	*/
	useState(key, a1, a2, a3) {
		import_react.useDebugValue(key);
		return useStore(this, this.selectors[key], a1, a2, a3);
	}
	/**
	* Wraps a function with `useStableCallback` to ensure it has a stable reference
	* and assigns it to the context.
	*
	* @param key Key of the event callback. Must be a function in the context.
	* @param fn Function to assign.
	*/
	useContextCallback(key, fn) {
		import_react.useDebugValue(key);
		const stableFunction = useStableCallback(fn ?? NOOP);
		this.context[key] = stableFunction;
	}
	/**
	* Returns a stable setter function for a specific key in the store's state.
	* It's commonly used to pass as a ref callback to React elements.
	*
	* @param key Key of the state to set.
	*/
	useStateSetter(key) {
		const ref = import_react.useRef(void 0);
		if (ref.current === void 0) ref.current = (value) => {
			this.set(key, value);
		};
		return ref.current;
	}
	/**
	* Observes changes derived from the store's selectors and calls the listener when the selected value changes.
	*
	* @param key Key of the selector to observe.
	* @param listener Listener function called when the selector result changes.
	*/
	observe(selector, listener) {
		let selectFn;
		if (typeof selector === "function") selectFn = selector;
		else selectFn = this.selectors[selector];
		let prevValue = selectFn(this.state);
		listener(prevValue, prevValue, this);
		return this.subscribe((nextState) => {
			const nextValue = selectFn(nextState);
			if (!Object.is(prevValue, nextValue)) {
				const oldValue = prevValue;
				prevValue = nextValue;
				listener(nextValue, oldValue, this);
			}
		});
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/components/FloatingRootStore.js
var selectors$6 = {
	open: createSelector((state) => state.open),
	transitionStatus: createSelector((state) => state.transitionStatus),
	domReferenceElement: createSelector((state) => state.domReferenceElement),
	referenceElement: createSelector((state) => state.positionReference ?? state.referenceElement),
	floatingElement: createSelector((state) => state.floatingElement),
	floatingId: createSelector((state) => state.floatingId)
};
var FloatingRootStore = class extends ReactStore {
	constructor(options) {
		const { syncOnly, nested, onOpenChange, triggerElements, ...initialState } = options;
		super({
			...initialState,
			positionReference: initialState.referenceElement,
			domReferenceElement: initialState.referenceElement
		}, {
			onOpenChange,
			dataRef: { current: {} },
			events: createEventEmitter(),
			nested,
			triggerElements
		}, selectors$6);
		this.syncOnly = syncOnly;
	}
	/**
	* Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
	*/
	syncOpenEvent = (newOpen, event) => {
		if (!newOpen || !this.state.open || event != null && isClickLikeEvent(event)) this.context.dataRef.current.openEvent = newOpen ? event : void 0;
	};
	/**
	* Runs the root-owned side effects for an open state change.
	*/
	dispatchOpenChange = (newOpen, eventDetails) => {
		this.syncOpenEvent(newOpen, eventDetails.event);
		const details = {
			open: newOpen,
			reason: eventDetails.reason,
			nativeEvent: eventDetails.event,
			nested: this.context.nested,
			triggerElement: eventDetails.trigger
		};
		this.context.events.emit("openchange", details);
	};
	/**
	* Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
	*
	* @param newOpen The new open state.
	* @param eventDetails Details about the event that triggered the open state change.
	*/
	setOpen = (newOpen, eventDetails) => {
		if (this.syncOnly) {
			this.context.onOpenChange?.(newOpen, eventDetails);
			return;
		}
		this.dispatchOpenChange(newOpen, eventDetails);
		this.context.onOpenChange?.(newOpen, eventDetails);
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/useTransitionStatus.js
/**
* Provides a status string for CSS animations.
* @param open - a boolean that determines if the element is open.
* @param enableIdleState - a boolean that enables the `'idle'` state between `'starting'` and `'ending'`
*/
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
	const [transitionStatus, setTransitionStatus] = import_react.useState(open && enableIdleState ? "idle" : void 0);
	const [mounted, setMounted] = import_react.useState(open);
	if (open && !mounted) {
		setMounted(true);
		setTransitionStatus("starting");
	}
	if (!open && mounted && transitionStatus !== "ending" && !deferEndingState) setTransitionStatus("ending");
	if (!open && !mounted && transitionStatus === "ending") setTransitionStatus(void 0);
	useIsoLayoutEffect(() => {
		if (!open && mounted && transitionStatus !== "ending" && deferEndingState) {
			const frame = AnimationFrame.request(() => {
				setTransitionStatus("ending");
			});
			return () => {
				AnimationFrame.cancel(frame);
			};
		}
	}, [
		open,
		mounted,
		transitionStatus,
		deferEndingState
	]);
	useIsoLayoutEffect(() => {
		if (!open || enableIdleState) return;
		const frame = AnimationFrame.request(() => {
			setTransitionStatus(void 0);
		});
		return () => {
			AnimationFrame.cancel(frame);
		};
	}, [enableIdleState, open]);
	useIsoLayoutEffect(() => {
		if (!open || !enableIdleState) return;
		if (open && mounted && transitionStatus !== "idle") setTransitionStatus("starting");
		const frame = AnimationFrame.request(() => {
			setTransitionStatus("idle");
		});
		return () => {
			AnimationFrame.cancel(frame);
		};
	}, [
		enableIdleState,
		open,
		mounted,
		transitionStatus
	]);
	return {
		mounted,
		setMounted,
		transitionStatus
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/useAnimationsFinished.js
/**
* Executes a function once all animations have finished on the provided element.
* @param elementOrRef - The element to watch for animations.
* @param waitForStartingStyleRemoved - Whether to wait for [data-starting-style] to be removed before checking for animations.
* @param treatAbortedAsFinished - Whether to treat aborted animations as finished. If `false`, and there are aborted animations,
*   the function will check again if any new animations have started and wait for them to finish.
* @returns A function that takes a callback to execute once all animations have finished, and an optional AbortSignal to abort the callback
*/
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, treatAbortedAsFinished = true) {
	const frame = useAnimationFrame();
	return useStableCallback((fnToExecute, signal = null) => {
		frame.cancel();
		const element = resolveRef(elementOrRef);
		if (element == null) return;
		const resolvedElement = element;
		const done = () => {
			import_react_dom.flushSync(fnToExecute);
		};
		if (typeof resolvedElement.getAnimations !== "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			fnToExecute();
			return;
		}
		function exec() {
			Promise.all(resolvedElement.getAnimations().map((animation) => animation.finished)).then(() => {
				if (!signal?.aborted) done();
			}).catch(() => {
				if (treatAbortedAsFinished) {
					if (!signal?.aborted) done();
					return;
				}
				const currentAnimations = resolvedElement.getAnimations();
				if (!signal?.aborted && currentAnimations.length > 0 && currentAnimations.some((animation) => animation.pending || animation.playState !== "finished")) exec();
			});
		}
		if (waitForStartingStyleRemoved) {
			const startingStyleAttribute = TransitionStatusDataAttributes.startingStyle;
			if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
				frame.request(exec);
				return;
			}
			const attributeObserver = new MutationObserver(() => {
				if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
					attributeObserver.disconnect();
					exec();
				}
			});
			attributeObserver.observe(resolvedElement, {
				attributes: true,
				attributeFilter: [startingStyleAttribute]
			});
			signal?.addEventListener("abort", () => attributeObserver.disconnect(), { once: true });
			return;
		}
		frame.request(exec);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/useOpenChangeComplete.js
/**
* Calls the provided function when the CSS open/close animation or transition completes.
*/
function useOpenChangeComplete(parameters) {
	const { enabled = true, open, ref, onComplete: onCompleteParam } = parameters;
	const onComplete = useStableCallback(onCompleteParam);
	const runOnceAnimationsFinish = useAnimationsFinished(ref, open, false);
	import_react.useEffect(() => {
		if (!enabled) return;
		const abortController = new AbortController();
		runOnceAnimationsFinish(onComplete, abortController.signal);
		return () => {
			abortController.abort();
		};
	}, [
		enabled,
		open,
		onComplete,
		runOnceAnimationsFinish
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/popups/popupStoreUtils.js
/**
* Returns a callback ref that registers/unregisters the trigger element in the store.
*
* @param store The Store instance where the trigger should be registered.
*/
function useTriggerRegistration(id, store) {
	const registeredElementIdRef = import_react.useRef(null);
	const registeredElementRef = import_react.useRef(null);
	return import_react.useCallback((element) => {
		if (id === void 0) return;
		if (registeredElementIdRef.current !== null) {
			const registeredId = registeredElementIdRef.current;
			const registeredElement = registeredElementRef.current;
			const currentElement = store.context.triggerElements.getById(registeredId);
			if (registeredElement && currentElement === registeredElement) store.context.triggerElements.delete(registeredId);
			registeredElementIdRef.current = null;
			registeredElementRef.current = null;
		}
		if (element !== null) {
			registeredElementIdRef.current = id;
			registeredElementRef.current = element;
			store.context.triggerElements.add(id, element);
		}
	}, [store, id]);
}
/**
* Sets up trigger data forwarding to the store.
*
* @param triggerId Id of the trigger.
* @param triggerElement The trigger DOM element.
* @param store The Store instance managing the popup state.
* @param stateUpdates An object with state updates to apply when the trigger is active.
*/
function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
	const isMountedByThisTrigger = store.useState("isMountedByTrigger", triggerId);
	const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
	const registerTrigger = useStableCallback((element) => {
		baseRegisterTrigger(element);
		if (!element || !store.select("open")) return;
		const activeTriggerId = store.select("activeTriggerId");
		if (activeTriggerId === triggerId) {
			store.update({
				activeTriggerElement: element,
				...stateUpdates
			});
			return;
		}
		if (activeTriggerId == null) store.update({
			activeTriggerId: triggerId,
			activeTriggerElement: element,
			...stateUpdates
		});
	});
	useIsoLayoutEffect(() => {
		if (isMountedByThisTrigger) store.update({
			activeTriggerElement: triggerElementRef.current,
			...stateUpdates
		});
	}, [
		isMountedByThisTrigger,
		store,
		triggerElementRef,
		...Object.values(stateUpdates)
	]);
	return {
		registerTrigger,
		isMountedByThisTrigger
	};
}
/**
* Ensures that when there's only one trigger element registered, it is set as the active trigger.
* This allows controlled popups to work correctly without an explicit triggerId, maintaining compatibility
* with the contained triggers.
*
* This should be called on the Root part.
*
* @param open Whether the popup is open.
* @param store The Store instance managing the popup state.
*/
function useImplicitActiveTrigger(store) {
	const open = store.useState("open");
	useIsoLayoutEffect(() => {
		if (open && !store.select("activeTriggerId") && store.context.triggerElements.size === 1) {
			const iteratorResult = store.context.triggerElements.entries().next();
			if (!iteratorResult.done) {
				const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
				store.update({
					activeTriggerId: implicitTriggerId,
					activeTriggerElement: implicitTriggerElement
				});
			}
		}
	}, [open, store]);
}
/**
* Mangages the mounted state of the popup.
* Sets up the transition status listeners and handles unmounting when needed.
* Updates the `mounted` and `transitionStatus` states in the store.
*
* @param open Whether the popup is open.
* @param store The Store instance managing the popup state.
* @param onUnmount Optional callback to be called when the popup is unmounted.
*
* @returns A function to forcibly unmount the popup.
*/
function useOpenStateTransitions(open, store, onUnmount) {
	const { mounted, setMounted, transitionStatus } = useTransitionStatus(open);
	store.useSyncedValues({
		mounted,
		transitionStatus
	});
	const forceUnmount = useStableCallback(() => {
		setMounted(false);
		store.update({
			activeTriggerId: null,
			activeTriggerElement: null,
			mounted: false
		});
		onUnmount?.();
		store.context.onOpenChangeComplete?.(false);
	});
	useOpenChangeComplete({
		enabled: !store.useState("preventUnmountingOnClose"),
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (!open) forceUnmount();
		}
	});
	return {
		forceUnmount,
		transitionStatus
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/popups/popupTriggerMap.js
/**
* Data structure to keep track of popup trigger elements by their IDs.
* Uses both a set of Elements and a map of IDs to Elements for efficient lookups.
*/
var PopupTriggerMap = class {
	constructor() {
		this.elementsSet = /* @__PURE__ */ new Set();
		this.idMap = /* @__PURE__ */ new Map();
	}
	/**
	* Adds a trigger element with the given ID.
	*
	* Note: The provided element is assumed to not be registered under multiple IDs.
	*/
	add(id, element) {
		const existingElement = this.idMap.get(id);
		if (existingElement === element) return;
		if (existingElement !== void 0) this.elementsSet.delete(existingElement);
		this.elementsSet.add(element);
		this.idMap.set(id, element);
	}
	/**
	* Removes the trigger element with the given ID.
	*/
	delete(id) {
		const element = this.idMap.get(id);
		if (element) {
			this.elementsSet.delete(element);
			this.idMap.delete(id);
		}
	}
	/**
	* Whether the given element is registered as a trigger.
	*/
	hasElement(element) {
		return this.elementsSet.has(element);
	}
	/**
	* Whether there is a registered trigger element matching the given predicate.
	*/
	hasMatchingElement(predicate) {
		for (const element of this.elementsSet) if (predicate(element)) return true;
		return false;
	}
	/**
	* Returns the trigger element associated with the given ID, or undefined if no such element exists.
	*/
	getById(id) {
		return this.idMap.get(id);
	}
	/**
	* Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
	*/
	entries() {
		return this.idMap.entries();
	}
	/**
	* Returns an iterable of all registered trigger elements.
	*/
	elements() {
		return this.elementsSet.values();
	}
	/**
	* Returns the number of registered trigger elements.
	*/
	get size() {
		return this.idMap.size;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/utils/getEmptyRootContext.js
function getEmptyRootContext() {
	return new FloatingRootStore({
		open: false,
		transitionStatus: void 0,
		floatingElement: null,
		referenceElement: null,
		triggerElements: new PopupTriggerMap(),
		floatingId: "",
		syncOnly: false,
		nested: false,
		onOpenChange: void 0
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/popups/store.js
/**
* State common to all popup stores.
*/
function createInitialPopupStoreState() {
	return {
		open: false,
		openProp: void 0,
		mounted: false,
		transitionStatus: void 0,
		floatingRootContext: getEmptyRootContext(),
		preventUnmountingOnClose: false,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		triggerIdProp: void 0,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: EMPTY_OBJECT,
		inactiveTriggerProps: EMPTY_OBJECT,
		popupProps: EMPTY_OBJECT
	};
}
var activeTriggerIdSelector = createSelector((state) => state.triggerIdProp ?? state.activeTriggerId);
var popupStoreSelectors = {
	open: createSelector((state) => state.openProp ?? state.open),
	mounted: createSelector((state) => state.mounted),
	transitionStatus: createSelector((state) => state.transitionStatus),
	floatingRootContext: createSelector((state) => state.floatingRootContext),
	preventUnmountingOnClose: createSelector((state) => state.preventUnmountingOnClose),
	payload: createSelector((state) => state.payload),
	activeTriggerId: activeTriggerIdSelector,
	activeTriggerElement: createSelector((state) => state.mounted ? state.activeTriggerElement : null),
	/**
	* Whether the trigger with the given ID was used to open the popup.
	*/
	isTriggerActive: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId),
	/**
	* Whether the popup is open and was activated by a trigger with the given ID.
	*/
	isOpenedByTrigger: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId && state.open),
	/**
	* Whether the popup is mounted and was activated by a trigger with the given ID.
	*/
	isMountedByTrigger: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId && state.mounted),
	triggerProps: createSelector((state, isActive) => isActive ? state.activeTriggerProps : state.inactiveTriggerProps),
	popupProps: createSelector((state) => state.popupProps),
	popupElement: createSelector((state) => state.popupElement),
	positionerElement: createSelector((state) => state.positionerElement)
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFloatingRootContext.js
function useFloatingRootContext(options) {
	const { open = false, onOpenChange, elements = {} } = options;
	const floatingId = useId();
	const nested = useFloatingParentNodeId() != null;
	const store = useRefWithInit(() => new FloatingRootStore({
		open,
		transitionStatus: void 0,
		onOpenChange,
		referenceElement: elements.reference ?? null,
		floatingElement: elements.floating ?? null,
		triggerElements: new PopupTriggerMap(),
		floatingId,
		syncOnly: false,
		nested
	})).current;
	useIsoLayoutEffect(() => {
		const valuesToSync = {
			open,
			floatingId
		};
		if (elements.reference !== void 0) {
			valuesToSync.referenceElement = elements.reference;
			valuesToSync.domReferenceElement = isElement(elements.reference) ? elements.reference : null;
		}
		if (elements.floating !== void 0) valuesToSync.floatingElement = elements.floating;
		store.update(valuesToSync);
	}, [
		open,
		floatingId,
		elements.reference,
		elements.floating,
		store
	]);
	store.context.onOpenChange = onOpenChange;
	store.context.nested = nested;
	return store;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFloating.js
/**
* Provides data to position a floating element and context to add interactions.
* @see https://floating-ui.com/docs/useFloating
*/
function useFloating(options = {}) {
	const { nodeId, externalTree } = options;
	const internalRootStore = useFloatingRootContext(options);
	const rootContext = options.rootContext || internalRootStore;
	const rootContextElements = {
		reference: rootContext.useState("referenceElement"),
		floating: rootContext.useState("floatingElement"),
		domReference: rootContext.useState("domReferenceElement")
	};
	const [positionReference, setPositionReferenceRaw] = import_react.useState(null);
	const domReferenceRef = import_react.useRef(null);
	const tree = useFloatingTree(externalTree);
	useIsoLayoutEffect(() => {
		if (rootContextElements.domReference) domReferenceRef.current = rootContextElements.domReference;
	}, [rootContextElements.domReference]);
	const position = useFloating$1({
		...options,
		elements: {
			...rootContextElements,
			...positionReference && { reference: positionReference }
		}
	});
	const setPositionReference = import_react.useCallback((node) => {
		const computedPositionReference = isElement(node) ? {
			getBoundingClientRect: () => node.getBoundingClientRect(),
			getClientRects: () => node.getClientRects(),
			contextElement: node
		} : node;
		setPositionReferenceRaw(computedPositionReference);
		position.refs.setReference(computedPositionReference);
	}, [position.refs]);
	const [localDomReference, setLocalDomReference] = import_react.useState(void 0);
	const [localFloatingElement, setLocalFloatingElement] = import_react.useState(null);
	rootContext.useSyncedValue("referenceElement", localDomReference ?? null);
	const localDomReferenceElement = isElement(localDomReference) ? localDomReference : null;
	rootContext.useSyncedValue("domReferenceElement", localDomReference === void 0 ? rootContextElements.domReference : localDomReferenceElement);
	rootContext.useSyncedValue("floatingElement", localFloatingElement);
	const setReference = import_react.useCallback((node) => {
		if (isElement(node) || node === null) {
			domReferenceRef.current = node;
			setLocalDomReference(node);
		}
		if (isElement(position.refs.reference.current) || position.refs.reference.current === null || node !== null && !isElement(node)) position.refs.setReference(node);
	}, [position.refs, setLocalDomReference]);
	const setFloating = import_react.useCallback((node) => {
		setLocalFloatingElement(node);
		position.refs.setFloating(node);
	}, [position.refs]);
	const refs = import_react.useMemo(() => ({
		...position.refs,
		setReference,
		setFloating,
		setPositionReference,
		domReference: domReferenceRef
	}), [
		position.refs,
		setReference,
		setFloating,
		setPositionReference
	]);
	const elements = import_react.useMemo(() => ({
		...position.elements,
		domReference: rootContextElements.domReference
	}), [position.elements, rootContextElements.domReference]);
	const open = rootContext.useState("open");
	const floatingId = rootContext.useState("floatingId");
	const context = import_react.useMemo(() => ({
		...position,
		dataRef: rootContext.context.dataRef,
		open,
		onOpenChange: rootContext.setOpen,
		events: rootContext.context.events,
		floatingId,
		refs,
		elements,
		nodeId,
		rootStore: rootContext
	}), [
		position,
		refs,
		elements,
		nodeId,
		rootContext,
		open,
		floatingId
	]);
	useIsoLayoutEffect(() => {
		rootContext.context.dataRef.current.floatingContext = context;
		const node = tree?.nodesRef.current.find((n) => n.id === nodeId);
		if (node) node.context = context;
	});
	return import_react.useMemo(() => ({
		...position,
		context,
		refs,
		elements,
		rootStore: rootContext
	}), [
		position,
		refs,
		elements,
		context,
		rootContext
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useSyncedFloatingRootContext.js
/**
* Initializes a FloatingRootStore that is kept in sync with the provided PopupStore.
* The new instance is created only once and updated on every render.
*/
function useSyncedFloatingRootContext(options) {
	const { popupStore, treatPopupAsFloatingElement = false, onOpenChange } = options;
	const floatingId = useId();
	const nested = useFloatingParentNodeId() != null;
	const open = popupStore.useState("open");
	const referenceElement = popupStore.useState("activeTriggerElement");
	const floatingElement = popupStore.useState(treatPopupAsFloatingElement ? "popupElement" : "positionerElement");
	const triggerElements = popupStore.context.triggerElements;
	const store = useRefWithInit(() => new FloatingRootStore({
		open,
		transitionStatus: void 0,
		referenceElement,
		floatingElement,
		triggerElements,
		onOpenChange,
		floatingId,
		syncOnly: true,
		nested
	})).current;
	useIsoLayoutEffect(() => {
		const valuesToSync = {
			open,
			floatingId,
			referenceElement,
			floatingElement
		};
		if (isElement(referenceElement)) valuesToSync.domReferenceElement = referenceElement;
		if (store.state.positionReference === store.state.referenceElement) valuesToSync.positionReference = referenceElement;
		store.update(valuesToSync);
	}, [
		open,
		floatingId,
		referenceElement,
		floatingElement,
		store
	]);
	store.context.onOpenChange = onOpenChange;
	store.context.nested = nested;
	return store;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useFocus.js
var isMacSafari = isMac && isSafari;
/**
* Opens the floating element while the reference element has focus, like CSS
* `:focus`.
* @see https://floating-ui.com/docs/useFocus
*/
function useFocus(context, props = {}) {
	const store = "rootStore" in context ? context.rootStore : context;
	const { events, dataRef } = store.context;
	const { enabled = true, delay } = props;
	const blockFocusRef = import_react.useRef(false);
	const blockedReferenceRef = import_react.useRef(null);
	const timeout = useTimeout();
	const keyboardModalityRef = import_react.useRef(true);
	import_react.useEffect(() => {
		const domReference = store.select("domReferenceElement");
		if (!enabled) return;
		const win = getWindow(domReference);
		function onBlur() {
			const currentDomReference = store.select("domReferenceElement");
			if (!store.select("open") && isHTMLElement(currentDomReference) && currentDomReference === activeElement(ownerDocument(currentDomReference))) blockFocusRef.current = true;
		}
		function onKeyDown() {
			keyboardModalityRef.current = true;
		}
		function onPointerDown() {
			keyboardModalityRef.current = false;
		}
		return mergeCleanups(addEventListener(win, "blur", onBlur), isMacSafari && addEventListener(win, "keydown", onKeyDown, true), isMacSafari && addEventListener(win, "pointerdown", onPointerDown, true));
	}, [store, enabled]);
	import_react.useEffect(() => {
		if (!enabled) return;
		function onOpenChangeLocal(details) {
			if (details.reason === "trigger-press" || details.reason === "escape-key") {
				const referenceElement = store.select("domReferenceElement");
				if (isElement(referenceElement)) {
					blockedReferenceRef.current = referenceElement;
					blockFocusRef.current = true;
				}
			}
		}
		events.on("openchange", onOpenChangeLocal);
		return () => {
			events.off("openchange", onOpenChangeLocal);
		};
	}, [
		events,
		enabled,
		store
	]);
	const reference = import_react.useMemo(() => ({
		onMouseLeave() {
			blockFocusRef.current = false;
			blockedReferenceRef.current = null;
		},
		onFocus(event) {
			const focusTarget = event.currentTarget;
			if (blockFocusRef.current) {
				if (blockedReferenceRef.current === focusTarget) return;
				blockFocusRef.current = false;
				blockedReferenceRef.current = null;
			}
			const target = getTarget(event.nativeEvent);
			if (isElement(target)) {
				if (isMacSafari && !event.relatedTarget) {
					if (!keyboardModalityRef.current && !isTypeableElement(target)) return;
				} else if (!matchesFocusVisible(target)) return;
			}
			const movedFromOtherEnabledTrigger = isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements);
			const { nativeEvent, currentTarget } = event;
			const delayValue = typeof delay === "function" ? delay() : delay;
			if (store.select("open") && movedFromOtherEnabledTrigger || delayValue === 0 || delayValue === void 0) {
				store.setOpen(true, createChangeEventDetails(triggerFocus, nativeEvent, currentTarget));
				return;
			}
			timeout.start(delayValue, () => {
				if (blockFocusRef.current) return;
				store.setOpen(true, createChangeEventDetails(triggerFocus, nativeEvent, currentTarget));
			});
		},
		onBlur(event) {
			blockFocusRef.current = false;
			blockedReferenceRef.current = null;
			const relatedTarget = event.relatedTarget;
			const nativeEvent = event.nativeEvent;
			const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute("focus-guard")) && relatedTarget.getAttribute("data-type") === "outside";
			timeout.start(0, () => {
				const domReference = store.select("domReferenceElement");
				const activeEl = activeElement(ownerDocument(domReference));
				if (!relatedTarget && activeEl === domReference) return;
				if (contains(dataRef.current.floatingContext?.refs.floating.current, activeEl) || contains(domReference, activeEl) || movedToFocusGuard) return;
				if (isTargetInsideEnabledTrigger(relatedTarget ?? activeEl, store.context.triggerElements)) return;
				store.setOpen(false, createChangeEventDetails(triggerFocus, nativeEvent));
			});
		}
	}), [
		dataRef,
		store,
		timeout,
		delay
	]);
	return import_react.useMemo(() => enabled ? {
		reference,
		trigger: reference
	} : {}, [enabled, reference]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverInteractionSharedState.js
var HoverInteraction = class HoverInteraction {
	constructor() {
		this.pointerType = void 0;
		this.interactedInside = false;
		this.handler = void 0;
		this.blockMouseMove = true;
		this.performedPointerEventsMutation = false;
		this.pointerEventsScopeElement = null;
		this.pointerEventsReferenceElement = null;
		this.pointerEventsFloatingElement = null;
		this.restTimeoutPending = false;
		this.openChangeTimeout = new Timeout();
		this.restTimeout = new Timeout();
		this.handleCloseOptions = void 0;
	}
	static create() {
		return new HoverInteraction();
	}
	dispose = () => {
		this.openChangeTimeout.clear();
		this.restTimeout.clear();
	};
	disposeEffect = () => {
		return this.dispose;
	};
};
var pointerEventsMutationOwnerByScopeElement = /* @__PURE__ */ new WeakMap();
function clearSafePolygonPointerEventsMutation(instance) {
	if (!instance.performedPointerEventsMutation) return;
	const scopeElement = instance.pointerEventsScopeElement;
	if (scopeElement && pointerEventsMutationOwnerByScopeElement.get(scopeElement) === instance) {
		instance.pointerEventsScopeElement?.style.removeProperty("pointer-events");
		instance.pointerEventsReferenceElement?.style.removeProperty("pointer-events");
		instance.pointerEventsFloatingElement?.style.removeProperty("pointer-events");
		pointerEventsMutationOwnerByScopeElement.delete(scopeElement);
	}
	instance.performedPointerEventsMutation = false;
	instance.pointerEventsScopeElement = null;
	instance.pointerEventsReferenceElement = null;
	instance.pointerEventsFloatingElement = null;
}
function applySafePolygonPointerEventsMutation(instance, options) {
	const { scopeElement, referenceElement, floatingElement } = options;
	const existingOwner = pointerEventsMutationOwnerByScopeElement.get(scopeElement);
	if (existingOwner && existingOwner !== instance) clearSafePolygonPointerEventsMutation(existingOwner);
	clearSafePolygonPointerEventsMutation(instance);
	instance.performedPointerEventsMutation = true;
	instance.pointerEventsScopeElement = scopeElement;
	instance.pointerEventsReferenceElement = referenceElement;
	instance.pointerEventsFloatingElement = floatingElement;
	pointerEventsMutationOwnerByScopeElement.set(scopeElement, instance);
	scopeElement.style.pointerEvents = "none";
	referenceElement.style.pointerEvents = "auto";
	floatingElement.style.pointerEvents = "auto";
}
function useHoverInteractionSharedState(store) {
	const instance = useRefWithInit(HoverInteraction.create).current;
	const data = store.context.dataRef.current;
	if (!data.hoverInteractionState) data.hoverInteractionState = instance;
	useOnMount(data.hoverInteractionState.disposeEffect);
	return data.hoverInteractionState;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverFloatingInteraction.js
/**
* Provides hover interactions that should be attached to the floating element.
*/
function useHoverFloatingInteraction(context, parameters = {}) {
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const floatingElement = store.useState("floatingElement");
	const domReferenceElement = store.useState("domReferenceElement");
	const { dataRef } = store.context;
	const { enabled = true, closeDelay: closeDelayProp = 0, nodeId: nodeIdProp } = parameters;
	const instance = useHoverInteractionSharedState(store);
	const tree = useFloatingTree();
	const parentId = useFloatingParentNodeId();
	const isClickLikeOpenEvent$2 = useStableCallback(() => {
		return isClickLikeOpenEvent(dataRef.current.openEvent?.type, instance.interactedInside);
	});
	const isHoverOpen = useStableCallback(() => {
		const type = dataRef.current.openEvent?.type;
		return type?.includes("mouse") && type !== "mousedown";
	});
	const isRelatedTargetInsideEnabledTrigger = useStableCallback((target) => {
		return isTargetInsideEnabledTrigger(target, store.context.triggerElements);
	});
	const closeWithDelay = import_react.useCallback((event) => {
		const closeDelay = getDelay(closeDelayProp, "close", instance.pointerType);
		const close = () => {
			store.setOpen(false, createChangeEventDetails(triggerHover, event));
			tree?.events.emit("floating.closed", event);
		};
		if (closeDelay) instance.openChangeTimeout.start(closeDelay, close);
		else {
			instance.openChangeTimeout.clear();
			close();
		}
	}, [
		closeDelayProp,
		store,
		instance,
		tree
	]);
	const clearPointerEvents = useStableCallback(() => {
		clearSafePolygonPointerEventsMutation(instance);
	});
	const handleInteractInside = useStableCallback((event) => {
		const target = getTarget(event);
		if (!isInteractiveElement(target)) {
			instance.interactedInside = false;
			return;
		}
		instance.interactedInside = target?.closest("[aria-haspopup]") != null;
	});
	useIsoLayoutEffect(() => {
		if (!open) {
			instance.pointerType = void 0;
			instance.restTimeoutPending = false;
			instance.interactedInside = false;
			clearPointerEvents();
		}
	}, [
		open,
		instance,
		clearPointerEvents
	]);
	import_react.useEffect(() => {
		return clearPointerEvents;
	}, [clearPointerEvents]);
	useIsoLayoutEffect(() => {
		if (!enabled) return;
		if (open && instance.handleCloseOptions?.blockPointerEvents && isHoverOpen() && isElement(domReferenceElement) && floatingElement) {
			const ref = domReferenceElement;
			const floatingEl = floatingElement;
			const doc = ownerDocument(floatingElement);
			const parentFloating = tree?.nodesRef.current.find((node) => node.id === parentId)?.context?.elements.floating;
			if (parentFloating) parentFloating.style.pointerEvents = "";
			applySafePolygonPointerEventsMutation(instance, {
				scopeElement: instance.handleCloseOptions?.getScope?.() ?? instance.pointerEventsScopeElement ?? parentFloating ?? ref.closest("[data-rootownerid]") ?? doc.body,
				referenceElement: ref,
				floatingElement: floatingEl
			});
			return () => {
				clearPointerEvents();
			};
		}
	}, [
		enabled,
		open,
		domReferenceElement,
		floatingElement,
		instance,
		isHoverOpen,
		tree,
		parentId,
		clearPointerEvents
	]);
	const childClosedTimeout = useTimeout();
	import_react.useEffect(() => {
		if (!enabled) return;
		function onFloatingMouseEnter() {
			instance.openChangeTimeout.clear();
			childClosedTimeout.clear();
			tree?.events.off("floating.closed", onNodeClosed);
			clearPointerEvents();
		}
		function onFloatingMouseLeave(event) {
			if (tree && parentId && getNodeChildren(tree.nodesRef.current, parentId).length > 0) {
				tree.events.on("floating.closed", onNodeClosed);
				return;
			}
			if (isRelatedTargetInsideEnabledTrigger(event.relatedTarget)) return;
			const currentNodeId = dataRef.current.floatingContext?.nodeId ?? nodeIdProp;
			const relatedTarget = event.relatedTarget;
			if (tree && currentNodeId && isElement(relatedTarget) && getNodeChildren(tree.nodesRef.current, currentNodeId, false).some((node) => contains(node.context?.elements.floating, relatedTarget))) return;
			if (instance.handler) {
				instance.handler(event);
				return;
			}
			clearPointerEvents();
			if (!isClickLikeOpenEvent$2()) closeWithDelay(event);
		}
		function onNodeClosed(event) {
			if (!tree || !parentId || getNodeChildren(tree.nodesRef.current, parentId).length > 0) return;
			childClosedTimeout.start(0, () => {
				tree.events.off("floating.closed", onNodeClosed);
				store.setOpen(false, createChangeEventDetails(triggerHover, event));
				tree.events.emit("floating.closed", event);
			});
		}
		const floating = floatingElement;
		return mergeCleanups(floating && addEventListener(floating, "mouseenter", onFloatingMouseEnter), floating && addEventListener(floating, "mouseleave", onFloatingMouseLeave), floating && addEventListener(floating, "pointerdown", handleInteractInside, true), () => {
			tree?.events.off("floating.closed", onNodeClosed);
		});
	}, [
		enabled,
		floatingElement,
		store,
		dataRef,
		nodeIdProp,
		isClickLikeOpenEvent$2,
		isRelatedTargetInsideEnabledTrigger,
		closeWithDelay,
		clearPointerEvents,
		handleInteractInside,
		instance,
		tree,
		parentId,
		childClosedTimeout
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useHoverReferenceInteraction.js
var EMPTY_REF = { current: null };
/**
* Provides hover interactions that should be attached to reference or trigger
* elements.
*/
function useHoverReferenceInteraction(context, props = {}) {
	const store = "rootStore" in context ? context.rootStore : context;
	const { dataRef, events } = store.context;
	const { enabled = true, delay = 0, handleClose = null, mouseOnly = false, restMs = 0, move = true, triggerElementRef = EMPTY_REF, externalTree, isActiveTrigger = true, getHandleCloseContext, isClosing } = props;
	const tree = useFloatingTree(externalTree);
	const instance = useHoverInteractionSharedState(store);
	const isHoverCloseActiveRef = import_react.useRef(false);
	const handleCloseRef = useValueAsRef(handleClose);
	const delayRef = useValueAsRef(delay);
	const restMsRef = useValueAsRef(restMs);
	const enabledRef = useValueAsRef(enabled);
	const isClosingRef = useValueAsRef(isClosing);
	if (isActiveTrigger) instance.handleCloseOptions = handleCloseRef.current?.__options;
	const isClickLikeOpenEvent$1 = useStableCallback(() => {
		return isClickLikeOpenEvent(dataRef.current.openEvent?.type, instance.interactedInside);
	});
	const isRelatedTargetInsideEnabledTrigger = useStableCallback((target) => {
		return isTargetInsideEnabledTrigger(target, store.context.triggerElements);
	});
	const isOverInactiveTrigger = useStableCallback((currentDomReference, currentTarget, target) => {
		const allTriggers = store.context.triggerElements;
		if (allTriggers.hasElement(currentTarget)) return !currentDomReference || !contains(currentDomReference, currentTarget);
		if (!isElement(target)) return false;
		const targetElement = target;
		return allTriggers.hasMatchingElement((trigger) => contains(trigger, targetElement)) && (!currentDomReference || !contains(currentDomReference, targetElement));
	});
	const closeWithDelay = useStableCallback((event, runElseBranch = true) => {
		const closeDelay = getDelay(delayRef.current, "close", instance.pointerType);
		if (closeDelay) instance.openChangeTimeout.start(closeDelay, () => {
			store.setOpen(false, createChangeEventDetails(triggerHover, event));
			tree?.events.emit("floating.closed", event);
		});
		else if (runElseBranch) {
			instance.openChangeTimeout.clear();
			store.setOpen(false, createChangeEventDetails(triggerHover, event));
			tree?.events.emit("floating.closed", event);
		}
	});
	const cleanupMouseMoveHandler = useStableCallback(() => {
		if (!instance.handler) return;
		ownerDocument(store.select("domReferenceElement")).removeEventListener("mousemove", instance.handler);
		instance.handler = void 0;
	});
	const clearPointerEvents = useStableCallback(() => {
		clearSafePolygonPointerEventsMutation(instance);
	});
	import_react.useEffect(() => cleanupMouseMoveHandler, [cleanupMouseMoveHandler]);
	import_react.useEffect(() => {
		if (!enabled) return;
		function onOpenChangeLocal(details) {
			if (!details.open) {
				isHoverCloseActiveRef.current = details.reason === triggerHover;
				cleanupMouseMoveHandler();
				instance.openChangeTimeout.clear();
				instance.restTimeout.clear();
				instance.blockMouseMove = true;
				instance.restTimeoutPending = false;
			} else isHoverCloseActiveRef.current = false;
		}
		events.on("openchange", onOpenChangeLocal);
		return () => {
			events.off("openchange", onOpenChangeLocal);
		};
	}, [
		enabled,
		events,
		instance,
		cleanupMouseMoveHandler
	]);
	import_react.useEffect(() => {
		if (!enabled) return;
		const trigger = triggerElementRef.current ?? (isActiveTrigger ? store.select("domReferenceElement") : null);
		if (!isElement(trigger)) return;
		function onMouseEnter(event) {
			instance.openChangeTimeout.clear();
			instance.blockMouseMove = false;
			if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) return;
			const restMsValue = getRestMs(restMsRef.current);
			const openDelay = getDelay(delayRef.current, "open", instance.pointerType);
			const eventTarget = getTarget(event);
			const currentTarget = event.currentTarget ?? null;
			const currentDomReference = store.select("domReferenceElement");
			let triggerNode = currentTarget;
			if (isElement(eventTarget) && !store.context.triggerElements.hasElement(eventTarget)) {
				for (const triggerElement of store.context.triggerElements.elements()) if (contains(triggerElement, eventTarget)) {
					triggerNode = triggerElement;
					break;
				}
			}
			if (isElement(currentTarget) && isElement(currentDomReference) && !store.context.triggerElements.hasElement(currentTarget) && contains(currentTarget, currentDomReference)) triggerNode = currentDomReference;
			const isOverInactive = triggerNode == null ? false : isOverInactiveTrigger(currentDomReference, triggerNode, eventTarget);
			const isOpen = store.select("open");
			const isInClosingTransition = isClosingRef.current?.() ?? store.select("transitionStatus") === "ending";
			const isHoverCloseTransition = !isOpen && isInClosingTransition && isHoverCloseActiveRef.current;
			const isReenteringSameTriggerDuringCloseTransition = !isOverInactive && isElement(triggerNode) && isElement(currentDomReference) && contains(currentDomReference, triggerNode) && isHoverCloseTransition;
			const isRestOnlyDelay = restMsValue > 0 && !openDelay;
			const shouldOpenImmediately = isOverInactive && (isOpen || isHoverCloseTransition) || isReenteringSameTriggerDuringCloseTransition;
			const shouldOpen = !isOpen || isOverInactive;
			if (shouldOpenImmediately) {
				store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode));
				return;
			}
			if (isRestOnlyDelay) return;
			if (openDelay) instance.openChangeTimeout.start(openDelay, () => {
				if (shouldOpen) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode));
			});
			else if (shouldOpen) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode));
		}
		function onMouseLeave(event) {
			if (isClickLikeOpenEvent$1()) {
				clearPointerEvents();
				return;
			}
			cleanupMouseMoveHandler();
			const doc = ownerDocument(store.select("domReferenceElement"));
			instance.restTimeout.clear();
			instance.restTimeoutPending = false;
			const handleCloseContextBase = dataRef.current.floatingContext ?? getHandleCloseContext?.();
			if (isRelatedTargetInsideEnabledTrigger(event.relatedTarget)) return;
			if (handleCloseRef.current && handleCloseContextBase) {
				if (!store.select("open")) instance.openChangeTimeout.clear();
				const currentTrigger = triggerElementRef.current;
				instance.handler = handleCloseRef.current({
					...handleCloseContextBase,
					tree,
					x: event.clientX,
					y: event.clientY,
					onClose() {
						clearPointerEvents();
						cleanupMouseMoveHandler();
						if (enabledRef.current && !isClickLikeOpenEvent$1() && currentTrigger === store.select("domReferenceElement")) closeWithDelay(event, true);
					}
				});
				doc.addEventListener("mousemove", instance.handler);
				instance.handler(event);
				return;
			}
			if (instance.pointerType === "touch" ? !contains(store.select("floatingElement"), event.relatedTarget) : true) closeWithDelay(event);
		}
		if (move) return mergeCleanups(addEventListener(trigger, "mousemove", onMouseEnter, { once: true }), addEventListener(trigger, "mouseenter", onMouseEnter), addEventListener(trigger, "mouseleave", onMouseLeave));
		return mergeCleanups(addEventListener(trigger, "mouseenter", onMouseEnter), addEventListener(trigger, "mouseleave", onMouseLeave));
	}, [
		cleanupMouseMoveHandler,
		clearPointerEvents,
		dataRef,
		delayRef,
		closeWithDelay,
		store,
		enabled,
		handleCloseRef,
		instance,
		isActiveTrigger,
		isOverInactiveTrigger,
		isClickLikeOpenEvent$1,
		isRelatedTargetInsideEnabledTrigger,
		mouseOnly,
		move,
		restMsRef,
		triggerElementRef,
		tree,
		enabledRef,
		getHandleCloseContext,
		isClosingRef
	]);
	return import_react.useMemo(() => {
		if (!enabled) return;
		function setPointerRef(event) {
			instance.pointerType = event.pointerType;
		}
		return {
			onPointerDown: setPointerRef,
			onPointerEnter: setPointerRef,
			onMouseMove(event) {
				const { nativeEvent } = event;
				const trigger = event.currentTarget;
				const currentDomReference = store.select("domReferenceElement");
				const currentOpen = store.select("open");
				const isOverInactive = isOverInactiveTrigger(currentDomReference, trigger, event.target);
				if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) return;
				if (currentOpen && isOverInactive && instance.handleCloseOptions?.blockPointerEvents) {
					const floatingElement = store.select("floatingElement");
					if (floatingElement) applySafePolygonPointerEventsMutation(instance, {
						scopeElement: instance.handleCloseOptions?.getScope?.() ?? trigger.ownerDocument.body,
						referenceElement: trigger,
						floatingElement
					});
				}
				const restMsValue = getRestMs(restMsRef.current);
				if (currentOpen && !isOverInactive || restMsValue === 0) return;
				if (!isOverInactive && instance.restTimeoutPending && event.movementX ** 2 + event.movementY ** 2 < 2) return;
				instance.restTimeout.clear();
				function handleMouseMove() {
					instance.restTimeoutPending = false;
					if (isClickLikeOpenEvent$1()) return;
					const latestOpen = store.select("open");
					if (!instance.blockMouseMove && (!latestOpen || isOverInactive)) store.setOpen(true, createChangeEventDetails(triggerHover, nativeEvent, trigger));
				}
				if (instance.pointerType === "touch") import_react_dom.flushSync(() => {
					handleMouseMove();
				});
				else if (isOverInactive && currentOpen) handleMouseMove();
				else {
					instance.restTimeoutPending = true;
					instance.restTimeout.start(restMsValue, handleMouseMove);
				}
			}
		};
	}, [
		enabled,
		instance,
		isClickLikeOpenEvent$1,
		isOverInactiveTrigger,
		mouseOnly,
		store,
		restMsRef
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useInteractions.js
/**
* Merges an array of interaction hooks' props into prop getters, allowing
* event handler functions to be composed together without overwriting one
* another.
* @see https://floating-ui.com/docs/useInteractions
*/
function useInteractions(propsList = []) {
	const referenceDeps = propsList.map((key) => key?.reference);
	const floatingDeps = propsList.map((key) => key?.floating);
	const itemDeps = propsList.map((key) => key?.item);
	const triggerDeps = propsList.map((key) => key?.trigger);
	const getReferenceProps = import_react.useCallback((userProps) => mergeProps(userProps, propsList, "reference"), referenceDeps);
	const getFloatingProps = import_react.useCallback((userProps) => mergeProps(userProps, propsList, "floating"), floatingDeps);
	const getItemProps = import_react.useCallback((userProps) => mergeProps(userProps, propsList, "item"), itemDeps);
	const getTriggerProps = import_react.useCallback((userProps) => mergeProps(userProps, propsList, "trigger"), triggerDeps);
	return import_react.useMemo(() => ({
		getReferenceProps,
		getFloatingProps,
		getItemProps,
		getTriggerProps
	}), [
		getReferenceProps,
		getFloatingProps,
		getItemProps,
		getTriggerProps
	]);
}
function mergeProps(userProps, propsList, elementKey) {
	const eventHandlers = /* @__PURE__ */ new Map();
	const isItem = elementKey === "item";
	const outputProps = {};
	if (elementKey === "floating") {
		outputProps.tabIndex = -1;
		outputProps[FOCUSABLE_ATTRIBUTE] = "";
	}
	for (const key in userProps) {
		if (isItem && userProps) {
			if (key === "active" || key === "selected") continue;
		}
		outputProps[key] = userProps[key];
	}
	for (let i = 0; i < propsList.length; i += 1) {
		let props;
		const propsOrGetProps = propsList[i]?.[elementKey];
		if (typeof propsOrGetProps === "function") props = userProps ? propsOrGetProps(userProps) : null;
		else props = propsOrGetProps;
		if (!props) continue;
		mutablyMergeProps(outputProps, props, isItem, eventHandlers);
	}
	mutablyMergeProps(outputProps, userProps, isItem, eventHandlers);
	return outputProps;
}
function mutablyMergeProps(outputProps, props, isItem, eventHandlers) {
	for (const key in props) {
		const value = props[key];
		if (isItem && (key === "active" || key === "selected")) continue;
		if (!key.startsWith("on")) outputProps[key] = value;
		else {
			if (!eventHandlers.has(key)) eventHandlers.set(key, []);
			if (typeof value === "function") {
				eventHandlers.get(key)?.push(value);
				outputProps[key] = (...args) => {
					return eventHandlers.get(key)?.map((fn) => fn(...args)).find((val) => val !== void 0);
				};
			}
		}
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useListNavigation.js
var ESCAPE = "Escape";
function doSwitch(orientation, vertical, horizontal) {
	switch (orientation) {
		case "vertical": return vertical;
		case "horizontal": return horizontal;
		default: return vertical || horizontal;
	}
}
function isMainOrientationKey(key, orientation) {
	return doSwitch(orientation, key === "ArrowUp" || key === "ArrowDown", key === "ArrowLeft" || key === "ArrowRight");
}
function isMainOrientationToEndKey(key, orientation, rtl) {
	return doSwitch(orientation, key === "ArrowDown", rtl ? key === "ArrowLeft" : key === "ArrowRight") || key === "Enter" || key === " " || key === "";
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
	return doSwitch(orientation, rtl ? key === ARROW_LEFT$1 : key === ARROW_RIGHT$1, key === ARROW_DOWN$1);
}
function isCrossOrientationCloseKey(key, orientation, rtl, cols) {
	const vertical = rtl ? key === ARROW_RIGHT$1 : key === ARROW_LEFT$1;
	const horizontal = key === ARROW_UP$1;
	if (orientation === "both" || orientation === "horizontal" && cols && cols > 1) return key === ESCAPE;
	return doSwitch(orientation, vertical, horizontal);
}
/**
* Adds arrow key-based navigation of a list of items, either using real DOM
* focus or virtual focus.
* @see https://floating-ui.com/docs/useListNavigation
*/
function useListNavigation(context, props) {
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const floatingElement = store.useState("floatingElement");
	const domReferenceElement = store.useState("domReferenceElement");
	const dataRef = store.context.dataRef;
	const { listRef, activeIndex, onNavigate: onNavigateProp = () => {}, enabled = true, selectedIndex = null, allowEscape = false, loopFocus = false, nested = false, rtl = false, virtual = false, focusItemOnOpen = "auto", focusItemOnHover = true, openOnArrowKeyDown = true, disabledIndices = void 0, orientation = "vertical", parentOrientation, cols = 1, id, resetOnPointerLeave = true, externalTree } = props;
	const floatingFocusElementRef = useValueAsRef(getFloatingFocusElement(floatingElement));
	const parentId = useFloatingParentNodeId();
	const tree = useFloatingTree(externalTree);
	useIsoLayoutEffect(() => {
		dataRef.current.orientation = orientation;
	}, [dataRef, orientation]);
	const typeableComboboxReference = isTypeableCombobox(domReferenceElement);
	const focusItemOnOpenRef = import_react.useRef(focusItemOnOpen);
	const indexRef = import_react.useRef(selectedIndex ?? -1);
	const keyRef = import_react.useRef(null);
	const isPointerModalityRef = import_react.useRef(true);
	const onNavigate = useStableCallback((event) => {
		onNavigateProp(indexRef.current === -1 ? null : indexRef.current, event);
	});
	const previousOnNavigateRef = import_react.useRef(onNavigate);
	const previousMountedRef = import_react.useRef(!!floatingElement);
	const previousOpenRef = import_react.useRef(open);
	const forceSyncFocusRef = import_react.useRef(false);
	const forceScrollIntoViewRef = import_react.useRef(false);
	const cancelQueuedFocusRef = import_react.useRef(null);
	const disabledIndicesRef = useValueAsRef(disabledIndices);
	const latestOpenRef = useValueAsRef(open);
	const selectedIndexRef = useValueAsRef(selectedIndex);
	const resetOnPointerLeaveRef = useValueAsRef(resetOnPointerLeave);
	const focusItem = useStableCallback(() => {
		function runFocus(item) {
			if (virtual) tree?.events.emit("virtualfocus", item);
			else cancelQueuedFocusRef.current = enqueueFocus(item, {
				sync: forceSyncFocusRef.current,
				preventScroll: true
			});
		}
		const initialItem = listRef.current[indexRef.current];
		const forceScrollIntoView = forceScrollIntoViewRef.current;
		if (initialItem) runFocus(initialItem);
		(forceSyncFocusRef.current ? (v) => v() : requestAnimationFrame)(() => {
			const waitedItem = listRef.current[indexRef.current] || initialItem;
			if (!waitedItem) return;
			if (!initialItem) runFocus(waitedItem);
			if (item && (forceScrollIntoView || !isPointerModalityRef.current)) waitedItem.scrollIntoView?.({
				block: "nearest",
				inline: "nearest"
			});
		});
	});
	useIsoLayoutEffect(() => {
		if (!enabled) return;
		if (open && floatingElement) {
			indexRef.current = selectedIndex ?? -1;
			if (focusItemOnOpenRef.current && selectedIndex != null) {
				forceScrollIntoViewRef.current = true;
				onNavigate();
			}
		} else if (previousMountedRef.current) {
			indexRef.current = -1;
			previousOnNavigateRef.current();
		}
	}, [
		enabled,
		open,
		floatingElement,
		selectedIndex,
		onNavigate
	]);
	useIsoLayoutEffect(() => {
		if (!enabled) return;
		if (!open) {
			forceSyncFocusRef.current = false;
			return;
		}
		if (!floatingElement) return;
		if (activeIndex == null) {
			forceSyncFocusRef.current = false;
			if (selectedIndexRef.current != null) return;
			if (previousMountedRef.current) {
				indexRef.current = -1;
				focusItem();
			}
			if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
				let runs = 0;
				const waitForListPopulated = () => {
					if (listRef.current[0] == null) {
						if (runs < 2) (runs ? requestAnimationFrame : queueMicrotask)(waitForListPopulated);
						runs += 1;
					} else {
						indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinListIndex(listRef) : getMaxListIndex(listRef);
						keyRef.current = null;
						onNavigate();
					}
				};
				waitForListPopulated();
			}
		} else if (!isIndexOutOfListBounds(listRef.current, activeIndex)) {
			indexRef.current = activeIndex;
			focusItem();
			forceScrollIntoViewRef.current = false;
		}
	}, [
		enabled,
		open,
		floatingElement,
		activeIndex,
		selectedIndexRef,
		nested,
		listRef,
		orientation,
		rtl,
		onNavigate,
		focusItem,
		disabledIndicesRef
	]);
	useIsoLayoutEffect(() => {
		if (!enabled || floatingElement || !tree || virtual || !previousMountedRef.current) return;
		const nodes = tree.nodesRef.current;
		const parent = nodes.find((node) => node.id === parentId)?.context?.elements.floating;
		const activeEl = activeElement(ownerDocument(floatingElement));
		const treeContainsActiveEl = nodes.some((node) => node.context && contains(node.context.elements.floating, activeEl));
		if (parent && !treeContainsActiveEl && isPointerModalityRef.current) parent.focus({ preventScroll: true });
	}, [
		enabled,
		floatingElement,
		tree,
		parentId,
		virtual
	]);
	useIsoLayoutEffect(() => {
		previousOnNavigateRef.current = onNavigate;
		previousOpenRef.current = open;
		previousMountedRef.current = !!floatingElement;
	});
	useIsoLayoutEffect(() => {
		if (!open) {
			keyRef.current = null;
			focusItemOnOpenRef.current = focusItemOnOpen;
		}
	}, [open, focusItemOnOpen]);
	const hasActiveIndex = activeIndex != null;
	const syncCurrentTarget = useStableCallback((event) => {
		if (!latestOpenRef.current) return;
		const index = listRef.current.indexOf(event.currentTarget);
		if (index !== -1 && (indexRef.current !== index || activeIndex !== index)) {
			indexRef.current = index;
			onNavigate(event);
		}
	});
	const item = import_react.useMemo(() => {
		return {
			onFocus(event) {
				forceSyncFocusRef.current = true;
				syncCurrentTarget(event);
			},
			onClick: ({ currentTarget }) => currentTarget.focus({ preventScroll: true }),
			onMouseMove(event) {
				forceSyncFocusRef.current = true;
				forceScrollIntoViewRef.current = false;
				if (focusItemOnHover) syncCurrentTarget(event);
			},
			onPointerLeave(event) {
				if (!latestOpenRef.current || !isPointerModalityRef.current || event.pointerType === "touch") return;
				forceSyncFocusRef.current = true;
				const relatedTarget = event.relatedTarget;
				if (!focusItemOnHover || listRef.current.includes(relatedTarget)) return;
				if (!resetOnPointerLeaveRef.current) return;
				cancelQueuedFocusRef.current?.();
				cancelQueuedFocusRef.current = null;
				indexRef.current = -1;
				onNavigate(event);
				if (!virtual) {
					const floatingFocusEl = floatingFocusElementRef.current;
					const activeEl = activeElement(ownerDocument(floatingFocusEl));
					if (floatingFocusEl && contains(floatingFocusEl, activeEl)) floatingFocusEl.focus({ preventScroll: true });
				}
			}
		};
	}, [
		syncCurrentTarget,
		latestOpenRef,
		floatingFocusElementRef,
		focusItemOnHover,
		listRef,
		onNavigate,
		resetOnPointerLeaveRef,
		virtual
	]);
	const getParentOrientation = import_react.useCallback(() => {
		return parentOrientation ?? tree?.nodesRef.current.find((node) => node.id === parentId)?.context?.dataRef?.current.orientation;
	}, [
		parentId,
		tree,
		parentOrientation
	]);
	const commonOnKeyDown = useStableCallback((event) => {
		isPointerModalityRef.current = false;
		forceSyncFocusRef.current = true;
		if (event.which === 229) return;
		if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) return;
		if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl, cols)) {
			if (!isMainOrientationKey(event.key, getParentOrientation())) stopEvent(event);
			store.setOpen(false, createChangeEventDetails(listNavigation, event.nativeEvent));
			if (isHTMLElement(domReferenceElement)) if (virtual) tree?.events.emit("virtualfocus", domReferenceElement);
			else domReferenceElement.focus();
			return;
		}
		const currentIndex = indexRef.current;
		const minIndex = getMinListIndex(listRef, disabledIndices);
		const maxIndex = getMaxListIndex(listRef, disabledIndices);
		if (!typeableComboboxReference) {
			if (event.key === "Home") {
				stopEvent(event);
				indexRef.current = minIndex;
				onNavigate(event);
			}
			if (event.key === "End") {
				stopEvent(event);
				indexRef.current = maxIndex;
				onNavigate(event);
			}
		}
		if (cols > 1) {
			const sizes = Array.from({ length: listRef.current.length }, () => ({
				width: 1,
				height: 1
			}));
			const cellMap = createGridCellMap(sizes, cols, false);
			const minGridIndex = cellMap.findIndex((index) => index != null && !isListIndexDisabled(listRef.current, index, disabledIndices));
			const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex) => index != null && !isListIndexDisabled(listRef.current, index, disabledIndices) ? cellIndex : foundIndex, -1);
			const index = cellMap[getGridNavigatedIndex(cellMap.map((itemIndex) => itemIndex != null ? listRef.current[itemIndex] : null), {
				event,
				orientation,
				loopFocus,
				rtl,
				cols,
				disabledIndices: getGridCellIndices([...(typeof disabledIndices !== "function" ? disabledIndices : null) || listRef.current.map((_, listIndex) => isListIndexDisabled(listRef.current, listIndex, disabledIndices) ? listIndex : void 0), void 0], cellMap),
				minIndex: minGridIndex,
				maxIndex: maxGridIndex,
				prevIndex: getGridCellIndexOfCorner(indexRef.current > maxIndex ? minIndex : indexRef.current, sizes, cellMap, cols, event.key === "ArrowDown" ? "bl" : event.key === (rtl ? "ArrowLeft" : "ArrowRight") ? "tr" : "tl"),
				stopEvent: true
			})];
			if (index != null) {
				indexRef.current = index;
				onNavigate(event);
			}
			if (orientation === "both") return;
		}
		if (isMainOrientationKey(event.key, orientation)) {
			stopEvent(event);
			if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
				indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
				onNavigate(event);
				return;
			}
			if (isMainOrientationToEndKey(event.key, orientation, rtl)) if (loopFocus) if (currentIndex >= maxIndex) if (allowEscape && currentIndex !== listRef.current.length) indexRef.current = -1;
			else {
				forceSyncFocusRef.current = false;
				indexRef.current = minIndex;
			}
			else indexRef.current = findNonDisabledListIndex(listRef.current, {
				startingIndex: currentIndex,
				disabledIndices
			});
			else indexRef.current = Math.min(maxIndex, findNonDisabledListIndex(listRef.current, {
				startingIndex: currentIndex,
				disabledIndices
			}));
			else if (loopFocus) if (currentIndex <= minIndex) if (allowEscape && currentIndex !== -1) indexRef.current = listRef.current.length;
			else {
				forceSyncFocusRef.current = false;
				indexRef.current = maxIndex;
			}
			else indexRef.current = findNonDisabledListIndex(listRef.current, {
				startingIndex: currentIndex,
				decrement: true,
				disabledIndices
			});
			else indexRef.current = Math.max(minIndex, findNonDisabledListIndex(listRef.current, {
				startingIndex: currentIndex,
				decrement: true,
				disabledIndices
			}));
			if (isIndexOutOfListBounds(listRef.current, indexRef.current)) indexRef.current = -1;
			onNavigate(event);
		}
	});
	const ariaActiveDescendantProp = import_react.useMemo(() => {
		return virtual && open && hasActiveIndex && { "aria-activedescendant": `${id}-${activeIndex}` };
	}, [
		virtual,
		open,
		hasActiveIndex,
		id,
		activeIndex
	]);
	const floating = import_react.useMemo(() => {
		return {
			"aria-orientation": orientation === "both" ? void 0 : orientation,
			...!typeableComboboxReference ? ariaActiveDescendantProp : {},
			onKeyDown(event) {
				if (event.key === "Tab" && event.shiftKey && open && !virtual) {
					const target = getTarget(event.nativeEvent);
					if (target && !contains(floatingFocusElementRef.current, target)) return;
					stopEvent(event);
					store.setOpen(false, createChangeEventDetails(focusOut, event.nativeEvent));
					if (isHTMLElement(domReferenceElement)) domReferenceElement.focus();
					return;
				}
				commonOnKeyDown(event);
			},
			onPointerMove() {
				isPointerModalityRef.current = true;
			}
		};
	}, [
		ariaActiveDescendantProp,
		commonOnKeyDown,
		floatingFocusElementRef,
		orientation,
		typeableComboboxReference,
		store,
		open,
		virtual,
		domReferenceElement
	]);
	const trigger = import_react.useMemo(() => {
		function checkVirtualMouse(event) {
			if (focusItemOnOpen === "auto" && isVirtualClick(event.nativeEvent)) focusItemOnOpenRef.current = !virtual;
		}
		function checkVirtualPointer(event) {
			focusItemOnOpenRef.current = focusItemOnOpen;
			if (focusItemOnOpen === "auto" && isVirtualPointerEvent(event.nativeEvent)) focusItemOnOpenRef.current = true;
		}
		return {
			onKeyDown(event) {
				const currentOpen = store.select("open");
				isPointerModalityRef.current = false;
				const isArrowKey = event.key.startsWith("Arrow");
				const isParentCrossOpenKey = isCrossOrientationOpenKey(event.key, getParentOrientation(), rtl);
				const isMainKey = isMainOrientationKey(event.key, orientation);
				const isNavigationKey = (nested ? isParentCrossOpenKey : isMainKey) || event.key === "Enter" || event.key.trim() === "";
				if (virtual && currentOpen) return commonOnKeyDown(event);
				if (!currentOpen && !openOnArrowKeyDown && isArrowKey) return;
				if (isNavigationKey) {
					const isParentMainKey = isMainOrientationKey(event.key, getParentOrientation());
					keyRef.current = nested && isParentMainKey ? null : event.key;
				}
				if (nested) {
					if (isParentCrossOpenKey) {
						stopEvent(event);
						if (currentOpen) {
							indexRef.current = getMinListIndex(listRef, disabledIndicesRef.current);
							onNavigate(event);
						} else store.setOpen(true, createChangeEventDetails(listNavigation, event.nativeEvent, event.currentTarget));
					}
					return;
				}
				if (isMainKey) {
					if (selectedIndexRef.current != null) indexRef.current = selectedIndexRef.current;
					stopEvent(event);
					if (!currentOpen && openOnArrowKeyDown) store.setOpen(true, createChangeEventDetails(listNavigation, event.nativeEvent, event.currentTarget));
					else commonOnKeyDown(event);
					if (currentOpen) onNavigate(event);
				}
			},
			onFocus(event) {
				if (store.select("open") && !virtual) {
					indexRef.current = -1;
					onNavigate(event);
				}
			},
			onPointerDown: checkVirtualPointer,
			onPointerEnter: checkVirtualPointer,
			onMouseDown: checkVirtualMouse,
			onClick: checkVirtualMouse
		};
	}, [
		commonOnKeyDown,
		disabledIndicesRef,
		focusItemOnOpen,
		listRef,
		nested,
		onNavigate,
		store,
		openOnArrowKeyDown,
		orientation,
		getParentOrientation,
		rtl,
		selectedIndexRef,
		virtual
	]);
	const reference = import_react.useMemo(() => {
		return {
			...ariaActiveDescendantProp,
			...trigger
		};
	}, [ariaActiveDescendantProp, trigger]);
	return import_react.useMemo(() => enabled ? {
		reference,
		floating,
		item,
		trigger
	} : {}, [
		enabled,
		reference,
		floating,
		trigger,
		item
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useRole.js
var componentRoleToAriaRoleMap = new Map([
	["select", "listbox"],
	["combobox", "listbox"],
	["label", false]
]);
/**
* Adds base screen reader props to the reference and floating elements for a
* given floating element `role`.
* @see https://floating-ui.com/docs/useRole
*/
function useRole(context, props = {}) {
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const defaultFloatingId = store.useState("floatingId");
	const domReference = store.useState("domReferenceElement");
	const floatingElement = store.useState("floatingElement");
	const { role = "dialog" } = props;
	const defaultReferenceId = useId();
	const referenceId = domReference?.id || defaultReferenceId;
	const floatingId = import_react.useMemo(() => getFloatingFocusElement(floatingElement)?.id || defaultFloatingId, [floatingElement, defaultFloatingId]);
	const ariaRole = componentRoleToAriaRoleMap.get(role) ?? role;
	const isNested = useFloatingParentNodeId() != null;
	const trigger = import_react.useMemo(() => {
		if (ariaRole === "tooltip" || role === "label") return EMPTY_OBJECT;
		return {
			"aria-haspopup": ariaRole === "alertdialog" ? "dialog" : ariaRole,
			"aria-expanded": "false",
			...ariaRole === "listbox" && { role: "combobox" },
			...ariaRole === "menu" && isNested && { role: "menuitem" },
			...role === "select" && { "aria-autocomplete": "none" },
			...role === "combobox" && { "aria-autocomplete": "list" }
		};
	}, [
		ariaRole,
		isNested,
		role
	]);
	const reference = import_react.useMemo(() => {
		if (ariaRole === "tooltip" || role === "label") return { [`aria-${role === "label" ? "labelledby" : "describedby"}`]: open ? floatingId : void 0 };
		return {
			...trigger,
			"aria-expanded": open ? "true" : "false",
			"aria-controls": open ? floatingId : void 0,
			...ariaRole === "menu" && { id: referenceId }
		};
	}, [
		ariaRole,
		floatingId,
		open,
		referenceId,
		role,
		trigger
	]);
	const floating = import_react.useMemo(() => {
		const floatingProps = {
			id: floatingId,
			...ariaRole && { role: ariaRole }
		};
		if (ariaRole === "tooltip" || role === "label") return floatingProps;
		return {
			...floatingProps,
			...ariaRole === "menu" && { "aria-labelledby": referenceId }
		};
	}, [
		ariaRole,
		floatingId,
		referenceId,
		role
	]);
	const item = import_react.useCallback(({ active, selected }) => {
		const commonProps = {
			role: "option",
			...active && { id: `${floatingId}-fui-option` }
		};
		switch (role) {
			case "select":
			case "combobox": return {
				...commonProps,
				"aria-selected": selected
			};
			default:
		}
		return {};
	}, [floatingId, role]);
	return import_react.useMemo(() => ({
		reference,
		floating,
		item,
		trigger
	}), [
		reference,
		floating,
		trigger,
		item
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/hooks/useTypeahead.js
/**
* Provides a matching callback that can be used to focus an item as the user
* types, often used in tandem with `useListNavigation()`.
* @see https://floating-ui.com/docs/useTypeahead
*/
function useTypeahead(context, props) {
	const store = "rootStore" in context ? context.rootStore : context;
	const dataRef = store.context.dataRef;
	const open = store.useState("open");
	const { listRef, elementsRef, activeIndex, onMatch: onMatchProp, onTypingChange, enabled = true, resetMs = 750, selectedIndex = null } = props;
	const timeout = useTimeout();
	const stringRef = import_react.useRef("");
	const prevIndexRef = import_react.useRef(selectedIndex ?? activeIndex ?? -1);
	const matchIndexRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (!open && selectedIndex !== null) return;
		timeout.clear();
		matchIndexRef.current = null;
		if (stringRef.current !== "") stringRef.current = "";
	}, [
		open,
		selectedIndex,
		timeout
	]);
	useIsoLayoutEffect(() => {
		if (open && stringRef.current === "") prevIndexRef.current = selectedIndex ?? activeIndex ?? -1;
	}, [
		open,
		selectedIndex,
		activeIndex
	]);
	const setTypingChange = useStableCallback((value) => {
		if (value) {
			if (!dataRef.current.typing) {
				dataRef.current.typing = value;
				onTypingChange?.(value);
			}
		} else if (dataRef.current.typing) {
			dataRef.current.typing = value;
			onTypingChange?.(value);
		}
	});
	const onKeyDown = useStableCallback((event) => {
		function isVisible(index) {
			const element = elementsRef?.current[index];
			return !element || isElementVisible(element);
		}
		function getMatchingIndex(list, string, startIndex = 0) {
			if (list.length === 0) return -1;
			const normalizedStartIndex = (startIndex % list.length + list.length) % list.length;
			const lowerString = string.toLocaleLowerCase();
			for (let offset = 0; offset < list.length; offset += 1) {
				const index = (normalizedStartIndex + offset) % list.length;
				if (!list[index]?.toLocaleLowerCase().startsWith(lowerString) || !isVisible(index)) continue;
				return index;
			}
			return -1;
		}
		const listContent = listRef.current;
		if (stringRef.current.length > 0 && event.key === " ") {
			stopEvent(event);
			setTypingChange(true);
		}
		if (stringRef.current.length > 0 && stringRef.current[0] !== " ") {
			if (getMatchingIndex(listContent, stringRef.current) === -1 && event.key !== " ") setTypingChange(false);
		}
		if (listContent == null || event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
		if (open && event.key !== " ") {
			stopEvent(event);
			setTypingChange(true);
		}
		const isNewSession = stringRef.current === "";
		if (isNewSession) prevIndexRef.current = selectedIndex ?? activeIndex ?? -1;
		if (listContent.every((text) => text ? text[0]?.toLocaleLowerCase() !== text[1]?.toLocaleLowerCase() : true) && stringRef.current === event.key) {
			stringRef.current = "";
			prevIndexRef.current = matchIndexRef.current;
		}
		stringRef.current += event.key;
		timeout.start(resetMs, () => {
			stringRef.current = "";
			prevIndexRef.current = matchIndexRef.current;
			setTypingChange(false);
		});
		const startIndex = ((isNewSession ? selectedIndex ?? activeIndex ?? -1 : prevIndexRef.current) ?? 0) + 1;
		const index = getMatchingIndex(listContent, stringRef.current, startIndex);
		if (index !== -1) {
			onMatchProp?.(index);
			matchIndexRef.current = index;
		} else if (event.key !== " ") {
			stringRef.current = "";
			setTypingChange(false);
		}
	});
	const onBlur = useStableCallback((event) => {
		const next = event.relatedTarget;
		const currentDomReferenceElement = store.select("domReferenceElement");
		const currentFloatingElement = store.select("floatingElement");
		const withinReference = contains(currentDomReferenceElement, next);
		const withinFloating = contains(currentFloatingElement, next);
		if (withinReference || withinFloating) return;
		timeout.clear();
		stringRef.current = "";
		prevIndexRef.current = matchIndexRef.current;
		setTypingChange(false);
	});
	const reference = import_react.useMemo(() => ({
		onKeyDown,
		onBlur
	}), [onKeyDown, onBlur]);
	const floating = import_react.useMemo(() => {
		return {
			onKeyDown,
			onBlur
		};
	}, [onKeyDown, onBlur]);
	return import_react.useMemo(() => enabled ? {
		reference,
		floating
	} : {}, [
		enabled,
		reference,
		floating
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/safePolygon.js
var CURSOR_SPEED_THRESHOLD = .1;
var CURSOR_SPEED_THRESHOLD_SQUARED = CURSOR_SPEED_THRESHOLD * CURSOR_SPEED_THRESHOLD;
var POLYGON_BUFFER = .5;
function hasIntersectingEdge(pointX, pointY, xi, yi, xj, yj) {
	return yi >= pointY !== yj >= pointY && pointX <= (xj - xi) * (pointY - yi) / (yj - yi) + xi;
}
function isPointInQuadrilateral(pointX, pointY, x1, y1, x2, y2, x3, y3, x4, y4) {
	let isInsideValue = false;
	if (hasIntersectingEdge(pointX, pointY, x1, y1, x2, y2)) isInsideValue = !isInsideValue;
	if (hasIntersectingEdge(pointX, pointY, x2, y2, x3, y3)) isInsideValue = !isInsideValue;
	if (hasIntersectingEdge(pointX, pointY, x3, y3, x4, y4)) isInsideValue = !isInsideValue;
	if (hasIntersectingEdge(pointX, pointY, x4, y4, x1, y1)) isInsideValue = !isInsideValue;
	return isInsideValue;
}
function isInsideRect(pointX, pointY, rect) {
	return pointX >= rect.x && pointX <= rect.x + rect.width && pointY >= rect.y && pointY <= rect.y + rect.height;
}
function isInsideAxisAlignedRect(pointX, pointY, x1, y1, x2, y2) {
	return pointX >= Math.min(x1, x2) && pointX <= Math.max(x1, x2) && pointY >= Math.min(y1, y2) && pointY <= Math.max(y1, y2);
}
/**
* Generates a safe polygon area that the user can traverse without closing the
* floating element once leaving the reference element.
* @see https://floating-ui.com/docs/useHover#safepolygon
*/
function safePolygon(options = {}) {
	const { blockPointerEvents = false } = options;
	const timeout = new Timeout();
	const fn = ({ x, y, placement, elements, onClose, nodeId, tree }) => {
		const side = placement?.split("-")[0];
		let hasLanded = false;
		let lastX = null;
		let lastY = null;
		let lastCursorTime = typeof performance !== "undefined" ? performance.now() : 0;
		function isCursorMovingSlowly(nextX, nextY) {
			const currentTime = performance.now();
			const elapsedTime = currentTime - lastCursorTime;
			if (lastX === null || lastY === null || elapsedTime === 0) {
				lastX = nextX;
				lastY = nextY;
				lastCursorTime = currentTime;
				return false;
			}
			const deltaX = nextX - lastX;
			const deltaY = nextY - lastY;
			const distanceSquared = deltaX * deltaX + deltaY * deltaY;
			const thresholdSquared = elapsedTime * elapsedTime * CURSOR_SPEED_THRESHOLD_SQUARED;
			lastX = nextX;
			lastY = nextY;
			lastCursorTime = currentTime;
			return distanceSquared < thresholdSquared;
		}
		function close() {
			timeout.clear();
			onClose();
		}
		return function onMouseMove(event) {
			timeout.clear();
			const domReference = elements.domReference;
			const floating = elements.floating;
			if (!domReference || !floating || side == null || x == null || y == null) return;
			const { clientX, clientY } = event;
			const target = getTarget(event);
			const isLeave = event.type === "mouseleave";
			const isOverFloatingEl = contains(floating, target);
			const isOverReferenceEl = contains(domReference, target);
			if (isOverFloatingEl) {
				hasLanded = true;
				if (!isLeave) return;
			}
			if (isOverReferenceEl) {
				hasLanded = false;
				if (!isLeave) {
					hasLanded = true;
					return;
				}
			}
			if (isLeave && isElement(event.relatedTarget) && contains(floating, event.relatedTarget)) return;
			function hasOpenChildNode() {
				return Boolean(tree && getNodeChildren(tree.nodesRef.current, nodeId).length > 0);
			}
			function closeIfNoOpenChild() {
				if (!hasOpenChildNode()) close();
			}
			if (hasOpenChildNode()) return;
			const refRect = domReference.getBoundingClientRect();
			const rect = floating.getBoundingClientRect();
			const cursorLeaveFromRight = x > rect.right - rect.width / 2;
			const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
			const isFloatingWider = rect.width > refRect.width;
			const isFloatingTaller = rect.height > refRect.height;
			const left = (isFloatingWider ? refRect : rect).left;
			const right = (isFloatingWider ? refRect : rect).right;
			const top = (isFloatingTaller ? refRect : rect).top;
			const bottom = (isFloatingTaller ? refRect : rect).bottom;
			if (side === "top" && y >= refRect.bottom - 1 || side === "bottom" && y <= refRect.top + 1 || side === "left" && x >= refRect.right - 1 || side === "right" && x <= refRect.left + 1) {
				closeIfNoOpenChild();
				return;
			}
			let isInsideTroughRect = false;
			switch (side) {
				case "top":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, refRect.top + 1, right, rect.bottom - 1);
					break;
				case "bottom":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, rect.top + 1, right, refRect.bottom - 1);
					break;
				case "left":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, rect.right - 1, bottom, refRect.left + 1, top);
					break;
				case "right":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, refRect.right - 1, bottom, rect.left + 1, top);
					break;
				default:
			}
			if (isInsideTroughRect) return;
			if (hasLanded && !isInsideRect(clientX, clientY, refRect)) {
				closeIfNoOpenChild();
				return;
			}
			if (!isLeave && isCursorMovingSlowly(clientX, clientY)) {
				closeIfNoOpenChild();
				return;
			}
			let isInsidePolygon = false;
			switch (side) {
				case "top": {
					const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointY = y + POLYGON_BUFFER + 1;
					const commonYLeft = cursorLeaveFromRight ? rect.bottom - POLYGON_BUFFER : isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top;
					const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top : rect.bottom - POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
					break;
				}
				case "bottom": {
					const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointY = y - POLYGON_BUFFER;
					const commonYLeft = cursorLeaveFromRight ? rect.top + POLYGON_BUFFER : isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom;
					const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom : rect.top + POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
					break;
				}
				case "left": {
					const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointX = x + POLYGON_BUFFER + 1;
					const commonXTop = cursorLeaveFromBottom ? rect.right - POLYGON_BUFFER : isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left;
					const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left : rect.right - POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, commonXTop, rect.top, commonXBottom, rect.bottom, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY);
					break;
				}
				case "right": {
					const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointX = x - POLYGON_BUFFER;
					const commonXTop = cursorLeaveFromBottom ? rect.left + POLYGON_BUFFER : isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right;
					const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right : rect.left + POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY, commonXTop, rect.top, commonXBottom, rect.bottom);
					break;
				}
				default:
			}
			if (!isInsidePolygon) closeIfNoOpenChild();
			else if (!hasLanded) timeout.start(40, closeIfNoOpenChild);
		};
	};
	fn.__options = {
		...options,
		blockPointerEvents
	};
	return fn;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/popup/DialogPopupCssVars.js
var DialogPopupCssVars = /* @__PURE__ */ function(DialogPopupCssVars) {
	/**
	* Indicates how many dialogs are nested within.
	* @type {number}
	*/
	DialogPopupCssVars["nestedDialogs"] = "--nested-dialogs";
	return DialogPopupCssVars;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/popup/DialogPopupDataAttributes.js
var DialogPopupDataAttributes = function(DialogPopupDataAttributes) {
	/**
	* Present when the dialog is open.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["open"] = CommonPopupDataAttributes.open] = "open";
	/**
	* Present when the dialog is closed.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["closed"] = CommonPopupDataAttributes.closed] = "closed";
	/**
	* Present when the dialog is animating in.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
	/**
	* Present when the dialog is animating out.
	*/
	DialogPopupDataAttributes[DialogPopupDataAttributes["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
	/**
	* Present when the dialog is nested within another dialog.
	*/
	DialogPopupDataAttributes["nested"] = "data-nested";
	/**
	* Present when the dialog has other open dialogs nested within it.
	*/
	DialogPopupDataAttributes["nestedDialogOpen"] = "data-nested-dialog-open";
	return DialogPopupDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/portal/DialogPortalContext.js
var DialogPortalContext = /* @__PURE__ */ import_react.createContext(void 0);
function useDialogPortalContext() {
	const value = import_react.useContext(DialogPortalContext);
	if (value === void 0) throw new Error(formatErrorMessage(26));
	return value;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/composite.js
var ARROW_UP = "ArrowUp";
var ARROW_DOWN = "ArrowDown";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
var HOME = "Home";
var PAGE_UP = "PageUp";
var PAGE_DOWN = "PageDown";
var HORIZONTAL_KEYS = new Set([ARROW_LEFT, ARROW_RIGHT]);
var HORIZONTAL_KEYS_WITH_EXTRA_KEYS = new Set([
	ARROW_LEFT,
	ARROW_RIGHT,
	HOME,
	"End"
]);
var VERTICAL_KEYS = new Set([ARROW_UP, ARROW_DOWN]);
var VERTICAL_KEYS_WITH_EXTRA_KEYS = new Set([
	ARROW_UP,
	ARROW_DOWN,
	HOME,
	"End"
]);
var ARROW_KEYS = new Set([...HORIZONTAL_KEYS, ...VERTICAL_KEYS]);
var ALL_KEYS$1 = new Set([
	...ARROW_KEYS,
	HOME,
	"End"
]);
var COMPOSITE_KEYS = new Set([
	ARROW_UP,
	ARROW_DOWN,
	ARROW_LEFT,
	ARROW_RIGHT,
	HOME,
	"End"
]);
var MODIFIER_KEYS = new Set([
	"Shift",
	"Control",
	"Alt",
	"Meta"
]);
function isInputElement(element) {
	return isHTMLElement(element) && element.tagName === "INPUT";
}
function isNativeInput(element) {
	if (isInputElement(element) && element.selectionStart != null) return true;
	if (isHTMLElement(element) && element.tagName === "TEXTAREA") return true;
	return false;
}
function scrollIntoViewIfNeeded(scrollContainer, element, direction, orientation) {
	if (!scrollContainer || !element || !element.scrollTo) return;
	let targetX = scrollContainer.scrollLeft;
	let targetY = scrollContainer.scrollTop;
	const isOverflowingX = scrollContainer.clientWidth < scrollContainer.scrollWidth;
	const isOverflowingY = scrollContainer.clientHeight < scrollContainer.scrollHeight;
	if (isOverflowingX && orientation !== "vertical") {
		const elementOffsetLeft = getOffset$1(scrollContainer, element, "left");
		const containerStyles = getStyles(scrollContainer);
		const elementStyles = getStyles(element);
		if (direction === "ltr") {
			if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
			else if (elementOffsetLeft - elementStyles.scrollMarginLeft < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
		}
		if (direction === "rtl") {
			if (elementOffsetLeft - elementStyles.scrollMarginRight < scrollContainer.scrollLeft + containerStyles.scrollPaddingLeft) targetX = elementOffsetLeft - elementStyles.scrollMarginLeft - containerStyles.scrollPaddingLeft;
			else if (elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight > scrollContainer.scrollLeft + scrollContainer.clientWidth - containerStyles.scrollPaddingRight) targetX = elementOffsetLeft + element.offsetWidth + elementStyles.scrollMarginRight - scrollContainer.clientWidth + containerStyles.scrollPaddingRight;
		}
	}
	if (isOverflowingY && orientation !== "horizontal") {
		const elementOffsetTop = getOffset$1(scrollContainer, element, "top");
		const containerStyles = getStyles(scrollContainer);
		const elementStyles = getStyles(element);
		if (elementOffsetTop - elementStyles.scrollMarginTop < scrollContainer.scrollTop + containerStyles.scrollPaddingTop) targetY = elementOffsetTop - elementStyles.scrollMarginTop - containerStyles.scrollPaddingTop;
		else if (elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom > scrollContainer.scrollTop + scrollContainer.clientHeight - containerStyles.scrollPaddingBottom) targetY = elementOffsetTop + element.offsetHeight + elementStyles.scrollMarginBottom - scrollContainer.clientHeight + containerStyles.scrollPaddingBottom;
	}
	scrollContainer.scrollTo({
		left: targetX,
		top: targetY,
		behavior: "auto"
	});
}
function getOffset$1(ancestor, element, side) {
	const propName = side === "left" ? "offsetLeft" : "offsetTop";
	let result = 0;
	while (element.offsetParent) {
		result += element[propName];
		if (element.offsetParent === ancestor) break;
		element = element.offsetParent;
	}
	return result;
}
function getStyles(element) {
	const styles = getComputedStyle(element);
	return {
		scrollMarginTop: parseFloat(styles.scrollMarginTop) || 0,
		scrollMarginRight: parseFloat(styles.scrollMarginRight) || 0,
		scrollMarginBottom: parseFloat(styles.scrollMarginBottom) || 0,
		scrollMarginLeft: parseFloat(styles.scrollMarginLeft) || 0,
		scrollPaddingTop: parseFloat(styles.scrollPaddingTop) || 0,
		scrollPaddingRight: parseFloat(styles.scrollPaddingRight) || 0,
		scrollPaddingBottom: parseFloat(styles.scrollPaddingBottom) || 0,
		scrollPaddingLeft: parseFloat(styles.scrollPaddingLeft) || 0
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/popup/DialogPopup.js
var stateAttributesMapping$9 = {
	...popupStateMapping,
	...transitionStatusMapping,
	nestedDialogOpen(value) {
		return value ? { [DialogPopupDataAttributes.nestedDialogOpen]: "" } : null;
	}
};
/**
* A container for the dialog contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogPopup = /* @__PURE__ */ import_react.forwardRef(function DialogPopup(componentProps, forwardedRef) {
	const { className, finalFocus, initialFocus, render, style, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const descriptionElementId = store.useState("descriptionElementId");
	const disablePointerDismissal = store.useState("disablePointerDismissal");
	const floatingRootContext = store.useState("floatingRootContext");
	const rootPopupProps = store.useState("popupProps");
	const modal = store.useState("modal");
	const mounted = store.useState("mounted");
	const nested = store.useState("nested");
	const nestedOpenDialogCount = store.useState("nestedOpenDialogCount");
	const open = store.useState("open");
	const openMethod = store.useState("openMethod");
	const titleElementId = store.useState("titleElementId");
	const transitionStatus = store.useState("transitionStatus");
	const role = store.useState("role");
	useDialogPortalContext();
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	function defaultInitialFocus(interactionType) {
		if (interactionType === "touch") return store.context.popupRef.current;
		return true;
	}
	const resolvedInitialFocus = initialFocus === void 0 ? defaultInitialFocus : initialFocus;
	const element = useRenderElement("div", componentProps, {
		state: {
			open,
			nested,
			transitionStatus,
			nestedDialogOpen: nestedOpenDialogCount > 0
		},
		props: [
			rootPopupProps,
			{
				"aria-labelledby": titleElementId ?? void 0,
				"aria-describedby": descriptionElementId ?? void 0,
				role,
				tabIndex: -1,
				hidden: !mounted,
				onKeyDown(event) {
					if (COMPOSITE_KEYS.has(event.key)) event.stopPropagation();
				},
				style: { [DialogPopupCssVars.nestedDialogs]: nestedOpenDialogCount }
			},
			elementProps
		],
		ref: [
			forwardedRef,
			store.context.popupRef,
			store.useStateSetter("popupElement")
		],
		stateAttributesMapping: stateAttributesMapping$9
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
		context: floatingRootContext,
		openInteractionType: openMethod,
		disabled: !mounted,
		closeOnFocusOut: !disablePointerDismissal,
		initialFocus: resolvedInitialFocus,
		returnFocus: finalFocus,
		modal: modal !== false,
		restoreFocus: "popup",
		children: element
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/inertValue.js
function inertValue(value) {
	if (isReactVersionAtLeast(19)) return value;
	return value ? "true" : void 0;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/InternalBackdrop.js
/**
* @internal
*/
var InternalBackdrop = /* @__PURE__ */ import_react.forwardRef(function InternalBackdrop(props, ref) {
	const { cutout, ...otherProps } = props;
	let clipPath;
	if (cutout) {
		const rect = cutout.getBoundingClientRect();
		clipPath = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${rect.left}px ${rect.top}px,${rect.left}px ${rect.bottom}px,${rect.right}px ${rect.bottom}px,${rect.right}px ${rect.top}px,${rect.left}px ${rect.top}px)`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		role: "presentation",
		"data-base-ui-inert": "",
		...otherProps,
		style: {
			position: "fixed",
			inset: 0,
			userSelect: "none",
			WebkitUserSelect: "none",
			clipPath
		}
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/portal/DialogPortal.js
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogPortal = /* @__PURE__ */ import_react.forwardRef(function DialogPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	const { store } = useDialogRootContext();
	const mounted = store.useState("mounted");
	const modal = store.useState("modal");
	const open = store.useState("open");
	if (!(mounted || keepMounted)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortalContext.Provider, {
		value: keepMounted,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FloatingPortal, {
			ref: forwardedRef,
			...portalProps,
			children: [mounted && modal === true && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
				ref: store.context.internalBackdropRef,
				inert: inertValue(!open)
			}), props.children]
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useOnFirstRender.js
function useOnFirstRender(fn) {
	const ref = import_react.useRef(true);
	if (ref.current) {
		ref.current = false;
		fn();
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useScrollLock.js
var originalHtmlStyles = {};
var originalBodyStyles = {};
var originalHtmlScrollBehavior = "";
function hasInsetScrollbars(referenceElement) {
	if (typeof document === "undefined") return false;
	const doc = ownerDocument(referenceElement);
	return getWindow(doc).innerWidth - doc.documentElement.clientWidth > 0;
}
function supportsStableScrollbarGutter(referenceElement) {
	if (!(typeof CSS !== "undefined" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document === "undefined") return false;
	const doc = ownerDocument(referenceElement);
	const html = doc.documentElement;
	const body = doc.body;
	const scrollContainer = isOverflowElement(html) ? html : body;
	const originalScrollContainerOverflowY = scrollContainer.style.overflowY;
	const originalHtmlStyleGutter = html.style.scrollbarGutter;
	html.style.scrollbarGutter = "stable";
	scrollContainer.style.overflowY = "scroll";
	const before = scrollContainer.offsetWidth;
	scrollContainer.style.overflowY = "hidden";
	const after = scrollContainer.offsetWidth;
	scrollContainer.style.overflowY = originalScrollContainerOverflowY;
	html.style.scrollbarGutter = originalHtmlStyleGutter;
	return before === after;
}
function preventScrollOverlayScrollbars(referenceElement) {
	const doc = ownerDocument(referenceElement);
	const html = doc.documentElement;
	const body = doc.body;
	const elementToLock = isOverflowElement(html) ? html : body;
	const originalElementToLockStyles = {
		overflowY: elementToLock.style.overflowY,
		overflowX: elementToLock.style.overflowX
	};
	Object.assign(elementToLock.style, {
		overflowY: "hidden",
		overflowX: "hidden"
	});
	return () => {
		Object.assign(elementToLock.style, originalElementToLockStyles);
	};
}
function preventScrollInsetScrollbars(referenceElement) {
	const doc = ownerDocument(referenceElement);
	const html = doc.documentElement;
	const body = doc.body;
	const win = getWindow(html);
	let scrollTop = 0;
	let scrollLeft = 0;
	let updateGutterOnly = false;
	const resizeFrame = AnimationFrame.create();
	if (isWebKit && (win.visualViewport?.scale ?? 1) !== 1) return () => {};
	function lockScroll() {
		const htmlStyles = win.getComputedStyle(html);
		const bodyStyles = win.getComputedStyle(body);
		const scrollbarGutterValue = (htmlStyles.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
		scrollTop = html.scrollTop;
		scrollLeft = html.scrollLeft;
		originalHtmlStyles = {
			scrollbarGutter: html.style.scrollbarGutter,
			overflowY: html.style.overflowY,
			overflowX: html.style.overflowX
		};
		originalHtmlScrollBehavior = html.style.scrollBehavior;
		originalBodyStyles = {
			position: body.style.position,
			height: body.style.height,
			width: body.style.width,
			boxSizing: body.style.boxSizing,
			overflowY: body.style.overflowY,
			overflowX: body.style.overflowX,
			scrollBehavior: body.style.scrollBehavior
		};
		const isScrollableY = html.scrollHeight > html.clientHeight;
		const isScrollableX = html.scrollWidth > html.clientWidth;
		const hasConstantOverflowY = htmlStyles.overflowY === "scroll" || bodyStyles.overflowY === "scroll";
		const hasConstantOverflowX = htmlStyles.overflowX === "scroll" || bodyStyles.overflowX === "scroll";
		const scrollbarWidth = Math.max(0, win.innerWidth - body.clientWidth);
		const scrollbarHeight = Math.max(0, win.innerHeight - body.clientHeight);
		const marginY = parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom);
		const marginX = parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight);
		const elementToLock = isOverflowElement(html) ? html : body;
		updateGutterOnly = supportsStableScrollbarGutter(referenceElement);
		if (updateGutterOnly) {
			html.style.scrollbarGutter = scrollbarGutterValue;
			elementToLock.style.overflowY = "hidden";
			elementToLock.style.overflowX = "hidden";
			return;
		}
		Object.assign(html.style, {
			scrollbarGutter: scrollbarGutterValue,
			overflowY: "hidden",
			overflowX: "hidden"
		});
		if (isScrollableY || hasConstantOverflowY) html.style.overflowY = "scroll";
		if (isScrollableX || hasConstantOverflowX) html.style.overflowX = "scroll";
		Object.assign(body.style, {
			position: "relative",
			height: marginY || scrollbarHeight ? `calc(100dvh - ${marginY + scrollbarHeight}px)` : "100dvh",
			width: marginX || scrollbarWidth ? `calc(100vw - ${marginX + scrollbarWidth}px)` : "100vw",
			boxSizing: "border-box",
			overflow: "hidden",
			scrollBehavior: "unset"
		});
		body.scrollTop = scrollTop;
		body.scrollLeft = scrollLeft;
		html.setAttribute("data-base-ui-scroll-locked", "");
		html.style.scrollBehavior = "unset";
	}
	function cleanup() {
		Object.assign(html.style, originalHtmlStyles);
		Object.assign(body.style, originalBodyStyles);
		if (!updateGutterOnly) {
			html.scrollTop = scrollTop;
			html.scrollLeft = scrollLeft;
			html.removeAttribute("data-base-ui-scroll-locked");
			html.style.scrollBehavior = originalHtmlScrollBehavior;
		}
	}
	function handleResize() {
		cleanup();
		resizeFrame.request(lockScroll);
	}
	lockScroll();
	const unsubscribeResize = addEventListener(win, "resize", handleResize);
	return () => {
		resizeFrame.cancel();
		cleanup();
		if (typeof win.removeEventListener === "function") unsubscribeResize();
	};
}
var ScrollLocker = class {
	lockCount = 0;
	restore = null;
	timeoutLock = Timeout.create();
	timeoutUnlock = Timeout.create();
	acquire(referenceElement) {
		this.lockCount += 1;
		if (this.lockCount === 1 && this.restore === null) this.timeoutLock.start(0, () => this.lock(referenceElement));
		return this.release;
	}
	release = () => {
		this.lockCount -= 1;
		if (this.lockCount === 0 && this.restore) this.timeoutUnlock.start(0, this.unlock);
	};
	unlock = () => {
		if (this.lockCount === 0 && this.restore) {
			this.restore?.();
			this.restore = null;
		}
	};
	lock(referenceElement) {
		if (this.lockCount === 0 || this.restore !== null) return;
		const html = ownerDocument(referenceElement).documentElement;
		const htmlOverflowY = getWindow(html).getComputedStyle(html).overflowY;
		if (htmlOverflowY === "hidden" || htmlOverflowY === "clip") {
			this.restore = NOOP;
			return;
		}
		const hasOverlayScrollbars = isIOS || !hasInsetScrollbars(referenceElement);
		this.restore = hasOverlayScrollbars ? preventScrollOverlayScrollbars(referenceElement) : preventScrollInsetScrollbars(referenceElement);
	}
};
var SCROLL_LOCKER = new ScrollLocker();
/**
* Locks the scroll of the document when enabled.
*
* @param enabled - Whether to enable the scroll lock.
* @param referenceElement - Element to use as a reference for lock calculations.
*/
function useScrollLock(enabled = true, referenceElement = null) {
	useIsoLayoutEffect(() => {
		if (!enabled) return;
		return SCROLL_LOCKER.acquire(referenceElement);
	}, [enabled, referenceElement]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useEnhancedClickHandler.js
/**
* Provides a cross-browser way to determine the type of the pointer used to click.
* Safari and Firefox do not provide the PointerEvent to the click handler (they use MouseEvent) yet.
* Additionally, this implementation detects if the click was triggered by the keyboard.
*
* @param handler The function to be called when the button is clicked. The first parameter is the original event and the second parameter is the pointer type.
*/
function useEnhancedClickHandler(handler) {
	const lastClickInteractionTypeRef = import_react.useRef("");
	const handlePointerDown = import_react.useCallback((event) => {
		if (event.defaultPrevented) return;
		lastClickInteractionTypeRef.current = event.pointerType;
		handler(event, event.pointerType);
	}, [handler]);
	return {
		onClick: import_react.useCallback((event) => {
			if (event.detail === 0) {
				handler(event, "keyboard");
				return;
			}
			if ("pointerType" in event) handler(event, event.pointerType);
			else handler(event, lastClickInteractionTypeRef.current);
			lastClickInteractionTypeRef.current = "";
		}, [handler]),
		onPointerDown: handlePointerDown
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/useValueChanged.js
function useValueChanged(value, onChange) {
	const valueRef = import_react.useRef(value);
	const onChangeCallback = useStableCallback(onChange);
	useIsoLayoutEffect(() => {
		if (valueRef.current === value) return;
		onChangeCallback(valueRef.current);
	}, [value, onChangeCallback]);
	useIsoLayoutEffect(() => {
		valueRef.current = value;
	}, [value]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/useOpenInteractionType.js
/**
* Determines the interaction type (keyboard, mouse, touch, etc.) that opened the component.
*
* @param open The open state of the component.
*/
function useOpenInteractionType(open) {
	const [openMethod, setOpenMethod] = import_react.useState(null);
	const handleTriggerClick = useStableCallback((_, interactionType) => {
		if (!open) setOpenMethod(interactionType || (isIOS ? "touch" : ""));
	});
	useValueChanged(open, (previousOpen) => {
		if (previousOpen && !open) setOpenMethod(null);
	});
	const { onClick, onPointerDown } = useEnhancedClickHandler(handleTriggerClick);
	return import_react.useMemo(() => ({
		openMethod,
		triggerProps: {
			onClick,
			onPointerDown
		}
	}), [
		openMethod,
		onClick,
		onPointerDown
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/root/useDialogRoot.js
function useDialogRoot(params) {
	const { store, parentContext, actionsRef, isDrawer } = params;
	const open = store.useState("open");
	const disablePointerDismissal = store.useState("disablePointerDismissal");
	const modal = store.useState("modal");
	const popupElement = store.useState("popupElement");
	const { openMethod, triggerProps } = useOpenInteractionType(open);
	useImplicitActiveTrigger(store);
	const { forceUnmount } = useOpenStateTransitions(open, store);
	const handleImperativeClose = import_react.useCallback(() => {
		store.setOpen(false, createChangeEventDetails(imperativeAction));
	}, [store]);
	import_react.useImperativeHandle(actionsRef, () => ({
		unmount: forceUnmount,
		close: handleImperativeClose
	}), [forceUnmount, handleImperativeClose]);
	const floatingRootContext = useSyncedFloatingRootContext({
		popupStore: store,
		onOpenChange: store.setOpen,
		treatPopupAsFloatingElement: true
	});
	const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = import_react.useState(0);
	const [ownNestedOpenDrawers, setOwnNestedOpenDrawers] = import_react.useState(0);
	const isTopmost = ownNestedOpenDialogs === 0;
	const role = useRole(floatingRootContext);
	const dismiss = useDismiss(floatingRootContext, {
		outsidePressEvent() {
			if (store.context.internalBackdropRef.current || store.context.backdropRef.current) return "intentional";
			return {
				mouse: modal === "trap-focus" ? "sloppy" : "intentional",
				touch: "sloppy"
			};
		},
		outsidePress(event) {
			if (!store.context.outsidePressEnabledRef.current) return false;
			if ("button" in event && event.button !== 0) return false;
			if ("touches" in event && event.touches.length !== 1) return false;
			const target = getTarget(event);
			if (isTopmost && !disablePointerDismissal) {
				const eventTarget = target;
				if (modal) return store.context.internalBackdropRef.current || store.context.backdropRef.current ? store.context.internalBackdropRef.current === eventTarget || store.context.backdropRef.current === eventTarget || contains(eventTarget, popupElement) && !eventTarget?.hasAttribute("data-base-ui-portal") : true;
				return true;
			}
			return false;
		},
		escapeKey: isTopmost
	});
	useScrollLock(open && modal === true, popupElement);
	const { getReferenceProps, getFloatingProps, getTriggerProps } = useInteractions([role, dismiss]);
	store.useContextCallback("onNestedDialogOpen", (dialogCount, drawerCount) => {
		setOwnNestedOpenDialogs(dialogCount);
		setOwnNestedOpenDrawers(drawerCount);
	});
	store.useContextCallback("onNestedDialogClose", () => {
		setOwnNestedOpenDialogs(0);
		setOwnNestedOpenDrawers(0);
	});
	import_react.useEffect(() => {
		if (parentContext?.onNestedDialogOpen && open) parentContext.onNestedDialogOpen(ownNestedOpenDialogs + 1, ownNestedOpenDrawers + (isDrawer ? 1 : 0));
		if (parentContext?.onNestedDialogClose && !open) parentContext.onNestedDialogClose();
		return () => {
			if (parentContext?.onNestedDialogClose && open) parentContext.onNestedDialogClose();
		};
	}, [
		isDrawer,
		open,
		ownNestedOpenDialogs,
		ownNestedOpenDrawers,
		parentContext
	]);
	const activeTriggerProps = import_react.useMemo(() => getReferenceProps(triggerProps), [getReferenceProps, triggerProps]);
	const inactiveTriggerProps = import_react.useMemo(() => getTriggerProps(triggerProps), [getTriggerProps, triggerProps]);
	const popupProps = import_react.useMemo(() => getFloatingProps(), [getFloatingProps]);
	store.useSyncedValues({
		openMethod,
		activeTriggerProps,
		inactiveTriggerProps,
		popupProps,
		floatingRootContext,
		nestedOpenDialogCount: ownNestedOpenDialogs,
		nestedOpenDrawerCount: ownNestedOpenDrawers
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/store/DialogStore.js
var selectors$5 = {
	...popupStoreSelectors,
	modal: createSelector((state) => state.modal),
	nested: createSelector((state) => state.nested),
	nestedOpenDialogCount: createSelector((state) => state.nestedOpenDialogCount),
	nestedOpenDrawerCount: createSelector((state) => state.nestedOpenDrawerCount),
	disablePointerDismissal: createSelector((state) => state.disablePointerDismissal),
	openMethod: createSelector((state) => state.openMethod),
	descriptionElementId: createSelector((state) => state.descriptionElementId),
	titleElementId: createSelector((state) => state.titleElementId),
	viewportElement: createSelector((state) => state.viewportElement),
	role: createSelector((state) => state.role)
};
var DialogStore = class DialogStore extends ReactStore {
	constructor(initialState) {
		super(createInitialState$4(initialState), {
			popupRef: /* @__PURE__ */ import_react.createRef(),
			backdropRef: /* @__PURE__ */ import_react.createRef(),
			internalBackdropRef: /* @__PURE__ */ import_react.createRef(),
			outsidePressEnabledRef: { current: true },
			triggerElements: new PopupTriggerMap(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0
		}, selectors$5);
	}
	setOpen = (nextOpen, eventDetails) => {
		eventDetails.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", true);
		};
		if (!nextOpen && eventDetails.trigger == null && this.state.activeTriggerId != null) eventDetails.trigger = this.state.activeTriggerElement ?? void 0;
		this.context.onOpenChange?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
		const updatedState = { open: nextOpen };
		const newTriggerId = eventDetails.trigger?.id ?? null;
		if (newTriggerId || nextOpen) {
			updatedState.activeTriggerId = newTriggerId;
			updatedState.activeTriggerElement = eventDetails.trigger ?? null;
		}
		this.update(updatedState);
	};
	static useStore(externalStore, initialState) {
		const internalStore = useRefWithInit(() => {
			return new DialogStore(initialState);
		}).current;
		return externalStore ?? internalStore;
	}
};
function createInitialState$4(initialState = {}) {
	return {
		...createInitialPopupStoreState(),
		modal: true,
		disablePointerDismissal: false,
		popupElement: null,
		viewportElement: null,
		descriptionElementId: void 0,
		titleElementId: void 0,
		openMethod: null,
		nested: false,
		nestedOpenDialogCount: 0,
		nestedOpenDrawerCount: 0,
		role: "dialog",
		...initialState
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/root/DialogRoot.js
var IsDrawerContext = /* @__PURE__ */ import_react.createContext(false);
function DialogRoot(props) {
	const { children, open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, disablePointerDismissal = false, modal = true, actionsRef, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null } = props;
	const parentDialogRootContext = useDialogRootContext(true);
	const isDrawer = import_react.useContext(IsDrawerContext);
	const nested = Boolean(parentDialogRootContext);
	const store = DialogStore.useStore(handle?.store, {
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp,
		modal,
		disablePointerDismissal,
		nested
	});
	useOnFirstRender(() => {
		if (openProp === void 0 && store.state.open === false && defaultOpen === true) store.update({
			open: true,
			activeTriggerId: defaultTriggerIdProp
		});
	});
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	store.useSyncedValues({
		disablePointerDismissal,
		nested,
		modal
	});
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const payload = store.useState("payload");
	useDialogRoot({
		store,
		actionsRef,
		parentContext: parentDialogRootContext?.store.context,
		isDrawer,
		onOpenChange,
		triggerIdProp
	});
	const contextValue = import_react.useMemo(() => ({ store }), [store]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsDrawerContext.Provider, {
		value: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRootContext.Provider, {
			value: contextValue,
			children: typeof children === "function" ? children({ payload }) : children
		})
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/title/DialogTitle.js
/**
* A heading that labels the dialog.
* Renders an `<h2>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogTitle = /* @__PURE__ */ import_react.forwardRef(function DialogTitle(componentProps, forwardedRef) {
	const { render, className, style, id: idProp, ...elementProps } = componentProps;
	const { store } = useDialogRootContext();
	const id = useBaseUiId(idProp);
	store.useSyncedValueWithCleanup("titleElementId", id);
	return useRenderElement("h2", componentProps, {
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/dialog/trigger/DialogTrigger.js
/**
* A button that opens the dialog.
* Renders a `<button>` element.
*
* Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
*/
var DialogTrigger = /* @__PURE__ */ import_react.forwardRef(function DialogTrigger(componentProps, forwardedRef) {
	const { render, className, disabled = false, nativeButton = true, id: idProp, payload, handle, style, ...elementProps } = componentProps;
	const dialogRootContext = useDialogRootContext(true);
	const store = handle?.store ?? dialogRootContext?.store;
	if (!store) throw new Error(formatErrorMessage(79));
	const thisTriggerId = useBaseUiId(idProp);
	const floatingContext = store.useState("floatingRootContext");
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const triggerElementRef = import_react.useRef(null);
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, { payload });
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const localInteractionProps = useInteractions([useClick(floatingContext, { enabled: floatingContext != null })]);
	const state = {
		disabled,
		open: isOpenedByThisTrigger
	};
	const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
	return useRenderElement("button", componentProps, {
		state,
		ref: [
			buttonRef,
			forwardedRef,
			registerTrigger,
			triggerElementRef
		],
		props: [
			localInteractionProps.getReferenceProps(),
			rootTriggerProps,
			{
				[CLICK_TRIGGER_IDENTIFIER]: "",
				id: thisTriggerId
			},
			elementProps,
			getButtonProps
		],
		stateAttributesMapping: triggerOpenStateMapping$1
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/field/control/FieldControlDataAttributes.js
var FieldControlDataAttributes = /* @__PURE__ */ function(FieldControlDataAttributes) {
	/**
	* Present when the field is disabled.
	*/
	FieldControlDataAttributes["disabled"] = "data-disabled";
	/**
	* Present when the field is in a valid state.
	*/
	FieldControlDataAttributes["valid"] = "data-valid";
	/**
	* Present when the field is in an invalid state.
	*/
	FieldControlDataAttributes["invalid"] = "data-invalid";
	/**
	* Present when the field has been touched.
	*/
	FieldControlDataAttributes["touched"] = "data-touched";
	/**
	* Present when the field's value has changed.
	*/
	FieldControlDataAttributes["dirty"] = "data-dirty";
	/**
	* Present when the field is filled.
	*/
	FieldControlDataAttributes["filled"] = "data-filled";
	/**
	* Present when the field control is focused.
	*/
	FieldControlDataAttributes["focused"] = "data-focused";
	return FieldControlDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/field-constants/constants.js
var DEFAULT_VALIDITY_STATE = {
	badInput: false,
	customError: false,
	patternMismatch: false,
	rangeOverflow: false,
	rangeUnderflow: false,
	stepMismatch: false,
	tooLong: false,
	tooShort: false,
	typeMismatch: false,
	valid: null,
	valueMissing: false
};
var DEFAULT_FIELD_STATE_ATTRIBUTES = {
	valid: null,
	touched: false,
	dirty: false,
	filled: false,
	focused: false
};
var DEFAULT_FIELD_ROOT_STATE = {
	disabled: false,
	...DEFAULT_FIELD_STATE_ATTRIBUTES
};
var fieldValidityMapping = { valid(value) {
	if (value === null) return null;
	if (value) return { [FieldControlDataAttributes.valid]: "" };
	return { [FieldControlDataAttributes.invalid]: "" };
} };
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/field-root-context/FieldRootContext.js
var FieldRootContext = /* @__PURE__ */ import_react.createContext({
	invalid: void 0,
	name: void 0,
	validityData: {
		state: DEFAULT_VALIDITY_STATE,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: NOOP,
	disabled: void 0,
	touched: DEFAULT_FIELD_STATE_ATTRIBUTES.touched,
	setTouched: NOOP,
	dirty: DEFAULT_FIELD_STATE_ATTRIBUTES.dirty,
	setDirty: NOOP,
	filled: DEFAULT_FIELD_STATE_ATTRIBUTES.filled,
	setFilled: NOOP,
	focused: DEFAULT_FIELD_STATE_ATTRIBUTES.focused,
	setFocused: NOOP,
	validate: () => null,
	validationMode: "onSubmit",
	validationDebounceTime: 0,
	shouldValidateOnChange: () => false,
	state: DEFAULT_FIELD_ROOT_STATE,
	markedDirtyRef: { current: false },
	registerFieldControl: NOOP,
	validation: {
		getValidationProps: (props = EMPTY_OBJECT) => props,
		getInputValidationProps: (props = EMPTY_OBJECT) => props,
		inputRef: { current: null },
		commit: async () => {}
	}
});
function useFieldRootContext(optional = true) {
	const context = import_react.useContext(FieldRootContext);
	if (context.setValidityData === NOOP && !optional) throw new Error(formatErrorMessage(28));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/form-context/FormContext.js
var FormContext = /* @__PURE__ */ import_react.createContext({
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: NOOP,
	validationMode: "onSubmit",
	submitAttemptedRef: { current: false }
});
function useFormContext() {
	return import_react.useContext(FormContext);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/labelable-provider/LabelableContext.js
/**
* A context for providing [labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)\
* with an accessible name (label) and description.
*/
var LabelableContext = /* @__PURE__ */ import_react.createContext({
	controlId: void 0,
	registerControlId: NOOP,
	labelId: void 0,
	setLabelId: NOOP,
	messageIds: [],
	setMessageIds: NOOP,
	getDescriptionProps: (externalProps) => externalProps
});
function useLabelableContext() {
	return import_react.useContext(LabelableContext);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/labelable-provider/useAriaLabelledBy.js
/**
* @internal
*/
function useAriaLabelledBy(explicitAriaLabelledBy, labelId, labelSourceRef, enableFallback = true, labelSourceId) {
	const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = import_react.useState();
	const generatedLabelId = useBaseUiId(labelSourceId ? `${labelSourceId}-label` : void 0);
	const ariaLabelledBy = explicitAriaLabelledBy ?? labelId ?? fallbackAriaLabelledBy;
	useIsoLayoutEffect(() => {
		const nextAriaLabelledBy = explicitAriaLabelledBy || labelId || !enableFallback ? void 0 : getAriaLabelledBy(labelSourceRef.current, generatedLabelId);
		if (fallbackAriaLabelledBy !== nextAriaLabelledBy) setFallbackAriaLabelledBy(nextAriaLabelledBy);
	});
	return ariaLabelledBy;
}
function getAriaLabelledBy(labelSource, generatedLabelId) {
	const label = findAssociatedLabel(labelSource);
	if (!label) return;
	if (!label.id && generatedLabelId) label.id = generatedLabelId;
	return label.id || void 0;
}
function findAssociatedLabel(labelSource) {
	if (!labelSource) return;
	const parent = labelSource.parentElement;
	if (parent && parent.tagName === "LABEL") return parent;
	const controlId = labelSource.id;
	if (controlId) {
		const nextSibling = labelSource.nextElementSibling;
		if (nextSibling && nextSibling.htmlFor === controlId) return nextSibling;
	}
	const labels = labelSource.labels;
	return labels && labels[0];
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/labelable-provider/useLabelableId.js
function useLabelableId(params = {}) {
	const { id, implicit = false, controlRef } = params;
	const { controlId, registerControlId } = useLabelableContext();
	const defaultId = useBaseUiId(id);
	const controlIdForEffect = implicit ? controlId : void 0;
	const controlSourceRef = useRefWithInit(() => Symbol("labelable-control"));
	const hasRegisteredRef = import_react.useRef(false);
	const hadExplicitIdRef = import_react.useRef(id != null);
	const unregisterControlId = useStableCallback(() => {
		if (!hasRegisteredRef.current || registerControlId === NOOP) return;
		hasRegisteredRef.current = false;
		registerControlId(controlSourceRef.current, void 0);
	});
	useIsoLayoutEffect(() => {
		if (registerControlId === NOOP) return;
		let nextId;
		if (implicit) {
			const elem = controlRef?.current;
			if (isElement(elem) && elem.closest("label") != null) nextId = id ?? null;
			else nextId = controlIdForEffect ?? defaultId;
		} else if (id != null) {
			hadExplicitIdRef.current = true;
			nextId = id;
		} else if (hadExplicitIdRef.current) nextId = defaultId;
		else {
			unregisterControlId();
			return;
		}
		if (nextId === void 0) {
			unregisterControlId();
			return;
		}
		hasRegisteredRef.current = true;
		registerControlId(controlSourceRef.current, nextId);
	}, [
		id,
		controlRef,
		controlIdForEffect,
		registerControlId,
		implicit,
		defaultId,
		controlSourceRef,
		unregisterControlId
	]);
	import_react.useEffect(() => {
		return unregisterControlId;
	}, [unregisterControlId]);
	return controlId ?? defaultId;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/useControlled.js
function useControlled({ controlled, default: defaultProp, name, state = "value" }) {
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(defaultProp);
	return [isControlled ? controlled : valueState, import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, [])];
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/field-register-control/useRegisterFieldControl.js
function useRegisterFieldControl(controlRef, params) {
	const { enabled = true, getValue, id, value } = params;
	const { registerFieldControl } = useFieldRootContext();
	const sourceRef = import_react.useRef(null);
	if (!sourceRef.current) sourceRef.current = Symbol();
	useIsoLayoutEffect(() => {
		const source = sourceRef.current;
		if (!source || !enabled) return;
		registerFieldControl(source, {
			controlRef,
			getValue,
			id,
			value
		});
		return () => {
			registerFieldControl(source, void 0);
		};
	}, [
		controlRef,
		enabled,
		getValue,
		id,
		registerFieldControl,
		value
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/field/control/FieldControl.js
/**
* The form control to label and validate.
* Renders an `<input>` element.
*
* You can omit this part and use any Base UI input component instead. For example,
* [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
* or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
*
* Documentation: [Base UI Field](https://base-ui.com/react/components/field)
*/
var FieldControl = /* @__PURE__ */ import_react.forwardRef(function FieldControl(componentProps, forwardedRef) {
	const { render, className, id: idProp, name: nameProp, value: valueProp, disabled: disabledProp = false, onValueChange, defaultValue, autoFocus = false, style, ...elementProps } = componentProps;
	const { state: fieldState, name: fieldName, disabled: fieldDisabled, setTouched, setDirty, validityData, setFocused, setFilled, validationMode, validation } = useFieldRootContext();
	const disabled = fieldDisabled || disabledProp;
	const name = fieldName ?? nameProp;
	const state = {
		...fieldState,
		disabled
	};
	const { labelId } = useLabelableContext();
	const id = useLabelableId({ id: idProp });
	useIsoLayoutEffect(() => {
		const hasExternalValue = valueProp != null;
		if (validation.inputRef.current?.value || hasExternalValue && valueProp !== "") setFilled(true);
		else if (hasExternalValue && valueProp === "") setFilled(false);
	}, [
		validation.inputRef,
		setFilled,
		valueProp
	]);
	const inputRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (autoFocus && inputRef.current === activeElement(ownerDocument(inputRef.current))) setFocused(true);
	}, [autoFocus, setFocused]);
	const [valueUnwrapped] = useControlled({
		controlled: valueProp,
		default: defaultValue,
		name: "FieldControl",
		state: "value"
	});
	const isControlled = valueProp !== void 0;
	const value = isControlled ? valueUnwrapped : void 0;
	const getFieldValue = useStableCallback(() => validation.inputRef.current?.value);
	useRegisterFieldControl(validation.inputRef, {
		id,
		value,
		getValue: getFieldValue
	});
	return useRenderElement("input", componentProps, {
		ref: [forwardedRef, inputRef],
		state,
		props: [
			{
				id,
				disabled,
				name,
				ref: validation.inputRef,
				"aria-labelledby": labelId,
				autoFocus,
				...isControlled ? { value } : { defaultValue },
				onChange(event) {
					const inputValue = event.currentTarget.value;
					onValueChange?.(inputValue, createChangeEventDetails(none, event.nativeEvent));
					setDirty(inputValue !== validityData.initialValue);
					setFilled(inputValue !== "");
				},
				onFocus() {
					setFocused(true);
				},
				onBlur(event) {
					setTouched(true);
					setFocused(false);
					if (validationMode === "onBlur") validation.commit(event.currentTarget.value);
				},
				onKeyDown(event) {
					if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
						setTouched(true);
						validation.commit(event.currentTarget.value);
					}
				}
			},
			validation.getInputValidationProps(),
			elementProps
		],
		stateAttributesMapping: fieldValidityMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/input/Input.js
/**
* A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
* Renders an `<input>` element.
*
* Documentation: [Base UI Input](https://base-ui.com/react/components/input)
*/
var Input = /* @__PURE__ */ import_react.forwardRef(function Input(props, forwardedRef) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
		ref: forwardedRef,
		...props
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/list/CompositeListContext.js
var CompositeListContext = /* @__PURE__ */ import_react.createContext({
	register: () => {},
	unregister: () => {},
	subscribeMapChange: () => {
		return () => {};
	},
	elementsRef: { current: [] },
	nextIndexRef: { current: 0 }
});
function useCompositeListContext() {
	return import_react.useContext(CompositeListContext);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/list/CompositeList.js
/**
* Provides context for a list of items in a composite component.
* @internal
*/
function CompositeList(props) {
	const { children, elementsRef, labelsRef, onMapChange: onMapChangeProp } = props;
	const onMapChange = useStableCallback(onMapChangeProp);
	const nextIndexRef = import_react.useRef(0);
	const listeners = useRefWithInit(createListeners).current;
	const map = useRefWithInit(createMap).current;
	const [mapTick, setMapTick] = import_react.useState(0);
	const lastTickRef = import_react.useRef(mapTick);
	const register = useStableCallback((node, metadata) => {
		map.set(node, metadata ?? null);
		lastTickRef.current += 1;
		setMapTick(lastTickRef.current);
	});
	const unregister = useStableCallback((node) => {
		map.delete(node);
		lastTickRef.current += 1;
		setMapTick(lastTickRef.current);
	});
	const sortedMap = import_react.useMemo(() => {
		const newMap = /* @__PURE__ */ new Map();
		Array.from(map.keys()).filter((node) => node.isConnected).sort(sortByDocumentPosition).forEach((node, index) => {
			const metadata = map.get(node) ?? {};
			newMap.set(node, {
				...metadata,
				index
			});
		});
		return newMap;
	}, [map, mapTick]);
	useIsoLayoutEffect(() => {
		if (typeof MutationObserver !== "function" || sortedMap.size === 0) return;
		const mutationObserver = new MutationObserver((entries) => {
			const diff = /* @__PURE__ */ new Set();
			const updateDiff = (node) => diff.has(node) ? diff.delete(node) : diff.add(node);
			entries.forEach((entry) => {
				entry.removedNodes.forEach(updateDiff);
				entry.addedNodes.forEach(updateDiff);
			});
			if (diff.size === 0) {
				lastTickRef.current += 1;
				setMapTick(lastTickRef.current);
			}
		});
		sortedMap.forEach((_, node) => {
			if (node.parentElement) mutationObserver.observe(node.parentElement, { childList: true });
		});
		return () => {
			mutationObserver.disconnect();
		};
	}, [sortedMap]);
	useIsoLayoutEffect(() => {
		if (lastTickRef.current === mapTick) {
			if (elementsRef.current.length !== sortedMap.size) elementsRef.current.length = sortedMap.size;
			if (labelsRef && labelsRef.current.length !== sortedMap.size) labelsRef.current.length = sortedMap.size;
			nextIndexRef.current = sortedMap.size;
		}
		onMapChange(sortedMap);
	}, [
		onMapChange,
		sortedMap,
		elementsRef,
		labelsRef,
		mapTick
	]);
	useIsoLayoutEffect(() => {
		return () => {
			elementsRef.current = [];
		};
	}, [elementsRef]);
	useIsoLayoutEffect(() => {
		return () => {
			if (labelsRef) labelsRef.current = [];
		};
	}, [labelsRef]);
	const subscribeMapChange = useStableCallback((fn) => {
		listeners.add(fn);
		return () => {
			listeners.delete(fn);
		};
	});
	useIsoLayoutEffect(() => {
		listeners.forEach((l) => l(sortedMap));
	}, [listeners, sortedMap]);
	const contextValue = import_react.useMemo(() => ({
		register,
		unregister,
		subscribeMapChange,
		elementsRef,
		labelsRef,
		nextIndexRef
	}), [
		register,
		unregister,
		subscribeMapChange,
		elementsRef,
		labelsRef,
		nextIndexRef
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeListContext.Provider, {
		value: contextValue,
		children
	});
}
function createMap() {
	return /* @__PURE__ */ new Map();
}
function createListeners() {
	return /* @__PURE__ */ new Set();
}
function sortByDocumentPosition(a, b) {
	const position = a.compareDocumentPosition(b);
	if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) return -1;
	if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) return 1;
	return 0;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/direction-context/DirectionContext.js
/**
* @internal
*/
var DirectionContext = /* @__PURE__ */ import_react.createContext(void 0);
function useDirection() {
	return import_react.useContext(DirectionContext)?.direction ?? "ltr";
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/root/AccordionRootContext.js
var AccordionRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useAccordionRootContext() {
	const context = import_react.useContext(AccordionRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(10));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/root/AccordionRoot.js
var rootStateAttributesMapping = { value: () => null };
/**
* Groups all parts of the accordion.
* Renders a `<div>` element.
*
* Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
*/
var AccordionRoot = /* @__PURE__ */ import_react.forwardRef(function AccordionRoot(componentProps, forwardedRef) {
	const { render, className, disabled = false, hiddenUntilFound: hiddenUntilFoundProp, keepMounted: keepMountedProp, loopFocus = true, onValueChange: onValueChangeProp, multiple = false, orientation = "vertical", value: valueProp, defaultValue: defaultValueProp, style, ...elementProps } = componentProps;
	const direction = useDirection();
	const defaultValue = import_react.useMemo(() => {
		if (valueProp === void 0) return defaultValueProp ?? [];
	}, [valueProp, defaultValueProp]);
	const onValueChange = useStableCallback(onValueChangeProp);
	const accordionItemRefs = import_react.useRef([]);
	const [value, setValue] = useControlled({
		controlled: valueProp,
		default: defaultValue,
		name: "Accordion",
		state: "value"
	});
	const handleValueChange = useStableCallback((newValue, nextOpen) => {
		const details = createChangeEventDetails(none);
		if (!multiple) {
			const nextValue = value[0] === newValue ? [] : [newValue];
			onValueChange(nextValue, details);
			if (details.isCanceled) return;
			setValue(nextValue);
		} else if (nextOpen) {
			const nextOpenValues = value.slice();
			nextOpenValues.push(newValue);
			onValueChange(nextOpenValues, details);
			if (details.isCanceled) return;
			setValue(nextOpenValues);
		} else {
			const nextOpenValues = value.filter((v) => v !== newValue);
			onValueChange(nextOpenValues, details);
			if (details.isCanceled) return;
			setValue(nextOpenValues);
		}
	});
	const state = import_react.useMemo(() => ({
		value,
		disabled,
		orientation
	}), [
		value,
		disabled,
		orientation
	]);
	const contextValue = import_react.useMemo(() => ({
		accordionItemRefs,
		direction,
		disabled,
		handleValueChange,
		hiddenUntilFound: hiddenUntilFoundProp ?? false,
		keepMounted: keepMountedProp ?? false,
		loopFocus,
		orientation,
		state,
		value
	}), [
		direction,
		disabled,
		handleValueChange,
		hiddenUntilFoundProp,
		keepMountedProp,
		loopFocus,
		orientation,
		state,
		value
	]);
	const element = useRenderElement("div", componentProps, {
		state,
		ref: forwardedRef,
		props: [{
			dir: direction,
			role: "region"
		}, elementProps],
		stateAttributesMapping: rootStateAttributesMapping
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionRootContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeList, {
			elementsRef: accordionItemRefs,
			children: element
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/collapsible/root/useCollapsibleRoot.js
function useCollapsibleRoot(parameters) {
	const { open: openParam, defaultOpen, onOpenChange, disabled } = parameters;
	const isControlled = openParam !== void 0;
	const [open, setOpen] = useControlled({
		controlled: openParam,
		default: defaultOpen,
		name: "Collapsible",
		state: "open"
	});
	const { mounted, setMounted, transitionStatus } = useTransitionStatus(open, true, true);
	const [visible, setVisible] = import_react.useState(open);
	const [{ height, width }, setDimensions] = import_react.useState({
		height: void 0,
		width: void 0
	});
	const defaultPanelId = useBaseUiId();
	const [panelIdState, setPanelIdState] = import_react.useState();
	const panelId = panelIdState ?? defaultPanelId;
	const [hiddenUntilFound, setHiddenUntilFound] = import_react.useState(false);
	const [keepMounted, setKeepMounted] = import_react.useState(false);
	const abortControllerRef = import_react.useRef(null);
	const animationTypeRef = import_react.useRef(null);
	const transitionDimensionRef = import_react.useRef(null);
	const panelRef = import_react.useRef(null);
	const runOnceAnimationsFinish = useAnimationsFinished(panelRef, false);
	const handleTrigger = useStableCallback((event) => {
		const nextOpen = !open;
		const eventDetails = createChangeEventDetails(triggerPress, event.nativeEvent);
		onOpenChange(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		const panel = panelRef.current;
		if (animationTypeRef.current === "css-animation" && panel != null) panel.style.removeProperty("animation-name");
		if (!hiddenUntilFound && !keepMounted) {
			if (animationTypeRef.current != null && animationTypeRef.current !== "css-animation") {
				if (!mounted && nextOpen) setMounted(true);
			}
			if (animationTypeRef.current === "css-animation") {
				if (!visible && nextOpen) setVisible(true);
				if (!mounted && nextOpen) setMounted(true);
			}
		}
		setOpen(nextOpen);
		if (animationTypeRef.current === "none" && mounted && !nextOpen) setMounted(false);
	});
	useIsoLayoutEffect(() => {
		/**
		* Close immediately in controlled mode when no CSS animations or
		* transitions are applied. `keepMounted` only keeps the element in the
		* DOM; `mounted` must still become `false` so the panel regains `hidden`.
		*/
		if (isControlled && animationTypeRef.current === "none" && !open) setMounted(false);
	}, [
		isControlled,
		open,
		openParam,
		setMounted
	]);
	return import_react.useMemo(() => ({
		abortControllerRef,
		animationTypeRef,
		disabled,
		handleTrigger,
		height,
		mounted,
		open,
		panelId,
		panelRef,
		runOnceAnimationsFinish,
		setDimensions,
		setHiddenUntilFound,
		setKeepMounted,
		setMounted,
		setOpen,
		setPanelIdState,
		setVisible,
		transitionDimensionRef,
		transitionStatus,
		visible,
		width
	}), [
		abortControllerRef,
		animationTypeRef,
		disabled,
		handleTrigger,
		height,
		mounted,
		open,
		panelId,
		panelRef,
		runOnceAnimationsFinish,
		setDimensions,
		setHiddenUntilFound,
		setKeepMounted,
		setMounted,
		setOpen,
		setVisible,
		transitionDimensionRef,
		transitionStatus,
		visible,
		width
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/collapsible/root/CollapsibleRootContext.js
var CollapsibleRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useCollapsibleRootContext() {
	const context = import_react.useContext(CollapsibleRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(15));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/list/useCompositeListItem.js
var IndexGuessBehavior = /* @__PURE__ */ function(IndexGuessBehavior) {
	IndexGuessBehavior[IndexGuessBehavior["None"] = 0] = "None";
	IndexGuessBehavior[IndexGuessBehavior["GuessFromOrder"] = 1] = "GuessFromOrder";
	return IndexGuessBehavior;
}({});
/**
* Used to register a list item and its index (DOM position) in the `CompositeList`.
*/
function useCompositeListItem(params = {}) {
	const { label, metadata, textRef, indexGuessBehavior, index: externalIndex } = params;
	const { register, unregister, subscribeMapChange, elementsRef, labelsRef, nextIndexRef } = useCompositeListContext();
	const indexRef = import_react.useRef(-1);
	const [index, setIndex] = import_react.useState(externalIndex ?? (indexGuessBehavior === IndexGuessBehavior.GuessFromOrder ? () => {
		if (indexRef.current === -1) {
			const newIndex = nextIndexRef.current;
			nextIndexRef.current += 1;
			indexRef.current = newIndex;
		}
		return indexRef.current;
	} : -1));
	const componentRef = import_react.useRef(null);
	const ref = import_react.useCallback((node) => {
		componentRef.current = node;
		if (index !== -1 && node !== null) {
			elementsRef.current[index] = node;
			if (labelsRef) {
				const isLabelDefined = label !== void 0;
				labelsRef.current[index] = isLabelDefined ? label : textRef?.current?.textContent ?? node.textContent;
			}
		}
	}, [
		index,
		elementsRef,
		labelsRef,
		label,
		textRef
	]);
	useIsoLayoutEffect(() => {
		if (externalIndex != null) return;
		const node = componentRef.current;
		if (node) {
			register(node, metadata);
			return () => {
				unregister(node);
			};
		}
	}, [
		externalIndex,
		register,
		unregister,
		metadata
	]);
	useIsoLayoutEffect(() => {
		if (externalIndex != null) return;
		return subscribeMapChange((map) => {
			const i = componentRef.current ? map.get(componentRef.current)?.index : null;
			if (i != null) setIndex(i);
		});
	}, [
		externalIndex,
		subscribeMapChange,
		setIndex
	]);
	return import_react.useMemo(() => ({
		ref,
		index
	}), [index, ref]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/item/AccordionItemContext.js
var AccordionItemContext = /* @__PURE__ */ import_react.createContext(void 0);
function useAccordionItemContext() {
	const context = import_react.useContext(AccordionItemContext);
	if (context === void 0) throw new Error(formatErrorMessage(9));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/collapsible/panel/CollapsiblePanelDataAttributes.js
var CollapsiblePanelDataAttributes = function(CollapsiblePanelDataAttributes) {
	/**
	* Present when the collapsible panel is open.
	*/
	CollapsiblePanelDataAttributes["open"] = "data-open";
	/**
	* Present when the collapsible panel is closed.
	*/
	CollapsiblePanelDataAttributes["closed"] = "data-closed";
	/**
	* Present when the panel is animating in.
	*/
	CollapsiblePanelDataAttributes[CollapsiblePanelDataAttributes["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
	/**
	* Present when the panel is animating out.
	*/
	CollapsiblePanelDataAttributes[CollapsiblePanelDataAttributes["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
	return CollapsiblePanelDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/collapsible/trigger/CollapsibleTriggerDataAttributes.js
var CollapsibleTriggerDataAttributes = /* @__PURE__ */ function(CollapsibleTriggerDataAttributes) {
	/**
	* Present when the collapsible panel is open.
	*/
	CollapsibleTriggerDataAttributes["panelOpen"] = "data-panel-open";
	return CollapsibleTriggerDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/collapsibleOpenStateMapping.js
var PANEL_OPEN_HOOK = { [CollapsiblePanelDataAttributes.open]: "" };
var PANEL_CLOSED_HOOK = { [CollapsiblePanelDataAttributes.closed]: "" };
var triggerOpenStateMapping = { open(value) {
	if (value) return { [CollapsibleTriggerDataAttributes.panelOpen]: "" };
	return null;
} };
var collapsibleOpenStateMapping = { open(value) {
	if (value) return PANEL_OPEN_HOOK;
	return PANEL_CLOSED_HOOK;
} };
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/item/AccordionItemDataAttributes.js
var AccordionItemDataAttributes = /* @__PURE__ */ function(AccordionItemDataAttributes) {
	/**
	* Indicates the index of the accordion item.
	* @type {number}
	*/
	AccordionItemDataAttributes["index"] = "data-index";
	/**
	* Present when the accordion item is disabled.
	*/
	AccordionItemDataAttributes["disabled"] = "data-disabled";
	/**
	* Present when the accordion item is open.
	*/
	AccordionItemDataAttributes["open"] = "data-open";
	return AccordionItemDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/item/stateAttributesMapping.js
var accordionStateAttributesMapping = {
	...collapsibleOpenStateMapping,
	index: (value) => {
		return Number.isInteger(value) ? { [AccordionItemDataAttributes.index]: String(value) } : null;
	},
	...transitionStatusMapping,
	value: () => null
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/item/AccordionItem.js
/**
* Groups an accordion header with the corresponding panel.
* Renders a `<div>` element.
*
* Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
*/
var AccordionItem = /* @__PURE__ */ import_react.forwardRef(function AccordionItem(componentProps, forwardedRef) {
	const { className, disabled: disabledProp = false, onOpenChange: onOpenChangeProp, render, value: valueProp, style, ...elementProps } = componentProps;
	const { ref: listItemRef, index } = useCompositeListItem();
	const mergedRef = useMergedRefs(forwardedRef, listItemRef);
	const { disabled: contextDisabled, handleValueChange, state: rootState, value: openValues } = useAccordionRootContext();
	const fallbackValue = useBaseUiId();
	const value = valueProp ?? fallbackValue;
	const disabled = disabledProp || contextDisabled;
	const isOpen = import_react.useMemo(() => {
		if (!openValues) return false;
		for (let i = 0; i < openValues.length; i += 1) if (openValues[i] === value) return true;
		return false;
	}, [openValues, value]);
	const onOpenChange = useStableCallback((nextOpen, eventDetails) => {
		onOpenChangeProp?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		handleValueChange(value, nextOpen);
	});
	const collapsible = useCollapsibleRoot({
		open: isOpen,
		onOpenChange,
		disabled
	});
	const collapsibleState = import_react.useMemo(() => ({
		open: collapsible.open,
		disabled: collapsible.disabled,
		hidden: !collapsible.mounted,
		transitionStatus: collapsible.transitionStatus
	}), [
		collapsible.open,
		collapsible.disabled,
		collapsible.mounted,
		collapsible.transitionStatus
	]);
	const collapsibleContext = import_react.useMemo(() => ({
		...collapsible,
		onOpenChange,
		state: collapsibleState
	}), [
		collapsible,
		collapsibleState,
		onOpenChange
	]);
	const state = import_react.useMemo(() => ({
		...rootState,
		index,
		disabled,
		open: isOpen
	}), [
		disabled,
		index,
		isOpen,
		rootState
	]);
	const [triggerId, setTriggerId] = import_react.useState(useBaseUiId());
	const accordionItemContext = import_react.useMemo(() => ({
		open: isOpen,
		state,
		setTriggerId,
		triggerId
	}), [
		isOpen,
		state,
		setTriggerId,
		triggerId
	]);
	const element = useRenderElement("div", componentProps, {
		state,
		ref: mergedRef,
		props: elementProps,
		stateAttributesMapping: accordionStateAttributesMapping
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleRootContext.Provider, {
		value: collapsibleContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItemContext.Provider, {
			value: accordionItemContext,
			children: element
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/header/AccordionHeader.js
/**
* A heading that labels the corresponding panel.
* Renders an `<h3>` element.
*
* Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
*/
var AccordionHeader = /* @__PURE__ */ import_react.forwardRef(function AccordionHeader(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { state } = useAccordionItemContext();
	return useRenderElement("h3", componentProps, {
		state,
		ref: forwardedRef,
		props: elementProps,
		stateAttributesMapping: accordionStateAttributesMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+utils@0.2.8_@types_e010ca4d59634f45efcddaf3f215415a/node_modules/@base-ui/utils/esm/isElementDisabled.js
function isElementDisabled(element) {
	return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/trigger/AccordionTrigger.js
var SUPPORTED_KEYS = new Set([
	ARROW_DOWN,
	ARROW_UP,
	ARROW_RIGHT,
	ARROW_LEFT,
	HOME,
	"End"
]);
function getActiveTriggers(accordionItemRefs) {
	const { current: accordionItemElements } = accordionItemRefs;
	const output = [];
	for (let i = 0; i < accordionItemElements.length; i += 1) {
		const section = accordionItemElements[i];
		if (!isElementDisabled(section)) {
			const trigger = section?.querySelector("[type=\"button\"], [role=\"button\"]");
			if (trigger && !isElementDisabled(trigger)) output.push(trigger);
		}
	}
	return output;
}
/**
* A button that opens and closes the corresponding panel.
* Renders a `<button>` element.
*
* Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
*/
var AccordionTrigger = /* @__PURE__ */ import_react.forwardRef(function AccordionTrigger(componentProps, forwardedRef) {
	const { disabled: disabledProp, className, id: idProp, render, nativeButton = true, style, ...elementProps } = componentProps;
	const { panelId, open, handleTrigger, disabled: contextDisabled } = useCollapsibleRootContext();
	const { getButtonProps, buttonRef } = useButton({
		disabled: disabledProp ?? contextDisabled,
		focusableWhenDisabled: true,
		native: nativeButton,
		composite: true
	});
	const { accordionItemRefs, direction, loopFocus, orientation } = useAccordionRootContext();
	const isRtl = direction === "rtl";
	const isHorizontal = orientation === "horizontal";
	const { state, setTriggerId, triggerId: id } = useAccordionItemContext();
	useIsoLayoutEffect(() => {
		if (idProp) setTriggerId(idProp);
		return () => {
			setTriggerId(void 0);
		};
	}, [idProp, setTriggerId]);
	const props = import_react.useMemo(() => ({
		"aria-controls": open ? panelId : void 0,
		"aria-expanded": open,
		id,
		tabIndex: 0,
		onClick: handleTrigger,
		onKeyDown(event) {
			if (!SUPPORTED_KEYS.has(event.key)) return;
			stopEvent(event);
			const triggers = getActiveTriggers(accordionItemRefs);
			const lastIndex = triggers.length - 1;
			let nextIndex = -1;
			const thisIndex = triggers.indexOf(event.currentTarget);
			function toNext() {
				if (loopFocus) nextIndex = thisIndex + 1 > lastIndex ? 0 : thisIndex + 1;
				else nextIndex = Math.min(thisIndex + 1, lastIndex);
			}
			function toPrev() {
				if (loopFocus) nextIndex = thisIndex === 0 ? lastIndex : thisIndex - 1;
				else nextIndex = thisIndex - 1;
			}
			switch (event.key) {
				case ARROW_DOWN:
					if (!isHorizontal) toNext();
					break;
				case ARROW_UP:
					if (!isHorizontal) toPrev();
					break;
				case ARROW_RIGHT:
					if (isHorizontal) if (isRtl) toPrev();
					else toNext();
					break;
				case ARROW_LEFT:
					if (isHorizontal) if (isRtl) toNext();
					else toPrev();
					break;
				case "Home":
					nextIndex = 0;
					break;
				case "End":
					nextIndex = lastIndex;
					break;
				default: break;
			}
			if (nextIndex > -1) triggers[nextIndex].focus();
		}
	}), [
		accordionItemRefs,
		handleTrigger,
		id,
		isHorizontal,
		isRtl,
		loopFocus,
		open,
		panelId
	]);
	return useRenderElement("button", componentProps, {
		state,
		ref: [forwardedRef, buttonRef],
		props: [
			props,
			elementProps,
			getButtonProps
		],
		stateAttributesMapping: triggerOpenStateMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/root/AccordionRootDataAttributes.js
var AccordionRootDataAttributes = /* @__PURE__ */ function(AccordionRootDataAttributes) {
	/**
	* Present when the accordion is disabled.
	*/
	AccordionRootDataAttributes["disabled"] = "data-disabled";
	/**
	* Indicates the orientation of the accordion.
	*/
	AccordionRootDataAttributes["orientation"] = "data-orientation";
	return AccordionRootDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/collapsible/panel/useCollapsiblePanel.js
function useCollapsiblePanel(parameters) {
	const { abortControllerRef, animationTypeRef, externalRef, height, hiddenUntilFound, keepMounted, id: idParam, mounted, onOpenChange, open, panelRef, runOnceAnimationsFinish, setDimensions, setMounted, setOpen, setVisible, transitionDimensionRef, visible, width } = parameters;
	const isBeforeMatchRef = import_react.useRef(false);
	const latestAnimationNameRef = import_react.useRef(null);
	const shouldCancelInitialOpenAnimationRef = import_react.useRef(open);
	const shouldCancelInitialOpenTransitionRef = import_react.useRef(open);
	const endingStyleFrame = useAnimationFrame();
	/**
	* When opening, the `hidden` attribute is removed immediately.
	* When closing, the `hidden` attribute is set after any exit animations runs.
	*/
	const hidden = import_react.useMemo(() => {
		if (animationTypeRef.current === "css-animation") return !visible;
		return !open && !mounted;
	}, [
		open,
		mounted,
		visible,
		animationTypeRef
	]);
	const mergedPanelRef = useMergedRefs(externalRef, panelRef, useStableCallback((element) => {
		if (!element) return;
		if (animationTypeRef.current == null || transitionDimensionRef.current == null) {
			const panelStyles = getComputedStyle(element);
			const hasAnimation = panelStyles.animationName !== "none" && panelStyles.animationName !== "";
			const hasTransition = panelStyles.transitionDuration !== "0s" && panelStyles.transitionDuration !== "";
			/**
			* animationTypeRef is safe to read in render because it's only ever set
			* once here during the first render and never again.
			* https://react.dev/learn/referencing-values-with-refs#best-practices-for-refs
			*/
			if (hasAnimation && hasTransition) {} else if (panelStyles.animationName === "none" && panelStyles.transitionDuration !== "0s") animationTypeRef.current = "css-transition";
			else if (panelStyles.animationName !== "none" && panelStyles.transitionDuration === "0s") animationTypeRef.current = "css-animation";
			else animationTypeRef.current = "none";
			/**
			* We need to know in advance which side is being collapsed when using CSS
			* transitions in order to set the value of width/height to `0px` momentarily.
			* Setting both to `0px` will break layout.
			*/
			if (element.getAttribute(AccordionRootDataAttributes.orientation) === "horizontal" || panelStyles.transitionProperty.indexOf("width") > -1) transitionDimensionRef.current = "width";
			else transitionDimensionRef.current = "height";
		}
		if (animationTypeRef.current !== "css-transition") return;
		if (height === void 0 || width === void 0) {
			setDimensions({
				height: element.scrollHeight,
				width: element.scrollWidth
			});
			if (shouldCancelInitialOpenTransitionRef.current) element.style.setProperty("transition-duration", "0s");
		}
		let frame = -1;
		let nextFrame = -1;
		frame = AnimationFrame.request(() => {
			shouldCancelInitialOpenTransitionRef.current = false;
			nextFrame = AnimationFrame.request(() => {
				/**
				* This is slightly faster than another RAF and is the earliest
				* opportunity to remove the temporary `transition-duration: 0s` that
				* was applied to cancel opening transitions of initially open panels.
				* https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
				*/
				setTimeout(() => {
					element.style.removeProperty("transition-duration");
				});
			});
		});
		return () => {
			AnimationFrame.cancel(frame);
			AnimationFrame.cancel(nextFrame);
		};
	}));
	useIsoLayoutEffect(() => {
		if (animationTypeRef.current !== "css-transition") return;
		const panel = panelRef.current;
		if (!panel) return;
		let resizeFrame = -1;
		if (abortControllerRef.current != null) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}
		if (open) {
			const originalLayoutStyles = {
				"justify-content": panel.style.justifyContent,
				"align-items": panel.style.alignItems,
				"align-content": panel.style.alignContent,
				"justify-items": panel.style.justifyItems
			};
			Object.keys(originalLayoutStyles).forEach((key) => {
				panel.style.setProperty(key, "initial", "important");
			});
			/**
			* When `keepMounted={false}` and the panel is initially closed, the very
			* first time it opens (not any subsequent opens) `data-starting-style` is
			* off or missing by a frame so we need to set it manually. Otherwise any
			* CSS properties expected to transition using [data-starting-style] may
			* be mis-timed and appear to be complete skipped.
			*/
			if (!shouldCancelInitialOpenTransitionRef.current && !keepMounted) panel.setAttribute(CollapsiblePanelDataAttributes.startingStyle, "");
			setDimensions({
				height: panel.scrollHeight,
				width: panel.scrollWidth
			});
			resizeFrame = AnimationFrame.request(() => {
				Object.entries(originalLayoutStyles).forEach(([key, value]) => {
					if (value === "") panel.style.removeProperty(key);
					else panel.style.setProperty(key, value);
				});
			});
		} else {
			if (panel.scrollHeight === 0 && panel.scrollWidth === 0) return;
			setDimensions({
				height: panel.scrollHeight,
				width: panel.scrollWidth
			});
			const abortController = new AbortController();
			abortControllerRef.current = abortController;
			const signal = abortController.signal;
			let attributeObserver = null;
			const endingStyleAttribute = CollapsiblePanelDataAttributes.endingStyle;
			attributeObserver = new MutationObserver((mutationList) => {
				if (mutationList.some((mutation) => mutation.type === "attributes" && mutation.attributeName === endingStyleAttribute)) {
					attributeObserver?.disconnect();
					attributeObserver = null;
					runOnceAnimationsFinish(() => {
						setDimensions({
							height: 0,
							width: 0
						});
						panel.style.removeProperty("content-visibility");
						setMounted(false);
						if (abortControllerRef.current === abortController) abortControllerRef.current = null;
					}, signal);
				}
			});
			attributeObserver.observe(panel, {
				attributes: true,
				attributeFilter: [endingStyleAttribute]
			});
			return () => {
				attributeObserver?.disconnect();
				endingStyleFrame.cancel();
				if (abortControllerRef.current === abortController) {
					abortController.abort();
					abortControllerRef.current = null;
				}
			};
		}
		return () => {
			AnimationFrame.cancel(resizeFrame);
		};
	}, [
		abortControllerRef,
		animationTypeRef,
		endingStyleFrame,
		hiddenUntilFound,
		keepMounted,
		mounted,
		open,
		panelRef,
		runOnceAnimationsFinish,
		setDimensions,
		setMounted
	]);
	useIsoLayoutEffect(() => {
		if (animationTypeRef.current !== "css-animation") return;
		const panel = panelRef.current;
		if (!panel) return;
		latestAnimationNameRef.current = panel.style.animationName || latestAnimationNameRef.current;
		panel.style.setProperty("animation-name", "none");
		setDimensions({
			height: panel.scrollHeight,
			width: panel.scrollWidth
		});
		if (!shouldCancelInitialOpenAnimationRef.current && !isBeforeMatchRef.current) panel.style.removeProperty("animation-name");
		if (open) {
			if (abortControllerRef.current != null) {
				abortControllerRef.current.abort();
				abortControllerRef.current = null;
			}
			setMounted(true);
			setVisible(true);
		} else {
			abortControllerRef.current = new AbortController();
			runOnceAnimationsFinish(() => {
				setMounted(false);
				setVisible(false);
				abortControllerRef.current = null;
			}, abortControllerRef.current.signal);
		}
	}, [
		abortControllerRef,
		animationTypeRef,
		open,
		panelRef,
		runOnceAnimationsFinish,
		setDimensions,
		setMounted,
		setVisible,
		visible
	]);
	useOnMount(() => {
		const frame = AnimationFrame.request(() => {
			shouldCancelInitialOpenAnimationRef.current = false;
		});
		return () => AnimationFrame.cancel(frame);
	});
	useIsoLayoutEffect(() => {
		if (!hiddenUntilFound) return;
		const panel = panelRef.current;
		if (!panel) return;
		let frame = -1;
		let nextFrame = -1;
		if (open && isBeforeMatchRef.current) {
			panel.style.transitionDuration = "0s";
			setDimensions({
				height: panel.scrollHeight,
				width: panel.scrollWidth
			});
			frame = AnimationFrame.request(() => {
				isBeforeMatchRef.current = false;
				nextFrame = AnimationFrame.request(() => {
					setTimeout(() => {
						panel.style.removeProperty("transition-duration");
					});
				});
			});
		}
		return () => {
			AnimationFrame.cancel(frame);
			AnimationFrame.cancel(nextFrame);
		};
	}, [
		hiddenUntilFound,
		open,
		panelRef,
		setDimensions
	]);
	useIsoLayoutEffect(() => {
		const panel = panelRef.current;
		if (panel && hiddenUntilFound && hidden) {
			/**
			* React only supports a boolean for the `hidden` attribute and forces
			* legit string values to booleans so we have to force it back in the DOM
			* when necessary: https://github.com/facebook/react/issues/24740
			*/
			panel.setAttribute("hidden", "until-found");
			/**
			* Set data-starting-style here to persist the closed styles, this is to
			* prevent transitions from starting when the `hidden` attribute changes
			* to `'until-found'` as they could have different `display` properties:
			* https://github.com/tailwindlabs/tailwindcss/pull/14625
			*/
			if (animationTypeRef.current === "css-transition") panel.setAttribute(CollapsiblePanelDataAttributes.startingStyle, "");
		}
	}, [
		hiddenUntilFound,
		hidden,
		animationTypeRef,
		panelRef
	]);
	import_react.useEffect(function registerBeforeMatchListener() {
		const panel = panelRef.current;
		if (!panel) return;
		function handleBeforeMatch(event) {
			isBeforeMatchRef.current = true;
			setOpen(true);
			onOpenChange(true, createChangeEventDetails(none, event));
		}
		return addEventListener(panel, "beforematch", handleBeforeMatch);
	}, [
		onOpenChange,
		panelRef,
		setOpen
	]);
	return import_react.useMemo(() => ({ props: {
		hidden,
		id: idParam,
		ref: mergedPanelRef
	} }), [
		hidden,
		idParam,
		mergedPanelRef
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/panel/AccordionPanelCssVars.js
var AccordionPanelCssVars = /* @__PURE__ */ function(AccordionPanelCssVars) {
	/**
	* The accordion panel's height.
	* @type {number}
	*/
	AccordionPanelCssVars["accordionPanelHeight"] = "--accordion-panel-height";
	/**
	* The accordion panel's width.
	* @type {number}
	*/
	AccordionPanelCssVars["accordionPanelWidth"] = "--accordion-panel-width";
	return AccordionPanelCssVars;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/accordion/panel/AccordionPanel.js
/**
* A collapsible panel with the accordion item contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Accordion](https://base-ui.com/react/components/accordion)
*/
var AccordionPanel = /* @__PURE__ */ import_react.forwardRef(function AccordionPanel(componentProps, forwardedRef) {
	const { className, hiddenUntilFound: hiddenUntilFoundProp, keepMounted: keepMountedProp, id: idProp, render, style, ...elementProps } = componentProps;
	const { hiddenUntilFound: contextHiddenUntilFound, keepMounted: contextKeepMounted } = useAccordionRootContext();
	const { abortControllerRef, animationTypeRef, height, mounted, onOpenChange, open, panelId, panelRef, runOnceAnimationsFinish, setDimensions, setHiddenUntilFound, setKeepMounted, setMounted, setOpen, setVisible, transitionDimensionRef, visible, width, setPanelIdState, transitionStatus } = useCollapsibleRootContext();
	const hiddenUntilFound = hiddenUntilFoundProp ?? contextHiddenUntilFound;
	const keepMounted = keepMountedProp ?? contextKeepMounted;
	useIsoLayoutEffect(() => {
		if (idProp) {
			setPanelIdState(idProp);
			return () => {
				setPanelIdState(void 0);
			};
		}
	}, [idProp, setPanelIdState]);
	useIsoLayoutEffect(() => {
		setHiddenUntilFound(hiddenUntilFound);
	}, [setHiddenUntilFound, hiddenUntilFound]);
	useIsoLayoutEffect(() => {
		setKeepMounted(keepMounted);
	}, [setKeepMounted, keepMounted]);
	useOpenChangeComplete({
		open: open && transitionStatus === "idle",
		ref: panelRef,
		onComplete() {
			if (!open) return;
			setDimensions({
				width: void 0,
				height: void 0
			});
		}
	});
	const { props } = useCollapsiblePanel({
		abortControllerRef,
		animationTypeRef,
		externalRef: forwardedRef,
		height,
		hiddenUntilFound,
		id: idProp ?? panelId,
		keepMounted,
		mounted,
		onOpenChange,
		open,
		panelRef,
		runOnceAnimationsFinish,
		setDimensions,
		setMounted,
		setOpen,
		setVisible,
		transitionDimensionRef,
		visible,
		width
	});
	const { state, triggerId } = useAccordionItemContext();
	const element = useRenderElement("div", componentProps, {
		state: import_react.useMemo(() => ({
			...state,
			transitionStatus
		}), [state, transitionStatus]),
		ref: [forwardedRef, panelRef],
		props: [
			props,
			{
				"aria-labelledby": triggerId,
				role: "region",
				style: {
					[AccordionPanelCssVars.accordionPanelHeight]: height === void 0 ? "auto" : `${height}px`,
					[AccordionPanelCssVars.accordionPanelWidth]: width === void 0 ? "auto" : `${width}px`
				}
			},
			elementProps
		],
		stateAttributesMapping: accordionStateAttributesMapping
	});
	if (!(keepMounted || hiddenUntilFound || mounted)) return null;
	return element;
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/alert-dialog/root/AlertDialogRoot.js
/**
* Groups all parts of the alert dialog.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
*/
function AlertDialogRoot(props) {
	const { children, open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, actionsRef, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null } = props;
	const parentDialogRootContext = useDialogRootContext(true);
	const nested = Boolean(parentDialogRootContext);
	const store = DialogStore.useStore(handle?.store, {
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp,
		modal: true,
		disablePointerDismissal: true,
		nested,
		role: "alertdialog"
	});
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	store.useSyncedValue("nested", nested);
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const payload = store.useState("payload");
	useDialogRoot({
		store,
		actionsRef,
		parentContext: parentDialogRootContext?.store.context,
		isDrawer: false,
		onOpenChange,
		triggerIdProp
	});
	const contextValue = import_react.useMemo(() => ({ store }), [store]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IsDrawerContext.Provider, {
		value: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRootContext.Provider, {
			value: contextValue,
			children: typeof children === "function" ? children({ payload }) : children
		})
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/root/ComboboxRootContext.js
var ComboboxRootContext = /* @__PURE__ */ import_react.createContext(void 0);
var ComboboxFloatingContext = /* @__PURE__ */ import_react.createContext(void 0);
var ComboboxDerivedItemsContext = /* @__PURE__ */ import_react.createContext(void 0);
var ComboboxInputValueContext = /* @__PURE__ */ import_react.createContext("");
function useComboboxRootContext() {
	const context = import_react.useContext(ComboboxRootContext);
	if (!context) throw new Error(formatErrorMessage(22));
	return context;
}
function useComboboxFloatingContext() {
	const context = import_react.useContext(ComboboxFloatingContext);
	if (!context) throw new Error(formatErrorMessage(23));
	return context;
}
function useComboboxDerivedItemsContext() {
	const context = import_react.useContext(ComboboxDerivedItemsContext);
	if (!context) throw new Error(formatErrorMessage(24));
	return context;
}
function useComboboxInputValueContext() {
	return import_react.useContext(ComboboxInputValueContext);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/itemEquality.js
var defaultItemEquality = (itemValue, selectedValue) => Object.is(itemValue, selectedValue);
function compareItemEquality(itemValue, selectedValue, comparer) {
	if (itemValue == null || selectedValue == null) return Object.is(itemValue, selectedValue);
	return comparer(itemValue, selectedValue);
}
function selectedValueIncludes(selectedValues, itemValue, comparer) {
	if (!selectedValues || selectedValues.length === 0) return false;
	return selectedValues.some((selectedValue) => {
		if (selectedValue === void 0) return false;
		return compareItemEquality(itemValue, selectedValue, comparer);
	});
}
function findItemIndex(itemValues, selectedValue, comparer) {
	if (!itemValues || itemValues.length === 0) return -1;
	return itemValues.findIndex((itemValue) => {
		if (itemValue === void 0) return false;
		return compareItemEquality(itemValue, selectedValue, comparer);
	});
}
function removeItem(selectedValues, itemValue, comparer) {
	return selectedValues.filter((selectedValue) => !compareItemEquality(itemValue, selectedValue, comparer));
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/serializeValue.js
function serializeValue(value) {
	if (value == null) return "";
	if (typeof value === "string") return value;
	try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/resolveValueLabel.js
function isGroupedItems(items) {
	return items != null && items.length > 0 && typeof items[0] === "object" && items[0] != null && "items" in items[0];
}
/**
* Checks if the items array contains an item with a null value that has a non-null label.
*/
function hasNullItemLabel(items) {
	if (!Array.isArray(items)) return items != null && "null" in items;
	const arrayItems = items;
	if (isGroupedItems(arrayItems)) {
		for (const group of arrayItems) for (const item of group.items) if (item && item.value == null && item.label != null) return true;
		return false;
	}
	for (const item of arrayItems) if (item && item.value == null && item.label != null) return true;
	return false;
}
function stringifyAsLabel(item, itemToStringLabel) {
	if (itemToStringLabel && item != null) return itemToStringLabel(item) ?? "";
	if (item && typeof item === "object") {
		if ("label" in item && item.label != null) return String(item.label);
		if ("value" in item) return String(item.value);
	}
	return serializeValue(item);
}
function stringifyAsValue(item, itemToStringValue) {
	if (itemToStringValue && item != null) return itemToStringValue(item) ?? "";
	if (item && typeof item === "object" && "value" in item && "label" in item) return serializeValue(item.value);
	return serializeValue(item);
}
function resolveSelectedLabel(value, items, itemToStringLabel) {
	function fallback() {
		return stringifyAsLabel(value, itemToStringLabel);
	}
	if (itemToStringLabel && value != null) return itemToStringLabel(value);
	if (value && typeof value === "object" && "label" in value && value.label != null) return value.label;
	if (items && !Array.isArray(items)) return items[value] ?? fallback();
	if (Array.isArray(items)) {
		const arrayItems = items;
		const flatItems = isGroupedItems(arrayItems) ? arrayItems.flatMap((group) => group.items) : arrayItems;
		if (value == null || typeof value !== "object") {
			const match = flatItems.find((item) => item.value === value);
			if (match && match.label != null) return match.label;
			return fallback();
		}
		if ("value" in value) {
			const match = flatItems.find((item) => item && item.value === value.value);
			if (match && match.label != null) return match.label;
		}
	}
	return fallback();
}
function resolveMultipleLabels(values, items, itemToStringLabel) {
	return values.reduce((acc, value, index) => {
		if (index > 0) acc.push(", ");
		acc.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: resolveSelectedLabel(value, items, itemToStringLabel) }, index));
		return acc;
	}, []);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/store.js
var selectors$4 = {
	id: createSelector((state) => state.id),
	labelId: createSelector((state) => state.labelId),
	items: createSelector((state) => state.items),
	selectedValue: createSelector((state) => state.selectedValue),
	hasSelectionChips: createSelector((state) => {
		const selectedValue = state.selectedValue;
		return Array.isArray(selectedValue) && selectedValue.length > 0;
	}),
	hasSelectedValue: createSelector((state) => {
		const { selectedValue, selectionMode } = state;
		if (selectedValue == null) return false;
		if (selectionMode === "multiple" && Array.isArray(selectedValue)) return selectedValue.length > 0;
		return true;
	}),
	hasNullItemLabel: createSelector((state, enabled) => {
		return enabled ? hasNullItemLabel(state.items) : false;
	}),
	open: createSelector((state) => state.open),
	mounted: createSelector((state) => state.mounted),
	forceMounted: createSelector((state) => state.forceMounted),
	inline: createSelector((state) => state.inline),
	activeIndex: createSelector((state) => state.activeIndex),
	selectedIndex: createSelector((state) => state.selectedIndex),
	isActive: createSelector((state, index) => state.activeIndex === index),
	isSelected: createSelector((state, itemValue) => {
		const comparer = state.isItemEqualToValue;
		const selectedValue = state.selectedValue;
		if (Array.isArray(selectedValue)) return selectedValue.some((selectedItem) => compareItemEquality(itemValue, selectedItem, comparer));
		return compareItemEquality(itemValue, selectedValue, comparer);
	}),
	transitionStatus: createSelector((state) => state.transitionStatus),
	popupProps: createSelector((state) => state.popupProps),
	inputProps: createSelector((state) => state.inputProps),
	triggerProps: createSelector((state) => state.triggerProps),
	getItemProps: createSelector((state) => state.getItemProps),
	positionerElement: createSelector((state) => state.positionerElement),
	listElement: createSelector((state) => state.listElement),
	triggerElement: createSelector((state) => state.triggerElement),
	inputElement: createSelector((state) => state.inputElement),
	inputGroupElement: createSelector((state) => state.inputGroupElement),
	popupSide: createSelector((state) => state.popupSide),
	openMethod: createSelector((state) => state.openMethod),
	inputInsidePopup: createSelector((state) => state.inputInsidePopup),
	selectionMode: createSelector((state) => state.selectionMode),
	name: createSelector((state) => state.name),
	form: createSelector((state) => state.form),
	disabled: createSelector((state) => state.disabled),
	readOnly: createSelector((state) => state.readOnly),
	required: createSelector((state) => state.required),
	grid: createSelector((state) => state.grid),
	virtualized: createSelector((state) => state.virtualized),
	itemToStringLabel: createSelector((state) => state.itemToStringLabel),
	isItemEqualToValue: createSelector((state) => state.isItemEqualToValue),
	modal: createSelector((state) => state.modal),
	autoHighlight: createSelector((state) => state.autoHighlight),
	submitOnItemClick: createSelector((state) => state.submitOnItemClick)
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/root/utils/index.js
/**
* Enhanced filter using Intl.Collator for more robust string matching.
* Uses the provided `itemToStringLabel` function if available, otherwise falls back to:
* • When `item` is an object with a `value` property, that property is used.
* • When `item` is a primitive (e.g. `string`), it is used directly.
*/
function createCollatorItemFilter(collatorFilter, itemToStringLabel) {
	return (item, query) => {
		if (item == null) return false;
		const itemString = stringifyAsLabel(item, itemToStringLabel);
		return collatorFilter.contains(itemString, query);
	};
}
/**
* Enhanced filter for single selection mode using Intl.Collator that shows all items
* when query is empty or matches the current selection, making it easier to browse options.
*/
function createSingleSelectionCollatorFilter(collatorFilter, itemToStringLabel, selectedValue) {
	return (item, query) => {
		if (item == null) return false;
		if (!query) return true;
		const itemString = stringifyAsLabel(item, itemToStringLabel);
		const selectedString = selectedValue != null ? stringifyAsLabel(selectedValue, itemToStringLabel) : "";
		if (selectedString && collatorFilter.contains(selectedString, query) && selectedString.length === query.length) return true;
		return collatorFilter.contains(itemString, query);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/filter.js
var filterCache = /* @__PURE__ */ new Map();
function getFilter(options = {}) {
	const mergedOptions = {
		usage: "search",
		sensitivity: "base",
		ignorePunctuation: true,
		...options
	};
	const cacheKey = `${stringifyLocale(options.locale)}|${JSON.stringify(mergedOptions)}`;
	const cachedFilter = filterCache.get(cacheKey);
	if (cachedFilter) return cachedFilter;
	const collator = new Intl.Collator(options.locale, mergedOptions);
	const filter = {
		contains(item, query, itemToString) {
			if (!query) return true;
			const itemString = stringifyAsLabel(item, itemToString);
			for (let i = 0; i <= itemString.length - query.length; i += 1) if (collator.compare(itemString.slice(i, i + query.length), query) === 0) return true;
			return false;
		},
		startsWith(item, query, itemToString) {
			if (!query) return true;
			const itemString = stringifyAsLabel(item, itemToString);
			return collator.compare(itemString.slice(0, query.length), query) === 0;
		},
		endsWith(item, query, itemToString) {
			if (!query) return true;
			const itemString = stringifyAsLabel(item, itemToString);
			const queryLength = query.length;
			return itemString.length >= queryLength && collator.compare(itemString.slice(itemString.length - queryLength), query) === 0;
		}
	};
	filterCache.set(cacheKey, filter);
	return filter;
}
function stringifyLocale(locale) {
	if (Array.isArray(locale)) return locale.map((value) => stringifyLocale(value)).join(",");
	if (locale == null) return "";
	return String(locale);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/root/utils/useFilter.js
/**
* Matches items against a query using `Intl.Collator` for robust string matching.
*/
var useCoreFilter = getFilter;
/**
* Matches items against a query using `Intl.Collator` for robust string matching.
*/
function useComboboxFilter(options = {}) {
	const { multiple = false, value, ...collatorOptions } = options;
	const coreFilter = getFilter(collatorOptions);
	const contains = import_react.useCallback((item, query, itemToString) => {
		if (multiple) return createCollatorItemFilter(coreFilter, itemToString)(item, query);
		return createSingleSelectionCollatorFilter(coreFilter, itemToString, value)(item, query);
	}, [
		coreFilter,
		value,
		multiple
	]);
	return import_react.useMemo(() => ({
		contains,
		startsWith: coreFilter.startsWith,
		endsWith: coreFilter.endsWith
	}), [contains, coreFilter]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/root/utils/constants.js
var NO_ACTIVE_VALUE = Symbol("none");
var INITIAL_LAST_HIGHLIGHT = {
	value: NO_ACTIVE_VALUE,
	index: -1
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/root/AriaCombobox.js
/**
* @internal
*/
function AriaCombobox(props) {
	const { id: idProp, onOpenChangeComplete: onOpenChangeCompleteProp, defaultSelectedValue = null, selectedValue: selectedValueProp, onSelectedValueChange, defaultInputValue: defaultInputValueProp, inputValue: inputValueProp, open: openProp, defaultOpen = false, selectionMode = "none", onItemHighlighted: onItemHighlightedProp, name: nameProp, form, disabled: disabledProp = false, readOnly = false, required = false, inputRef: inputRefProp, grid = false, items, filteredItems: filteredItemsProp, filter: filterProp, openOnInputClick = true, autoHighlight = false, keepHighlight = false, highlightItemOnHover = true, loopFocus = true, itemToStringLabel, itemToStringValue, isItemEqualToValue = defaultItemEquality, virtualized = false, inline: inlineProp = false, fillInputOnItemPress = true, modal = false, limit = -1, autoComplete = "list", formAutoComplete, locale, submitOnItemClick = false } = props;
	const { clearErrors } = useFormContext();
	const { setDirty, validityData, shouldValidateOnChange, setFilled, name: fieldName, disabled: fieldDisabled, setTouched, setFocused, validationMode, validation } = useFieldRootContext();
	const id = useLabelableId({ id: idProp });
	const collatorFilter = useCoreFilter({ locale });
	const [queryChangedAfterOpen, setQueryChangedAfterOpen] = import_react.useState(false);
	const [closeQuery, setCloseQuery] = import_react.useState(null);
	const listRef = import_react.useRef([]);
	const labelsRef = import_react.useRef([]);
	const popupRef = import_react.useRef(null);
	const inputRef = import_react.useRef(null);
	const startDismissRef = import_react.useRef(null);
	const endDismissRef = import_react.useRef(null);
	const emptyRef = import_react.useRef(null);
	const keyboardActiveRef = import_react.useRef(true);
	const hadInputClearRef = import_react.useRef(false);
	const chipsContainerRef = import_react.useRef(null);
	const clearRef = import_react.useRef(null);
	const selectionEventRef = import_react.useRef(null);
	const lastHighlightRef = import_react.useRef(INITIAL_LAST_HIGHLIGHT);
	const pendingQueryHighlightRef = import_react.useRef(null);
	/**
	* Contains the currently visible list of item values post-filtering.
	*/
	const valuesRef = import_react.useRef([]);
	/**
	* Contains all item values in a stable, unfiltered order.
	* This is only used when `items` prop is not provided.
	* It accumulates values on first mount and does not remove them on unmount due to
	* filtering, providing a stable index for selected value tracking.
	*/
	const allValuesRef = import_react.useRef([]);
	const disabled = fieldDisabled || disabledProp;
	const name = fieldName ?? nameProp;
	const multiple = selectionMode === "multiple";
	const single = selectionMode === "single";
	const hasInputValue = inputValueProp !== void 0 || defaultInputValueProp !== void 0;
	const hasItems = items !== void 0;
	const hasFilteredItemsProp = filteredItemsProp !== void 0;
	let autoHighlightMode;
	if (autoHighlight === "always") autoHighlightMode = "always";
	else autoHighlightMode = autoHighlight ? "input-change" : false;
	const [selectedValue, setSelectedValueUnwrapped] = useControlled({
		controlled: selectedValueProp,
		default: multiple ? defaultSelectedValue ?? EMPTY_ARRAY$1 : defaultSelectedValue,
		name: "Combobox",
		state: "selectedValue"
	});
	const filter = import_react.useMemo(() => {
		if (filterProp === null) return () => true;
		if (filterProp !== void 0) return filterProp;
		if (single && !queryChangedAfterOpen) return createSingleSelectionCollatorFilter(collatorFilter, itemToStringLabel, selectedValue);
		return createCollatorItemFilter(collatorFilter, itemToStringLabel);
	}, [
		filterProp,
		single,
		selectedValue,
		queryChangedAfterOpen,
		collatorFilter,
		itemToStringLabel
	]);
	const initialDefaultInputValue = useRefWithInit(() => {
		if (hasInputValue) return defaultInputValueProp ?? "";
		if (single) return stringifyAsLabel(selectedValue, itemToStringLabel);
		return "";
	}).current;
	const [inputValue, setInputValueUnwrapped] = useControlled({
		controlled: inputValueProp,
		default: initialDefaultInputValue,
		name: "Combobox",
		state: "inputValue"
	});
	const [open, setOpenUnwrapped] = useControlled({
		controlled: openProp,
		default: defaultOpen,
		name: "Combobox",
		state: "open"
	});
	const isGrouped = isGroupedItems(items);
	const query = closeQuery ?? (inputValue === "" ? "" : String(inputValue).trim());
	const selectedLabelString = single ? stringifyAsLabel(selectedValue, itemToStringLabel) : "";
	const shouldBypassFiltering = single && !queryChangedAfterOpen && query !== "" && selectedLabelString !== "" && selectedLabelString.length === query.length && collatorFilter.contains(selectedLabelString, query);
	const filterQuery = shouldBypassFiltering ? "" : query;
	const shouldIgnoreExternalFiltering = hasItems && hasFilteredItemsProp && shouldBypassFiltering;
	const flatItems = import_react.useMemo(() => {
		if (!items) return EMPTY_ARRAY$1;
		if (isGrouped) return items.flatMap((group) => group.items);
		return items;
	}, [items, isGrouped]);
	const filteredItems = import_react.useMemo(() => {
		if (filteredItemsProp && !shouldIgnoreExternalFiltering) return filteredItemsProp;
		if (!items) return EMPTY_ARRAY$1;
		if (isGrouped) {
			const groupedItems = items;
			const resultingGroups = [];
			let currentCount = 0;
			for (const group of groupedItems) {
				if (limit > -1 && currentCount >= limit) break;
				const candidateItems = filterQuery === "" ? group.items : group.items.filter((item) => filter(item, filterQuery, itemToStringLabel));
				if (candidateItems.length === 0) continue;
				const remainingLimit = limit > -1 ? limit - currentCount : Infinity;
				const itemsToTake = candidateItems.slice(0, remainingLimit);
				if (itemsToTake.length > 0) {
					const newGroup = {
						...group,
						items: itemsToTake
					};
					resultingGroups.push(newGroup);
					currentCount += itemsToTake.length;
				}
			}
			return resultingGroups;
		}
		if (filterQuery === "") return limit > -1 ? flatItems.slice(0, limit) : flatItems;
		const limitedItems = [];
		for (const item of flatItems) {
			if (limit > -1 && limitedItems.length >= limit) break;
			if (filter(item, filterQuery, itemToStringLabel)) limitedItems.push(item);
		}
		return limitedItems;
	}, [
		filteredItemsProp,
		shouldIgnoreExternalFiltering,
		items,
		isGrouped,
		filterQuery,
		limit,
		filter,
		itemToStringLabel,
		flatItems
	]);
	const flatFilteredItems = import_react.useMemo(() => {
		if (isGrouped) return filteredItems.flatMap((g) => g.items);
		return filteredItems;
	}, [filteredItems, isGrouped]);
	const store = useRefWithInit(() => new Store({
		id,
		labelId: void 0,
		selectedValue,
		open,
		filter,
		query,
		items,
		selectionMode,
		listRef,
		labelsRef,
		popupRef,
		emptyRef,
		inputRef,
		startDismissRef,
		endDismissRef,
		keyboardActiveRef,
		chipsContainerRef,
		clearRef,
		valuesRef,
		allValuesRef,
		selectionEventRef,
		name,
		form,
		disabled,
		readOnly,
		required,
		grid,
		isGrouped,
		virtualized,
		openOnInputClick,
		itemToStringLabel,
		isItemEqualToValue,
		modal,
		autoHighlight: autoHighlightMode,
		submitOnItemClick,
		hasInputValue,
		mounted: false,
		forceMounted: false,
		transitionStatus: "idle",
		inline: inlineProp,
		activeIndex: null,
		selectedIndex: null,
		popupProps: {},
		inputProps: {},
		triggerProps: {},
		positionerElement: null,
		listElement: null,
		triggerElement: null,
		inputElement: null,
		inputGroupElement: null,
		popupSide: null,
		openMethod: null,
		inputInsidePopup: true,
		onOpenChangeComplete: onOpenChangeCompleteProp || NOOP,
		setOpen: NOOP,
		setInputValue: NOOP,
		setSelectedValue: NOOP,
		setIndices: NOOP,
		onItemHighlighted: NOOP,
		handleSelection: NOOP,
		getItemProps: () => EMPTY_OBJECT,
		forceMount: NOOP,
		requestSubmit: NOOP
	})).current;
	const fieldRawValue = selectionMode === "none" ? inputValue : selectedValue;
	const fieldStringValue = import_react.useMemo(() => {
		if (selectionMode === "none") return fieldRawValue;
		if (Array.isArray(selectedValue)) return selectedValue.map((value) => stringifyAsValue(value, itemToStringValue));
		return stringifyAsValue(selectedValue, itemToStringValue);
	}, [
		fieldRawValue,
		itemToStringValue,
		selectionMode,
		selectedValue
	]);
	const onItemHighlighted = useStableCallback(onItemHighlightedProp);
	const onOpenChangeComplete = useStableCallback(onOpenChangeCompleteProp);
	const activeIndex = useStore(store, selectors$4.activeIndex);
	const selectedIndex = useStore(store, selectors$4.selectedIndex);
	const positionerElement = useStore(store, selectors$4.positionerElement);
	const listElement = useStore(store, selectors$4.listElement);
	const triggerElement = useStore(store, selectors$4.triggerElement);
	const inputElement = useStore(store, selectors$4.inputElement);
	const inputGroupElement = useStore(store, selectors$4.inputGroupElement);
	const inline = useStore(store, selectors$4.inline);
	const inputInsidePopup = useStore(store, selectors$4.inputInsidePopup);
	const triggerRef = useValueAsRef(triggerElement);
	const { mounted, setMounted, transitionStatus } = useTransitionStatus(open);
	const { openMethod, triggerProps } = useOpenInteractionType(open);
	const getFieldValue = useStableCallback(() => fieldStringValue);
	useRegisterFieldControl(inputInsidePopup ? triggerRef : inputRef, {
		id,
		value: fieldRawValue,
		getValue: getFieldValue
	});
	const forceMount = useStableCallback(() => {
		if (items) labelsRef.current = flatFilteredItems.map((item) => stringifyAsLabel(item, itemToStringLabel));
		else store.set("forceMounted", true);
	});
	const initialSelectedValueRef = import_react.useRef(selectedValue);
	useIsoLayoutEffect(() => {
		if (selectedValue !== initialSelectedValueRef.current) forceMount();
	}, [forceMount, selectedValue]);
	const setIndices = useStableCallback((options) => {
		store.update(options);
		const type = options.type || "none";
		if (options.activeIndex === void 0) return;
		if (options.activeIndex === null) {
			if (lastHighlightRef.current !== INITIAL_LAST_HIGHLIGHT) {
				lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT;
				onItemHighlighted(void 0, createGenericEventDetails(type, void 0, { index: -1 }));
			}
		} else {
			const activeValue = valuesRef.current[options.activeIndex];
			lastHighlightRef.current = {
				value: activeValue,
				index: options.activeIndex
			};
			onItemHighlighted(activeValue, createGenericEventDetails(type, void 0, { index: options.activeIndex }));
		}
	});
	const setInputValue = useStableCallback((next, eventDetails) => {
		hadInputClearRef.current = eventDetails.reason === inputClear;
		props.onInputValueChange?.(next, eventDetails);
		if (eventDetails.isCanceled) return;
		if (eventDetails.reason === "input-change") {
			const event = eventDetails.event;
			const inputType = event.inputType;
			if (event.type === "compositionend" || inputType != null && inputType !== "" && inputType !== "insertReplacementText") {
				const hasQuery = next.trim() !== "";
				if (hasQuery) setQueryChangedAfterOpen(true);
				pendingQueryHighlightRef.current = { hasQuery };
				if (hasQuery && autoHighlightMode && store.state.activeIndex == null) store.set("activeIndex", 0);
			}
		}
		setInputValueUnwrapped(next);
	});
	const setOpen = useStableCallback((nextOpen, eventDetails) => {
		if (open === nextOpen) return;
		if (eventDetails.reason === "escape-key" && hasItems && flatFilteredItems.length === 0 && !store.state.emptyRef.current) eventDetails.allowPropagation();
		props.onOpenChange?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		if (!nextOpen && queryChangedAfterOpen) {
			if (single) {
				if (!inline) setCloseQuery(query);
				if (query === "") setQueryChangedAfterOpen(false);
			} else if (multiple) {
				if (inline || inputInsidePopup) setIndices({ activeIndex: null });
				else setCloseQuery(query);
				setInputValue("", createChangeEventDetails(inputClear, eventDetails.event));
			}
		}
		setOpenUnwrapped(nextOpen);
		if (!nextOpen && inputInsidePopup && (eventDetails.reason === "focus-out" || eventDetails.reason === "outside-press")) {
			setTouched(true);
			setFocused(false);
			if (validationMode === "onBlur") {
				const valueToValidate = selectionMode === "none" ? inputValue : selectedValue;
				validation.commit(valueToValidate);
			}
		}
	});
	const setSelectedValue = useStableCallback((nextValue, eventDetails) => {
		onSelectedValueChange?.(nextValue, eventDetails);
		if (eventDetails.isCanceled) return;
		setSelectedValueUnwrapped(nextValue);
		if (selectionMode === "none" && popupRef.current && fillInputOnItemPress || single && !store.state.inputInsidePopup) setInputValue(stringifyAsLabel(nextValue, itemToStringLabel), createChangeEventDetails(eventDetails.reason, eventDetails.event));
		if (single && nextValue != null && eventDetails.reason !== "input-change" && queryChangedAfterOpen && !inline) setCloseQuery(query);
	});
	const handleSelection = useStableCallback((event, passedValue) => {
		let itemValue = passedValue;
		if (itemValue === void 0) {
			if (activeIndex === null) return;
			itemValue = valuesRef.current[activeIndex];
		}
		const targetEl = getTarget(event);
		const overrideEvent = selectionEventRef.current ?? event;
		selectionEventRef.current = null;
		const eventDetails = createChangeEventDetails(itemPress, overrideEvent);
		const href = targetEl?.closest("a")?.getAttribute("href");
		if (href) {
			if (href.startsWith("#")) setOpen(false, eventDetails);
			return;
		}
		if (multiple) {
			const currentSelectedValue = Array.isArray(selectedValue) ? selectedValue : [];
			setSelectedValue(selectedValueIncludes(currentSelectedValue, itemValue, store.state.isItemEqualToValue) ? removeItem(currentSelectedValue, itemValue, store.state.isItemEqualToValue) : [...currentSelectedValue, itemValue], eventDetails);
			if (!(inputRef.current ? inputRef.current.value.trim() !== "" : false)) return;
			if (store.state.inputInsidePopup) setInputValue("", createChangeEventDetails(inputClear, eventDetails.event));
			else setOpen(false, eventDetails);
		} else {
			setSelectedValue(itemValue, eventDetails);
			setOpen(false, eventDetails);
		}
	});
	const requestSubmit = useStableCallback(() => {
		if (!store.state.submitOnItemClick) return;
		const formElement = validation.inputRef.current?.form ?? store.state.inputElement?.form;
		if (formElement && typeof formElement.requestSubmit === "function") formElement.requestSubmit();
	});
	const handleUnmount = useStableCallback(() => {
		setMounted(false);
		onOpenChangeComplete?.(false);
		setQueryChangedAfterOpen(false);
		setCloseQuery(null);
		if (selectionMode === "none") setIndices({
			activeIndex: null,
			selectedIndex: null
		});
		else setIndices({ activeIndex: null });
		if (multiple && inputRef.current && inputRef.current.value !== "" && !hadInputClearRef.current) setInputValue("", createChangeEventDetails(inputClear));
		if (single) if (store.state.inputInsidePopup) {
			if (inputRef.current && inputRef.current.value !== "") setInputValue("", createChangeEventDetails(inputClear));
		} else {
			const stringVal = stringifyAsLabel(selectedValue, itemToStringLabel);
			if (inputRef.current && inputRef.current.value !== stringVal) setInputValue(stringVal, createChangeEventDetails(stringVal === "" ? inputClear : none));
		}
	});
	const resolvedPopupRef = import_react.useMemo(() => {
		if (inline && positionerElement) return { current: positionerElement.closest("[role=\"dialog\"]") };
		return popupRef;
	}, [inline, positionerElement]);
	useOpenChangeComplete({
		enabled: !props.actionsRef,
		open,
		ref: resolvedPopupRef,
		onComplete() {
			if (!open) handleUnmount();
		}
	});
	import_react.useImperativeHandle(props.actionsRef, () => ({ unmount: handleUnmount }), [handleUnmount]);
	useIsoLayoutEffect(function syncSelectedIndex() {
		if (open || selectionMode === "none") return;
		const registry = items ? flatItems : allValuesRef.current;
		if (multiple) {
			const currentValue = Array.isArray(selectedValue) ? selectedValue : [];
			const lastValue = currentValue[currentValue.length - 1];
			const lastIndex = findItemIndex(registry, lastValue, isItemEqualToValue);
			setIndices({ selectedIndex: lastIndex === -1 ? null : lastIndex });
		} else {
			const index = findItemIndex(registry, selectedValue, isItemEqualToValue);
			setIndices({ selectedIndex: index === -1 ? null : index });
		}
	}, [
		open,
		selectedValue,
		items,
		selectionMode,
		flatItems,
		multiple,
		isItemEqualToValue,
		setIndices
	]);
	useIsoLayoutEffect(() => {
		if (items) {
			valuesRef.current = flatFilteredItems;
			listRef.current.length = flatFilteredItems.length;
		}
	}, [items, flatFilteredItems]);
	useIsoLayoutEffect(() => {
		const pendingHighlight = pendingQueryHighlightRef.current;
		if (pendingHighlight) {
			if (pendingHighlight.hasQuery) {
				if (autoHighlightMode) store.set("activeIndex", 0);
			} else if (autoHighlightMode === "always") store.set("activeIndex", 0);
			pendingQueryHighlightRef.current = null;
		}
		if (!open && !inline) return;
		const candidateItems = hasItems || hasFilteredItemsProp ? flatFilteredItems : valuesRef.current;
		const storeActiveIndex = store.state.activeIndex;
		if (storeActiveIndex == null) {
			if (autoHighlightMode === "always" && candidateItems.length > 0) {
				store.set("activeIndex", 0);
				return;
			}
			if (lastHighlightRef.current !== INITIAL_LAST_HIGHLIGHT) {
				lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT;
				store.state.onItemHighlighted(void 0, createGenericEventDetails(none, void 0, { index: -1 }));
			}
			return;
		}
		if (storeActiveIndex >= candidateItems.length) {
			if (lastHighlightRef.current !== INITIAL_LAST_HIGHLIGHT) {
				lastHighlightRef.current = INITIAL_LAST_HIGHLIGHT;
				store.state.onItemHighlighted(void 0, createGenericEventDetails(none, void 0, { index: -1 }));
			}
			store.set("activeIndex", null);
			return;
		}
		const itemValue = candidateItems[storeActiveIndex];
		const previouslyHighlightedItemValue = lastHighlightRef.current.value;
		const isSameItem = previouslyHighlightedItemValue !== NO_ACTIVE_VALUE && compareItemEquality(itemValue, previouslyHighlightedItemValue, store.state.isItemEqualToValue);
		if (lastHighlightRef.current.index !== storeActiveIndex || !isSameItem) {
			lastHighlightRef.current = {
				value: itemValue,
				index: storeActiveIndex
			};
			store.state.onItemHighlighted(itemValue, createGenericEventDetails(none, void 0, { index: storeActiveIndex }));
		}
	}, [
		activeIndex,
		autoHighlightMode,
		hasFilteredItemsProp,
		hasItems,
		flatFilteredItems,
		inline,
		open,
		store
	]);
	useIsoLayoutEffect(() => {
		if (selectionMode === "none") {
			setFilled(String(inputValue) !== "");
			return;
		}
		setFilled(multiple ? Array.isArray(selectedValue) && selectedValue.length > 0 : selectedValue != null);
	}, [
		setFilled,
		selectionMode,
		inputValue,
		selectedValue,
		multiple
	]);
	import_react.useEffect(() => {
		if (hasItems && autoHighlightMode && flatFilteredItems.length === 0) setIndices({ activeIndex: null });
	}, [
		hasItems,
		autoHighlightMode,
		flatFilteredItems.length,
		setIndices
	]);
	useValueChanged(query, () => {
		if (!open || query === "" || query === String(initialDefaultInputValue)) return;
		setQueryChangedAfterOpen(true);
	});
	useValueChanged(selectedValue, () => {
		if (selectionMode === "none") return;
		clearErrors(name);
		setDirty(selectedValue !== validityData.initialValue);
		if (shouldValidateOnChange()) validation.commit(selectedValue);
		else validation.commit(selectedValue, true);
		if (single && !hasInputValue && !inputInsidePopup) {
			const nextInputValue = stringifyAsLabel(selectedValue, itemToStringLabel);
			if (inputValue !== nextInputValue) setInputValue(nextInputValue, createChangeEventDetails(none));
		}
	});
	useValueChanged(inputValue, () => {
		if (selectionMode !== "none") return;
		clearErrors(name);
		setDirty(inputValue !== validityData.initialValue);
		if (shouldValidateOnChange()) validation.commit(inputValue);
		else validation.commit(inputValue, true);
	});
	useValueChanged(items, () => {
		if (!single || hasInputValue || inputInsidePopup || queryChangedAfterOpen) return;
		const nextInputValue = stringifyAsLabel(selectedValue, itemToStringLabel);
		if (inputValue !== nextInputValue) setInputValue(nextInputValue, createChangeEventDetails(none));
	});
	const floatingRootContext = useFloatingRootContext({
		open: inline ? true : open,
		onOpenChange: setOpen,
		elements: {
			reference: inputInsidePopup ? triggerElement : inputElement,
			floating: positionerElement
		}
	});
	let ariaHasPopup;
	let ariaExpanded;
	if (!inline) {
		ariaHasPopup = grid ? "grid" : "listbox";
		ariaExpanded = open ? "true" : "false";
	}
	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
		import_react.useMemo(() => {
			const isPlainInput = inputElement?.tagName === "INPUT";
			const shouldTreatAsInput = inputElement == null || isPlainInput;
			const shouldApplyAria = shouldTreatAsInput || open;
			const reference = shouldTreatAsInput ? {
				autoComplete: "off",
				spellCheck: "false",
				autoCorrect: "off",
				autoCapitalize: "none"
			} : {};
			if (shouldApplyAria) {
				reference.role = "combobox";
				reference["aria-expanded"] = ariaExpanded;
				reference["aria-haspopup"] = ariaHasPopup;
				reference["aria-controls"] = open ? listElement?.id : void 0;
				reference["aria-autocomplete"] = autoComplete;
			}
			return {
				reference,
				floating: { role: "presentation" }
			};
		}, [
			inputElement,
			open,
			ariaExpanded,
			ariaHasPopup,
			listElement?.id,
			autoComplete
		]),
		useClick(floatingRootContext, {
			enabled: !readOnly && !disabled && openOnInputClick,
			event: "mousedown-only",
			toggle: false,
			touchOpenDelay: inputInsidePopup ? 0 : 100,
			reason: inputPress
		}),
		useDismiss(floatingRootContext, {
			enabled: !readOnly && !disabled && !inline,
			outsidePressEvent: {
				mouse: "sloppy",
				touch: "intentional"
			},
			bubbles: inline ? true : void 0,
			outsidePress(event) {
				const target = getTarget(event);
				return !contains(triggerElement, target) && !contains(clearRef.current, target) && !contains(chipsContainerRef.current, target) && !contains(inputGroupElement, target);
			}
		}),
		useListNavigation(floatingRootContext, {
			enabled: !readOnly && !disabled,
			id,
			listRef,
			activeIndex,
			selectedIndex,
			virtual: true,
			loopFocus,
			allowEscape: loopFocus && !autoHighlightMode,
			focusItemOnOpen: queryChangedAfterOpen || selectionMode === "none" && !autoHighlightMode ? false : "auto",
			focusItemOnHover: highlightItemOnHover,
			resetOnPointerLeave: !keepHighlight,
			cols: grid ? 2 : 1,
			orientation: grid ? "horizontal" : void 0,
			disabledIndices: EMPTY_ARRAY$1,
			onNavigate(nextActiveIndex, event) {
				if (!event && !open || transitionStatus === "ending") return;
				if (!event) setIndices({ activeIndex: nextActiveIndex });
				else setIndices({
					activeIndex: nextActiveIndex,
					type: keyboardActiveRef.current ? "keyboard" : "pointer"
				});
			}
		})
	]);
	useOnFirstRender(() => {
		store.update({
			inline: inlineProp,
			popupProps: getFloatingProps(),
			inputProps: getReferenceProps(),
			triggerProps,
			getItemProps,
			setOpen,
			setInputValue,
			setSelectedValue,
			setIndices,
			onItemHighlighted,
			handleSelection,
			forceMount,
			requestSubmit
		});
	});
	useIsoLayoutEffect(() => {
		store.update({
			id,
			selectedValue,
			open,
			mounted,
			transitionStatus,
			items,
			inline: inlineProp,
			popupProps: getFloatingProps(),
			inputProps: getReferenceProps(),
			triggerProps,
			openMethod,
			getItemProps,
			selectionMode,
			name,
			form,
			disabled,
			readOnly,
			required,
			grid,
			isGrouped,
			virtualized,
			onOpenChangeComplete,
			openOnInputClick,
			itemToStringLabel,
			modal,
			autoHighlight: autoHighlightMode,
			isItemEqualToValue,
			submitOnItemClick,
			hasInputValue,
			requestSubmit
		});
	}, [
		store,
		id,
		selectedValue,
		open,
		mounted,
		transitionStatus,
		items,
		getFloatingProps,
		getReferenceProps,
		getItemProps,
		openMethod,
		triggerProps,
		selectionMode,
		name,
		disabled,
		readOnly,
		required,
		validation,
		grid,
		isGrouped,
		virtualized,
		onOpenChangeComplete,
		openOnInputClick,
		itemToStringLabel,
		modal,
		isItemEqualToValue,
		submitOnItemClick,
		hasInputValue,
		inlineProp,
		requestSubmit,
		autoHighlightMode,
		form
	]);
	const hiddenInputRef = useMergedRefs(inputRefProp, validation.inputRef);
	const itemsContextValue = import_react.useMemo(() => ({
		query,
		hasItems,
		filteredItems,
		flatFilteredItems
	}), [
		query,
		hasItems,
		filteredItems,
		flatFilteredItems
	]);
	const serializedValue = import_react.useMemo(() => {
		if (Array.isArray(fieldRawValue)) return "";
		return stringifyAsValue(fieldRawValue, itemToStringValue);
	}, [fieldRawValue, itemToStringValue]);
	const hasMultipleSelection = multiple && Array.isArray(selectedValue) && selectedValue.length > 0;
	const hiddenInputName = multiple || selectionMode === "none" ? void 0 : name;
	const hiddenInputs = import_react.useMemo(() => {
		if (!multiple || !Array.isArray(selectedValue) || !name) return null;
		return selectedValue.map((value) => {
			const currentSerializedValue = stringifyAsValue(value, itemToStringValue);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				form,
				name,
				value: currentSerializedValue
			}, currentSerializedValue);
		});
	}, [
		multiple,
		selectedValue,
		form,
		name,
		itemToStringValue
	]);
	const children = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		props.children,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			...validation.getInputValidationProps({
				onFocus() {
					if (inputInsidePopup) {
						triggerElement?.focus();
						return;
					}
					(inputRef.current || triggerElement)?.focus();
				},
				onChange(event) {
					if (event.nativeEvent.defaultPrevented) return;
					const nextValue = event.currentTarget.value;
					const details = createChangeEventDetails(none, event.nativeEvent);
					function handleChange() {
						if (multiple) return;
						if (selectionMode === "none") {
							setDirty(nextValue !== validityData.initialValue);
							setInputValue(nextValue, details);
							if (shouldValidateOnChange()) validation.commit(nextValue);
							return;
						}
						const matchingValue = valuesRef.current.find((v) => {
							if (stringifyAsValue(v, itemToStringValue).toLowerCase() === nextValue.toLowerCase()) return true;
							if (stringifyAsLabel(v, itemToStringLabel).toLowerCase() === nextValue.toLowerCase()) return true;
							return false;
						});
						if (matchingValue != null) {
							setDirty(matchingValue !== validityData.initialValue);
							setSelectedValue?.(matchingValue, details);
							if (shouldValidateOnChange()) validation.commit(matchingValue);
						}
					}
					if (items) handleChange();
					else {
						forceMount();
						queueMicrotask(handleChange);
					}
				}
			}),
			id: id && hiddenInputName == null ? `${id}-hidden-input` : void 0,
			form,
			name: hiddenInputName,
			autoComplete: formAutoComplete,
			disabled,
			required: required && !hasMultipleSelection,
			readOnly,
			value: serializedValue,
			ref: hiddenInputRef,
			style: hiddenInputName ? visuallyHiddenInput : visuallyHidden,
			tabIndex: -1,
			"aria-hidden": true,
			suppressHydrationWarning: true
		}),
		hiddenInputs
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxRootContext.Provider, {
		value: store,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxFloatingContext.Provider, {
			value: floatingRootContext,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxDerivedItemsContext.Provider, {
				value: itemsContextValue,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxInputValueContext.Provider, {
					value: inputValue,
					children
				})
			})
		})
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/utils/stateAttributesMapping.js
var triggerStateAttributesMapping = {
	...pressableTriggerOpenStateMapping,
	...fieldValidityMapping,
	popupSide: (side) => side ? { "data-popup-side": side } : null,
	listEmpty: (empty) => empty ? { "data-list-empty": "" } : null
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/getPseudoElementBounds.js
function getPseudoElementBounds(element) {
	const elementRect = element.getBoundingClientRect();
	const win = getWindow(element);
	const beforeStyles = win.getComputedStyle(element, "::before");
	const afterStyles = win.getComputedStyle(element, "::after");
	if (!(beforeStyles.content !== "none" || afterStyles.content !== "none")) return elementRect;
	const beforeWidth = parseFloat(beforeStyles.width) || 0;
	const beforeHeight = parseFloat(beforeStyles.height) || 0;
	const afterWidth = parseFloat(afterStyles.width) || 0;
	const afterHeight = parseFloat(afterStyles.height) || 0;
	const totalWidth = Math.max(elementRect.width, beforeWidth, afterWidth);
	const totalHeight = Math.max(elementRect.height, beforeHeight, afterHeight);
	const widthDiff = totalWidth - elementRect.width;
	const heightDiff = totalHeight - elementRect.height;
	return {
		left: elementRect.left - widthDiff / 2,
		right: elementRect.right + widthDiff / 2,
		top: elementRect.top - heightDiff / 2,
		bottom: elementRect.bottom + heightDiff / 2
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/resolveAriaLabelledBy.js
function getDefaultLabelId(id) {
	return id == null ? void 0 : `${id}-label`;
}
function resolveAriaLabelledBy(fieldLabelId, localLabelId) {
	return fieldLabelId ?? localLabelId;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/trigger/ComboboxTrigger.js
var BOUNDARY_OFFSET$1 = 2;
/**
* A button that opens the popup.
* Renders a `<button>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxTrigger = /* @__PURE__ */ import_react.forwardRef(function ComboboxTrigger(componentProps, forwardedRef) {
	const { render, className, nativeButton = true, disabled: disabledProp = false, id: idProp, style, ...elementProps } = componentProps;
	const { state: fieldState, disabled: fieldDisabled, setTouched, setFocused, validationMode, validation } = useFieldRootContext();
	const { labelId: fieldLabelId } = useLabelableContext();
	const store = useComboboxRootContext();
	const { filteredItems } = useComboboxDerivedItemsContext();
	const selectionMode = useStore(store, selectors$4.selectionMode);
	const comboboxDisabled = useStore(store, selectors$4.disabled);
	const readOnly = useStore(store, selectors$4.readOnly);
	const required = useStore(store, selectors$4.required);
	const mounted = useStore(store, selectors$4.mounted);
	const popupSideValue = useStore(store, selectors$4.popupSide);
	const positionerElement = useStore(store, selectors$4.positionerElement);
	const listElement = useStore(store, selectors$4.listElement);
	const triggerProps = useStore(store, selectors$4.triggerProps);
	const triggerElement = useStore(store, selectors$4.triggerElement);
	const inputInsidePopup = useStore(store, selectors$4.inputInsidePopup);
	const rootId = useStore(store, selectors$4.id);
	const comboboxLabelId = useStore(store, selectors$4.labelId);
	const open = useStore(store, selectors$4.open);
	const selectedValue = useStore(store, selectors$4.selectedValue);
	const activeIndex = useStore(store, selectors$4.activeIndex);
	const selectedIndex = useStore(store, selectors$4.selectedIndex);
	const hasSelectedValue = useStore(store, selectors$4.hasSelectedValue);
	const floatingRootContext = useComboboxFloatingContext();
	const inputValue = useComboboxInputValueContext();
	const focusTimeout = useTimeout();
	const disabled = fieldDisabled || comboboxDisabled || disabledProp;
	const listEmpty = filteredItems.length === 0;
	const popupSide = mounted && positionerElement ? popupSideValue : null;
	useLabelableId({ id: inputInsidePopup ? idProp : void 0 });
	const id = inputInsidePopup ? idProp ?? rootId : idProp;
	const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, comboboxLabelId);
	const currentPointerTypeRef = import_react.useRef("");
	function trackPointerType(event) {
		currentPointerTypeRef.current = event.pointerType;
	}
	const domReference = floatingRootContext.useState("domReferenceElement");
	import_react.useEffect(() => {
		if (!inputInsidePopup) return;
		if (triggerElement && triggerElement !== domReference) floatingRootContext.set("domReferenceElement", triggerElement);
	}, [
		triggerElement,
		domReference,
		floatingRootContext,
		inputInsidePopup
	]);
	const { reference: triggerTypeaheadProps } = useTypeahead(floatingRootContext, {
		enabled: !open && !readOnly && !comboboxDisabled && selectionMode === "single",
		listRef: store.state.labelsRef,
		activeIndex,
		selectedIndex,
		onMatch(index) {
			const nextSelectedValue = store.state.valuesRef.current[index];
			if (nextSelectedValue !== void 0) store.state.setSelectedValue(nextSelectedValue, createChangeEventDetails("none"));
		}
	});
	const { reference: triggerClickProps } = useClick(floatingRootContext, {
		enabled: !readOnly && !comboboxDisabled,
		event: "mousedown"
	});
	const { buttonRef, getButtonProps } = useButton({
		native: nativeButton,
		disabled
	});
	const state = {
		...fieldState,
		open,
		disabled,
		popupSide,
		listEmpty,
		placeholder: selectionMode === "none" ? false : !hasSelectedValue
	};
	return useRenderElement("button", componentProps, {
		ref: [
			forwardedRef,
			buttonRef,
			useStableCallback((element) => {
				store.set("triggerElement", element);
			})
		],
		state,
		props: [
			triggerProps,
			triggerClickProps,
			triggerTypeaheadProps,
			{
				id,
				tabIndex: inputInsidePopup ? 0 : -1,
				role: inputInsidePopup ? "combobox" : void 0,
				"aria-expanded": open ? "true" : "false",
				"aria-haspopup": inputInsidePopup ? "dialog" : "listbox",
				"aria-controls": open ? listElement?.id : void 0,
				"aria-required": inputInsidePopup ? required || void 0 : void 0,
				"aria-labelledby": ariaLabelledBy,
				onPointerDown: trackPointerType,
				onPointerEnter: trackPointerType,
				onFocus() {
					setFocused(true);
					if (disabled || readOnly) return;
					focusTimeout.start(0, store.state.forceMount);
				},
				onBlur(event) {
					if (contains(positionerElement, event.relatedTarget)) return;
					setTouched(true);
					setFocused(false);
					if (validationMode === "onBlur") {
						const valueToValidate = selectionMode === "none" ? inputValue : selectedValue;
						validation.commit(valueToValidate);
					}
				},
				onMouseDown(event) {
					if (disabled || readOnly) return;
					if (!inputInsidePopup) floatingRootContext.set("domReferenceElement", event.currentTarget);
					store.state.forceMount();
					if (currentPointerTypeRef.current !== "touch") {
						store.state.inputRef.current?.focus();
						if (!inputInsidePopup) event.preventDefault();
					}
					if (open) return;
					const doc = ownerDocument(event.currentTarget);
					function handleMouseUp(mouseEvent) {
						if (!triggerElement) return;
						const mouseUpTarget = getTarget(mouseEvent);
						const positioner = store.state.positionerElement;
						const list = store.state.listElement;
						if (contains(triggerElement, mouseUpTarget) || contains(positioner, mouseUpTarget) || contains(list, mouseUpTarget) || mouseUpTarget === triggerElement) return;
						const bounds = getPseudoElementBounds(triggerElement);
						const withinHorizontal = mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET$1 && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET$1;
						const withinVertical = mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET$1 && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET$1;
						if (withinHorizontal && withinVertical) return;
						store.state.setOpen(false, createChangeEventDetails("cancel-open", mouseEvent));
					}
					if (inputInsidePopup) doc.addEventListener("mouseup", handleMouseUp, { once: true });
				},
				onKeyDown(event) {
					if (disabled || readOnly) return;
					if (event.key === "ArrowDown" || event.key === "ArrowUp") {
						stopEvent(event);
						store.state.setOpen(true, createChangeEventDetails(listNavigation, event.nativeEvent));
						store.state.inputRef.current?.focus();
					}
				}
			},
			validation ? validation.getValidationProps(elementProps) : elementProps,
			getButtonProps
		],
		stateAttributesMapping: triggerStateAttributesMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/chips/ComboboxChipsContext.js
var ComboboxChipsContext = /* @__PURE__ */ import_react.createContext(void 0);
function useComboboxChipsContext() {
	return import_react.useContext(ComboboxChipsContext);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositionerContext.js
var ComboboxPositionerContext = /* @__PURE__ */ import_react.createContext(void 0);
function useComboboxPositionerContext(optional) {
	const context = import_react.useContext(ComboboxPositionerContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(21));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/utils/ComboboxInternalDismissButton.js
/**
* @internal
*/
var ComboboxInternalDismissButton = /* @__PURE__ */ import_react.forwardRef(function ComboboxInternalDismissButton(_, forwardedRef) {
	const store = useComboboxRootContext();
	const { buttonRef, getButtonProps } = useButton({ native: false });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: useMergedRefs(forwardedRef, buttonRef),
		...getButtonProps({ onClick: useStableCallback((event) => {
			store.state.setOpen(false, createChangeEventDetails(closePress, event.nativeEvent, event.currentTarget));
		}) }),
		"aria-label": "Dismiss",
		tabIndex: void 0,
		style: visuallyHiddenInput
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/input/ComboboxInput.js
/**
* A text input to search for items in the list.
* Renders an `<input>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxInput = /* @__PURE__ */ import_react.forwardRef(function ComboboxInput(componentProps, forwardedRef) {
	const { render, className, disabled: disabledProp = false, id: idProp, style, ...elementProps } = componentProps;
	const { state: fieldState, disabled: fieldDisabled, setTouched, setFocused, validationMode, validation } = useFieldRootContext();
	const { labelId: fieldLabelId } = useLabelableContext();
	const comboboxChipsContext = useComboboxChipsContext();
	const positioning = useComboboxPositionerContext(true);
	const hasPositionerParent = Boolean(positioning);
	const store = useComboboxRootContext();
	const { filteredItems } = useComboboxDerivedItemsContext();
	const inputValue = useComboboxInputValueContext();
	const direction = useDirection();
	const required = useStore(store, selectors$4.required);
	const comboboxDisabled = useStore(store, selectors$4.disabled);
	const readOnly = useStore(store, selectors$4.readOnly);
	const name = useStore(store, selectors$4.name);
	const form = useStore(store, selectors$4.form);
	const selectionMode = useStore(store, selectors$4.selectionMode);
	const autoHighlightMode = useStore(store, selectors$4.autoHighlight);
	const inputProps = useStore(store, selectors$4.inputProps);
	const triggerProps = useStore(store, selectors$4.triggerProps);
	const open = useStore(store, selectors$4.open);
	const mounted = useStore(store, selectors$4.mounted);
	const selectedValue = useStore(store, selectors$4.selectedValue);
	const popupSideValue = useStore(store, selectors$4.popupSide);
	const positionerElement = useStore(store, selectors$4.positionerElement);
	const rootId = useStore(store, selectors$4.id);
	const inline = useStore(store, selectors$4.inline);
	const modal = useStore(store, selectors$4.modal);
	const autoHighlightEnabled = Boolean(autoHighlightMode);
	const popupSide = mounted && positionerElement ? popupSideValue : null;
	const disabled = fieldDisabled || comboboxDisabled || disabledProp;
	const listEmpty = filteredItems.length === 0;
	const isInsidePopup = hasPositionerParent || inline;
	const focusManagerModal = !isInsidePopup || modal;
	const id = useBaseUiId(idProp ?? (!isInsidePopup ? rootId : void 0));
	const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, void 0);
	const fieldStateForInput = hasPositionerParent ? DEFAULT_FIELD_STATE_ATTRIBUTES : fieldState;
	const [composingValue, setComposingValue] = import_react.useState(null);
	const isComposingRef = import_react.useRef(false);
	const lastActiveIndexRef = import_react.useRef(null);
	const shouldRestoreActiveIndexRef = import_react.useRef(false);
	const setInputElement = useStableCallback((element) => {
		const nextIsInsidePopup = hasPositionerParent || store.state.inline;
		if (nextIsInsidePopup && !store.state.hasInputValue) store.state.setInputValue("", createChangeEventDetails(none));
		store.update({
			inputElement: element,
			inputInsidePopup: nextIsInsidePopup
		});
	});
	const validationProps = hasPositionerParent || !validation ? elementProps : validation.getValidationProps(elementProps);
	const state = {
		...fieldStateForInput,
		open,
		disabled,
		readOnly,
		popupSide,
		listEmpty
	};
	function handleKeyDown(event) {
		if (!comboboxChipsContext) return;
		let nextIndex;
		const { highlightedChipIndex } = comboboxChipsContext;
		const renderedChipsCount = comboboxChipsContext.chipsRef.current.length;
		if (highlightedChipIndex !== void 0) {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				if (highlightedChipIndex > 0) nextIndex = highlightedChipIndex - 1;
				else nextIndex = void 0;
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				if (highlightedChipIndex < renderedChipsCount - 1) nextIndex = highlightedChipIndex + 1;
				else nextIndex = void 0;
			} else if (event.key === "Backspace" || event.key === "Delete") {
				event.preventDefault();
				const computedNextIndex = highlightedChipIndex >= selectedValue.length - 1 ? selectedValue.length - 2 : highlightedChipIndex;
				nextIndex = computedNextIndex >= 0 ? computedNextIndex : void 0;
				store.state.setIndices({
					activeIndex: null,
					selectedIndex: null,
					type: "keyboard"
				});
			}
			return nextIndex;
		}
		if (event.key === "ArrowLeft" && (event.currentTarget.selectionStart ?? 0) === 0 && selectedValue.length > 0) {
			event.preventDefault();
			nextIndex = renderedChipsCount > 0 ? renderedChipsCount - 1 : void 0;
		} else if (event.key === "Backspace" && event.currentTarget.value === "" && selectedValue.length > 0) {
			store.state.setIndices({
				activeIndex: null,
				selectedIndex: null,
				type: "keyboard"
			});
			event.preventDefault();
		}
		return nextIndex;
	}
	const element = useRenderElement("input", componentProps, {
		state,
		ref: [
			forwardedRef,
			store.state.inputRef,
			setInputElement
		],
		props: [
			inputProps,
			triggerProps,
			{
				type: "text",
				value: componentProps.value ?? composingValue ?? inputValue,
				"aria-readonly": readOnly || void 0,
				"aria-required": required || void 0,
				"aria-labelledby": ariaLabelledBy,
				disabled,
				readOnly,
				required: selectionMode === "none" ? required : void 0,
				form,
				...selectionMode === "none" && name && { name },
				id,
				onFocus() {
					setFocused(true);
					if (!inline || !shouldRestoreActiveIndexRef.current) return;
					shouldRestoreActiveIndexRef.current = false;
					const nextActiveIndex = lastActiveIndexRef.current;
					if (nextActiveIndex == null || !Object.hasOwn(store.state.valuesRef.current, nextActiveIndex)) return;
					store.state.setIndices({ activeIndex: nextActiveIndex });
				},
				onBlur() {
					setTouched(true);
					setFocused(false);
					const activeIndex = store.state.activeIndex;
					if (inline && activeIndex !== null && autoHighlightMode !== "always") {
						lastActiveIndexRef.current = activeIndex;
						shouldRestoreActiveIndexRef.current = true;
						store.state.setIndices({ activeIndex: null });
					}
					if (validationMode === "onBlur") {
						const valueToValidate = selectionMode === "none" ? inputValue : selectedValue;
						validation.commit(valueToValidate);
					}
				},
				onCompositionStart(event) {
					if (isAndroid) return;
					isComposingRef.current = true;
					setComposingValue(event.currentTarget.value);
				},
				onCompositionEnd(event) {
					isComposingRef.current = false;
					const next = event.currentTarget.value;
					setComposingValue(null);
					store.state.setInputValue(next, createChangeEventDetails(inputChange, event.nativeEvent));
				},
				onChange(event) {
					const inputType = event.nativeEvent.inputType;
					const autofillLikeInput = !inputType || inputType === "insertReplacementText";
					const shouldOpenOnInput = isComposingRef.current || !autofillLikeInput;
					if (isComposingRef.current) {
						const nextVal = event.currentTarget.value;
						setComposingValue(nextVal);
						if (nextVal === "" && !store.state.openOnInputClick && !store.state.inputInsidePopup) store.state.setOpen(false, createChangeEventDetails(inputClear, event.nativeEvent));
						const trimmed = nextVal.trim();
						const shouldMaintainHighlight = autoHighlightEnabled && trimmed !== "";
						if (!readOnly && !disabled && trimmed) {
							if (shouldOpenOnInput) {
								store.state.setOpen(true, createChangeEventDetails(inputChange, event.nativeEvent));
								if (!autoHighlightEnabled) store.state.setIndices({
									activeIndex: null,
									selectedIndex: null,
									type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
								});
							}
						}
						if (open && store.state.activeIndex !== null && !shouldMaintainHighlight) store.state.setIndices({
							activeIndex: null,
							selectedIndex: null,
							type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
						});
						return;
					}
					store.state.setInputValue(event.currentTarget.value, createChangeEventDetails(inputChange, event.nativeEvent));
					const empty = event.currentTarget.value === "";
					const clearDetails = createChangeEventDetails(inputClear, event.nativeEvent);
					if (empty && !store.state.inputInsidePopup) {
						if (selectionMode === "single") store.state.setSelectedValue(null, clearDetails);
						if (!store.state.openOnInputClick) store.state.setOpen(false, clearDetails);
					}
					const trimmed = event.currentTarget.value.trim();
					if (!readOnly && !disabled && trimmed) {
						if (shouldOpenOnInput) {
							store.state.setOpen(true, createChangeEventDetails(inputChange, event.nativeEvent));
							if (!autoHighlightEnabled) store.state.setIndices({
								activeIndex: null,
								selectedIndex: null,
								type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
							});
						}
					}
					if (open && store.state.activeIndex !== null && !autoHighlightEnabled) store.state.setIndices({
						activeIndex: null,
						selectedIndex: null,
						type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
					});
				},
				onKeyDown(event) {
					if (disabled || readOnly) return;
					if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return;
					store.state.keyboardActiveRef.current = true;
					const input = event.currentTarget;
					const scrollAmount = input.scrollWidth - input.clientWidth;
					const isRTL = direction === "rtl";
					if (event.key === "Home") {
						stopEvent(event);
						const cursor = isFirefox && isRTL ? input.value.length : 0;
						input.setSelectionRange(cursor, cursor);
						input.scrollLeft = 0;
						return;
					}
					if (event.key === "End") {
						stopEvent(event);
						const cursor = isFirefox && isRTL ? 0 : input.value.length;
						input.setSelectionRange(cursor, cursor);
						input.scrollLeft = isRTL ? -scrollAmount : scrollAmount;
						return;
					}
					if (!mounted && event.key === "Escape") {
						const isClear = selectionMode === "multiple" && Array.isArray(selectedValue) ? selectedValue.length === 0 : selectedValue === null;
						const details = createChangeEventDetails(escapeKey, event.nativeEvent);
						const value = selectionMode === "multiple" ? [] : null;
						store.state.setInputValue("", details);
						store.state.setSelectedValue(value, details);
						if (!isClear && !store.state.inline && !details.isPropagationAllowed) event.stopPropagation();
						return;
					}
					if (comboboxChipsContext && event.key === "Backspace" && input.value === "" && comboboxChipsContext.highlightedChipIndex === void 0 && Array.isArray(selectedValue) && selectedValue.length > 0) {
						const renderedChipsCount = comboboxChipsContext.chipsRef.current.length;
						const removalIndex = renderedChipsCount > 0 ? renderedChipsCount - 1 : selectedValue.length - 1;
						const newValue = selectedValue.filter((_, index) => index !== removalIndex);
						store.state.setIndices({
							activeIndex: null,
							selectedIndex: null,
							type: store.state.keyboardActiveRef.current ? "keyboard" : "pointer"
						});
						store.state.setSelectedValue(newValue, createChangeEventDetails(none, event.nativeEvent));
						return;
					}
					const hadHighlightedChip = comboboxChipsContext?.highlightedChipIndex !== void 0;
					const nextIndex = handleKeyDown(event);
					comboboxChipsContext?.setHighlightedChipIndex(nextIndex);
					if (nextIndex !== void 0) comboboxChipsContext?.chipsRef.current[nextIndex]?.focus();
					else if (hadHighlightedChip) store.state.inputRef.current?.focus();
					if (event.which === 229) return;
					if (event.key === "Enter" && open) {
						const activeIndex = store.state.activeIndex;
						const nativeEvent = event.nativeEvent;
						if (activeIndex === null) {
							if (inline) return;
							store.state.setOpen(false, createChangeEventDetails(none, nativeEvent));
							return;
						}
						stopEvent(event);
						const listItem = store.state.listRef.current[activeIndex];
						if (listItem) {
							store.state.selectionEventRef.current = nativeEvent;
							listItem.click();
							store.state.selectionEventRef.current = null;
						}
					}
				},
				onPointerMove() {
					store.state.keyboardActiveRef.current = false;
				},
				onPointerDown() {
					store.state.keyboardActiveRef.current = false;
				}
			},
			validationProps
		],
		stateAttributesMapping: triggerStateAttributesMapping
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [open && focusManagerModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxInternalDismissButton, { ref: store.state.startDismissRef }), element] });
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/clear/ComboboxClear.js
var stateAttributesMapping$8 = {
	...transitionStatusMapping,
	...triggerOpenStateMapping$1
};
/**
* Clears the value when clicked.
* Renders a `<button>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxClear = /* @__PURE__ */ import_react.forwardRef(function ComboboxClear(componentProps, forwardedRef) {
	const { render, className, disabled: disabledProp = false, nativeButton = true, keepMounted = false, style, ...elementProps } = componentProps;
	const { disabled: fieldDisabled } = useFieldRootContext();
	const store = useComboboxRootContext();
	const selectionMode = useStore(store, selectors$4.selectionMode);
	const comboboxDisabled = useStore(store, selectors$4.disabled);
	const readOnly = useStore(store, selectors$4.readOnly);
	const open = useStore(store, selectors$4.open);
	const selectedValue = useStore(store, selectors$4.selectedValue);
	const hasSelectionChips = useStore(store, selectors$4.hasSelectionChips);
	const inputValue = useComboboxInputValueContext();
	let visible = false;
	if (selectionMode === "none") visible = inputValue !== "";
	else if (selectionMode === "single") visible = selectedValue != null;
	else visible = hasSelectionChips;
	const disabled = fieldDisabled || comboboxDisabled || disabledProp;
	const { buttonRef, getButtonProps } = useButton({
		native: nativeButton,
		disabled
	});
	const { mounted, transitionStatus, setMounted } = useTransitionStatus(visible);
	const state = {
		disabled,
		open,
		transitionStatus
	};
	useOpenChangeComplete({
		open: visible,
		ref: store.state.clearRef,
		onComplete() {
			if (!visible) setMounted(false);
		}
	});
	const element = useRenderElement("button", componentProps, {
		state,
		ref: [
			forwardedRef,
			buttonRef,
			store.state.clearRef
		],
		props: [
			{
				tabIndex: -1,
				children: "x",
				onMouseDown(event) {
					event.preventDefault();
				},
				onClick(event) {
					if (disabled || readOnly) return;
					const keyboardActiveRef = store.state.keyboardActiveRef;
					store.state.setInputValue("", createChangeEventDetails(clearPress, event.nativeEvent));
					if (selectionMode !== "none") {
						store.state.setSelectedValue(Array.isArray(selectedValue) ? [] : null, createChangeEventDetails(clearPress, event.nativeEvent));
						store.state.setIndices({
							activeIndex: null,
							selectedIndex: null,
							type: keyboardActiveRef.current ? "keyboard" : "pointer"
						});
					} else store.state.setIndices({
						activeIndex: null,
						type: keyboardActiveRef.current ? "keyboard" : "pointer"
					});
					store.state.inputRef.current?.focus();
				}
			},
			elementProps,
			getButtonProps
		],
		stateAttributesMapping: stateAttributesMapping$8
	});
	if (!(keepMounted || mounted)) return null;
	return element;
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/collection/GroupCollectionContext.js
var GroupCollectionContext = /* @__PURE__ */ import_react.createContext(null);
function useGroupCollectionContext() {
	return import_react.useContext(GroupCollectionContext);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/collection/ComboboxCollection.js
/**
* Renders filtered list items.
* Doesn't render its own HTML element.
*
* If rendering a flat list, pass a function child to the `List` component instead, which implicitly wraps it.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
function ComboboxCollection(props) {
	const { children } = props;
	const { filteredItems } = useComboboxDerivedItemsContext();
	const groupContext = useGroupCollectionContext();
	const itemsToRender = groupContext ? groupContext.items : filteredItems;
	if (!itemsToRender) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: itemsToRender.map(children) });
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/list/ComboboxList.js
/**
* A list container for the items.
* Renders a `<div>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxList = /* @__PURE__ */ import_react.forwardRef(function ComboboxList(componentProps, forwardedRef) {
	var _ComboboxCollection;
	const { render, className, style, children, ...elementProps } = componentProps;
	const store = useComboboxRootContext();
	const floatingRootContext = useComboboxFloatingContext();
	const hasPositionerContext = Boolean(useComboboxPositionerContext(true));
	const { filteredItems, hasItems } = useComboboxDerivedItemsContext();
	const selectionMode = useStore(store, selectors$4.selectionMode);
	const grid = useStore(store, selectors$4.grid);
	const popupProps = useStore(store, selectors$4.popupProps);
	const virtualized = useStore(store, selectors$4.virtualized);
	const multiple = selectionMode === "multiple";
	const empty = filteredItems.length === 0;
	const setPositionerElement = useStableCallback((element) => {
		store.set("positionerElement", element);
	});
	const setListElement = useStableCallback((element) => {
		store.set("listElement", element);
	});
	const resolvedChildren = import_react.useMemo(() => {
		if (typeof children === "function") return _ComboboxCollection || (_ComboboxCollection = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxCollection, { children }));
		return children;
	}, [children]);
	const state = { empty };
	const floatingId = floatingRootContext.useState("floatingId");
	const element = useRenderElement("div", componentProps, {
		state,
		ref: [
			forwardedRef,
			setListElement,
			hasPositionerContext ? null : setPositionerElement
		],
		props: [
			popupProps,
			{
				children: resolvedChildren,
				tabIndex: -1,
				id: floatingId,
				role: grid ? "grid" : "listbox",
				"aria-multiselectable": multiple ? "true" : void 0,
				onKeyDown(event) {
					if (store.state.disabled || store.state.readOnly) return;
					if (event.key === "Enter") {
						const activeIndex = store.state.activeIndex;
						if (activeIndex == null) return;
						stopEvent(event);
						const nativeEvent = event.nativeEvent;
						const listItem = store.state.listRef.current[activeIndex];
						if (listItem) {
							store.state.selectionEventRef.current = nativeEvent;
							listItem.click();
							store.state.selectionEventRef.current = null;
						}
					}
				},
				onKeyDownCapture() {
					store.state.keyboardActiveRef.current = true;
				},
				onPointerMoveCapture() {
					store.state.keyboardActiveRef.current = false;
				}
			},
			elementProps
		]
	});
	if (virtualized) return element;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeList, {
		elementsRef: store.state.listRef,
		labelsRef: hasItems ? void 0 : store.state.labelsRef,
		children: element
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/utils/useInitialLiveRegionTextMutation.js
var LIVE_REGION_MARKER = "⁠";
function findLastTextNode(root) {
	const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	let lastTextNode = null;
	while (walker.nextNode()) {
		const textNode = walker.currentNode;
		if (textNode.nodeValue !== "") lastTextNode = textNode;
	}
	return lastTextNode;
}
function useInitialLiveRegionTextMutation() {
	const timeout = useTimeout();
	const rootRef = import_react.useRef(null);
	import_react.useEffect(() => {
		if (isIOS) return;
		const root = rootRef.current;
		if (root == null) return;
		const textNode = findLastTextNode(root);
		if (textNode == null) return;
		const originalValue = textNode.nodeValue ?? "";
		const markedValue = `${originalValue}${LIVE_REGION_MARKER}`;
		textNode.nodeValue = markedValue;
		timeout.start(200, () => {
			if (textNode.nodeValue === markedValue) textNode.nodeValue = originalValue;
		});
		return () => {
			timeout.clear();
			if (textNode.nodeValue === markedValue) textNode.nodeValue = originalValue;
		};
	}, [rootRef, timeout]);
	return rootRef;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/portal/ComboboxPortalContext.js
var ComboboxPortalContext = /* @__PURE__ */ import_react.createContext(void 0);
function useComboboxPortalContext() {
	const context = import_react.useContext(ComboboxPortalContext);
	if (context === void 0) throw new Error(formatErrorMessage(20));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/portal/ComboboxPortal.js
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxPortal = /* @__PURE__ */ import_react.forwardRef(function ComboboxPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	const store = useComboboxRootContext();
	const mounted = useStore(store, selectors$4.mounted);
	const forceMounted = useStore(store, selectors$4.forceMounted);
	if (!(mounted || keepMounted || forceMounted)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxPortalContext.Provider, {
		value: keepMounted,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortal, {
			ref: forwardedRef,
			...portalProps
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/floating-ui-react/middleware/arrow.js
/**
* Fork of the original `arrow` middleware from Floating UI that allows
* configuring the offset parent.
*/
var baseArrow = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0, offsetParent = "real" } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = offsetParent === "real" ? await platform.getOffsetParent?.(element) : elements.floating;
		let clientSize = elements.floating[clientProp] || rects.floating[length];
		if (!clientSize || !await platform.isElement?.(arrowOffsetParent)) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = Math.min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = Math.min(paddingObject[maxProp], largestPossiblePadding);
		const min = minPadding;
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp$1(min, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < min ? center - min : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* This wraps the core `arrow` middleware to allow React refs as the element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow = (options, deps) => ({
	...baseArrow(options),
	options: [options, deps]
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/hideMiddleware.js
var hide = {
	name: "hide",
	async fn(state) {
		const { width, height, x, y } = state.rects.reference;
		const anchorHidden = width === 0 && height === 0 && x === 0 && y === 0;
		return { data: { referenceHidden: (await hide$1().fn(state)).data?.referenceHidden || anchorHidden } };
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/adaptiveOriginMiddleware.js
var DEFAULT_SIDES = {
	sideX: "left",
	sideY: "top"
};
var adaptiveOrigin = {
	name: "adaptiveOrigin",
	async fn(state) {
		const { x: rawX, y: rawY, rects: { floating: floatRect }, elements: { floating }, platform, strategy, placement } = state;
		const win = getWindow(floating);
		const styles = win.getComputedStyle(floating);
		if (!(styles.transitionDuration !== "0s" && styles.transitionDuration !== "")) return {
			x: rawX,
			y: rawY,
			data: DEFAULT_SIDES
		};
		const offsetParent = await platform.getOffsetParent?.(floating);
		let offsetDimensions = {
			width: 0,
			height: 0
		};
		if (strategy === "fixed" && win?.visualViewport) offsetDimensions = {
			width: win.visualViewport.width,
			height: win.visualViewport.height
		};
		else if (offsetParent === win) {
			const doc = ownerDocument(floating);
			offsetDimensions = {
				width: doc.documentElement.clientWidth,
				height: doc.documentElement.clientHeight
			};
		} else if (await platform.isElement?.(offsetParent)) offsetDimensions = await platform.getDimensions(offsetParent);
		const currentSide = getSide(placement);
		let x = rawX;
		let y = rawY;
		if (currentSide === "left") x = offsetDimensions.width - (rawX + floatRect.width);
		if (currentSide === "top") y = offsetDimensions.height - (rawY + floatRect.height);
		const sideX = currentSide === "left" ? "right" : DEFAULT_SIDES.sideX;
		const sideY = currentSide === "top" ? "bottom" : DEFAULT_SIDES.sideY;
		return {
			x,
			y,
			data: {
				sideX,
				sideY
			}
		};
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/useAnchorPositioning.js
function getLogicalSide(sideParam, renderedSide, isRtl) {
	const isLogicalSideParam = sideParam === "inline-start" || sideParam === "inline-end";
	return {
		top: "top",
		right: isLogicalSideParam ? isRtl ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: isLogicalSideParam ? isRtl ? "inline-end" : "inline-start" : "left"
	}[renderedSide];
}
function getOffsetData(state, sideParam, isRtl) {
	const { rects, placement } = state;
	return {
		side: getLogicalSide(sideParam, getSide(placement), isRtl),
		align: getAlignment(placement) || "center",
		anchor: {
			width: rects.reference.width,
			height: rects.reference.height
		},
		positioner: {
			width: rects.floating.width,
			height: rects.floating.height
		}
	};
}
/**
* Provides standardized anchor positioning behavior for floating elements. Wraps Floating UI's
* `useFloating` hook.
*/
function useAnchorPositioning(params) {
	const { anchor, positionMethod = "absolute", side: sideParam = "bottom", sideOffset = 0, align = "center", alignOffset = 0, collisionBoundary, collisionPadding: collisionPaddingParam = 5, sticky = false, arrowPadding = 5, disableAnchorTracking = false, keepMounted = false, floatingRootContext, mounted, collisionAvoidance, shiftCrossAxis = false, nodeId, adaptiveOrigin, lazyFlip = false, externalTree } = params;
	const [mountSide, setMountSide] = import_react.useState(null);
	if (!mounted && mountSide !== null) setMountSide(null);
	const collisionAvoidanceSide = collisionAvoidance.side || "flip";
	const collisionAvoidanceAlign = collisionAvoidance.align || "flip";
	const collisionAvoidanceFallbackAxisSide = collisionAvoidance.fallbackAxisSide || "end";
	const anchorFn = typeof anchor === "function" ? anchor : void 0;
	const anchorFnCallback = useStableCallback(anchorFn);
	const anchorDep = anchorFn ? anchorFnCallback : anchor;
	const anchorValueRef = useValueAsRef(anchor);
	const mountedRef = useValueAsRef(mounted);
	const isRtl = useDirection() === "rtl";
	const side = mountSide || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": isRtl ? "left" : "right",
		"inline-start": isRtl ? "right" : "left"
	}[sideParam];
	const placement = align === "center" ? side : `${side}-${align}`;
	let collisionPadding = collisionPaddingParam;
	const bias = 1;
	const biasTop = sideParam === "bottom" ? bias : 0;
	const biasBottom = sideParam === "top" ? bias : 0;
	const biasLeft = sideParam === "right" ? bias : 0;
	const biasRight = sideParam === "left" ? bias : 0;
	if (typeof collisionPadding === "number") collisionPadding = {
		top: collisionPadding + biasTop,
		right: collisionPadding + biasRight,
		bottom: collisionPadding + biasBottom,
		left: collisionPadding + biasLeft
	};
	else if (collisionPadding) collisionPadding = {
		top: (collisionPadding.top || 0) + biasTop,
		right: (collisionPadding.right || 0) + biasRight,
		bottom: (collisionPadding.bottom || 0) + biasBottom,
		left: (collisionPadding.left || 0) + biasLeft
	};
	const commonCollisionProps = {
		boundary: collisionBoundary === "clipping-ancestors" ? "clippingAncestors" : collisionBoundary,
		padding: collisionPadding
	};
	const arrowRef = import_react.useRef(null);
	const sideOffsetRef = useValueAsRef(sideOffset);
	const alignOffsetRef = useValueAsRef(alignOffset);
	const middleware = [offset((state) => {
		const data = getOffsetData(state, sideParam, isRtl);
		const sideAxis = typeof sideOffsetRef.current === "function" ? sideOffsetRef.current(data) : sideOffsetRef.current;
		const alignAxis = typeof alignOffsetRef.current === "function" ? alignOffsetRef.current(data) : alignOffsetRef.current;
		return {
			mainAxis: sideAxis,
			crossAxis: alignAxis,
			alignmentAxis: alignAxis
		};
	}, [
		typeof sideOffset !== "function" ? sideOffset : 0,
		typeof alignOffset !== "function" ? alignOffset : 0,
		isRtl,
		sideParam
	])];
	const shiftDisabled = collisionAvoidanceAlign === "none" && collisionAvoidanceSide !== "shift";
	const crossAxisShiftEnabled = !shiftDisabled && (sticky || shiftCrossAxis || collisionAvoidanceSide === "shift");
	const flipMiddleware = collisionAvoidanceSide === "none" ? null : flip({
		...commonCollisionProps,
		padding: {
			top: collisionPadding.top + bias,
			right: collisionPadding.right + bias,
			bottom: collisionPadding.bottom + bias,
			left: collisionPadding.left + bias
		},
		mainAxis: !shiftCrossAxis && collisionAvoidanceSide === "flip",
		crossAxis: collisionAvoidanceAlign === "flip" ? "alignment" : false,
		fallbackAxisSideDirection: collisionAvoidanceFallbackAxisSide
	});
	const shiftMiddleware = shiftDisabled ? null : shift((data) => {
		const html = ownerDocument(data.elements.floating).documentElement;
		return {
			...commonCollisionProps,
			rootBoundary: shiftCrossAxis ? {
				x: 0,
				y: 0,
				width: html.clientWidth,
				height: html.clientHeight
			} : void 0,
			mainAxis: collisionAvoidanceAlign !== "none",
			crossAxis: crossAxisShiftEnabled,
			limiter: sticky || shiftCrossAxis ? void 0 : limitShift((limitData) => {
				if (!arrowRef.current) return {};
				const { width, height } = arrowRef.current.getBoundingClientRect();
				const sideAxis = getSideAxis(getSide(limitData.placement));
				const arrowSize = sideAxis === "y" ? width : height;
				const offsetAmount = sideAxis === "y" ? collisionPadding.left + collisionPadding.right : collisionPadding.top + collisionPadding.bottom;
				return { offset: arrowSize / 2 + offsetAmount / 2 };
			})
		};
	}, [
		commonCollisionProps,
		sticky,
		shiftCrossAxis,
		collisionPadding,
		collisionAvoidanceAlign
	]);
	if (collisionAvoidanceSide === "shift" || collisionAvoidanceAlign === "shift" || align === "center") middleware.push(shiftMiddleware, flipMiddleware);
	else middleware.push(flipMiddleware, shiftMiddleware);
	middleware.push(size({
		...commonCollisionProps,
		apply({ elements: { floating }, availableWidth, availableHeight, rects }) {
			if (!mountedRef.current) return;
			const floatingStyle = floating.style;
			floatingStyle.setProperty("--available-width", `${availableWidth}px`);
			floatingStyle.setProperty("--available-height", `${availableHeight}px`);
			const dpr = getWindow(floating).devicePixelRatio || 1;
			const { x, y, width, height } = rects.reference;
			const anchorWidth = (Math.round((x + width) * dpr) - Math.round(x * dpr)) / dpr;
			const anchorHeight = (Math.round((y + height) * dpr) - Math.round(y * dpr)) / dpr;
			floatingStyle.setProperty("--anchor-width", `${anchorWidth}px`);
			floatingStyle.setProperty("--anchor-height", `${anchorHeight}px`);
		}
	}), arrow(() => ({
		element: arrowRef.current || ownerDocument(arrowRef.current).createElement("div"),
		padding: arrowPadding,
		offsetParent: "floating"
	}), [arrowPadding]), {
		name: "transformOrigin",
		fn(state) {
			const { elements, middlewareData, placement: renderedPlacement, rects, y } = state;
			const currentRenderedSide = getSide(renderedPlacement);
			const currentRenderedAxis = getSideAxis(currentRenderedSide);
			const arrowEl = arrowRef.current;
			const arrowX = middlewareData.arrow?.x || 0;
			const arrowY = middlewareData.arrow?.y || 0;
			const arrowWidth = arrowEl?.clientWidth || 0;
			const arrowHeight = arrowEl?.clientHeight || 0;
			const transformX = arrowX + arrowWidth / 2;
			const transformY = arrowY + arrowHeight / 2;
			const shiftY = Math.abs(middlewareData.shift?.y || 0);
			const halfAnchorHeight = rects.reference.height / 2;
			const sideOffsetValue = typeof sideOffset === "function" ? sideOffset(getOffsetData(state, sideParam, isRtl)) : sideOffset;
			const isOverlappingAnchor = shiftY > sideOffsetValue;
			const adjacentTransformOrigin = {
				top: `${transformX}px calc(100% + ${sideOffsetValue}px)`,
				bottom: `${transformX}px ${-sideOffsetValue}px`,
				left: `calc(100% + ${sideOffsetValue}px) ${transformY}px`,
				right: `${-sideOffsetValue}px ${transformY}px`
			}[currentRenderedSide];
			const overlapTransformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y}px`;
			elements.floating.style.setProperty("--transform-origin", crossAxisShiftEnabled && currentRenderedAxis === "y" && isOverlappingAnchor ? overlapTransformOrigin : adjacentTransformOrigin);
			return {};
		}
	}, hide, adaptiveOrigin);
	useIsoLayoutEffect(() => {
		if (!mounted && floatingRootContext) floatingRootContext.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [mounted, floatingRootContext]);
	const autoUpdateOptions = import_react.useMemo(() => ({
		elementResize: !disableAnchorTracking && typeof ResizeObserver !== "undefined",
		layoutShift: !disableAnchorTracking && typeof IntersectionObserver !== "undefined"
	}), [disableAnchorTracking]);
	const { refs, elements, x, y, middlewareData, update, placement: renderedPlacement, context, isPositioned, floatingStyles: originalFloatingStyles } = useFloating({
		rootContext: floatingRootContext,
		open: keepMounted ? mounted : void 0,
		placement,
		middleware,
		strategy: positionMethod,
		whileElementsMounted: keepMounted ? void 0 : (...args) => autoUpdate(...args, autoUpdateOptions),
		nodeId,
		externalTree
	});
	const { sideX, sideY } = middlewareData.adaptiveOrigin || DEFAULT_SIDES;
	const resolvedPosition = isPositioned ? positionMethod : "fixed";
	const floatingStyles = import_react.useMemo(() => {
		const base = adaptiveOrigin ? {
			position: resolvedPosition,
			[sideX]: x,
			[sideY]: y
		} : {
			position: resolvedPosition,
			...originalFloatingStyles
		};
		if (!isPositioned) base.opacity = 0;
		return base;
	}, [
		adaptiveOrigin,
		resolvedPosition,
		sideX,
		x,
		sideY,
		y,
		originalFloatingStyles,
		isPositioned
	]);
	const registeredPositionReferenceRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (!mounted) return;
		const anchorValue = anchorValueRef.current;
		const resolvedAnchor = typeof anchorValue === "function" ? anchorValue() : anchorValue;
		const finalAnchor = (isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor) || null;
		if (finalAnchor !== registeredPositionReferenceRef.current) {
			refs.setPositionReference(finalAnchor);
			registeredPositionReferenceRef.current = finalAnchor;
		}
	}, [
		mounted,
		refs,
		anchorDep,
		anchorValueRef
	]);
	import_react.useEffect(() => {
		if (!mounted) return;
		const anchorValue = anchorValueRef.current;
		if (typeof anchorValue === "function") return;
		if (isRef(anchorValue) && anchorValue.current !== registeredPositionReferenceRef.current) {
			refs.setPositionReference(anchorValue.current);
			registeredPositionReferenceRef.current = anchorValue.current;
		}
	}, [
		mounted,
		refs,
		anchorDep,
		anchorValueRef
	]);
	import_react.useEffect(() => {
		if (keepMounted && mounted && elements.domReference && elements.floating) return autoUpdate(elements.domReference, elements.floating, update, autoUpdateOptions);
	}, [
		keepMounted,
		mounted,
		elements,
		update,
		autoUpdateOptions
	]);
	const renderedSide = getSide(renderedPlacement);
	const logicalRenderedSide = getLogicalSide(sideParam, renderedSide, isRtl);
	const renderedAlign = getAlignment(renderedPlacement) || "center";
	const anchorHidden = Boolean(middlewareData.hide?.referenceHidden);
	/**
	* Locks the flip (makes it "sticky") so it doesn't prefer a given placement
	* and flips back lazily, not eagerly. Ideal for filtered lists that change
	* the size of the popup dynamically to avoid unwanted flipping when typing.
	*/
	useIsoLayoutEffect(() => {
		if (lazyFlip && mounted && isPositioned) setMountSide(renderedSide);
	}, [
		lazyFlip,
		mounted,
		isPositioned,
		renderedSide
	]);
	const arrowStyles = import_react.useMemo(() => ({
		position: "absolute",
		top: middlewareData.arrow?.y,
		left: middlewareData.arrow?.x
	}), [middlewareData.arrow]);
	const arrowUncentered = middlewareData.arrow?.centerOffset !== 0;
	return import_react.useMemo(() => ({
		positionerStyles: floatingStyles,
		arrowStyles,
		arrowRef,
		arrowUncentered,
		side: logicalRenderedSide,
		align: renderedAlign,
		physicalSide: renderedSide,
		anchorHidden,
		refs,
		context,
		isPositioned,
		update
	}), [
		floatingStyles,
		arrowStyles,
		arrowRef,
		arrowUncentered,
		logicalRenderedSide,
		renderedAlign,
		renderedSide,
		anchorHidden,
		refs,
		context,
		isPositioned,
		update
	]);
}
function isRef(param) {
	return param != null && "current" in param;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/getDisabledMountTransitionStyles.js
function getDisabledMountTransitionStyles(transitionStatus) {
	return transitionStatus === "starting" ? DISABLED_TRANSITIONS_STYLE : EMPTY_OBJECT;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/usePositioner.js
/**
* Renders the shared outer Positioner element used by popup components.
* Applies the common role, hidden state, transition styles, state attributes, and optional inert styling.
*/
function usePositioner(componentProps, state, { styles, transitionStatus, props, refs, hidden, inert = false }) {
	const style = { ...styles };
	if (inert) style.pointerEvents = "none";
	return useRenderElement("div", componentProps, {
		state,
		ref: refs,
		props: [
			{
				role: "presentation",
				hidden,
				style
			},
			getDisabledMountTransitionStyles(transitionStatus),
			props
		],
		stateAttributesMapping: popupStateMapping
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/useAnchoredPopupScrollLock.js
var VIEWPORT_WIDTH_TOLERANCE_PX = 20;
/**
* Manages scroll lock for anchored popups. For non-touch opens, scroll lock is applied when
* enabled. For touch opens, scroll lock is applied only when the positioner width is effectively
* viewport-sized.
*/
function useAnchoredPopupScrollLock(enabled, touchOpen, positionerElement, referenceElement) {
	const [touchOpenShouldLockScroll, setTouchOpenShouldLockScroll] = import_react.useState(false);
	useIsoLayoutEffect(() => {
		if (!enabled || !touchOpen || positionerElement == null) {
			setTouchOpenShouldLockScroll(false);
			return;
		}
		const viewportWidth = ownerDocument(positionerElement).documentElement.clientWidth;
		const popupWidth = positionerElement.offsetWidth;
		setTouchOpenShouldLockScroll(viewportWidth > 0 && popupWidth > 0 && popupWidth >= viewportWidth - VIEWPORT_WIDTH_TOLERANCE_PX);
	}, [
		enabled,
		touchOpen,
		positionerElement
	]);
	useScrollLock(enabled && (!touchOpen || touchOpenShouldLockScroll), referenceElement);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/positioner/ComboboxPositioner.js
/**
* Positions the popup against the trigger.
* Renders a `<div>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxPositioner = /* @__PURE__ */ import_react.forwardRef(function ComboboxPositioner(componentProps, forwardedRef) {
	const { render, className, anchor, positionMethod = "absolute", side = "bottom", align = "center", sideOffset = 0, alignOffset = 0, collisionBoundary = "clipping-ancestors", collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE, style: styleProp, ...elementProps } = componentProps;
	const store = useComboboxRootContext();
	const { filteredItems } = useComboboxDerivedItemsContext();
	const floatingRootContext = useComboboxFloatingContext();
	const keepMounted = useComboboxPortalContext();
	const modal = useStore(store, selectors$4.modal);
	const open = useStore(store, selectors$4.open);
	const mounted = useStore(store, selectors$4.mounted);
	const openMethod = useStore(store, selectors$4.openMethod);
	const positionerElement = useStore(store, selectors$4.positionerElement);
	const triggerElement = useStore(store, selectors$4.triggerElement);
	const inputElement = useStore(store, selectors$4.inputElement);
	const inputGroupElement = useStore(store, selectors$4.inputGroupElement);
	const inputInsidePopup = useStore(store, selectors$4.inputInsidePopup);
	const transitionStatus = useStore(store, selectors$4.transitionStatus);
	const empty = filteredItems.length === 0;
	const positioning = useAnchorPositioning({
		anchor: anchor ?? (inputInsidePopup ? triggerElement : inputGroupElement ?? inputElement),
		floatingRootContext,
		positionMethod,
		mounted,
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		collisionBoundary,
		collisionPadding,
		sticky,
		disableAnchorTracking,
		keepMounted,
		collisionAvoidance,
		lazyFlip: true
	});
	useAnchoredPopupScrollLock(open && modal, openMethod === "touch", positionerElement, triggerElement);
	const state = {
		open,
		side: positioning.side,
		align: positioning.align,
		anchorHidden: positioning.anchorHidden,
		empty
	};
	useIsoLayoutEffect(() => {
		store.set("popupSide", positioning.side);
	}, [store, positioning.side]);
	const setPositionerElement = useStableCallback((element) => {
		store.set("positionerElement", element);
	});
	const element = usePositioner(componentProps, state, {
		styles: positioning.positionerStyles,
		transitionStatus,
		props: elementProps,
		refs: [forwardedRef, setPositionerElement],
		hidden: !mounted,
		inert: !open
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComboboxPositionerContext.Provider, {
		value: positioning,
		children: [mounted && modal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
			inert: inertValue(!open),
			cutout: inputGroupElement ?? inputElement ?? triggerElement
		}), element]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/popup/ComboboxPopup.js
var stateAttributesMapping$7 = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* A container for the list.
* Renders a `<div>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxPopup = /* @__PURE__ */ import_react.forwardRef(function ComboboxPopup(componentProps, forwardedRef) {
	const { render, className, style, initialFocus, finalFocus, ...elementProps } = componentProps;
	const store = useComboboxRootContext();
	const positioning = useComboboxPositionerContext();
	const floatingRootContext = useComboboxFloatingContext();
	const { filteredItems } = useComboboxDerivedItemsContext();
	const mounted = useStore(store, selectors$4.mounted);
	const open = useStore(store, selectors$4.open);
	const openMethod = useStore(store, selectors$4.openMethod);
	const transitionStatus = useStore(store, selectors$4.transitionStatus);
	const inputInsidePopup = useStore(store, selectors$4.inputInsidePopup);
	const inputElement = useStore(store, selectors$4.inputElement);
	const modal = useStore(store, selectors$4.modal);
	const empty = filteredItems.length === 0;
	useOpenChangeComplete({
		open,
		ref: store.state.popupRef,
		onComplete() {
			if (open) store.state.onOpenChangeComplete(true);
		}
	});
	const element = useRenderElement("div", componentProps, {
		state: {
			open,
			side: positioning.side,
			align: positioning.align,
			anchorHidden: positioning.anchorHidden,
			transitionStatus,
			empty
		},
		ref: [forwardedRef, store.state.popupRef],
		props: [
			{
				role: inputInsidePopup ? "dialog" : "presentation",
				tabIndex: -1,
				onFocus(event) {
					const target = getTarget(event.nativeEvent);
					if (openMethod !== "touch" && (contains(store.state.listElement, target) || target === event.currentTarget)) store.state.inputRef.current?.focus();
				}
			},
			getDisabledMountTransitionStyles(transitionStatus),
			elementProps
		],
		stateAttributesMapping: stateAttributesMapping$7
	});
	const resolvedInitialFocus = initialFocus === void 0 ? inputInsidePopup ? (interactionType) => interactionType === "touch" ? store.state.popupRef.current : inputElement : false : initialFocus;
	let resolvedFinalFocus;
	if (finalFocus != null) resolvedFinalFocus = finalFocus;
	else resolvedFinalFocus = inputInsidePopup ? void 0 : false;
	const focusManagerModal = !inputInsidePopup || modal;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
		context: floatingRootContext,
		disabled: !mounted,
		modal: focusManagerModal,
		openInteractionType: openMethod,
		initialFocus: resolvedInitialFocus,
		returnFocus: resolvedFinalFocus,
		getInsideElements: () => [store.state.startDismissRef.current, store.state.endDismissRef.current],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [element, focusManagerModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxInternalDismissButton, { ref: store.state.endDismissRef })] })
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/item/ComboboxItemContext.js
var ComboboxItemContext = /* @__PURE__ */ import_react.createContext(void 0);
function useComboboxItemContext() {
	const context = import_react.useContext(ComboboxItemContext);
	if (!context) throw new Error(formatErrorMessage(19));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/row/ComboboxRowContext.js
var ComboboxRowContext = /* @__PURE__ */ import_react.createContext(false);
function useComboboxRowContext() {
	return import_react.useContext(ComboboxRowContext);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/item/ComboboxItem.js
/**
* An individual item in the list.
* Renders a `<div>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxItem = /* @__PURE__ */ import_react.memo(/* @__PURE__ */ import_react.forwardRef(function ComboboxItem(componentProps, forwardedRef) {
	const { render, className, value: itemValue = null, index: indexProp, disabled = false, nativeButton = false, style, ...elementProps } = componentProps;
	const didPointerDownRef = import_react.useRef(false);
	const textRef = import_react.useRef(null);
	const listItem = useCompositeListItem({
		index: indexProp,
		textRef,
		indexGuessBehavior: IndexGuessBehavior.GuessFromOrder
	});
	const store = useComboboxRootContext();
	const isRow = useComboboxRowContext();
	const { flatFilteredItems, hasItems } = useComboboxDerivedItemsContext();
	const open = useStore(store, selectors$4.open);
	const selectionMode = useStore(store, selectors$4.selectionMode);
	const readOnly = useStore(store, selectors$4.readOnly);
	const virtualized = useStore(store, selectors$4.virtualized);
	const isItemEqualToValue = useStore(store, selectors$4.isItemEqualToValue);
	const selectable = selectionMode !== "none";
	const index = indexProp ?? (virtualized ? findItemIndex(flatFilteredItems, itemValue, isItemEqualToValue) : listItem.index);
	const hasRegistered = listItem.index !== -1;
	const rootId = useStore(store, selectors$4.id);
	const highlighted = useStore(store, selectors$4.isActive, index);
	const matchesSelectedValue = useStore(store, selectors$4.isSelected, itemValue);
	const getItemProps = useStore(store, selectors$4.getItemProps);
	const itemRef = import_react.useRef(null);
	const id = rootId != null && hasRegistered ? `${rootId}-${index}` : void 0;
	const selected = matchesSelectedValue && selectable;
	useIsoLayoutEffect(() => {
		if (!(hasRegistered && (virtualized || indexProp != null))) return;
		const list = store.state.listRef.current;
		list[index] = itemRef.current;
		return () => {
			delete list[index];
		};
	}, [
		hasRegistered,
		virtualized,
		index,
		indexProp,
		store
	]);
	useIsoLayoutEffect(() => {
		if (!hasRegistered || hasItems) return;
		const visibleMap = store.state.valuesRef.current;
		visibleMap[index] = itemValue;
		if (selectionMode !== "none") store.state.allValuesRef.current.push(itemValue);
		return () => {
			delete visibleMap[index];
		};
	}, [
		hasRegistered,
		hasItems,
		index,
		itemValue,
		store,
		selectionMode
	]);
	useIsoLayoutEffect(() => {
		if (!open) {
			didPointerDownRef.current = false;
			return;
		}
		if (!hasRegistered || hasItems) return;
		const selectedValue = store.state.selectedValue;
		if (compareItemEquality(itemValue, Array.isArray(selectedValue) ? selectedValue[selectedValue.length - 1] : selectedValue, isItemEqualToValue)) store.set("selectedIndex", index);
	}, [
		hasRegistered,
		hasItems,
		open,
		store,
		index,
		itemValue,
		isItemEqualToValue
	]);
	const state = {
		disabled,
		selected,
		highlighted
	};
	const rootProps = getItemProps({
		active: highlighted,
		selected
	});
	rootProps.id = void 0;
	rootProps.onFocus = void 0;
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		focusableWhenDisabled: true,
		native: nativeButton,
		composite: true
	});
	function commitSelection(nativeEvent) {
		function selectItem() {
			store.state.handleSelection(nativeEvent, itemValue);
		}
		if (store.state.submitOnItemClick) {
			import_react_dom.flushSync(selectItem);
			store.state.requestSubmit();
		} else selectItem();
	}
	const defaultProps = {
		id,
		role: isRow ? "gridcell" : "option",
		"aria-selected": selectable ? selected : void 0,
		tabIndex: void 0,
		onPointerDownCapture(event) {
			didPointerDownRef.current = true;
			event.preventDefault();
		},
		onMouseDown(event) {
			event.preventDefault();
		},
		onClick(event) {
			if (disabled || readOnly) return;
			commitSelection(event.nativeEvent);
		},
		onMouseUp(event) {
			const pointerStartedOnItem = didPointerDownRef.current;
			didPointerDownRef.current = false;
			if (disabled || readOnly || event.button !== 0 || pointerStartedOnItem || !highlighted) return;
			commitSelection(event.nativeEvent);
		}
	};
	const element = useRenderElement("div", componentProps, {
		ref: [
			buttonRef,
			forwardedRef,
			listItem.ref,
			itemRef
		],
		state,
		props: [
			rootProps,
			defaultProps,
			elementProps,
			getButtonProps
		]
	});
	const contextValue = import_react.useMemo(() => ({
		selected,
		textRef
	}), [selected, textRef]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboboxItemContext.Provider, {
		value: contextValue,
		children: element
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/empty/ComboboxEmpty.js
/**
* Renders its children only when the list is empty.
* Requires the `items` prop on the root component.
* Announces changes politely to screen readers.
* This component's root element must remain mounted in the DOM to announce
* changes consistently across screen readers. Avoid hiding or removing the
* component itself with `display: none`, `hidden`, `aria-hidden`, or conditional
* rendering. Prefer updating or conditionally rendering its children instead.
* Renders a `<div>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxEmpty = /* @__PURE__ */ import_react.forwardRef(function ComboboxEmpty(componentProps, forwardedRef) {
	const { render, className, style, children: childrenProp, ...elementProps } = componentProps;
	const { filteredItems } = useComboboxDerivedItemsContext();
	const store = useComboboxRootContext();
	const emptyRef = useInitialLiveRegionTextMutation();
	const children = filteredItems.length === 0 ? childrenProp : null;
	return useRenderElement("div", componentProps, {
		ref: [
			forwardedRef,
			store.state.emptyRef,
			emptyRef
		],
		props: [{
			children,
			role: "status",
			"aria-live": "polite",
			"aria-atomic": true
		}, elementProps]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/separator/Separator.js
/**
* A separator element accessible to screen readers.
* Renders a `<div>` element.
*
* Documentation: [Base UI Separator](https://base-ui.com/react/components/separator)
*/
var Separator = /* @__PURE__ */ import_react.forwardRef(function SeparatorComponent(componentProps, forwardedRef) {
	const { className, render, orientation = "horizontal", style, ...elementProps } = componentProps;
	return useRenderElement("div", componentProps, {
		state: { orientation },
		ref: forwardedRef,
		props: [{
			role: "separator",
			"aria-orientation": orientation
		}, elementProps]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/avatar/root/AvatarRootContext.js
var AvatarRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useAvatarRootContext() {
	const context = import_react.useContext(AvatarRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(13));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/avatar/root/stateAttributesMapping.js
var avatarStateAttributesMapping = { imageLoadingStatus: () => null };
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/avatar/root/AvatarRoot.js
/**
* Displays a user's profile picture, initials, or fallback icon.
* Renders a `<span>` element.
*
* Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
*/
var AvatarRoot = /* @__PURE__ */ import_react.forwardRef(function AvatarRoot(componentProps, forwardedRef) {
	const { className, render, style, ...elementProps } = componentProps;
	const [imageLoadingStatus, setImageLoadingStatus] = import_react.useState("idle");
	const state = { imageLoadingStatus };
	const contextValue = import_react.useMemo(() => ({
		imageLoadingStatus,
		setImageLoadingStatus
	}), [imageLoadingStatus, setImageLoadingStatus]);
	const element = useRenderElement("span", componentProps, {
		state,
		ref: forwardedRef,
		props: elementProps,
		stateAttributesMapping: avatarStateAttributesMapping
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarRootContext.Provider, {
		value: contextValue,
		children: element
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/avatar/image/useImageLoadingStatus.js
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
	const [loadingStatus, setLoadingStatus] = import_react.useState("idle");
	useIsoLayoutEffect(() => {
		if (!src) {
			setLoadingStatus("error");
			return NOOP;
		}
		let isMounted = true;
		const image = new window.Image();
		const updateStatus = (status) => () => {
			if (!isMounted) return;
			setLoadingStatus(status);
		};
		setLoadingStatus("loading");
		image.onload = updateStatus("loaded");
		image.onerror = updateStatus("error");
		if (referrerPolicy) image.referrerPolicy = referrerPolicy;
		image.crossOrigin = crossOrigin ?? null;
		image.src = src;
		if (image.complete) setLoadingStatus(image.naturalWidth > 0 ? "loaded" : "error");
		return () => {
			isMounted = false;
		};
	}, [
		src,
		crossOrigin,
		referrerPolicy
	]);
	return loadingStatus;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/avatar/image/AvatarImage.js
var stateAttributesMapping$6 = {
	...avatarStateAttributesMapping,
	...transitionStatusMapping
};
/**
* The image to be displayed in the avatar.
* Renders an `<img>` element.
*
* Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
*/
var AvatarImage = /* @__PURE__ */ import_react.forwardRef(function AvatarImage(componentProps, forwardedRef) {
	const { className, render, onLoadingStatusChange: onLoadingStatusChangeProp, referrerPolicy, crossOrigin, style, ...elementProps } = componentProps;
	const context = useAvatarRootContext();
	const imageLoadingStatus = useImageLoadingStatus(componentProps.src, {
		referrerPolicy,
		crossOrigin
	});
	const isVisible = imageLoadingStatus === "loaded";
	const { mounted, transitionStatus, setMounted } = useTransitionStatus(isVisible);
	const imageRef = import_react.useRef(null);
	const handleLoadingStatusChange = useStableCallback((status) => {
		onLoadingStatusChangeProp?.(status);
		context.setImageLoadingStatus(status);
	});
	useIsoLayoutEffect(() => {
		if (imageLoadingStatus !== "idle") handleLoadingStatusChange(imageLoadingStatus);
	}, [imageLoadingStatus, handleLoadingStatusChange]);
	const state = {
		imageLoadingStatus,
		transitionStatus
	};
	useOpenChangeComplete({
		open: isVisible,
		ref: imageRef,
		onComplete() {
			if (!isVisible) setMounted(false);
		}
	});
	const element = useRenderElement("img", componentProps, {
		state,
		ref: [forwardedRef, imageRef],
		props: elementProps,
		stateAttributesMapping: stateAttributesMapping$6,
		enabled: mounted
	});
	if (!mounted) return null;
	return element;
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/avatar/fallback/AvatarFallback.js
/**
* Rendered when the image fails to load or when no image is provided.
* Renders a `<span>` element.
*
* Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
*/
var AvatarFallback = /* @__PURE__ */ import_react.forwardRef(function AvatarFallback(componentProps, forwardedRef) {
	const { className, render, delay, style, ...elementProps } = componentProps;
	const { imageLoadingStatus } = useAvatarRootContext();
	const [delayPassed, setDelayPassed] = import_react.useState(delay === void 0);
	const timeout = useTimeout();
	import_react.useEffect(() => {
		if (delay !== void 0) timeout.start(delay, () => setDelayPassed(true));
		return timeout.clear;
	}, [timeout, delay]);
	return useRenderElement("span", componentProps, {
		state: { imageLoadingStatus },
		ref: forwardedRef,
		props: elementProps,
		stateAttributesMapping: avatarStateAttributesMapping,
		enabled: imageLoadingStatus !== "loaded" && delayPassed
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/areArraysEqual.js
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
	return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/root/ComboboxRoot.js
/**
* Groups all parts of the combobox.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
function ComboboxRoot(props) {
	const { multiple = false, defaultValue, value, onValueChange, autoComplete, ...other } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AriaCombobox, {
		...other,
		selectionMode: multiple ? "multiple" : "single",
		selectedValue: value,
		defaultSelectedValue: defaultValue,
		onSelectedValueChange: onValueChange,
		formAutoComplete: autoComplete
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/value/ComboboxValue.js
/**
* The current value of the combobox.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
function ComboboxValue(props) {
	const { children: childrenProp, placeholder } = props;
	const store = useComboboxRootContext();
	const itemToStringLabel = useStore(store, selectors$4.itemToStringLabel);
	const selectedValue = useStore(store, selectors$4.selectedValue);
	const items = useStore(store, selectors$4.items);
	const multiple = useStore(store, selectors$4.selectionMode) === "multiple";
	const hasSelectedValue = useStore(store, selectors$4.hasSelectedValue);
	const shouldCheckNullItemLabel = !hasSelectedValue && placeholder != null && childrenProp == null;
	const hasNullLabel = useStore(store, selectors$4.hasNullItemLabel, shouldCheckNullItemLabel);
	let children = null;
	if (typeof childrenProp === "function") children = childrenProp(selectedValue);
	else if (childrenProp != null) children = childrenProp;
	else if (!hasSelectedValue && placeholder != null && !hasNullLabel) children = placeholder;
	else if (multiple && Array.isArray(selectedValue)) children = resolveMultipleLabels(selectedValue, items, itemToStringLabel);
	else children = resolveSelectedLabel(selectedValue, items, itemToStringLabel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children });
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/combobox/item-indicator/ComboboxItemIndicator.js
/**
* Indicates whether the item is selected.
* Renders a `<span>` element.
*
* Documentation: [Base UI Combobox](https://base-ui.com/react/components/combobox)
*/
var ComboboxItemIndicator = /* @__PURE__ */ import_react.forwardRef(function ComboboxItemIndicator(componentProps, forwardedRef) {
	const keepMounted = componentProps.keepMounted ?? false;
	const { selected } = useComboboxItemContext();
	if (!(keepMounted || selected)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner, {
		...componentProps,
		ref: forwardedRef
	});
});
var Inner = /* @__PURE__ */ import_react.memo(/* @__PURE__ */ import_react.forwardRef((componentProps, forwardedRef) => {
	const { render, className, style, keepMounted, ...elementProps } = componentProps;
	const { selected } = useComboboxItemContext();
	const indicatorRef = import_react.useRef(null);
	const { transitionStatus, setMounted } = useTransitionStatus(selected);
	const element = useRenderElement("span", componentProps, {
		ref: [forwardedRef, indicatorRef],
		state: {
			selected,
			transitionStatus
		},
		props: [{
			"aria-hidden": true,
			children: "✔️"
		}, elementProps],
		stateAttributesMapping: transitionStatusMapping
	});
	useOpenChangeComplete({
		open: selected,
		ref: indicatorRef,
		onComplete() {
			if (!selected) setMounted(false);
		}
	});
	return element;
}));
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/context-menu/root/ContextMenuRootContext.js
var ContextMenuRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useContextMenuRootContext(optional = true) {
	const context = import_react.useContext(ContextMenuRootContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(25));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/positioner/MenuPositionerContext.js
var MenuPositionerContext = /* @__PURE__ */ import_react.createContext(void 0);
function useMenuPositionerContext(optional) {
	const context = import_react.useContext(MenuPositionerContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(33));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/root/MenuRootContext.js
var MenuRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useMenuRootContext(optional) {
	const context = import_react.useContext(MenuRootContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(36));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/checkbox-item/MenuCheckboxItemContext.js
var MenuCheckboxItemContext = /* @__PURE__ */ import_react.createContext(void 0);
function useMenuCheckboxItemContext() {
	const context = import_react.useContext(MenuCheckboxItemContext);
	if (context === void 0) throw new Error(formatErrorMessage(30));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/item/useMenuItemCommonProps.js
/**
* Returns common props shared by all menu item types.
* This hook extracts the shared logic for id, role, tabIndex, onKeyDown,
* onMouseMove, onClick, and onMouseUp handlers.
*/
function useMenuItemCommonProps(params) {
	const { closeOnClick, highlighted, id, nodeId, store, typingRef, itemRef, itemMetadata } = params;
	const { events: menuEvents } = store.useState("floatingTreeRoot");
	const contextMenuContext = useContextMenuRootContext(true);
	const isContextMenu = contextMenuContext !== void 0;
	return import_react.useMemo(() => ({
		id,
		role: "menuitem",
		tabIndex: highlighted ? 0 : -1,
		onKeyDown(event) {
			if (event.key === " " && typingRef?.current) event.preventDefault();
		},
		onMouseMove(event) {
			if (!nodeId) return;
			menuEvents.emit("itemhover", {
				nodeId,
				target: event.currentTarget
			});
		},
		onClick(event) {
			if (closeOnClick) menuEvents.emit("close", {
				domEvent: event,
				reason: itemPress
			});
		},
		onMouseUp(event) {
			if (contextMenuContext) {
				const initialCursorPoint = contextMenuContext.initialCursorPointRef.current;
				contextMenuContext.initialCursorPointRef.current = null;
				if (isContextMenu && initialCursorPoint && Math.abs(event.clientX - initialCursorPoint.x) <= 1 && Math.abs(event.clientY - initialCursorPoint.y) <= 1) return;
				if (isContextMenu && !isMac && event.button === 2) return;
			}
			if (itemRef.current && store.context.allowMouseUpTriggerRef.current && (!isContextMenu || event.button === 2)) {
				if (!itemMetadata || itemMetadata.type === "regular-item") itemRef.current.click();
			}
		}
	}), [
		closeOnClick,
		highlighted,
		id,
		menuEvents,
		nodeId,
		store,
		typingRef,
		itemRef,
		contextMenuContext,
		isContextMenu,
		itemMetadata
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/item/useMenuItem.js
var REGULAR_ITEM = { type: "regular-item" };
function useMenuItem(params) {
	const { closeOnClick, disabled = false, highlighted, id, store, typingRef = store.context.typingRef, nativeButton, itemMetadata, nodeId } = params;
	const itemRef = import_react.useRef(null);
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		focusableWhenDisabled: true,
		native: nativeButton,
		composite: true
	});
	const commonProps = useMenuItemCommonProps({
		closeOnClick,
		highlighted,
		id,
		nodeId,
		store,
		typingRef,
		itemRef,
		itemMetadata
	});
	const getItemProps = import_react.useCallback((externalProps) => {
		return mergeProps$1(commonProps, { onMouseEnter() {
			if (itemMetadata.type !== "submenu-trigger") return;
			itemMetadata.setActive();
		} }, externalProps, getButtonProps);
	}, [
		commonProps,
		getButtonProps,
		itemMetadata
	]);
	const mergedRef = useMergedRefs(itemRef, buttonRef);
	return import_react.useMemo(() => ({
		getItemProps,
		itemRef: mergedRef
	}), [getItemProps, mergedRef]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/checkbox-item/MenuCheckboxItemDataAttributes.js
var MenuCheckboxItemDataAttributes = /* @__PURE__ */ function(MenuCheckboxItemDataAttributes) {
	/**
	* Present when the menu checkbox item is checked.
	*/
	MenuCheckboxItemDataAttributes["checked"] = "data-checked";
	/**
	* Present when the menu checkbox item is not checked.
	*/
	MenuCheckboxItemDataAttributes["unchecked"] = "data-unchecked";
	/**
	* Present when the menu checkbox item is disabled.
	*/
	MenuCheckboxItemDataAttributes["disabled"] = "data-disabled";
	/**
	* Present when the menu checkbox item is highlighted.
	*/
	MenuCheckboxItemDataAttributes["highlighted"] = "data-highlighted";
	return MenuCheckboxItemDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/utils/stateAttributesMapping.js
var itemMapping = {
	checked(value) {
		if (value) return { [MenuCheckboxItemDataAttributes.checked]: "" };
		return { [MenuCheckboxItemDataAttributes.unchecked]: "" };
	},
	...transitionStatusMapping
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/checkbox-item/MenuCheckboxItem.js
/**
* A menu item that toggles a setting on or off.
* Renders a `<div>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuCheckboxItem = /* @__PURE__ */ import_react.forwardRef(function MenuCheckboxItem(componentProps, forwardedRef) {
	const { render, className, id: idProp, label, nativeButton = false, disabled = false, closeOnClick = false, checked: checkedProp, defaultChecked, onCheckedChange, style, ...elementProps } = componentProps;
	const listItem = useCompositeListItem({ label });
	const menuPositionerContext = useMenuPositionerContext(true);
	const id = useBaseUiId(idProp);
	const { store } = useMenuRootContext();
	const highlighted = store.useState("isActive", listItem.index);
	const itemProps = store.useState("itemProps");
	const [checked, setChecked] = useControlled({
		controlled: checkedProp,
		default: defaultChecked ?? false,
		name: "MenuCheckboxItem",
		state: "checked"
	});
	const { getItemProps, itemRef } = useMenuItem({
		closeOnClick,
		disabled,
		highlighted,
		id,
		store,
		nativeButton,
		nodeId: menuPositionerContext?.context.nodeId,
		itemMetadata: REGULAR_ITEM
	});
	const state = import_react.useMemo(() => ({
		disabled,
		highlighted,
		checked
	}), [
		disabled,
		highlighted,
		checked
	]);
	const element = useRenderElement("div", componentProps, {
		state,
		stateAttributesMapping: itemMapping,
		props: [
			itemProps,
			{
				role: "menuitemcheckbox",
				"aria-checked": checked,
				onClick: useStableCallback((event) => {
					const details = {
						...createChangeEventDetails(itemPress, event.nativeEvent),
						preventUnmountOnClose: () => {}
					};
					onCheckedChange?.(!checked, details);
					if (details.isCanceled) return;
					setChecked((currentlyChecked) => !currentlyChecked);
				})
			},
			elementProps,
			getItemProps
		],
		ref: [
			itemRef,
			forwardedRef,
			listItem.ref
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuCheckboxItemContext.Provider, {
		value: state,
		children: element
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/checkbox-item-indicator/MenuCheckboxItemIndicator.js
/**
* Indicates whether the checkbox item is ticked.
* Renders a `<span>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuCheckboxItemIndicator = /* @__PURE__ */ import_react.forwardRef(function MenuCheckboxItemIndicator(componentProps, forwardedRef) {
	const { render, className, style, keepMounted = false, ...elementProps } = componentProps;
	const item = useMenuCheckboxItemContext();
	const indicatorRef = import_react.useRef(null);
	const { transitionStatus, setMounted } = useTransitionStatus(item.checked);
	useOpenChangeComplete({
		open: item.checked,
		ref: indicatorRef,
		onComplete() {
			if (!item.checked) setMounted(false);
		}
	});
	return useRenderElement("span", componentProps, {
		state: {
			checked: item.checked,
			disabled: item.disabled,
			highlighted: item.highlighted,
			transitionStatus
		},
		ref: [forwardedRef, indicatorRef],
		stateAttributesMapping: itemMapping,
		props: {
			"aria-hidden": true,
			...elementProps
		},
		enabled: keepMounted || item.checked
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/group/MenuGroupContext.js
var MenuGroupContext = /* @__PURE__ */ import_react.createContext(void 0);
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/group/MenuGroup.js
/**
* Groups related menu items with the corresponding label.
* Renders a `<div>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuGroup = /* @__PURE__ */ import_react.forwardRef(function MenuGroup(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const [labelId, setLabelId] = import_react.useState(void 0);
	const context = import_react.useMemo(() => ({ setLabelId }), [setLabelId]);
	const element = useRenderElement("div", componentProps, {
		ref: forwardedRef,
		props: {
			role: "group",
			"aria-labelledby": labelId,
			...elementProps
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroupContext.Provider, {
		value: context,
		children: element
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/item/MenuItem.js
/**
* An individual interactive item in the menu.
* Renders a `<div>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuItem = /* @__PURE__ */ import_react.forwardRef(function MenuItem(componentProps, forwardedRef) {
	const { render, className, id: idProp, label, nativeButton = false, disabled = false, closeOnClick = true, style, ...elementProps } = componentProps;
	const listItem = useCompositeListItem({ label });
	const menuPositionerContext = useMenuPositionerContext(true);
	const id = useBaseUiId(idProp);
	const { store } = useMenuRootContext();
	const highlighted = store.useState("isActive", listItem.index);
	const itemProps = store.useState("itemProps");
	const { getItemProps, itemRef } = useMenuItem({
		closeOnClick,
		disabled,
		highlighted,
		id,
		store,
		nativeButton,
		nodeId: menuPositionerContext?.context.nodeId,
		itemMetadata: REGULAR_ITEM
	});
	return useRenderElement("div", componentProps, {
		state: {
			disabled,
			highlighted
		},
		props: [
			itemProps,
			elementProps,
			getItemProps
		],
		ref: [
			itemRef,
			forwardedRef,
			listItem.ref
		]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/toolbar/root/ToolbarRootContext.js
var ToolbarRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useToolbarRootContext(optional) {
	const context = import_react.useContext(ToolbarRootContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(69));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/popup/MenuPopup.js
var stateAttributesMapping$5 = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* A container for the menu items.
* Renders a `<div>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuPopup = /* @__PURE__ */ import_react.forwardRef(function MenuPopup(componentProps, forwardedRef) {
	const { render, className, style, finalFocus, ...elementProps } = componentProps;
	const { store } = useMenuRootContext();
	const { side, align } = useMenuPositionerContext();
	const insideToolbar = useToolbarRootContext(true) != null;
	const open = store.useState("open");
	const transitionStatus = store.useState("transitionStatus");
	const popupProps = store.useState("popupProps");
	const mounted = store.useState("mounted");
	const instantType = store.useState("instantType");
	const triggerElement = store.useState("activeTriggerElement");
	const parent = store.useState("parent");
	const lastOpenChangeReason = store.useState("lastOpenChangeReason");
	const rootId = store.useState("rootId");
	const floatingContext = store.useState("floatingRootContext");
	const floatingTreeRoot = store.useState("floatingTreeRoot");
	const closeDelay = store.useState("closeDelay");
	const activeTriggerElement = store.useState("activeTriggerElement");
	const isContextMenu = parent.type === "context-menu";
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	import_react.useEffect(() => {
		function handleClose(event) {
			store.setOpen(false, createChangeEventDetails(event.reason, event.domEvent));
		}
		floatingTreeRoot.events.on("close", handleClose);
		return () => {
			floatingTreeRoot.events.off("close", handleClose);
		};
	}, [floatingTreeRoot.events, store]);
	const hoverEnabled = store.useState("hoverEnabled");
	const disabled = store.useState("disabled");
	useHoverFloatingInteraction(floatingContext, {
		enabled: hoverEnabled && !disabled && !isContextMenu && parent.type !== "menubar",
		closeDelay
	});
	const state = {
		transitionStatus,
		side,
		align,
		open,
		nested: parent.type === "menu",
		instant: instantType
	};
	const setPopupElement = import_react.useCallback((element) => {
		store.set("popupElement", element);
	}, [store]);
	const element = useRenderElement("div", componentProps, {
		state,
		ref: [
			forwardedRef,
			store.context.popupRef,
			setPopupElement
		],
		stateAttributesMapping: stateAttributesMapping$5,
		props: [
			popupProps,
			{ onKeyDown(event) {
				if (insideToolbar && COMPOSITE_KEYS.has(event.key)) event.stopPropagation();
			} },
			getDisabledMountTransitionStyles(transitionStatus),
			elementProps,
			{ "data-rootownerid": rootId }
		]
	});
	let returnFocus = parent.type === void 0 || isContextMenu;
	if (triggerElement || parent.type === "menubar" && lastOpenChangeReason !== "outside-press") returnFocus = true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
		context: floatingContext,
		modal: isContextMenu,
		disabled: !mounted,
		returnFocus: finalFocus === void 0 ? returnFocus : finalFocus,
		initialFocus: parent.type !== "menu",
		restoreFocus: true,
		externalTree: parent.type !== "menubar" ? floatingTreeRoot : void 0,
		previousFocusableElement: activeTriggerElement,
		nextFocusableElement: parent.type === void 0 ? store.context.triggerFocusTargetRef : void 0,
		beforeContentFocusGuardRef: parent.type === void 0 ? store.context.beforeContentFocusGuardRef : void 0,
		children: element
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/portal/MenuPortalContext.js
var MenuPortalContext = /* @__PURE__ */ import_react.createContext(void 0);
function useMenuPortalContext() {
	const value = import_react.useContext(MenuPortalContext);
	if (value === void 0) throw new Error(formatErrorMessage(32));
	return value;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/portal/MenuPortal.js
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuPortal = /* @__PURE__ */ import_react.forwardRef(function MenuPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	const { store } = useMenuRootContext();
	if (!(store.useState("mounted") || keepMounted)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPortalContext.Provider, {
		value: keepMounted,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortal, {
			ref: forwardedRef,
			...portalProps
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/positioner/MenuPositioner.js
/**
* Positions the menu popup against the trigger.
* Renders a `<div>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuPositioner = /* @__PURE__ */ import_react.forwardRef(function MenuPositioner(componentProps, forwardedRef) {
	const { anchor: anchorProp, positionMethod: positionMethodProp = "absolute", className, render, side, align: alignProp, sideOffset: sideOffsetProp = 0, alignOffset: alignOffsetProp = 0, collisionBoundary = "clipping-ancestors", collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance: collisionAvoidanceProp = DROPDOWN_COLLISION_AVOIDANCE, style, ...elementProps } = componentProps;
	const { store } = useMenuRootContext();
	const keepMounted = useMenuPortalContext();
	const contextMenuContext = useContextMenuRootContext(true);
	const parent = store.useState("parent");
	const floatingRootContext = store.useState("floatingRootContext");
	const floatingTreeRoot = store.useState("floatingTreeRoot");
	const mounted = store.useState("mounted");
	const open = store.useState("open");
	const modal = store.useState("modal");
	const openMethod = store.useState("openMethod");
	const triggerElement = store.useState("activeTriggerElement");
	const transitionStatus = store.useState("transitionStatus");
	const positionerElement = store.useState("positionerElement");
	const instantType = store.useState("instantType");
	const hasViewport = store.useState("hasViewport");
	const lastOpenChangeReason = store.useState("lastOpenChangeReason");
	const floatingNodeId = store.useState("floatingNodeId");
	const floatingParentNodeId = store.useState("floatingParentNodeId");
	const domReference = floatingRootContext.useState("domReferenceElement");
	const previousTriggerRef = import_react.useRef(null);
	const runOnceAnimationsFinish = useAnimationsFinished(positionerElement, false, false);
	let anchor = anchorProp;
	let sideOffset = sideOffsetProp;
	let alignOffset = alignOffsetProp;
	let align = alignProp;
	let collisionAvoidance = collisionAvoidanceProp;
	if (parent.type === "context-menu") {
		anchor = anchorProp ?? parent.context?.anchor;
		align = align ?? "start";
		if (!side && align !== "center") {
			alignOffset = componentProps.alignOffset ?? 2;
			sideOffset = componentProps.sideOffset ?? -5;
		}
	}
	let computedSide = side;
	let computedAlign = align;
	if (parent.type === "menu") {
		computedSide = computedSide ?? "inline-end";
		computedAlign = computedAlign ?? "start";
		collisionAvoidance = componentProps.collisionAvoidance ?? POPUP_COLLISION_AVOIDANCE;
	} else if (parent.type === "menubar") {
		computedSide = computedSide ?? "bottom";
		computedAlign = computedAlign ?? "start";
	}
	const contextMenu = parent.type === "context-menu";
	const positioner = useAnchorPositioning({
		anchor,
		floatingRootContext,
		positionMethod: contextMenuContext ? "fixed" : positionMethodProp,
		mounted,
		side: computedSide,
		sideOffset,
		align: computedAlign,
		alignOffset,
		arrowPadding: contextMenu ? 0 : arrowPadding,
		collisionBoundary,
		collisionPadding,
		sticky,
		nodeId: floatingNodeId,
		keepMounted,
		disableAnchorTracking,
		collisionAvoidance,
		shiftCrossAxis: contextMenu && !("side" in collisionAvoidance && collisionAvoidance.side === "flip"),
		externalTree: floatingTreeRoot,
		adaptiveOrigin: hasViewport ? adaptiveOrigin : void 0
	});
	import_react.useEffect(() => {
		function onMenuOpenChange(details) {
			if (details.open) {
				if (details.parentNodeId === floatingNodeId) store.set("hoverEnabled", false);
				if (details.nodeId !== floatingNodeId && details.parentNodeId === store.select("floatingParentNodeId")) store.setOpen(false, createChangeEventDetails(siblingOpen));
			}
		}
		floatingTreeRoot.events.on("menuopenchange", onMenuOpenChange);
		return () => {
			floatingTreeRoot.events.off("menuopenchange", onMenuOpenChange);
		};
	}, [
		store,
		floatingTreeRoot.events,
		floatingNodeId
	]);
	import_react.useEffect(() => {
		if (store.select("floatingParentNodeId") == null) return;
		function onParentClose(details) {
			if (details.open || details.nodeId !== store.select("floatingParentNodeId")) return;
			const reason = details.reason ?? "sibling-open";
			store.setOpen(false, createChangeEventDetails(reason));
		}
		floatingTreeRoot.events.on("menuopenchange", onParentClose);
		return () => {
			floatingTreeRoot.events.off("menuopenchange", onParentClose);
		};
	}, [floatingTreeRoot.events, store]);
	const closeTimeout = useTimeout();
	import_react.useEffect(() => {
		if (!open) closeTimeout.clear();
	}, [open, closeTimeout]);
	import_react.useEffect(() => {
		function onItemHover(event) {
			if (!open || event.nodeId !== store.select("floatingParentNodeId")) return;
			if (event.target && triggerElement && triggerElement !== event.target) {
				const delay = store.select("closeDelay");
				if (delay > 0) {
					if (!closeTimeout.isStarted()) closeTimeout.start(delay, () => {
						store.setOpen(false, createChangeEventDetails(siblingOpen));
					});
				} else store.setOpen(false, createChangeEventDetails(siblingOpen));
			} else closeTimeout.clear();
		}
		floatingTreeRoot.events.on("itemhover", onItemHover);
		return () => {
			floatingTreeRoot.events.off("itemhover", onItemHover);
		};
	}, [
		floatingTreeRoot.events,
		open,
		triggerElement,
		store,
		closeTimeout
	]);
	import_react.useEffect(() => {
		const eventDetails = {
			open,
			nodeId: floatingNodeId,
			parentNodeId: floatingParentNodeId,
			reason: store.select("lastOpenChangeReason")
		};
		floatingTreeRoot.events.emit("menuopenchange", eventDetails);
	}, [
		floatingTreeRoot.events,
		open,
		store,
		floatingNodeId,
		floatingParentNodeId
	]);
	useIsoLayoutEffect(() => {
		const currentTrigger = domReference;
		const previousTrigger = previousTriggerRef.current;
		if (currentTrigger) previousTriggerRef.current = currentTrigger;
		if (previousTrigger && currentTrigger && currentTrigger !== previousTrigger) {
			store.set("instantType", void 0);
			const abortController = new AbortController();
			runOnceAnimationsFinish(() => {
				store.set("instantType", "trigger-change");
			}, abortController.signal);
			return () => {
				abortController.abort();
			};
		}
	}, [
		domReference,
		runOnceAnimationsFinish,
		store
	]);
	const state = {
		open,
		side: positioner.side,
		align: positioner.align,
		anchorHidden: positioner.anchorHidden,
		nested: parent.type === "menu",
		instant: instantType
	};
	const menubarModal = parent.type === "menubar" && parent.context.modal;
	useAnchoredPopupScrollLock(open && (menubarModal || modal && lastOpenChangeReason !== "trigger-hover"), openMethod === "touch", positionerElement, triggerElement);
	const element = usePositioner(componentProps, state, {
		styles: positioner.positionerStyles,
		transitionStatus,
		props: elementProps,
		refs: [forwardedRef, store.useStateSetter("positionerElement")],
		hidden: !mounted,
		inert: !open
	});
	const shouldRenderBackdrop = mounted && parent.type !== "menu" && (parent.type !== "menubar" && modal && lastOpenChangeReason !== "trigger-hover" || parent.type === "menubar" && parent.context.modal);
	let backdropCutout = null;
	if (parent.type === "menubar") backdropCutout = parent.context.contentElement;
	else if (parent.type === void 0) backdropCutout = triggerElement;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuPositionerContext.Provider, {
		value: positioner,
		children: [shouldRenderBackdrop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
			ref: parent.type === "context-menu" || parent.type === "nested-context-menu" ? parent.context.internalBackdropRef : null,
			inert: inertValue(!open),
			cutout: backdropCutout
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingNode, {
			id: floatingNodeId,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeList, {
				elementsRef: store.context.itemDomElements,
				labelsRef: store.context.itemLabels,
				children: element
			})
		})]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/radio-group/MenuRadioGroupContext.js
var MenuRadioGroupContext = /* @__PURE__ */ import_react.createContext(void 0);
function useMenuRadioGroupContext() {
	const context = import_react.useContext(MenuRadioGroupContext);
	if (context === void 0) throw new Error(formatErrorMessage(34));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/radio-group/MenuRadioGroup.js
/**
* Groups related radio items.
* Renders a `<div>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuRadioGroup = /* @__PURE__ */ import_react.memo(/* @__PURE__ */ import_react.forwardRef(function MenuRadioGroup(componentProps, forwardedRef) {
	const { render, className, value: valueProp, defaultValue, onValueChange: onValueChangeProp, disabled = false, style, ...elementProps } = componentProps;
	const [value, setValueUnwrapped] = useControlled({
		controlled: valueProp,
		default: defaultValue,
		name: "MenuRadioGroup"
	});
	const onValueChange = useStableCallback(onValueChangeProp);
	const setValue = useStableCallback((newValue, eventDetails) => {
		onValueChange?.(newValue, eventDetails);
		if (eventDetails.isCanceled) return;
		setValueUnwrapped(newValue);
	});
	const element = useRenderElement("div", componentProps, {
		state: { disabled },
		ref: forwardedRef,
		props: {
			role: "group",
			"aria-disabled": disabled || void 0,
			...elementProps
		}
	});
	const context = import_react.useMemo(() => ({
		value,
		setValue,
		disabled
	}), [
		value,
		setValue,
		disabled
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRadioGroupContext.Provider, {
		value: context,
		children: element
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/radio-item/MenuRadioItemContext.js
var MenuRadioItemContext = /* @__PURE__ */ import_react.createContext(void 0);
function useMenuRadioItemContext() {
	const context = import_react.useContext(MenuRadioItemContext);
	if (context === void 0) throw new Error(formatErrorMessage(35));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/radio-item/MenuRadioItem.js
/**
* A menu item that works like a radio button in a given group.
* Renders a `<div>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuRadioItem = /* @__PURE__ */ import_react.forwardRef(function MenuRadioItem(componentProps, forwardedRef) {
	const { render, className, id: idProp, label, nativeButton = false, disabled: disabledProp = false, closeOnClick = false, value, style, ...elementProps } = componentProps;
	const listItem = useCompositeListItem({ label });
	const menuPositionerContext = useMenuPositionerContext(true);
	const id = useBaseUiId(idProp);
	const { store } = useMenuRootContext();
	const highlighted = store.useState("isActive", listItem.index);
	const itemProps = store.useState("itemProps");
	const { value: selectedValue, setValue: setSelectedValue, disabled: groupDisabled } = useMenuRadioGroupContext();
	const disabled = groupDisabled || disabledProp;
	const checked = selectedValue === value;
	const { getItemProps, itemRef } = useMenuItem({
		closeOnClick,
		disabled,
		highlighted,
		id,
		store,
		nativeButton,
		nodeId: menuPositionerContext?.context.nodeId,
		itemMetadata: REGULAR_ITEM
	});
	const state = import_react.useMemo(() => ({
		disabled,
		highlighted,
		checked
	}), [
		disabled,
		highlighted,
		checked
	]);
	const element = useRenderElement("div", componentProps, {
		state,
		stateAttributesMapping: itemMapping,
		props: [
			itemProps,
			{
				role: "menuitemradio",
				"aria-checked": checked,
				onClick: useStableCallback((event) => {
					setSelectedValue(value, {
						...createChangeEventDetails(itemPress, event.nativeEvent),
						preventUnmountOnClose: () => {}
					});
				})
			},
			elementProps,
			getItemProps
		],
		ref: [
			itemRef,
			forwardedRef,
			listItem.ref
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRadioItemContext.Provider, {
		value: state,
		children: element
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/radio-item-indicator/MenuRadioItemIndicator.js
/**
* Indicates whether the radio item is selected.
* Renders a `<span>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuRadioItemIndicator = /* @__PURE__ */ import_react.forwardRef(function MenuRadioItemIndicator(componentProps, forwardedRef) {
	const { render, className, style, keepMounted = false, ...elementProps } = componentProps;
	const item = useMenuRadioItemContext();
	const indicatorRef = import_react.useRef(null);
	const { transitionStatus, setMounted } = useTransitionStatus(item.checked);
	useOpenChangeComplete({
		open: item.checked,
		ref: indicatorRef,
		onComplete() {
			if (!item.checked) setMounted(false);
		}
	});
	return useRenderElement("span", componentProps, {
		state: {
			checked: item.checked,
			disabled: item.disabled,
			highlighted: item.highlighted,
			transitionStatus
		},
		stateAttributesMapping: itemMapping,
		ref: [forwardedRef, indicatorRef],
		props: {
			"aria-hidden": true,
			...elementProps
		},
		enabled: keepMounted || item.checked
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menubar/MenubarContext.js
var MenubarContext = /* @__PURE__ */ import_react.createContext(null);
function useMenubarContext(optional) {
	const context = import_react.useContext(MenubarContext);
	if (context === null && !optional) throw new Error(formatErrorMessage(5));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/store/MenuStore.js
var selectors$3 = {
	...popupStoreSelectors,
	disabled: createSelector((state) => state.parent.type === "menubar" ? state.parent.context.disabled || state.disabled : state.disabled),
	modal: createSelector((state) => (state.parent.type === void 0 || state.parent.type === "context-menu") && (state.modal ?? true)),
	openMethod: createSelector((state) => state.openMethod),
	allowMouseEnter: createSelector((state) => state.allowMouseEnter),
	stickIfOpen: createSelector((state) => state.stickIfOpen),
	parent: createSelector((state) => state.parent),
	rootId: createSelector((state) => {
		if (state.parent.type === "menu") return state.parent.store.select("rootId");
		return state.parent.type !== void 0 ? state.parent.context.rootId : state.rootId;
	}),
	activeIndex: createSelector((state) => state.activeIndex),
	isActive: createSelector((state, itemIndex) => state.activeIndex === itemIndex),
	hoverEnabled: createSelector((state) => state.hoverEnabled),
	instantType: createSelector((state) => state.instantType),
	lastOpenChangeReason: createSelector((state) => state.openChangeReason),
	floatingTreeRoot: createSelector((state) => {
		if (state.parent.type === "menu") return state.parent.store.select("floatingTreeRoot");
		return state.floatingTreeRoot;
	}),
	floatingNodeId: createSelector((state) => state.floatingNodeId),
	floatingParentNodeId: createSelector((state) => state.floatingParentNodeId),
	itemProps: createSelector((state) => state.itemProps),
	closeDelay: createSelector((state) => state.closeDelay),
	hasViewport: createSelector((state) => state.hasViewport),
	keyboardEventRelay: createSelector((state) => {
		if (state.keyboardEventRelay) return state.keyboardEventRelay;
		if (state.parent.type === "menu") return state.parent.store.select("keyboardEventRelay");
	})
};
var MenuStore = class MenuStore extends ReactStore {
	constructor(initialState) {
		super({
			...createInitialState$3(),
			...initialState
		}, {
			positionerRef: /* @__PURE__ */ import_react.createRef(),
			popupRef: /* @__PURE__ */ import_react.createRef(),
			typingRef: { current: false },
			itemDomElements: { current: [] },
			itemLabels: { current: [] },
			allowMouseUpTriggerRef: { current: false },
			triggerFocusTargetRef: /* @__PURE__ */ import_react.createRef(),
			beforeContentFocusGuardRef: /* @__PURE__ */ import_react.createRef(),
			onOpenChangeComplete: void 0,
			triggerElements: new PopupTriggerMap()
		}, selectors$3);
		this.unsubscribeParentListener = this.observe("parent", (parent) => {
			this.unsubscribeParentListener?.();
			if (parent.type === "menu") {
				let rootId = parent.store.select("rootId");
				let floatingTreeRoot = parent.store.select("floatingTreeRoot");
				let keyboardEventRelay = parent.store.select("keyboardEventRelay");
				this.unsubscribeParentListener = parent.store.subscribe(() => {
					const nextRootId = parent.store.select("rootId");
					const nextFloatingTreeRoot = parent.store.select("floatingTreeRoot");
					const nextKeyboardEventRelay = parent.store.select("keyboardEventRelay");
					if (rootId === nextRootId && floatingTreeRoot === nextFloatingTreeRoot && keyboardEventRelay === nextKeyboardEventRelay) return;
					rootId = nextRootId;
					floatingTreeRoot = nextFloatingTreeRoot;
					keyboardEventRelay = nextKeyboardEventRelay;
					this.notifyAll();
				});
				this.context.allowMouseUpTriggerRef = parent.store.context.allowMouseUpTriggerRef;
				return;
			}
			if (parent.type !== void 0) this.context.allowMouseUpTriggerRef = parent.context.allowMouseUpTriggerRef;
			this.unsubscribeParentListener = null;
		});
	}
	setOpen(open, eventDetails) {
		this.state.floatingRootContext.context.events.emit("setOpen", {
			open,
			eventDetails
		});
	}
	static useStore(externalStore, initialState) {
		const internalStore = useRefWithInit(() => {
			return new MenuStore(initialState);
		}).current;
		return externalStore ?? internalStore;
	}
	unsubscribeParentListener = null;
};
function createInitialState$3() {
	return {
		...createInitialPopupStoreState(),
		disabled: false,
		modal: true,
		openMethod: null,
		allowMouseEnter: false,
		stickIfOpen: true,
		parent: { type: void 0 },
		rootId: void 0,
		activeIndex: null,
		hoverEnabled: true,
		instantType: void 0,
		openChangeReason: null,
		floatingTreeRoot: new FloatingTreeStore(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: EMPTY_OBJECT,
		keyboardEventRelay: void 0,
		closeDelay: 0,
		hasViewport: false
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/submenu-root/MenuSubmenuRootContext.js
var MenuSubmenuRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useMenuSubmenuRootContext() {
	return import_react.useContext(MenuSubmenuRootContext);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/root/MenuRoot.js
/**
* Groups all parts of the menu.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuRoot = fastComponent(function MenuRoot(props) {
	const { children, open: openProp, onOpenChange, onOpenChangeComplete, defaultOpen = false, disabled: disabledProp = false, modal: modalProp, loopFocus = true, orientation = "vertical", actionsRef, closeParentOnEsc = false, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null, highlightItemOnHover = true } = props;
	const contextMenuContext = useContextMenuRootContext(true);
	const parentMenuRootContext = useMenuRootContext(true);
	const menubarContext = useMenubarContext(true);
	const isSubmenu = useMenuSubmenuRootContext();
	const parentFromContext = import_react.useMemo(() => {
		if (isSubmenu && parentMenuRootContext) return {
			type: "menu",
			store: parentMenuRootContext.store
		};
		if (menubarContext) return {
			type: "menubar",
			context: menubarContext
		};
		if (contextMenuContext && !parentMenuRootContext) return {
			type: "context-menu",
			context: contextMenuContext
		};
		return { type: void 0 };
	}, [
		contextMenuContext,
		parentMenuRootContext,
		menubarContext,
		isSubmenu
	]);
	const store = MenuStore.useStore(handle?.store, {
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp,
		parent: parentFromContext
	});
	useOnFirstRender(() => {
		if (openProp === void 0 && store.state.open === false && defaultOpen === true) store.update({
			open: true,
			activeTriggerId: defaultTriggerIdProp
		});
	});
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const floatingTreeRoot = store.useState("floatingTreeRoot");
	const floatingNodeIdFromContext = useFloatingNodeId(floatingTreeRoot);
	const floatingParentNodeIdFromContext = useFloatingParentNodeId();
	useIsoLayoutEffect(() => {
		if (contextMenuContext && !parentMenuRootContext) store.update({
			parent: {
				type: "context-menu",
				context: contextMenuContext
			},
			floatingNodeId: floatingNodeIdFromContext,
			floatingParentNodeId: floatingParentNodeIdFromContext
		});
		else if (parentMenuRootContext) store.update({
			floatingNodeId: floatingNodeIdFromContext,
			floatingParentNodeId: floatingParentNodeIdFromContext
		});
	}, [
		contextMenuContext,
		parentMenuRootContext,
		floatingNodeIdFromContext,
		floatingParentNodeIdFromContext,
		store
	]);
	const open = store.useState("open");
	const activeTriggerElement = store.useState("activeTriggerElement");
	const positionerElement = store.useState("positionerElement");
	const hoverEnabled = store.useState("hoverEnabled");
	const disabled = store.useState("disabled");
	const lastOpenChangeReason = store.useState("lastOpenChangeReason");
	const parent = store.useState("parent");
	const activeIndex = store.useState("activeIndex");
	const payload = store.useState("payload");
	const floatingParentNodeId = store.useState("floatingParentNodeId");
	const openEventRef = import_react.useRef(null);
	const nested = floatingParentNodeId != null;
	const { openMethod, triggerProps: interactionTypeProps } = useOpenInteractionType(open);
	store.useSyncedValues({
		disabled: disabledProp,
		modal: parent.type === void 0 ? modalProp : void 0,
		openMethod,
		rootId: useId()
	});
	useImplicitActiveTrigger(store);
	const { forceUnmount } = useOpenStateTransitions(open, store, () => {
		store.update({
			allowMouseEnter: false,
			stickIfOpen: true
		});
	});
	const allowOutsidePressDismissalRef = import_react.useRef(parent.type !== "context-menu");
	const allowOutsidePressDismissalTimeout = useTimeout();
	import_react.useEffect(() => {
		if (!open) openEventRef.current = null;
		if (parent.type !== "context-menu") return;
		if (!open) {
			allowOutsidePressDismissalTimeout.clear();
			allowOutsidePressDismissalRef.current = false;
			return;
		}
		allowOutsidePressDismissalTimeout.start(500, () => {
			allowOutsidePressDismissalRef.current = true;
		});
	}, [
		allowOutsidePressDismissalTimeout,
		open,
		parent.type
	]);
	useIsoLayoutEffect(() => {
		if (!open && !hoverEnabled) store.set("hoverEnabled", true);
	}, [
		open,
		hoverEnabled,
		store
	]);
	const allowTouchToCloseRef = import_react.useRef(true);
	const allowTouchToCloseTimeout = useTimeout();
	const setOpen = useStableCallback((nextOpen, eventDetails) => {
		const reason = eventDetails.reason;
		if (open === nextOpen && eventDetails.trigger === activeTriggerElement && lastOpenChangeReason === reason) return;
		eventDetails.preventUnmountOnClose = () => {
			store.set("preventUnmountingOnClose", true);
		};
		if (!nextOpen && eventDetails.trigger == null) eventDetails.trigger = activeTriggerElement ?? void 0;
		onOpenChange?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		store.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
		const nativeEvent = eventDetails.event;
		if (nextOpen === false && nativeEvent?.type === "click" && nativeEvent.pointerType === "touch" && !allowTouchToCloseRef.current) return;
		if (!nextOpen && activeIndex !== null) {
			const activeOption = store.context.itemDomElements.current[activeIndex];
			queueMicrotask(() => {
				activeOption?.setAttribute("tabindex", "-1");
			});
		}
		if (nextOpen && reason === "trigger-focus") {
			allowTouchToCloseRef.current = false;
			allowTouchToCloseTimeout.start(300, () => {
				allowTouchToCloseRef.current = true;
			});
		} else {
			allowTouchToCloseRef.current = true;
			allowTouchToCloseTimeout.clear();
		}
		const isKeyboardClick = (reason === "trigger-press" || reason === "item-press") && nativeEvent.detail === 0 && nativeEvent?.isTrusted;
		const isDismissClose = !nextOpen && (reason === "escape-key" || reason == null);
		const updatedState = {
			open: nextOpen,
			openChangeReason: reason
		};
		openEventRef.current = eventDetails.event ?? null;
		const newTriggerId = eventDetails.trigger?.id ?? null;
		if (newTriggerId || nextOpen) {
			updatedState.activeTriggerId = newTriggerId;
			updatedState.activeTriggerElement = eventDetails.trigger ?? null;
		}
		store.update(updatedState);
		if (parent.type === "menubar" && (reason === "trigger-focus" || reason === "focus-out" || reason === "trigger-hover" || reason === "list-navigation" || reason === "sibling-open")) store.set("instantType", "group");
		else if (isKeyboardClick || isDismissClose) store.set("instantType", isKeyboardClick ? "click" : "dismiss");
		else store.set("instantType", void 0);
	});
	const handleImperativeClose = import_react.useCallback(() => {
		store.setOpen(false, createChangeEventDetails(imperativeAction));
	}, [store]);
	import_react.useImperativeHandle(actionsRef, () => ({
		unmount: forceUnmount,
		close: handleImperativeClose
	}), [forceUnmount, handleImperativeClose]);
	let ctx;
	if (parent.type === "context-menu") ctx = parent.context;
	import_react.useImperativeHandle(ctx?.positionerRef, () => positionerElement, [positionerElement]);
	import_react.useImperativeHandle(ctx?.actionsRef, () => ({ setOpen }), [setOpen]);
	const floatingRootContext = useSyncedFloatingRootContext({
		popupStore: store,
		onOpenChange: setOpen
	});
	const floatingEvents = floatingRootContext.context.events;
	import_react.useEffect(() => {
		const handleSetOpenEvent = ({ open: nextOpen, eventDetails }) => setOpen(nextOpen, eventDetails);
		floatingEvents.on("setOpen", handleSetOpenEvent);
		return () => {
			floatingEvents?.off("setOpen", handleSetOpenEvent);
		};
	}, [floatingEvents, setOpen]);
	const dismiss = useDismiss(floatingRootContext, {
		enabled: !disabled,
		bubbles: { escapeKey: closeParentOnEsc && parent.type === "menu" },
		outsidePress() {
			if (parent.type !== "context-menu" || openEventRef.current?.type === "contextmenu") return true;
			return allowOutsidePressDismissalRef.current;
		},
		externalTree: nested ? floatingTreeRoot : void 0
	});
	const role = useRole(floatingRootContext, { role: "menu" });
	const direction = useDirection();
	const setActiveIndex = import_react.useCallback((index) => {
		if (store.select("activeIndex") === index) return;
		store.set("activeIndex", index);
	}, [store]);
	const listNavigation$1 = useListNavigation(floatingRootContext, {
		enabled: !disabled,
		listRef: store.context.itemDomElements,
		activeIndex,
		nested: parent.type !== void 0,
		loopFocus,
		orientation,
		parentOrientation: parent.type === "menubar" ? parent.context.orientation : void 0,
		rtl: direction === "rtl",
		disabledIndices: EMPTY_ARRAY$1,
		onNavigate: setActiveIndex,
		openOnArrowKeyDown: parent.type !== "context-menu",
		externalTree: nested ? floatingTreeRoot : void 0,
		focusItemOnHover: highlightItemOnHover
	});
	const onTypingChange = import_react.useCallback((nextTyping) => {
		store.context.typingRef.current = nextTyping;
	}, [store]);
	const { getReferenceProps, getFloatingProps, getItemProps, getTriggerProps } = useInteractions([
		dismiss,
		role,
		listNavigation$1,
		useTypeahead(floatingRootContext, {
			listRef: store.context.itemLabels,
			elementsRef: store.context.itemDomElements,
			activeIndex,
			resetMs: 500,
			onMatch: (index) => {
				if (open && index !== activeIndex) store.set("activeIndex", index);
			},
			onTypingChange
		})
	]);
	const activeTriggerProps = import_react.useMemo(() => {
		const mergedProps = mergeProps$1(getReferenceProps(), { onMouseMove() {
			store.set("allowMouseEnter", true);
		} }, interactionTypeProps);
		delete mergedProps.role;
		return mergedProps;
	}, [
		getReferenceProps,
		store,
		interactionTypeProps
	]);
	const inactiveTriggerProps = import_react.useMemo(() => {
		const triggerProps = getTriggerProps();
		if (!triggerProps) return triggerProps;
		const mergedProps = mergeProps$1(triggerProps, interactionTypeProps);
		delete mergedProps.role;
		delete mergedProps["aria-controls"];
		return mergedProps;
	}, [getTriggerProps, interactionTypeProps]);
	const popupProps = import_react.useMemo(() => getFloatingProps({
		onMouseMove() {
			store.set("allowMouseEnter", true);
			if (parent.type === "menu") store.set("hoverEnabled", false);
		},
		onClick() {
			if (store.select("hoverEnabled")) store.set("hoverEnabled", false);
		},
		onKeyDown(event) {
			const relay = store.select("keyboardEventRelay");
			if (relay && !event.isPropagationStopped()) relay(event);
		}
	}), [
		getFloatingProps,
		parent.type,
		store
	]);
	const itemProps = import_react.useMemo(() => getItemProps(), [getItemProps]);
	store.useSyncedValues({
		floatingRootContext,
		activeTriggerProps,
		inactiveTriggerProps,
		popupProps,
		itemProps
	});
	const context = import_react.useMemo(() => ({
		store,
		parent: parentFromContext
	}), [store, parentFromContext]);
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContext.Provider, {
		value: context,
		children: typeof children === "function" ? children({ payload }) : children
	});
	if (parent.type === void 0 || parent.type === "context-menu") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingTree, {
		externalTree: floatingTreeRoot,
		children: content
	});
	return content;
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/submenu-root/MenuSubmenuRoot.js
/**
* Groups all parts of a submenu.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
function MenuSubmenuRoot(props) {
	const parentMenu = useMenuRootContext().store;
	const contextValue = import_react.useMemo(() => ({ parentMenu }), [parentMenu]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuSubmenuRootContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRoot, { ...props })
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/item/useCompositeItem.js
function useCompositeItem(params = {}) {
	const { highlightItemOnHover, highlightedIndex, onHighlightedIndexChange } = useCompositeRootContext();
	const { ref, index } = useCompositeListItem(params);
	const isHighlighted = highlightedIndex === index;
	const itemRef = import_react.useRef(null);
	const mergedRef = useMergedRefs(ref, itemRef);
	return {
		compositeProps: import_react.useMemo(() => ({
			tabIndex: isHighlighted ? 0 : -1,
			onFocus() {
				onHighlightedIndexChange(index);
			},
			onMouseMove() {
				const item = itemRef.current;
				if (!highlightItemOnHover || !item) return;
				const disabled = item.hasAttribute("disabled") || item.ariaDisabled === "true";
				if (!isHighlighted && !disabled) item.focus();
			}
		}), [
			isHighlighted,
			onHighlightedIndexChange,
			index,
			highlightItemOnHover
		]),
		compositeRef: mergedRef,
		index
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/item/CompositeItem.js
/**
* @internal
*/
function CompositeItem(componentProps) {
	const { render, className, style, state = EMPTY_OBJECT, props = EMPTY_ARRAY$1, refs = EMPTY_ARRAY$1, metadata, stateAttributesMapping, tag = "div", ...elementProps } = componentProps;
	const { compositeProps, compositeRef } = useCompositeItem({ metadata });
	return useRenderElement(tag, componentProps, {
		state,
		ref: [...refs, compositeRef],
		props: [
			compositeProps,
			...props,
			elementProps
		],
		stateAttributesMapping
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/utils/findRootOwnerId.js
function findRootOwnerId(node) {
	if (isHTMLElement(node) && node.hasAttribute("data-rootownerid")) return node.getAttribute("data-rootownerid") ?? void 0;
	if (isLastTraversableNode(node)) return;
	return findRootOwnerId(getParentNode(node));
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/popups/useTriggerFocusGuards.js
/**
* Minimal store interface required by the focus guard hook.
* Both PopoverStore and MenuStore satisfy this interface.
*/
/**
* Provides focus guard handlers for popup triggers (Popover, Menu).
*
* When the popup is open, invisible focus guard elements are placed before and after
* the trigger. These handlers close the popup and move focus to the appropriate
* tabbable element when the guards receive focus (i.e. when the user tabs out).
*/
function useTriggerFocusGuards(store, triggerElementRef) {
	const preFocusGuardRef = import_react.useRef(null);
	return {
		preFocusGuardRef,
		handlePreFocusGuardFocus: useStableCallback((event) => {
			import_react_dom.flushSync(() => {
				store.setOpen(false, createChangeEventDetails(focusOut, event.nativeEvent, event.currentTarget));
			});
			getTabbableBeforeElement(preFocusGuardRef.current)?.focus();
		}),
		handleFocusTargetFocus: useStableCallback((event) => {
			const positionerElement = store.select("positionerElement");
			if (positionerElement && isOutsideEvent(event, positionerElement)) store.context.beforeContentFocusGuardRef.current?.focus();
			else {
				import_react_dom.flushSync(() => {
					store.setOpen(false, createChangeEventDetails(focusOut, event.nativeEvent, event.currentTarget));
				});
				let nextTabbable = getTabbableAfterElement(store.context.triggerFocusTargetRef.current || triggerElementRef.current);
				while (nextTabbable !== null && contains(positionerElement, nextTabbable)) {
					const prevTabbable = nextTabbable;
					nextTabbable = getNextTabbable(nextTabbable);
					if (nextTabbable === prevTabbable) break;
				}
				nextTabbable?.focus();
			}
		})
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/useMixedToggleClickHandler.js
/**
* Returns `click` and `mousedown` handlers that fix the behavior of triggers of popups that are toggled by different events.
* For example, a button that opens a popup on mousedown and closes it on click.
* This hook prevents the popup from closing immediately after the mouse button is released.
*/
function useMixedToggleClickHandler(params) {
	const { enabled = true, mouseDownAction, open } = params;
	const ignoreClickRef = import_react.useRef(false);
	return import_react.useMemo(() => {
		if (!enabled) return EMPTY_OBJECT;
		return {
			onMouseDown: (event) => {
				if (mouseDownAction === "open" && !open || mouseDownAction === "close" && open) {
					ignoreClickRef.current = true;
					ownerDocument(event.currentTarget).addEventListener("click", () => {
						ignoreClickRef.current = false;
					}, { once: true });
				}
			},
			onClick: (event) => {
				if (ignoreClickRef.current) {
					ignoreClickRef.current = false;
					event.preventBaseUIHandler();
				}
			}
		};
	}, [
		enabled,
		mouseDownAction,
		open
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/trigger/MenuTrigger.js
var BOUNDARY_OFFSET = 2;
/**
* A button that opens the menu.
* Renders a `<button>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuTrigger = fastComponentRef(function MenuTrigger(componentProps, forwardedRef) {
	const { render, className, disabled: disabledProp = false, nativeButton = true, id: idProp, openOnHover: openOnHoverProp, delay = 100, closeDelay = 0, handle, payload, style, ...elementProps } = componentProps;
	const rootContext = useMenuRootContext(true);
	const store = handle?.store ?? rootContext?.store;
	if (!store) throw new Error(formatErrorMessage(85));
	const thisTriggerId = useBaseUiId(idProp);
	const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
	const floatingRootContext = store.useState("floatingRootContext");
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const triggerElementRef = import_react.useRef(null);
	const parent = useMenuParent();
	const compositeRootContext = useCompositeRootContext(true);
	const floatingTreeRootFromContext = useFloatingTree();
	const floatingTreeRoot = import_react.useMemo(() => {
		return floatingTreeRootFromContext ?? new FloatingTreeStore();
	}, [floatingTreeRootFromContext]);
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
		payload,
		closeDelay,
		parent,
		floatingTreeRoot,
		floatingNodeId: useFloatingNodeId(floatingTreeRoot),
		floatingParentNodeId: useFloatingParentNodeId(),
		keyboardEventRelay: compositeRootContext?.relayKeyboardEvent
	});
	const isInMenubar = parent.type === "menubar";
	const rootDisabled = store.useState("disabled");
	const disabled = disabledProp || rootDisabled || isInMenubar && parent.context.disabled;
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	import_react.useEffect(() => {
		if (!isOpenedByThisTrigger && parent.type === void 0) store.context.allowMouseUpTriggerRef.current = false;
	}, [
		store,
		isOpenedByThisTrigger,
		parent.type
	]);
	const triggerRef = import_react.useRef(null);
	const allowMouseUpTriggerTimeout = useTimeout();
	const handleDocumentMouseUp = useStableCallback((mouseEvent) => {
		if (!triggerRef.current) return;
		allowMouseUpTriggerTimeout.clear();
		store.context.allowMouseUpTriggerRef.current = false;
		const mouseUpTarget = mouseEvent.target;
		if (contains(triggerRef.current, mouseUpTarget) || contains(store.select("positionerElement"), mouseUpTarget) || mouseUpTarget === triggerRef.current) return;
		if (mouseUpTarget != null && findRootOwnerId(mouseUpTarget) === store.select("rootId")) return;
		const bounds = getPseudoElementBounds(triggerRef.current);
		if (mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET && mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET) return;
		floatingTreeRoot.events.emit("close", {
			domEvent: mouseEvent,
			reason: cancelOpen
		});
	});
	import_react.useEffect(() => {
		if (isOpenedByThisTrigger && store.select("lastOpenChangeReason") === "trigger-hover") ownerDocument(triggerRef.current).addEventListener("mouseup", handleDocumentMouseUp, { once: true });
	}, [
		isOpenedByThisTrigger,
		handleDocumentMouseUp,
		store
	]);
	const parentMenubarHasSubmenuOpen = isInMenubar && parent.context.hasSubmenuOpen;
	const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
		enabled: (openOnHoverProp ?? parentMenubarHasSubmenuOpen) && !disabled && parent.type !== "context-menu" && (!isInMenubar || parentMenubarHasSubmenuOpen && !isMountedByThisTrigger),
		handleClose: safePolygon({ blockPointerEvents: !isInMenubar }),
		mouseOnly: true,
		move: false,
		restMs: parent.type === void 0 ? delay : void 0,
		delay: { close: closeDelay },
		triggerElementRef,
		externalTree: floatingTreeRoot,
		isActiveTrigger: isTriggerActive,
		isClosing: () => store.select("transitionStatus") === "ending"
	});
	const stickIfOpen = useStickIfOpen(isOpenedByThisTrigger, store.select("lastOpenChangeReason"));
	const click = useClick(floatingRootContext, {
		enabled: !disabled && parent.type !== "context-menu",
		event: isOpenedByThisTrigger && isInMenubar ? "click" : "mousedown",
		toggle: true,
		ignoreMouse: false,
		stickIfOpen: parent.type === void 0 ? stickIfOpen : false
	});
	const focus = useFocus(floatingRootContext, { enabled: !disabled && parentMenubarHasSubmenuOpen });
	const mixedToggleHandlers = useMixedToggleClickHandler({
		open: isOpenedByThisTrigger,
		enabled: isInMenubar,
		mouseDownAction: "open"
	});
	const localInteractionProps = useInteractions([click, focus]);
	const state = {
		disabled,
		open: isOpenedByThisTrigger
	};
	const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
	const ref = [
		triggerRef,
		forwardedRef,
		buttonRef,
		registerTrigger,
		triggerElementRef
	];
	const props = [
		localInteractionProps.getReferenceProps(),
		hoverProps ?? EMPTY_OBJECT,
		rootTriggerProps,
		{
			"aria-haspopup": "menu",
			id: thisTriggerId,
			onMouseDown: (event) => {
				if (store.select("open")) return;
				allowMouseUpTriggerTimeout.start(200, () => {
					store.context.allowMouseUpTriggerRef.current = true;
				});
				ownerDocument(event.currentTarget).addEventListener("mouseup", handleDocumentMouseUp, { once: true });
			}
		},
		isInMenubar ? { role: "menuitem" } : {},
		mixedToggleHandlers,
		elementProps,
		getButtonProps
	];
	const { preFocusGuardRef, handlePreFocusGuardFocus, handleFocusTargetFocus } = useTriggerFocusGuards(store, triggerElementRef);
	const element = useRenderElement("button", componentProps, {
		enabled: !isInMenubar,
		stateAttributesMapping: pressableTriggerOpenStateMapping,
		state,
		ref,
		props
	});
	if (isInMenubar) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeItem, {
		tag: "button",
		render,
		className,
		style,
		state,
		refs: ref,
		props,
		stateAttributesMapping: pressableTriggerOpenStateMapping
	});
	if (isOpenedByThisTrigger) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
			ref: preFocusGuardRef,
			onFocus: handlePreFocusGuardFocus
		}, `${thisTriggerId}-pre-focus-guard`),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: element }, thisTriggerId),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
			ref: store.context.triggerFocusTargetRef,
			onFocus: handleFocusTargetFocus
		}, `${thisTriggerId}-post-focus-guard`)
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: element }, thisTriggerId);
});
/**
* Determines whether to ignore clicks after a hover-open.
*/
function useStickIfOpen(open, openReason) {
	const stickIfOpenTimeout = useTimeout();
	const [stickIfOpen, setStickIfOpen] = import_react.useState(false);
	useIsoLayoutEffect(() => {
		if (open && openReason === "trigger-hover") {
			setStickIfOpen(true);
			stickIfOpenTimeout.start(500, () => {
				setStickIfOpen(false);
			});
		} else if (!open) {
			stickIfOpenTimeout.clear();
			setStickIfOpen(false);
		}
	}, [
		open,
		openReason,
		stickIfOpenTimeout
	]);
	return stickIfOpen;
}
function useMenuParent() {
	const contextMenuContext = useContextMenuRootContext(true);
	const parentContext = useMenuRootContext(true);
	const menubarContext = useMenubarContext(true);
	return import_react.useMemo(() => {
		if (menubarContext) return {
			type: "menubar",
			context: menubarContext
		};
		if (contextMenuContext && !parentContext) return {
			type: "context-menu",
			context: contextMenuContext
		};
		return { type: void 0 };
	}, [
		contextMenuContext,
		parentContext,
		menubarContext
	]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/direction-provider/DirectionProvider.js
/**
* Enables RTL behavior for Base UI components.
*
* Documentation: [Base UI Direction Provider](https://base-ui.com/react/utils/direction-provider)
*/
var DirectionProvider = function DirectionProvider(props) {
	const { direction = "ltr" } = props;
	const contextValue = import_react.useMemo(() => ({ direction }), [direction]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DirectionContext.Provider, {
		value: contextValue,
		children: props.children
	});
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/menu/submenu-trigger/MenuSubmenuTrigger.js
/**
* A menu item that opens a submenu.
* Renders a `<div>` element.
*
* Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
*/
var MenuSubmenuTrigger = /* @__PURE__ */ import_react.forwardRef(function SubmenuTriggerComponent(componentProps, forwardedRef) {
	const { render, className, label, id: idProp, nativeButton = false, openOnHover = true, delay = 100, closeDelay = 0, disabled: disabledProp = false, style, ...elementProps } = componentProps;
	const listItem = useCompositeListItem();
	const menuPositionerContext = useMenuPositionerContext();
	const { store } = useMenuRootContext();
	const thisTriggerId = useBaseUiId(idProp);
	const open = store.useState("open");
	const floatingRootContext = store.useState("floatingRootContext");
	const floatingTreeRoot = store.useState("floatingTreeRoot");
	const baseRegisterTrigger = useTriggerRegistration(thisTriggerId, store);
	const registerTrigger = import_react.useCallback((element) => {
		const cleanup = baseRegisterTrigger(element);
		if (element !== null && store.select("open") && store.select("activeTriggerId") == null) store.update({
			activeTriggerId: thisTriggerId,
			activeTriggerElement: element,
			closeDelay
		});
		return cleanup;
	}, [
		baseRegisterTrigger,
		closeDelay,
		store,
		thisTriggerId
	]);
	const triggerElementRef = import_react.useRef(null);
	const handleTriggerElementRef = import_react.useCallback((el) => {
		triggerElementRef.current = el;
		store.set("activeTriggerElement", el);
	}, [store]);
	const submenuRootContext = useMenuSubmenuRootContext();
	if (!submenuRootContext?.parentMenu) throw new Error(formatErrorMessage(37));
	store.useSyncedValue("closeDelay", closeDelay);
	const parentMenuStore = submenuRootContext.parentMenu;
	const itemProps = parentMenuStore.useState("itemProps");
	const highlighted = parentMenuStore.useState("isActive", listItem.index);
	const itemMetadata = import_react.useMemo(() => ({
		type: "submenu-trigger",
		setActive() {
			parentMenuStore.set("activeIndex", listItem.index);
		}
	}), [parentMenuStore, listItem.index]);
	const rootDisabled = store.useState("disabled");
	const disabled = disabledProp || rootDisabled;
	const { getItemProps, itemRef } = useMenuItem({
		closeOnClick: false,
		disabled,
		highlighted,
		id: thisTriggerId,
		store,
		typingRef: parentMenuStore.context.typingRef,
		nativeButton,
		itemMetadata,
		nodeId: menuPositionerContext?.context.nodeId
	});
	const hoverEnabled = store.useState("hoverEnabled");
	const allowMouseEnter = parentMenuStore.useState("allowMouseEnter");
	const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
		enabled: hoverEnabled && openOnHover && !disabled,
		handleClose: safePolygon({ blockPointerEvents: true }),
		mouseOnly: true,
		move: true,
		restMs: delay,
		delay: allowMouseEnter ? {
			open: delay,
			close: closeDelay
		} : 0,
		triggerElementRef,
		externalTree: floatingTreeRoot,
		isClosing: () => store.select("transitionStatus") === "ending"
	});
	const localInteractionProps = useInteractions([useClick(floatingRootContext, {
		enabled: !disabled,
		event: "mousedown",
		toggle: !openOnHover,
		ignoreMouse: openOnHover,
		stickIfOpen: false
	})]);
	const rootTriggerProps = store.useState("triggerProps", true);
	delete rootTriggerProps.id;
	return useRenderElement("div", componentProps, {
		state: {
			disabled,
			highlighted,
			open
		},
		stateAttributesMapping: triggerOpenStateMapping$1,
		props: [
			localInteractionProps.getReferenceProps(),
			hoverProps,
			rootTriggerProps,
			itemProps,
			{
				tabIndex: open || highlighted ? 0 : -1,
				onBlur() {
					if (highlighted) parentMenuStore.set("activeIndex", null);
				}
			},
			elementProps,
			getItemProps
		],
		ref: [
			forwardedRef,
			listItem.ref,
			itemRef,
			registerTrigger,
			handleTriggerElementRef
		]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/context-menu/root/ContextMenuRoot.js
/**
* A component that creates a context menu activated by right clicking or long pressing.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Context Menu](https://base-ui.com/react/components/context-menu)
*/
function ContextMenuRoot(props) {
	const [anchor, setAnchor] = import_react.useState({ getBoundingClientRect() {
		return DOMRect.fromRect({
			width: 0,
			height: 0,
			x: 0,
			y: 0
		});
	} });
	const backdropRef = import_react.useRef(null);
	const internalBackdropRef = import_react.useRef(null);
	const actionsRef = import_react.useRef(null);
	const positionerRef = import_react.useRef(null);
	const allowMouseUpTriggerRef = import_react.useRef(true);
	const initialCursorPointRef = import_react.useRef(null);
	const id = useId();
	const contextValue = import_react.useMemo(() => ({
		anchor,
		setAnchor,
		actionsRef,
		backdropRef,
		internalBackdropRef,
		positionerRef,
		allowMouseUpTriggerRef,
		initialCursorPointRef,
		rootId: id
	}), [anchor, id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuRootContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRootContext.Provider, {
			value: void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRoot, { ...props })
		})
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/context-menu/trigger/ContextMenuTrigger.js
var LONG_PRESS_DELAY = 500;
/**
* An area that opens the menu on right click or long press.
* Renders a `<div>` element.
*
* Documentation: [Base UI Context Menu](https://base-ui.com/react/components/context-menu)
*/
var ContextMenuTrigger = /* @__PURE__ */ import_react.forwardRef(function ContextMenuTrigger(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { setAnchor, actionsRef, internalBackdropRef, backdropRef, positionerRef, allowMouseUpTriggerRef, initialCursorPointRef, rootId } = useContextMenuRootContext(false);
	const { store } = useMenuRootContext(false);
	const open = store.useState("open");
	const disabled = store.useState("disabled");
	const triggerRef = import_react.useRef(null);
	const touchPositionRef = import_react.useRef(null);
	const longPressTimeout = useTimeout();
	const allowMouseUpTimeout = useTimeout();
	const allowMouseUpRef = import_react.useRef(false);
	function handleLongPress(x, y, event) {
		const isTouchEvent = event.type.startsWith("touch");
		initialCursorPointRef.current = {
			x,
			y
		};
		setAnchor({ getBoundingClientRect() {
			return DOMRect.fromRect({
				width: isTouchEvent ? 10 : 0,
				height: isTouchEvent ? 10 : 0,
				x,
				y
			});
		} });
		allowMouseUpRef.current = false;
		actionsRef.current?.setOpen(true, createChangeEventDetails(triggerPress, event));
		allowMouseUpTimeout.start(LONG_PRESS_DELAY, () => {
			allowMouseUpRef.current = true;
		});
	}
	function handleContextMenu(event) {
		if (disabled) return;
		allowMouseUpTriggerRef.current = true;
		stopEvent(event);
		handleLongPress(event.clientX, event.clientY, event.nativeEvent);
		addEventListener(ownerDocument(triggerRef.current), "mouseup", (mouseEvent) => {
			allowMouseUpTriggerRef.current = false;
			if (!allowMouseUpRef.current) return;
			allowMouseUpTimeout.clear();
			allowMouseUpRef.current = false;
			const mouseUpTarget = getTarget(mouseEvent);
			if (contains(positionerRef.current, mouseUpTarget)) return;
			if (rootId && mouseUpTarget && findRootOwnerId(mouseUpTarget) === rootId) return;
			actionsRef.current?.setOpen(false, createChangeEventDetails(cancelOpen, mouseEvent));
		}, { once: true });
	}
	function handleTouchStart(event) {
		if (disabled) return;
		allowMouseUpTriggerRef.current = false;
		if (event.touches.length === 1) {
			event.stopPropagation();
			const touch = event.touches[0];
			touchPositionRef.current = {
				x: touch.clientX,
				y: touch.clientY
			};
			longPressTimeout.start(LONG_PRESS_DELAY, () => {
				if (touchPositionRef.current) handleLongPress(touchPositionRef.current.x, touchPositionRef.current.y, event.nativeEvent);
			});
		}
	}
	function handleTouchMove(event) {
		if (longPressTimeout.isStarted() && touchPositionRef.current && event.touches.length === 1) {
			const touch = event.touches[0];
			const moveThreshold = 10;
			const deltaX = Math.abs(touch.clientX - touchPositionRef.current.x);
			const deltaY = Math.abs(touch.clientY - touchPositionRef.current.y);
			if (deltaX > moveThreshold || deltaY > moveThreshold) longPressTimeout.clear();
		}
	}
	function handleTouchEnd() {
		longPressTimeout.clear();
		touchPositionRef.current = null;
	}
	import_react.useEffect(() => {
		function handleDocumentContextMenu(event) {
			if (disabled) return;
			const targetElement = getTarget(event);
			if (contains(triggerRef.current, targetElement) || contains(internalBackdropRef.current, targetElement) || contains(backdropRef.current, targetElement)) event.preventDefault();
		}
		return addEventListener(ownerDocument(triggerRef.current), "contextmenu", handleDocumentContextMenu);
	}, [
		backdropRef,
		disabled,
		internalBackdropRef
	]);
	return useRenderElement("div", componentProps, {
		state: { open },
		ref: [triggerRef, forwardedRef],
		props: [{
			onContextMenu: handleContextMenu,
			onTouchStart: handleTouchStart,
			onTouchMove: handleTouchMove,
			onTouchEnd: handleTouchEnd,
			onTouchCancel: handleTouchEnd,
			style: { WebkitTouchCallout: "none" }
		}, elementProps],
		stateAttributesMapping: pressableTriggerOpenStateMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/csp-provider/CSPContext.js
/**
* @internal
*/
var CSPContext = /* @__PURE__ */ import_react.createContext(void 0);
var DEFAULT_CSP_CONTEXT_VALUE = { disableStyleElements: false };
/**
* @internal
*/
function useCSPContext() {
	return import_react.useContext(CSPContext) ?? DEFAULT_CSP_CONTEXT_VALUE;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/clamp.js
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
	return Math.max(min, Math.min(val, max));
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/constants.js
var ACTIVE_COMPOSITE_ITEM = "data-composite-item-active";
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/root/useCompositeRoot.js
var EMPTY_ARRAY = [];
function useCompositeRoot(params) {
	const { itemSizes, cols = 1, loopFocus = true, onLoop, dense = false, orientation = "both", direction, highlightedIndex: externalHighlightedIndex, onHighlightedIndexChange: externalSetHighlightedIndex, rootRef: externalRef, enableHomeAndEndKeys = false, stopEventPropagation = false, disabledIndices, modifierKeys = EMPTY_ARRAY } = params;
	const [internalHighlightedIndex, internalSetHighlightedIndex] = import_react.useState(0);
	const isGrid = cols > 1;
	const rootRef = import_react.useRef(null);
	const mergedRef = useMergedRefs(rootRef, externalRef);
	const elementsRef = import_react.useRef([]);
	const hasSetDefaultIndexRef = import_react.useRef(false);
	const highlightedIndex = externalHighlightedIndex ?? internalHighlightedIndex;
	const onHighlightedIndexChange = useStableCallback((index, shouldScrollIntoView = false) => {
		(externalSetHighlightedIndex ?? internalSetHighlightedIndex)(index);
		if (shouldScrollIntoView) {
			const newActiveItem = elementsRef.current[index];
			scrollIntoViewIfNeeded(rootRef.current, newActiveItem, direction, orientation);
		}
	});
	const onMapChange = useStableCallback((map) => {
		if (map.size === 0 || hasSetDefaultIndexRef.current) return;
		hasSetDefaultIndexRef.current = true;
		const sortedElements = Array.from(map.keys());
		const activeItem = sortedElements.find((compositeElement) => compositeElement?.hasAttribute("data-composite-item-active")) ?? null;
		const activeIndex = activeItem ? sortedElements.indexOf(activeItem) : -1;
		if (activeIndex !== -1) onHighlightedIndexChange(activeIndex);
		scrollIntoViewIfNeeded(rootRef.current, activeItem, direction, orientation);
	});
	const wrappedOnLoop = useStableCallback((event, prevIndex, nextIndex) => {
		if (!onLoop) return nextIndex;
		return onLoop?.(event, prevIndex, nextIndex, elementsRef);
	});
	const props = import_react.useMemo(() => ({
		"aria-orientation": orientation === "both" ? void 0 : orientation,
		ref: mergedRef,
		onFocus(event) {
			const element = rootRef.current;
			const target = getTarget(event.nativeEvent);
			if (!element || target == null || !isNativeInput(target)) return;
			target.setSelectionRange(0, target.value.length ?? 0);
		},
		onKeyDown(event) {
			const RELEVANT_KEYS = enableHomeAndEndKeys ? ALL_KEYS$1 : ARROW_KEYS;
			if (!RELEVANT_KEYS.has(event.key)) return;
			if (isModifierKeySet(event, modifierKeys)) return;
			if (!rootRef.current) return;
			const isRtl = direction === "rtl";
			const horizontalForwardKey = isRtl ? ARROW_LEFT : ARROW_RIGHT;
			const forwardKey = {
				horizontal: horizontalForwardKey,
				vertical: ARROW_DOWN,
				both: horizontalForwardKey
			}[orientation];
			const horizontalBackwardKey = isRtl ? ARROW_RIGHT : ARROW_LEFT;
			const backwardKey = {
				horizontal: horizontalBackwardKey,
				vertical: ARROW_UP,
				both: horizontalBackwardKey
			}[orientation];
			const target = getTarget(event.nativeEvent);
			if (target != null && isNativeInput(target) && !isElementDisabled(target)) {
				const selectionStart = target.selectionStart;
				const selectionEnd = target.selectionEnd;
				const textContent = target.value ?? "";
				if (selectionStart == null || event.shiftKey || selectionStart !== selectionEnd) return;
				if (event.key !== backwardKey && selectionStart < textContent.length) return;
				if (event.key !== forwardKey && selectionStart > 0) return;
			}
			let nextIndex = highlightedIndex;
			const minIndex = getMinListIndex(elementsRef, disabledIndices);
			const maxIndex = getMaxListIndex(elementsRef, disabledIndices);
			if (isGrid) {
				const sizes = itemSizes || Array.from({ length: elementsRef.current.length }, () => ({
					width: 1,
					height: 1
				}));
				const cellMap = createGridCellMap(sizes, cols, dense);
				const minGridIndex = cellMap.findIndex((index) => index != null && !isListIndexDisabled(elementsRef.current, index, disabledIndices));
				const maxGridIndex = cellMap.reduce((foundIndex, index, cellIndex) => index != null && !isListIndexDisabled(elementsRef.current, index, disabledIndices) ? cellIndex : foundIndex, -1);
				nextIndex = cellMap[getGridNavigatedIndex(cellMap.map((itemIndex) => itemIndex != null ? elementsRef.current[itemIndex] : null), {
					event,
					orientation,
					loopFocus,
					onLoop: wrappedOnLoop,
					cols,
					disabledIndices: getGridCellIndices([...disabledIndices || elementsRef.current.map((_, index) => isListIndexDisabled(elementsRef.current, index) ? index : void 0), void 0], cellMap),
					minIndex: minGridIndex,
					maxIndex: maxGridIndex,
					prevIndex: getGridCellIndexOfCorner(highlightedIndex > maxIndex ? minIndex : highlightedIndex, sizes, cellMap, cols, event.key === "ArrowDown" ? "bl" : event.key === "ArrowRight" ? "tr" : "tl"),
					rtl: isRtl
				})];
			}
			const forwardKeys = {
				horizontal: [horizontalForwardKey],
				vertical: [ARROW_DOWN],
				both: [horizontalForwardKey, ARROW_DOWN]
			}[orientation];
			const backwardKeys = {
				horizontal: [horizontalBackwardKey],
				vertical: [ARROW_UP],
				both: [horizontalBackwardKey, ARROW_UP]
			}[orientation];
			const preventedKeys = isGrid ? RELEVANT_KEYS : {
				horizontal: enableHomeAndEndKeys ? HORIZONTAL_KEYS_WITH_EXTRA_KEYS : HORIZONTAL_KEYS,
				vertical: enableHomeAndEndKeys ? VERTICAL_KEYS_WITH_EXTRA_KEYS : VERTICAL_KEYS,
				both: RELEVANT_KEYS
			}[orientation];
			if (enableHomeAndEndKeys) {
				if (event.key === "Home") nextIndex = minIndex;
				else if (event.key === "End") nextIndex = maxIndex;
			}
			if (nextIndex === highlightedIndex && (forwardKeys.includes(event.key) || backwardKeys.includes(event.key))) if (loopFocus && nextIndex === maxIndex && forwardKeys.includes(event.key)) {
				nextIndex = minIndex;
				if (onLoop) nextIndex = onLoop(event, highlightedIndex, nextIndex, elementsRef);
			} else if (loopFocus && nextIndex === minIndex && backwardKeys.includes(event.key)) {
				nextIndex = maxIndex;
				if (onLoop) nextIndex = onLoop(event, highlightedIndex, nextIndex, elementsRef);
			} else nextIndex = findNonDisabledListIndex(elementsRef.current, {
				startingIndex: nextIndex,
				decrement: backwardKeys.includes(event.key),
				disabledIndices
			});
			if (nextIndex !== highlightedIndex && !isIndexOutOfListBounds(elementsRef.current, nextIndex)) {
				if (stopEventPropagation) event.stopPropagation();
				if (preventedKeys.has(event.key)) event.preventDefault();
				onHighlightedIndexChange(nextIndex, true);
				queueMicrotask(() => {
					elementsRef.current[nextIndex]?.focus();
				});
			}
		}
	}), [
		cols,
		dense,
		direction,
		disabledIndices,
		elementsRef,
		enableHomeAndEndKeys,
		highlightedIndex,
		isGrid,
		itemSizes,
		loopFocus,
		onLoop,
		wrappedOnLoop,
		mergedRef,
		modifierKeys,
		onHighlightedIndexChange,
		orientation,
		stopEventPropagation
	]);
	return import_react.useMemo(() => ({
		props,
		highlightedIndex,
		onHighlightedIndexChange,
		elementsRef,
		disabledIndices,
		onMapChange,
		relayKeyboardEvent: props.onKeyDown
	}), [
		props,
		highlightedIndex,
		onHighlightedIndexChange,
		elementsRef,
		disabledIndices,
		onMapChange
	]);
}
function isModifierKeySet(event, ignoredModifierKeys) {
	for (const key of MODIFIER_KEYS.values()) {
		if (ignoredModifierKeys.includes(key)) continue;
		if (event.getModifierState(key)) return true;
	}
	return false;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/internals/composite/root/CompositeRoot.js
/**
* @internal
*/
function CompositeRoot(componentProps) {
	const { render, className, style, refs = EMPTY_ARRAY$1, props = EMPTY_ARRAY$1, state = EMPTY_OBJECT, stateAttributesMapping, highlightedIndex: highlightedIndexProp, onHighlightedIndexChange: onHighlightedIndexChangeProp, orientation, dense, itemSizes, loopFocus, onLoop, cols, enableHomeAndEndKeys, onMapChange: onMapChangeProp, stopEventPropagation = true, rootRef, disabledIndices, modifierKeys, highlightItemOnHover = false, tag = "div", ...elementProps } = componentProps;
	const { props: defaultProps, highlightedIndex, onHighlightedIndexChange, elementsRef, onMapChange: onMapChangeUnwrapped, relayKeyboardEvent } = useCompositeRoot({
		itemSizes,
		cols,
		loopFocus,
		onLoop,
		dense,
		orientation,
		highlightedIndex: highlightedIndexProp,
		onHighlightedIndexChange: onHighlightedIndexChangeProp,
		rootRef,
		stopEventPropagation,
		enableHomeAndEndKeys,
		direction: useDirection(),
		disabledIndices,
		modifierKeys
	});
	const element = useRenderElement(tag, componentProps, {
		state,
		ref: refs,
		props: [
			defaultProps,
			...props,
			elementProps
		],
		stateAttributesMapping
	});
	const contextValue = import_react.useMemo(() => ({
		highlightedIndex,
		onHighlightedIndexChange,
		highlightItemOnHover,
		relayKeyboardEvent
	}), [
		highlightedIndex,
		onHighlightedIndexChange,
		highlightItemOnHover,
		relayKeyboardEvent
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeRootContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeList, {
			elementsRef,
			onMapChange: (newMap) => {
				onMapChangeProp?.(newMap);
				onMapChangeUnwrapped(newMap);
			},
			children: element
		})
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/formatNumber.js
var cache = /* @__PURE__ */ new Map();
function getFormatter(locale, options) {
	const optionsString = JSON.stringify({
		locale,
		options
	});
	const cachedFormatter = cache.get(optionsString);
	if (cachedFormatter) return cachedFormatter;
	const formatter = new Intl.NumberFormat(locale, options);
	cache.set(optionsString, formatter);
	return formatter;
}
function formatNumber(value, locale, options) {
	if (value == null) return "";
	return getFormatter(locale, options).format(value);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/valueToPercent.js
function valueToPercent(value, min, max) {
	return (value - min) * 100 / (max - min);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/root/PopoverRootContext.js
var PopoverRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function usePopoverRootContext(optional) {
	const context = import_react.useContext(PopoverRootContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(47));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/store/PopoverStore.js
function createInitialState$2() {
	return {
		...createInitialPopupStoreState(),
		disabled: false,
		modal: false,
		focusManagerModal: false,
		instantType: void 0,
		openMethod: null,
		openChangeReason: null,
		titleElementId: void 0,
		descriptionElementId: void 0,
		stickIfOpen: true,
		nested: false,
		openOnHover: false,
		closeDelay: 0,
		hasViewport: false
	};
}
var selectors$2 = {
	...popupStoreSelectors,
	disabled: createSelector((state) => state.disabled),
	instantType: createSelector((state) => state.instantType),
	openMethod: createSelector((state) => state.openMethod),
	openChangeReason: createSelector((state) => state.openChangeReason),
	modal: createSelector((state) => state.modal),
	focusManagerModal: createSelector((state) => state.focusManagerModal),
	stickIfOpen: createSelector((state) => state.stickIfOpen),
	titleElementId: createSelector((state) => state.titleElementId),
	descriptionElementId: createSelector((state) => state.descriptionElementId),
	openOnHover: createSelector((state) => state.openOnHover),
	closeDelay: createSelector((state) => state.closeDelay),
	hasViewport: createSelector((state) => state.hasViewport)
};
var PopoverStore = class PopoverStore extends ReactStore {
	constructor(initialState) {
		const initial = {
			...createInitialState$2(),
			...initialState
		};
		if (initial.open && initialState?.mounted === void 0) initial.mounted = true;
		super(initial, {
			popupRef: /* @__PURE__ */ import_react.createRef(),
			backdropRef: /* @__PURE__ */ import_react.createRef(),
			internalBackdropRef: /* @__PURE__ */ import_react.createRef(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0,
			triggerFocusTargetRef: /* @__PURE__ */ import_react.createRef(),
			beforeContentFocusGuardRef: /* @__PURE__ */ import_react.createRef(),
			stickIfOpenTimeout: new Timeout(),
			triggerElements: new PopupTriggerMap()
		}, selectors$2);
	}
	setOpen = (nextOpen, eventDetails) => {
		const isHover = eventDetails.reason === triggerHover;
		const isKeyboardClick = eventDetails.reason === "trigger-press" && eventDetails.event.detail === 0;
		const isDismissClose = !nextOpen && (eventDetails.reason === "escape-key" || eventDetails.reason == null);
		eventDetails.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", true);
		};
		this.context.onOpenChange?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
		const changeState = () => {
			const updatedState = {
				open: nextOpen,
				openChangeReason: eventDetails.reason
			};
			const newTriggerId = eventDetails.trigger?.id ?? null;
			if (newTriggerId || nextOpen) {
				updatedState.activeTriggerId = newTriggerId;
				updatedState.activeTriggerElement = eventDetails.trigger ?? null;
			}
			this.update(updatedState);
		};
		if (isHover) {
			this.set("stickIfOpen", true);
			this.context.stickIfOpenTimeout.start(500, () => {
				this.set("stickIfOpen", false);
			});
			import_react_dom.flushSync(changeState);
		} else changeState();
		if (isKeyboardClick || isDismissClose) this.set("instantType", isKeyboardClick ? "click" : "dismiss");
		else if (eventDetails.reason === "focus-out") this.set("instantType", "focus");
		else this.set("instantType", void 0);
	};
	static useStore(externalStore, initialState) {
		const internalStore = useRefWithInit(() => {
			return new PopoverStore(initialState);
		}).current;
		const store = externalStore ?? internalStore;
		useOnMount(internalStore.disposeEffect);
		return store;
	}
	disposeEffect = () => {
		return this.context.stickIfOpenTimeout.disposeEffect();
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/root/PopoverRoot.js
function PopoverRootComponent({ props }) {
	const { children, open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, modal = false, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null } = props;
	const store = PopoverStore.useStore(handle?.store, {
		modal,
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp
	});
	useOnFirstRender(() => {
		if (openProp === void 0 && store.state.open === false && defaultOpen === true) store.update({
			open: true,
			activeTriggerId: defaultTriggerIdProp
		});
	});
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	const open = store.useState("open");
	const payload = store.useState("payload");
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const { openMethod, triggerProps: interactionTypeTriggerProps } = useOpenInteractionType(open);
	useImplicitActiveTrigger(store);
	const { forceUnmount } = useOpenStateTransitions(open, store, () => {
		store.update({
			stickIfOpen: true,
			openChangeReason: null
		});
	});
	import_react.useEffect(() => {
		if (!open) store.context.stickIfOpenTimeout.clear();
	}, [store, open]);
	const handleImperativeClose = import_react.useCallback(() => {
		store.setOpen(false, createChangeEventDetails(imperativeAction));
	}, [store]);
	import_react.useImperativeHandle(props.actionsRef, () => ({
		unmount: forceUnmount,
		close: handleImperativeClose
	}), [forceUnmount, handleImperativeClose]);
	const floatingRootContext = useSyncedFloatingRootContext({
		popupStore: store,
		onOpenChange: store.setOpen
	});
	const { getReferenceProps, getFloatingProps, getTriggerProps } = useInteractions([useDismiss(floatingRootContext, { outsidePressEvent: {
		mouse: modal === "trap-focus" ? "sloppy" : "intentional",
		touch: "sloppy"
	} }), useRole(floatingRootContext)]);
	const activeTriggerProps = import_react.useMemo(() => {
		return getReferenceProps(interactionTypeTriggerProps);
	}, [getReferenceProps, interactionTypeTriggerProps]);
	const inactiveTriggerProps = import_react.useMemo(() => {
		return getTriggerProps(interactionTypeTriggerProps);
	}, [getTriggerProps, interactionTypeTriggerProps]);
	const popupProps = import_react.useMemo(() => {
		return getFloatingProps();
	}, [getFloatingProps]);
	store.useSyncedValues({
		modal,
		openMethod,
		activeTriggerProps,
		inactiveTriggerProps,
		popupProps,
		floatingRootContext,
		nested: useFloatingParentNodeId() != null
	});
	const popoverContext = import_react.useMemo(() => ({ store }), [store]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverRootContext.Provider, {
		value: popoverContext,
		children: typeof children === "function" ? children({ payload }) : children
	});
}
/**
* Groups all parts of the popover.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
function PopoverRoot(props) {
	if (usePopoverRootContext(true)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverRootComponent, { props });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingTree, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverRootComponent, { props }) });
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/trigger/PopoverTrigger.js
/**
* A button that opens the popover.
* Renders a `<button>` element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
var PopoverTrigger = /* @__PURE__ */ import_react.forwardRef(function PopoverTrigger(componentProps, forwardedRef) {
	const { render, className, disabled = false, nativeButton = true, handle, payload, openOnHover = false, delay = 300, closeDelay = 0, id: idProp, style, ...elementProps } = componentProps;
	const rootContext = usePopoverRootContext(true);
	const store = handle?.store ?? rootContext?.store;
	if (!store) throw new Error(formatErrorMessage(74));
	const thisTriggerId = useBaseUiId(idProp);
	const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
	const floatingContext = store.useState("floatingRootContext");
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const triggerElementRef = import_react.useRef(null);
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
		payload,
		disabled,
		openOnHover,
		closeDelay
	});
	const openReason = store.useState("openChangeReason");
	const stickIfOpen = store.useState("stickIfOpen");
	const openMethod = store.useState("openMethod");
	const focusManagerModal = store.useState("focusManagerModal");
	const hoverProps = useHoverReferenceInteraction(floatingContext, {
		enabled: floatingContext != null && openOnHover && (openMethod !== "touch" || openReason !== "trigger-press"),
		mouseOnly: true,
		move: false,
		handleClose: safePolygon(),
		restMs: delay,
		delay: { close: closeDelay },
		triggerElementRef,
		isActiveTrigger: isTriggerActive,
		isClosing: () => store.select("transitionStatus") === "ending"
	});
	const localProps = useInteractions([useClick(floatingContext, {
		enabled: floatingContext != null,
		stickIfOpen
	})]);
	const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
	const state = {
		disabled,
		open: isOpenedByThisTrigger
	};
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const stateAttributesMapping = import_react.useMemo(() => ({ open(value) {
		if (value && openReason === "trigger-press") return pressableTriggerOpenStateMapping.open(value);
		return triggerOpenStateMapping$1.open(value);
	} }), [openReason]);
	const element = useRenderElement("button", componentProps, {
		state,
		ref: [
			buttonRef,
			forwardedRef,
			registerTrigger,
			triggerElementRef
		],
		props: [
			localProps.getReferenceProps(),
			hoverProps,
			rootTriggerProps,
			{
				[CLICK_TRIGGER_IDENTIFIER]: "",
				id: thisTriggerId
			},
			elementProps,
			getButtonProps
		],
		stateAttributesMapping
	});
	const { preFocusGuardRef, handlePreFocusGuardFocus, handleFocusTargetFocus } = useTriggerFocusGuards(store, triggerElementRef);
	if (isTriggerActive && !focusManagerModal) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
			ref: preFocusGuardRef,
			onFocus: handlePreFocusGuardFocus
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: element }, thisTriggerId),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGuard, {
			ref: store.context.triggerFocusTargetRef,
			onFocus: handleFocusTargetFocus
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: element }, thisTriggerId);
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/portal/PopoverPortalContext.js
var PopoverPortalContext = /* @__PURE__ */ import_react.createContext(void 0);
function usePopoverPortalContext() {
	const value = import_react.useContext(PopoverPortalContext);
	if (value === void 0) throw new Error(formatErrorMessage(45));
	return value;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/portal/PopoverPortal.js
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
var PopoverPortal = /* @__PURE__ */ import_react.forwardRef(function PopoverPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	const { store } = usePopoverRootContext();
	if (!(store.useState("mounted") || keepMounted)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPortalContext.Provider, {
		value: keepMounted,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortal, {
			ref: forwardedRef,
			...portalProps
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/positioner/PopoverPositionerContext.js
var PopoverPositionerContext = /* @__PURE__ */ import_react.createContext(void 0);
function usePopoverPositionerContext() {
	const context = import_react.useContext(PopoverPositionerContext);
	if (!context) throw new Error(formatErrorMessage(46));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/positioner/PopoverPositioner.js
/**
* Positions the popover against the trigger.
* Renders a `<div>` element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
var PopoverPositioner = /* @__PURE__ */ import_react.forwardRef(function PopoverPositioner(componentProps, forwardedRef) {
	const { render, className, anchor, positionMethod = "absolute", side = "bottom", align = "center", sideOffset = 0, alignOffset = 0, collisionBoundary = "clipping-ancestors", collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance = POPUP_COLLISION_AVOIDANCE, style, ...elementProps } = componentProps;
	const { store } = usePopoverRootContext();
	const keepMounted = usePopoverPortalContext();
	const nodeId = useFloatingNodeId();
	const floatingRootContext = store.useState("floatingRootContext");
	const mounted = store.useState("mounted");
	const open = store.useState("open");
	const openReason = store.useState("openChangeReason");
	const triggerElement = store.useState("activeTriggerElement");
	const modal = store.useState("modal");
	const openMethod = store.useState("openMethod");
	const positionerElement = store.useState("positionerElement");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const hasViewport = store.useState("hasViewport");
	const prevTriggerElementRef = import_react.useRef(null);
	const runOnceAnimationsFinish = useAnimationsFinished(positionerElement, false, false);
	const positioning = useAnchorPositioning({
		anchor,
		floatingRootContext,
		positionMethod,
		mounted,
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		collisionBoundary,
		collisionPadding,
		sticky,
		disableAnchorTracking,
		keepMounted,
		nodeId,
		collisionAvoidance,
		adaptiveOrigin: hasViewport ? adaptiveOrigin : void 0
	});
	const domReference = floatingRootContext.useState("domReferenceElement");
	useIsoLayoutEffect(() => {
		const currentTriggerElement = domReference;
		const prevTriggerElement = prevTriggerElementRef.current;
		if (currentTriggerElement) prevTriggerElementRef.current = currentTriggerElement;
		if (prevTriggerElement && currentTriggerElement && currentTriggerElement !== prevTriggerElement) {
			store.set("instantType", void 0);
			const ac = new AbortController();
			runOnceAnimationsFinish(() => {
				store.set("instantType", "trigger-change");
			}, ac.signal);
			return () => {
				ac.abort();
			};
		}
	}, [
		domReference,
		runOnceAnimationsFinish,
		store
	]);
	const state = {
		open,
		side: positioning.side,
		align: positioning.align,
		anchorHidden: positioning.anchorHidden,
		instant: instantType
	};
	useAnchoredPopupScrollLock(open && modal === true && openReason !== "trigger-hover", openMethod === "touch", positionerElement, triggerElement);
	const setPositionerElement = import_react.useCallback((element) => {
		store.set("positionerElement", element);
	}, [store]);
	const element = usePositioner(componentProps, state, {
		styles: positioning.positionerStyles,
		transitionStatus,
		props: elementProps,
		refs: [forwardedRef, setPositionerElement],
		hidden: !mounted,
		inert: !open
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverPositionerContext.Provider, {
		value: positioning,
		children: [mounted && modal === true && openReason !== "trigger-hover" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
			ref: store.context.internalBackdropRef,
			inert: inertValue(!open),
			cutout: triggerElement
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingNode, {
			id: nodeId,
			children: element
		})]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/closePart.js
var ClosePartContext = /* @__PURE__ */ import_react.createContext(void 0);
function useClosePartCount() {
	const [closePartCount, setClosePartCount] = import_react.useState(0);
	const register = useStableCallback(() => {
		setClosePartCount((count) => count + 1);
		return () => {
			setClosePartCount((count) => Math.max(0, count - 1));
		};
	});
	return {
		context: import_react.useMemo(() => ({ register }), [register]),
		hasClosePart: closePartCount > 0
	};
}
function ClosePartProvider(props) {
	const { value, children } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClosePartContext.Provider, {
		value,
		children
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/popup/PopoverPopup.js
var stateAttributesMapping$4 = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* A container for the popover contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
var PopoverPopup = /* @__PURE__ */ import_react.forwardRef(function PopoverPopup(componentProps, forwardedRef) {
	const { className, render, initialFocus, finalFocus, style, ...elementProps } = componentProps;
	const { store } = usePopoverRootContext();
	const positioner = usePopoverPositionerContext();
	const insideToolbar = useToolbarRootContext(true) != null;
	const { context: closePartContext, hasClosePart } = useClosePartCount();
	const open = store.useState("open");
	const openMethod = store.useState("openMethod");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const popupProps = store.useState("popupProps");
	const titleId = store.useState("titleElementId");
	const descriptionId = store.useState("descriptionElementId");
	const modal = store.useState("modal");
	const mounted = store.useState("mounted");
	const openReason = store.useState("openChangeReason");
	const activeTriggerElement = store.useState("activeTriggerElement");
	const floatingContext = store.useState("floatingRootContext");
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	const disabled = store.useState("disabled");
	const openOnHover = store.useState("openOnHover");
	const closeDelay = store.useState("closeDelay");
	useHoverFloatingInteraction(floatingContext, {
		enabled: openOnHover && !disabled,
		closeDelay
	});
	function defaultInitialFocus(interactionType) {
		if (interactionType === "touch") return store.context.popupRef.current;
		return true;
	}
	const resolvedInitialFocus = initialFocus === void 0 ? defaultInitialFocus : initialFocus;
	const state = {
		open,
		side: positioner.side,
		align: positioner.align,
		instant: instantType,
		transitionStatus
	};
	const focusManagerModal = modal !== false && hasClosePart;
	store.useSyncedValue("focusManagerModal", focusManagerModal);
	const setPopupElement = import_react.useCallback((element) => {
		store.set("popupElement", element);
	}, [store]);
	const element = useRenderElement("div", componentProps, {
		state,
		ref: [
			forwardedRef,
			store.context.popupRef,
			setPopupElement
		],
		props: [
			popupProps,
			{
				"aria-labelledby": titleId,
				"aria-describedby": descriptionId,
				onKeyDown(event) {
					if (insideToolbar && COMPOSITE_KEYS.has(event.key)) event.stopPropagation();
				}
			},
			getDisabledMountTransitionStyles(transitionStatus),
			elementProps
		],
		stateAttributesMapping: stateAttributesMapping$4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
		context: floatingContext,
		openInteractionType: openMethod,
		modal: focusManagerModal,
		disabled: !mounted || openReason === "trigger-hover",
		initialFocus: resolvedInitialFocus,
		returnFocus: finalFocus,
		restoreFocus: "popup",
		previousFocusableElement: isHTMLElement(activeTriggerElement) ? activeTriggerElement : void 0,
		nextFocusableElement: store.context.triggerFocusTargetRef,
		beforeContentFocusGuardRef: store.context.beforeContentFocusGuardRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClosePartProvider, {
			value: closePartContext,
			children: element
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/popover/title/PopoverTitle.js
/**
* A heading that labels the popover.
* Renders an `<h2>` element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
var PopoverTitle = /* @__PURE__ */ import_react.forwardRef(function PopoverTitle(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { store } = usePopoverRootContext();
	const id = useBaseUiId(elementProps.id);
	useIsoLayoutEffect(() => {
		store.set("titleElementId", id);
		return () => {
			store.set("titleElementId", void 0);
		};
	}, [store, id]);
	return useRenderElement("h2", componentProps, {
		ref: forwardedRef,
		props: [{ id }, elementProps]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/preview-card/root/PreviewCardContext.js
var PreviewCardRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function usePreviewCardRootContext(optional) {
	const context = import_react.useContext(PreviewCardRootContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(50));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/preview-card/store/PreviewCardStore.js
var selectors$1 = {
	...popupStoreSelectors,
	instantType: createSelector((state) => state.instantType),
	hasViewport: createSelector((state) => state.hasViewport)
};
var PreviewCardStore = class PreviewCardStore extends ReactStore {
	constructor(initialState) {
		super({
			...createInitialState$1(),
			...initialState
		}, {
			popupRef: /* @__PURE__ */ import_react.createRef(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0,
			triggerElements: new PopupTriggerMap(),
			closeDelayRef: { current: 300 }
		}, selectors$1);
	}
	setOpen = (nextOpen, eventDetails) => {
		const reason = eventDetails.reason;
		const isHover = reason === triggerHover;
		const isFocusOpen = nextOpen && reason === "trigger-focus";
		const isDismissClose = !nextOpen && (reason === "trigger-press" || reason === "escape-key");
		eventDetails.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", true);
		};
		this.context.onOpenChange?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
		const changeState = () => {
			const updatedState = { open: nextOpen };
			if (isFocusOpen) updatedState.instantType = "focus";
			else if (isDismissClose) updatedState.instantType = "dismiss";
			else if (reason === "trigger-hover") updatedState.instantType = void 0;
			const newTriggerId = eventDetails.trigger?.id ?? null;
			if (newTriggerId || nextOpen) {
				updatedState.activeTriggerId = newTriggerId;
				updatedState.activeTriggerElement = eventDetails.trigger ?? null;
			}
			this.update(updatedState);
		};
		if (isHover) import_react_dom.flushSync(changeState);
		else changeState();
	};
	static useStore(externalStore, initialState) {
		const internalStore = useRefWithInit(() => {
			return new PreviewCardStore(initialState);
		}).current;
		const store = externalStore ?? internalStore;
		const floatingRootContext = useSyncedFloatingRootContext({
			popupStore: store,
			onOpenChange: store.setOpen
		});
		store.state.floatingRootContext = floatingRootContext;
		return store;
	}
};
function createInitialState$1() {
	return {
		...createInitialPopupStoreState(),
		instantType: void 0,
		hasViewport: false
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/preview-card/root/PreviewCardRoot.js
function PreviewCardRootComponent(props) {
	const { open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, actionsRef, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null, children } = props;
	const store = PreviewCardStore.useStore(handle?.store, {
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp
	});
	useOnFirstRender(() => {
		if (openProp === void 0 && store.state.open === false && defaultOpen === true) store.update({
			open: true,
			activeTriggerId: defaultTriggerIdProp
		});
	});
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const open = store.useState("open");
	const floatingRootContext = store.select("floatingRootContext");
	const activeTriggerId = store.useState("activeTriggerId");
	const payload = store.useState("payload");
	useImplicitActiveTrigger(store);
	const { forceUnmount } = useOpenStateTransitions(open, store);
	useIsoLayoutEffect(() => {
		if (open) {
			if (activeTriggerId == null) store.set("payload", void 0);
		}
	}, [
		store,
		activeTriggerId,
		open
	]);
	const handleImperativeClose = import_react.useCallback(() => {
		store.setOpen(false, createChangeEventDetails(imperativeAction));
	}, [store]);
	import_react.useImperativeHandle(actionsRef, () => ({
		unmount: forceUnmount,
		close: handleImperativeClose
	}), [forceUnmount, handleImperativeClose]);
	const { getReferenceProps, getTriggerProps, getFloatingProps } = useInteractions([useDismiss(floatingRootContext)]);
	const activeTriggerProps = import_react.useMemo(() => getReferenceProps(), [getReferenceProps]);
	const inactiveTriggerProps = import_react.useMemo(() => getTriggerProps(), [getTriggerProps]);
	const popupProps = import_react.useMemo(() => getFloatingProps(), [getFloatingProps]);
	store.useSyncedValues({
		activeTriggerProps,
		inactiveTriggerProps,
		popupProps
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCardRootContext.Provider, {
		value: store,
		children: typeof children === "function" ? children({ payload }) : children
	});
}
/**
* Groups all parts of the preview card.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
*/
function PreviewCardRoot(props) {
	if (usePreviewCardRootContext(true)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCardRootComponent, { ...props });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingTree, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCardRootComponent, { ...props }) });
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/preview-card/portal/PreviewCardPortalContext.js
var PreviewCardPortalContext = /* @__PURE__ */ import_react.createContext(void 0);
function usePreviewCardPortalContext() {
	const value = import_react.useContext(PreviewCardPortalContext);
	if (value === void 0) throw new Error(formatErrorMessage(48));
	return value;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/FloatingPortalLite.js
/**
* `FloatingPortal` includes tabbable logic handling for focus management.
* For components that don't need tabbable logic, use `FloatingPortalLite`.
* @internal
*/
var FloatingPortalLite = /* @__PURE__ */ import_react.forwardRef(function FloatingPortalLite(componentProps, forwardedRef) {
	const { children, container, className, render, style, ...elementProps } = componentProps;
	const { portalNode, portalSubtree } = useFloatingPortalNode({
		container,
		ref: forwardedRef,
		componentProps,
		elementProps
	});
	if (!portalSubtree && !portalNode) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [portalSubtree, portalNode && /* @__PURE__ */ import_react_dom.createPortal(children, portalNode)] });
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/preview-card/portal/PreviewCardPortal.js
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
*/
var PreviewCardPortal = /* @__PURE__ */ import_react.forwardRef(function PreviewCardPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	if (!(usePreviewCardRootContext().useState("mounted") || keepMounted)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCardPortalContext.Provider, {
		value: keepMounted,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortalLite, {
			ref: forwardedRef,
			...portalProps
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/preview-card/trigger/PreviewCardTrigger.js
/**
* A link that opens the preview card.
* Renders an `<a>` element.
*
* Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
*/
var PreviewCardTrigger = /* @__PURE__ */ import_react.forwardRef(function PreviewCardTrigger(componentProps, forwardedRef) {
	const { render, className, delay, closeDelay, id: idProp, payload, handle, style, ...elementProps } = componentProps;
	const rootContext = usePreviewCardRootContext(true);
	const store = handle?.store ?? rootContext;
	if (!store) throw new Error(formatErrorMessage(89));
	const thisTriggerId = useBaseUiId(idProp);
	const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const floatingRootContext = store.useState("floatingRootContext");
	const triggerElementRef = import_react.useRef(null);
	const delayWithDefault = delay ?? 600;
	const closeDelayWithDefault = closeDelay ?? 300;
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, { payload });
	useIsoLayoutEffect(() => {
		if (isMountedByThisTrigger) store.context.closeDelayRef.current = closeDelayWithDefault;
	}, [
		store,
		isMountedByThisTrigger,
		closeDelayWithDefault
	]);
	const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
		mouseOnly: true,
		move: false,
		handleClose: safePolygon(),
		delay: () => ({
			open: delayWithDefault,
			close: closeDelayWithDefault
		}),
		triggerElementRef,
		isActiveTrigger: isTriggerActive,
		isClosing: () => store.select("transitionStatus") === "ending"
	});
	const focusProps = useFocus(floatingRootContext, { delay: delayWithDefault });
	const state = { open: isOpenedByThisTrigger };
	const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
	return useRenderElement("a", componentProps, {
		state,
		ref: [
			forwardedRef,
			registerTrigger,
			triggerElementRef
		],
		props: [
			hoverProps,
			focusProps.reference,
			rootTriggerProps,
			{ id: thisTriggerId },
			elementProps
		],
		stateAttributesMapping: triggerOpenStateMapping$1
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/preview-card/positioner/PreviewCardPositionerContext.js
var PreviewCardPositionerContext = /* @__PURE__ */ import_react.createContext(void 0);
function usePreviewCardPositionerContext() {
	const context = import_react.useContext(PreviewCardPositionerContext);
	if (context === void 0) throw new Error(formatErrorMessage(49));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/preview-card/positioner/PreviewCardPositioner.js
/**
* Positions the popup against the trigger.
* Renders a `<div>` element.
*
* Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
*/
var PreviewCardPositioner = /* @__PURE__ */ import_react.forwardRef(function PreviewCardPositioner(componentProps, forwardedRef) {
	const { render, className, anchor, positionMethod = "absolute", side = "bottom", align = "center", sideOffset = 0, alignOffset = 0, collisionBoundary = "clipping-ancestors", collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance = POPUP_COLLISION_AVOIDANCE, style, ...elementProps } = componentProps;
	const store = usePreviewCardRootContext();
	const keepMounted = usePreviewCardPortalContext();
	const nodeId = useFloatingNodeId();
	const open = store.useState("open");
	const mounted = store.useState("mounted");
	const floatingRootContext = store.useState("floatingRootContext");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const positioning = useAnchorPositioning({
		anchor,
		floatingRootContext,
		positionMethod,
		mounted,
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		collisionBoundary,
		collisionPadding,
		sticky,
		disableAnchorTracking,
		keepMounted,
		nodeId,
		collisionAvoidance,
		adaptiveOrigin: store.useState("hasViewport") ? adaptiveOrigin : void 0
	});
	const element = usePositioner(componentProps, {
		open,
		side: positioning.side,
		align: positioning.align,
		anchorHidden: positioning.anchorHidden,
		instant: instantType
	}, {
		styles: positioning.positionerStyles,
		transitionStatus,
		props: elementProps,
		refs: [forwardedRef, store.useStateSetter("positionerElement")],
		hidden: !mounted,
		inert: !open
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCardPositionerContext.Provider, {
		value: positioning,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingNode, {
			id: nodeId,
			children: element
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/preview-card/popup/PreviewCardPopup.js
var stateAttributesMapping$3 = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* A container for the preview card contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
*/
var PreviewCardPopup = /* @__PURE__ */ import_react.forwardRef(function PreviewCardPopup(componentProps, forwardedRef) {
	const { className, render, style, ...elementProps } = componentProps;
	const store = usePreviewCardRootContext();
	const { side, align } = usePreviewCardPositionerContext();
	const open = store.useState("open");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const popupProps = store.useState("popupProps");
	const floatingContext = store.useState("floatingRootContext");
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	useHoverFloatingInteraction(floatingContext, { closeDelay: useStableCallback(() => store.context.closeDelayRef.current) });
	return useRenderElement("div", componentProps, {
		state: {
			open,
			side,
			align,
			instant: instantType,
			transitionStatus
		},
		ref: [
			forwardedRef,
			store.context.popupRef,
			store.useStateSetter("popupElement")
		],
		props: [
			popupProps,
			getDisabledMountTransitionStyles(transitionStatus),
			elementProps
		],
		stateAttributesMapping: stateAttributesMapping$3
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootContext.js
var ScrollAreaRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useScrollAreaRootContext() {
	const context = import_react.useContext(ScrollAreaRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(53));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootCssVars.js
var ScrollAreaRootCssVars = /* @__PURE__ */ function(ScrollAreaRootCssVars) {
	/**
	* The scroll area's corner height.
	* @type {number}
	*/
	ScrollAreaRootCssVars["scrollAreaCornerHeight"] = "--scroll-area-corner-height";
	/**
	* The scroll area's corner width.
	* @type {number}
	*/
	ScrollAreaRootCssVars["scrollAreaCornerWidth"] = "--scroll-area-corner-width";
	return ScrollAreaRootCssVars;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/utils/getOffset.js
function getOffset(element, prop, axis) {
	if (!element) return 0;
	const styles = getComputedStyle(element);
	const propAxis = axis === "x" ? "Inline" : "Block";
	if (axis === "x" && prop === "margin") return parseFloat(styles[`${prop}InlineStart`]) * 2;
	return parseFloat(styles[`${prop}${propAxis}Start`]) + parseFloat(styles[`${prop}${propAxis}End`]);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarDataAttributes.js
var ScrollAreaScrollbarDataAttributes = /* @__PURE__ */ function(ScrollAreaScrollbarDataAttributes) {
	/**
	* Indicates the orientation of the scrollbar.
	* @type {'horizontal' | 'vertical'}
	*/
	ScrollAreaScrollbarDataAttributes["orientation"] = "data-orientation";
	/**
	* Present when the pointer is over the scroll area.
	*/
	ScrollAreaScrollbarDataAttributes["hovering"] = "data-hovering";
	/**
	* Present when the user scrolls inside the scroll area.
	*/
	ScrollAreaScrollbarDataAttributes["scrolling"] = "data-scrolling";
	/**
	* Present when the scroll area content is wider than the viewport.
	*/
	ScrollAreaScrollbarDataAttributes["hasOverflowX"] = "data-has-overflow-x";
	/**
	* Present when the scroll area content is taller than the viewport.
	*/
	ScrollAreaScrollbarDataAttributes["hasOverflowY"] = "data-has-overflow-y";
	/**
	* Present when there is overflow on the horizontal start side.
	*/
	ScrollAreaScrollbarDataAttributes["overflowXStart"] = "data-overflow-x-start";
	/**
	* Present when there is overflow on the horizontal end side.
	*/
	ScrollAreaScrollbarDataAttributes["overflowXEnd"] = "data-overflow-x-end";
	/**
	* Present when there is overflow on the vertical start side.
	*/
	ScrollAreaScrollbarDataAttributes["overflowYStart"] = "data-overflow-y-start";
	/**
	* Present when there is overflow on the vertical end side.
	*/
	ScrollAreaScrollbarDataAttributes["overflowYEnd"] = "data-overflow-y-end";
	return ScrollAreaScrollbarDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/styles.js
var DISABLE_SCROLLBAR_CLASS_NAME = "base-ui-disable-scrollbar";
var styleDisableScrollbar = {
	className: DISABLE_SCROLLBAR_CLASS_NAME,
	getElement(nonce) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
			nonce,
			href: DISABLE_SCROLLBAR_CLASS_NAME,
			precedence: "base-ui:low",
			children: `.${DISABLE_SCROLLBAR_CLASS_NAME}{scrollbar-width:none}.${DISABLE_SCROLLBAR_CLASS_NAME}::-webkit-scrollbar{display:none}`
		});
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootDataAttributes.js
var ScrollAreaRootDataAttributes = /* @__PURE__ */ function(ScrollAreaRootDataAttributes) {
	/**
	* Present when the user scrolls inside the scroll area.
	*/
	ScrollAreaRootDataAttributes["scrolling"] = "data-scrolling";
	/**
	* Present when the scroll area content is wider than the viewport.
	*/
	ScrollAreaRootDataAttributes["hasOverflowX"] = "data-has-overflow-x";
	/**
	* Present when the scroll area content is taller than the viewport.
	*/
	ScrollAreaRootDataAttributes["hasOverflowY"] = "data-has-overflow-y";
	/**
	* Present when there is overflow on the horizontal start side.
	*/
	ScrollAreaRootDataAttributes["overflowXStart"] = "data-overflow-x-start";
	/**
	* Present when there is overflow on the horizontal end side.
	*/
	ScrollAreaRootDataAttributes["overflowXEnd"] = "data-overflow-x-end";
	/**
	* Present when there is overflow on the vertical start side.
	*/
	ScrollAreaRootDataAttributes["overflowYStart"] = "data-overflow-y-start";
	/**
	* Present when there is overflow on the vertical end side.
	*/
	ScrollAreaRootDataAttributes["overflowYEnd"] = "data-overflow-y-end";
	return ScrollAreaRootDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/root/stateAttributes.js
var scrollAreaStateAttributesMapping = {
	hasOverflowX: (value) => value ? { [ScrollAreaRootDataAttributes.hasOverflowX]: "" } : null,
	hasOverflowY: (value) => value ? { [ScrollAreaRootDataAttributes.hasOverflowY]: "" } : null,
	overflowXStart: (value) => value ? { [ScrollAreaRootDataAttributes.overflowXStart]: "" } : null,
	overflowXEnd: (value) => value ? { [ScrollAreaRootDataAttributes.overflowXEnd]: "" } : null,
	overflowYStart: (value) => value ? { [ScrollAreaRootDataAttributes.overflowYStart]: "" } : null,
	overflowYEnd: (value) => value ? { [ScrollAreaRootDataAttributes.overflowYEnd]: "" } : null,
	cornerHidden: () => null
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRoot.js
var DEFAULT_COORDS = {
	x: 0,
	y: 0
};
var DEFAULT_SIZE = {
	width: 0,
	height: 0
};
var DEFAULT_OVERFLOW_EDGES = {
	xStart: false,
	xEnd: false,
	yStart: false,
	yEnd: false
};
var DEFAULT_HIDDEN_STATE = {
	x: true,
	y: true,
	corner: true
};
/**
* Groups all parts of the scroll area.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaRoot = /* @__PURE__ */ import_react.forwardRef(function ScrollAreaRoot(componentProps, forwardedRef) {
	const { render, className, overflowEdgeThreshold: overflowEdgeThresholdProp, style, ...elementProps } = componentProps;
	const overflowEdgeThreshold = normalizeOverflowEdgeThreshold(overflowEdgeThresholdProp);
	const rootId = useBaseUiId();
	const scrollYTimeout = useTimeout();
	const scrollXTimeout = useTimeout();
	const { nonce, disableStyleElements } = useCSPContext();
	const [hovering, setHovering] = import_react.useState(false);
	const [scrollingX, setScrollingX] = import_react.useState(false);
	const [scrollingY, setScrollingY] = import_react.useState(false);
	const [touchModality, setTouchModality] = import_react.useState(false);
	const [hasMeasuredScrollbar, setHasMeasuredScrollbar] = import_react.useState(false);
	const [cornerSize, setCornerSize] = import_react.useState(DEFAULT_SIZE);
	const [thumbSize, setThumbSize] = import_react.useState(DEFAULT_SIZE);
	const [overflowEdges, setOverflowEdges] = import_react.useState(DEFAULT_OVERFLOW_EDGES);
	const [hiddenState, setHiddenState] = import_react.useState(DEFAULT_HIDDEN_STATE);
	const rootRef = import_react.useRef(null);
	const viewportRef = import_react.useRef(null);
	const scrollbarYRef = import_react.useRef(null);
	const scrollbarXRef = import_react.useRef(null);
	const thumbYRef = import_react.useRef(null);
	const thumbXRef = import_react.useRef(null);
	const cornerRef = import_react.useRef(null);
	const thumbDraggingRef = import_react.useRef(false);
	const startYRef = import_react.useRef(0);
	const startXRef = import_react.useRef(0);
	const startScrollTopRef = import_react.useRef(0);
	const startScrollLeftRef = import_react.useRef(0);
	const currentOrientationRef = import_react.useRef("vertical");
	const scrollPositionRef = import_react.useRef(DEFAULT_COORDS);
	const handleScroll = useStableCallback((scrollPosition) => {
		const offsetX = scrollPosition.x - scrollPositionRef.current.x;
		const offsetY = scrollPosition.y - scrollPositionRef.current.y;
		scrollPositionRef.current = scrollPosition;
		if (offsetY !== 0) {
			setScrollingY(true);
			scrollYTimeout.start(500, () => {
				setScrollingY(false);
			});
		}
		if (offsetX !== 0) {
			setScrollingX(true);
			scrollXTimeout.start(500, () => {
				setScrollingX(false);
			});
		}
	});
	const handlePointerDown = useStableCallback((event) => {
		if (event.button !== 0) return;
		thumbDraggingRef.current = true;
		startYRef.current = event.clientY;
		startXRef.current = event.clientX;
		currentOrientationRef.current = event.currentTarget.getAttribute(ScrollAreaScrollbarDataAttributes.orientation);
		if (viewportRef.current) {
			startScrollTopRef.current = viewportRef.current.scrollTop;
			startScrollLeftRef.current = viewportRef.current.scrollLeft;
		}
		if (thumbYRef.current && currentOrientationRef.current === "vertical") thumbYRef.current.setPointerCapture(event.pointerId);
		if (thumbXRef.current && currentOrientationRef.current === "horizontal") thumbXRef.current.setPointerCapture(event.pointerId);
	});
	const handlePointerMove = useStableCallback((event) => {
		if (!thumbDraggingRef.current) return;
		const deltaY = event.clientY - startYRef.current;
		const deltaX = event.clientX - startXRef.current;
		if (viewportRef.current) {
			const scrollableContentHeight = viewportRef.current.scrollHeight;
			const viewportHeight = viewportRef.current.clientHeight;
			const scrollableContentWidth = viewportRef.current.scrollWidth;
			const viewportWidth = viewportRef.current.clientWidth;
			if (thumbYRef.current && scrollbarYRef.current && currentOrientationRef.current === "vertical") {
				const scrollbarYOffset = getOffset(scrollbarYRef.current, "padding", "y");
				const thumbYOffset = getOffset(thumbYRef.current, "margin", "y");
				const thumbHeight = thumbYRef.current.offsetHeight;
				const scrollRatioY = deltaY / (scrollbarYRef.current.offsetHeight - thumbHeight - scrollbarYOffset - thumbYOffset);
				viewportRef.current.scrollTop = startScrollTopRef.current + scrollRatioY * (scrollableContentHeight - viewportHeight);
				event.preventDefault();
				setScrollingY(true);
				scrollYTimeout.start(500, () => {
					setScrollingY(false);
				});
			}
			if (thumbXRef.current && scrollbarXRef.current && currentOrientationRef.current === "horizontal") {
				const scrollbarXOffset = getOffset(scrollbarXRef.current, "padding", "x");
				const thumbXOffset = getOffset(thumbXRef.current, "margin", "x");
				const thumbWidth = thumbXRef.current.offsetWidth;
				const scrollRatioX = deltaX / (scrollbarXRef.current.offsetWidth - thumbWidth - scrollbarXOffset - thumbXOffset);
				viewportRef.current.scrollLeft = startScrollLeftRef.current + scrollRatioX * (scrollableContentWidth - viewportWidth);
				event.preventDefault();
				setScrollingX(true);
				scrollXTimeout.start(500, () => {
					setScrollingX(false);
				});
			}
		}
	});
	const handlePointerUp = useStableCallback((event) => {
		thumbDraggingRef.current = false;
		if (thumbYRef.current && currentOrientationRef.current === "vertical") thumbYRef.current.releasePointerCapture(event.pointerId);
		if (thumbXRef.current && currentOrientationRef.current === "horizontal") thumbXRef.current.releasePointerCapture(event.pointerId);
	});
	function handleTouchModalityChange(event) {
		setTouchModality(event.pointerType === "touch");
	}
	function handlePointerEnterOrMove(event) {
		handleTouchModalityChange(event);
		if (event.pointerType !== "touch") setHovering(contains(rootRef.current, event.target));
	}
	const state = import_react.useMemo(() => ({
		scrolling: scrollingX || scrollingY,
		hasOverflowX: !hiddenState.x,
		hasOverflowY: !hiddenState.y,
		overflowXStart: overflowEdges.xStart,
		overflowXEnd: overflowEdges.xEnd,
		overflowYStart: overflowEdges.yStart,
		overflowYEnd: overflowEdges.yEnd,
		cornerHidden: hiddenState.corner
	}), [
		scrollingX,
		scrollingY,
		hiddenState.x,
		hiddenState.y,
		hiddenState.corner,
		overflowEdges
	]);
	const props = {
		role: "presentation",
		onPointerEnter: handlePointerEnterOrMove,
		onPointerMove: handlePointerEnterOrMove,
		onPointerDown: handleTouchModalityChange,
		onPointerLeave() {
			setHovering(false);
		},
		style: {
			position: "relative",
			[ScrollAreaRootCssVars.scrollAreaCornerHeight]: `${cornerSize.height}px`,
			[ScrollAreaRootCssVars.scrollAreaCornerWidth]: `${cornerSize.width}px`
		}
	};
	const element = useRenderElement("div", componentProps, {
		state,
		ref: [forwardedRef, rootRef],
		props: [props, elementProps],
		stateAttributesMapping: scrollAreaStateAttributesMapping
	});
	const contextValue = import_react.useMemo(() => ({
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		handleScroll,
		cornerSize,
		setCornerSize,
		thumbSize,
		setThumbSize,
		hasMeasuredScrollbar,
		setHasMeasuredScrollbar,
		touchModality,
		cornerRef,
		scrollingX,
		setScrollingX,
		scrollingY,
		setScrollingY,
		hovering,
		setHovering,
		viewportRef,
		rootRef,
		scrollbarYRef,
		scrollbarXRef,
		thumbYRef,
		thumbXRef,
		rootId,
		hiddenState,
		setHiddenState,
		overflowEdges,
		setOverflowEdges,
		viewportState: state,
		overflowEdgeThreshold
	}), [
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		handleScroll,
		cornerSize,
		thumbSize,
		hasMeasuredScrollbar,
		touchModality,
		scrollingX,
		setScrollingX,
		scrollingY,
		setScrollingY,
		hovering,
		setHovering,
		rootId,
		hiddenState,
		overflowEdges,
		state,
		overflowEdgeThreshold
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollAreaRootContext.Provider, {
		value: contextValue,
		children: [!disableStyleElements && styleDisableScrollbar.getElement(nonce), element]
	});
});
function normalizeOverflowEdgeThreshold(threshold) {
	if (typeof threshold === "number") {
		const value = Math.max(0, threshold);
		return {
			xStart: value,
			xEnd: value,
			yStart: value,
			yEnd: value
		};
	}
	return {
		xStart: Math.max(0, threshold?.xStart || 0),
		xEnd: Math.max(0, threshold?.xEnd || 0),
		yStart: Math.max(0, threshold?.yStart || 0),
		yEnd: Math.max(0, threshold?.yEnd || 0)
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewportContext.js
var ScrollAreaViewportContext = /* @__PURE__ */ import_react.createContext(void 0);
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewportCssVars.js
var ScrollAreaViewportCssVars = /* @__PURE__ */ function(ScrollAreaViewportCssVars) {
	/**
	* The distance from the horizontal start edge in pixels.
	* @type {number}
	*/
	ScrollAreaViewportCssVars["scrollAreaOverflowXStart"] = "--scroll-area-overflow-x-start";
	/**
	* The distance from the horizontal end edge in pixels.
	* @type {number}
	*/
	ScrollAreaViewportCssVars["scrollAreaOverflowXEnd"] = "--scroll-area-overflow-x-end";
	/**
	* The distance from the vertical start edge in pixels.
	* @type {number}
	*/
	ScrollAreaViewportCssVars["scrollAreaOverflowYStart"] = "--scroll-area-overflow-y-start";
	/**
	* The distance from the vertical end edge in pixels.
	* @type {number}
	*/
	ScrollAreaViewportCssVars["scrollAreaOverflowYEnd"] = "--scroll-area-overflow-y-end";
	return ScrollAreaViewportCssVars;
}({});
function normalizeScrollOffset(value, max) {
	if (max <= 0) return 0;
	const clamped = clamp(value, 0, max);
	const startDistance = clamped;
	const endDistance = max - clamped;
	const withinStartTolerance = startDistance <= 1;
	const withinEndTolerance = endDistance <= 1;
	if (withinStartTolerance && withinEndTolerance) return startDistance <= endDistance ? 0 : max;
	if (withinStartTolerance) return 0;
	if (withinEndTolerance) return max;
	return clamped;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewport.js
var scrollAreaOverflowVarsRegistered = false;
/**
* Removes inheritance of the scroll area overflow CSS variables, which
* improves rendering performance in complex scroll areas with deep subtrees.
* Instead, each child must manually opt-in to using these properties by
* specifying `inherit`.
* See https://motion.dev/blog/web-animation-performance-tier-list
* under the "Improving CSS variable performance" section.
*/
function removeCSSVariableInheritance() {
	if (scrollAreaOverflowVarsRegistered || isWebKit) return;
	if (typeof CSS !== "undefined" && "registerProperty" in CSS) [
		ScrollAreaViewportCssVars.scrollAreaOverflowXStart,
		ScrollAreaViewportCssVars.scrollAreaOverflowXEnd,
		ScrollAreaViewportCssVars.scrollAreaOverflowYStart,
		ScrollAreaViewportCssVars.scrollAreaOverflowYEnd
	].forEach((name) => {
		try {
			CSS.registerProperty({
				name,
				syntax: "<length>",
				inherits: false,
				initialValue: "0px"
			});
		} catch {}
	});
	scrollAreaOverflowVarsRegistered = true;
}
/**
* The actual scrollable container of the scroll area.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaViewport = /* @__PURE__ */ import_react.forwardRef(function ScrollAreaViewport(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { viewportRef, scrollbarYRef, scrollbarXRef, thumbYRef, thumbXRef, cornerRef, cornerSize, setCornerSize, setThumbSize, rootId, setHiddenState, hiddenState, setHasMeasuredScrollbar, handleScroll, setHovering, setOverflowEdges, overflowEdges, overflowEdgeThreshold, scrollingX, scrollingY } = useScrollAreaRootContext();
	const direction = useDirection();
	const programmaticScrollRef = import_react.useRef(true);
	const lastMeasuredViewportMetricsRef = import_react.useRef([
		NaN,
		NaN,
		NaN,
		NaN
	]);
	const scrollEndTimeout = useTimeout();
	const waitForAnimationsTimeout = useTimeout();
	const computeThumbPosition = useStableCallback(() => {
		const viewportEl = viewportRef.current;
		const scrollbarYEl = scrollbarYRef.current;
		const scrollbarXEl = scrollbarXRef.current;
		const thumbYEl = thumbYRef.current;
		const thumbXEl = thumbXRef.current;
		const cornerEl = cornerRef.current;
		if (!viewportEl) return;
		const scrollableContentHeight = viewportEl.scrollHeight;
		const scrollableContentWidth = viewportEl.scrollWidth;
		const viewportHeight = viewportEl.clientHeight;
		const viewportWidth = viewportEl.clientWidth;
		const scrollTop = viewportEl.scrollTop;
		const scrollLeft = viewportEl.scrollLeft;
		const lastMeasuredViewportMetrics = lastMeasuredViewportMetricsRef.current;
		const isFirstMeasurement = Number.isNaN(lastMeasuredViewportMetrics[0]);
		lastMeasuredViewportMetrics[0] = viewportHeight;
		lastMeasuredViewportMetrics[1] = scrollableContentHeight;
		lastMeasuredViewportMetrics[2] = viewportWidth;
		lastMeasuredViewportMetrics[3] = scrollableContentWidth;
		if (isFirstMeasurement) setHasMeasuredScrollbar(true);
		if (scrollableContentHeight === 0 || scrollableContentWidth === 0) return;
		const nextHiddenState = getHiddenState(viewportEl);
		const scrollbarYHidden = nextHiddenState.y;
		const scrollbarXHidden = nextHiddenState.x;
		const ratioX = viewportWidth / scrollableContentWidth;
		const ratioY = viewportHeight / scrollableContentHeight;
		const maxScrollLeft = Math.max(0, scrollableContentWidth - viewportWidth);
		const maxScrollTop = Math.max(0, scrollableContentHeight - viewportHeight);
		let scrollLeftFromStart = 0;
		let scrollLeftFromEnd = 0;
		if (!scrollbarXHidden) {
			let rawScrollLeftFromStart = 0;
			if (direction === "rtl") rawScrollLeftFromStart = clamp(-scrollLeft, 0, maxScrollLeft);
			else rawScrollLeftFromStart = clamp(scrollLeft, 0, maxScrollLeft);
			scrollLeftFromStart = normalizeScrollOffset(rawScrollLeftFromStart, maxScrollLeft);
			scrollLeftFromEnd = maxScrollLeft - scrollLeftFromStart;
		}
		const rawScrollTopFromStart = !scrollbarYHidden ? clamp(scrollTop, 0, maxScrollTop) : 0;
		const scrollTopFromStart = !scrollbarYHidden ? normalizeScrollOffset(rawScrollTopFromStart, maxScrollTop) : 0;
		const scrollTopFromEnd = !scrollbarYHidden ? maxScrollTop - scrollTopFromStart : 0;
		const nextWidth = scrollbarXHidden ? 0 : viewportWidth;
		const nextHeight = scrollbarYHidden ? 0 : viewportHeight;
		let nextCornerWidth = 0;
		let nextCornerHeight = 0;
		if (!scrollbarXHidden && !scrollbarYHidden) {
			nextCornerWidth = scrollbarYEl?.offsetWidth || 0;
			nextCornerHeight = scrollbarXEl?.offsetHeight || 0;
		}
		const cornerNotYetSized = cornerSize.width === 0 && cornerSize.height === 0;
		const cornerWidthOffset = cornerNotYetSized ? nextCornerWidth : 0;
		const cornerHeightOffset = cornerNotYetSized ? nextCornerHeight : 0;
		const scrollbarXOffset = getOffset(scrollbarXEl, "padding", "x");
		const scrollbarYOffset = getOffset(scrollbarYEl, "padding", "y");
		const thumbXOffset = getOffset(thumbXEl, "margin", "x");
		const thumbYOffset = getOffset(thumbYEl, "margin", "y");
		const idealNextWidth = nextWidth - scrollbarXOffset - thumbXOffset;
		const idealNextHeight = nextHeight - scrollbarYOffset - thumbYOffset;
		const maxNextWidth = scrollbarXEl ? Math.min(scrollbarXEl.offsetWidth - cornerWidthOffset, idealNextWidth) : idealNextWidth;
		const maxNextHeight = scrollbarYEl ? Math.min(scrollbarYEl.offsetHeight - cornerHeightOffset, idealNextHeight) : idealNextHeight;
		const clampedNextWidth = Math.max(16, maxNextWidth * ratioX);
		const clampedNextHeight = Math.max(16, maxNextHeight * ratioY);
		setThumbSize((prevSize) => {
			if (prevSize.height === clampedNextHeight && prevSize.width === clampedNextWidth) return prevSize;
			return {
				width: clampedNextWidth,
				height: clampedNextHeight
			};
		});
		if (scrollbarYEl && thumbYEl) {
			const maxThumbOffsetY = scrollbarYEl.offsetHeight - clampedNextHeight - scrollbarYOffset - thumbYOffset;
			const scrollRangeY = scrollableContentHeight - viewportHeight;
			const scrollRatioY = scrollRangeY === 0 ? 0 : scrollTop / scrollRangeY;
			const thumbOffsetY = Math.min(maxThumbOffsetY, Math.max(0, scrollRatioY * maxThumbOffsetY));
			thumbYEl.style.transform = `translate3d(0,${thumbOffsetY}px,0)`;
		}
		if (scrollbarXEl && thumbXEl) {
			const maxThumbOffsetX = scrollbarXEl.offsetWidth - clampedNextWidth - scrollbarXOffset - thumbXOffset;
			const scrollRangeX = scrollableContentWidth - viewportWidth;
			const scrollRatioX = scrollRangeX === 0 ? 0 : scrollLeft / scrollRangeX;
			const thumbOffsetX = direction === "rtl" ? clamp(scrollRatioX * maxThumbOffsetX, -maxThumbOffsetX, 0) : clamp(scrollRatioX * maxThumbOffsetX, 0, maxThumbOffsetX);
			thumbXEl.style.transform = `translate3d(${thumbOffsetX}px,0,0)`;
		}
		const overflowMetricsPx = [
			[ScrollAreaViewportCssVars.scrollAreaOverflowXStart, scrollLeftFromStart],
			[ScrollAreaViewportCssVars.scrollAreaOverflowXEnd, scrollLeftFromEnd],
			[ScrollAreaViewportCssVars.scrollAreaOverflowYStart, scrollTopFromStart],
			[ScrollAreaViewportCssVars.scrollAreaOverflowYEnd, scrollTopFromEnd]
		];
		for (const [cssVar, value] of overflowMetricsPx) viewportEl.style.setProperty(cssVar, `${value}px`);
		if (cornerEl) {
			if (scrollbarXHidden || scrollbarYHidden) setCornerSize({
				width: 0,
				height: 0
			});
			else if (!scrollbarXHidden && !scrollbarYHidden) setCornerSize({
				width: nextCornerWidth,
				height: nextCornerHeight
			});
		}
		setHiddenState((prevState) => mergeHiddenState(prevState, nextHiddenState));
		const nextOverflowEdges = {
			xStart: !scrollbarXHidden && scrollLeftFromStart > overflowEdgeThreshold.xStart,
			xEnd: !scrollbarXHidden && scrollLeftFromEnd > overflowEdgeThreshold.xEnd,
			yStart: !scrollbarYHidden && scrollTopFromStart > overflowEdgeThreshold.yStart,
			yEnd: !scrollbarYHidden && scrollTopFromEnd > overflowEdgeThreshold.yEnd
		};
		setOverflowEdges((prev) => {
			if (prev.xStart === nextOverflowEdges.xStart && prev.xEnd === nextOverflowEdges.xEnd && prev.yStart === nextOverflowEdges.yStart && prev.yEnd === nextOverflowEdges.yEnd) return prev;
			return nextOverflowEdges;
		});
	});
	useIsoLayoutEffect(() => {
		if (!viewportRef.current) return;
		removeCSSVariableInheritance();
	}, [viewportRef]);
	useIsoLayoutEffect(() => {
		queueMicrotask(computeThumbPosition);
	}, [
		computeThumbPosition,
		hiddenState,
		direction
	]);
	useIsoLayoutEffect(() => {
		if (viewportRef.current?.matches(":hover")) setHovering(true);
	}, [viewportRef, setHovering]);
	import_react.useEffect(() => {
		const viewport = viewportRef.current;
		if (typeof ResizeObserver === "undefined" || !viewport) return;
		let hasInitialized = false;
		const ro = new ResizeObserver(() => {
			if (!hasInitialized) {
				hasInitialized = true;
				const lastMeasuredViewportMetrics = lastMeasuredViewportMetricsRef.current;
				if (lastMeasuredViewportMetrics[0] === viewport.clientHeight && lastMeasuredViewportMetrics[1] === viewport.scrollHeight && lastMeasuredViewportMetrics[2] === viewport.clientWidth && lastMeasuredViewportMetrics[3] === viewport.scrollWidth) return;
			}
			computeThumbPosition();
		});
		ro.observe(viewport);
		waitForAnimationsTimeout.start(0, () => {
			const animations = viewport.getAnimations({ subtree: true });
			if (animations.length === 0) return;
			Promise.allSettled(animations.map((animation) => animation.finished)).then(computeThumbPosition).catch(() => {});
		});
		return () => {
			ro.disconnect();
			waitForAnimationsTimeout.clear();
		};
	}, [
		computeThumbPosition,
		viewportRef,
		waitForAnimationsTimeout
	]);
	function handleUserInteraction() {
		programmaticScrollRef.current = false;
	}
	const props = {
		role: "presentation",
		...rootId && { "data-id": `${rootId}-viewport` },
		tabIndex: hiddenState.x && hiddenState.y ? -1 : 0,
		className: styleDisableScrollbar.className,
		style: { overflow: "scroll" },
		onScroll() {
			if (!viewportRef.current) return;
			computeThumbPosition();
			if (!programmaticScrollRef.current) handleScroll({
				x: viewportRef.current.scrollLeft,
				y: viewportRef.current.scrollTop
			});
			scrollEndTimeout.start(100, () => {
				programmaticScrollRef.current = true;
			});
		},
		onWheel: handleUserInteraction,
		onTouchMove: handleUserInteraction,
		onPointerMove: handleUserInteraction,
		onPointerEnter: handleUserInteraction,
		onKeyDown: handleUserInteraction
	};
	const viewportState = import_react.useMemo(() => ({
		scrolling: scrollingX || scrollingY,
		hasOverflowX: !hiddenState.x,
		hasOverflowY: !hiddenState.y,
		overflowXStart: overflowEdges.xStart,
		overflowXEnd: overflowEdges.xEnd,
		overflowYStart: overflowEdges.yStart,
		overflowYEnd: overflowEdges.yEnd,
		cornerHidden: hiddenState.corner
	}), [
		scrollingX,
		scrollingY,
		hiddenState.x,
		hiddenState.y,
		hiddenState.corner,
		overflowEdges
	]);
	const element = useRenderElement("div", componentProps, {
		ref: [forwardedRef, viewportRef],
		state: viewportState,
		props: [props, elementProps],
		stateAttributesMapping: scrollAreaStateAttributesMapping
	});
	const contextValue = import_react.useMemo(() => ({ computeThumbPosition }), [computeThumbPosition]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaViewportContext.Provider, {
		value: contextValue,
		children: element
	});
});
function getHiddenState(viewport) {
	const y = viewport.clientHeight >= viewport.scrollHeight;
	const x = viewport.clientWidth >= viewport.scrollWidth;
	return {
		y,
		x,
		corner: y || x
	};
}
function mergeHiddenState(prevState, nextState) {
	if (prevState.y === nextState.y && prevState.x === nextState.x && prevState.corner === nextState.corner) return prevState;
	return nextState;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarContext.js
var ScrollAreaScrollbarContext = /* @__PURE__ */ import_react.createContext(void 0);
function useScrollAreaScrollbarContext() {
	const context = import_react.useContext(ScrollAreaScrollbarContext);
	if (context === void 0) throw new Error(formatErrorMessage(54));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarCssVars.js
var ScrollAreaScrollbarCssVars = /* @__PURE__ */ function(ScrollAreaScrollbarCssVars) {
	/**
	* The scroll area thumb's height.
	* @type {number}
	*/
	ScrollAreaScrollbarCssVars["scrollAreaThumbHeight"] = "--scroll-area-thumb-height";
	/**
	* The scroll area thumb's width.
	* @type {number}
	*/
	ScrollAreaScrollbarCssVars["scrollAreaThumbWidth"] = "--scroll-area-thumb-width";
	return ScrollAreaScrollbarCssVars;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbar.js
/**
* A vertical or horizontal scrollbar for the scroll area.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaScrollbar = /* @__PURE__ */ import_react.forwardRef(function ScrollAreaScrollbar(componentProps, forwardedRef) {
	const { render, className, orientation = "vertical", keepMounted = false, style, ...elementProps } = componentProps;
	const { hovering, scrollingX, scrollingY, hiddenState, overflowEdges, scrollbarYRef, scrollbarXRef, viewportRef, thumbYRef, thumbXRef, handlePointerDown, handlePointerUp, rootId, thumbSize, hasMeasuredScrollbar } = useScrollAreaRootContext();
	const state = {
		hovering,
		scrolling: {
			horizontal: scrollingX,
			vertical: scrollingY
		}[orientation],
		orientation,
		hasOverflowX: !hiddenState.x,
		hasOverflowY: !hiddenState.y,
		overflowXStart: overflowEdges.xStart,
		overflowXEnd: overflowEdges.xEnd,
		overflowYStart: overflowEdges.yStart,
		overflowYEnd: overflowEdges.yEnd,
		cornerHidden: hiddenState.corner
	};
	const direction = useDirection();
	const hideTrackUntilMeasured = !hasMeasuredScrollbar && !keepMounted;
	import_react.useEffect(() => {
		const viewportEl = viewportRef.current;
		const scrollbarEl = orientation === "vertical" ? scrollbarYRef.current : scrollbarXRef.current;
		if (!scrollbarEl) return;
		function handleWheel(event) {
			if (!viewportEl || !scrollbarEl || event.ctrlKey) return;
			event.preventDefault();
			if (orientation === "vertical") {
				if (viewportEl.scrollTop === 0 && event.deltaY < 0) return;
			} else if (viewportEl.scrollLeft === 0 && event.deltaX < 0) return;
			if (orientation === "vertical") {
				if (viewportEl.scrollTop === viewportEl.scrollHeight - viewportEl.clientHeight && event.deltaY > 0) return;
			} else if (viewportEl.scrollLeft === viewportEl.scrollWidth - viewportEl.clientWidth && event.deltaX > 0) return;
			if (orientation === "vertical") viewportEl.scrollTop += event.deltaY;
			else viewportEl.scrollLeft += event.deltaX;
		}
		return addEventListener(scrollbarEl, "wheel", handleWheel, { passive: false });
	}, [
		orientation,
		scrollbarXRef,
		scrollbarYRef,
		viewportRef
	]);
	const props = {
		...rootId && { "data-id": `${rootId}-scrollbar` },
		onPointerDown(event) {
			if (event.button !== 0) return;
			const target = getTarget(event.nativeEvent);
			const thumb = orientation === "vertical" ? thumbYRef.current : thumbXRef.current;
			if (thumb && contains(thumb, target)) return;
			if (!viewportRef.current) return;
			if (thumbYRef.current && scrollbarYRef.current && orientation === "vertical") {
				const thumbYOffset = getOffset(thumbYRef.current, "margin", "y");
				const scrollbarYOffset = getOffset(scrollbarYRef.current, "padding", "y");
				const thumbHeight = thumbYRef.current.offsetHeight;
				const trackRectY = scrollbarYRef.current.getBoundingClientRect();
				const clickY = event.clientY - trackRectY.top - thumbHeight / 2 - scrollbarYOffset + thumbYOffset / 2;
				const scrollableContentHeight = viewportRef.current.scrollHeight;
				const viewportHeight = viewportRef.current.clientHeight;
				const newScrollTop = clickY / (scrollbarYRef.current.offsetHeight - thumbHeight - scrollbarYOffset - thumbYOffset) * (scrollableContentHeight - viewportHeight);
				viewportRef.current.scrollTop = newScrollTop;
			}
			if (thumbXRef.current && scrollbarXRef.current && orientation === "horizontal") {
				const thumbXOffset = getOffset(thumbXRef.current, "margin", "x");
				const scrollbarXOffset = getOffset(scrollbarXRef.current, "padding", "x");
				const thumbWidth = thumbXRef.current.offsetWidth;
				const trackRectX = scrollbarXRef.current.getBoundingClientRect();
				const clickX = event.clientX - trackRectX.left - thumbWidth / 2 - scrollbarXOffset + thumbXOffset / 2;
				const scrollableContentWidth = viewportRef.current.scrollWidth;
				const viewportWidth = viewportRef.current.clientWidth;
				const scrollRatioX = clickX / (scrollbarXRef.current.offsetWidth - thumbWidth - scrollbarXOffset - thumbXOffset);
				let newScrollLeft;
				if (direction === "rtl") {
					newScrollLeft = (1 - scrollRatioX) * (scrollableContentWidth - viewportWidth);
					if (viewportRef.current.scrollLeft <= 0) newScrollLeft = -newScrollLeft;
				} else newScrollLeft = scrollRatioX * (scrollableContentWidth - viewportWidth);
				viewportRef.current.scrollLeft = newScrollLeft;
			}
			handlePointerDown(event);
		},
		onPointerUp: handlePointerUp,
		style: {
			position: "absolute",
			touchAction: "none",
			WebkitUserSelect: "none",
			userSelect: "none",
			visibility: hideTrackUntilMeasured ? "hidden" : void 0,
			...orientation === "vertical" && {
				top: 0,
				bottom: `var(${ScrollAreaRootCssVars.scrollAreaCornerHeight})`,
				insetInlineEnd: 0,
				[ScrollAreaScrollbarCssVars.scrollAreaThumbHeight]: `${thumbSize.height}px`
			},
			...orientation === "horizontal" && {
				insetInlineStart: 0,
				insetInlineEnd: `var(${ScrollAreaRootCssVars.scrollAreaCornerWidth})`,
				bottom: 0,
				[ScrollAreaScrollbarCssVars.scrollAreaThumbWidth]: `${thumbSize.width}px`
			}
		}
	};
	const element = useRenderElement("div", componentProps, {
		ref: [forwardedRef, orientation === "vertical" ? scrollbarYRef : scrollbarXRef],
		state,
		props: [props, elementProps],
		stateAttributesMapping: scrollAreaStateAttributesMapping
	});
	const contextValue = import_react.useMemo(() => ({ orientation }), [orientation]);
	const isHidden = orientation === "vertical" ? hiddenState.y : hiddenState.x;
	if (!(keepMounted || !isHidden)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarContext.Provider, {
		value: contextValue,
		children: element
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/thumb/ScrollAreaThumb.js
/**
* The draggable part of the scrollbar that indicates the current scroll position.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaThumb = /* @__PURE__ */ import_react.forwardRef(function ScrollAreaThumb(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { thumbYRef, thumbXRef, handlePointerDown, handlePointerMove, handlePointerUp, setScrollingX, setScrollingY, hasMeasuredScrollbar } = useScrollAreaRootContext();
	const { orientation } = useScrollAreaScrollbarContext();
	return useRenderElement("div", componentProps, {
		ref: [forwardedRef, orientation === "vertical" ? thumbYRef : thumbXRef],
		state: { orientation },
		props: [{
			onPointerDown: handlePointerDown,
			onPointerMove: handlePointerMove,
			onPointerUp(event) {
				if (orientation === "vertical") setScrollingY(false);
				if (orientation === "horizontal") setScrollingX(false);
				handlePointerUp(event);
			},
			style: {
				visibility: hasMeasuredScrollbar ? void 0 : "hidden",
				...orientation === "vertical" && { height: `var(${ScrollAreaScrollbarCssVars.scrollAreaThumbHeight})` },
				...orientation === "horizontal" && { width: `var(${ScrollAreaScrollbarCssVars.scrollAreaThumbWidth})` }
			}
		}, elementProps]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/scroll-area/corner/ScrollAreaCorner.js
/**
* A small rectangular area that appears at the intersection of horizontal and vertical scrollbars.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaCorner = /* @__PURE__ */ import_react.forwardRef(function ScrollAreaCorner(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { cornerRef, cornerSize, hiddenState } = useScrollAreaRootContext();
	const element = useRenderElement("div", componentProps, {
		ref: [forwardedRef, cornerRef],
		props: [{ style: {
			position: "absolute",
			bottom: 0,
			insetInlineEnd: 0,
			width: cornerSize.width,
			height: cornerSize.height
		} }, elementProps]
	});
	if (hiddenState.corner) return null;
	return element;
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/utils/asc.js
function asc(a, b) {
	return a - b;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/utils/replaceArrayItemAtIndex.js
function replaceArrayItemAtIndex(array, index, newValue) {
	const output = array.slice();
	output[index] = newValue;
	return output.sort(asc);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/utils/getSliderValue.js
function getSliderValue(valueInput, index, min, max, range, values) {
	let newValue = valueInput;
	newValue = clamp(newValue, min, max);
	if (range) newValue = replaceArrayItemAtIndex(values, index, clamp(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity));
	return newValue;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/utils/validateMinimumDistance.js
function validateMinimumDistance(values, step, minStepsBetweenValues) {
	if (!Array.isArray(values)) return true;
	const distances = values.reduce((acc, val, index, vals) => {
		if (index === vals.length - 1) return acc;
		acc.push(Math.abs(val - vals[index + 1]));
		return acc;
	}, []);
	return Math.min(...distances) >= step * minStepsBetweenValues;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/root/stateAttributesMapping.js
var sliderStateAttributesMapping = {
	activeThumbIndex: () => null,
	max: () => null,
	min: () => null,
	minStepsBetweenValues: () => null,
	step: () => null,
	values: () => null,
	...fieldValidityMapping
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/root/SliderRootContext.js
var SliderRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useSliderRootContext() {
	const context = import_react.useContext(SliderRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(62));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/root/SliderRoot.js
function getSliderChangeEventReason(event) {
	return "key" in event ? keyboard : inputChange;
}
function areValuesEqual(newValue, oldValue) {
	if (typeof newValue === "number" && typeof oldValue === "number") return newValue === oldValue;
	if (Array.isArray(newValue) && Array.isArray(oldValue)) return areArraysEqual(newValue, oldValue);
	return false;
}
/**
* Groups all parts of the slider.
* Renders a `<div>` element.
*
* Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
*/
var SliderRoot = /* @__PURE__ */ import_react.forwardRef(function SliderRoot(componentProps, forwardedRef) {
	const { "aria-labelledby": ariaLabelledByProp, className, defaultValue, disabled: disabledProp = false, id: idProp, format, largeStep = 10, locale, render, max = 100, min = 0, minStepsBetweenValues = 0, form, name: nameProp, onValueChange: onValueChangeProp, onValueCommitted: onValueCommittedProp, orientation = "horizontal", step = 1, thumbCollisionBehavior = "push", thumbAlignment = "center", value: valueProp, style, ...elementProps } = componentProps;
	const id = useBaseUiId(idProp);
	const defaultLabelId = getDefaultLabelId(id);
	const onValueChange = useStableCallback(onValueChangeProp);
	const onValueCommitted = useStableCallback(onValueCommittedProp);
	const { clearErrors } = useFormContext();
	const { state: fieldState, disabled: fieldDisabled, name: fieldName, setTouched, setDirty, validityData, shouldValidateOnChange, validation } = useFieldRootContext();
	const { labelId: fieldLabelId } = useLabelableContext();
	const [labelId, setLabelId] = import_react.useState();
	const ariaLabelledby = ariaLabelledByProp ?? resolveAriaLabelledBy(fieldLabelId, labelId);
	const disabled = fieldDisabled || disabledProp;
	const name = fieldName ?? nameProp;
	const [valueUnwrapped, setValueUnwrapped] = useControlled({
		controlled: valueProp,
		default: defaultValue ?? min,
		name: "Slider"
	});
	const sliderRef = import_react.useRef(null);
	const controlRef = import_react.useRef(null);
	const thumbRefs = import_react.useRef([]);
	const pressedInputRef = import_react.useRef(null);
	const pressedThumbCenterOffsetRef = import_react.useRef(null);
	const pressedThumbIndexRef = import_react.useRef(-1);
	const pressedValuesRef = import_react.useRef(null);
	const lastChangedValueRef = import_react.useRef(null);
	const lastChangeReasonRef = import_react.useRef("none");
	const formatOptionsRef = useValueAsRef(format);
	const [active, setActiveState] = import_react.useState(-1);
	const [lastUsedThumbIndex, setLastUsedThumbIndex] = import_react.useState(-1);
	const [dragging, setDragging] = import_react.useState(false);
	const [thumbMap, setThumbMap] = import_react.useState(() => /* @__PURE__ */ new Map());
	const [indicatorPosition, setIndicatorPosition] = import_react.useState([void 0, void 0]);
	const setActive = useStableCallback((value) => {
		setActiveState(value);
		if (value !== -1) setLastUsedThumbIndex(value);
	});
	useRegisterFieldControl(controlRef, {
		id,
		value: valueUnwrapped
	});
	useValueChanged(valueUnwrapped, () => {
		clearErrors(name);
		if (shouldValidateOnChange()) validation.commit(valueUnwrapped);
		else validation.commit(valueUnwrapped, true);
		const initialValue = validityData.initialValue;
		let isDirty;
		if (Array.isArray(valueUnwrapped) && Array.isArray(initialValue)) isDirty = !areArraysEqual(valueUnwrapped, initialValue);
		else isDirty = valueUnwrapped !== initialValue;
		setDirty(isDirty);
	});
	const registerFieldControlRef = useStableCallback((element) => {
		if (element) controlRef.current = element;
	});
	const range = Array.isArray(valueUnwrapped);
	const values = import_react.useMemo(() => {
		if (!range) return [clamp(valueUnwrapped, min, max)];
		return valueUnwrapped.slice().sort(asc);
	}, [
		max,
		min,
		range,
		valueUnwrapped
	]);
	const setValue = useStableCallback((newValue, details) => {
		if (Number.isNaN(newValue) || areValuesEqual(newValue, valueUnwrapped)) return;
		const changeDetails = details ?? createChangeEventDetails("none", void 0, void 0, { activeThumbIndex: -1 });
		lastChangeReasonRef.current = changeDetails.reason;
		const nativeEvent = changeDetails.event;
		const clonedEvent = new (nativeEvent.constructor ?? Event)(nativeEvent.type, nativeEvent);
		Object.defineProperty(clonedEvent, "target", {
			writable: true,
			value: {
				value: newValue,
				name
			}
		});
		changeDetails.event = clonedEvent;
		lastChangedValueRef.current = newValue;
		onValueChange(newValue, changeDetails);
		if (changeDetails.isCanceled) return;
		setValueUnwrapped(newValue);
	});
	const handleInputChange = useStableCallback((valueInput, index, event) => {
		const newValue = getSliderValue(valueInput, index, min, max, range, values);
		if (validateMinimumDistance(newValue, step, minStepsBetweenValues)) {
			const reason = getSliderChangeEventReason(event);
			setValue(newValue, createChangeEventDetails(reason, event.nativeEvent, void 0, { activeThumbIndex: index }));
			setTouched(true);
			onValueCommitted(lastChangedValueRef.current ?? newValue, createGenericEventDetails(reason, event.nativeEvent));
		}
	});
	useIsoLayoutEffect(() => {
		const activeEl = activeElement(ownerDocument(sliderRef.current));
		if (disabled && contains(sliderRef.current, activeEl)) activeEl.blur();
	}, [disabled]);
	if (disabled && active !== -1) setActive(-1);
	const state = import_react.useMemo(() => ({
		...fieldState,
		activeThumbIndex: active,
		disabled,
		dragging,
		orientation,
		max,
		min,
		minStepsBetweenValues,
		step,
		values
	}), [
		fieldState,
		active,
		disabled,
		dragging,
		max,
		min,
		minStepsBetweenValues,
		orientation,
		step,
		values
	]);
	const contextValue = import_react.useMemo(() => ({
		active,
		controlRef,
		disabled,
		dragging,
		validation,
		formatOptionsRef,
		handleInputChange,
		indicatorPosition,
		inset: thumbAlignment !== "center",
		labelId: ariaLabelledby,
		rootLabelId: defaultLabelId,
		largeStep,
		lastUsedThumbIndex,
		lastChangedValueRef,
		lastChangeReasonRef,
		form,
		locale,
		max,
		min,
		minStepsBetweenValues,
		name,
		onValueCommitted,
		orientation,
		pressedInputRef,
		pressedThumbCenterOffsetRef,
		pressedThumbIndexRef,
		pressedValuesRef,
		registerFieldControlRef,
		renderBeforeHydration: thumbAlignment === "edge",
		setActive,
		setDragging,
		setIndicatorPosition,
		setLabelId,
		setValue,
		state,
		step,
		thumbCollisionBehavior,
		thumbMap,
		thumbRefs,
		values
	}), [
		active,
		controlRef,
		ariaLabelledby,
		defaultLabelId,
		disabled,
		dragging,
		validation,
		formatOptionsRef,
		handleInputChange,
		indicatorPosition,
		largeStep,
		lastUsedThumbIndex,
		lastChangedValueRef,
		lastChangeReasonRef,
		form,
		locale,
		max,
		min,
		minStepsBetweenValues,
		name,
		onValueCommitted,
		orientation,
		pressedInputRef,
		pressedThumbCenterOffsetRef,
		pressedThumbIndexRef,
		pressedValuesRef,
		registerFieldControlRef,
		setActive,
		setDragging,
		setIndicatorPosition,
		setLabelId,
		setValue,
		state,
		step,
		thumbCollisionBehavior,
		thumbAlignment,
		thumbMap,
		thumbRefs,
		values
	]);
	const element = useRenderElement("div", componentProps, {
		state,
		ref: [forwardedRef, sliderRef],
		props: [
			{
				"aria-labelledby": ariaLabelledby,
				id,
				role: "group"
			},
			validation.getValidationProps,
			elementProps
		],
		stateAttributesMapping: sliderStateAttributesMapping
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRootContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeList, {
			elementsRef: thumbRefs,
			onMapChange: setThumbMap,
			children: element
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/utils/getMidpoint.js
function getMidpoint(element) {
	const rect = element.getBoundingClientRect();
	return {
		x: (rect.left + rect.right) / 2,
		y: (rect.top + rect.bottom) / 2
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/utils/roundValueToStep.js
function getDecimalPrecision(num) {
	if (num === 0) return 0;
	if (Math.abs(num) < 1) {
		const parts = num.toExponential().split("e-");
		const matissaDecimalPart = parts[0].split(".")[1];
		return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
	}
	const decimalPart = num.toString().split(".")[1];
	return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min) {
	const nearest = Math.round((value - min) / step) * step + min;
	return Number(nearest.toFixed(Math.max(getDecimalPrecision(step), getDecimalPrecision(min))));
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/utils/getPushedThumbValues.js
/**
* Returns a new array of slider values where attempting to move the thumb at `index`
* beyond its neighbours "pushes" them while respecting `minStepsBetweenValues`.
*/
function getPushedThumbValues({ values, index, nextValue, min, max, step, minStepsBetweenValues, initialValues }) {
	if (values.length === 0) return [];
	const nextValues = values.slice();
	const minValueDifference = step * minStepsBetweenValues;
	const lastIndex = nextValues.length - 1;
	const baseInitialValues = initialValues ?? values;
	nextValues[index] = clamp(nextValue, min + index * minValueDifference, max - (lastIndex - index) * minValueDifference);
	for (let i = index + 1; i <= lastIndex; i += 1) {
		const minAllowed = nextValues[i - 1] + minValueDifference;
		const maxAllowed = max - (lastIndex - i) * minValueDifference;
		const initialValue = baseInitialValues[i] ?? nextValues[i];
		let candidate = Math.max(nextValues[i], minAllowed);
		if (initialValue < candidate) candidate = Math.max(initialValue, minAllowed);
		nextValues[i] = clamp(candidate, minAllowed, maxAllowed);
	}
	for (let i = index - 1; i >= 0; i -= 1) {
		const maxAllowed = nextValues[i + 1] - minValueDifference;
		const minAllowed = min + i * minValueDifference;
		const initialValue = baseInitialValues[i] ?? nextValues[i];
		let candidate = Math.min(nextValues[i], maxAllowed);
		if (initialValue > candidate) candidate = Math.min(initialValue, maxAllowed);
		nextValues[i] = clamp(candidate, minAllowed, maxAllowed);
	}
	for (let i = 0; i <= lastIndex; i += 1) nextValues[i] = Number(nextValues[i].toFixed(12));
	return nextValues;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/utils/resolveThumbCollision.js
function resolveThumbCollision({ behavior, values, currentValues, initialValues, pressedIndex, nextValue, min, max, step, minStepsBetweenValues }) {
	const activeValues = currentValues ?? values;
	const baselineValues = initialValues ?? values;
	if (!(activeValues.length > 1)) return {
		value: nextValue,
		thumbIndex: 0,
		didSwap: false
	};
	const minValueDifference = step * minStepsBetweenValues;
	switch (behavior) {
		case "swap": {
			const pressedInitialValue = activeValues[pressedIndex];
			const epsilon = 1e-7;
			const candidateValues = activeValues.slice();
			const previousNeighbor = candidateValues[pressedIndex - 1];
			const nextNeighbor = candidateValues[pressedIndex + 1];
			const constrainedValue = clamp(nextValue, previousNeighbor != null ? previousNeighbor + minValueDifference : min, nextNeighbor != null ? nextNeighbor - minValueDifference : max);
			const pressedValueAfterClamp = Number(constrainedValue.toFixed(12));
			candidateValues[pressedIndex] = pressedValueAfterClamp;
			const movingForward = nextValue > pressedInitialValue;
			const movingBackward = nextValue < pressedInitialValue;
			const shouldSwapForward = movingForward && nextNeighbor != null && nextValue >= nextNeighbor - epsilon;
			const shouldSwapBackward = movingBackward && previousNeighbor != null && nextValue <= previousNeighbor + epsilon;
			if (!shouldSwapForward && !shouldSwapBackward) return {
				value: candidateValues,
				thumbIndex: pressedIndex,
				didSwap: false
			};
			const targetIndex = shouldSwapForward ? pressedIndex + 1 : pressedIndex - 1;
			const initialValuesForPush = candidateValues.map((_, index) => {
				if (index === pressedIndex) return pressedValueAfterClamp;
				const baseline = baselineValues[index];
				if (baseline != null) return baseline;
				return activeValues[index];
			});
			let nextValueForTarget = nextValue;
			if (shouldSwapForward) nextValueForTarget = Math.max(nextValue, candidateValues[targetIndex]);
			else nextValueForTarget = Math.min(nextValue, candidateValues[targetIndex]);
			const adjustedValues = getPushedThumbValues({
				values: candidateValues,
				index: targetIndex,
				nextValue: nextValueForTarget,
				min,
				max,
				step,
				minStepsBetweenValues,
				initialValues: initialValuesForPush
			});
			const neighborIndex = shouldSwapForward ? targetIndex - 1 : targetIndex + 1;
			if (neighborIndex >= 0 && neighborIndex < adjustedValues.length) {
				const previousValue = adjustedValues[neighborIndex - 1];
				const nextValueAfter = adjustedValues[neighborIndex + 1];
				let neighborLowerBound = previousValue != null ? previousValue + minValueDifference : min;
				neighborLowerBound = Math.max(neighborLowerBound, min + neighborIndex * minValueDifference);
				let neighborUpperBound = nextValueAfter != null ? nextValueAfter - minValueDifference : max;
				neighborUpperBound = Math.min(neighborUpperBound, max - (adjustedValues.length - 1 - neighborIndex) * minValueDifference);
				const restoredValue = clamp(pressedValueAfterClamp, neighborLowerBound, neighborUpperBound);
				adjustedValues[neighborIndex] = Number(restoredValue.toFixed(12));
			}
			return {
				value: adjustedValues,
				thumbIndex: targetIndex,
				didSwap: true
			};
		}
		case "push": return {
			value: getPushedThumbValues({
				values: activeValues,
				index: pressedIndex,
				nextValue,
				min,
				max,
				step,
				minStepsBetweenValues
			}),
			thumbIndex: pressedIndex,
			didSwap: false
		};
		default: {
			const candidateValues = activeValues.slice();
			const previousNeighbor = candidateValues[pressedIndex - 1];
			const nextNeighbor = candidateValues[pressedIndex + 1];
			const constrainedValue = clamp(nextValue, previousNeighbor != null ? previousNeighbor + minValueDifference : min, nextNeighbor != null ? nextNeighbor - minValueDifference : max);
			candidateValues[pressedIndex] = Number(constrainedValue.toFixed(12));
			return {
				value: candidateValues,
				thumbIndex: pressedIndex,
				didSwap: false
			};
		}
	}
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/control/SliderControl.js
var INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
function getControlOffset(styles, vertical) {
	if (!styles) return {
		start: 0,
		end: 0
	};
	function parseSize(value) {
		const parsed = value != null ? parseFloat(value) : 0;
		return Number.isNaN(parsed) ? 0 : parsed;
	}
	const start = !vertical ? "InlineStart" : "Top";
	const end = !vertical ? "InlineEnd" : "Bottom";
	return {
		start: parseSize(styles[`border${start}Width`]) + parseSize(styles[`padding${start}`]),
		end: parseSize(styles[`border${end}Width`]) + parseSize(styles[`padding${end}`])
	};
}
function getFingerCoords(event, touchIdRef) {
	if (touchIdRef.current != null && event.changedTouches) {
		const touchEvent = event;
		for (let i = 0; i < touchEvent.changedTouches.length; i += 1) {
			const touch = touchEvent.changedTouches[i];
			if (touch.identifier === touchIdRef.current) return {
				x: touch.clientX,
				y: touch.clientY
			};
		}
		return null;
	}
	return {
		x: event.clientX,
		y: event.clientY
	};
}
/**
* The clickable, interactive part of the slider.
* Renders a `<div>` element.
*
* Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
*/
var SliderControl = /* @__PURE__ */ import_react.forwardRef(function SliderControl(componentProps, forwardedRef) {
	const { render: renderProp, className, style, ...elementProps } = componentProps;
	const { disabled, dragging, inset, lastChangedValueRef, lastChangeReasonRef, max, min, minStepsBetweenValues, onValueCommitted, orientation, pressedInputRef, pressedThumbCenterOffsetRef, pressedThumbIndexRef, pressedValuesRef, registerFieldControlRef, renderBeforeHydration, setActive, setDragging, setValue, state, step, thumbCollisionBehavior, thumbRefs, values } = useSliderRootContext();
	const direction = useDirection();
	const range = values.length > 1;
	const vertical = orientation === "vertical";
	const controlRef = import_react.useRef(null);
	const stylesRef = import_react.useRef(null);
	const setStylesRef = useStableCallback((element) => {
		if (element && stylesRef.current == null) {
			if (stylesRef.current == null) stylesRef.current = getComputedStyle(element);
		}
	});
	const touchIdRef = import_react.useRef(null);
	const moveCountRef = import_react.useRef(0);
	const insetThumbOffsetRef = import_react.useRef(0);
	const latestValuesRef = useValueAsRef(values);
	const updatePressedThumb = useStableCallback((nextIndex) => {
		if (pressedThumbIndexRef.current !== nextIndex) pressedThumbIndexRef.current = nextIndex;
		const thumbElement = thumbRefs.current[nextIndex];
		if (!thumbElement) {
			pressedThumbCenterOffsetRef.current = null;
			pressedInputRef.current = null;
			return;
		}
		pressedInputRef.current = thumbElement.querySelector("input[type=\"range\"]");
	});
	const getFingerState = useStableCallback((fingerCoords) => {
		const control = controlRef.current;
		if (!control) return null;
		const { width, height, bottom, left, right } = control.getBoundingClientRect();
		const controlOffset = getControlOffset(stylesRef.current, vertical);
		const insetThumbOffset = insetThumbOffsetRef.current;
		const controlSize = (vertical ? height : width) - controlOffset.start - controlOffset.end - insetThumbOffset * 2;
		const thumbCenterOffset = pressedThumbCenterOffsetRef.current ?? 0;
		const fingerX = fingerCoords.x - thumbCenterOffset;
		const fingerY = fingerCoords.y - thumbCenterOffset;
		const valueRescaled = clamp(((vertical ? bottom - fingerY - controlOffset.end : (direction === "rtl" ? right - fingerX : fingerX - left) - controlOffset.start) - insetThumbOffset) / controlSize, 0, 1);
		let newValue = (max - min) * valueRescaled + min;
		newValue = roundValueToStep(newValue, step, min);
		newValue = clamp(newValue, min, max);
		if (!range) return {
			value: newValue,
			thumbIndex: 0,
			didSwap: false
		};
		const thumbIndex = pressedThumbIndexRef.current;
		if (thumbIndex < 0) return null;
		const collisionResult = resolveThumbCollision({
			behavior: thumbCollisionBehavior,
			values,
			currentValues: latestValuesRef.current ?? values,
			initialValues: pressedValuesRef.current,
			pressedIndex: thumbIndex,
			nextValue: newValue,
			min,
			max,
			step,
			minStepsBetweenValues
		});
		if (thumbCollisionBehavior === "swap" && collisionResult.didSwap) updatePressedThumb(collisionResult.thumbIndex);
		else pressedThumbIndexRef.current = collisionResult.thumbIndex;
		return collisionResult;
	});
	const startPressing = useStableCallback((fingerCoords) => {
		pressedValuesRef.current = range ? values.slice() : null;
		latestValuesRef.current = values;
		const pressedThumbIndex = pressedThumbIndexRef.current;
		let closestThumbIndex = pressedThumbIndex;
		if (pressedThumbIndex > -1 && pressedThumbIndex < values.length) {
			if (values[pressedThumbIndex] === max) {
				let candidateIndex = pressedThumbIndex;
				while (candidateIndex > 0 && values[candidateIndex - 1] === max) candidateIndex -= 1;
				closestThumbIndex = candidateIndex;
			}
		} else {
			const axis = !vertical ? "x" : "y";
			let minDistance;
			closestThumbIndex = -1;
			for (let i = 0; i < thumbRefs.current.length; i += 1) {
				const thumbEl = thumbRefs.current[i];
				if (isElement(thumbEl)) {
					const midpoint = getMidpoint(thumbEl);
					const distance = Math.abs(fingerCoords[axis] - midpoint[axis]);
					if (minDistance === void 0 || distance <= minDistance) {
						closestThumbIndex = i;
						minDistance = distance;
					}
				}
			}
		}
		if (closestThumbIndex > -1 && closestThumbIndex !== pressedThumbIndex) updatePressedThumb(closestThumbIndex);
		if (inset) {
			const thumbEl = thumbRefs.current[closestThumbIndex];
			if (isElement(thumbEl)) insetThumbOffsetRef.current = thumbEl.getBoundingClientRect()[!vertical ? "width" : "height"] / 2;
		}
	});
	const focusThumb = useStableCallback((thumbIndex) => {
		const input = thumbRefs.current?.[thumbIndex]?.querySelector("input[type=\"range\"]");
		if (!input) return;
		input.focus({
			preventScroll: true,
			focusVisible: false
		});
	});
	const handleTouchMove = useStableCallback((nativeEvent) => {
		const fingerCoords = getFingerCoords(nativeEvent, touchIdRef);
		if (fingerCoords == null) return;
		moveCountRef.current += 1;
		if (nativeEvent.type === "pointermove" && nativeEvent.buttons === 0) {
			handleTouchEnd(nativeEvent);
			return;
		}
		const finger = getFingerState(fingerCoords);
		if (finger == null) return;
		if (validateMinimumDistance(finger.value, step, minStepsBetweenValues)) {
			if (!dragging && moveCountRef.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) setDragging(true);
			setValue(finger.value, createChangeEventDetails(drag, nativeEvent, void 0, { activeThumbIndex: finger.thumbIndex }));
			latestValuesRef.current = Array.isArray(finger.value) ? finger.value : [finger.value];
			if (finger.didSwap) focusThumb(finger.thumbIndex);
		}
	});
	function handleTouchEnd(nativeEvent) {
		setActive(-1);
		setDragging(false);
		pressedInputRef.current = null;
		pressedThumbCenterOffsetRef.current = null;
		const fingerCoords = getFingerCoords(nativeEvent, touchIdRef);
		const finger = fingerCoords != null ? getFingerState(fingerCoords) : null;
		if (finger != null) {
			const commitReason = lastChangeReasonRef.current;
			onValueCommitted(lastChangedValueRef.current ?? finger.value, createGenericEventDetails(commitReason, nativeEvent));
		}
		if ("pointerType" in nativeEvent && controlRef.current?.hasPointerCapture(nativeEvent.pointerId)) controlRef.current?.releasePointerCapture(nativeEvent.pointerId);
		pressedThumbIndexRef.current = -1;
		touchIdRef.current = null;
		pressedValuesRef.current = null;
		stopListening();
	}
	const handleTouchStart = useStableCallback((nativeEvent) => {
		if (disabled) return;
		const touch = nativeEvent.changedTouches[0];
		if (touch != null) touchIdRef.current = touch.identifier;
		const fingerCoords = getFingerCoords(nativeEvent, touchIdRef);
		if (fingerCoords != null) {
			startPressing(fingerCoords);
			const finger = getFingerState(fingerCoords);
			if (finger == null) return;
			focusThumb(finger.thumbIndex);
			setValue(finger.value, createChangeEventDetails(trackPress, nativeEvent, void 0, { activeThumbIndex: finger.thumbIndex }));
			latestValuesRef.current = Array.isArray(finger.value) ? finger.value : [finger.value];
			if (finger.didSwap) focusThumb(finger.thumbIndex);
		}
		moveCountRef.current = 0;
		const doc = ownerDocument(controlRef.current);
		doc.addEventListener("touchmove", handleTouchMove, { passive: true });
		doc.addEventListener("touchend", handleTouchEnd, { passive: true });
	});
	const stopListening = useStableCallback(() => {
		const doc = ownerDocument(controlRef.current);
		doc.removeEventListener("pointermove", handleTouchMove);
		doc.removeEventListener("pointerup", handleTouchEnd);
		doc.removeEventListener("touchmove", handleTouchMove);
		doc.removeEventListener("touchend", handleTouchEnd);
		pressedValuesRef.current = null;
	});
	const focusFrame = useAnimationFrame();
	import_react.useEffect(() => {
		const control = controlRef.current;
		if (!control) return () => stopListening();
		const unsubscribeTouchStart = addEventListener(control, "touchstart", handleTouchStart, { passive: true });
		return () => {
			unsubscribeTouchStart();
			focusFrame.cancel();
			stopListening();
		};
	}, [
		stopListening,
		handleTouchStart,
		controlRef,
		focusFrame
	]);
	import_react.useEffect(() => {
		if (disabled) stopListening();
	}, [disabled, stopListening]);
	return useRenderElement("div", componentProps, {
		state,
		ref: [
			forwardedRef,
			registerFieldControlRef,
			controlRef,
			setStylesRef
		],
		props: [{
			["data-base-ui-slider-control"]: renderBeforeHydration ? "" : void 0,
			onPointerDown(event) {
				const control = controlRef.current;
				const target = getTarget(event.nativeEvent);
				if (!control || disabled || event.defaultPrevented || !isElement(target) || event.button !== 0) return;
				const fingerCoords = getFingerCoords(event, touchIdRef);
				if (fingerCoords != null) {
					startPressing(fingerCoords);
					const finger = getFingerState(fingerCoords);
					if (finger == null) return;
					if (contains(thumbRefs.current[finger.thumbIndex], activeElement(ownerDocument(control)))) event.preventDefault();
					else focusFrame.request(() => {
						focusThumb(finger.thumbIndex);
					});
					setDragging(true);
					if (!(pressedThumbCenterOffsetRef.current != null)) {
						setValue(finger.value, createChangeEventDetails(trackPress, event.nativeEvent, void 0, { activeThumbIndex: finger.thumbIndex }));
						latestValuesRef.current = Array.isArray(finger.value) ? finger.value : [finger.value];
						if (finger.didSwap) focusThumb(finger.thumbIndex);
					}
				}
				if (event.nativeEvent.pointerId) control.setPointerCapture(event.nativeEvent.pointerId);
				moveCountRef.current = 0;
				const doc = ownerDocument(controlRef.current);
				doc.addEventListener("pointermove", handleTouchMove, { passive: true });
				doc.addEventListener("pointerup", handleTouchEnd, { once: true });
			}
		}, elementProps],
		stateAttributesMapping: sliderStateAttributesMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/track/SliderTrack.js
/**
* Contains the slider indicator and represents the entire range of the slider.
* Renders a `<div>` element.
*
* Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
*/
var SliderTrack = /* @__PURE__ */ import_react.forwardRef(function SliderTrack(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { state } = useSliderRootContext();
	return useRenderElement("div", componentProps, {
		state,
		ref: forwardedRef,
		props: [{ style: { position: "relative" } }, elementProps],
		stateAttributesMapping: sliderStateAttributesMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/utils/useIsHydrating.js
function subscribe() {
	return NOOP;
}
function getSnapshot() {
	return false;
}
function getServerSnapshot() {
	return true;
}
/**
* Returns `true` while React is hydrating server-rendered markup and `false`
* for fresh client-only mounts.
*/
function useIsHydrating() {
	return (0, import_shim.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/thumb/SliderThumbDataAttributes.js
var SliderThumbDataAttributes = /* @__PURE__ */ function(SliderThumbDataAttributes) {
	/**
	* Indicates the index of the thumb in range sliders.
	*/
	SliderThumbDataAttributes["index"] = "data-index";
	/**
	* Present while the user is dragging.
	*/
	SliderThumbDataAttributes["dragging"] = "data-dragging";
	/**
	* Indicates the orientation of the slider.
	* @type {'horizontal' | 'vertical'}
	*/
	SliderThumbDataAttributes["orientation"] = "data-orientation";
	/**
	* Present when the slider is disabled.
	*/
	SliderThumbDataAttributes["disabled"] = "data-disabled";
	/**
	* Present when the slider is in a valid state (when wrapped in Field.Root).
	*/
	SliderThumbDataAttributes["valid"] = "data-valid";
	/**
	* Present when the slider is in an invalid state (when wrapped in Field.Root).
	*/
	SliderThumbDataAttributes["invalid"] = "data-invalid";
	/**
	* Present when the slider has been touched (when wrapped in Field.Root).
	*/
	SliderThumbDataAttributes["touched"] = "data-touched";
	/**
	* Present when the slider's value has changed (when wrapped in Field.Root).
	*/
	SliderThumbDataAttributes["dirty"] = "data-dirty";
	/**
	* Present when the slider is focused (when wrapped in Field.Root).
	*/
	SliderThumbDataAttributes["focused"] = "data-focused";
	return SliderThumbDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/thumb/SliderThumb.js
var ALL_KEYS = new Set([
	ARROW_UP,
	ARROW_DOWN,
	ARROW_LEFT,
	ARROW_RIGHT,
	HOME,
	"End",
	PAGE_UP,
	PAGE_DOWN
]);
function getDefaultAriaValueText(values, index, format, locale) {
	if (index < 0) return;
	if (values.length === 2) {
		if (index === 0) return `${formatNumber(values[index], locale, format)} start range`;
		return `${formatNumber(values[index], locale, format)} end range`;
	}
	return format ? formatNumber(values[index], locale, format) : void 0;
}
function getNewValue(thumbValue, increment, direction, min, max) {
	const value = direction === 1 ? thumbValue + increment : thumbValue - increment;
	return clamp(Number(value.toFixed(Math.max(getDecimalPrecision(thumbValue), getDecimalPrecision(increment), getDecimalPrecision(min)))), min, max);
}
/**
* The draggable part of the slider at the tip of the indicator.
* Renders a `<div>` element and a nested `<input type="range">`.
*
* Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
*/
var SliderThumb = /* @__PURE__ */ import_react.forwardRef(function SliderThumb(componentProps, forwardedRef) {
	const { render, children: childrenProp, className, "aria-describedby": ariaDescribedByProp, "aria-label": ariaLabelProp, "aria-labelledby": ariaLabelledByProp, disabled: disabledProp = false, getAriaLabel: getAriaLabelProp, getAriaValueText: getAriaValueTextProp, id: idProp, index: indexProp, inputRef: inputRefProp, onBlur: onBlurProp, onFocus: onFocusProp, onKeyDown: onKeyDownProp, tabIndex: tabIndexProp, style, ...elementProps } = componentProps;
	const { nonce } = useCSPContext();
	const id = useBaseUiId(idProp);
	const { active: activeIndex, lastUsedThumbIndex, controlRef, disabled: contextDisabled, validation, formatOptionsRef, handleInputChange, inset, labelId, largeStep, locale, max, min, minStepsBetweenValues, form, name, orientation, pressedInputRef, pressedThumbCenterOffsetRef, pressedThumbIndexRef, renderBeforeHydration, setActive, setIndicatorPosition, state, step, values: sliderValues } = useSliderRootContext();
	const direction = useDirection();
	const disabled = disabledProp || contextDisabled;
	const range = sliderValues.length > 1;
	const vertical = orientation === "vertical";
	const rtl = direction === "rtl";
	const { setTouched, setFocused, validationMode } = useFieldRootContext();
	const thumbRef = import_react.useRef(null);
	const inputRef = import_react.useRef(null);
	const restoringFocusVisibleRef = import_react.useRef(false);
	const defaultInputId = useBaseUiId();
	const labelableId = useLabelableId();
	const inputId = range ? defaultInputId : labelableId;
	const { ref: listItemRef, index: compositeIndex } = useCompositeListItem({ metadata: import_react.useMemo(() => ({ inputId }), [inputId]) });
	const index = !range ? 0 : indexProp ?? compositeIndex;
	const last = index === sliderValues.length - 1;
	const thumbValue = sliderValues[index];
	const thumbValuePercent = valueToPercent(thumbValue, min, max);
	const [positionPercent, setPositionPercent] = import_react.useState();
	const isHydrating = useIsHydrating();
	const safeLastUsedThumbIndex = lastUsedThumbIndex >= 0 && lastUsedThumbIndex < sliderValues.length ? lastUsedThumbIndex : -1;
	const getInsetPosition = useStableCallback(() => {
		const control = controlRef.current;
		const thumb = thumbRef.current;
		if (!control || !thumb) return;
		const thumbRect = thumb.getBoundingClientRect();
		const controlRect = control.getBoundingClientRect();
		const side = vertical ? "height" : "width";
		const controlSize = controlRect[side] - thumbRect[side];
		const nextPositionPercent = (thumbRect[side] / 2 + controlSize * thumbValuePercent / 100) / controlRect[side] * 100;
		const nextInsetPosition = Number.isFinite(nextPositionPercent) ? nextPositionPercent : void 0;
		setPositionPercent(nextInsetPosition);
		if (index === 0) setIndicatorPosition((prevPosition) => [nextInsetPosition, prevPosition[1]]);
		else if (last) setIndicatorPosition((prevPosition) => [prevPosition[0], nextInsetPosition]);
	});
	useIsoLayoutEffect(() => {
		if (inset) queueMicrotask(getInsetPosition);
	}, [getInsetPosition, inset]);
	useIsoLayoutEffect(() => {
		if (inset) getInsetPosition();
	}, [
		getInsetPosition,
		inset,
		thumbValuePercent
	]);
	useIsoLayoutEffect(() => {
		if (!inset || typeof ResizeObserver !== "function") return;
		const control = controlRef.current;
		const thumb = thumbRef.current;
		if (!control || !thumb) return;
		const resizeObserver = new ResizeObserver(getInsetPosition);
		resizeObserver.observe(control);
		resizeObserver.observe(thumb);
		return () => {
			resizeObserver.disconnect();
		};
	}, [
		controlRef,
		getInsetPosition,
		inset
	]);
	const getThumbStyle = import_react.useCallback(() => {
		const startEdge = vertical ? "bottom" : "insetInlineStart";
		const crossOffsetProperty = vertical ? "left" : "top";
		let zIndex;
		if (range) {
			if (activeIndex === index) zIndex = 2;
			else if (safeLastUsedThumbIndex === index) zIndex = 1;
		} else if (activeIndex === index) zIndex = 1;
		if (!inset) {
			if (!Number.isFinite(thumbValuePercent)) return visuallyHidden;
			return {
				position: "absolute",
				[startEdge]: `${thumbValuePercent}%`,
				[crossOffsetProperty]: "50%",
				translate: `${(vertical || !rtl ? -1 : 1) * 50}% ${(vertical ? 1 : -1) * 50}%`,
				zIndex
			};
		}
		return {
			["--position"]: `${positionPercent ?? 0}%`,
			visibility: renderBeforeHydration && isHydrating || positionPercent === void 0 ? "hidden" : void 0,
			position: "absolute",
			[startEdge]: "var(--position)",
			[crossOffsetProperty]: "50%",
			translate: `${(vertical || !rtl ? -1 : 1) * 50}% ${(vertical ? 1 : -1) * 50}%`,
			zIndex
		};
	}, [
		activeIndex,
		index,
		inset,
		isHydrating,
		positionPercent,
		range,
		renderBeforeHydration,
		rtl,
		safeLastUsedThumbIndex,
		thumbValuePercent,
		vertical
	]);
	let cssWritingMode;
	if (orientation === "vertical") cssWritingMode = rtl ? "vertical-rl" : "vertical-lr";
	const ariaLabel = typeof getAriaLabelProp === "function" ? getAriaLabelProp(index) : ariaLabelProp;
	const inputProps = mergeProps$1({
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledByProp ?? (ariaLabel == null ? labelId : void 0),
		"aria-describedby": ariaDescribedByProp,
		"aria-orientation": orientation,
		"aria-valuenow": thumbValue,
		"aria-valuetext": typeof getAriaValueTextProp === "function" ? getAriaValueTextProp(formatNumber(thumbValue, locale, formatOptionsRef.current ?? void 0), thumbValue, index) : getDefaultAriaValueText(sliderValues, index, formatOptionsRef.current ?? void 0, locale),
		disabled,
		form,
		id: inputId,
		max,
		min,
		name,
		onChange(event) {
			handleInputChange(event.currentTarget.valueAsNumber, index, event);
		},
		onFocus(event) {
			const isRestoringFocusVisible = restoringFocusVisibleRef.current;
			restoringFocusVisibleRef.current = false;
			setActive(index);
			setFocused(true);
			if (isRestoringFocusVisible) event.stopPropagation();
		},
		onBlur(event) {
			if (restoringFocusVisibleRef.current) {
				event.stopPropagation();
				return;
			}
			if (!thumbRef.current) return;
			setActive(-1);
			setTouched(true);
			setFocused(false);
			if (validationMode === "onBlur") validation.commit(getSliderValue(thumbValue, index, min, max, range, sliderValues));
		},
		onKeyDown(event) {
			if (!ALL_KEYS.has(event.key)) return;
			if (COMPOSITE_KEYS.has(event.key)) event.stopPropagation();
			let newValue = null;
			const roundedValue = roundValueToStep(thumbValue, step, min);
			switch (event.key) {
				case ARROW_UP:
					newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, 1, min, max);
					break;
				case ARROW_RIGHT:
					newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, rtl ? -1 : 1, min, max);
					break;
				case ARROW_DOWN:
					newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, -1, min, max);
					break;
				case ARROW_LEFT:
					newValue = getNewValue(roundedValue, event.shiftKey ? largeStep : step, rtl ? 1 : -1, min, max);
					break;
				case PAGE_UP:
					newValue = getNewValue(roundedValue, largeStep, 1, min, max);
					break;
				case PAGE_DOWN:
					newValue = getNewValue(roundedValue, largeStep, -1, min, max);
					break;
				case "End":
					newValue = max;
					if (range) newValue = Number.isFinite(sliderValues[index + 1]) ? sliderValues[index + 1] - step * minStepsBetweenValues : max;
					break;
				case HOME:
					newValue = min;
					if (range) newValue = Number.isFinite(sliderValues[index - 1]) ? sliderValues[index - 1] + step * minStepsBetweenValues : min;
					break;
				default: break;
			}
			if (newValue !== null) {
				const input = event.currentTarget;
				if (!matchesFocusVisible(input)) {
					restoringFocusVisibleRef.current = true;
					input.blur();
					input.focus({
						preventScroll: true,
						focusVisible: true
					});
				}
				handleInputChange(newValue, index, event);
				event.preventDefault();
			}
		},
		step,
		style: {
			...visuallyHidden,
			width: "100%",
			height: "100%",
			writingMode: cssWritingMode
		},
		tabIndex: tabIndexProp ?? void 0,
		type: "range",
		value: thumbValue ?? ""
	}, validation.getInputValidationProps);
	const mergedInputRef = useMergedRefs(inputRef, validation.inputRef, inputRefProp);
	return useRenderElement("div", componentProps, {
		state,
		ref: [
			forwardedRef,
			listItemRef,
			thumbRef
		],
		props: [{
			[SliderThumbDataAttributes.index]: index,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
				childrenProp,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: mergedInputRef,
					...inputProps,
					suppressHydrationWarning: true
				}),
				inset && isHydrating && renderBeforeHydration && last && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
					nonce,
					dangerouslySetInnerHTML: { __html: "!function(){const t=document.currentScript?.parentElement;if(!t)return;const e=t.closest(\"[data-base-ui-slider-control]\");if(!e)return;const r=e.querySelector(\"[data-base-ui-slider-indicator]\"),i=e.getBoundingClientRect(),n=\"vertical\"===e.getAttribute(\"data-orientation\")?\"height\":\"width\",o=e.querySelectorAll('input[type=\"range\"]'),l=o.length>1,s=o.length-1;let a=null,u=null;for(let t=0;t<o.length;t+=1){const e=o[t],y=parseFloat(e.getAttribute(\"value\")??\"\");if(Number.isNaN(y))return;const c=e.parentElement;if(!c)return;const p=parseFloat(e.getAttribute(\"max\")??\"100\"),g=parseFloat(e.getAttribute(\"min\")??\"0\"),b=c?.getBoundingClientRect(),d=i[n]-b[n],m=100*(y-g)/(p-g),v=(b[n]/2+d*m/100)/i[n]*100;c.style.setProperty(\"--position\",`${v}%`),Number.isFinite(v)&&(c.style.removeProperty(\"visibility\"),r&&(0===t?(a=v,r.style.setProperty(\"--start-position\",`${v}%`),l||r.style.removeProperty(\"visibility\")):t===s&&(u=v-(a??0),r.style.setProperty(\"--end-position\",`${v}%`),r.style.setProperty(\"--relative-size\",`${u}%`),r.style.removeProperty(\"visibility\"))))}}();" },
					suppressHydrationWarning: true
				})
			] }),
			id,
			onBlur: onBlurProp,
			onFocus: onFocusProp,
			onPointerDown(event) {
				pressedThumbIndexRef.current = index;
				if (thumbRef.current != null) {
					const axis = orientation === "horizontal" ? "x" : "y";
					const midpoint = getMidpoint(thumbRef.current);
					pressedThumbCenterOffsetRef.current = (orientation === "horizontal" ? event.clientX : event.clientY) - midpoint[axis];
				}
				if (inputRef.current != null && pressedInputRef.current !== inputRef.current) pressedInputRef.current = inputRef.current;
			},
			style: getThumbStyle(),
			suppressHydrationWarning: renderBeforeHydration || void 0
		}, elementProps],
		stateAttributesMapping: sliderStateAttributesMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/slider/indicator/SliderIndicator.js
function getInsetStyles(vertical, range, start, end, renderBeforeHydration, hydrating) {
	const visibility = start === void 0 || range && end === void 0 ? "hidden" : void 0;
	const startEdge = vertical ? "bottom" : "insetInlineStart";
	const mainSide = vertical ? "height" : "width";
	const styles = {
		visibility: renderBeforeHydration && hydrating ? "hidden" : visibility,
		position: vertical ? "absolute" : "relative",
		[vertical ? "width" : "height"]: "inherit"
	};
	styles["--start-position"] = `${start ?? 0}%`;
	if (!range) {
		styles[startEdge] = 0;
		styles[mainSide] = "var(--start-position)";
		return styles;
	}
	styles["--relative-size"] = `${(end ?? 0) - (start ?? 0)}%`;
	styles[startEdge] = "var(--start-position)";
	styles[mainSide] = "var(--relative-size)";
	return styles;
}
function getCenteredStyles(vertical, range, start, end) {
	const startEdge = vertical ? "bottom" : "insetInlineStart";
	const mainSide = vertical ? "height" : "width";
	const styles = {
		position: vertical ? "absolute" : "relative",
		[vertical ? "width" : "height"]: "inherit"
	};
	if (!range) {
		styles[startEdge] = 0;
		styles[mainSide] = `${start}%`;
		return styles;
	}
	const size = end - start;
	styles[startEdge] = `${start}%`;
	styles[mainSide] = `${size}%`;
	return styles;
}
/**
* Visualizes the current value of the slider.
* Renders a `<div>` element.
*
* Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
*/
var SliderIndicator = /* @__PURE__ */ import_react.forwardRef(function SliderIndicator(componentProps, forwardedRef) {
	const { render, className, style: styleProp, ...elementProps } = componentProps;
	const { indicatorPosition, inset, max, min, orientation, renderBeforeHydration, state, values } = useSliderRootContext();
	const isHydrating = useIsHydrating();
	const vertical = orientation === "vertical";
	const range = values.length > 1;
	const style = inset ? getInsetStyles(vertical, range, indicatorPosition[0], indicatorPosition[1], renderBeforeHydration, isHydrating) : getCenteredStyles(vertical, range, valueToPercent(values[0], min, max), valueToPercent(values[values.length - 1], min, max));
	return useRenderElement("div", componentProps, {
		state,
		ref: forwardedRef,
		props: [{
			["data-base-ui-slider-indicator"]: renderBeforeHydration ? "" : void 0,
			style,
			suppressHydrationWarning: renderBeforeHydration || void 0
		}, elementProps],
		stateAttributesMapping: sliderStateAttributesMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/switch/root/SwitchRootContext.js
var SwitchRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useSwitchRootContext() {
	const context = import_react.useContext(SwitchRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(63));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/switch/root/SwitchRootDataAttributes.js
var SwitchRootDataAttributes = /* @__PURE__ */ function(SwitchRootDataAttributes) {
	/**
	* Present when the switch is checked.
	*/
	SwitchRootDataAttributes["checked"] = "data-checked";
	/**
	* Present when the switch is not checked.
	*/
	SwitchRootDataAttributes["unchecked"] = "data-unchecked";
	/**
	* Present when the switch is disabled.
	*/
	SwitchRootDataAttributes["disabled"] = "data-disabled";
	/**
	* Present when the switch is readonly.
	*/
	SwitchRootDataAttributes["readonly"] = "data-readonly";
	/**
	* Present when the switch is required.
	*/
	SwitchRootDataAttributes["required"] = "data-required";
	/**
	* Present when the switch is in a valid state (when wrapped in Field.Root).
	*/
	SwitchRootDataAttributes["valid"] = "data-valid";
	/**
	* Present when the switch is in an invalid state (when wrapped in Field.Root).
	*/
	SwitchRootDataAttributes["invalid"] = "data-invalid";
	/**
	* Present when the switch has been touched (when wrapped in Field.Root).
	*/
	SwitchRootDataAttributes["touched"] = "data-touched";
	/**
	* Present when the switch's value has changed (when wrapped in Field.Root).
	*/
	SwitchRootDataAttributes["dirty"] = "data-dirty";
	/**
	* Present when the switch is active (when wrapped in Field.Root).
	*/
	SwitchRootDataAttributes["filled"] = "data-filled";
	/**
	* Present when the switch is focused (when wrapped in Field.Root).
	*/
	SwitchRootDataAttributes["focused"] = "data-focused";
	return SwitchRootDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/switch/stateAttributesMapping.js
var stateAttributesMapping$2 = {
	...fieldValidityMapping,
	checked(value) {
		if (value) return { [SwitchRootDataAttributes.checked]: "" };
		return { [SwitchRootDataAttributes.unchecked]: "" };
	}
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/switch/root/SwitchRoot.js
/**
* Represents the switch itself.
* Renders a `<span>` element and a hidden `<input>` beside.
*
* Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
*/
var SwitchRoot = /* @__PURE__ */ import_react.forwardRef(function SwitchRoot(componentProps, forwardedRef) {
	const { checked: checkedProp, className, defaultChecked, "aria-labelledby": ariaLabelledByProp, form, id: idProp, inputRef: externalInputRef, name: nameProp, nativeButton = false, onCheckedChange: onCheckedChangeProp, readOnly = false, required = false, disabled: disabledProp = false, render, uncheckedValue, value, style, ...elementProps } = componentProps;
	const { clearErrors } = useFormContext();
	const { state: fieldState, setTouched, setDirty, validityData, setFilled, setFocused, shouldValidateOnChange, validationMode, disabled: fieldDisabled, name: fieldName, validation } = useFieldRootContext();
	const { labelId } = useLabelableContext();
	const disabled = fieldDisabled || disabledProp;
	const name = fieldName ?? nameProp;
	const onCheckedChange = useStableCallback(onCheckedChangeProp);
	const inputRef = import_react.useRef(null);
	const handleInputRef = useMergedRefs(inputRef, externalInputRef, validation.inputRef);
	const switchRef = import_react.useRef(null);
	const id = useBaseUiId();
	const controlId = useLabelableId({
		id: idProp,
		implicit: false,
		controlRef: switchRef
	});
	const hiddenInputId = nativeButton ? void 0 : controlId;
	const [checked, setCheckedState] = useControlled({
		controlled: checkedProp,
		default: Boolean(defaultChecked),
		name: "Switch",
		state: "checked"
	});
	useRegisterFieldControl(switchRef, {
		id,
		value: checked
	});
	useIsoLayoutEffect(() => {
		if (inputRef.current) setFilled(inputRef.current.checked);
	}, [inputRef, setFilled]);
	useValueChanged(checked, () => {
		clearErrors(name);
		setDirty(checked !== validityData.initialValue);
		setFilled(checked);
		if (shouldValidateOnChange()) validation.commit(checked);
		else validation.commit(checked, true);
	});
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId);
	const rootProps = {
		id: nativeButton ? controlId : id,
		role: "switch",
		"aria-checked": checked,
		"aria-readonly": readOnly || void 0,
		"aria-required": required || void 0,
		"aria-labelledby": ariaLabelledBy,
		onFocus() {
			if (!disabled) setFocused(true);
		},
		onBlur() {
			const element = inputRef.current;
			if (!element || disabled) return;
			setTouched(true);
			setFocused(false);
			if (validationMode === "onBlur") validation.commit(element.checked);
		},
		onClick(event) {
			if (readOnly || disabled) return;
			event.preventDefault();
			inputRef.current?.dispatchEvent(new PointerEvent("click", {
				bubbles: true,
				shiftKey: event.shiftKey,
				ctrlKey: event.ctrlKey,
				altKey: event.altKey,
				metaKey: event.metaKey
			}));
		}
	};
	const inputProps = import_react.useMemo(() => mergeProps$1({
		checked,
		disabled,
		form,
		id: hiddenInputId,
		name,
		required,
		style: name ? visuallyHiddenInput : visuallyHidden,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": true,
		ref: handleInputRef,
		onChange(event) {
			if (event.nativeEvent.defaultPrevented) return;
			if (readOnly) {
				event.preventDefault();
				return;
			}
			const nextChecked = event.currentTarget.checked;
			const eventDetails = createChangeEventDetails(none, event.nativeEvent);
			onCheckedChange?.(nextChecked, eventDetails);
			if (eventDetails.isCanceled) return;
			setCheckedState(nextChecked);
		},
		onFocus() {
			switchRef.current?.focus();
		}
	}, validation.getInputValidationProps, value !== void 0 ? { value } : EMPTY_OBJECT), [
		checked,
		disabled,
		form,
		handleInputRef,
		hiddenInputId,
		name,
		onCheckedChange,
		readOnly,
		required,
		setCheckedState,
		validation,
		value
	]);
	const state = import_react.useMemo(() => ({
		...fieldState,
		checked,
		disabled,
		readOnly,
		required
	}), [
		fieldState,
		checked,
		disabled,
		readOnly,
		required
	]);
	const element = useRenderElement("span", componentProps, {
		state,
		ref: [
			forwardedRef,
			switchRef,
			buttonRef
		],
		props: [
			rootProps,
			validation.getValidationProps,
			elementProps,
			getButtonProps
		],
		stateAttributesMapping: stateAttributesMapping$2
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwitchRootContext.Provider, {
		value: state,
		children: [
			element,
			!checked && name && uncheckedValue !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				form,
				name,
				value: uncheckedValue
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				...inputProps,
				suppressHydrationWarning: true
			})
		]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/switch/thumb/SwitchThumb.js
/**
* The movable part of the switch that indicates whether the switch is on or off.
* Renders a `<span>`.
*
* Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
*/
var SwitchThumb = /* @__PURE__ */ import_react.forwardRef(function SwitchThumb(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { state: fieldState } = useFieldRootContext();
	const state = useSwitchRootContext();
	return useRenderElement("span", componentProps, {
		state: {
			...fieldState,
			...state
		},
		ref: forwardedRef,
		stateAttributesMapping: stateAttributesMapping$2,
		props: elementProps
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tabs/root/TabsRootContext.js
/**
* @internal
*/
var TabsRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useTabsRootContext() {
	const context = import_react.useContext(TabsRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(64));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tabs/root/TabsRootDataAttributes.js
var TabsRootDataAttributes = /* @__PURE__ */ function(TabsRootDataAttributes) {
	/**
	* Indicates the direction of the activation (based on the previous active tab).
	* @type {'left' | 'right' | 'up' | 'down' | 'none'}
	*/
	TabsRootDataAttributes["activationDirection"] = "data-activation-direction";
	/**
	* Indicates the orientation of the tabs.
	* @type {'horizontal' | 'vertical'}
	*/
	TabsRootDataAttributes["orientation"] = "data-orientation";
	return TabsRootDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tabs/root/stateAttributesMapping.js
var tabsStateAttributesMapping = { tabActivationDirection: (dir) => ({ [TabsRootDataAttributes.activationDirection]: dir }) };
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tabs/root/TabsRoot.js
/**
* Groups the tabs and the corresponding panels.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
*/
var TabsRoot = /* @__PURE__ */ import_react.forwardRef(function TabsRoot(componentProps, forwardedRef) {
	const { className, defaultValue: defaultValueProp = 0, onValueChange: onValueChangeProp, orientation = "horizontal", render, value: valueProp, style, ...elementProps } = componentProps;
	const hasExplicitDefaultValueProp = Object.hasOwn(componentProps, "defaultValue");
	const tabPanelRefs = import_react.useRef([]);
	const [mountedTabPanels, setMountedTabPanels] = import_react.useState(() => /* @__PURE__ */ new Map());
	const [value, setValue] = useControlled({
		controlled: valueProp,
		default: defaultValueProp,
		name: "Tabs",
		state: "value"
	});
	const isControlled = valueProp !== void 0;
	const [tabMap, setTabMap] = import_react.useState(() => /* @__PURE__ */ new Map());
	const getTabElementBySelectedValue = import_react.useCallback((selectedValue) => {
		if (selectedValue === void 0) return null;
		for (const [tabElement, tabMetadata] of tabMap.entries()) if (tabMetadata != null && selectedValue === (tabMetadata.value ?? tabMetadata.index)) return tabElement;
		return null;
	}, [tabMap]);
	const [activationDirectionState, setActivationDirectionState] = import_react.useState(() => ({
		previousValue: value,
		tabActivationDirection: "none"
	}));
	const { previousValue, tabActivationDirection: committedTabActivationDirection } = activationDirectionState;
	let tabActivationDirection = committedTabActivationDirection;
	let directionComputationIncomplete = false;
	if (previousValue !== value) {
		tabActivationDirection = computeActivationDirection(previousValue, value, orientation, tabMap);
		directionComputationIncomplete = previousValue != null && value != null && getTabElementBySelectedValue(value) == null;
	}
	const nextPreviousValue = directionComputationIncomplete ? previousValue : value;
	const shouldSyncActivationDirectionState = previousValue !== nextPreviousValue || committedTabActivationDirection !== tabActivationDirection;
	useIsoLayoutEffect(() => {
		if (!shouldSyncActivationDirectionState) return;
		setActivationDirectionState({
			previousValue: nextPreviousValue,
			tabActivationDirection
		});
	}, [
		nextPreviousValue,
		shouldSyncActivationDirectionState,
		tabActivationDirection
	]);
	const onValueChange = useStableCallback((newValue, eventDetails) => {
		eventDetails.activationDirection = computeActivationDirection(value, newValue, orientation, tabMap);
		onValueChangeProp?.(newValue, eventDetails);
		if (eventDetails.isCanceled) return;
		setValue(newValue);
	});
	const registerMountedTabPanel = useStableCallback((panelValue, panelId) => {
		setMountedTabPanels((prev) => {
			if (prev.get(panelValue) === panelId) return prev;
			const next = new Map(prev);
			next.set(panelValue, panelId);
			return next;
		});
	});
	const unregisterMountedTabPanel = useStableCallback((panelValue, panelId) => {
		setMountedTabPanels((prev) => {
			if (!prev.has(panelValue) || prev.get(panelValue) !== panelId) return prev;
			const next = new Map(prev);
			next.delete(panelValue);
			return next;
		});
	});
	const getTabPanelIdByValue = import_react.useCallback((tabValue) => {
		return mountedTabPanels.get(tabValue);
	}, [mountedTabPanels]);
	const getTabIdByPanelValue = import_react.useCallback((tabPanelValue) => {
		for (const tabMetadata of tabMap.values()) if (tabPanelValue === tabMetadata?.value) return tabMetadata?.id;
	}, [tabMap]);
	const tabsContextValue = import_react.useMemo(() => ({
		getTabElementBySelectedValue,
		getTabIdByPanelValue,
		getTabPanelIdByValue,
		onValueChange,
		orientation,
		registerMountedTabPanel,
		setTabMap,
		unregisterMountedTabPanel,
		tabActivationDirection,
		value
	}), [
		getTabElementBySelectedValue,
		getTabIdByPanelValue,
		getTabPanelIdByValue,
		onValueChange,
		orientation,
		registerMountedTabPanel,
		setTabMap,
		unregisterMountedTabPanel,
		tabActivationDirection,
		value
	]);
	const selectedTabMetadata = import_react.useMemo(() => {
		for (const tabMetadata of tabMap.values()) if (tabMetadata != null && tabMetadata.value === value) return tabMetadata;
	}, [tabMap, value]);
	const firstEnabledTabValue = import_react.useMemo(() => {
		for (const tabMetadata of tabMap.values()) if (tabMetadata != null && !tabMetadata.disabled) return tabMetadata.value;
	}, [tabMap]);
	useIsoLayoutEffect(() => {
		if (isControlled || tabMap.size === 0) return;
		const selectionIsDisabled = selectedTabMetadata?.disabled;
		const selectionIsMissing = selectedTabMetadata == null && value !== null;
		if (hasExplicitDefaultValueProp && selectionIsDisabled && value === defaultValueProp) return;
		if (!selectionIsDisabled && !selectionIsMissing) return;
		const fallbackValue = firstEnabledTabValue ?? null;
		if (value === fallbackValue) return;
		setValue(fallbackValue);
		setActivationDirectionState((prev) => {
			if (prev.tabActivationDirection === "none") return prev;
			return {
				...prev,
				tabActivationDirection: "none"
			};
		});
	}, [
		defaultValueProp,
		firstEnabledTabValue,
		hasExplicitDefaultValueProp,
		isControlled,
		selectedTabMetadata,
		setValue,
		tabMap,
		value
	]);
	const element = useRenderElement("div", componentProps, {
		state: {
			orientation,
			tabActivationDirection
		},
		ref: forwardedRef,
		props: elementProps,
		stateAttributesMapping: tabsStateAttributesMapping
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsRootContext.Provider, {
		value: tabsContextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeList, {
			elementsRef: tabPanelRefs,
			children: element
		})
	});
});
function computeActivationDirection(oldValue, newValue, orientation, tabMap) {
	if (oldValue == null || newValue == null) return "none";
	let oldTab = null;
	let newTab = null;
	for (const [tabElement, tabMetadata] of tabMap.entries()) {
		if (tabMetadata == null) continue;
		const tabValue = tabMetadata.value ?? tabMetadata.index;
		if (oldValue === tabValue) oldTab = tabElement;
		if (newValue === tabValue) newTab = tabElement;
		if (oldTab != null && newTab != null) break;
	}
	if (oldTab == null || newTab == null) {
		if (oldTab !== newTab && (typeof oldValue === "number" || typeof oldValue === "string") && typeof oldValue === typeof newValue) {
			if (orientation === "horizontal") return newValue > oldValue ? "right" : "left";
			return newValue > oldValue ? "down" : "up";
		}
		return "none";
	}
	const oldRect = oldTab.getBoundingClientRect();
	const newRect = newTab.getBoundingClientRect();
	if (orientation === "horizontal") {
		if (newRect.left < oldRect.left) return "left";
		if (newRect.left > oldRect.left) return "right";
	} else {
		if (newRect.top < oldRect.top) return "up";
		if (newRect.top > oldRect.top) return "down";
	}
	return "none";
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tabs/list/TabsListContext.js
var TabsListContext = /* @__PURE__ */ import_react.createContext(void 0);
function useTabsListContext() {
	const context = import_react.useContext(TabsListContext);
	if (context === void 0) throw new Error(formatErrorMessage(65));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tabs/tab/TabsTab.js
/**
* An individual interactive tab button that toggles the corresponding panel.
* Renders a `<button>` element.
*
* Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
*/
var TabsTab = /* @__PURE__ */ import_react.forwardRef(function TabsTab(componentProps, forwardedRef) {
	const { className, disabled = false, render, value, id: idProp, nativeButton = true, style, ...elementProps } = componentProps;
	const { value: activeTabValue, getTabPanelIdByValue, orientation } = useTabsRootContext();
	const { activateOnFocus, highlightedTabIndex, onTabActivation, registerTabResizeObserverElement, setHighlightedTabIndex, tabsListElement } = useTabsListContext();
	const id = useBaseUiId(idProp);
	const { compositeProps, compositeRef, index } = useCompositeItem({ metadata: import_react.useMemo(() => ({
		disabled,
		id,
		value
	}), [
		disabled,
		id,
		value
	]) });
	const active = value === activeTabValue;
	const isNavigatingRef = import_react.useRef(false);
	const tabElementRef = import_react.useRef(null);
	import_react.useEffect(() => {
		const tabElement = tabElementRef.current;
		if (!tabElement) return;
		return registerTabResizeObserverElement(tabElement);
	}, [registerTabResizeObserverElement]);
	useIsoLayoutEffect(() => {
		if (isNavigatingRef.current) {
			isNavigatingRef.current = false;
			return;
		}
		if (!(active && index > -1 && highlightedTabIndex !== index)) return;
		const listElement = tabsListElement;
		if (listElement != null) {
			const activeEl = activeElement(ownerDocument(listElement));
			if (activeEl && contains(listElement, activeEl)) return;
		}
		if (!disabled) setHighlightedTabIndex(index);
	}, [
		active,
		index,
		highlightedTabIndex,
		setHighlightedTabIndex,
		disabled,
		tabsListElement
	]);
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton,
		focusableWhenDisabled: true
	});
	const tabPanelId = getTabPanelIdByValue(value);
	const isPressingRef = import_react.useRef(false);
	const isMainButtonRef = import_react.useRef(false);
	function onClick(event) {
		if (active || disabled) return;
		onTabActivation(value, createChangeEventDetails(none, event.nativeEvent, void 0, { activationDirection: "none" }));
	}
	function onFocus(event) {
		if (active) return;
		if (index > -1 && !disabled) setHighlightedTabIndex(index);
		if (disabled) return;
		if (activateOnFocus && (!isPressingRef.current || isPressingRef.current && isMainButtonRef.current)) onTabActivation(value, createChangeEventDetails(none, event.nativeEvent, void 0, { activationDirection: "none" }));
	}
	function onPointerDown(event) {
		if (active || disabled) return;
		isPressingRef.current = true;
		function handlePointerUp() {
			isPressingRef.current = false;
			isMainButtonRef.current = false;
		}
		if (!event.button || event.button === 0) {
			isMainButtonRef.current = true;
			ownerDocument(event.currentTarget).addEventListener("pointerup", handlePointerUp, { once: true });
		}
	}
	return useRenderElement("button", componentProps, {
		state: {
			disabled,
			active,
			orientation
		},
		ref: [
			forwardedRef,
			buttonRef,
			compositeRef,
			tabElementRef
		],
		props: [
			compositeProps,
			{
				role: "tab",
				"aria-controls": tabPanelId,
				"aria-selected": active,
				id,
				onClick,
				onFocus,
				onPointerDown,
				[ACTIVE_COMPOSITE_ITEM]: active ? "" : void 0,
				onKeyDownCapture() {
					isNavigatingRef.current = true;
				}
			},
			elementProps,
			getButtonProps
		]
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tabs/panel/TabsPanelDataAttributes.js
var TabsPanelDataAttributes = function(TabsPanelDataAttributes) {
	/**
	* Indicates the index of the tab panel.
	*/
	TabsPanelDataAttributes["index"] = "data-index";
	/**
	* Indicates the direction of the activation (based on the previous active tab).
	* @type {'left' | 'right' | 'up' | 'down' | 'none'}
	*/
	TabsPanelDataAttributes["activationDirection"] = "data-activation-direction";
	/**
	* Indicates the orientation of the tabs.
	* @type {'horizontal' | 'vertical'}
	*/
	TabsPanelDataAttributes["orientation"] = "data-orientation";
	/**
	* Present when the panel is hidden.
	*/
	TabsPanelDataAttributes["hidden"] = "data-hidden";
	/**
	* Present when the panel is animating in.
	*/
	TabsPanelDataAttributes[TabsPanelDataAttributes["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
	/**
	* Present when the panel is animating out.
	*/
	TabsPanelDataAttributes[TabsPanelDataAttributes["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
	return TabsPanelDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tabs/panel/TabsPanel.js
var stateAttributesMapping$1 = {
	...tabsStateAttributesMapping,
	...transitionStatusMapping
};
/**
* A panel displayed when the corresponding tab is active.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
*/
var TabsPanel = /* @__PURE__ */ import_react.forwardRef(function TabPanel(componentProps, forwardedRef) {
	const { className, value, render, keepMounted = false, style, ...elementProps } = componentProps;
	const { value: selectedValue, getTabIdByPanelValue, orientation, tabActivationDirection, registerMountedTabPanel, unregisterMountedTabPanel } = useTabsRootContext();
	const id = useBaseUiId();
	const { ref: listItemRef, index } = useCompositeListItem({ metadata: import_react.useMemo(() => ({
		id,
		value
	}), [id, value]) });
	const open = value === selectedValue;
	const { mounted, transitionStatus, setMounted } = useTransitionStatus(open);
	const hidden = !mounted;
	const correspondingTabId = getTabIdByPanelValue(value);
	const state = {
		hidden,
		orientation,
		tabActivationDirection,
		transitionStatus
	};
	const panelRef = import_react.useRef(null);
	const element = useRenderElement("div", componentProps, {
		state,
		ref: [
			forwardedRef,
			listItemRef,
			panelRef
		],
		props: [{
			"aria-labelledby": correspondingTabId,
			hidden,
			id,
			role: "tabpanel",
			tabIndex: open ? 0 : -1,
			inert: inertValue(!open),
			[TabsPanelDataAttributes.index]: index
		}, elementProps],
		stateAttributesMapping: stateAttributesMapping$1
	});
	useOpenChangeComplete({
		open,
		ref: panelRef,
		onComplete() {
			if (!open) setMounted(false);
		}
	});
	useIsoLayoutEffect(() => {
		if (hidden && !keepMounted) return;
		if (id == null) return;
		registerMountedTabPanel(value, id);
		return () => {
			unregisterMountedTabPanel(value, id);
		};
	}, [
		hidden,
		keepMounted,
		value,
		id,
		registerMountedTabPanel,
		unregisterMountedTabPanel
	]);
	if (!(keepMounted || mounted)) return null;
	return element;
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tabs/list/TabsList.js
/**
* Groups the individual tab buttons.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
*/
var TabsList = /* @__PURE__ */ import_react.forwardRef(function TabsList(componentProps, forwardedRef) {
	const { activateOnFocus = false, className, loopFocus = true, render, style, ...elementProps } = componentProps;
	const { onValueChange, orientation, value, setTabMap, tabActivationDirection } = useTabsRootContext();
	const [highlightedTabIndex, setHighlightedTabIndex] = import_react.useState(0);
	const [tabsListElement, setTabsListElement] = import_react.useState(null);
	const indicatorUpdateListenersRef = import_react.useRef(/* @__PURE__ */ new Set());
	const tabResizeObserverElementsRef = import_react.useRef(/* @__PURE__ */ new Set());
	const resizeObserverRef = import_react.useRef(null);
	const notifyIndicatorUpdateListeners = useStableCallback(() => {
		indicatorUpdateListenersRef.current.forEach((listener) => {
			listener();
		});
	});
	import_react.useEffect(() => {
		if (typeof ResizeObserver === "undefined") return;
		const resizeObserver = new ResizeObserver(() => {
			if (!indicatorUpdateListenersRef.current.size) return;
			notifyIndicatorUpdateListeners();
		});
		resizeObserverRef.current = resizeObserver;
		if (tabsListElement) resizeObserver.observe(tabsListElement);
		tabResizeObserverElementsRef.current.forEach((element) => {
			resizeObserver.observe(element);
		});
		return () => {
			resizeObserver.disconnect();
			resizeObserverRef.current = null;
		};
	}, [tabsListElement, notifyIndicatorUpdateListeners]);
	const registerIndicatorUpdateListener = useStableCallback((listener) => {
		indicatorUpdateListenersRef.current.add(listener);
		return () => {
			indicatorUpdateListenersRef.current.delete(listener);
		};
	});
	const registerTabResizeObserverElement = useStableCallback((element) => {
		tabResizeObserverElementsRef.current.add(element);
		resizeObserverRef.current?.observe(element);
		return () => {
			tabResizeObserverElementsRef.current.delete(element);
			resizeObserverRef.current?.unobserve(element);
		};
	});
	const onTabActivation = useStableCallback((newValue, eventDetails) => {
		if (newValue !== value) onValueChange(newValue, eventDetails);
	});
	const state = {
		orientation,
		tabActivationDirection
	};
	const defaultProps = {
		"aria-orientation": orientation === "vertical" ? "vertical" : void 0,
		role: "tablist"
	};
	const tabsListContextValue = import_react.useMemo(() => ({
		activateOnFocus,
		highlightedTabIndex,
		registerIndicatorUpdateListener,
		registerTabResizeObserverElement,
		onTabActivation,
		setHighlightedTabIndex,
		tabsListElement
	}), [
		activateOnFocus,
		highlightedTabIndex,
		registerIndicatorUpdateListener,
		registerTabResizeObserverElement,
		onTabActivation,
		setHighlightedTabIndex,
		tabsListElement
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsListContext.Provider, {
		value: tabsListContextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeRoot, {
			render,
			className,
			style,
			state,
			refs: [forwardedRef, setTabsListElement],
			props: [defaultProps, elementProps],
			stateAttributesMapping: tabsStateAttributesMapping,
			highlightedIndex: highlightedTabIndex,
			enableHomeAndEndKeys: true,
			loopFocus,
			orientation,
			onHighlightedIndexChange: setHighlightedTabIndex,
			onMapChange: setTabMap,
			disabledIndices: EMPTY_ARRAY$1
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/toggle-group/ToggleGroupContext.js
var ToggleGroupContext = /* @__PURE__ */ import_react.createContext(void 0);
function useToggleGroupContext(optional = true) {
	const context = import_react.useContext(ToggleGroupContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(7));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/toggle/Toggle.js
/**
* A two-state button that can be on or off.
* Renders a `<button>` element.
*
* Documentation: [Base UI Toggle](https://base-ui.com/react/components/toggle)
*/
var Toggle = /* @__PURE__ */ import_react.forwardRef(function Toggle(componentProps, forwardedRef) {
	const { className, defaultPressed: defaultPressedProp = false, disabled: disabledProp = false, form, onPressedChange: onPressedChangeProp, pressed: pressedProp, render, type, value: valueProp, nativeButton = true, style, ...elementProps } = componentProps;
	const value = useBaseUiId(valueProp || void 0);
	const groupContext = useToggleGroupContext();
	const groupValue = groupContext?.value ?? [];
	const defaultPressed = groupContext ? void 0 : defaultPressedProp;
	const disabled = (disabledProp || groupContext?.disabled) ?? false;
	const [pressed, setPressedState] = useControlled({
		controlled: groupContext ? value !== void 0 && groupValue.indexOf(value) > -1 : pressedProp,
		default: defaultPressed,
		name: "Toggle",
		state: "pressed"
	});
	const onPressedChange = useStableCallback((nextPressed, eventDetails) => {
		if (value) groupContext?.setGroupValue?.(value, nextPressed, eventDetails);
		onPressedChangeProp?.(nextPressed, eventDetails);
	});
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const state = {
		disabled,
		pressed
	};
	const refs = [buttonRef, forwardedRef];
	const props = [
		{
			"aria-pressed": pressed,
			onClick(event) {
				const nextPressed = !pressed;
				const details = createChangeEventDetails(none, event.nativeEvent);
				onPressedChange(nextPressed, details);
				if (details.isCanceled) return;
				setPressedState(nextPressed);
			}
		},
		elementProps,
		getButtonProps
	];
	const element = useRenderElement("button", componentProps, {
		enabled: !groupContext,
		state,
		ref: refs,
		props
	});
	if (groupContext) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompositeItem, {
		tag: "button",
		render,
		className,
		style,
		state,
		refs,
		props
	});
	return element;
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/root/TooltipRootContext.js
var TooltipRootContext = /* @__PURE__ */ import_react.createContext(void 0);
function useTooltipRootContext(optional) {
	const context = import_react.useContext(TooltipRootContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(72));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/store/TooltipStore.js
var selectors = {
	...popupStoreSelectors,
	disabled: createSelector((state) => state.disabled),
	instantType: createSelector((state) => state.instantType),
	isInstantPhase: createSelector((state) => state.isInstantPhase),
	trackCursorAxis: createSelector((state) => state.trackCursorAxis),
	disableHoverablePopup: createSelector((state) => state.disableHoverablePopup),
	lastOpenChangeReason: createSelector((state) => state.openChangeReason),
	closeOnClick: createSelector((state) => state.closeOnClick),
	closeDelay: createSelector((state) => state.closeDelay),
	hasViewport: createSelector((state) => state.hasViewport)
};
var TooltipStore = class TooltipStore extends ReactStore {
	constructor(initialState) {
		super({
			...createInitialState(),
			...initialState
		}, {
			popupRef: /* @__PURE__ */ import_react.createRef(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0,
			triggerElements: new PopupTriggerMap()
		}, selectors);
	}
	setOpen = (nextOpen, eventDetails) => {
		const reason = eventDetails.reason;
		const isHover = reason === triggerHover;
		const isFocusOpen = nextOpen && reason === "trigger-focus";
		const isDismissClose = !nextOpen && (reason === "trigger-press" || reason === "escape-key");
		eventDetails.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", true);
		};
		this.context.onOpenChange?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
		const changeState = () => {
			const updatedState = {
				open: nextOpen,
				openChangeReason: reason
			};
			if (isFocusOpen) updatedState.instantType = "focus";
			else if (isDismissClose) updatedState.instantType = "dismiss";
			else if (reason === "trigger-hover") updatedState.instantType = void 0;
			const newTriggerId = eventDetails.trigger?.id ?? null;
			if (newTriggerId || nextOpen) {
				updatedState.activeTriggerId = newTriggerId;
				updatedState.activeTriggerElement = eventDetails.trigger ?? null;
			}
			this.update(updatedState);
		};
		if (isHover) import_react_dom.flushSync(changeState);
		else changeState();
	};
	static useStore(externalStore, initialState) {
		const internalStore = useRefWithInit(() => {
			return new TooltipStore(initialState);
		}).current;
		const store = externalStore ?? internalStore;
		const floatingRootContext = useSyncedFloatingRootContext({
			popupStore: store,
			onOpenChange: store.setOpen
		});
		store.state.floatingRootContext = floatingRootContext;
		return store;
	}
};
function createInitialState() {
	return {
		...createInitialPopupStoreState(),
		disabled: false,
		instantType: void 0,
		isInstantPhase: false,
		trackCursorAxis: "none",
		disableHoverablePopup: false,
		openChangeReason: null,
		closeOnClick: true,
		closeDelay: 0,
		hasViewport: false
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/root/TooltipRoot.js
/**
* Groups all parts of the tooltip.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipRoot = fastComponent(function TooltipRoot(props) {
	const { disabled: disabled$1 = false, defaultOpen = false, open: openProp, disableHoverablePopup = false, trackCursorAxis = "none", actionsRef, onOpenChange, onOpenChangeComplete, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null, children } = props;
	const store = TooltipStore.useStore(handle?.store, {
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp
	});
	useOnFirstRender(() => {
		if (openProp === void 0 && store.state.open === false && defaultOpen === true) store.update({
			open: true,
			activeTriggerId: defaultTriggerIdProp
		});
	});
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const openState = store.useState("open");
	const open = !disabled$1 && openState;
	const activeTriggerId = store.useState("activeTriggerId");
	const payload = store.useState("payload");
	store.useSyncedValues({
		trackCursorAxis,
		disableHoverablePopup
	});
	useIsoLayoutEffect(() => {
		if (openState && disabled$1) store.setOpen(false, createChangeEventDetails(disabled));
	}, [
		openState,
		disabled$1,
		store
	]);
	store.useSyncedValue("disabled", disabled$1);
	useImplicitActiveTrigger(store);
	const { forceUnmount, transitionStatus } = useOpenStateTransitions(open, store);
	const floatingRootContext = store.select("floatingRootContext");
	const isInstantPhase = store.useState("isInstantPhase");
	const instantType = store.useState("instantType");
	const lastOpenChangeReason = store.useState("lastOpenChangeReason");
	const previousInstantTypeRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (transitionStatus === "ending" && lastOpenChangeReason === "none" || transitionStatus !== "ending" && isInstantPhase) {
			if (instantType !== "delay") previousInstantTypeRef.current = instantType;
			store.set("instantType", "delay");
		} else if (previousInstantTypeRef.current !== null) {
			store.set("instantType", previousInstantTypeRef.current);
			previousInstantTypeRef.current = null;
		}
	}, [
		transitionStatus,
		isInstantPhase,
		lastOpenChangeReason,
		instantType,
		store
	]);
	useIsoLayoutEffect(() => {
		if (open) {
			if (activeTriggerId == null) store.set("payload", void 0);
		}
	}, [
		store,
		activeTriggerId,
		open
	]);
	const handleImperativeClose = import_react.useCallback(() => {
		store.setOpen(false, createChangeEventDetails(imperativeAction));
	}, [store]);
	import_react.useImperativeHandle(actionsRef, () => ({
		unmount: forceUnmount,
		close: handleImperativeClose
	}), [forceUnmount, handleImperativeClose]);
	const { getReferenceProps, getFloatingProps, getTriggerProps } = useInteractions([useDismiss(floatingRootContext, {
		enabled: !disabled$1,
		referencePress: () => store.select("closeOnClick")
	}), useClientPoint(floatingRootContext, {
		enabled: !disabled$1 && trackCursorAxis !== "none",
		axis: trackCursorAxis === "none" ? void 0 : trackCursorAxis
	})]);
	const activeTriggerProps = import_react.useMemo(() => getReferenceProps(), [getReferenceProps]);
	const inactiveTriggerProps = import_react.useMemo(() => getTriggerProps(), [getTriggerProps]);
	const popupProps = import_react.useMemo(() => getFloatingProps(), [getFloatingProps]);
	store.useSyncedValues({
		activeTriggerProps,
		inactiveTriggerProps,
		popupProps
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipRootContext.Provider, {
		value: store,
		children: typeof children === "function" ? children({ payload }) : children
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/provider/TooltipProviderContext.js
var TooltipProviderContext = /* @__PURE__ */ import_react.createContext(void 0);
function useTooltipProviderContext() {
	return import_react.useContext(TooltipProviderContext);
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/trigger/TooltipTriggerDataAttributes.js
var TooltipTriggerDataAttributes = function(TooltipTriggerDataAttributes) {
	/**
	* Present when the corresponding tooltip is open.
	*/
	TooltipTriggerDataAttributes[TooltipTriggerDataAttributes["popupOpen"] = CommonTriggerDataAttributes.popupOpen] = "popupOpen";
	/**
	* Present when the trigger is disabled, either by the `disabled` prop or by a parent `<Tooltip.Root>` component.
	*/
	TooltipTriggerDataAttributes["triggerDisabled"] = "data-trigger-disabled";
	return TooltipTriggerDataAttributes;
}({});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/trigger/TooltipTrigger.js
/**
* An element to attach the tooltip to.
* Renders a `<button>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipTrigger = fastComponentRef(function TooltipTrigger(componentProps, forwardedRef) {
	const { className, render, handle, payload, disabled: disabledProp, delay, closeOnClick = true, closeDelay, id: idProp, style, ...elementProps } = componentProps;
	const rootContext = useTooltipRootContext(true);
	const store = handle?.store ?? rootContext;
	if (!store) throw new Error(formatErrorMessage(82));
	const thisTriggerId = useBaseUiId(idProp);
	const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const floatingRootContext = store.useState("floatingRootContext");
	const triggerElementRef = import_react.useRef(null);
	const delayWithDefault = delay ?? 600;
	const closeDelayWithDefault = closeDelay ?? 0;
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
		payload,
		closeOnClick,
		closeDelay: closeDelayWithDefault
	});
	const providerContext = useTooltipProviderContext();
	const { delayRef, isInstantPhase, hasProvider } = useDelayGroup(floatingRootContext, { open: isOpenedByThisTrigger });
	store.useSyncedValue("isInstantPhase", isInstantPhase);
	const rootDisabled = store.useState("disabled");
	const disabled = disabledProp ?? rootDisabled;
	const trackCursorAxis = store.useState("trackCursorAxis");
	const disableHoverablePopup = store.useState("disableHoverablePopup");
	const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
		enabled: !disabled,
		mouseOnly: true,
		move: false,
		handleClose: !disableHoverablePopup && trackCursorAxis !== "both" ? safePolygon() : null,
		restMs() {
			const providerDelay = providerContext?.delay;
			const groupOpenValue = typeof delayRef.current === "object" ? delayRef.current.open : void 0;
			let computedRestMs = delayWithDefault;
			if (hasProvider) if (groupOpenValue !== 0) computedRestMs = delay ?? providerDelay ?? delayWithDefault;
			else computedRestMs = 0;
			return computedRestMs;
		},
		delay() {
			const closeValue = typeof delayRef.current === "object" ? delayRef.current.close : void 0;
			let computedCloseDelay = closeDelayWithDefault;
			if (closeDelay == null && hasProvider) computedCloseDelay = closeValue;
			return { close: computedCloseDelay };
		},
		triggerElementRef,
		isActiveTrigger: isTriggerActive,
		isClosing: () => store.select("transitionStatus") === "ending"
	});
	const focusProps = useFocus(floatingRootContext, { enabled: !disabled }).reference;
	const state = { open: isOpenedByThisTrigger };
	const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
	return useRenderElement("button", componentProps, {
		state,
		ref: [
			forwardedRef,
			registerTrigger,
			triggerElementRef
		],
		props: [
			hoverProps,
			focusProps,
			rootTriggerProps,
			{
				onPointerDown() {
					store.set("closeOnClick", closeOnClick);
				},
				id: thisTriggerId,
				[TooltipTriggerDataAttributes.triggerDisabled]: disabled ? "" : void 0
			},
			elementProps
		],
		stateAttributesMapping: triggerOpenStateMapping$1
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/portal/TooltipPortalContext.js
var TooltipPortalContext = /* @__PURE__ */ import_react.createContext(void 0);
function useTooltipPortalContext() {
	const value = import_react.useContext(TooltipPortalContext);
	if (value === void 0) throw new Error(formatErrorMessage(70));
	return value;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/portal/TooltipPortal.js
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipPortal = /* @__PURE__ */ import_react.forwardRef(function TooltipPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	if (!(useTooltipRootContext().useState("mounted") || keepMounted)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPortalContext.Provider, {
		value: keepMounted,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPortalLite, {
			ref: forwardedRef,
			...portalProps
		})
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/positioner/TooltipPositionerContext.js
var TooltipPositionerContext = /* @__PURE__ */ import_react.createContext(void 0);
function useTooltipPositionerContext() {
	const context = import_react.useContext(TooltipPositionerContext);
	if (context === void 0) throw new Error(formatErrorMessage(71));
	return context;
}
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/positioner/TooltipPositioner.js
/**
* Positions the tooltip against the trigger.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipPositioner = /* @__PURE__ */ import_react.forwardRef(function TooltipPositioner(componentProps, forwardedRef) {
	const { render, className, anchor, positionMethod = "absolute", side = "top", align = "center", sideOffset = 0, alignOffset = 0, collisionBoundary = "clipping-ancestors", collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance = POPUP_COLLISION_AVOIDANCE, style, ...elementProps } = componentProps;
	const store = useTooltipRootContext();
	const keepMounted = useTooltipPortalContext();
	const open = store.useState("open");
	const mounted = store.useState("mounted");
	const trackCursorAxis = store.useState("trackCursorAxis");
	const disableHoverablePopup = store.useState("disableHoverablePopup");
	const floatingRootContext = store.useState("floatingRootContext");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const positioning = useAnchorPositioning({
		anchor,
		positionMethod,
		floatingRootContext,
		mounted,
		side,
		sideOffset,
		align,
		alignOffset,
		collisionBoundary,
		collisionPadding,
		sticky,
		arrowPadding,
		disableAnchorTracking,
		keepMounted,
		collisionAvoidance,
		adaptiveOrigin: store.useState("hasViewport") ? adaptiveOrigin : void 0
	});
	const element = usePositioner(componentProps, import_react.useMemo(() => ({
		open,
		side: positioning.side,
		align: positioning.align,
		anchorHidden: positioning.anchorHidden,
		instant: trackCursorAxis !== "none" ? "tracking-cursor" : instantType
	}), [
		open,
		positioning.side,
		positioning.align,
		positioning.anchorHidden,
		trackCursorAxis,
		instantType
	]), {
		styles: positioning.positionerStyles,
		transitionStatus,
		props: elementProps,
		refs: [forwardedRef, store.useStateSetter("positionerElement")],
		hidden: !mounted,
		inert: !open || trackCursorAxis === "both" || disableHoverablePopup
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPositionerContext.Provider, {
		value: positioning,
		children: element
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/popup/TooltipPopup.js
var stateAttributesMapping = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* A container for the tooltip contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipPopup = /* @__PURE__ */ import_react.forwardRef(function TooltipPopup(componentProps, forwardedRef) {
	const { className, render, style, ...elementProps } = componentProps;
	const store = useTooltipRootContext();
	const { side, align } = useTooltipPositionerContext();
	const open = store.useState("open");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const popupProps = store.useState("popupProps");
	const floatingContext = store.useState("floatingRootContext");
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	const disabled = store.useState("disabled");
	const closeDelay = store.useState("closeDelay");
	useHoverFloatingInteraction(floatingContext, {
		enabled: !disabled,
		closeDelay
	});
	return useRenderElement("div", componentProps, {
		state: {
			open,
			side,
			align,
			instant: instantType,
			transitionStatus
		},
		ref: [
			forwardedRef,
			store.context.popupRef,
			store.useStateSetter("popupElement")
		],
		props: [
			popupProps,
			getDisabledMountTransitionStyles(transitionStatus),
			elementProps
		],
		stateAttributesMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/arrow/TooltipArrow.js
/**
* Displays an element positioned against the tooltip anchor.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipArrow = /* @__PURE__ */ import_react.forwardRef(function TooltipArrow(componentProps, forwardedRef) {
	const { className, render, style, ...elementProps } = componentProps;
	const store = useTooltipRootContext();
	const open = store.useState("open");
	const instantType = store.useState("instantType");
	const { arrowRef, side, align, arrowUncentered, arrowStyles } = useTooltipPositionerContext();
	return useRenderElement("div", componentProps, {
		state: {
			open,
			side,
			align,
			uncentered: arrowUncentered,
			instant: instantType
		},
		ref: [forwardedRef, arrowRef],
		props: [{
			style: arrowStyles,
			"aria-hidden": true
		}, elementProps],
		stateAttributesMapping: popupStateMapping
	});
});
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/tooltip/provider/TooltipProvider.js
/**
* Provides a shared delay for multiple tooltips. The grouping logic ensures that
* once a tooltip becomes visible, the adjacent tooltips will be shown instantly.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
var TooltipProvider = function TooltipProvider(props) {
	const { delay, closeDelay, timeout = 400 } = props;
	const contextValue = import_react.useMemo(() => ({
		delay,
		closeDelay
	}), [delay, closeDelay]);
	const delayValue = import_react.useMemo(() => ({
		open: delay,
		close: closeDelay
	}), [delay, closeDelay]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProviderContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingDelayGroup, {
			delay: delayValue,
			timeoutMs: timeout,
			children: props.children
		})
	});
};
//#endregion
//#region ../../node_modules/.pnpm/@base-ui+react@1.4.1_@types_dff1996fbecd64292a44e64d749925ff/node_modules/@base-ui/react/esm/use-render/useRender.js
/**
* Renders a Base UI element.
*
* @public
*/
function useRender(params) {
	return useRenderElement(params.defaultTagName ?? "div", params, params);
}
//#endregion
export { MenuCheckboxItem as $, PreviewCardRoot as A, DialogClose as At, DirectionProvider as B, ScrollAreaScrollbar as C, Input as Ct, PreviewCardPositioner as D, DialogPortal as Dt, PreviewCardPopup as E, DialogRoot as Et, PopoverTrigger as F, require_with_selector as Ft, MenuRadioItem as G, MenuSubmenuRoot as H, PopoverRoot as I, require_shim as It, MenuPortal as J, MenuRadioGroup as K, ContextMenuTrigger as L, require_jsx_runtime as Lt, PopoverPopup as M, Button as Mt, PopoverPositioner as N, mergeProps$1 as Nt, PreviewCardTrigger as O, DialogPopup as Ot, PopoverPortal as P, require_react_dom as Pt, MenuCheckboxItemIndicator as Q, ContextMenuRoot as R, ScrollAreaThumb as S, AccordionRoot as St, ScrollAreaRoot as T, DialogTitle as Tt, MenuRoot as U, MenuTrigger as V, MenuRadioItemIndicator as W, MenuItem as X, MenuPopup as Y, MenuGroup as Z, SliderThumb as _, AlertDialogRoot as _t, TooltipPositioner as a, AvatarRoot as at, SliderRoot as b, AccordionHeader as bt, TooltipRoot as c, ComboboxItem as ct, TabsPanel as d, ComboboxPortal as dt, ComboboxItemIndicator as et, TabsTab as f, ComboboxList as ft, SliderIndicator as g, useComboboxFilter as gt, SwitchRoot as h, ComboboxTrigger as ht, TooltipPopup as i, AvatarImage as it, PopoverTitle as j, DialogBackdrop as jt, PreviewCardPortal as k, DialogDescription as kt, Toggle as l, ComboboxPopup as lt, SwitchThumb as m, ComboboxInput as mt, TooltipProvider as n, ComboboxRoot as nt, TooltipPortal as o, Separator as ot, TabsRoot as p, ComboboxClear as pt, MenuPositioner as q, TooltipArrow as r, AvatarFallback as rt, TooltipTrigger as s, ComboboxEmpty as st, useRender as t, ComboboxValue as tt, TabsList as u, ComboboxPositioner as ut, SliderTrack as v, AccordionPanel as vt, ScrollAreaViewport as w, DialogTrigger as wt, ScrollAreaCorner as x, AccordionItem as xt, SliderControl as y, AccordionTrigger as yt, MenuSubmenuTrigger as z };
