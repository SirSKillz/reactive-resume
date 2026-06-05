import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { vt as zod_default } from "../_libs/@better-auth/api-key+[...].mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { m as orpc } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { Bn as o, nt as e } from "../_libs/phosphor-icons__react.mjs";
import { a as DialogFooter, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog$1 } from "./dialog-CyV64b9F.mjs";
import { t as Input$1 } from "./input-BlB5m6_6.mjs";
import { o as Textarea } from "./input-group-BUPwXtm5.mjs";
import { a as FormMessage, i as FormLabel, o as useAppForm, r as FormItem, t as FormControl } from "./tanstack-form-BM1OX7UY.mjs";
import { t as useFormBlocker } from "./use-form-blocker-vCqqIVKt.mjs";
import { t as DashboardHeader } from "./header-Cf1o68Wv.mjs";
import { o as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-DnFTftQp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formSchema = zod_default.object({
	name: zod_default.string().min(1),
	description: zod_default.string()
});
function CreateCampaignDialog() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const queryClient = useQueryClient();
	const { mutate: createCampaign, isPending } = useMutation(orpc.jobApplication.campaign.create.mutationOptions());
	const form = useAppForm({
		defaultValues: {
			name: "",
			description: ""
		},
		validators: { onSubmit: formSchema },
		onSubmit: ({ value }) => {
			createCampaign({
				name: value.name,
				description: value.description || null
			}, {
				onSuccess: () => {
					queryClient.invalidateQueries(orpc.jobApplication.campaign.list.queryOptions());
					toast.success(i18n._({ id: "DjSRH8" }));
					setOpen(false);
					form.reset();
				},
				onError: () => {
					toast.error(i18n._({ id: "TbSYa6" }));
				}
			});
		}
	});
	useFormBlocker(form);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog$1, {
		open,
		onOpenChange: (next) => {
			if (!next) form.reset();
			setOpen(next);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "yGfI61" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "93PuJN" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8EKTbw" }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
									onChange: (e) => field.handleChange(e.target.value),
									placeholder: i18n._({ id: "_TETCI" })
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "description",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Nu4oKW" }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground text-xs",
								children: [
									"(",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "AWA6XY" }),
									")"
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							name: field.name,
							value: field.state.value,
							onBlur: field.handleBlur,
							onChange: (e) => field.handleChange(e.target.value),
							rows: 3,
							placeholder: i18n._({ id: "5wN1Dx" })
						}) })] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						type: "button",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dEgA5A" })
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: isPending,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hYgDIe" })
					})] })
				]
			})]
		})]
	});
}
function RouteComponent() {
	const { data: campaigns, isLoading } = useQuery(orpc.jobApplication.campaign.list.queryOptions());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-x-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
					title: i18n._({ id: "Tof7pX" }),
					icon: o
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateCampaignDialog, {})]
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-secondary/40 h-28 animate-pulse rounded-lg" }, i))
			}),
			!isLoading && campaigns?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4 py-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
						weight: "light",
						className: "text-muted-foreground size-16"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "7VdoRp" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "kDBubd" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateCampaignDialog, {})
				]
			}),
			!isLoading && campaigns && campaigns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: campaigns.map((campaign) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard/jobs/$campaignId",
					params: { campaignId: campaign.id },
					className: "group bg-card hover:border-primary/50 flex flex-col gap-2 rounded-lg border p-5 shadow-xs transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
							weight: "light",
							className: "text-primary mt-0.5 size-5 shrink-0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground text-xs whitespace-nowrap",
							children: new Date(campaign.createdAt).toLocaleDateString()
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold leading-tight",
						children: campaign.name
					}), campaign.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-1 text-sm line-clamp-2",
						children: campaign.description
					})] })]
				}, campaign.id))
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
