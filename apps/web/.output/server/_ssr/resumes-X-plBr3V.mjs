import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { f as Link, m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as MenuPortal, L as ContextMenuTrigger$1, Lt as require_jsx_runtime, R as ContextMenuRoot, X as MenuItem, Y as MenuPopup, ot as Separator, q as MenuPositioner } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { n as createResumePdfBlob } from "./pdf-document-B-TL3j4e.mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { m as orpc } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Dt as t, Ht as r, Q as e$5, St as e$4, Zt as e$2, it as i, nt as e, p as o$1, pn as o$3, tn as o$2, un as e$1, xt as o, yn as e$3 } from "../_libs/phosphor-icons__react.mjs";
import { t as Label } from "./label-DOBCpxYa.mjs";
import { t as useDialogStore } from "./store-DBaE29-H.mjs";
import { n as useConfirm } from "./use-confirm-DokHH3b4.mjs";
import { t as Separator$1 } from "./separator-BDL9Bvz5.mjs";
import { t as Badge } from "./badge-BOnUWx8o.mjs";
import { t as DashboardHeader } from "./header-Cf1o68Wv.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs$1 } from "./tabs-CLGV1Lc8.mjs";
import { r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans, r as useLingui } from "../_libs/lingui__react.mjs";
import { d as AnimatePresence, l as motion, r as useInView } from "../_libs/framer-motion.mjs";
import { t as CometCard } from "./comet-card-D0SCutVv.mjs";
import { r as getResumeErrorMessage } from "./error-message-ClkvUIO8.mjs";
import { t as Combobox$1 } from "./combobox-zQflN6sS.mjs";
import { t as Spinner } from "./spinner-DIYcuS2L.mjs";
import { a as DropdownMenuItem, c as DropdownMenuSeparator, f as DropdownMenuTrigger, r as DropdownMenuContent, t as DropdownMenu } from "./dropdown-menu-BOl1uVO4.mjs";
import { t as Route } from "./resumes-3ieTo2cD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resumes-X-plBr3V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BaseCard({ title, description, tags, className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CometCard, {
		translateDepth: 3,
		rotateDepth: 6,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			...props,
			className: cn("relative flex aspect-page size-full overflow-hidden rounded-md bg-popover shadow transition-shadow hover:shadow-xl", className),
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 flex w-full flex-col justify-end space-y-0.5 bg-background/40 px-4 py-3 backdrop-blur-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "truncate font-medium tracking-tight",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs opacity-80",
						children: description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("mt-2 hidden flex-wrap items-center gap-1", tags && tags.length > 0 && "flex"),
						children: tags?.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: tag
						}, tag))
					})
				]
			})]
		})
	});
}
function CreateResumeCard() {
	const { openDialog } = useDialogStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseCard, {
		title: i18n._({ id: "VrBnBN" }),
		description: i18n._({ id: "_38hFE" }),
		onClick: () => openDialog("resume.create", void 0),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {
				weight: "thin",
				className: "size-12"
			})
		})
	});
}
function ImportResumeCard() {
	const { openDialog } = useDialogStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseCard, {
		title: i18n._({ id: "K03OvA" }),
		description: i18n._({ id: "N0I2v-" }),
		onClick: () => openDialog("resume.import", void 0),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {
				weight: "thin",
				className: "size-12"
			})
		})
	});
}
function ContextMenu$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuRoot, {
		"data-slot": "context-menu",
		...props
	});
}
function ContextMenuTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuTrigger$1, {
		"data-slot": "context-menu-trigger",
		className: cn("select-none", className),
		...props
	});
}
function ContextMenuContent({ className, align = "start", alignOffset = 4, side = "inline-end", sideOffset = 0, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPositioner, {
		className: "isolate z-50 outline-none",
		align,
		alignOffset,
		side,
		sideOffset,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPopup, {
			"data-slot": "context-menu-content",
			className: cn("data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 relative z-50 max-h-(--available-height) min-w-36 origin-(--transform-origin) animate-none! overflow-y-auto overflow-x-hidden rounded-lg bg-popover/70 p-1 text-popover-foreground shadow-md outline-none ring-1 ring-foreground/10 duration-100 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 data-closed:animate-out data-open:animate-in **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[variant=destructive]:**:text-accent-foreground! **:data-[variant=destructive]:text-accent-foreground! **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[variant=destructive]:focus:bg-foreground/10!", className),
			...props
		})
	}) });
}
function ContextMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
		"data-slot": "context-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("group/context-menu-item relative flex cursor-default select-none items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:ps-7 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive", className),
		...props
	});
}
function ContextMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		"data-slot": "context-menu-separator",
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function ResumeContextMenu({ resume, children }) {
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const { mutate: deleteResume } = useMutation(orpc.resume.delete.mutationOptions());
	const { mutate: setLockedResume } = useMutation(orpc.resume.setLocked.mutationOptions());
	const handleUpdate = () => {
		openDialog("resume.update", resume);
	};
	const handleDuplicate = () => {
		openDialog("resume.duplicate", resume);
	};
	const handleToggleLock = async () => {
		if (!resume.isLocked) {
			if (!await confirm(i18n._({ id: "lRniaN" }), { description: i18n._({ id: "TeAHhB" }) })) return;
		}
		setLockedResume({
			id: resume.id,
			isLocked: !resume.isLocked
		}, { onError: (error) => {
			toast.error(getResumeErrorMessage(error));
		} });
	};
	const handleDelete = async () => {
		if (!await confirm(i18n._({ id: "phpS3e" }), { description: i18n._({ id: "2xOCJW" }) })) return;
		const toastId = toast.loading(i18n._({ id: "X8fXNy" }));
		deleteResume({ id: resume.id }, {
			onSuccess: () => {
				toast.success(i18n._({ id: "mW-9mo" }), { id: toastId });
			},
			onError: (error) => {
				toast.error(getResumeErrorMessage(error), { id: toastId });
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenu$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuTrigger, { render: children }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuItem, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/builder/$resumeId",
			params: { resumeId: resume.id },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1TNIig" })]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSeparator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuItem, {
			disabled: resume.isLocked,
			onClick: handleUpdate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EkH9pt" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuItem, {
			onClick: handleDuplicate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "euc6Ns" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuItem, {
			onClick: handleToggleLock,
			children: [resume.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$4, {}), resume.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VAOn4r" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "HD2Tiz" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuSeparator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuItem, {
			variant: "destructive",
			disabled: resume.isLocked,
			onClick: handleDelete,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cnGeoo" })]
		})
	] })] });
}
var MAX_THUMBNAIL_PIXEL_RATIO = 2;
var getResumeThumbnailCacheKey = (resumeId, updatedAt) => {
	return `${resumeId}:${updatedAt.getTime()}`;
};
var getResumeThumbnailRenderSize = (pageSize, targetWidth = 420, pixelRatio = 1) => {
	const outputScale = Math.min(Math.max(pixelRatio, 1), MAX_THUMBNAIL_PIXEL_RATIO);
	const pageScale = targetWidth / pageSize.width;
	return {
		height: Math.round(pageSize.height * pageScale * outputScale),
		scale: pageScale * outputScale,
		width: Math.round(targetWidth * outputScale)
	};
};
var canvasToBlob = async (canvas) => {
	return await new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) {
				reject(/* @__PURE__ */ new Error("Failed to create resume thumbnail image."));
				return;
			}
			resolve(blob);
		}, "image/png");
	});
};
var createPdfFirstPageImageUrl = async (file) => {
	const { AnnotationMode, GlobalWorkerOptions, getDocument } = await import("../_libs/pdfjs-dist.mjs").then((n) => n.a);
	GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
	const arrayBuffer = await file.arrayBuffer();
	const loadingTask = getDocument({ data: new Uint8Array(arrayBuffer) });
	let pdfDocument;
	try {
		pdfDocument = await loadingTask.promise;
		const page = await pdfDocument.getPage(1);
		try {
			const baseViewport = page.getViewport({ scale: 1 });
			const renderSize = getResumeThumbnailRenderSize({
				height: baseViewport.height,
				width: baseViewport.width
			}, 420, window.devicePixelRatio || 1);
			const canvas = document.createElement("canvas");
			const canvasContext = canvas.getContext("2d");
			if (!canvasContext) throw new Error("Failed to create resume thumbnail canvas context.");
			canvas.height = renderSize.height;
			canvas.width = renderSize.width;
			const viewport = page.getViewport({ scale: renderSize.scale });
			await page.render({
				canvas,
				canvasContext,
				viewport,
				annotationMode: AnnotationMode.DISABLE,
				background: "white"
			}).promise;
			const image = await canvasToBlob(canvas);
			return URL.createObjectURL(image);
		} finally {
			page.cleanup();
		}
	} finally {
		if (pdfDocument) pdfDocument.destroy();
		else loadingTask.destroy();
	}
};
function useResumeThumbnail(data, cacheKey) {
	const [thumbnail, setThumbnail] = (0, import_react.useState)({ status: "idle" });
	const currentUrlRef = (0, import_react.useRef)(null);
	const revokeCurrentThumbnail = (0, import_react.useCallback)(() => {
		if (!currentUrlRef.current) return;
		URL.revokeObjectURL(currentUrlRef.current);
		currentUrlRef.current = null;
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			revokeCurrentThumbnail();
		};
	}, [revokeCurrentThumbnail]);
	(0, import_react.useEffect)(() => {
		if (!data || !cacheKey) {
			revokeCurrentThumbnail();
			setThumbnail({ status: "idle" });
			return;
		}
		let isCancelled = false;
		let nextUrl = null;
		setThumbnail({ status: "loading" });
		const generateThumbnail = async () => {
			try {
				const pdf = await createResumePdfBlob(data);
				if (isCancelled) return;
				nextUrl = await createPdfFirstPageImageUrl(pdf);
				if (isCancelled) {
					URL.revokeObjectURL(nextUrl);
					nextUrl = null;
					return;
				}
				revokeCurrentThumbnail();
				currentUrlRef.current = nextUrl;
				setThumbnail({
					status: "ready",
					url: nextUrl
				});
				nextUrl = null;
			} catch (error) {
				if (isCancelled) return;
				console.error("Failed to generate resume thumbnail", error);
				revokeCurrentThumbnail();
				setThumbnail({ status: "error" });
			}
		};
		generateThumbnail();
		return () => {
			isCancelled = true;
			if (nextUrl) URL.revokeObjectURL(nextUrl);
		};
	}, [
		data,
		cacheKey,
		revokeCurrentThumbnail
	]);
	return thumbnail;
}
function ResumeThumbnail({ isLocked, resume }) {
	const containerRef = (0, import_react.useRef)(null);
	const isInView = useInView(containerRef, {
		amount: .1,
		margin: "240px",
		once: true
	});
	const resumeQuery = useQuery({
		...orpc.resume.getById.queryOptions({ input: { id: resume.id } }),
		enabled: isInView
	});
	const thumbnail = useResumeThumbnail(resumeQuery.data?.data, isInView ? getResumeThumbnailCacheKey(resume.id, resume.updatedAt) : void 0);
	const hasFailed = resumeQuery.isError || thumbnail.status === "error";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: cn("relative size-full overflow-hidden bg-muted/40 transition-all", isLocked && "blur-xs"),
		children: thumbnail.status === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute inset-0 bg-center bg-contain bg-white bg-no-repeat",
			style: { backgroundImage: `url(${thumbnail.url})` }
		}) : hasFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$2, {
				weight: "thin",
				className: "size-12 opacity-40"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "size-8 text-muted-foreground" })
		})
	});
}
function ResumeCard({ resume }) {
	const { i18n: i18n$2 } = useLingui();
	const updatedAt = (0, import_react.useMemo)(() => {
		return Intl.DateTimeFormat(i18n$2.locale, {
			dateStyle: "long",
			timeStyle: "short"
		}).format(resume.updatedAt);
	}, [i18n$2.locale, resume.updatedAt]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeContextMenu, {
		resume,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/builder/$resumeId",
			params: { resumeId: resume.id },
			className: "cursor-default",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "will-change-transform",
				whileHover: {
					y: -2,
					scale: 1.005
				},
				whileTap: { scale: .998 },
				transition: {
					type: "spring",
					stiffness: 320,
					damping: 28
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BaseCard, {
					title: resume.name,
					description: i18n._({
						id: "lYnXt3",
						values: { updatedAt }
					}),
					tags: resume.tags,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeThumbnail, {
						resume,
						isLocked: resume.isLocked
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeLockOverlay, { isLocked: resume.isLocked })]
				})
			})
		})
	});
}
function ResumeLockOverlay({ isLocked }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: .6 },
		exit: { opacity: 0 },
		transition: { duration: .15 },
		className: "absolute inset-0 flex items-center justify-center will-change-[opacity]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center rounded-full bg-popover p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$4, {
				weight: "thin",
				className: "size-12 opacity-60"
			})
		})
	}, "resume-lock-overlay") });
}
function GridView({ resumes }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid 3xl:grid-cols-6 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: -20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -20
				},
				transition: {
					duration: .2,
					ease: "easeOut"
				},
				className: "will-change-[transform,opacity]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateResumeCard, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: -20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -20
				},
				transition: {
					duration: .2,
					delay: .03,
					ease: "easeOut"
				},
				className: "will-change-[transform,opacity]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportResumeCard, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				initial: false,
				mode: "popLayout",
				children: resumes?.map((resume, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layout: true,
					initial: {
						opacity: 0,
						y: -20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -20,
						filter: "blur(8px)"
					},
					transition: {
						duration: .2,
						delay: Math.min(.12, (index + 2) * .02),
						ease: "easeOut"
					},
					className: "will-change-[transform,opacity]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeCard, { resume })
				}, resume.id))
			})
		]
	});
}
function ResumeDropdownMenu({ resume, children, ...props }) {
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const { mutate: deleteResume } = useMutation(orpc.resume.delete.mutationOptions());
	const { mutate: setLockedResume } = useMutation(orpc.resume.setLocked.mutationOptions());
	const handleUpdate = () => {
		openDialog("resume.update", resume);
	};
	const handleDuplicate = () => {
		openDialog("resume.duplicate", resume);
	};
	const handleToggleLock = async () => {
		if (!resume.isLocked) {
			if (!await confirm(i18n._({ id: "lRniaN" }), { description: i18n._({ id: "TeAHhB" }) })) return;
		}
		setLockedResume({
			id: resume.id,
			isLocked: !resume.isLocked
		}, { onError: (error) => {
			toast.error(getResumeErrorMessage(error));
		} });
	};
	const handleDelete = async () => {
		if (!await confirm(i18n._({ id: "phpS3e" }), { description: i18n._({ id: "2xOCJW" }) })) return;
		const toastId = toast.loading(i18n._({ id: "X8fXNy" }));
		deleteResume({ id: resume.id }, {
			onSuccess: () => {
				toast.success(i18n._({ id: "mW-9mo" }), { id: toastId });
			},
			onError: (error) => {
				toast.error(getResumeErrorMessage(error), { id: toastId });
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, { render: children }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/builder/$resumeId",
				params: { resumeId: resume.id },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1TNIig" })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				disabled: resume.isLocked,
				onClick: handleUpdate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EkH9pt" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: handleDuplicate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "euc6Ns" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: handleToggleLock,
				children: [resume.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$4, {}), resume.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VAOn4r" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "HD2Tiz" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				variant: "destructive",
				disabled: resume.isLocked,
				onClick: handleDelete,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cnGeoo" })]
			})
		]
	})] });
}
function ListView({ resumes }) {
	const { openDialog } = useDialogStore();
	const handleCreateResume = () => {
		openDialog("resume.create", void 0);
	};
	const handleImportResume = () => {
		openDialog("resume.import", void 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "will-change-[transform,opacity]",
				initial: {
					opacity: 0,
					y: -20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -20
				},
				transition: {
					duration: .2,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "lg",
					variant: "ghost",
					className: "h-12 w-full justify-start gap-x-4 text-start",
					onClick: handleCreateResume,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-80 truncate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VrBnBN" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "_38hFE" })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "will-change-[transform,opacity]",
				initial: {
					opacity: 0,
					y: -20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -20
				},
				transition: {
					duration: .2,
					delay: .03,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "lg",
					variant: "ghost",
					className: "h-12 w-full justify-start gap-x-4 text-start",
					onClick: handleImportResume,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-80 truncate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "K03OvA" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs opacity-60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "N0I2v-" })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				initial: false,
				mode: "popLayout",
				children: resumes?.map((resume, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layout: true,
					className: "will-change-[transform,opacity]",
					initial: {
						opacity: 0,
						y: -20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -20
					},
					transition: {
						duration: .18,
						delay: Math.min(.12, (index + 2) * .02),
						ease: "easeOut"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeListItem, { resume })
				}, resume.id))
			})
		]
	});
}
function ResumeListItem({ resume }) {
	const { i18n } = useLingui();
	const updatedAt = (0, import_react.useMemo)(() => {
		return Intl.DateTimeFormat(i18n.locale, {
			dateStyle: "long",
			timeStyle: "short"
		}).format(resume.updatedAt);
	}, [i18n.locale, resume.updatedAt]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-x-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			size: "lg",
			variant: "ghost",
			nativeButton: false,
			className: "h-12 w-full flex-1 justify-start gap-x-4 text-start",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/builder/$resumeId",
				params: { resumeId: resume.id },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-80 truncate",
						children: resume.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs opacity-60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
							id: "lYnXt3",
							values: { updatedAt }
						})
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeDropdownMenu, {
			resume,
			align: "end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				size: "icon",
				variant: "ghost",
				className: "size-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$3, {})
			})
		})]
	});
}
zod_default.object({
	tags: zod_default.array(zod_default.string()).default([]),
	sort: zod_default.enum([
		"lastUpdatedAt",
		"createdAt",
		"name"
	]).default("lastUpdatedAt"),
	view: zod_default.enum(["grid", "list"]).default("grid")
});
function RouteComponent() {
	const { i18n: i18n$1 } = useLingui();
	const { tags, sort, view } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const { data: allTags } = useQuery(orpc.resume.tags.list.queryOptions());
	const { data: resumes } = useQuery(orpc.resume.list.queryOptions({ input: {
		tags,
		sort
	} }));
	const tagOptions = (0, import_react.useMemo)(() => {
		if (!allTags) return [];
		return allTags.map((tag) => ({
			value: tag,
			label: tag
		}));
	}, [allTags]);
	const sortOptions = (0, import_react.useMemo)(() => {
		return [
			{
				value: "lastUpdatedAt",
				label: i18n$1.t("Last Updated")
			},
			{
				value: "createdAt",
				label: i18n$1.t("Created")
			},
			{
				value: "name",
				label: i18n$1.t("Name")
			}
		];
	}, [i18n$1]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: e$5,
				title: i18n._({ id: "oTBjeH" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-x-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "_HgF9q" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox$1, {
							value: sort,
							options: sortOptions,
							placeholder: i18n._({ id: "_HgF9q" }),
							onValueChange: (value) => {
								if (!value) return;
								navigate({ search: (prev) => ({
									...prev,
									sort: value
								}) });
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex gap-2", { hidden: tagOptions.length === 0 }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "0cVgUw" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox$1, {
							multiple: true,
							value: tags,
							options: tagOptions,
							placeholder: i18n._({ id: "0cVgUw" }),
							onValueChange: (value) => {
								navigate({ search: (prev) => ({
									...prev,
									tags: value ?? []
								}) });
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1, {
						className: "ltr:ms-auto rtl:me-auto",
						value: view,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "grid",
							nativeButton: false,
							className: "rounded-r-none",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: ".",
								search: (prev) => ({
									...prev,
									view: "grid"
								})
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "CXDHcv" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "list",
							nativeButton: false,
							className: "rounded-l-none",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: ".",
								search: (prev) => ({
									...prev,
									view: "list"
								})
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "2BBAbc" })]
						})] })
					})
				]
			}),
			view === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListView, { resumes: resumes ?? [] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridView, { resumes: resumes ?? [] })
		]
	});
}
//#endregion
export { RouteComponent as component };
