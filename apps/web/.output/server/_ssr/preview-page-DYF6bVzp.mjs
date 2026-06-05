import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { n as createResumePdfBlob } from "./pdf-document-B-TL3j4e.mjs";
import { t as useCopyToClipboard } from "../_libs/usehooks-ts.mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { An as c, Nn as t, Qt as p, _t as a, er as e$1, in as e$3, kt as o, nn as o$2, rn as o$1, tr as e$2, vn as e, vt as n } from "../_libs/phosphor-icons__react.mjs";
import { i as TooltipTrigger, n as TooltipContent, t as Tooltip$1 } from "./tooltip-BJTNuvqu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as motion } from "../_libs/framer-motion.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { n as useCurrentResume } from "./builder-resume-draft-BR-M94v2.mjs";
import { t as LoadingScreen } from "./loading-screen-CCLlz1nZ.mjs";
import { n as generateFilename, t as downloadWithAnchor } from "./file-fX8PEHw_.mjs";
import { t as ResumePreview } from "./preview-Cj7IClou.mjs";
import { n as useBuilderAssistantStore, t as buildDocx } from "./assistant-store-R4U2-_Jj.mjs";
import { n as useHotkey } from "../_libs/tanstack__react-hotkeys.mjs";
import { n as TransformWrapper, r as useControls, t as TransformComponent } from "../_libs/react-zoom-pan-pinch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview-page-DYF6bVzp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BuilderDock({ pageLayout, onTogglePageLayout }) {
	const { data: session } = authClient.useSession();
	const resume = useCurrentResume();
	const [_, copyToClipboard] = useCopyToClipboard();
	const { zoomIn, zoomOut, centerView } = useControls();
	const [isPrinting, setIsPrinting] = (0, import_react.useState)(false);
	const isAssistantOpen = useBuilderAssistantStore((state) => state.isOpen);
	const toggleAssistant = useBuilderAssistantStore((state) => state.toggleOpen);
	const publicUrl = (0, import_react.useMemo)(() => {
		if (!session?.user.username || !resume?.slug) return "";
		return `${window.location.origin}/${session.user.username}/${resume.slug}`;
	}, [session?.user.username, resume?.slug]);
	const onCopyUrl = (0, import_react.useCallback)(async () => {
		await copyToClipboard(publicUrl);
		toast.success(i18n._({ id: "VoRm7A" }));
	}, [publicUrl, copyToClipboard]);
	const onDownloadJSON = (0, import_react.useCallback)(async () => {
		if (!resume) return;
		const filename = generateFilename(resume.name, "json");
		const jsonString = JSON.stringify(resume.data, null, 2);
		downloadWithAnchor(new Blob([jsonString], { type: "application/json" }), filename);
	}, [resume]);
	const onDownloadDOCX = (0, import_react.useCallback)(async () => {
		if (!resume) return;
		const filename = generateFilename(resume.name, "docx");
		try {
			downloadWithAnchor(await buildDocx(resume.data), filename);
		} catch {
			toast.error(i18n._({ id: "MY0gD2" }));
		}
	}, [resume]);
	const onDownloadPDF = (0, import_react.useCallback)(async () => {
		if (!resume) return;
		const filename = generateFilename(resume.name, "pdf");
		const toastId = toast.loading(i18n._({ id: "UC7fTw" }));
		setIsPrinting(true);
		try {
			downloadWithAnchor(await createResumePdfBlob(resume.data), filename);
		} catch {
			toast.error(i18n._({ id: "ru4Jfk" }));
		} finally {
			setIsPrinting(false);
			toast.dismiss(toastId);
		}
	}, [resume]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-4 flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: -18
			},
			animate: {
				opacity: .6,
				y: 0
			},
			whileHover: {
				opacity: 1,
				y: -2,
				scale: 1.01
			},
			transition: {
				duration: .2,
				ease: "easeOut"
			},
			className: "flex items-center rounded-r-full rounded-l-full bg-popover px-2 shadow-xl will-change-[transform,opacity]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: a,
					title: i18n._({ id: "AWOSPo" }),
					onClick: () => zoomIn(.1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: n,
					title: i18n._({ id: "FjkaiT" }),
					onClick: () => zoomOut(.1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: e,
					title: i18n._({ id: "MOB4En" }),
					onClick: () => centerView()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: pageLayout === "horizontal" ? e$1 : e$2,
					title: i18n._({ id: "ac_awk" }),
					onClick: onTogglePageLayout
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: t,
					title: isAssistantOpen ? i18n._({ id: "iOaLMv" }) : i18n._({ id: "wUX-B1" }),
					onClick: toggleAssistant,
					active: isAssistantOpen
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 h-8 w-px bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: o,
					title: i18n._({ id: "E6nRW7" }),
					onClick: () => onCopyUrl()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: o$1,
					title: i18n._({ id: "pkERVr" }),
					onClick: () => onDownloadJSON()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					icon: e$3,
					title: i18n._({ id: "PS6Bvl" }),
					onClick: () => onDownloadDOCX()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
					title: i18n._({ id: "KMdYRY" }),
					disabled: isPrinting,
					onClick: () => onDownloadPDF(),
					icon: isPrinting ? c : o$2,
					iconClassName: cn(isPrinting && "animate-spin")
				})
			]
		})
	});
}
function DockIcon({ icon: Icon, title, disabled, onClick, iconClassName, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "will-change-transform",
		whileHover: disabled ? void 0 : {
			y: -1,
			scale: 1.04
		},
		whileTap: disabled ? void 0 : { scale: .97 },
		transition: {
			duration: .15,
			ease: "easeOut"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			size: "icon",
			variant: "ghost",
			disabled,
			className: cn(active && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"),
			onClick,
			"aria-label": title,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", iconClassName) })
		})
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "top",
		align: "center",
		className: "font-medium",
		children: title
	})] });
}
var DEFAULT_BUILDER_PREVIEW_PAGE_LAYOUT = "horizontal";
var getNextBuilderPreviewPageLayout = (pageLayout) => pageLayout === "horizontal" ? "vertical" : "horizontal";
function PreviewPage() {
	const [pageLayout, setPageLayout] = (0, import_react.useState)(DEFAULT_BUILDER_PREVIEW_PAGE_LAYOUT);
	useHotkey("Mod+S", () => {
		toast.info(i18n._({ id: "p01AP-" }), {
			id: "auto-save",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p, {})
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TransformWrapper, {
				centerOnInit: true,
				maxScale: 5,
				minScale: .5,
				initialScale: .75,
				limitToBounds: false,
				wheel: { step: .001 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransformComponent, {
					wrapperClass: "h-full! w-full!",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePreview, {
						pageGap: "2rem",
						pageLayout,
						showPageNumbers: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderDock, {
					pageLayout,
					onTogglePageLayout: () => {
						setPageLayout((current) => getNextBuilderPreviewPageLayout(current));
					}
				})]
			})
		})
	});
}
//#endregion
export { PreviewPage };
