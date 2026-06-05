import { o as __toESM } from "../_runtime.mjs";
import { n as require_extends } from "./babel__runtime.mjs";
//#region ../../node_modules/.pnpm/@uiw+color-convert@2.10.1_@babel+runtime@7.29.2/node_modules/@uiw/color-convert/esm/index.js
var import_extends = /* @__PURE__ */ __toESM(require_extends());
var RGB_MAX = 255;
var HUE_MAX = 360;
var SV_MAX = 100;
/**
* ```js
* rgbaToHsva({ r: 255, g: 255, b: 255, a: 1 }) //=> { h: 0, s: 0, v: 100, a: 1 }
* ```
*/
var rgbaToHsva = (_ref) => {
	var { r, g, b, a } = _ref;
	var max = Math.max(r, g, b);
	var delta = max - Math.min(r, g, b);
	var hh = delta ? max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta : 0;
	return {
		h: 60 * (hh < 0 ? hh + 6 : hh),
		s: max ? delta / max * SV_MAX : 0,
		v: max / RGB_MAX * SV_MAX,
		a
	};
};
var hsvaToHslaString = (hsva) => {
	var { h, s, l, a } = hsvaToHsla(hsva);
	return "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")";
};
var hsvaToHsla = (_ref5) => {
	var { h, s, v, a } = _ref5;
	var hh = (200 - s) * v / SV_MAX;
	return {
		h,
		s: hh > 0 && hh < 200 ? s * v / SV_MAX / (hh <= SV_MAX ? hh : 200 - hh) * SV_MAX : 0,
		l: hh / 2,
		a
	};
};
HUE_MAX / 400, HUE_MAX / (Math.PI * 2);
var rgbaStringToHsva = (rgbaString) => {
	var match = /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(rgbaString);
	if (!match) return {
		h: 0,
		s: 0,
		v: 0,
		a: 1
	};
	return rgbaToHsva({
		r: Number(match[1]) / (match[2] ? SV_MAX / RGB_MAX : 1),
		g: Number(match[3]) / (match[4] ? SV_MAX / RGB_MAX : 1),
		b: Number(match[5]) / (match[6] ? SV_MAX / RGB_MAX : 1),
		a: match[7] === void 0 ? 1 : Number(match[7]) / (match[8] ? SV_MAX : 1)
	});
};
var rgbToHex = (_ref7) => {
	var { r, g, b } = _ref7;
	return "#" + ((h) => new Array(7 - h.length).join("0") + h)((r << 16 | g << 8 | b).toString(16));
};
var rgbaToHexa = (_ref8) => {
	var { r, g, b, a } = _ref8;
	var alpha = typeof a === "number" && (a * 255 | 256).toString(16).slice(1);
	return "" + rgbToHex({
		r,
		g,
		b
	}) + (alpha ? alpha : "");
};
var hexToHsva = (hex) => rgbaToHsva(hexToRgba(hex));
var hexToRgba = (hex) => {
	var htemp = hex.replace("#", "");
	if (/^#?/.test(hex) && htemp.length === 3) hex = "#" + htemp.charAt(0) + htemp.charAt(0) + htemp.charAt(1) + htemp.charAt(1) + htemp.charAt(2) + htemp.charAt(2);
	var reg = /* @__PURE__ */ new RegExp("[A-Za-z0-9]{2}", "g");
	var [r, g, b = 0, a] = hex.match(reg).map((v) => parseInt(v, 16));
	return {
		r,
		g,
		b,
		a: (a != null ? a : 255) / RGB_MAX
	};
};
/**
* Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
* @param color HSVA color as an array [0-360, 0-1, 0-1, 0-1]
*/
var hsvaToRgba = (_ref9) => {
	var { h, s, v, a } = _ref9;
	var _h = h / 60, _s = s / SV_MAX, _v = v / SV_MAX, hi = Math.floor(_h) % 6;
	var f = _h - Math.floor(_h), _p = RGB_MAX * _v * (1 - _s), _q = RGB_MAX * _v * (1 - _s * f), _t = RGB_MAX * _v * (1 - _s * (1 - f));
	_v *= RGB_MAX;
	var rgba = {};
	switch (hi) {
		case 0:
			rgba.r = _v;
			rgba.g = _t;
			rgba.b = _p;
			break;
		case 1:
			rgba.r = _q;
			rgba.g = _v;
			rgba.b = _p;
			break;
		case 2:
			rgba.r = _p;
			rgba.g = _v;
			rgba.b = _t;
			break;
		case 3:
			rgba.r = _p;
			rgba.g = _q;
			rgba.b = _v;
			break;
		case 4:
			rgba.r = _t;
			rgba.g = _p;
			rgba.b = _v;
			break;
		case 5:
			rgba.r = _v;
			rgba.g = _p;
			rgba.b = _q;
			break;
	}
	rgba.r = Math.round(rgba.r);
	rgba.g = Math.round(rgba.g);
	rgba.b = Math.round(rgba.b);
	return (0, import_extends.default)({}, rgba, { a });
};
var hsvaToRgbaString = (hsva) => {
	var { r, g, b, a } = hsvaToRgba(hsva);
	return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
};
var rgbaToRgb = (_ref0) => {
	var { r, g, b } = _ref0;
	return {
		r,
		g,
		b
	};
};
var hslaToHsl = (_ref1) => {
	var { h, s, l } = _ref1;
	return {
		h,
		s,
		l
	};
};
var hsvaToHex = (hsva) => rgbToHex(hsvaToRgba(hsva));
var hsvaToHsv = (_ref10) => {
	var { h, s, v } = _ref10;
	return {
		h,
		s,
		v
	};
};
/**
* Converts RGB to XY. Based on formula from https://developers.meethue.com/develop/application-design-guidance/color-conversion-formulas-rgb-to-xy-and-back/
* @param color RGB color as an array [0-255, 0-255, 0-255]
*/
var rgbToXY = (_ref12) => {
	var { r, g, b } = _ref12;
	var translateColor = function translateColor(color) {
		return color <= .04045 ? color / 12.92 : Math.pow((color + .055) / 1.055, 2.4);
	};
	var red = translateColor(r / 255);
	var green = translateColor(g / 255);
	var blue = translateColor(b / 255);
	var xyz = {};
	xyz.x = red * .4124 + green * .3576 + blue * .1805;
	xyz.y = red * .2126 + green * .7152 + blue * .0722;
	xyz.bri = red * .0193 + green * .1192 + blue * .9505;
	return xyz;
};
var color = (str) => {
	var rgb;
	var hsl;
	var hsv;
	var rgba;
	var hsla;
	var hsva;
	var xy;
	var hex;
	var hexa;
	if (typeof str === "string" && validHex(str)) {
		hsva = hexToHsva(str);
		hex = str;
	} else if (typeof str !== "string") hsva = str;
	if (hsva) {
		hsv = hsvaToHsv(hsva);
		hsla = hsvaToHsla(hsva);
		rgba = hsvaToRgba(hsva);
		hexa = rgbaToHexa(rgba);
		hex = hsvaToHex(hsva);
		hsl = hslaToHsl(hsla);
		rgb = rgbaToRgb(rgba);
		xy = rgbToXY(rgb);
	}
	return {
		rgb,
		hsl,
		hsv,
		rgba,
		hsla,
		hsva,
		hex,
		hexa,
		xy
	};
};
var validHex = (hex) => /^#?([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
//#endregion
export { hsvaToRgbaString as a, hsvaToHslaString as i, hexToHsva as n, rgbaStringToHsva as o, hsvaToHex as r, validHex as s, color as t };
