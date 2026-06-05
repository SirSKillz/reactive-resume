import { o as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@ai-sdk/react+[...].mjs";
import { vt as zod_default } from "./_libs/@better-auth/api-key+[...].mjs";
import { f as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "./_libs/lingui__core.mjs";
import { n as cn } from "./_ssr/style-De8YRxv-.mjs";
import { m as orpc } from "./_ssr/client-O01ffOLq.mjs";
import { t as Button$1 } from "./_ssr/button-DJhXBADJ.mjs";
import { Bn as o, On as c, Xn as r$1, Yn as r, gt as a, jt as e, nt as e$1 } from "./_libs/phosphor-icons__react.mjs";
import { a as DialogFooter, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog$1 } from "./_ssr/dialog-CyV64b9F.mjs";
import { t as Input$1 } from "./_ssr/input-BlB5m6_6.mjs";
import { o as Textarea } from "./_ssr/input-group-BUPwXtm5.mjs";
import { a as FormMessage, i as FormLabel, o as useAppForm, r as FormItem, t as FormControl } from "./_ssr/tanstack-form-BM1OX7UY.mjs";
import { t as useFormBlocker } from "./_ssr/use-form-blocker-vCqqIVKt.mjs";
import { t as Separator$1 } from "./_ssr/separator-BDL9Bvz5.mjs";
import { t as Badge } from "./_ssr/badge-BOnUWx8o.mjs";
import { t as Route } from "./_campaignId-BKpA0Yvl.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, t as Sheet } from "./_ssr/sheet-ByBzK8eA.mjs";
import { t as DashboardHeader } from "./_ssr/header-Cf1o68Wv.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs$1 } from "./_ssr/tabs-CLGV1Lc8.mjs";
import { o as useQueryClient, r as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as Trans, r as useLingui } from "./_libs/lingui__react.mjs";
import { a as PointerSensor, g as CSS, h as useSensors, m as useSensor, n as DragOverlay, p as useDroppable, t as DndContext } from "./_libs/@dnd-kit/core+[...].mjs";
import { a as useSortable, o as verticalListSortingStrategy, t as SortableContext } from "./_libs/dnd-kit__sortable.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_campaignId-CXyPAuH7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_COLORS = {
	wishlist: "secondary",
	applied: "outline",
	interviewing: "default",
	offer: "default",
	rejected: "destructive",
	ghosted: "secondary"
};
function ApplicationDetailSheet({ application, open, onOpenChange }) {
	const { i18n: i18n$3 } = useLingui();
	const queryClient = useQueryClient();
	const statusLabels = (0, import_react.useMemo)(() => ({
		wishlist: i18n$3.t("Wishlist"),
		applied: i18n$3.t("Applied"),
		interviewing: i18n$3.t("Interviewing"),
		offer: i18n$3.t("Offer"),
		rejected: i18n$3.t("Rejected"),
		ghosted: i18n$3.t("Ghosted")
	}), [i18n$3]);
	const methodLabels = (0, import_react.useMemo)(() => ({
		linkedin: i18n$3.t("LinkedIn"),
		indeed: i18n$3.t("Indeed"),
		glassdoor: i18n$3.t("Glassdoor"),
		email: i18n$3.t("Email"),
		website: i18n$3.t("Company Website"),
		referral: i18n$3.t("Referral"),
		other: i18n$3.t("Other")
	}), [i18n$3]);
	const { data: activities } = useQuery({
		...orpc.jobApplication.activity.listByApplication.queryOptions({ input: { applicationId: application?.id ?? "" } }),
		enabled: !!application?.id && open
	});
	const { mutate: deleteApplication } = useMutation(orpc.jobApplication.application.delete.mutationOptions());
	const handleDelete = () => {
		if (!application) return;
		deleteApplication({ id: application.id }, {
			onSuccess: () => {
				queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions());
				toast.success(i18n._({ id: "qhbpqp" }));
				onOpenChange(false);
			},
			onError: () => {
				toast.error(i18n._({ id: "eSXF_i" }));
			}
		});
	};
	if (!application) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-full overflow-y-auto sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
					className: "pb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "text-xl leading-tight",
							children: application.jobTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: application.company
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: STATUS_COLORS[application.status] ?? "secondary",
									children: statusLabels[application.status] ?? application.status
								}),
								application.locationType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "capitalize",
									children: application.locationType
								}),
								application.applicationMethod && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: methodLabels[application.applicationMethod] ?? application.applicationMethod
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "my-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
					defaultValue: "overview",
					className: "flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "overview",
									className: "flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "6_dCYd" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "description",
									className: "flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dztZuC" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "activity",
									className: "flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "XJOV1Y" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "overview",
							className: "mt-4 space-y-3",
							children: [
								application.jobUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: i18n._({ id: "XCNc63" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: application.jobUrl,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "text-primary flex items-center gap-1 text-sm underline-offset-4 hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: application.jobUrl
										})]
									})
								}),
								application.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: i18n._({ id: "wJijgU" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: application.location
									})
								}),
								application.salary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: i18n._({ id: "bUqwb8" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: application.salary
									})
								}),
								application.appliedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: i18n._({ id: "ICrzHR" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: new Date(application.appliedAt).toLocaleDateString()
									})
								}),
								application.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: i18n._({ id: "1DBGsz" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm whitespace-pre-wrap",
										children: application.notes
									})
								}),
								application.resumeId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: i18n._({ id: "v39wLo" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
										variant: "outline",
										size: "sm",
										render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/builder/$resumeId",
											params: { resumeId: application.resumeId }
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "skjgZ4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, { className: "size-3.5" })]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "description",
							className: "mt-4",
							children: application.jobDescription ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm whitespace-pre-wrap",
								children: application.jobDescription
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hyKhcQ" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "activity",
							className: "mt-4 space-y-3",
							children: [activities?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "Jr8VX0" })
							}), activities?.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c, { className: "text-muted-foreground mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: [
										entry.type === "created" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "-Aw1xs" }) }),
										entry.type === "status_changed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
											id: "Ie33rT",
											values: {
												0: statusLabels[entry.fromStatus ?? ""] ?? entry.fromStatus,
												1: statusLabels[entry.toStatus ?? ""] ?? entry.toStatus
											},
											components: {
												0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {}),
												1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {})
											}
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground mt-0.5 text-xs",
											children: new Date(entry.createdAt).toLocaleString()
										})
									]
								})]
							}, entry.id))]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "my-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "destructive",
						size: "sm",
						onClick: handleDelete,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "WMoMB9" })
					})
				})
			]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground text-xs font-medium uppercase tracking-wide",
			children: label
		}), children]
	});
}
var STATUS_OPTIONS = [
	{
		value: "wishlist",
		label: { id: "I0D__A" }
	},
	{
		value: "applied",
		label: { id: "wTOwz-" }
	},
	{
		value: "interviewing",
		label: { id: "goklcJ" }
	},
	{
		value: "offer",
		label: { id: "9h7RDh" }
	},
	{
		value: "rejected",
		label: { id: "ekCRTP" }
	},
	{
		value: "ghosted",
		label: { id: "-CzYC_" }
	}
];
var LOCATION_TYPE_OPTIONS = [
	{
		value: "remote",
		label: { id: "qlAIQ1" }
	},
	{
		value: "hybrid",
		label: { id: "Z2hVSb" }
	},
	{
		value: "onsite",
		label: { id: "YHeQAf" }
	}
];
var METHOD_OPTIONS = [
	{
		value: "linkedin",
		label: { id: "gggTBm" }
	},
	{
		value: "indeed",
		label: { id: "caAh_o" }
	},
	{
		value: "glassdoor",
		label: { id: "JoZuB0" }
	},
	{
		value: "email",
		label: { id: "O3oNi5" }
	},
	{
		value: "website",
		label: { id: "YprjF7" }
	},
	{
		value: "referral",
		label: { id: "veQuE7" }
	},
	{
		value: "other",
		label: { id: "_IX_7x" }
	}
];
var formSchema = zod_default.object({
	company: zod_default.string().min(1),
	jobTitle: zod_default.string().min(1),
	jobUrl: zod_default.string(),
	location: zod_default.string(),
	locationType: zod_default.string(),
	salary: zod_default.string(),
	status: zod_default.string().min(1),
	jobDescription: zod_default.string(),
	notes: zod_default.string(),
	applicationMethod: zod_default.string(),
	resumeId: zod_default.string(),
	appliedAt: zod_default.string()
});
function CreateApplicationDialog({ campaignId }) {
	const { i18n: i18n$2 } = useLingui();
	const [open, setOpen] = (0, import_react.useState)(false);
	const queryClient = useQueryClient();
	const { data: resumes } = useQuery(orpc.resume.list.queryOptions());
	const { mutate: createApplication, isPending } = useMutation(orpc.jobApplication.application.create.mutationOptions());
	const form = useAppForm({
		defaultValues: {
			company: "",
			jobTitle: "",
			jobUrl: "",
			location: "",
			locationType: "",
			salary: "",
			status: "wishlist",
			jobDescription: "",
			notes: "",
			applicationMethod: "",
			resumeId: "",
			appliedAt: ""
		},
		validators: { onSubmit: formSchema },
		onSubmit: ({ value }) => {
			createApplication({
				campaignId,
				company: value.company.trim(),
				jobTitle: value.jobTitle.trim(),
				jobUrl: value.jobUrl.trim() || null,
				location: value.location.trim() || null,
				locationType: value.locationType || null,
				salary: value.salary.trim() || null,
				status: value.status,
				jobDescription: value.jobDescription.trim() || null,
				notes: value.notes.trim() || null,
				applicationMethod: value.applicationMethod || null,
				resumeId: value.resumeId || null,
				appliedAt: value.appliedAt ? new Date(value.appliedAt) : null
			}, {
				onSuccess: () => {
					queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions());
					toast.success(i18n._({ id: "-qAFUr" }));
					setOpen(false);
					form.reset();
				},
				onError: () => {
					toast.error(i18n._({ id: "cVjWnM" }));
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "NchHF8" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "GUARmM" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "p8pcmX" }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "contents",
				onSubmit: (event) => {
					event.preventDefault();
					event.stopPropagation();
					form.handleSubmit();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 py-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "company",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "7i8j3G" }),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										name: field.name,
										value: field.state.value,
										onBlur: field.handleBlur,
										onChange: (e) => field.handleChange(e.target.value)
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "jobTitle",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								hasError: field.state.meta.isTouched && field.state.meta.errors.length > 0,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "27z-FV" }),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-destructive",
											children: "*"
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										name: field.name,
										value: field.state.value,
										onBlur: field.handleBlur,
										onChange: (e) => field.handleChange(e.target.value)
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, { errors: field.state.meta.errors })
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "status",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "uAQUqI" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (e) => field.handleChange(e.target.value),
								className: "border-input bg-background text-foreground h-9 w-full rounded-md border px-3 text-sm",
								children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: o.value,
									children: i18n$2._(o.label)
								}, o.value))
							}) })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "applicationMethod",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "XZ4Hzc" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (e) => field.handleChange(e.target.value),
								className: "border-input bg-background text-foreground h-9 w-full rounded-md border px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EQ5tG3" })
								}), METHOD_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: o.value,
									children: i18n$2._(o.label)
								}, o.value))]
							}) })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "jobUrl",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "XCNc63" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									type: "url",
									name: field.name,
									value: field.state.value,
									onBlur: field.handleBlur,
									onChange: (e) => field.handleChange(e.target.value),
									placeholder: "https://..."
								}) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "location",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "wJijgU" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (e) => field.handleChange(e.target.value),
								placeholder: "City, Country"
							}) })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "locationType",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "4sg5Qp" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (e) => field.handleChange(e.target.value),
								className: "border-input bg-background text-foreground h-9 w-full rounded-md border px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "EQ5tG3" })
								}), LOCATION_TYPE_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: o.value,
									children: i18n$2._(o.label)
								}, o.value))]
							}) })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "salary",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "bUqwb8" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (e) => field.handleChange(e.target.value),
								placeholder: "$80k – $100k"
							}) })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "appliedAt",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "ICrzHR" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "date",
								name: field.name,
								value: field.state.value,
								onBlur: field.handleBlur,
								onChange: (e) => field.handleChange(e.target.value)
							}) })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "resumeId",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "AALENW" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: field.name,
									value: field.state.value,
									onBlur: field.handleBlur,
									onChange: (e) => field.handleChange(e.target.value),
									className: "border-input bg-background text-foreground h-9 w-full rounded-md border px-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "32VsFG" })
									}), resumes?.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: r.id,
										children: r.name
									}, r.id))]
								}) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "notes",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "1DBGsz" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									name: field.name,
									value: field.state.value,
									onBlur: field.handleBlur,
									onChange: (e) => field.handleChange(e.target.value),
									rows: 2
								}) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "jobDescription",
							children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dztZuC" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									name: field.name,
									value: field.state.value,
									onBlur: field.handleBlur,
									onChange: (e) => field.handleChange(e.target.value),
									rows: 4,
									placeholder: i18n._({ id: "A8wTuc" })
								}) })]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					type: "button",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dEgA5A" })
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "submit",
					disabled: isPending,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "NchHF8" })
				})] })]
			})]
		})]
	});
}
function ApplicationCard({ application, onClick }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: application.id,
		data: { application }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition
		},
		...attributes,
		...listeners,
		className: cn("bg-card cursor-grab rounded-md border p-3 shadow-xs select-none", "hover:border-primary/30 transition-colors", isDragging && "cursor-grabbing opacity-50"),
		onClick: () => onClick(application),
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick(application);
			}
		},
		tabIndex: 0,
		role: "button",
		"aria-label": i18n._({
			id: "QglPWi",
			values: {
				0: application.jobTitle,
				1: application.company
			}
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-sm leading-tight",
				children: application.jobTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-0.5 text-xs",
				children: application.company
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-1.5",
				children: [
					application.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground flex items-center gap-0.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a, { className: "size-3" }), application.location]
					}),
					application.locationType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "capitalize h-4 px-1.5 text-[10px]",
						children: application.locationType
					}),
					application.resumeId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground flex items-center gap-0.5 text-xs",
						title: i18n._({ id: "X-Shd_" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, { className: "size-3" })
					}),
					application.jobUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground flex items-center gap-0.5 text-xs",
						title: i18n._({ id: "XCNc63" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, { className: "size-3" })
					})
				]
			})
		]
	});
}
var COLUMNS = [
	{
		status: "wishlist",
		label: { id: "I0D__A" }
	},
	{
		status: "applied",
		label: { id: "wTOwz-" }
	},
	{
		status: "interviewing",
		label: { id: "goklcJ" }
	},
	{
		status: "offer",
		label: { id: "9h7RDh" }
	},
	{
		status: "rejected",
		label: { id: "ekCRTP" }
	},
	{
		status: "ghosted",
		label: { id: "-CzYC_" }
	}
];
function KanbanBoard({ applications, onCardClick }) {
	const { i18n: i18n$1 } = useLingui();
	const [activeApplication, setActiveApplication] = (0, import_react.useState)(null);
	const queryClient = useQueryClient();
	const { mutate: updateStatus } = useMutation(orpc.jobApplication.application.updateStatus.mutationOptions());
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
	const byStatus = (status) => applications.filter((a) => a.status === status);
	const handleDragEnd = (event) => {
		setActiveApplication(null);
		const { active, over } = event;
		if (!over) return;
		const newStatus = over.id;
		if (!COLUMNS.some((c) => c.status === newStatus)) return;
		const app = applications.find((a) => a.id === active.id);
		if (!app || app.status === newStatus) return;
		queryClient.setQueryData(orpc.jobApplication.application.list.queryOptions().queryKey, (old) => old?.map((a) => a.id === app.id ? {
			...a,
			status: newStatus
		} : a));
		updateStatus({
			id: app.id,
			status: newStatus
		}, { onError: () => {
			toast.error(i18n._({ id: "goMNcr" }));
			queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions());
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DndContext, {
		sensors,
		onDragStart: (e) => {
			const app = applications.find((a) => a.id === e.active.id);
			if (app) setActiveApplication(app);
		},
		onDragEnd: handleDragEnd,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-3 overflow-x-auto pb-4",
			children: COLUMNS.map(({ status, label }) => {
				const columnApps = byStatus(status);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanbanColumn, {
					status,
					label: i18n$1._(label),
					applications: columnApps,
					onCardClick
				}, status);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DragOverlay, { children: activeApplication && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationCard, {
			application: activeApplication,
			onClick: () => {}
		}) })]
	});
}
function KanbanColumn({ status, label, applications, onCardClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-secondary/30 flex w-64 shrink-0 flex-col gap-2 rounded-lg p-2",
		"data-status": status,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-1 py-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-sm",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				className: "h-5 px-1.5 text-xs",
				children: applications.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
			id: status,
			items: applications.map((a) => a.id),
			strategy: verticalListSortingStrategy,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DroppableColumn, {
				status,
				children: applications.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationCard, {
					application: app,
					onClick: onCardClick
				}, app.id))
			})
		})]
	});
}
function DroppableColumn({ status, children }) {
	const { setNodeRef } = useDroppable({ id: status });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: setNodeRef,
		className: "flex min-h-20 flex-col gap-2",
		children
	});
}
function RouteComponent() {
	const { campaignId } = Route.useParams();
	const [selectedApplication, setSelectedApplication] = (0, import_react.useState)(null);
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const { data: campaigns } = useQuery(orpc.jobApplication.campaign.list.queryOptions());
	const { data: applications, isLoading } = useQuery(orpc.jobApplication.application.list.queryOptions({ input: { campaignId } }));
	const campaign = campaigns?.find((c) => c.id === campaignId);
	const handleCardClick = (application) => {
		setSelectedApplication(application);
		setSheetOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "ghost",
						size: "icon",
						className: "shrink-0",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/jobs" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$1, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
						title: campaign?.name ?? i18n._({ id: "D02dD9" }),
						icon: o
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateApplicationDialog, { campaignId })]
			}),
			campaign?.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground ps-12 text-sm",
				children: campaign.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-3",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-secondary/40 h-64 w-64 shrink-0 animate-pulse rounded-lg" }, i))
			}),
			!isLoading && applications?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "YYNIOp" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "ieFNht" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateApplicationDialog, { campaignId })
				]
			}),
			!isLoading && applications && applications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanbanBoard, {
				applications,
				onCardClick: handleCardClick
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationDetailSheet, {
				application: selectedApplication,
				open: sheetOpen,
				onOpenChange: setSheetOpen
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
