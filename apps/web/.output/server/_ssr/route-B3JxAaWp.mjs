import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, t as useChat } from "../_libs/@ai-sdk/react+[...].mjs";
import { f as Link, h as useParams, m as useNavigate, s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { r as useStore } from "../_libs/@tanstack/react-form+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { t as createSsrRpc } from "./locale-BLKR2gqe.mjs";
import { t as M } from "../_libs/ts-pattern.mjs";
import { a as getFontDisplayName, c as sortFontWeights, i as getFont, n as createResumePdfBlob, o as getFontSearchKeywords, r as fontList } from "./pdf-document-B-TL3j4e.mjs";
import { t as useCopyToClipboard } from "../_libs/usehooks-ts.mjs";
import { n as cn } from "./style-De8YRxv-.mjs";
import { C as typographySchema, d as levelDesignSchema, f as metadataSchema, i as colorDesignSchema, m as pictureSchema, n as basicsSchema, p as pageSchema } from "./data-B8fRirR8.mjs";
import { a as stripHtml, r as getInitials, t as generateId } from "./string-DY6EtMBd.mjs";
import { S as asyncIteratorToUnproxiedDataStream, f as ORPCError } from "../_libs/@orpc/client+[...].mjs";
import { t as isEqual } from "../_libs/es-toolkit.mjs";
import { i as buildResumePatchProposalPreview, m as orpc, v as resumePatchProposalToolOutputSchema, x as streamClient } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { $n as r$6, An as c, B as r$2, Bn as o$11, Dt as t$5, Fn as t$2, Hn as e$7, It as e$13, Kn as o$9, Lt as o$7, Mn as o$2, Mt as t$7, Nn as t, Nt as t$3, Pn as o$16, Q as e$10, Qn as r, R as a$2, Rn as e$2, Rt as o$4, St as e$4, Tn as o$13, Ut as o$12, V as o$1, Vn as r$4, Vt as e$8, W as o$3, Xt as e$15, Yn as r$8, Yt as t$1, a as e$3, an as o$19, bt as o, cn as o$17, ct as a, d as e$17, dn as a$1, dt as e$11, f as r$1, fn as o$21, ft as e$1, h as e$6, hn as r$3, ht as o$10, in as e$18, it as i, jt as e$16, kn as r$9, ln as o$14, lt as t$4, m as r$7, mn as t$6, nn as o$24, nt as e$14, on as o$22, p as o$6, q as e$12, r as e, rn as o$23, rt as e$9, sn as o$18, tt as o$20, u as o$8, wn as m, wt as s$1, xn as s, xt as o$5, y as o$15, yn as e$5, zn as r$5 } from "../_libs/phosphor-icons__react.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { a as InputGroupText, i as InputGroupInput, n as InputGroupAddon, o as Textarea, t as InputGroup } from "./input-group-BUPwXtm5.mjs";
import { t as Label } from "./label-DOBCpxYa.mjs";
import { a as FormMessage, i as FormLabel, o as useAppForm, r as FormItem, s as withForm, t as FormControl } from "./tanstack-form-BM1OX7UY.mjs";
import { i as create, n as persist, r as immer, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as useDialogStore } from "./store-DBaE29-H.mjs";
import { n as useConfirm } from "./use-confirm-DokHH3b4.mjs";
import { t as Separator$1 } from "./separator-BDL9Bvz5.mjs";
import { t as Badge } from "./badge-BOnUWx8o.mjs";
import { n as SheetContent, t as Sheet } from "./sheet-ByBzK8eA.mjs";
import { n as useSuspenseQuery, o as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans, r as useLingui } from "../_libs/lingui__react.mjs";
import { a as PointerSensor, g as CSS, h as useSensors, m as useSensor, n as DragOverlay, p as useDroppable, s as closestCorners, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { a as useSortable, n as arrayMove, o as verticalListSortingStrategy, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { d as AnimatePresence, i as useDragControls, l as motion, n as ReorderGroup, r as useInView, t as ReorderItem } from "../_libs/framer-motion.mjs";
import { t as templates } from "./data-CxwmqxYs.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion$1 } from "./accordion-DOawwzaM.mjs";
import { t as Copyright } from "./copyright-rnEqIkLA.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { n as getReadableErrorMessage, r as getResumeErrorMessage, t as getOrpcErrorMessage } from "./error-message-ClkvUIO8.mjs";
import { n as usePrompt } from "./use-prompt-DhB_ouZz.mjs";
import { t as Combobox$1 } from "./combobox-zQflN6sS.mjs";
import { n as getLocaleOptions } from "./combobox-CNLnFcal.mjs";
import { a as usePatchResume, c as useResumeCleanup, d as useResumeUpdateSubscription, f as useUpdateResumeData, i as useMergeResumeMetadata, n as useCurrentResume, o as useReplaceResumeFromServer, r as useInitializeResumeStore, s as useResume, t as useCurrentBuilderResumeSelector, u as useResumeStore } from "./builder-resume-draft-BR-M94v2.mjs";
import { n as generateFilename, t as downloadWithAnchor } from "./file-fX8PEHw_.mjs";
import { n as useBuilderAssistantStore, t as buildDocx } from "./assistant-store-R4U2-_Jj.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-uTBGL8rz.mjs";
import { a as DropdownMenuItem, c as DropdownMenuSeparator, d as DropdownMenuSubTrigger, f as DropdownMenuTrigger, i as DropdownMenuGroup, l as DropdownMenuSub, o as DropdownMenuRadioGroup, r as DropdownMenuContent, s as DropdownMenuRadioItem, t as DropdownMenu, u as DropdownMenuSubContent } from "./dropdown-menu-BOl1uVO4.mjs";
import { a as PopoverContent, c as Route, d as URLInput, i as Popover$1, l as ScrollArea$1, n as ColorPicker, o as PopoverTrigger, r as IconPicker, s as RichInput, t as ButtonGroup, u as Slider$1 } from "./route-BpSmS9Mo.mjs";
import { n as useAIStore, t as Switch$1 } from "./switch-BlG3Pz1S.mjs";
import { a as useBuilderSidebar, i as parseBuilderLayoutCookie, o as useBuilderSidebarStore, r as mapPanelLayoutToBuilderLayout, s as useIsMobile } from "./sidebar-DCjihoae.mjs";
import { i as UserDropdownMenu, n as AvatarFallback, r as AvatarImage, t as Avatar$1 } from "./dropdown-menu-B0Dl2pL6.mjs";
import { i as ln, n as Ut, r as Yt, t as Qt } from "../_libs/react-resizable-panels.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-B3JxAaWp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResizableGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ut, {
		"data-slot": "resizable-panel-group",
		className: cn("flex h-full w-full aria-[orientation=vertical]:flex-col", className),
		...props
	});
}
function ResizablePanel({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Yt, {
		"data-slot": "resizable-panel",
		...props
	});
}
function ResizableSeparator({ withHandle, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
		"data-slot": "resizable-handle",
		className: cn("relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-s-1/2 after:inset-y-0 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:inset-s-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 rtl:after:translate-x-1/2 rtl:aria-[orientation=horizontal]:after:translate-x-0 [&[aria-orientation=horizontal]>div]:rotate-90", className),
		...props,
		children: withHandle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border" })
	});
}
var MIN_WINDOW_WIDTH = 360;
var MIN_WINDOW_HEIGHT = 440;
var DEFAULT_WINDOW_WIDTH = 460;
var DEFAULT_WINDOW_HEIGHT = 650;
var LAYOUT_STORAGE_VERSION = 2;
function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}
function createDefaultLayout() {
	if (typeof window === "undefined") return { window: {
		x: 24,
		y: 88,
		width: DEFAULT_WINDOW_WIDTH,
		height: DEFAULT_WINDOW_HEIGHT
	} };
	const width = Math.min(DEFAULT_WINDOW_WIDTH, window.innerWidth - 32);
	const height = Math.min(DEFAULT_WINDOW_HEIGHT, window.innerHeight - 112);
	return { window: {
		x: Math.max(16, Math.round((window.innerWidth - width) / 2)),
		y: Math.max(68, Math.round((window.innerHeight - height) / 2)),
		width,
		height
	} };
}
function constrainLayout(layout) {
	if (typeof window === "undefined") return layout;
	const maxWindowWidth = Math.max(MIN_WINDOW_WIDTH, window.innerWidth - 32);
	const maxWindowHeight = Math.max(MIN_WINDOW_HEIGHT, window.innerHeight - 88);
	const width = clamp(layout.window.width, MIN_WINDOW_WIDTH, maxWindowWidth);
	const height = clamp(layout.window.height, MIN_WINDOW_HEIGHT, maxWindowHeight);
	return { window: {
		x: clamp(layout.window.x, 12, window.innerWidth - width - 12),
		y: clamp(layout.window.y, 68, window.innerHeight - height - 12),
		width,
		height
	} };
}
function getLayoutStorageKey(resumeId) {
	return `resume-builder-ai-assistant:${resumeId}:layout:v${LAYOUT_STORAGE_VERSION}`;
}
function usePersistentAssistantLayout(resumeId) {
	const [layout, setLayout] = (0, import_react.useState)(() => createDefaultLayout());
	const hydratedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const key = getLayoutStorageKey(resumeId);
		try {
			const stored = window.localStorage.getItem(key);
			setLayout(constrainLayout(stored ? JSON.parse(stored) : createDefaultLayout()));
		} catch {
			setLayout(constrainLayout(createDefaultLayout()));
		} finally {
			hydratedRef.current = true;
		}
	}, [resumeId]);
	(0, import_react.useEffect)(() => {
		if (!hydratedRef.current) return;
		try {
			window.localStorage.setItem(getLayoutStorageKey(resumeId), JSON.stringify(layout));
		} catch {}
	}, [layout, resumeId]);
	(0, import_react.useEffect)(() => {
		const onResize = () => setLayout((current) => constrainLayout(current));
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);
	return {
		layout,
		setLayout
	};
}
function formatPreviewValue(value) {
	if (value === void 0 || value === null || value === "") return "Empty";
	if (typeof value === "string") return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() || value;
	return JSON.stringify(value, null, 2);
}
function refreshQueuedProposal(item, resume) {
	const proposal = {
		...item.proposal,
		baseUpdatedAt: resume.updatedAt.toISOString()
	};
	try {
		return {
			...item,
			proposal,
			preview: buildResumePatchProposalPreview(resume.data, proposal),
			stalePreview: false
		};
	} catch {
		return {
			...item,
			proposal,
			stalePreview: true
		};
	}
}
function getPatchErrorMessage(error) {
	return getOrpcErrorMessage(error, {
		allowServerMessage: true,
		byCode: {
			INVALID_PATCH_OPERATIONS: i18n._({ id: "24o2JY" }),
			RESUME_LOCKED: i18n._({ id: "NAJr4V" }),
			RESUME_VERSION_CONFLICT: i18n._({ id: "KjD3OI" })
		},
		fallback: i18n._({ id: "LbQkNO" })
	});
}
function beginElementDrag(event, onMove, onEnd) {
	if (event.button !== 0) return;
	const target = event.currentTarget;
	const startX = event.clientX;
	const startY = event.clientY;
	target.setPointerCapture(event.pointerId);
	const handlePointerMove = (moveEvent) => {
		onMove(moveEvent.clientX - startX, moveEvent.clientY - startY);
	};
	const handlePointerUp = () => {
		target.removeEventListener("pointermove", handlePointerMove);
		target.removeEventListener("pointerup", handlePointerUp);
		target.removeEventListener("pointercancel", handlePointerUp);
		onEnd?.();
	};
	target.addEventListener("pointermove", handlePointerMove);
	target.addEventListener("pointerup", handlePointerUp);
	target.addEventListener("pointercancel", handlePointerUp);
}
function BuilderAssistant() {
	const resume = useCurrentResume();
	const isMobile = useIsMobile();
	const { layout, setLayout } = usePersistentAssistantLayout(resume.id);
	const isOpen = useBuilderAssistantStore((state) => state.isOpen);
	const setIsOpen = useBuilderAssistantStore((state) => state.setOpen);
	const beginWindowDrag = (event) => {
		const start = layout.window;
		beginElementDrag(event, (deltaX, deltaY) => {
			setLayout((current) => constrainLayout({
				...current,
				window: {
					...current.window,
					x: start.x + deltaX,
					y: start.y + deltaY
				}
			}));
		});
	};
	const beginWindowResize = (event) => {
		event.stopPropagation();
		const start = layout.window;
		beginElementDrag(event, (deltaX, deltaY) => {
			setLayout((current) => constrainLayout({
				...current,
				window: {
					...current.window,
					width: start.width + deltaX,
					height: start.height + deltaY
				}
			}));
		});
	};
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: isOpen,
		onOpenChange: setIsOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			side: "right",
			showCloseButton: false,
			className: "h-svh w-svw max-w-none! gap-0 p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantPanel, {
				resume,
				isMobile: true,
				onClose: () => setIsOpen(false)
			})
		})
	});
	return isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed top-0 left-0 z-[60] overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-2xl ring-1 ring-foreground/10",
		style: {
			width: layout.window.width,
			height: layout.window.height,
			transform: `translate3d(${layout.window.x}px, ${layout.window.y}px, 0)`
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantPanel, {
			resume,
			onClose: () => setIsOpen(false),
			onDragHeaderPointerDown: beginWindowDrag,
			onResizePointerDown: beginWindowResize
		})
	}) : null;
}
function AssistantPanel({ resume, isMobile = false, onClose, onDragHeaderPointerDown, onResizePointerDown }) {
	const replaceResumeFromServer = useReplaceResumeFromServer();
	const aiEnabled = useAIStore((state) => state.enabled);
	const provider = useAIStore((state) => state.provider);
	const model = useAIStore((state) => state.model);
	const apiKey = useAIStore((state) => state.apiKey);
	const baseURL = useAIStore((state) => state.baseURL);
	const [input, setInput] = (0, import_react.useState)("");
	const [queue, setQueue] = (0, import_react.useState)([]);
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const [resolutions, setResolutions] = (0, import_react.useState)({});
	const seenProposalKeysRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const requestContextRef = (0, import_react.useRef)({
		provider,
		model,
		apiKey,
		baseURL,
		resumeData: resume.data,
		resumeUpdatedAt: resume.updatedAt
	});
	requestContextRef.current = {
		provider,
		model,
		apiKey,
		baseURL,
		resumeData: resume.data,
		resumeUpdatedAt: resume.updatedAt
	};
	const { messages, sendMessage, status, error, stop, setMessages, clearError } = useChat({ transport: (0, import_react.useMemo)(() => ({
		async sendMessages(options) {
			const requestContext = requestContextRef.current;
			return asyncIteratorToUnproxiedDataStream(await streamClient.ai.chat({
				provider: requestContext.provider,
				model: requestContext.model,
				apiKey: requestContext.apiKey,
				baseURL: requestContext.baseURL,
				messages: options.messages,
				resumeData: requestContext.resumeData,
				resumeUpdatedAt: requestContext.resumeUpdatedAt
			}, { signal: options.abortSignal }));
		},
		reconnectToStream() {
			throw new Error("AI assistant stream reconnection is not supported.");
		}
	}), []) });
	const patchMutation = useMutation(orpc.resume.patch.mutationOptions({ meta: { noInvalidate: true } }));
	const hasChatError = status === "error" || Boolean(error);
	const isStreaming = !hasChatError && (status === "submitted" || status === "streaming");
	const isApplying = patchMutation.isPending;
	const activeProposal = queue[activeIndex];
	const activeProposalSourceVisible = activeProposal ? messages.some((message) => message.id === activeProposal.sourceMessageId) : false;
	const resolveProposal = (0, import_react.useCallback)((item, status) => {
		setResolutions((current) => ({
			...current,
			[item.key]: {
				key: item.key,
				sourceMessageId: item.sourceMessageId,
				title: item.preview.title,
				status
			}
		}));
	}, []);
	(0, import_react.useEffect)(() => {
		if (activeIndex < queue.length) return;
		setActiveIndex(Math.max(0, queue.length - 1));
	}, [activeIndex, queue.length]);
	(0, import_react.useEffect)(() => {
		if (!error || status !== "submitted" && status !== "streaming") return;
		stop();
	}, [
		error,
		status,
		stop
	]);
	(0, import_react.useEffect)(() => {
		const incoming = [];
		for (const message of messages) for (const part of message.parts ?? []) {
			if (part.type !== "tool-propose_resume_patches" || part.state !== "output-available") continue;
			const parsed = resumePatchProposalToolOutputSchema.safeParse(part.output);
			if (!parsed.success) continue;
			for (const proposal of parsed.data.proposals) {
				const key = `${part.toolCallId}:${proposal.id}`;
				if (seenProposalKeysRef.current.has(key)) continue;
				try {
					incoming.push({
						key,
						sourceMessageId: message.id,
						toolCallId: part.toolCallId,
						proposal,
						preview: buildResumePatchProposalPreview(resume.data, proposal)
					});
					seenProposalKeysRef.current.add(key);
				} catch {
					toast.error(i18n._({ id: "CPH5-P" }));
				}
			}
		}
		if (incoming.length === 0) return;
		setQueue((current) => [...current, ...incoming]);
		setActiveIndex((index) => queue.length === 0 ? 0 : index);
	}, [
		messages,
		queue.length,
		resume.data
	]);
	const removeActiveProposal = (0, import_react.useCallback)(() => {
		setQueue((current) => {
			const next = current.filter((_, index) => index !== activeIndex);
			setActiveIndex((index) => Math.min(index, Math.max(0, next.length - 1)));
			return next;
		});
	}, [activeIndex]);
	const handleAcceptCurrent = async () => {
		if (!activeProposal) return;
		try {
			const updated = await patchMutation.mutateAsync({
				id: resume.id,
				operations: activeProposal.proposal.operations,
				expectedUpdatedAt: activeProposal.proposal.baseUpdatedAt ? new Date(activeProposal.proposal.baseUpdatedAt) : resume.updatedAt
			});
			requestContextRef.current = {
				...requestContextRef.current,
				resumeData: updated.data,
				resumeUpdatedAt: updated.updatedAt
			};
			replaceResumeFromServer(updated);
			toast.success(i18n._({ id: "rO0VaV" }));
			resolveProposal(activeProposal, "accepted");
			setQueue((current) => {
				const next = current.filter((_, index) => index !== activeIndex).map((item) => refreshQueuedProposal(item, updated));
				setActiveIndex((index) => Math.min(index, Math.max(0, next.length - 1)));
				return next;
			});
		} catch (error) {
			toast.error(getPatchErrorMessage(error));
		}
	};
	const handleRejectCurrent = () => {
		if (!activeProposal) return;
		resolveProposal(activeProposal, "rejected");
		removeActiveProposal();
		toast.message(i18n._({ id: "oGkSgC" }));
	};
	const handleAcceptAll = async () => {
		if (queue.length === 0) return;
		try {
			const operations = queue.flatMap((item) => item.proposal.operations);
			const updated = await patchMutation.mutateAsync({
				id: resume.id,
				operations,
				expectedUpdatedAt: queue[0]?.proposal.baseUpdatedAt ? new Date(queue[0].proposal.baseUpdatedAt) : resume.updatedAt
			});
			requestContextRef.current = {
				...requestContextRef.current,
				resumeData: updated.data,
				resumeUpdatedAt: updated.updatedAt
			};
			replaceResumeFromServer(updated);
			setResolutions((current) => ({
				...current,
				...Object.fromEntries(queue.map((item) => [item.key, {
					key: item.key,
					sourceMessageId: item.sourceMessageId,
					title: item.preview.title,
					status: "accepted"
				}]))
			}));
			setQueue([]);
			setActiveIndex(0);
			toast.success(i18n._({ id: "EkJngd" }));
		} catch (error) {
			toast.error(getPatchErrorMessage(error));
		}
	};
	const handleRejectAll = () => {
		setResolutions((current) => ({
			...current,
			...Object.fromEntries(queue.map((item) => [item.key, {
				key: item.key,
				sourceMessageId: item.sourceMessageId,
				title: item.preview.title,
				status: "rejected"
			}]))
		}));
		setQueue([]);
		setActiveIndex(0);
		toast.message(i18n._({ id: "HUnGPY" }));
	};
	const resetChat = () => {
		stop();
		clearError();
		setMessages([]);
		setQueue([]);
		setActiveIndex(0);
		setResolutions({});
		setInput("");
		seenProposalKeysRef.current.clear();
	};
	const submitMessage = () => {
		const text = input.trim();
		if (!text || !aiEnabled || isStreaming) return;
		clearError();
		sendMessage({ text });
		setInput("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex size-full flex-col bg-popover",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-13 shrink-0 select-none items-center gap-3 border-b px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex min-w-0 flex-1 items-center gap-3 self-stretch py-2", onDragHeaderPointerDown && "cursor-grab active:cursor-grabbing"),
						onPointerDown: onDragHeaderPointerDown,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {
								className: "size-4",
								weight: "fill"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-sm leading-tight",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "KS-7VX" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-muted-foreground text-xs",
								children: aiEnabled ? `${provider} · ${model}` : i18n._({ id: "7eMGxV" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "icon-sm",
						variant: "ghost",
						title: i18n._({ id: "Xi0sEu" }),
						"aria-label": i18n._({ id: "Xi0sEu" }),
						onClick: resetChat,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "icon-sm",
						variant: "ghost",
						title: i18n._({ id: "yz7wBu" }),
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {})
					})
				]
			}),
			!aiEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisabledAssistantState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
					className: "h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 p-3",
						children: [messages.length === 0 && !activeProposal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyProposalState, {}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								messages.map((message) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantTimelineItem, {
										message,
										proposal: activeProposal?.sourceMessageId === message.id ? activeProposal : void 0,
										resolutions: Object.values(resolutions).filter((resolution) => resolution.sourceMessageId === message.id),
										proposalIndex: activeIndex,
										proposalTotal: queue.length,
										isApplying,
										onAcceptProposal: handleAcceptCurrent,
										onRejectProposal: handleRejectCurrent,
										onAcceptAllProposals: handleAcceptAll,
										onRejectAllProposals: handleRejectAll,
										onPreviousProposal: () => setActiveIndex((index) => Math.max(0, index - 1)),
										onNextProposal: () => setActiveIndex((index) => Math.min(queue.length - 1, index + 1))
									}, message.id);
								}),
								activeProposal && !activeProposalSourceVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalApprovalCard, {
									item: activeProposal,
									index: activeIndex,
									total: queue.length,
									isApplying,
									onAccept: handleAcceptCurrent,
									onReject: handleRejectCurrent,
									onAcceptAll: handleAcceptAll,
									onRejectAll: handleRejectAll,
									onPrevious: () => setActiveIndex((index) => Math.max(0, index - 1)),
									onNext: () => setActiveIndex((index) => Math.min(queue.length - 1, index + 1))
								}) : null,
								isStreaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantThinkingBubble, { status }) : null,
								hasChatError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantErrorBubble, { error }) : null
							]
						})]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "border-t p-3",
				onSubmit: (event) => {
					event.preventDefault();
					submitMessage();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: input,
							onChange: (event) => setInput(event.target.value),
							placeholder: i18n._({ id: "OqyhKn" }),
							className: "max-h-28 min-h-12 resize-none",
							disabled: isStreaming,
							onKeyDown: (event) => {
								if (event.key !== "Enter" || event.shiftKey) return;
								event.preventDefault();
								submitMessage();
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							size: "icon",
							type: "submit",
							disabled: !input.trim() || isStreaming,
							children: [isStreaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "JlFcis" })
							})]
						}),
						isStreaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							size: "icon",
							variant: "outline",
							onClick: stop,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "ygCKqB" })
							})]
						}) : null
					]
				})
			})] }),
			!isMobile && onResizePointerDown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onPointerDown: onResizePointerDown,
				"aria-label": i18n._({ id: "2KvpD3" }),
				className: "absolute right-0 bottom-0 cursor-nwse-resize",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, { className: "size-3" })
			}) : null
		]
	});
}
function DisabledAssistantState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold text-base",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "u9QXco" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-[32ch] text-muted-foreground text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "ToZnoJ" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				nativeButton: false,
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/settings/integrations" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8ray6T" })
			})
		]
	});
}
function EmptyProposalState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-dashed bg-muted/20 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center gap-2 font-medium text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "4lxcv6" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-xs leading-relaxed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "X-Kc9o" })
		})]
	});
}
function ProposalApprovalCard({ item, index, total, isApplying, onAccept, onReject, onAcceptAll, onRejectAll, onPrevious, onNext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border bg-background shadow-sm ring-1 ring-primary/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 border-b bg-muted/20 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "rounded bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground",
										children: "propose_resume_patches"
									}), total > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
											id: "qYh77o",
											values: {
												0: index + 1,
												total
											}
										})
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-semibold text-sm leading-snug",
									children: item.preview.title
								}),
								item.preview.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground text-xs leading-relaxed",
									children: item.preview.summary
								}) : null
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: item.stalePreview ? "destructive" : "secondary",
						children: item.stalePreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "11E_xw" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "zXY8th" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: item.preview.entries.map((entry, entryIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: entry.operationLabel
					}, `${entry.path}-${entryIndex}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[310px] space-y-3 overflow-y-auto p-3",
				children: [item.preview.entries.map((entry, entryIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 rounded-md border bg-muted/20 p-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-xs",
							children: entry.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "max-w-[55%] truncate rounded bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground",
							children: entry.path
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-[11px] text-muted-foreground uppercase tracking-normal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EmSrGB" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "max-h-28 overflow-auto whitespace-pre-wrap rounded-md bg-background p-2 text-xs leading-relaxed",
							children: formatPreviewValue(entry.before)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-[11px] text-muted-foreground uppercase tracking-normal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "NawEr2" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "max-h-28 overflow-auto whitespace-pre-wrap rounded-md bg-background p-2 text-xs leading-relaxed",
							children: formatPreviewValue(entry.after)
						})] })]
					})]
				}, `${entry.path}-${entryIndex}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "rounded-md border bg-muted/20 p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "cursor-pointer font-medium text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "fxtl7T" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-2 max-h-44 overflow-auto rounded bg-background p-2 text-[11px]",
						children: JSON.stringify(item.proposal.operations, null, 2)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center gap-2 border-t p-3", total > 1 ? "justify-between" : "justify-end"),
				children: [total > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "xs",
						variant: "outline",
						disabled: index === 0 || isApplying,
						onClick: onPrevious,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "PvprFB" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "xs",
						variant: "outline",
						disabled: index >= total - 1 || isApplying,
						onClick: onNext,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hXzOVo" })
					})]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitDecisionButton, {
						variant: "outline",
						disabled: isApplying,
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1t_NnN" }),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {}),
						menuLabel: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "U3vzz-" }),
						onClick: onReject,
						onMenuClick: onRejectAll
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitDecisionButton, {
						disabled: isApplying,
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "g3UF2V" }),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$2, {}),
						menuLabel: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "PHWHEO" }),
						onClick: onAccept,
						onMenuClick: onAcceptAll
					})]
				})]
			})
		]
	});
}
function SplitDecisionButton({ label, menuLabel, icon, disabled, variant = "default", onClick, onMenuClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		size: "sm",
		variant,
		disabled,
		onClick,
		children: [icon, label]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		size: "icon-sm",
		variant,
		disabled,
		"aria-label": i18n._({ id: "RPad4A" }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {})
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "end",
		side: "top",
		sideOffset: 8,
		positionerClassName: "z-[80]",
		className: "min-w-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
			onClick: onMenuClick,
			children: menuLabel
		})
	})] })] });
}
function AssistantThinkingBubble({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-[86%] items-center gap-2 rounded-lg bg-muted px-3 py-2 text-muted-foreground text-sm",
			role: "status",
			"aria-live": "polite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status === "submitted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "aVkEUi" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "agd7kV" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-bounce rounded-full bg-current [animation-delay:0ms]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-bounce rounded-full bg-current [animation-delay:120ms]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-bounce rounded-full bg-current [animation-delay:240ms]" })
				]
			})]
		})
	});
}
function AssistantErrorBubble({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[86%] rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-destructive text-sm",
			role: "alert",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$3, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "RKZeXk" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-destructive/80 text-xs leading-relaxed",
				children: error?.message?.trim() || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "qCj15X" })
			})]
		})
	});
}
function AssistantTimelineItem({ message, proposal, resolutions, proposalIndex, proposalTotal, isApplying, onAcceptProposal, onRejectProposal, onAcceptAllProposals, onRejectAllProposals, onPreviousProposal, onNextProposal }) {
	const hasVisibleText = message.parts.some((part) => part.type === "text" && part.text.trim());
	if (!hasVisibleText && !proposal && resolutions.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [hasVisibleText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantMessage, { message }) : null, proposal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalApprovalCard, {
			item: proposal,
			index: proposalIndex,
			total: proposalTotal,
			isApplying,
			onAccept: onAcceptProposal,
			onReject: onRejectProposal,
			onAcceptAll: onAcceptAllProposals,
			onRejectAll: onRejectAllProposals,
			onPrevious: onPreviousProposal,
			onNext: onNextProposal
		}) : resolutions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalResolutionBubble, { resolutions }) : null]
	});
}
function ProposalResolutionBubble({ resolutions }) {
	const acceptedCount = resolutions.filter((resolution) => resolution.status === "accepted").length;
	const rejectedCount = resolutions.length - acceptedCount;
	const label = acceptedCount > 0 && rejectedCount > 0 ? i18n._({ id: "MBq-hL" }) : acceptedCount > 0 ? i18n._({ id: "JShoXu" }) : i18n._({ id: "vsCGHQ" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-[86%] items-start gap-2 rounded-lg border bg-muted/35 px-3 py-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full", acceptedCount > 0 && rejectedCount === 0 ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"),
				children: acceptedCount > 0 && rejectedCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$2, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, { className: "size-3.5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "rounded bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground",
						children: "propose_resume_patches"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-muted-foreground text-xs",
					children: resolutions.length === 1 ? resolutions[0]?.title : i18n._({
						id: "lM4459",
						values: { 0: resolutions.length }
					})
				})]
			})]
		})
	});
}
function AssistantMessage({ message }) {
	const isUser = message.role === "user";
	const textParts = message.parts.filter((part) => part.type === "text");
	if (textParts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex", isUser ? "justify-end" : "justify-start"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("max-w-[86%] space-y-2 rounded-lg px-3 py-2 text-sm", isUser ? "bg-primary text-primary-foreground selection:bg-background/80 selection:text-foreground" : "bg-muted text-foreground"),
			children: textParts.map((part, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap leading-relaxed",
				children: part.text
			}, index))
		})
	});
}
function BuilderHeader() {
	const resume = useCurrentResume();
	const name = resume.name;
	const isLocked = resume.isLocked;
	const toggleSidebar = useBuilderSidebar((state) => state.toggleSidebar);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b bg-popover px-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				size: "icon",
				variant: "ghost",
				onClick: () => toggleSidebar("left"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VPHGql" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-x-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "icon",
						variant: "ghost",
						"aria-label": i18n._({ id: "UZQeRr" }),
						nativeButton: false,
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard/resumes",
							search: {
								sort: "lastUpdatedAt",
								tags: []
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$4, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "me-2.5 text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "flex-1 truncate font-medium",
						children: name
					}),
					isLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$4, { className: "ms-2 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderHeaderDropdown, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				size: "icon",
				variant: "ghost",
				onClick: () => toggleSidebar("right"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$3, { className: "-scale-x-100" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "JLtpxO" })
				})]
			})
		]
	});
}
function BuilderHeaderDropdown() {
	const confirm = useConfirm();
	const navigate = useNavigate();
	const { openDialog } = useDialogStore();
	const resume = useCurrentResume();
	const patchResume = usePatchResume();
	const id = resume.id;
	const name = resume.name;
	const slug = resume.slug;
	const tags = resume.tags;
	const isLocked = resume.isLocked;
	const { mutate: deleteResume } = useMutation(orpc.resume.delete.mutationOptions());
	const { mutate: setLockedResume } = useMutation(orpc.resume.setLocked.mutationOptions());
	const handleUpdate = () => {
		openDialog("resume.update", {
			id,
			name,
			slug,
			tags
		});
	};
	const handleDuplicate = () => {
		openDialog("resume.duplicate", {
			id,
			name,
			slug,
			tags,
			shouldRedirect: true
		});
	};
	const handleToggleLock = async () => {
		if (!isLocked) {
			if (!await confirm(i18n._({ id: "lRniaN" }), { description: i18n._({ id: "TeAHhB" }) })) return;
		}
		setLockedResume({
			id,
			isLocked: !isLocked
		}, {
			onSuccess: () => {
				patchResume((draft) => {
					draft.isLocked = !isLocked;
				});
			},
			onError: (error) => {
				toast.error(getResumeErrorMessage(error));
			}
		});
	};
	const handleDelete = async () => {
		if (!await confirm(i18n._({ id: "phpS3e" }), { description: i18n._({ id: "2xOCJW" }) })) return;
		const toastId = toast.loading(i18n._({ id: "X8fXNy" }));
		deleteResume({ id }, {
			onSuccess: () => {
				toast.success(i18n._({ id: "mW-9mo" }), { id: toastId });
				navigate({
					to: "/dashboard/resumes",
					search: {
						sort: "lastUpdatedAt",
						tags: []
					}
				});
			},
			onError: (error) => {
				toast.error(getResumeErrorMessage(error), { id: toastId });
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		size: "icon",
		variant: "ghost",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {})
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			disabled: isLocked,
			onClick: handleUpdate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, { className: "me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EkH9pt" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: handleDuplicate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$5, { className: "me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "euc6Ns" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: handleToggleLock,
			children: [isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$5, { className: "me-2" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$4, { className: "me-2" }), isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VAOn4r" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "HD2Tiz" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			variant: "destructive",
			disabled: isLocked,
			onClick: handleDelete,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$6, { className: "me-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cnGeoo" })]
		})
	] })] });
}
var leftSidebarSections = [
	"picture",
	"basics",
	"summary",
	"profiles",
	"experience",
	"education",
	"projects",
	"skills",
	"languages",
	"interests",
	"awards",
	"certifications",
	"publications",
	"volunteer",
	"references",
	"custom"
];
var rightSidebarSections = [
	"template",
	"layout",
	"typography",
	"design",
	"page",
	"notes",
	"sharing",
	"statistics",
	"analysis",
	"export",
	"information"
];
var getSectionTitle = (type) => {
	return M(type).with("picture", () => i18n._({ id: "N0-GsR" })).with("basics", () => i18n._({ id: "ehOkF-" })).with("summary", () => i18n._({ id: "dXoieq" })).with("profiles", () => i18n._({ id: "vrQQgz" })).with("experience", () => i18n._({ id: "bKBhgb" })).with("education", () => i18n._({ id: "aqxYLv" })).with("projects", () => i18n._({ id: "-0B-ue" })).with("skills", () => i18n._({ id: "PCSkw2" })).with("languages", () => i18n._({ id: "GAmD3h" })).with("interests", () => i18n._({ id: "65VN7K" })).with("awards", () => i18n._({ id: "oosprE" })).with("certifications", () => i18n._({ id: "DqE4jO" })).with("publications", () => i18n._({ id: "XHw75Y" })).with("volunteer", () => i18n._({ id: "ylsyyq" })).with("references", () => i18n._({ id: "9aloPG" })).with("custom", () => i18n._({ id: "3p1sh0" })).with("cover-letter", () => i18n._({ id: "Z6ATpr" })).with("template", () => i18n._({ id: "_K2CvV" })).with("layout", () => i18n._({ id: "rdU729" })).with("typography", () => i18n._({ id: "nWRfmt" })).with("design", () => i18n._({ id: "f8fH8W" })).with("page", () => i18n._({ id: "6WdDG7" })).with("notes", () => i18n._({ id: "1DBGsz" })).with("sharing", () => i18n._({ id: "QJX5AO" })).with("statistics", () => i18n._({ id: "2NbyY_" })).with("analysis", () => i18n._({ id: "oHLy3W" })).with("export", () => i18n._({ id: "GS-Mus" })).with("information", () => i18n._({ id: "nSkB8g" })).exhaustive();
};
var getSectionIcon = (type, props) => {
	const iconProps = {
		...props,
		className: cn("shrink-0", props?.className)
	};
	return M(type).with("picture", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$7, { ...iconProps })).with("basics", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$8, { ...iconProps })).with("summary", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$9, { ...iconProps })).with("profiles", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$10, { ...iconProps })).with("experience", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$11, { ...iconProps })).with("education", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$12, { ...iconProps })).with("projects", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$13, { ...iconProps })).with("skills", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, { ...iconProps })).with("languages", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$6, { ...iconProps })).with("interests", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$1, { ...iconProps })).with("awards", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$1, { ...iconProps })).with("certifications", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$2, { ...iconProps })).with("publications", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$7, { ...iconProps })).with("volunteer", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$8, { ...iconProps })).with("references", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$9, { ...iconProps })).with("custom", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$2, { ...iconProps })).with("cover-letter", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$14, { ...iconProps })).with("template", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$3, { ...iconProps })).with("layout", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$3, { ...iconProps })).with("typography", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$15, { ...iconProps })).with("design", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$4, { ...iconProps })).with("page", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$10, { ...iconProps })).with("notes", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$11, { ...iconProps })).with("sharing", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$12, { ...iconProps })).with("statistics", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$16, { ...iconProps })).with("analysis", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$4, { ...iconProps })).with("export", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a$1, { ...iconProps })).with("information", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$13, { ...iconProps })).exhaustive();
};
function BuilderSidebarEdge({ side, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("absolute inset-y-0 hidden min-h-0 w-12 flex-col items-center overflow-hidden bg-popover py-2.5 sm:flex", side === "left" ? "inset-s-0 border-r" : "inset-e-0 border-l"),
		children
	});
}
var useSectionStore = create()(persist(immer((set) => ({
	sections: {},
	setCollapsed: (id, collapsed) => {
		set((state) => {
			state.sections[id] = { collapsed };
		});
	},
	toggleCollapsed: (id) => {
		set((state) => {
			const current = state.sections[id]?.collapsed ?? false;
			state.sections[id] = { collapsed: !current };
		});
	},
	toggleAll: () => {
		set((state) => {
			[...leftSidebarSections, ...rightSidebarSections].forEach((id) => {
				const current = state.sections[id]?.collapsed ?? false;
				state.sections[id] = { collapsed: !current };
			});
		});
	}
})), {
	name: "section-store",
	storage: createJSONStorage(() => localStorage),
	partialize: (state) => ({ sections: state.sections })
}));
function SectionDropdownMenu({ type }) {
	const prompt = usePrompt();
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const updateResumeData = useUpdateResumeData();
	const resume = useCurrentResume();
	const section = type === "summary" ? resume.data.summary : resume.data.sections[type];
	const onAddItem = () => {
		if (type === "summary") return;
		openDialog(`resume.sections.${type}.create`, void 0);
	};
	const onToggleVisibility = () => {
		updateResumeData((draft) => {
			if (type === "summary") draft.summary.hidden = !draft.summary.hidden;
			else draft.sections[type].hidden = !draft.sections[type].hidden;
		});
	};
	const onRenameSection = async () => {
		const newTitle = await prompt(i18n._({ id: "iExfqZ" }), {
			description: i18n._({ id: "SnHJLz" }),
			defaultValue: section.title
		});
		if (newTitle === null || newTitle === section.title) return;
		updateResumeData((draft) => {
			if (type === "summary") draft.summary.title = newTitle ?? "";
			else draft.sections[type].title = newTitle ?? "";
		});
	};
	const onSetColumns = (value) => {
		updateResumeData((draft) => {
			if (type === "summary") draft.summary.columns = Number.parseInt(value, 10);
			else draft.sections[type].columns = Number.parseInt(value, 10);
		});
	};
	const onReset = async () => {
		if (!await confirm(i18n._({ id: "9_oFO5" }), {
			description: i18n._({ id: "VHf1wX" }),
			confirmText: i18n._({ id: "OfhWJH" }),
			cancelText: i18n._({ id: "dEgA5A" })
		})) return;
		updateResumeData((draft) => {
			if (type === "summary") draft.summary.content = "";
			else draft.sections[type].items = [];
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		size: "icon",
		variant: "ghost",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$5, {})
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		children: [
			type !== "summary" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: onAddItem,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$14, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "rvNS8V" })]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuGroup, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: onToggleVisibility,
					children: [section.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$17, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$18, {}), section.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8vETh9" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vLyv1R" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: onRenameSection,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "2wxgft" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "jEu4bB" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioGroup, {
					value: section.columns.toString(),
					onValueChange: onSetColumns,
					children: [
						1,
						2,
						3,
						4,
						5,
						6
					].map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
						value: column.toString(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
							id: "rBk6aK",
							values: { column }
						})
					}, column))
				}) })] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				variant: "destructive",
				onClick: onReset,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$5, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "OfhWJH" })]
			}) })
		]
	})] });
}
function SectionBase$1({ type, className, ...props }) {
	const data = useCurrentResume().data;
	const section = type === "basics" ? data.basics : type === "summary" ? data.summary : type === "picture" ? data.picture : type === "custom" ? data.customSections : data.sections[type];
	const isHidden = "hidden" in section && section.hidden;
	const collapsed = useSectionStore((state) => state.sections[type]?.collapsed ?? false);
	const toggleCollapsed = useSectionStore((state) => state.toggleCollapsed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion$1, {
		id: `sidebar-${type}`,
		value: collapsed ? [] : [type],
		onValueChange: () => toggleCollapsed(type),
		className: cn("space-y-4", isHidden && "opacity-50"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
			value: type,
			className: "group/accordion-item space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "me-2 items-center justify-center",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "icon",
							variant: "ghost",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, { className: "transition-transform duration-200 group-data-closed/accordion-item:-rotate-90" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 items-center gap-x-4",
						children: [getSectionIcon(type), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "line-clamp-1 font-bold text-2xl tracking-tight",
							children: "title" in section && section.title || getSectionTitle(type)
						})]
					}),
					![
						"picture",
						"basics",
						"custom"
					].includes(type) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionDropdownMenu, { type })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
				className: cn("p-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className),
				...props
			})]
		})
	});
}
/**
* Checks if a section ID belongs to a standard section.
* Standard sections have predefined keys like "experience", "education", etc.
*/
function isStandardSectionId(sectionId) {
	return [
		"profiles",
		"experience",
		"education",
		"projects",
		"skills",
		"languages",
		"interests",
		"awards",
		"certifications",
		"publications",
		"volunteer",
		"references"
	].includes(sectionId);
}
/**
* Gets the title of a section.
* For standard sections, returns the localized default title.
* For custom sections, returns the user-defined title.
*
* @param resumeData - The resume data object
* @param type - The section type
* @param customSectionId - The custom section ID (if applicable)
* @returns The section title
*/
function getSourceSectionTitle(resumeData, type, customSectionId) {
	if (customSectionId) return resumeData.customSections.find((s) => s.id === customSectionId)?.title ?? getSectionTitle(type);
	return getSectionTitle(type);
}
/**
* Finds all compatible sections an item can be moved to.
* A section is compatible if it has the same type as the source section.
*
* @param resumeData - The resume data object
* @param sourceType - The type of the source section
* @param sourceSectionId - The ID of the source section (custom section ID or undefined for standard)
* @returns Array of pages with their compatible sections
*/
function getCompatibleMoveTargets(resumeData, sourceType, sourceSectionId) {
	const { pages } = resumeData.metadata.layout;
	const result = [];
	for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
		const page = pages[pageIndex];
		const allSectionIds = [...page.main, ...page.sidebar];
		const compatibleSections = [];
		for (const sectionId of allSectionIds) {
			if (sectionId === sourceSectionId || sourceSectionId === void 0 && sectionId === sourceType) continue;
			if (isStandardSectionId(sectionId) && sectionId === sourceType) {
				compatibleSections.push({
					sectionId,
					sectionTitle: getSectionTitle(sectionId),
					isStandard: true
				});
				continue;
			}
			const customSection = resumeData.customSections.find((s) => s.id === sectionId);
			if (customSection && customSection.type === sourceType) compatibleSections.push({
				sectionId: customSection.id,
				sectionTitle: customSection.title,
				isStandard: false
			});
		}
		result.push({
			pageIndex,
			sections: compatibleSections
		});
	}
	return result;
}
/**
* Removes an item from its source section (standard or custom).
*
* @param draft - The immer draft of resume data
* @param itemId - The ID of the item to remove
* @param type - The section type
* @param customSectionId - The custom section ID (if applicable)
* @returns The removed item, or null if not found
*/
function removeItemFromSource(draft, itemId, type, customSectionId) {
	if (customSectionId) {
		const section = draft.customSections.find((s) => s.id === customSectionId);
		if (!section) return null;
		const index = section.items.findIndex((item) => item.id === itemId);
		if (index === -1) return null;
		const [removed] = section.items.splice(index, 1);
		return removed;
	}
	const section = draft.sections[type];
	if (!("items" in section)) return null;
	const index = section.items.findIndex((item) => item.id === itemId);
	if (index === -1) return null;
	const [removed] = section.items.splice(index, 1);
	return removed;
}
/**
* Adds an item to a target section.
*
* @param draft - The immer draft of resume data
* @param item - The item to add
* @param targetSectionId - The target section ID
* @param type - The section type
*/
function addItemToSection(draft, item, targetSectionId, type) {
	if (isStandardSectionId(targetSectionId) && targetSectionId === type) {
		const section = draft.sections[type];
		if ("items" in section) section.items.push(item);
		return;
	}
	const customSection = draft.customSections.find((s) => s.id === targetSectionId);
	if (customSection) customSection.items.push(item);
}
/**
* Creates a new custom section with the given item and adds it to the specified page.
*
* @param draft - The immer draft of resume data
* @param item - The item to add to the new section
* @param type - The section type for the new custom section
* @param sectionTitle - The title for the new custom section
* @param targetPageIndex - The page index to add the section to
* @returns The ID of the newly created custom section
*/
function createCustomSectionWithItem(draft, item, type, sectionTitle, targetPageIndex) {
	const newSectionId = generateId();
	const newSection = {
		id: newSectionId,
		type,
		title: sectionTitle,
		columns: 1,
		hidden: false,
		items: [item]
	};
	draft.customSections.push(newSection);
	const page = draft.metadata.layout.pages[targetPageIndex];
	if (page) page.main.push(newSectionId);
	return newSectionId;
}
/**
* Creates a new page with a custom section containing the given item.
*
* @param draft - The immer draft of resume data
* @param item - The item to add to the new section
* @param type - The section type for the new custom section
* @param sectionTitle - The title for the new custom section
*/
function createPageWithSection(draft, item, type, sectionTitle) {
	const newSectionId = generateId();
	const newSection = {
		id: newSectionId,
		type,
		title: sectionTitle,
		columns: 1,
		hidden: false,
		items: [item]
	};
	draft.customSections.push(newSection);
	draft.metadata.layout.pages.push({
		fullWidth: false,
		main: [newSectionId],
		sidebar: []
	});
}
/**
* Submenu component for moving items between sections/pages.
* Displays compatible targets grouped by page with options to:
* - Move to existing compatible section
* - Create new section on existing page
* - Create new page with new section
*/
function MoveItemSubmenu({ type, item, customSectionId }) {
	const resume = useCurrentResume();
	const updateResumeData = useUpdateResumeData();
	/** Compute compatible move targets grouped by page */
	const moveTargets = (0, import_react.useMemo)(() => getCompatibleMoveTargets(resume.data, type, customSectionId), [
		resume,
		type,
		customSectionId
	]);
	/** Get the current section's title (used when creating new sections) */
	const currentSectionTitle = (0, import_react.useMemo)(() => getSourceSectionTitle(resume.data, type, customSectionId), [
		resume,
		type,
		customSectionId
	]);
	/** Handler: Move item to an existing section */
	const handleMoveToSection = (targetSectionId) => {
		updateResumeData((draft) => {
			const removedItem = removeItemFromSource(draft, item.id, type, customSectionId);
			if (!removedItem) return;
			addItemToSection(draft, removedItem, targetSectionId, type);
		});
	};
	/** Handler: Create a new custom section on an existing page and move the item there */
	const handleNewSectionOnPage = (pageIndex) => {
		updateResumeData((draft) => {
			const removedItem = removeItemFromSource(draft, item.id, type, customSectionId);
			if (!removedItem) return;
			createCustomSectionWithItem(draft, removedItem, type, currentSectionTitle, pageIndex);
		});
	};
	/** Handler: Create a new page with a new custom section and move the item there */
	const handleNewPage = () => {
		updateResumeData((draft) => {
			const removedItem = removeItemFromSource(draft, item.id, type, customSectionId);
			if (!removedItem) return;
			createPageWithSection(draft, removedItem, type, currentSectionTitle);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$6, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "mcfB2A" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubContent, { children: [
		moveTargets.map(({ pageIndex, sections }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$19, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
			id: "tdta9X",
			values: { 0: pageIndex + 1 }
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubContent, { children: [
			sections.map(({ sectionId, sectionTitle }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				onClick: () => handleMoveToSection(sectionId),
				children: sectionTitle
			}, sectionId)),
			sections.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => handleNewSectionOnPage(pageIndex),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$15, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1_wEJt" })]
			})
		] })] }, pageIndex)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: handleNewPage,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$20, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "GrZ6fH" })]
		})
	] })] });
}
function SectionItem({ type, item, title, subtitle, customSectionId }) {
	const confirm = useConfirm();
	const controls = useDragControls();
	const { openDialog } = useDialogStore();
	const updateResumeData = useUpdateResumeData();
	const onToggleVisibility = () => {
		updateResumeData((draft) => {
			if (customSectionId) {
				const section = draft.customSections.find((s) => s.id === customSectionId);
				if (!section) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items[index].hidden = !section.items[index].hidden;
			} else {
				const section = draft.sections[type];
				if (!("items" in section)) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items[index].hidden = !section.items[index].hidden;
			}
		});
	};
	const onUpdate = () => {
		openDialog(`resume.sections.${type}.update`, {
			item,
			customSectionId
		});
	};
	const onDuplicate = () => {
		openDialog(`resume.sections.${type}.create`, {
			item,
			customSectionId
		});
	};
	const onDelete = async () => {
		if (!await confirm(i18n._({ id: "XtpCjZ" }), {
			confirmText: i18n._({ id: "cnGeoo" }),
			cancelText: i18n._({ id: "dEgA5A" })
		})) return;
		updateResumeData((draft) => {
			if (customSectionId) {
				const section = draft.customSections.find((s) => s.id === customSectionId);
				if (!section) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items.splice(index, 1);
			} else {
				const section = draft.sections[type];
				if (!("items" in section)) return;
				const index = section.items.findIndex((_item) => _item.id === item.id);
				if (index === -1) return;
				section.items.splice(index, 1);
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReorderItem, {
		value: item,
		dragListener: false,
		dragControls: controls,
		initial: {
			opacity: 0,
			y: -8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -8
		},
		transition: {
			duration: .16,
			ease: "easeOut"
		},
		className: "group relative flex h-18 select-none border-b will-change-[transform,opacity]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex cursor-ns-resize touch-none items-center px-1.5 opacity-40 transition-[background-color,opacity] hover:bg-secondary/40 group-hover:opacity-100",
				onPointerDown: (e) => {
					e.preventDefault();
					controls.start(e);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$6, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onUpdate,
				className: cn("flex flex-1 flex-col items-start justify-center space-y-0.5 ps-1.5 text-start opacity-100 transition-opacity hover:bg-secondary/40 focus:outline-none focus-visible:ring-1", item.hidden && "opacity-50"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "line-clamp-1 font-medium",
					children: title
				}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "line-clamp-1 text-muted-foreground text-xs",
					children: subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				className: "flex cursor-context-menu items-center px-1.5 opacity-40 transition-[background-color,opacity] hover:bg-secondary/40 focus:outline-none focus-visible:ring-1 group-hover:opacity-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$21, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: onToggleVisibility,
						children: [item.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$17, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$18, {}), item.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8vETh9" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vLyv1R" })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuGroup, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: onUpdate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EkH9pt" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: onDuplicate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$5, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "euc6Ns" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoveItemSubmenu, {
							type,
							item,
							customSectionId
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						variant: "destructive",
						onClick: onDelete,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$6, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cnGeoo" })]
					}) })
				]
			})] })
		]
	}, item.id);
}
function SectionAddItemButton({ type, customSectionId, className, children, ...props }) {
	const { openDialog } = useDialogStore();
	const handleAdd = () => {
		if (type === "custom") openDialog("resume.sections.custom.create", void 0);
		else openDialog(`resume.sections.${type}.create`, customSectionId ? { customSectionId } : void 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		variant: "ghost",
		onClick: handleAdd,
		className: cn("h-12 w-full justify-start rounded-t-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$14, {}), children]
	});
}
function AwardsSectionBuilder() {
	const section = useCurrentResume().data.sections.awards;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.awards.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "awards",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "awards",
				item,
				title: item.title,
				subtitle: item.awarder
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "awards",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "FKYYW1" })
		})]
	});
}
function useSyncFormValues(form, values) {
	(0, import_react.useEffect)(() => {
		if (isEqual(form.state.values, values)) return;
		form.reset(values);
	}, [form, values]);
}
var CustomFieldsSection = withForm({
	defaultValues: {
		name: "",
		headline: "",
		email: "",
		phone: "",
		location: "",
		website: {
			url: "",
			label: ""
		},
		customFields: []
	},
	render: ({ form }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
			name: "customFields",
			mode: "array",
			children: (customFieldsField) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReorderGroup, {
				className: "touch-none space-y-4",
				values: customFieldsField.state.value,
				onReorder: (fields) => {
					customFieldsField.setValue(fields);
					form.handleSubmit();
				},
				children: [customFieldsField.state.value.map((field, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CustomFieldItem, {
					field,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: `customFields[${index}].icon`,
							children: (iconField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItem, {
								className: "shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPicker, {
									name: iconField.name,
									value: iconField.state.value,
									className: "rounded-r-none! border-e-0!",
									onChange: (icon) => {
										iconField.handleChange(icon);
										form.handleSubmit();
									}
								}) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: `customFields[${index}].text`,
							children: (textField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItem, {
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									name: textField.name,
									value: textField.state.value,
									className: "rounded-l-none!",
									onChange: (e) => {
										textField.handleChange(e.target.value);
										form.handleSubmit();
									}
								}) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: `customFields[${index}].link`,
							children: (linkField) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "icon",
								variant: "ghost",
								className: "ms-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$16, {})
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								align: "center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: linkField.name,
										className: "text-muted-foreground text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "iIJL5x" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										type: "url",
										value: linkField.state.value,
										id: linkField.name,
										placeholder: i18n._({ id: "uzYSHe" }),
										onChange: (e) => {
											linkField.handleChange(e.target.value);
											form.handleSubmit();
										}
									})]
								})
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "icon",
							variant: "ghost",
							onClick: () => {
								customFieldsField.removeValue(index);
								form.handleSubmit();
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {})
						})
					]
				}, field.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "ghost",
					onClick: () => {
						customFieldsField.pushValue({
							id: generateId(),
							icon: "acorn",
							text: "",
							link: ""
						});
						form.handleSubmit();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "77JB0Z" })]
				})]
			})
		});
	}
});
function CustomFieldItem({ field, children }) {
	const controls = useDragControls();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReorderItem, {
		value: field,
		dragListener: false,
		dragControls: controls,
		initial: {
			opacity: 0,
			y: -10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "flex touch-none items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			size: "icon",
			variant: "ghost",
			className: "me-2 touch-none",
			onPointerDown: (e) => {
				e.preventDefault();
				controls.start(e);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$6, {})
		}), children]
	}, field.id);
}
function BasicsSectionBuilder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBase$1, {
		type: "basics",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BasicsSectionForm, {})
	});
}
var formSchema$3 = basicsSchema;
function BasicsSectionForm() {
	const basics = useCurrentBuilderResumeSelector((resume) => resume.data.basics);
	const updateResumeData = useUpdateResumeData();
	const persist = (data) => {
		updateResumeData((draft) => {
			draft.basics = data;
		});
	};
	const form = useAppForm({
		defaultValues: basics,
		validators: { onChange: formSchema$3 },
		onSubmit: ({ value }) => {
			persist(value);
		}
	});
	useSyncFormValues(form, basics);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "name",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "6YtxFj" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							name: field.name,
							value: field.state.value,
							onBlur: field.handleBlur,
							onChange: (e) => {
								field.handleChange(e.target.value);
								form.handleSubmit();
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "headline",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "-670Zw" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							name: field.name,
							value: field.state.value,
							onBlur: field.handleBlur,
							onChange: (e) => {
								field.handleChange(e.target.value);
								form.handleSubmit();
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "email",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "O3oNi5" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							type: "email",
							name: field.name,
							value: field.state.value,
							onBlur: field.handleBlur,
							onChange: (e) => {
								field.handleChange(e.target.value);
								form.handleSubmit();
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "phone",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "zmwvG2" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							name: field.name,
							value: field.state.value,
							onBlur: field.handleBlur,
							onChange: (e) => {
								field.handleChange(e.target.value);
								form.handleSubmit();
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "location",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "wJijgU" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							name: field.name,
							value: field.state.value,
							onBlur: field.handleBlur,
							onChange: (e) => {
								field.handleChange(e.target.value);
								form.handleSubmit();
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "website",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "On0aF2" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(URLInput, {
							name: field.name,
							value: field.state.value,
							onChange: (value) => {
								field.handleChange(value);
								form.handleSubmit();
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomFieldsSection, { form })
		]
	});
}
function CertificationsSectionBuilder() {
	const section = useCurrentResume().data.sections.certifications;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.certifications.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "certifications",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "certifications",
				item,
				title: item.title,
				subtitle: [item.issuer, item.date].filter(Boolean).join(" • ") || void 0
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "certifications",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "YWqdgB" })
		})]
	});
}
function getItemTitle(type, item) {
	return M(type).with("summary", () => {
		if ("content" in item) {
			const stripped = stripHtml(item.content);
			return stripped.length > 50 ? `${stripped.slice(0, 50)}...` : stripped || i18n._({ id: "dXoieq" });
		}
		return i18n._({ id: "dXoieq" });
	}).with("profiles", () => "network" in item ? item.network : "").with("experience", () => "company" in item ? item.company : "").with("education", () => "school" in item ? item.school : "").with("projects", () => "name" in item ? item.name : "").with("skills", () => "name" in item ? item.name : "").with("languages", () => "language" in item ? item.language : "").with("interests", () => "name" in item ? item.name : "").with("awards", () => "title" in item ? item.title : "").with("certifications", () => "title" in item ? item.title : "").with("publications", () => "title" in item ? item.title : "").with("volunteer", () => "organization" in item ? item.organization : "").with("references", () => "name" in item ? item.name : "").with("cover-letter", () => {
		if ("recipient" in item) {
			const stripped = stripHtml(item.recipient);
			return stripped.length > 50 ? `${stripped.slice(0, 50)}...` : stripped || i18n._({ id: "Z6ATpr" });
		}
		return i18n._({ id: "Z6ATpr" });
	}).exhaustive();
}
function getItemSubtitle(type, item) {
	return M(type).with("summary", () => void 0).with("profiles", () => "username" in item ? item.username : void 0).with("experience", () => "position" in item ? item.position : void 0).with("education", () => "degree" in item ? item.degree : void 0).with("projects", () => "period" in item ? item.period : void 0).with("skills", () => "proficiency" in item ? item.proficiency : void 0).with("languages", () => "fluency" in item ? item.fluency : void 0).with("interests", () => void 0).with("awards", () => "awarder" in item ? item.awarder : void 0).with("certifications", () => "issuer" in item ? item.issuer : void 0).with("publications", () => "publisher" in item ? item.publisher : void 0).with("volunteer", () => "period" in item ? item.period : void 0).with("references", () => void 0).with("cover-letter", () => {
		if ("content" in item) {
			const stripped = stripHtml(item.content);
			return stripped.length > 50 ? `${stripped.slice(0, 50)}...` : stripped || void 0;
		}
	}).exhaustive();
}
function CustomSectionBuilder() {
	const customSections = useCurrentResume().data.customSections;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "custom",
		className: cn("space-y-4", customSections.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: customSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomSectionContainer, { section }, section.id)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "custom",
			variant: "outline",
			className: "rounded-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "NIRRxa" })
		})]
	});
}
function CustomSectionContainer({ section }) {
	const { openDialog } = useDialogStore();
	const updateResumeData = useUpdateResumeData();
	const onUpdateSection = () => {
		openDialog("resume.sections.custom.update", section);
	};
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((_section) => _section.id === section.id);
			if (sectionIndex === -1) return;
			draft.customSections[sectionIndex].items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group flex select-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onUpdateSection,
					className: cn("flex flex-1 flex-col items-start justify-center space-y-0.5 p-4 text-start transition-opacity hover:bg-secondary/40 focus:outline-none focus-visible:ring-1", section.hidden && "opacity-50"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "mb-1.5 rounded-md",
							children: getSectionTitle(section.type)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "line-clamp-1 text-wrap font-medium text-base",
							children: section.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
								id: "6ki7F2",
								values: { 0: section.items.length }
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomSectionDropdownMenu, { section })]
			}),
			section.items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("border-t", section.hidden && "opacity-50"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
					axis: "y",
					values: section.items,
					onReorder: handleReorder,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
						type: section.type,
						item,
						customSectionId: section.id,
						title: getItemTitle(section.type, item),
						subtitle: getItemSubtitle(section.type, item)
					}, item.id)) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
					type: section.type,
					customSectionId: section.id,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "rvNS8V" })
				})
			})
		]
	});
}
function CustomSectionDropdownMenu({ section }) {
	const confirm = useConfirm();
	const { openDialog } = useDialogStore();
	const updateResumeData = useUpdateResumeData();
	const onToggleSectionVisibility = () => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((_section) => _section.id === section.id);
			if (sectionIndex === -1) return;
			draft.customSections[sectionIndex].hidden = !draft.customSections[sectionIndex].hidden;
		});
	};
	const onUpdateSection = () => {
		openDialog("resume.sections.custom.update", section);
	};
	const onDuplicateSection = () => {
		openDialog("resume.sections.custom.create", section);
	};
	const onSetColumns = (value) => {
		updateResumeData((draft) => {
			const sectionIndex = draft.customSections.findIndex((_section) => _section.id === section.id);
			if (sectionIndex === -1) return;
			draft.customSections[sectionIndex].columns = Number.parseInt(value, 10);
		});
	};
	const onDeleteSection = async () => {
		if (!await confirm(i18n._({ id: "U2gum_" }), {
			confirmText: i18n._({ id: "cnGeoo" }),
			cancelText: i18n._({ id: "dEgA5A" })
		})) return;
		updateResumeData((draft) => {
			draft.customSections = draft.customSections.filter((_section) => _section.id !== section.id);
			draft.metadata.layout.pages = draft.metadata.layout.pages.map((page) => ({
				...page,
				main: page.main.filter((id) => id !== section.id),
				sidebar: page.sidebar.filter((id) => id !== section.id)
			}));
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$21, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuGroup, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: onToggleSectionVisibility,
					children: [section.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$17, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$18, {}), section.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8vETh9" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vLyv1R" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: onUpdateSection,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EkH9pt" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: onDuplicateSection,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$5, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "euc6Ns" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "jEu4bB" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioGroup, {
					value: section.columns.toString(),
					onValueChange: onSetColumns,
					children: [
						1,
						2,
						3,
						4,
						5,
						6
					].map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
						value: column.toString(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
							id: "rBk6aK",
							values: { column }
						})
					}, column))
				}) })] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				variant: "destructive",
				onClick: onDeleteSection,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$6, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cnGeoo" })]
			}) })
		]
	})] });
}
function EducationSectionBuilder() {
	const section = useCurrentResume().data.sections.education;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.education.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "education",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "education",
				item,
				title: item.school,
				subtitle: item.degree
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "education",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "qRrfdD" })
		})]
	});
}
function ExperienceSectionBuilder() {
	const section = useCurrentResume().data.sections.experience;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.experience.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "experience",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				initial: false,
				mode: "popLayout",
				children: section.items.map((item) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
						type: "experience",
						item,
						title: item.company,
						subtitle: item.position || i18n._({
							id: "uNWja8",
							values: { 0: item.roles.length }
						})
					}, item.id);
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "experience",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "flhYjS" })
		})]
	});
}
function InterestsSectionBuilder() {
	const section = useCurrentResume().data.sections.interests;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.interests.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "interests",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "interests",
				item,
				title: item.name
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "interests",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "QIJa3o" })
		})]
	});
}
function LanguagesSectionBuilder() {
	const section = useCurrentResume().data.sections.languages;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.languages.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "languages",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "languages",
				item,
				title: item.language,
				subtitle: item.fluency
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "languages",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "WpnLrW" })
		})]
	});
}
function PictureSectionBuilder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBase$1, {
		type: "picture",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PictureSectionForm, {})
	});
}
function normalizePictureUrl(url, origin) {
	if (!url) return url;
	if (url.startsWith("/uploads/")) return `/api${url}`;
	try {
		const parsed = new URL(url, origin);
		if (parsed.origin !== origin) return url;
		if (!parsed.pathname.startsWith("/uploads/")) return url;
		return `/api${parsed.pathname}${parsed.search}${parsed.hash}`;
	} catch {
		return url;
	}
}
function PictureSectionForm() {
	const fileInputRef = (0, import_react.useRef)(null);
	const appOrigin = typeof window === "undefined" ? "" : window.location.origin;
	const picture = useCurrentResume().data.picture;
	const normalizedPictureUrl = normalizePictureUrl(picture.url, appOrigin);
	const [pictureSrc, setPictureSrc] = (0, import_react.useState)("");
	const updateResumeData = useUpdateResumeData();
	const { mutate: uploadFile } = useMutation(orpc.storage.uploadFile.mutationOptions({ meta: { noInvalidate: true } }));
	const { mutate: deleteFile } = useMutation(orpc.storage.deleteFile.mutationOptions({ meta: { noInvalidate: true } }));
	const persist = (data) => {
		updateResumeData((draft) => {
			draft.picture = data;
		});
	};
	const form = useAppForm({
		defaultValues: picture,
		validators: { onChange: pictureSchema },
		onSubmit: ({ value }) => {
			persist(value);
		}
	});
	useSyncFormValues(form, picture);
	const handleAutoSave = () => {
		persist(form.state.values);
	};
	const onSelectPicture = () => {
		if (!fileInputRef.current) return;
		fileInputRef.current?.click();
	};
	const onDeletePicture = () => {
		if (!picture.url) return;
		const appOrigin = window.location.origin;
		const pictureUrl = new URL(picture.url, appOrigin);
		const pictureOrigin = pictureUrl.origin;
		const filename = pictureUrl.pathname.split("/").pop();
		if (!filename) return;
		if (pictureOrigin === appOrigin) deleteFile({ filename });
		form.setFieldValue("url", "");
		handleAutoSave();
	};
	const onUploadPicture = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const toastId = toast.loading(i18n._({ id: "Z8hRbz" }));
		uploadFile(file, {
			onSuccess: ({ url }) => {
				form.setFieldValue("url", url);
				handleAutoSave();
				toast.dismiss(toastId);
				if (fileInputRef.current) fileInputRef.current.value = "";
			},
			onError: (error) => {
				toast.error(getReadableErrorMessage(error, i18n._({ id: "VKWpPT" })), { id: toastId });
			}
		});
	};
	(0, import_react.useEffect)(() => {
		if (!normalizedPictureUrl) {
			setPictureSrc("");
			return;
		}
		const controller = new AbortController();
		let objectUrl = "";
		fetch(normalizedPictureUrl, { signal: controller.signal }).then(async (response) => {
			if (!response.ok) throw new Error(`Failed to fetch image: ${response.status}`);
			const blob = await response.blob();
			objectUrl = URL.createObjectURL(blob);
			setPictureSrc(objectUrl);
		}).catch(() => {
			if (controller.signal.aborted) return;
			setPictureSrc(normalizedPictureUrl);
		});
		return () => {
			controller.abort();
			if (objectUrl) URL.revokeObjectURL(objectUrl);
		};
	}, [normalizedPictureUrl]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-x-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileInputRef,
					type: "file",
					accept: "image/*",
					className: "hidden",
					onChange: onUploadPicture
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: picture.url ? onDeletePicture : onSelectPicture,
					"aria-label": picture.url ? i18n._({ id: "bU8xtU" }) : i18n._({ id: "XjTduw" }),
					className: "group/picture relative size-18 cursor-pointer overflow-hidden rounded-md bg-secondary transition-colors hover:bg-secondary/50",
					children: [(pictureSrc || normalizedPictureUrl) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						alt: "",
						src: pictureSrc || normalizedPictureUrl,
						className: "fade-in relative z-10 size-full animate-in rounded-md object-cover transition-opacity group-hover/picture:opacity-20"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 z-0 flex size-full items-center justify-center",
						children: picture.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$6, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$17, { className: "size-6" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "url",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						className: "flex-1",
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "IagCbF" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-x-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (event) => {
									field.handleChange(event.target.value);
									handleAutoSave();
								}
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "icon",
								variant: "ghost",
								onClick: () => {
									form.setFieldValue("hidden", !picture.hidden);
									handleAutoSave();
								},
								children: picture.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$22, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$17, {})
							})]
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid @md:grid-cols-2 grid-cols-1 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "size",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Cj2Gtd" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
								name: field.name,
								value: field.state.value,
								type: "number",
								min: 32,
								max: 512,
								step: 1,
								onBlur: field.handleBlur,
								onChange: (e) => {
									const value = e.target.value;
									if (value === "") field.handleChange("");
									else field.handleChange(Number(value));
									handleAutoSave();
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
								align: "inline-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "pt" })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "rotation",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "exWyD0" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
							name: field.name,
							value: field.state.value,
							type: "number",
							min: 0,
							max: 360,
							step: 5,
							onBlur: field.handleBlur,
							onChange: (e) => {
								const value = e.target.value;
								if (value === "") field.handleChange("");
								else field.handleChange(Number(value));
								handleAutoSave();
							}
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
							align: "inline-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "°" })
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "aspectRatio",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "A8094e" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-x-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								name: field.name,
								value: field.state.value,
								type: "number",
								min: .5,
								max: 2.5,
								step: .1,
								onBlur: field.handleBlur,
								onChange: (e) => {
									const value = e.target.value;
									if (value === "") field.handleChange("");
									else field.handleChange(Number(value));
									handleAutoSave();
								}
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonGroup, {
								className: "shrink-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "icon",
										variant: "outline",
										title: i18n._({ id: "1DA6ap" }),
										onClick: () => {
											field.handleChange(1);
											handleAutoSave();
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square min-h-3 min-w-3 border border-primary" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "icon",
										variant: "outline",
										title: i18n._({ id: "XxIeKn" }),
										onClick: () => {
											field.handleChange(1.5);
											handleAutoSave();
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-1.5/1 min-h-3 min-w-3 border border-primary" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "icon",
										variant: "outline",
										title: i18n._({ id: "3bV9gD" }),
										onClick: () => {
											field.handleChange(.5);
											handleAutoSave();
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-1/1.5 min-h-3 min-w-3 border border-primary" })
									})
								]
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "borderRadius",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "bjp1xg" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-x-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
								name: field.name,
								value: field.state.value,
								type: "number",
								min: 0,
								max: 100,
								step: 1,
								onBlur: field.handleBlur,
								onChange: (e) => {
									const value = Number(e.target.value);
									field.handleChange(value);
									handleAutoSave();
								}
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
								align: "inline-end",
								children: "pt"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonGroup, {
								className: "shrink-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "icon",
										variant: "outline",
										title: "0pt",
										onClick: () => {
											field.handleChange(0);
											handleAutoSave();
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 rounded-none border border-primary" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "icon",
										variant: "outline",
										title: "10pt",
										onClick: () => {
											field.handleChange(10);
											handleAutoSave();
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 rounded-[10%] border border-primary" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "icon",
										variant: "outline",
										title: "100pt",
										onClick: () => {
											field.handleChange(100);
											handleAutoSave();
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-3 rounded-full border border-primary" })
									})
								]
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-x-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "borderColor",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItem, {
							className: "mb-1.5 shrink-0",
							hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPicker, {
								defaultValue: field.state.value,
								onChange: (color) => {
									field.handleChange(color);
									handleAutoSave();
								}
							}) })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "borderWidth",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
							className: "flex-1",
							hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Zei97D" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
								name: field.name,
								value: field.state.value,
								type: "number",
								min: 0,
								step: 1,
								onBlur: field.handleBlur,
								onChange: (e) => {
									const value = e.target.value;
									if (value === "") field.handleChange("");
									else field.handleChange(Number(value));
									handleAutoSave();
								}
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
								align: "inline-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "pt" })
							})] })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-x-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "shadowColor",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItem, {
							className: "mb-1.5 shrink-0",
							hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPicker, {
								defaultValue: field.state.value,
								onChange: (color) => {
									field.handleChange(color);
									handleAutoSave();
								}
							}) })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "shadowWidth",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
							className: "flex-1",
							hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "fGSOMF" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
								name: field.name,
								value: field.state.value,
								type: "number",
								min: 0,
								step: .5,
								onBlur: field.handleBlur,
								onChange: (e) => {
									const value = e.target.value;
									if (value === "") field.handleChange("");
									else field.handleChange(Number(value));
									handleAutoSave();
								}
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
								align: "inline-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "pt" })
							})] })]
						})
					})]
				})
			]
		})]
	});
}
function ProfilesSectionBuilder() {
	const section = useCurrentResume().data.sections.profiles;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.profiles.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "profiles",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "profiles",
				item,
				title: item.network,
				subtitle: item.username
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "profiles",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "PzXsCZ" })
		})]
	});
}
function ProjectsSectionBuilder() {
	const section = useCurrentResume().data.sections.projects;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.projects.items = items;
		});
	};
	const buildSubtitle = (item) => {
		const parts = [item.period, item.website.label].filter((part) => part && part.trim().length > 0);
		return parts.length > 0 ? parts.join(" • ") : void 0;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "projects",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "projects",
				item,
				title: item.name,
				subtitle: buildSubtitle(item)
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "projects",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "O6bw1H" })
		})]
	});
}
function PublicationsSectionBuilder() {
	const section = useCurrentResume().data.sections.publications;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.publications.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "publications",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "publications",
				item,
				title: item.title,
				subtitle: item.publisher
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "publications",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "p_At8y" })
		})]
	});
}
function ReferencesSectionBuilder() {
	const section = useCurrentResume().data.sections.references;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.references.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "references",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "references",
				item,
				title: item.name
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "references",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "G51jfQ" })
		})]
	});
}
function SkillsSectionBuilder() {
	const section = useCurrentResume().data.sections.skills;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.skills.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "skills",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				initial: false,
				mode: "popLayout",
				children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
					type: "skills",
					item,
					title: item.name,
					subtitle: item.proficiency
				}, item.id))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "skills",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "K3qAaT" })
		})]
	});
}
function SummarySectionBuilder() {
	const section = useCurrentResume().data.summary;
	const updateResumeData = useUpdateResumeData();
	const onChange = (value) => {
		updateResumeData((draft) => {
			draft.summary.content = value;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBase$1, {
		type: "summary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichInput, {
			value: section.content,
			onChange
		})
	});
}
function VolunteerSectionBuilder() {
	const section = useCurrentResume().data.sections.volunteer;
	const updateResumeData = useUpdateResumeData();
	const handleReorder = (items) => {
		updateResumeData((draft) => {
			draft.sections.volunteer.items = items;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase$1, {
		type: "volunteer",
		className: cn("rounded-md border", section.items.length === 0 && "border-dashed"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
			axis: "y",
			values: section.items,
			onReorder: handleReorder,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionItem, {
				type: "volunteer",
				item,
				title: item.organization,
				subtitle: item.location
			}, item.id)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionAddItemButton, {
			type: "volunteer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "kEJ-pR" })
		})]
	});
}
function getSectionComponent$1(type) {
	return M(type).with("picture", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PictureSectionBuilder, {})).with("basics", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BasicsSectionBuilder, {})).with("summary", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummarySectionBuilder, {})).with("profiles", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilesSectionBuilder, {})).with("experience", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceSectionBuilder, {})).with("education", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EducationSectionBuilder, {})).with("projects", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsSectionBuilder, {})).with("skills", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsSectionBuilder, {})).with("languages", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagesSectionBuilder, {})).with("interests", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterestsSectionBuilder, {})).with("awards", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwardsSectionBuilder, {})).with("certifications", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificationsSectionBuilder, {})).with("publications", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicationsSectionBuilder, {})).with("volunteer", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerSectionBuilder, {})).with("references", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferencesSectionBuilder, {})).with("custom", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomSectionBuilder, {})).exhaustive();
}
function BuilderSidebarLeft() {
	const scrollAreaRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarEdge$1, { scrollAreaRef }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
		ref: scrollAreaRef,
		className: "@container h-[calc(100svh-3.5rem)] bg-background sm:ms-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4 p-4",
			children: leftSidebarSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [getSectionComponent$1(section), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {})] }, section))
		})
	})] });
}
function SidebarEdge$1({ scrollAreaRef }) {
	const toggleSidebar = useBuilderSidebar((state) => state.toggleSidebar);
	const scrollToSection = (0, import_react.useCallback)((section) => {
		if (!scrollAreaRef.current) return;
		toggleSidebar("left", true);
		scrollAreaRef.current.querySelector(`#sidebar-${section}`)?.scrollIntoView({
			block: "nearest",
			inline: "nearest",
			behavior: "smooth"
		});
	}, [toggleSidebar, scrollAreaRef]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderSidebarEdge, {
		side: "left",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 w-full flex-1 flex-col items-center gap-y-2 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-full flex-col items-center justify-center gap-y-2",
					children: leftSidebarSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "icon",
						variant: "ghost",
						title: getSectionTitle(section),
						onClick: () => scrollToSection(section),
						children: getSectionIcon(section)
					}, section))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserDropdownMenu, { children: ({ session }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				size: "icon",
				variant: "ghost",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
					className: "size-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: session.user.image ?? void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "text-[0.5rem]",
						children: getInitials(session.user.name)
					})]
				})
			}) })]
		})
	});
}
var getLevelTypeName = (type) => {
	return M(type).with("hidden", () => i18n._({ id: "D-zLDD" })).with("circle", () => i18n._({ id: "7xMmki" })).with("square", () => i18n._({ id: "1DA6ap" })).with("rectangle", () => i18n._({ id: "30KLDI" })).with("rectangle-full", () => i18n._({ id: "WLkDqw" })).with("progress-bar", () => i18n._({ id: "xFlqcT" })).with("icon", () => i18n._({ id: "wwu18a" })).exhaustive();
};
function LevelTypeCombobox({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox$1, {
		options: (0, import_react.useMemo)(() => {
			return levelDesignSchema.shape.type.options.map((option) => ({
				value: option,
				label: getLevelTypeName(option)
			}));
		}, []),
		...props
	});
}
function LevelDisplay({ icon, type, level, className, ...props }) {
	if (level === 0) return null;
	if (type === "hidden" || icon === "") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "img",
		"aria-label": i18n._({
			id: "X-Tbwt",
			values: { level }
		}),
		className: cn("flex items-center gap-x-2", type === "progress-bar" && "gap-x-0", className),
		...props,
		children: Array.from({ length: 5 }).map((_, index) => {
			const isActive = index < level;
			if (type === "progress-bar") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-active": isActive,
				className: cn("h-2.5 flex-1 border border-(--page-primary-color) border-x-0 first:border-l last:border-r", isActive && "bg-(--page-primary-color)")
			}, index);
			if (type === "icon") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: cn("ph size-2.5 text-(--page-primary-color)", `ph-${icon}`, !isActive && "opacity-40") }, index);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-active": isActive,
				className: cn("size-2.5 border border-(--page-primary-color)", isActive && "bg-(--page-primary-color)", type === "circle" && "rounded-full", type === "rectangle" && "w-7", type === "rectangle-full" && "w-auto flex-1")
			}, index);
		})
	});
}
function SectionBase({ type, className, ...props }) {
	const collapsed = useSectionStore((state) => state.sections[type]?.collapsed ?? false);
	const toggleCollapsed = useSectionStore((state) => state.toggleCollapsed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion$1, {
		className: "space-y-4",
		id: `sidebar-${type}`,
		value: collapsed ? [] : [type],
		onValueChange: () => toggleCollapsed(type),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
			value: type,
			className: "group/accordion-item space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
					className: "me-2 items-center justify-center",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "icon",
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, { className: "transition-transform duration-200 group-data-closed/accordion-item:-rotate-90" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 items-center gap-x-4",
					children: [getSectionIcon(type), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "line-clamp-1 font-bold text-2xl tracking-tight",
						children: getSectionTitle(type)
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
				className: cn("overflow-hidden pb-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className),
				...props
			})]
		})
	});
}
function DesignSectionBuilder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase, {
		type: "design",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorSectionForm, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelSectionForm, {})
		]
	});
}
function ColorSectionForm() {
	const colors = useCurrentResume().data.metadata.design.colors;
	const updateResumeData = useUpdateResumeData();
	const persist = (data) => {
		updateResumeData((draft) => {
			draft.metadata.design.colors = data;
		});
	};
	const form = useAppForm({
		defaultValues: colors,
		validators: { onChange: colorDesignSchema },
		onSubmit: ({ value }) => {
			persist(value);
		}
	});
	useSyncFormValues(form, colors);
	const handleAutoSave = () => {
		persist(form.state.values);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "primary",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItem, {
					className: "flex flex-wrap gap-2.5 p-1",
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: quickColorOptions.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickColorCircle, {
						color,
						active: color === field.state.value,
						onSelect: (color) => {
							field.handleChange(color);
							handleAutoSave();
						}
					}, color))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "primary",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "6RmHKN" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPicker, {
								value: field.state.value,
								onChange: (color) => {
									field.handleChange(color);
									handleAutoSave();
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (e) => {
									field.handleChange(e.target.value);
									handleAutoSave();
								}
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "text",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "HmA4Lf" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPicker, {
								defaultValue: field.state.value,
								onChange: (color) => {
									field.handleChange(color);
									handleAutoSave();
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (e) => {
									field.handleChange(e.target.value);
									handleAutoSave();
								}
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "background",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "k1bLf-" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPicker, {
								defaultValue: field.state.value,
								onChange: (color) => {
									field.handleChange(color);
									handleAutoSave();
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (e) => {
									field.handleChange(e.target.value);
									handleAutoSave();
								}
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			})
		]
	});
}
var quickColorOptions = [
	"rgba(231, 0, 11, 1)",
	"rgba(245, 73, 0, 1)",
	"rgba(225, 113, 0, 1)",
	"rgba(208, 135, 0, 1)",
	"rgba(94, 165, 0, 1)",
	"rgba(0, 166, 62, 1)",
	"rgba(0, 153, 102, 1)",
	"rgba(0, 150, 137, 1)",
	"rgba(0, 146, 184, 1)",
	"rgba(0, 132, 209, 1)",
	"rgba(21, 93, 252, 1)",
	"rgba(79, 57, 246, 1)",
	"rgba(127, 34, 254, 1)",
	"rgba(152, 16, 250, 1)",
	"rgba(200, 0, 222, 1)",
	"rgba(230, 0, 118, 1)",
	"rgba(236, 0, 63, 1)",
	"rgba(69, 85, 108, 1)",
	"rgba(74, 85, 101, 1)",
	"rgba(82, 82, 92, 1)",
	"rgba(82, 82, 82, 1)",
	"rgba(87, 83, 77, 1)"
];
function QuickColorCircle({ color, active, onSelect, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(color),
		className: cn("relative flex size-8 items-center justify-center rounded-md bg-transparent", "scale-100 transition-transform hover:scale-120 hover:bg-secondary/80 active:scale-95", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { backgroundColor: color },
			className: "size-6 shrink-0 rounded-md"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { scale: 0 },
			animate: { scale: 1 },
			exit: { scale: 0 },
			transition: {
				duration: .16,
				ease: "easeOut"
			},
			className: "absolute inset-0 flex size-8 items-center justify-center will-change-transform",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-4 rounded-md bg-foreground" })
		}) })]
	});
}
function LevelSectionForm() {
	const resume = useCurrentResume();
	const colors = resume.data.metadata.design.colors;
	const levelDesign = resume.data.metadata.design.level;
	const updateResumeData = useUpdateResumeData();
	const persist = (data) => {
		updateResumeData((draft) => {
			draft.metadata.design.level = data;
		});
	};
	const form = useAppForm({
		defaultValues: levelDesign,
		validators: { onChange: levelDesignSchema },
		onSubmit: ({ value }) => {
			persist(value);
		}
	});
	useSyncFormValues(form, levelDesign);
	const handleAutoSave = () => {
		persist(form.state.values);
	};
	const previewType = useStore(form.store, (s) => s.values.type);
	const previewIcon = useStore(form.store, (s) => s.values.icon);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "font-semibold text-lg leading-none tracking-tight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "oCHfGC" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					"--page-primary-color": colors.primary,
					backgroundColor: colors.background
				},
				className: "flex items-center justify-center rounded-md p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelDisplay, {
					level: 3,
					type: previewType,
					icon: previewIcon,
					className: "w-full max-w-[220px] justify-center"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "icon",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						className: "shrink-0",
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "wwu18a" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPicker, {
							size: "icon",
							value: field.state.value,
							onChange: (value) => {
								field.handleChange(value);
								handleAutoSave();
							}
						}) })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "type",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
						className: "flex-1",
						hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "-zy2Nq" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelTypeCombobox, {
							value: field.state.value,
							onValueChange: (value) => {
								if (!value) return;
								field.handleChange(value);
								handleAutoSave();
							}
						}) })]
					})
				})]
			})
		]
	});
}
function ExportSectionBuilder() {
	const resumeData = useResume();
	const [isPrinting, setIsPrinting] = (0, import_react.useState)(false);
	const resume = resumeData;
	const onDownloadJSON = (0, import_react.useCallback)(() => {
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
	if (!resume) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase, {
		type: "export",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "outline",
				onClick: onDownloadJSON,
				className: "h-auto gap-x-4 whitespace-normal p-4! text-start font-normal active:scale-98",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$23, { className: "size-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col gap-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "font-medium",
						children: "JSON"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-xs leading-normal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "YoqSKp" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "outline",
				onClick: onDownloadDOCX,
				className: "h-auto gap-x-4 whitespace-normal p-4! text-start font-normal active:scale-98",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$18, { className: "size-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col gap-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "font-medium",
						children: "DOCX"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-xs leading-normal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "5C9EN0" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "outline",
				disabled: isPrinting,
				onClick: onDownloadPDF,
				className: "h-auto gap-x-4 whitespace-normal p-4! text-start font-normal active:scale-98",
				children: [isPrinting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { className: "size-6 shrink-0 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$24, { className: "size-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col gap-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "font-medium",
						children: "PDF"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-xs leading-normal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "3SRWjb" })
					})]
				})]
			})
		]
	});
}
function InformationSectionBuilder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase, {
		type: "information",
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2 rounded-md border bg-sky-600 p-5 text-white dark:bg-sky-700",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-medium tracking-tight",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "mUgktG" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2 text-xs leading-normal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
						id: "uA0MBV",
						components: {
							0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {}),
							1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {})
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					variant: "default",
					nativeButton: false,
					className: "mt-2 whitespace-normal px-4! text-xs",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "http://opencollective.com/reactive-resume",
						target: "_blank",
						rel: "noopener",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$8, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vHIoUD" })
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-0.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					variant: "link",
					className: "text-xs",
					nativeButton: false,
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://docs.rxresu.me",
						target: "_blank",
						rel: "noopener",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "TvY_XA" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					variant: "link",
					className: "text-xs",
					nativeButton: false,
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://github.com/amruthpillai/reactive-resume",
						target: "_blank",
						rel: "noopener",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "PnzsrT" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					variant: "link",
					className: "text-xs",
					nativeButton: false,
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://github.com/amruthpillai/reactive-resume/issues",
						target: "_blank",
						rel: "noopener",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "L_1f5c" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					variant: "link",
					className: "text-xs",
					nativeButton: false,
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://crowdin.com/project/reactive-resume",
						target: "_blank",
						rel: "noopener",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "kAy5R9" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					variant: "link",
					className: "text-xs",
					nativeButton: false,
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://opencollective.com/reactive-resume/donate",
						target: "_blank",
						rel: "noopener",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "PDi3Tz" })
					})
				})
			]
		})]
	});
}
var primaryTitleFields = {
	profiles: "network",
	experience: "company",
	education: "school",
	projects: "name",
	skills: "name",
	languages: "language",
	interests: "name",
	awards: "title",
	certifications: "title",
	publications: "title",
	volunteer: "organization",
	references: "name"
};
var hasText = (value) => {
	return typeof value === "string" && value.trim().length > 0;
};
var getPrimaryTitleField = (sectionType) => {
	return primaryTitleFields[sectionType];
};
var hasValidPrimaryTitle = (item, sectionType) => {
	const titleField = getPrimaryTitleField(sectionType);
	if (!titleField) return true;
	return hasText(item[titleField]);
};
var hasVisibleItems = (section, sectionType) => {
	return !section.hidden && section.items.some((item) => !item.hidden && hasValidPrimaryTitle(item, sectionType));
};
var getBuiltInSection = (sectionId, data) => {
	if (!(sectionId in data.sections)) return null;
	return data.sections[sectionId];
};
var isVisibleLayoutSection = (sectionId, data) => {
	if (sectionId === "summary") return !data.summary.hidden && data.summary.content.trim().length > 0;
	const builtInSection = getBuiltInSection(sectionId, data);
	if (builtInSection) return hasVisibleItems(builtInSection, sectionId);
	const customSection = data.customSections.find((section) => section.id === sectionId);
	if (customSection) return hasVisibleItems(customSection, customSection.type);
	return false;
};
var filterVisibleLayoutSectionIds = (sectionIds, data) => {
	return sectionIds.filter((sectionId) => isVisibleLayoutSection(sectionId, data));
};
var getColumnLabel = (columnId) => {
	return M(columnId).with("main", () => i18n._({ id: "D16asK" })).with("sidebar", () => i18n._({ id: "uWi2Q-" })).exhaustive();
};
/**
* Returns the page index and column that contains the given section id.
* Format: "page-{index}-{columnId}" or "{sectionId}"
*/
var parseDroppableId = (id) => {
	if (id.startsWith("page-")) {
		const parts = id.split("-");
		if (parts.length >= 3) {
			const pageIndex = Number.parseInt(parts[1] ?? "0", 10);
			const columnId = parts[2];
			if (!Number.isNaN(pageIndex) && (columnId === "main" || columnId === "sidebar")) return {
				pageIndex,
				columnId
			};
		}
	}
	return null;
};
var createDroppableId = (pageIndex, columnId) => {
	return `page-${pageIndex}-${columnId}`;
};
function LayoutPages() {
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const resume = useCurrentResume();
	const templateSidebarPosition = templates[resume.data.metadata.template].sidebarPosition;
	const layout = resume.data.metadata.layout;
	const updateResumeData = useUpdateResumeData();
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
	/**
	* Returns the page index and column that contains the given section id.
	*/
	const findContainer = (0, import_react.useCallback)((id) => {
		const location = parseDroppableId(id);
		if (location) return location;
		for (let pageIndex = 0; pageIndex < layout.pages.length; pageIndex++) {
			const page = layout.pages[pageIndex];
			if (page.main.includes(id)) return {
				pageIndex,
				columnId: "main"
			};
			if (page.sidebar.includes(id)) return {
				pageIndex,
				columnId: "sidebar"
			};
		}
		return null;
	}, [layout.pages]);
	const handleDragStart = (0, import_react.useCallback)((event) => setActiveId(String(event.active.id)), []);
	const handleDragEnd = (0, import_react.useCallback)(({ active, over }) => {
		setActiveId(null);
		if (!over) return;
		const activeIdStr = String(active.id);
		const overIdStr = String(over.id);
		if (activeIdStr === overIdStr) return;
		const activeLocation = findContainer(activeIdStr);
		const overLocation = parseDroppableId(overIdStr) ?? findContainer(overIdStr);
		if (!activeLocation || !overLocation) return;
		if (activeLocation.pageIndex === overLocation.pageIndex && activeLocation.columnId === overLocation.columnId) {
			const items = layout.pages[activeLocation.pageIndex][activeLocation.columnId];
			const oldIdx = items.indexOf(activeIdStr);
			let newIdx = items.indexOf(overIdStr);
			if (oldIdx === -1 || oldIdx === newIdx) return;
			if (newIdx === -1) newIdx = items.length - 1;
			updateResumeData((draft) => {
				const colOrder = draft.metadata.layout.pages[activeLocation.pageIndex][activeLocation.columnId];
				draft.metadata.layout.pages[activeLocation.pageIndex][activeLocation.columnId] = arrayMove(colOrder, oldIdx, newIdx);
			});
			return;
		}
		const fromPage = layout.pages[activeLocation.pageIndex];
		const toPage = layout.pages[overLocation.pageIndex];
		const fromItems = fromPage[activeLocation.columnId];
		const toItems = toPage[overLocation.columnId];
		const fromIdx = fromItems.indexOf(activeIdStr);
		if (fromIdx === -1) return;
		let toIdx = toItems.indexOf(overIdStr);
		if (toIdx === -1) toIdx = toItems.length;
		updateResumeData((draft) => {
			const fromPageDraft = draft.metadata.layout.pages[activeLocation.pageIndex];
			const toPageDraft = draft.metadata.layout.pages[overLocation.pageIndex];
			const from = fromPageDraft[activeLocation.columnId];
			const to = toPageDraft[overLocation.columnId];
			from.splice(fromIdx, 1);
			to.splice(Math.min(toIdx, to.length), 0, activeIdStr);
		});
	}, [
		findContainer,
		layout.pages,
		updateResumeData
	]);
	const handleAddPage = (0, import_react.useCallback)(() => {
		updateResumeData((draft) => {
			draft.metadata.layout.pages.push({
				fullWidth: false,
				main: [],
				sidebar: []
			});
		});
	}, [updateResumeData]);
	const handleDeletePage = (0, import_react.useCallback)((pageIndex) => {
		if (layout.pages.length <= 1) return;
		updateResumeData((draft) => {
			const pageToDelete = draft.metadata.layout.pages[pageIndex];
			const targetPageIndex = pageIndex === 0 ? 1 : 0;
			const targetPage = draft.metadata.layout.pages[targetPageIndex];
			targetPage.main.push(...pageToDelete.main);
			targetPage.sidebar.push(...pageToDelete.sidebar);
			draft.metadata.layout.pages.splice(pageIndex, 1);
		});
	}, [layout.pages.length, updateResumeData]);
	const handleToggleFullWidth = (0, import_react.useCallback)((pageIndex, fullWidth) => {
		updateResumeData((draft) => {
			const page = draft.metadata.layout.pages[pageIndex];
			page.fullWidth = fullWidth;
			if (fullWidth) {
				page.main.push(...page.sidebar);
				page.sidebar = [];
			}
		});
	}, [updateResumeData]);
	if (layout.pages.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DndContext, {
		id: "builder-layout",
		sensors,
		collisionDetection: closestCorners,
		onDragStart: handleDragStart,
		onDragEnd: handleDragEnd,
		onDragCancel: () => setActiveId(null),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [layout.pages.map((page, pageIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, {
				pageIndex,
				page: {
					...page,
					main: filterVisibleLayoutSectionIds(page.main, resume.data),
					sidebar: filterVisibleLayoutSectionIds(page.sidebar, resume.data)
				},
				canDelete: layout.pages.length > 1,
				sidebarPosition: templateSidebarPosition,
				onDelete: handleDeletePage,
				onToggleFullWidth: handleToggleFullWidth
			}, `page-${pageIndex}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "outline",
				className: "self-end",
				onClick: handleAddPage,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$14, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "OeUWA7" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DragOverlay, { children: activeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutItemContent, {
			id: activeId,
			isDragging: true,
			isOverlay: true
		}) : null })]
	});
}
function PageContainer({ pageIndex, page, canDelete, sidebarPosition, onDelete, onToggleFullWidth }) {
	const isFullWidth = page.fullWidth;
	const fullWidthSwitchId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 rounded-md border border-dashed bg-background/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between bg-secondary/50 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
						id: "tdta9X",
						values: { 0: pageIndex + 1 }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: fullWidthSwitchId,
					className: "flex cursor-pointer items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
						id: fullWidthSwitchId,
						checked: page.fullWidth,
						onCheckedChange: (checked) => onToggleFullWidth(pageIndex, checked)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-muted-foreground text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EAIcj7" })
					})]
				})]
			}), canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "ghost",
				onClick: () => onDelete(pageIndex),
				className: "h-5 w-auto gap-x-2.5 px-0!",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$7, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "4KzVT6" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("grid w-full @md:grid-cols-2 gap-x-4 gap-y-2 p-4 pt-0 font-medium", sidebarPosition === "none" && "@md:grid-cols-1"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutColumn, {
				pageIndex,
				columnId: "main",
				items: page.main,
				disabled: false,
				className: cn(sidebarPosition === "left" ? "order-2" : "order-1")
			}), !isFullWidth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutColumn, {
				pageIndex,
				columnId: "sidebar",
				items: page.sidebar,
				hideLabel: sidebarPosition === "none",
				className: cn(sidebarPosition === "left" ? "order-1" : "order-2")
			})]
		})]
	});
}
function LayoutColumn({ pageIndex, columnId, items, hideLabel = false, disabled = false, className }) {
	const droppableId = createDroppableId(pageIndex, columnId);
	const { setNodeRef, isOver } = useDroppable({
		id: droppableId,
		disabled
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
		id: droppableId,
		items,
		strategy: verticalListSortingStrategy,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("space-y-1.5", disabled && "opacity-50", className),
			children: [!hideLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "@md:row-start-1 ps-4 font-medium text-xs",
				children: getColumnLabel(columnId)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: setNodeRef,
				className: cn("space-y-2.5 rounded-md border border-dashed p-3 pb-8 transition-colors", isOver && !disabled ? "border-primary/60 bg-primary/5" : "bg-background/40"),
				children: [items.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableLayoutItem, {
					id,
					pageIndex,
					columnId
				}, id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md border border-dashed p-4 font-medium text-muted-foreground text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "T53-RA" })
				})]
			})]
		})
	});
}
function SortableLayoutItem({ id }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutItemContent, {
		ref: setNodeRef,
		id,
		style: {
			transform: CSS.Transform.toString(transform),
			transition
		},
		isDragging,
		...attributes,
		...listeners
	});
}
var LayoutItemContent = (0, import_react.forwardRef)(({ id, isDragging, isOverlay, className, style, ...rest }, ref) => {
	const resume = useCurrentResume();
	const title = (() => {
		if (!resume) return id;
		if (id === "summary") return resume.data.summary.title || getSectionTitle("summary");
		if (id in resume.data.sections) return resume.data.sections[id].title || getSectionTitle(id);
		const customSection = resume.data.customSections.find((section) => section.id === id);
		if (customSection) return customSection.title;
		return id;
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		style,
		"data-overlay": isOverlay ? "true" : void 0,
		"data-dragging": isDragging ? "true" : void 0,
		className: cn("group/item flex cursor-grab touch-none select-none items-center gap-x-2 rounded-md border border-border bg-background px-2 py-1.5 font-medium text-sm transition-all duration-200 ease-out", "hover:bg-secondary/40 active:cursor-grabbing active:border-primary/60 active:bg-secondary/40", "data-[overlay=true]:cursor-grabbing data-[overlay=true]:border-primary/60 data-[overlay=true]:bg-background", "data-[dragging=true]:cursor-grabbing data-[dragging=true]:border-primary/60 data-[dragging=true]:bg-background", className),
		...rest,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$6, { className: "opacity-40 transition-opacity group-hover/item:opacity-100" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: title
		})]
	});
});
LayoutItemContent.displayName = "LayoutItemContent";
function LayoutSectionBuilder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase, {
		type: "layout",
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutPages, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutSectionForm, {})]
	});
}
var formSchema$2 = metadataSchema.shape.layout.omit({ pages: true });
function LayoutSectionForm() {
	const layout = useCurrentResume().data.metadata.layout;
	const updateResumeData = useUpdateResumeData();
	const persist = (data) => {
		updateResumeData((draft) => {
			draft.metadata.layout.sidebarWidth = data.sidebarWidth;
		});
	};
	const form = useAppForm({
		defaultValues: { sidebarWidth: layout.sidebarWidth },
		validators: { onChange: formSchema$2 },
		onSubmit: ({ value }) => {
			persist(value);
		}
	});
	useSyncFormValues(form, { sidebarWidth: layout.sidebarWidth });
	const handleAutoSave = () => {
		persist(form.state.values);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		className: "space-y-4",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
			name: "sidebarWidth",
			children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
				hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "2DMM98" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider$1, {
							min: 10,
							max: 50,
							step: .01,
							value: [field.state.value],
							onValueChange: (value) => {
								field.handleChange(Array.isArray(value) ? value[0] : value);
								handleAutoSave();
							}
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
							className: "w-auto shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
								name: field.name,
								value: field.state.value,
								type: "number",
								min: 10,
								max: 50,
								step: .1,
								onBlur: field.handleBlur,
								onChange: (e) => {
									const value = e.target.value;
									if (value === "") field.handleChange("");
									else field.handleChange(Number(value));
									handleAutoSave();
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
								align: "inline-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "%" })
							})]
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
				]
			})
		})
	});
}
function NotesSectionBuilder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBase, {
		type: "notes",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesSectionForm, {})
	});
}
function NotesSectionForm() {
	const notes = useCurrentResume().data.metadata.notes;
	const updateResumeData = useUpdateResumeData();
	const onChange = (value) => {
		updateResumeData((draft) => {
			draft.metadata.notes = value;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "zS_gyo" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichInput, {
				value: notes,
				onChange
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "wT6ebQ" })
			})
		]
	});
}
function PageSectionBuilder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBase, {
		type: "page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSectionForm, {})
	});
}
var formSchema$1 = pageSchema;
function PageSectionForm() {
	const page = useResume()?.data.metadata.page;
	const updateResumeData = useUpdateResumeData();
	const persist = (data) => {
		updateResumeData((draft) => {
			draft.metadata.page = data;
		});
	};
	const form = useAppForm({
		defaultValues: page,
		validators: { onChange: formSchema$1 },
		onSubmit: ({ value }) => {
			persist(value);
		}
	});
	useSyncFormValues(form, page);
	const handleAutoSave = (name, value) => {
		persist({
			...form.state.values,
			[name]: value
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid @md:grid-cols-2 grid-cols-1 gap-4",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "locale",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "col-span-full",
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "vXIe7J" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox$1, {
							options: getLocaleOptions(),
							value: field.state.value,
							onValueChange: (locale) => {
								const value = locale ?? "";
								field.handleChange(value);
								handleAutoSave("locale", value);
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "format",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "col-span-full",
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "FPP5s-" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox$1, {
							options: [
								{
									value: "a4",
									label: i18n._({ id: "i-5kKa" })
								},
								{
									value: "letter",
									label: i18n._({ id: "S4Fsut" })
								},
								{
									value: "free-form",
									label: i18n._({ id: "KZ1Qqz" })
								}
							],
							value: field.state.value,
							onValueChange: (value) => {
								const format = value;
								field.handleChange(format);
								handleAutoSave("format", format);
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "marginX",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "934W22" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
							name: field.name,
							value: field.state.value,
							min: 0,
							max: 100,
							step: 1,
							type: "number",
							onBlur: field.handleBlur,
							onChange: (e) => {
								const value = e.target.value;
								const marginX = value === "" ? "" : Number(value);
								field.handleChange(marginX);
								handleAutoSave("marginX", marginX);
							}
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
							align: "inline-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "pt" })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "marginY",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "y1Pyvl" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
							name: field.name,
							value: field.state.value,
							min: 0,
							max: 100,
							step: 1,
							type: "number",
							onBlur: field.handleBlur,
							onChange: (e) => {
								const value = e.target.value;
								const marginY = value === "" ? "" : Number(value);
								field.handleChange(marginY);
								handleAutoSave("marginY", marginY);
							}
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
							align: "inline-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "pt" })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "gapX",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "PnNo2E" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
							name: field.name,
							value: field.state.value,
							min: 0,
							step: 1,
							type: "number",
							onBlur: field.handleBlur,
							onChange: (e) => {
								const value = e.target.value;
								const gapX = value === "" ? "" : Number(value);
								field.handleChange(gapX);
								handleAutoSave("gapX", gapX);
							}
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
							align: "inline-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "pt" })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "gapY",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "mAhp61" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
							name: field.name,
							value: field.state.value,
							min: 0,
							step: 1,
							type: "number",
							onBlur: field.handleBlur,
							onChange: (e) => {
								const value = e.target.value;
								const gapY = value === "" ? "" : Number(value);
								field.handleChange(gapY);
								handleAutoSave("gapY", gapY);
							}
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
							align: "inline-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "pt" })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "hideIcons",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "col-span-full flex items-center gap-x-3 py-2",
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
						checked: field.state.value,
						onCheckedChange: (checked) => {
							field.handleChange(checked);
							handleAutoSave("hideIcons", checked);
						}
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "ltmhc6" }) })]
				})
			})
		]
	});
}
function impactCircleClass(impact) {
	return M(impact).with("high", () => "bg-rose-600").with("medium", () => "bg-amber-600").with("low", () => "bg-emerald-600").exhaustive();
}
function impactLabel(impact) {
	return M(impact).with("high", () => i18n._({ id: "yx_fMc" })).with("medium", () => i18n._({ id: "agPptk" })).with("low", () => i18n._({ id: "nTWWCZ" })).exhaustive();
}
function ResumeAnalysisSectionBuilder() {
	const queryClient = useQueryClient();
	const resume = useResume();
	const aiEnabled = useAIStore((state) => state.enabled);
	const aiProvider = useAIStore((state) => state.provider);
	const aiModel = useAIStore((state) => state.model);
	const aiApiKey = useAIStore((state) => state.apiKey);
	const aiBaseURL = useAIStore((state) => state.baseURL);
	const resumeId = resume?.id ?? "";
	const analysisQuery = useQuery({
		...orpc.resume.analysis.getById.queryOptions({ input: { id: resumeId } }),
		enabled: !!resume
	});
	const { mutate: analyzeResume, isPending } = useMutation({
		...orpc.ai.analyzeResume.mutationOptions(),
		onSuccess: (analysis) => {
			queryClient.setQueryData(orpc.resume.analysis.getById.queryKey({ input: { id: resumeId } }), analysis);
			toast.success(i18n._({ id: "m23Pif" }));
		},
		onError: (error) => {
			toast.error(i18n._({ id: "ZHOoj7" }), { description: getOrpcErrorMessage(error, {
				byCode: {
					BAD_REQUEST: i18n._({ id: "J7QYyi" }),
					BAD_GATEWAY: i18n._({ id: "-omA93" })
				},
				fallback: i18n._({ id: "m8giRh" })
			}) });
		}
	});
	const analysis = analysisQuery.data;
	const score = analysis?.overallScore ?? null;
	const analyzeLabel = isPending ? i18n._({ id: "_dYm3N" }) : i18n._({ id: "yrKswK" });
	const scoreTone = (0, import_react.useMemo)(() => {
		if (score == null) return "bg-muted";
		if (score >= 80) return "bg-emerald-600";
		if (score >= 60) return "bg-amber-600";
		return "bg-rose-600";
	}, [score]);
	const onAnalyze = () => {
		if (!resume) return;
		analyzeResume({
			provider: aiProvider,
			model: aiModel,
			apiKey: aiApiKey,
			baseURL: aiBaseURL,
			resumeId: resume.id,
			resumeData: resume.data
		});
	};
	if (!resume) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase, {
		type: "analysis",
		className: "space-y-4",
		children: [!aiEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisabledState, {}), aiEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 rounded-md border bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "3m00Ai" })
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							disabled: isPending,
							onClick: onAnalyze,
							className: "ml-auto w-fit",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {}), analyzeLabel]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[auto_1fr] items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid size-18 place-items-center rounded-full border-3 border-background font-bold text-lg text-white ${scoreTone}`,
							children: score ?? "--"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-sm leading-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "7aXCxy" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-10 gap-1",
									children: Array.from({ length: 10 }).map((_, index) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 rounded-full transition-colors ${score != null && index < Math.round(score / 10) ? "bg-primary" : "bg-muted"}` }, `scorebar-${index}`);
									})
								}),
								analysis?.updatedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-xs leading-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
										id: "bsX4Em",
										values: { 0: new Date(analysis.updatedAt).toLocaleString() }
									})
								})
							]
						})]
					})]
				}),
				analysisQuery.isFetched && !analysis && !isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md border border-dashed p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xs text-muted-foreground text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "lPtsCI" })
					})
				}),
				analysis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 rounded-md border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
								className: "flex items-center gap-2 font-semibold text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$7, { className: "text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dnCXGp" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: analysis.scorecard.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 rounded-md border bg-card p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-sm",
											children: item.dimension
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											children: [item.score, "/100"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground text-xs",
										children: item.rationale
									})]
								}, item.dimension))
							})]
						}),
						analysis.strengths.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 rounded-md border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "font-semibold text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "RJ4tIk" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-outside list-disc pl-5 text-muted-foreground text-sm",
								children: analysis.strengths.map((strength) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "py-1.5",
									children: strength
								}, strength))
							})]
						}),
						analysis.suggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 rounded-md border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "font-semibold text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8J32PY" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: analysis.suggestions.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 rounded-md border bg-card p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												role: "img",
												className: `size-2.5 shrink-0 rounded-full ring-1 ring-border ${impactCircleClass(suggestion.impact)}`,
												title: impactLabel(suggestion.impact),
												"aria-label": impactLabel(suggestion.impact)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-sm tracking-tight",
												children: suggestion.title
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground text-xs",
											children: suggestion.why
										}),
										suggestion.exampleRewrite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded bg-muted p-2 text-muted-foreground text-xs",
											children: suggestion.exampleRewrite
										})
									]
								}, suggestion.title))
							})]
						})
					]
				})
			]
		})]
	});
}
function DisabledState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$13, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cUBhHL" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			size: "sm",
			variant: "outline",
			nativeButton: false,
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard/settings/integrations",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "pgeMB3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$8, {})]
			})
		})]
	})] });
}
function SharingSectionBuilder() {
	const prompt = usePrompt();
	const confirm = useConfirm();
	const [_, copyToClipboard] = useCopyToClipboard();
	const { data: session } = authClient.useSession();
	const resume = useCurrentResume();
	const patchResume = usePatchResume();
	const { mutateAsync: updateResume } = useMutation(orpc.resume.update.mutationOptions());
	const { mutateAsync: setPassword } = useMutation(orpc.resume.setPassword.mutationOptions());
	const { mutateAsync: removePassword } = useMutation(orpc.resume.removePassword.mutationOptions());
	const publicUrl = (0, import_react.useMemo)(() => {
		if (!session) return "";
		return `${window.location.origin}/${session.user.username}/${resume.slug}`;
	}, [session, resume]);
	const onCopyUrl = (0, import_react.useCallback)(async () => {
		await copyToClipboard(publicUrl);
		toast.success(i18n._({ id: "VoRm7A" }));
	}, [publicUrl, copyToClipboard]);
	const onTogglePublic = (0, import_react.useCallback)(async (checked) => {
		try {
			const updated = await updateResume({
				id: resume.id,
				isPublic: checked
			});
			patchResume((draft) => {
				draft.isPublic = updated.isPublic;
			});
		} catch (error) {
			const message = error instanceof ORPCError ? error.message : i18n._({ id: "fWsBTs" });
			toast.error(message);
		}
	}, [
		patchResume,
		resume.id,
		updateResume
	]);
	const onSetPassword = (0, import_react.useCallback)(async () => {
		const value = await prompt(i18n._({ id: "a-n08i" }), {
			description: i18n._({ id: "4UMSbQ" }),
			confirmText: i18n._({ id: "2gHjVM" }),
			inputProps: {
				type: "password",
				minLength: 6,
				maxLength: 64
			}
		});
		if (!value) return;
		const password = value.trim();
		if (!password) return toast.error(i18n._({ id: "Wv8Kmb" }));
		const toastId = toast.loading(i18n._({ id: "eTdPN1" }));
		try {
			await setPassword({
				id: resume.id,
				password
			});
			patchResume((draft) => {
				draft.hasPassword = true;
			});
			toast.success(i18n._({ id: "RFxMjV" }), { id: toastId });
		} catch (error) {
			const message = error instanceof ORPCError ? error.message : i18n._({ id: "fWsBTs" });
			toast.error(message, { id: toastId });
		}
	}, [
		patchResume,
		prompt,
		resume.id,
		setPassword
	]);
	const onRemovePassword = (0, import_react.useCallback)(async () => {
		if (!resume.hasPassword) return;
		if (!await confirm(i18n._({ id: "sB2Gky" }), {
			description: i18n._({ id: "Tbezen" }),
			confirmText: i18n._({ id: "7VpPHA" }),
			cancelText: i18n._({ id: "dEgA5A" })
		})) return;
		const toastId = toast.loading(i18n._({ id: "-m4fJV" }));
		try {
			await removePassword({ id: resume.id });
			patchResume((draft) => {
				draft.hasPassword = false;
			});
			toast.success(i18n._({ id: "5Vqdg5" }), { id: toastId });
		} catch (error) {
			const message = error instanceof ORPCError ? error.message : i18n._({ id: "fWsBTs" });
			toast.error(message, { id: toastId });
		}
	}, [
		confirm,
		patchResume,
		removePassword,
		resume.hasPassword,
		resume.id
	]);
	const isPasswordProtected = resume.hasPassword;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBase, {
		type: "sharing",
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-x-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
				id: "sharing-switch",
				checked: resume.isPublic,
				onCheckedChange: (checked) => void onTogglePublic(checked)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
				htmlFor: "sharing-switch",
				className: "my-2 flex flex-col items-start gap-y-1 font-normal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "b6Bgh1" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "iJrhwp" })
				})]
			})]
		}), resume.isPublic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 rounded-md border p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "sharing-url",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "IagCbF" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-x-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							readOnly: true,
							id: "sharing-url",
							value: publicUrl
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "icon",
							variant: "ghost",
							onClick: onCopyUrl,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$9, {})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: isPasswordProtected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8DFBFr" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "I0mznD" })
				}),
				isPasswordProtected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "outline",
					onClick: onRemovePassword,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$5, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "NDbKCu" })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "outline",
					onClick: onSetPassword,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$4, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "2gHjVM" })]
				})
			]
		})]
	});
}
function StatisticsSectionBuilder() {
	const params = useParams({ from: "/builder/$resumeId" });
	const { data: statistics } = useQuery(orpc.resume.statistics.getById.queryOptions({ input: { id: params.resumeId } }));
	if (!statistics) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBase, {
		type: "statistics",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion$1, {
			value: statistics.isPublic ? ["isPublic"] : ["isPrivate"],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem, {
				value: "isPrivate",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
					className: "pb-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$13, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "_tmjps" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1Tqm6o" }) })
					] })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem, {
				value: "isPublic",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
					className: "grid @md:grid-cols-2 grid-cols-1 gap-4 pb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatisticsItem, {
						label: i18n._({ id: "1I6UoR" }),
						value: statistics.views,
						timestamp: statistics.lastViewedAt ? i18n._({
							id: "tH2we6",
							values: { 0: statistics.lastViewedAt.toDateString() }
						}) : null
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatisticsItem, {
						label: i18n._({ id: "fK7YOw" }),
						value: statistics.downloads,
						timestamp: statistics.lastDownloadedAt ? i18n._({
							id: "jkRMiN",
							values: { 0: statistics.lastDownloadedAt.toDateString() }
						}) : null
					})]
				})
			})]
		})
	});
}
function StatisticsItem({ label, value, timestamp }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "mb-1 font-bold font-mono text-4xl",
			children: value
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-muted-foreground leading-none",
			children: label
		}),
		timestamp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground text-xs",
			children: timestamp
		})
	] });
}
function TemplateSectionBuilder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBase, {
		type: "template",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateSectionForm, {})
	});
}
function TemplateSectionForm() {
	const { i18n } = useLingui();
	const openDialog = useDialogStore((state) => state.openDialog);
	const metadata = templates[useCurrentResume().data.metadata.template];
	const onOpenTemplateGallery = () => {
		openDialog("resume.template.gallery", void 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex @md:flex-row flex-col items-stretch gap-x-4 gap-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
			variant: "ghost",
			onClick: onOpenTemplateGallery,
			className: "group/preview relative h-auto w-40 shrink-0 cursor-pointer p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 aspect-page size-full overflow-hidden rounded-md opacity-100 transition-opacity group-hover/preview:opacity-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: metadata.imageUrl,
					alt: metadata.name,
					className: "size-full object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a$2, {
					size: 48,
					weight: "thin",
					className: "size-12"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col space-y-4 @md:pt-1 @md:pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-2xl capitalize tracking-tight",
					children: metadata.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: i18n.t(metadata.description)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2.5",
				children: metadata.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					children: tag
				}, tag))
			})]
		})]
	});
}
var loadedFonts = /* @__PURE__ */ new Set();
function FontDisplay({ family, label, type, url }) {
	const previewName = type === "standard" ? family : `${family} Preview`;
	const containerRef = (0, import_react.useRef)(null);
	const [isLoaded, setIsLoaded] = (0, import_react.useState)(() => type === "standard" || loadedFonts.has(previewName));
	const isInView = useInView(containerRef, {
		once: true,
		amount: .1,
		margin: "50px"
	});
	(0, import_react.useEffect)(() => {
		if (!isInView || isLoaded || !url) return;
		new FontFace(previewName, `url(${url})`, { display: "swap" }).load().then((loadedFace) => {
			if (!document.fonts.has(loadedFace)) document.fonts.add(loadedFace);
			loadedFonts.add(previewName);
			setIsLoaded(true);
		});
	}, [
		isInView,
		isLoaded,
		previewName,
		url
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: "inline-flex items-baseline gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: { fontFamily: isLoaded ? `'${previewName}', sans-serif` : "sans-serif" },
			className: cn(isLoaded ? "opacity-100" : "opacity-50", "transition-opacity duration-200 ease-in"),
			children: label
		}), label !== family && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground text-xs",
			children: family
		})]
	});
}
function getNextWeights(fontFamily) {
	const fontData = getFont(fontFamily);
	if (!fontData || !Array.isArray(fontData.weights) || fontData.weights.length === 0) return null;
	const uniqueWeights = Array.from(new Set(fontData.weights));
	const weights = [];
	if (uniqueWeights.includes("400")) weights.push("400");
	if (uniqueWeights.includes("600")) weights.push("600");
	while (weights.length < 2 && uniqueWeights.length > 0) {
		const lastIndex = uniqueWeights.length - 1;
		const candidate = weights.length === 0 ? uniqueWeights[0] : uniqueWeights[lastIndex];
		if (!weights.includes(candidate)) weights.push(candidate);
		else break;
	}
	return weights.length > 0 ? weights : null;
}
function FontFamilyCombobox({ className, ...props }) {
	const options = (0, import_react.useMemo)(() => {
		return fontList.map((font) => ({
			value: font.family,
			keywords: getFontSearchKeywords(font.family),
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontDisplay, {
				family: font.family,
				label: getFontDisplayName(font.family),
				type: font.type,
				url: "preview" in font ? font.preview : void 0
			})
		}));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox$1, {
		...props,
		options,
		className: cn("w-full", className)
	});
}
function FontWeightCombobox({ fontFamily, onValueChange, value, defaultValue, ...props }) {
	const options = (0, import_react.useMemo)(() => {
		const fontData = getFont(fontFamily);
		let weights = [];
		if (fontData && Array.isArray(fontData.weights) && fontData.weights.length > 0) weights = sortFontWeights(fontData.weights);
		else weights = [
			"100",
			"200",
			"300",
			"400",
			"500",
			"600",
			"700",
			"800",
			"900"
		];
		return weights.map((variant) => ({
			value: variant,
			label: variant,
			keywords: [variant]
		}));
	}, [fontFamily]);
	const sortedValue = (0, import_react.useMemo)(() => value ? sortFontWeights(value) : value, [value]);
	const sortedDefaultValue = (0, import_react.useMemo)(() => defaultValue ? sortFontWeights(defaultValue) : defaultValue, [defaultValue]);
	const handleValueChange = (0, import_react.useCallback)((nextValue) => {
		onValueChange?.(nextValue ? sortFontWeights(nextValue) : nextValue);
	}, [onValueChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combobox$1, {
		...props,
		value: sortedValue,
		defaultValue: sortedDefaultValue,
		onValueChange: handleValueChange,
		multiple: true,
		options
	});
}
function TypographySectionBuilder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBase, {
		type: "typography",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypographySectionForm, {})
	});
}
var formSchema = typographySchema;
function TypographySectionForm() {
	const typography = useResume()?.data.metadata.typography;
	const updateResumeData = useUpdateResumeData();
	const persist = (data) => {
		updateResumeData((draft) => {
			draft.metadata.typography.body = data.body;
			draft.metadata.typography.heading = data.heading;
		});
	};
	const form = useAppForm({
		defaultValues: typography,
		validators: { onChange: formSchema },
		onSubmit: ({ value }) => {
			persist(value);
		}
	});
	useSyncFormValues(form, typography);
	const handleAutoSave = () => {
		persist(form.state.values);
	};
	const bodyFontFamily = useStore(form.store, (s) => s.values.body.fontFamily);
	const headingFontFamily = useStore(form.store, (s) => s.values.heading.fontFamily);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid @md:grid-cols-2 grid-cols-1 gap-4",
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			form.handleSubmit();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-full flex items-center gap-x-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "basis-[16px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 font-medium text-base leading-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "y5Ha8G" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "flex-1" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "body.fontFamily",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "col-span-full",
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "X-U6_w" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontFamilyCombobox, {
							value: field.state.value,
							className: "text-base",
							onValueChange: (value) => {
								if (value === null) return;
								field.handleChange(value);
								const nextWeights = getNextWeights(value);
								if (nextWeights) form.setFieldValue("body.fontWeights", nextWeights);
								handleAutoSave();
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "body.fontWeights",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "col-span-full",
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dyI_91" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontWeightCombobox, {
							value: field.state.value,
							fontFamily: bodyFontFamily,
							onValueChange: (value) => {
								if (value?.length === 0) return;
								field.handleChange(value);
								handleAutoSave();
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "body.fontSize",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cGeFup" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
						name: field.name,
						value: field.state.value,
						min: 6,
						max: 24,
						step: .1,
						type: "number",
						onBlur: field.handleBlur,
						onChange: (e) => {
							const value = e.target.value;
							if (value === "") field.handleChange("");
							else field.handleChange(Number(value));
							handleAutoSave();
						}
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
						align: "inline-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "pt" })
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "body.lineHeight",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "DVnBSM" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
						name: field.name,
						value: field.state.value,
						min: .5,
						max: 4,
						step: .05,
						type: "number",
						onBlur: field.handleBlur,
						onChange: (e) => {
							const value = e.target.value;
							if (value === "") field.handleChange("");
							else field.handleChange(Number(value));
							handleAutoSave();
						}
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
						align: "inline-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "x" })
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-full flex items-center gap-x-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "basis-[16px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 font-medium text-base leading-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "KHOTes" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "flex-1" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "heading.fontFamily",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "col-span-full",
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "X-U6_w" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontFamilyCombobox, {
							value: field.state.value,
							className: "text-base",
							onValueChange: (value) => {
								if (value === null) return;
								field.handleChange(value);
								const nextWeights = getNextWeights(value);
								if (nextWeights) form.setFieldValue("heading.fontWeights", nextWeights);
								handleAutoSave();
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "heading.fontWeights",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					className: "col-span-full",
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "eD_eCt" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontWeightCombobox, {
							value: field.state.value,
							fontFamily: headingFontFamily,
							onValueChange: (value) => {
								if (value?.length === 0) return;
								field.handleChange(value);
								handleAutoSave();
							}
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "heading.fontSize",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cGeFup" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
						name: field.name,
						value: field.state.value,
						min: 6,
						max: 24,
						step: .1,
						type: "number",
						onBlur: field.handleBlur,
						onChange: (e) => {
							const value = e.target.value;
							if (value === "") field.handleChange("");
							else field.handleChange(Number(value));
							handleAutoSave();
						}
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
						align: "inline-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "pt" })
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
				name: "heading.lineHeight",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
					hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "DVnBSM" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
						name: field.name,
						value: field.state.value,
						min: .5,
						max: 4,
						step: .05,
						type: "number",
						onBlur: field.handleBlur,
						onChange: (e) => {
							const value = e.target.value;
							if (value === "") field.handleChange("");
							else field.handleChange(Number(value));
							handleAutoSave();
						}
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
						align: "inline-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: "x" })
					})] })]
				})
			})
		]
	});
}
function getSectionComponent(type) {
	return M(type).with("template", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateSectionBuilder, {})).with("layout", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutSectionBuilder, {})).with("typography", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypographySectionBuilder, {})).with("design", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesignSectionBuilder, {})).with("page", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSectionBuilder, {})).with("notes", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesSectionBuilder, {})).with("sharing", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharingSectionBuilder, {})).with("statistics", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatisticsSectionBuilder, {})).with("analysis", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeAnalysisSectionBuilder, {})).with("export", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportSectionBuilder, {})).with("information", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InformationSectionBuilder, {})).exhaustive();
}
function BuilderSidebarRight() {
	const scrollAreaRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarEdge, { scrollAreaRef }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
		ref: scrollAreaRef,
		className: "@container h-[calc(100svh-3.5rem)] overflow-hidden bg-background sm:me-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 p-4",
			children: [rightSidebarSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [getSectionComponent(section), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {})] }, section)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copyright, { className: "mx-auto py-2 text-center" })]
		})
	})] });
}
function SidebarEdge({ scrollAreaRef }) {
	const toggleSidebar = useBuilderSidebar((state) => state.toggleSidebar);
	const scrollToSection = (0, import_react.useCallback)((section) => {
		if (!scrollAreaRef.current) return;
		toggleSidebar("right", true);
		scrollAreaRef.current.querySelector(`#sidebar-${section}`)?.scrollIntoView({
			block: "nearest",
			inline: "nearest",
			behavior: "smooth"
		});
	}, [toggleSidebar, scrollAreaRef]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderSidebarEdge, {
		side: "right",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-scrollbar min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-full flex-col items-center justify-center gap-y-2",
				children: rightSidebarSections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "icon",
					variant: "ghost",
					title: getSectionTitle(section),
					onClick: () => scrollToSection(section),
					children: getSectionIcon(section)
				}, section))
			})
		})
	});
}
function RouteComponent() {
	const { layout: initialLayout } = Route.useLoaderData();
	const { resumeId } = Route.useParams();
	const { data: resume } = useSuspenseQuery(orpc.resume.getById.queryOptions({ input: { id: resumeId } }));
	const initializeResumeStore = useInitializeResumeStore();
	const mergeResumeMetadata = useMergeResumeMetadata();
	const isReady = useResumeStore((state) => state.isReady);
	const initializedResumeId = useResumeStore((state) => state.resumeId);
	const isInitialized = isReady && initializedResumeId === resumeId;
	useResumeCleanup();
	useResumeUpdateSubscription();
	(0, import_react.useEffect)(() => {
		if (isInitialized) return;
		initializeResumeStore(resume);
	}, [
		initializeResumeStore,
		isInitialized,
		resume
	]);
	(0, import_react.useEffect)(() => {
		mergeResumeMetadata(resume);
	}, [
		mergeResumeMetadata,
		resume.id,
		resume.name,
		resume.slug,
		resume.tags,
		resume.isLocked,
		resume.isPublic,
		resume.hasPassword,
		resume.updatedAt,
		resume
	]);
	if (!isInitialized) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderLayoutShell, { initialLayout });
}
function BuilderLayoutShell({ initialLayout }) {
	const isMobile = useIsMobile();
	const canPersistLayoutRef = (0, import_react.useRef)(false);
	const leftSidebarRef = ln();
	const rightSidebarRef = ln();
	const setLeftSidebar = useBuilderSidebarStore((state) => state.setLeftSidebar);
	const setRightSidebar = useBuilderSidebarStore((state) => state.setRightSidebar);
	const setLayout = useBuilderSidebarStore((state) => state.setLayout);
	const { maxSidebarSize, collapsedSidebarSize } = useBuilderSidebar((state) => ({
		maxSidebarSize: state.maxSidebarSize,
		collapsedSidebarSize: state.collapsedSidebarSize
	}));
	(0, import_react.useEffect)(() => {
		setLayout(initialLayout);
		canPersistLayoutRef.current = true;
	}, [initialLayout, setLayout]);
	const onLayoutChanged = (layout) => {
		const nextLayout = mapPanelLayoutToBuilderLayout(layout);
		if (!canPersistLayoutRef.current) return;
		setLayout(nextLayout);
		setBuilderLayoutServerFn({ data: nextLayout });
	};
	(0, import_react.useEffect)(() => {
		if (!leftSidebarRef || !rightSidebarRef) return;
		setLeftSidebar(leftSidebarRef);
		setRightSidebar(rightSidebarRef);
	}, [
		leftSidebarRef,
		rightSidebarRef,
		setLeftSidebar,
		setRightSidebar
	]);
	const sidebarMinSize = isMobile ? "0%" : `${collapsedSidebarSize * 2}px`;
	const sidebarCollapsedSize = isMobile ? "0%" : `${collapsedSidebarSize}px`;
	const leftSidebarSize = isMobile ? "0%" : `${initialLayout.left}%`;
	const rightSidebarSize = isMobile ? "0%" : `${initialLayout.right}%`;
	const artboardSize = isMobile ? "100%" : `${initialLayout.artboard}%`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-svh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ResizableGroup, {
				orientation: "horizontal",
				className: "mt-14 flex-1",
				onLayoutChanged,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizablePanel, {
						collapsible: true,
						id: "left",
						panelRef: leftSidebarRef,
						maxSize: maxSidebarSize,
						minSize: sidebarMinSize,
						collapsedSize: sidebarCollapsedSize,
						defaultSize: leftSidebarSize,
						className: "z-20 h-[calc(100svh-3.5rem)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderSidebarLeft, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizableSeparator, {
						withHandle: true,
						className: "z-50 border-s"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizablePanel, {
						id: "artboard",
						defaultSize: artboardSize,
						className: "h-[calc(100svh-3.5rem)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizableSeparator, {
						withHandle: true,
						className: "z-50 border-e"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResizablePanel, {
						collapsible: true,
						id: "right",
						panelRef: rightSidebarRef,
						maxSize: maxSidebarSize,
						minSize: sidebarMinSize,
						collapsedSize: sidebarCollapsedSize,
						defaultSize: rightSidebarSize,
						className: "z-20 h-[calc(100svh-3.5rem)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderSidebarRight, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderAssistant, {})
		]
	});
}
var setBuilderLayoutServerFn = createServerFn({ method: "POST" }).inputValidator((data) => parseBuilderLayoutCookie(JSON.stringify(data))).handler(createSsrRpc("4cf8a2dd9971804ed852b0e8800e0801d53148f92b5cde984ecc2402a068ba3c"));
//#endregion
export { RouteComponent as component };
