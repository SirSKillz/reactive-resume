import { o as __toESM } from "../../_runtime.mjs";
import { n as require_react } from "../@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../@base-ui/react+[...].mjs";
import { n as require_extends, t as require_objectWithoutPropertiesLoose } from "../babel__runtime.mjs";
import { i as hsvaToHslaString } from "../uiw__color-convert.mjs";
//#region ../../node_modules/.pnpm/@uiw+react-drag-event-inter_af8406ee4a7a91e09476b2f503826c40/node_modules/@uiw/react-drag-event-interactive/esm/utils.js
var import_extends = /* @__PURE__ */ __toESM(require_extends());
var import_objectWithoutPropertiesLoose = /* @__PURE__ */ __toESM(require_objectWithoutPropertiesLoose());
var import_react = /* @__PURE__ */ __toESM(require_react());
function useEventCallback(handler) {
	var callbackRef = (0, import_react.useRef)(handler);
	(0, import_react.useEffect)(() => {
		callbackRef.current = handler;
	});
	return (0, import_react.useCallback)((value, event) => callbackRef.current && callbackRef.current(value, event), []);
}
var isTouch = (event) => "touches" in event;
var preventDefaultMove = (event) => {
	!isTouch(event) && event.preventDefault && event.preventDefault();
};
var clamp = function clamp(number, min, max) {
	if (min === void 0) min = 0;
	if (max === void 0) max = 1;
	return number > max ? max : number < min ? min : number;
};
var getRelativePosition = (node, event) => {
	var rect = node.getBoundingClientRect();
	var pointer = isTouch(event) ? event.touches[0] : event;
	return {
		left: clamp((pointer.pageX - (rect.left + window.pageXOffset)) / rect.width),
		top: clamp((pointer.pageY - (rect.top + window.pageYOffset)) / rect.height),
		width: rect.width,
		height: rect.height,
		x: pointer.pageX - (rect.left + window.pageXOffset),
		y: pointer.pageY - (rect.top + window.pageYOffset)
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@uiw+react-drag-event-inter_af8406ee4a7a91e09476b2f503826c40/node_modules/@uiw/react-drag-event-interactive/esm/index.js
var import_jsx_runtime = require_jsx_runtime();
var _excluded$2 = [
	"prefixCls",
	"className",
	"onMove",
	"onDown"
];
var Interactive = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	var { prefixCls = "w-color-interactive", className, onMove, onDown } = props, reset = (0, import_objectWithoutPropertiesLoose.default)(props, _excluded$2);
	var container = (0, import_react.useRef)(null);
	var hasTouched = (0, import_react.useRef)(false);
	var [isDragging, setDragging] = (0, import_react.useState)(false);
	var onMoveCallback = useEventCallback(onMove);
	var onKeyCallback = useEventCallback(onDown);
	var isValid = (event) => {
		if (hasTouched.current && !isTouch(event)) return false;
		hasTouched.current = isTouch(event);
		return true;
	};
	var handleMove = (0, import_react.useCallback)((event) => {
		preventDefaultMove(event);
		if (!container.current) return;
		if (!(isTouch(event) ? event.touches.length > 0 : event.buttons > 0)) {
			setDragging(false);
			return;
		}
		onMoveCallback?.(getRelativePosition(container.current, event), event);
	}, [onMoveCallback]);
	var handleMoveEnd = (0, import_react.useCallback)(() => setDragging(false), []);
	var toggleDocumentEvents = (0, import_react.useCallback)((state) => {
		if (state) {
			window.addEventListener(hasTouched.current ? "touchmove" : "mousemove", handleMove);
			window.addEventListener(hasTouched.current ? "touchend" : "mouseup", handleMoveEnd);
		} else {
			window.removeEventListener("mousemove", handleMove);
			window.removeEventListener("mouseup", handleMoveEnd);
			window.removeEventListener("touchmove", handleMove);
			window.removeEventListener("touchend", handleMoveEnd);
		}
	}, [handleMove, handleMoveEnd]);
	(0, import_react.useEffect)(() => {
		toggleDocumentEvents(isDragging);
		return () => {
			toggleDocumentEvents(false);
		};
	}, [
		isDragging,
		handleMove,
		handleMoveEnd,
		toggleDocumentEvents
	]);
	var handleMoveStart = (0, import_react.useCallback)((event) => {
		document.activeElement?.blur();
		preventDefaultMove(event.nativeEvent);
		if (!isValid(event.nativeEvent)) return;
		if (!container.current) return;
		onKeyCallback?.(getRelativePosition(container.current, event.nativeEvent), event.nativeEvent);
		setDragging(true);
	}, [onKeyCallback]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", (0, import_extends.default)({}, reset, {
		className: [prefixCls, className || ""].filter(Boolean).join(" "),
		style: (0, import_extends.default)({}, reset.style, { touchAction: "none" }),
		ref: container,
		tabIndex: 0,
		onMouseDown: handleMoveStart,
		onTouchStart: handleMoveStart
	}));
});
Interactive.displayName = "Interactive";
//#endregion
//#region ../../node_modules/.pnpm/@uiw+react-color-alpha@2.10_e77d66dcd2cbc16d9c34026799e58330/node_modules/@uiw/react-color-alpha/esm/Pointer.js
var _excluded$1 = [
	"className",
	"prefixCls",
	"left",
	"top",
	"style",
	"fillProps"
];
var Pointer = (_ref) => {
	var { className, prefixCls, left, top, style, fillProps } = _ref, reset = (0, import_objectWithoutPropertiesLoose.default)(_ref, _excluded$1);
	var styleWrapper = (0, import_extends.default)({}, style, {
		position: "absolute",
		left,
		top
	});
	var stylePointer = (0, import_extends.default)({
		width: 18,
		height: 18,
		boxShadow: "var(--alpha-pointer-box-shadow)",
		borderRadius: "50%",
		backgroundColor: "var(--alpha-pointer-background-color)"
	}, fillProps == null ? void 0 : fillProps.style, { transform: left ? "translate(-9px, -1px)" : "translate(-1px, -9px)" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", (0, import_extends.default)({
		className: prefixCls + "-pointer " + (className || ""),
		style: styleWrapper
	}, reset, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", (0, import_extends.default)({ className: prefixCls + "-fill" }, fillProps, { style: stylePointer })) }));
};
//#endregion
//#region ../../node_modules/.pnpm/@uiw+react-color-alpha@2.10_e77d66dcd2cbc16d9c34026799e58330/node_modules/@uiw/react-color-alpha/esm/index.js
var _excluded = [
	"prefixCls",
	"className",
	"hsva",
	"background",
	"bgProps",
	"innerProps",
	"pointerProps",
	"radius",
	"width",
	"height",
	"direction",
	"reverse",
	"style",
	"onChange",
	"pointer"
];
var BACKGROUND_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==";
var Alpha = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	var { prefixCls = "w-color-alpha", className, hsva, background, bgProps = {}, innerProps = {}, pointerProps = {}, radius = 0, width, height = 16, direction = "horizontal", reverse = false, style, onChange, pointer } = props, other = (0, import_objectWithoutPropertiesLoose.default)(props, _excluded);
	var offsetToAlpha = (0, import_react.useCallback)((offset) => {
		var value = direction === "horizontal" ? offset.left : offset.top;
		if (direction === "horizontal") return reverse ? 1 - value : value;
		return reverse ? value : 1 - value;
	}, [direction, reverse]);
	var alphaToOffset = (0, import_react.useCallback)((alpha) => {
		if (direction === "horizontal") return reverse ? 1 - alpha : alpha;
		return reverse ? alpha : 1 - alpha;
	}, [direction, reverse]);
	var handleChange = (offset) => {
		var alpha = offsetToAlpha(offset);
		onChange && onChange((0, import_extends.default)({}, hsva, { a: alpha }), offset);
	};
	var colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));
	var horizontalGradient = reverse ? "linear-gradient(to right, " + colorTo + " 0%, rgba(244, 67, 54, 0) 100%)" : "linear-gradient(to right, rgba(244, 67, 54, 0) 0%, " + colorTo + " 100%)";
	var verticalGradient = reverse ? "linear-gradient(to bottom, rgba(244, 67, 54, 0) 0%, " + colorTo + " 100%)" : "linear-gradient(to bottom, " + colorTo + " 0%, rgba(244, 67, 54, 0) 100%)";
	var innerBackground = direction === "horizontal" ? horizontalGradient : verticalGradient;
	var comProps = {};
	if (direction === "horizontal") comProps.left = alphaToOffset(hsva.a) * 100 + "%";
	else comProps.top = alphaToOffset(hsva.a) * 100 + "%";
	var styleWrapper = (0, import_extends.default)({
		"--alpha-background-color": "#fff",
		"--alpha-pointer-background-color": "rgb(248, 248, 248)",
		"--alpha-pointer-box-shadow": "rgb(0 0 0 / 37%) 0px 1px 4px 0px",
		borderRadius: radius,
		background: "url(" + BACKGROUND_IMG + ") left center",
		backgroundColor: "var(--alpha-background-color)"
	}, {
		width,
		height
	}, style, { position: "relative" });
	var handleKeyDown = (0, import_react.useCallback)((event) => {
		var step = .01;
		var currentAlpha = hsva.a;
		var newAlpha = currentAlpha;
		switch (event.key) {
			case "ArrowLeft":
				if (direction === "horizontal") {
					newAlpha = reverse ? Math.min(1, currentAlpha + step) : Math.max(0, currentAlpha - step);
					event.preventDefault();
				}
				break;
			case "ArrowRight":
				if (direction === "horizontal") {
					newAlpha = reverse ? Math.max(0, currentAlpha - step) : Math.min(1, currentAlpha + step);
					event.preventDefault();
				}
				break;
			case "ArrowUp":
				if (direction === "vertical") {
					newAlpha = reverse ? Math.max(0, currentAlpha - step) : Math.min(1, currentAlpha + step);
					event.preventDefault();
				}
				break;
			case "ArrowDown":
				if (direction === "vertical") {
					newAlpha = reverse ? Math.min(1, currentAlpha + step) : Math.max(0, currentAlpha - step);
					event.preventDefault();
				}
				break;
			default: return;
		}
		if (newAlpha !== currentAlpha) {
			var syntheticAxisOffset = alphaToOffset(newAlpha);
			var syntheticOffset = {
				left: direction === "horizontal" ? syntheticAxisOffset : hsva.a,
				top: direction === "vertical" ? syntheticAxisOffset : hsva.a,
				width: 0,
				height: 0,
				x: 0,
				y: 0
			};
			onChange && onChange((0, import_extends.default)({}, hsva, { a: newAlpha }), syntheticOffset);
		}
	}, [
		alphaToOffset,
		hsva,
		direction,
		onChange,
		reverse
	]);
	var handleClick = (0, import_react.useCallback)((event) => {
		event.target.focus();
	}, []);
	var pointerElement = pointer && typeof pointer === "function" ? pointer((0, import_extends.default)({ prefixCls }, pointerProps, comProps)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pointer, (0, import_extends.default)({}, pointerProps, { prefixCls }, comProps));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", (0, import_extends.default)({}, other, {
		className: [
			prefixCls,
			prefixCls + "-" + direction,
			className || ""
		].filter(Boolean).join(" "),
		style: styleWrapper,
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", (0, import_extends.default)({}, bgProps, { style: (0, import_extends.default)({
			inset: 0,
			position: "absolute",
			background: background || innerBackground,
			borderRadius: radius
		}, bgProps.style) })), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interactive, (0, import_extends.default)({}, innerProps, {
			style: (0, import_extends.default)({}, innerProps.style, {
				inset: 0,
				zIndex: 1,
				position: "absolute",
				outline: "none"
			}),
			onMove: handleChange,
			onDown: handleChange,
			onClick: handleClick,
			onKeyDown: handleKeyDown,
			children: pointerElement
		}))]
	}));
});
Alpha.displayName = "Alpha";
//#endregion
export { BACKGROUND_IMG as n, Interactive as r, Alpha as t };
