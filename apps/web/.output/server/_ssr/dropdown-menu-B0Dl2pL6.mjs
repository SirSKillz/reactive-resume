import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime, at as AvatarRoot, it as AvatarImage$1, rt as AvatarFallback$1 } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { i as isLocale, l as setLocaleServerFn, o as loadLocale, s as localeMap } from "./locale-BLKR2gqe.mjs";
import { n as useIsClient } from "../_libs/usehooks-ts.mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { U as t$1, h as e, lt as t } from "../_libs/phosphor-icons__react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans, r as useLingui } from "../_libs/lingui__react.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { n as getReadableErrorMessage } from "./error-message-ClkvUIO8.mjs";
import { o as useTheme, r as isTheme } from "./provider-BvhP1oi6.mjs";
import { a as DropdownMenuItem, c as DropdownMenuSeparator, d as DropdownMenuSubTrigger, f as DropdownMenuTrigger, i as DropdownMenuGroup, l as DropdownMenuSub, o as DropdownMenuRadioGroup, r as DropdownMenuContent, s as DropdownMenuRadioItem, t as DropdownMenu, u as DropdownMenuSubContent } from "./dropdown-menu-BOl1uVO4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dropdown-menu-B0Dl2pL6.js
var import_jsx_runtime = require_jsx_runtime();
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarRoot, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 select-none rounded-full after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full rounded-full object-cover", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
function UserDropdownMenu({ children }) {
	const isClient = useIsClient();
	const router = useRouter();
	const { i18n: i18n$1 } = useLingui();
	const { theme, setTheme } = useTheme();
	const { data: session } = authClient.useSession();
	const handleThemeChange = (value) => {
		if (!isTheme(value)) return;
		setTheme(value);
	};
	const handleLocaleChange = async (value) => {
		if (!isLocale(value)) return;
		await Promise.all([loadLocale(value), setLocaleServerFn({ data: value })]);
		window.location.reload();
	};
	const handleLogout = async () => {
		const toastId = toast.loading(i18n._({ id: "DZe_N-" }));
		await authClient.signOut({ fetchOptions: {
			onSuccess: () => {
				toast.dismiss(toastId);
				router.invalidate();
			},
			onError: ({ error }) => {
				toast.error(getReadableErrorMessage(error, i18n._({ id: "ywYAFu" })), { id: toastId });
			}
		} });
	};
	if (!isClient) return null;
	if (!session?.user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, { render: children({ session }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "start",
		side: "top",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vXIe7J" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, {
				className: "max-h-[400px] overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioGroup, {
					value: i18n$1.locale,
					onValueChange: handleLocaleChange,
					children: Object.entries(localeMap).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
						value,
						children: i18n$1.t(label)
					}, value))
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "FEr96N" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioGroup, {
				value: theme,
				onValueChange: handleThemeChange,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
					value: "light",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1njn7W" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
					value: "dark",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "pvnfJD" })
				})]
			}) })] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: handleLogout,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "nOhz3x" })]
			})
		]
	})] });
}
//#endregion
export { UserDropdownMenu as i, AvatarFallback as n, AvatarImage as r, Avatar$1 as t };
