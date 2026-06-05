import { Lt as require_jsx_runtime, Mt as Button } from "../_libs/@base-ui/react+[...].mjs";
import { n as cn, t as clsx } from "./style-De8YRxv-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DJhXBADJ.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Copyright 2022 Joe Bell. All rights reserved.
*
* This file is licensed to you under the Apache License, Version 2.0
* (the "License"); you may not use this file except in compliance with the
* License. You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations under
* the License.
*/ var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
	var _config_compoundVariants;
	if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
	const { variants, defaultVariants } = config;
	const getVariantClassNames = Object.keys(variants).map((variant) => {
		const variantProp = props === null || props === void 0 ? void 0 : props[variant];
		const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
		if (variantProp === null) return null;
		const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
		return variants[variant][variantKey];
	});
	const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
		let [key, value] = param;
		if (value === void 0) return acc;
		acc[key] = value;
		return acc;
	}, {});
	return cx(base, getVariantClassNames, config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
		let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
		return Object.entries(compoundVariantOptions).every((param) => {
			let [key, value] = param;
			return Array.isArray(value) ? value.includes({
				...defaultVariants,
				...propsWithoutUndefined
			}[key]) : {
				...defaultVariants,
				...propsWithoutUndefined
			}[key] === value;
		}) ? [
			...acc,
			cvClass,
			cvClassName
		] : acc;
	}, []), props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
var buttonVariants = cva("group/button inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-clip-padding font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2",
			xs: "h-7 gap-1 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),10px)] px-2 text-xs has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-8 gap-1 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2",
			icon: "size-9",
			"icon-xs": "size-7 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-8 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),12px)]",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, type = "button", variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-slot": "button",
		type,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
export { buttonVariants as n, cva as r, Button$1 as t };
