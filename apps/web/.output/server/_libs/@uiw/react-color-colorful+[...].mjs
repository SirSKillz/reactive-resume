import { o as __toESM } from "../../_runtime.mjs";
import { n as require_react } from "../@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../@base-ui/react+[...].mjs";
import { n as require_extends, t as require_objectWithoutPropertiesLoose } from "../babel__runtime.mjs";
import { a as hsvaToRgbaString, i as hsvaToHslaString, n as hexToHsva, r as hsvaToHex, s as validHex, t as color } from "../uiw__color-convert.mjs";
import { n as BACKGROUND_IMG, r as Interactive, t as Alpha } from "./react-color-alpha+[...].mjs";
//#region ../../node_modules/.pnpm/@uiw+react-color-saturation_64803d3b32e87f8b8c4cdbb516f592e4/node_modules/@uiw/react-color-saturation/esm/Pointer.js
var import_extends = /* @__PURE__ */ __toESM(require_extends());
var import_objectWithoutPropertiesLoose = /* @__PURE__ */ __toESM(require_objectWithoutPropertiesLoose());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Pointer$1 = (_ref) => {
	var { className, color, left, top, prefixCls } = _ref;
	var style = {
		position: "absolute",
		top,
		left
	};
	var stylePointer = {
		"--saturation-pointer-box-shadow": "rgb(255 255 255) 0px 0px 0px 1.5px, rgb(0 0 0 / 30%) 0px 0px 1px 1px inset, rgb(0 0 0 / 40%) 0px 0px 1px 2px",
		width: 6,
		height: 6,
		transform: "translate(-3px, -3px)",
		boxShadow: "var(--saturation-pointer-box-shadow)",
		borderRadius: "50%",
		backgroundColor: color
	};
	return (0, import_react.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: prefixCls + "-pointer " + (className || ""),
		style,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: prefixCls + "-fill",
			style: stylePointer
		})
	}), [
		top,
		left,
		color,
		className,
		prefixCls
	]);
};
//#endregion
//#region ../../node_modules/.pnpm/@uiw+react-color-saturation_64803d3b32e87f8b8c4cdbb516f592e4/node_modules/@uiw/react-color-saturation/esm/index.js
var _excluded$2 = [
	"prefixCls",
	"radius",
	"pointer",
	"className",
	"hue",
	"style",
	"hsva",
	"onChange"
];
var Saturation = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	var _hsva$h;
	var { prefixCls = "w-color-saturation", radius = 0, pointer, className, hue = 0, style, hsva, onChange } = props, other = (0, import_objectWithoutPropertiesLoose.default)(props, _excluded$2);
	var containerStyle = (0, import_extends.default)({
		width: 200,
		height: 200,
		borderRadius: radius
	}, style, { position: "relative" });
	var containerRef = (0, import_react.useRef)(null);
	var combinedRef = (0, import_react.useCallback)((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	var handleChange = (0, import_react.useCallback)((interaction, event) => {
		onChange && hsva && onChange({
			h: hsva.h,
			s: interaction.left * 100,
			v: (1 - interaction.top) * 100,
			a: hsva.a
		});
		var element = containerRef.current;
		if (element) element.focus();
	}, [hsva, onChange]);
	var handleKeyDown = (0, import_react.useCallback)((event) => {
		if (!hsva || !onChange) return;
		var step = 1;
		var newS = hsva.s;
		var newV = hsva.v;
		var changed = false;
		switch (event.key) {
			case "ArrowLeft":
				newS = Math.max(0, hsva.s - step);
				changed = true;
				event.preventDefault();
				break;
			case "ArrowRight":
				newS = Math.min(100, hsva.s + step);
				changed = true;
				event.preventDefault();
				break;
			case "ArrowUp":
				newV = Math.min(100, hsva.v + step);
				changed = true;
				event.preventDefault();
				break;
			case "ArrowDown":
				newV = Math.max(0, hsva.v - step);
				changed = true;
				event.preventDefault();
				break;
			default: return;
		}
		if (changed) onChange({
			h: hsva.h,
			s: newS,
			v: newV,
			a: hsva.a
		});
	}, [hsva, onChange]);
	var pointerElement = (0, import_react.useMemo)(() => {
		if (!hsva) return null;
		var comProps = {
			top: 100 - hsva.v + "%",
			left: hsva.s + "%",
			color: hsvaToHslaString(hsva)
		};
		if (pointer && typeof pointer === "function") return pointer((0, import_extends.default)({ prefixCls }, comProps));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pointer$1, (0, import_extends.default)({ prefixCls }, comProps));
	}, [
		hsva,
		pointer,
		prefixCls
	]);
	var handleClick = (0, import_react.useCallback)((event) => {
		event.target.focus();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interactive, (0, import_extends.default)({ className: [prefixCls, className || ""].filter(Boolean).join(" ") }, other, {
		style: (0, import_extends.default)({
			position: "absolute",
			inset: 0,
			cursor: "crosshair",
			backgroundImage: "linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(" + ((_hsva$h = hsva == null ? void 0 : hsva.h) != null ? _hsva$h : hue) + ", 100%, 50%))"
		}, containerStyle, { outline: "none" }),
		ref: combinedRef,
		onMove: handleChange,
		onDown: handleChange,
		onKeyDown: handleKeyDown,
		onClick: handleClick,
		children: pointerElement
	}));
});
Saturation.displayName = "Saturation";
//#endregion
//#region ../../node_modules/.pnpm/@uiw+react-color-hue@2.10.1_630d46c9c5213acabe71637f38af1694/node_modules/@uiw/react-color-hue/esm/index.js
var _excluded$1 = [
	"prefixCls",
	"className",
	"hue",
	"onChange",
	"direction",
	"reverse"
];
var NORMAL_COLORS = "rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%";
var REVERSED_COLORS = "rgb(255, 0, 0) 0%, rgb(255, 0, 255) 17%, rgb(0, 0, 255) 33%, rgb(0, 255, 255) 50%, rgb(0, 255, 0) 67%, rgb(255, 255, 0) 83%, rgb(255, 0, 0) 100%";
var Hue = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	var { prefixCls = "w-color-hue", className, hue = 0, onChange: _onChange, direction = "horizontal", reverse = false } = props, other = (0, import_objectWithoutPropertiesLoose.default)(props, _excluded$1);
	var getGradientBackground = (0, import_react.useCallback)(() => {
		if (direction === "horizontal") return "linear-gradient(to right, " + (reverse ? REVERSED_COLORS : NORMAL_COLORS) + ")";
		else return "linear-gradient(to bottom, " + (reverse ? NORMAL_COLORS : REVERSED_COLORS) + ")";
	}, [direction, reverse]);
	var getHueFromInteraction = (0, import_react.useCallback)((interaction) => {
		var value = direction === "horizontal" ? interaction.left : interaction.top;
		var normalizedValue;
		if (direction === "horizontal") normalizedValue = reverse ? 1 - value : value;
		else normalizedValue = reverse ? value : 1 - value;
		return 360 * normalizedValue;
	}, [direction, reverse]);
	var gradientBackground = (0, import_react.useMemo)(() => getGradientBackground(), [getGradientBackground]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alpha, (0, import_extends.default)({
		ref,
		className: prefixCls + " " + (className || "")
	}, other, {
		direction,
		reverse,
		background: gradientBackground,
		hsva: {
			h: hue,
			s: 100,
			v: 100,
			a: hue / 360
		},
		onChange: (_, interaction) => {
			_onChange && _onChange({ h: getHueFromInteraction(interaction) });
		}
	}));
});
Hue.displayName = "Hue";
//#endregion
//#region ../../node_modules/.pnpm/@uiw+react-color-colorful@2_c077d514cf15f03cb4e27a8105be387b/node_modules/@uiw/react-color-colorful/esm/index.js
var _excluded = ["style", "color"], _excluded2 = [
	"prefixCls",
	"className",
	"onChange",
	"color",
	"style",
	"disableAlpha"
];
var Pointer = (_ref) => {
	var { style, color } = _ref;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", (0, import_extends.default)({}, (0, import_objectWithoutPropertiesLoose.default)(_ref, _excluded), {
		style: (0, import_extends.default)({
			"--colorful-pointer-background-color": "#fff",
			"--colorful-pointer-border": "2px solid #fff",
			height: 28,
			width: 28,
			position: "absolute",
			transform: "translate(-16px, -16px)",
			boxShadow: "0 2px 4px rgb(0 0 0 / 20%)",
			borderRadius: "50%",
			background: "url(" + BACKGROUND_IMG + ")",
			backgroundColor: "var(--colorful-pointer-background-color)",
			border: "var(--colorful-pointer-border)",
			zIndex: 1
		}, style),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
			backgroundColor: color,
			borderRadius: "50%",
			height: "100%",
			width: "100%"
		} })
	}));
};
var Colorful = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	var { prefixCls = "w-color-colorful", className, onChange, color: color$1, style, disableAlpha } = props, other = (0, import_objectWithoutPropertiesLoose.default)(props, _excluded2);
	var hsva = typeof color$1 === "string" && validHex(color$1) ? hexToHsva(color$1) : color$1 || {};
	var handleChange = (value) => onChange && onChange(color(value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", (0, import_extends.default)({
		ref,
		style: (0, import_extends.default)({
			width: 200,
			position: "relative"
		}, style)
	}, other, {
		className: prefixCls + " " + (className || ""),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Saturation, {
				hsva,
				className: prefixCls,
				radius: "8px 8px 0 0",
				style: {
					width: "auto",
					height: 150,
					minWidth: 120,
					borderBottom: "12px solid #000"
				},
				pointer: (_ref2) => {
					var { left, top, color } = _ref2;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pointer, {
						style: {
							left,
							top
						},
						color: hsvaToHex(hsva)
					});
				},
				onChange: (newColor) => handleChange((0, import_extends.default)({}, hsva, newColor))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hue, {
				hue: hsva.h,
				height: 24,
				radius: disableAlpha ? "0 0 8px 8px" : 0,
				className: prefixCls,
				onChange: (newHue) => handleChange((0, import_extends.default)({}, hsva, newHue)),
				pointer: (_ref3) => {
					var { left } = _ref3;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pointer, {
						style: {
							left,
							transform: "translate(-16px, -5px)"
						},
						color: "hsl(" + (hsva.h || 0) + "deg 100% 50%)"
					});
				}
			}),
			!disableAlpha && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alpha, {
				hsva,
				height: 24,
				className: prefixCls,
				radius: "0 0 8px 8px",
				pointer: (_ref4) => {
					var { left } = _ref4;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pointer, {
						style: {
							left,
							transform: "translate(-16px, -5px)"
						},
						color: hsvaToRgbaString(hsva)
					});
				},
				onChange: (newAlpha) => handleChange((0, import_extends.default)({}, hsva, newAlpha))
			})
		]
	}));
});
Colorful.displayName = "Colorful";
//#endregion
export { Colorful as t };
