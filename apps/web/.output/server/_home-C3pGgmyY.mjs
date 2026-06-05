import { o as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@ai-sdk/react+[...].mjs";
import { f as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "./_libs/lingui__core.mjs";
import { n as cn } from "./_ssr/style-De8YRxv-.mjs";
import { m as orpc } from "./_ssr/client-O01ffOLq.mjs";
import { n as buttonVariants, t as Button$1 } from "./_ssr/button-DJhXBADJ.mjs";
import { $ as e$8, Bt as o, Dn as r$1, Ft as o$6, Gt as e$3, K as o$7, Kt as t, Nt as t$2, Ot as e$5, St as e$4, Tn as o$9, V as o$1, Wn as e$7, Yn as r$2, Z as e, _n as o$4, c as o$2, en as o$8, et as r, gn as e$1, h as e$2, i as o$3, lt as t$1, nn as o$5, pn as o$10, t as e$6, tn as o$11 } from "./_libs/phosphor-icons__react.mjs";
import { t as Badge } from "./_ssr/badge-BOnUWx8o.mjs";
import { i as useQueries } from "./_libs/tanstack__react-query.mjs";
import { n as Trans } from "./_libs/lingui__react.mjs";
import { t as BrandIcon } from "./_ssr/brand-icon-WdLQXPMU.mjs";
import { l as motion } from "./_libs/framer-motion.mjs";
import { t as CometCard } from "./_ssr/comet-card-D0SCutVv.mjs";
import { t as templates } from "./_ssr/data-CxwmqxYs.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion$1 } from "./_ssr/accordion-DOawwzaM.mjs";
import { t as Copyright } from "./_ssr/copyright-rnEqIkLA.mjs";
import { t as CountUp } from "./_ssr/count-up-VniHQ91S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_home-C3pGgmyY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FloatingIcon = ({ icon: Icon, className, delay = 0 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
	className: cn("absolute text-primary/20", className),
	animate: {
		y: [
			0,
			-12,
			0
		],
		rotate: [
			0,
			5,
			-5,
			0
		],
		scale: [
			1,
			1.1,
			1
		]
	},
	transition: {
		duration: 4,
		repeat: Number.POSITIVE_INFINITY,
		delay,
		ease: "easeInOut"
	},
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		size: 32,
		weight: "duotone"
	})
});
var PulsingHeart = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
	className: "relative inline-flex items-center justify-center",
	animate: { scale: [
		1,
		1.15,
		1
	] },
	transition: {
		duration: 1.5,
		repeat: Number.POSITIVE_INFINITY,
		ease: "easeInOut"
	},
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
		size: 48,
		weight: "fill",
		className: "text-rose-500"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "absolute inset-0 flex items-center justify-center",
		animate: {
			scale: [1, 1.8],
			opacity: [.6, 0]
		},
		transition: {
			duration: 1.5,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeOut"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
			size: 48,
			weight: "fill",
			className: "text-rose-500"
		})
	})]
});
var SparkleEffect = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
	className: cn("absolute", className),
	animate: {
		scale: [
			0,
			1,
			0
		],
		opacity: [
			0,
			1,
			0
		],
		rotate: [0, 180]
	},
	transition: {
		duration: 2,
		repeat: Number.POSITIVE_INFINITY,
		ease: "easeInOut"
	},
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {
		size: 16,
		weight: "fill",
		className: "text-amber-400"
	})
});
var FeatureCard$1 = ({ icon: Icon, title, description, delay }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
	className: "group relative flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card/80",
	initial: {
		opacity: 0,
		y: 20
	},
	whileInView: {
		opacity: 1,
		y: 0
	},
	viewport: { once: true },
	transition: {
		duration: .5,
		delay
	},
	whileHover: { y: -4 },
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"aria-hidden": "true",
			className: "flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/20",
			whileHover: { rotate: [
				0,
				-10,
				10,
				0
			] },
			transition: { duration: .4 },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				size: 24,
				weight: "light"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-semibold tracking-tight",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground leading-relaxed",
			children: description
		})
	]
});
var DonationBanner = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
	className: "relative overflow-hidden bg-linear-to-b from-background via-primary/2 to-background py-24",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": "true",
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
				icon: o,
				className: "top-[20%] left-[10%]",
				delay: 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
				icon: o$1,
				className: "top-[15%] right-[15%]",
				delay: .5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
				icon: o$2,
				className: "bottom-[25%] left-[8%]",
				delay: 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
				icon: o$3,
				className: "right-[12%] bottom-[30%]",
				delay: 1.5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
				icon: e,
				className: "top-[35%] right-[25%]",
				delay: 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingIcon, {
				icon: o,
				className: "bottom-[20%] left-[20%]",
				delay: 2.5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-s-32 top-1/4 size-64 rounded-full bg-primary/5 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-e-32 bottom-1/4 size-64 rounded-full bg-rose-500/5 blur-3xl" })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container relative px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "flex flex-col items-center text-center",
				initial: {
					opacity: 0,
					y: 20
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .6 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"aria-hidden": "true",
						className: "relative mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PulsingHeart, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkleEffect, { className: "-inset-e-4 -top-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparkleEffect, { className: "-inset-s-3 bottom-0" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
						className: "mb-6 font-semibold text-2xl tracking-tight md:text-4xl xl:text-5xl",
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .6,
							delay: .1
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dnsjwu" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						className: "max-w-3xl text-base text-muted-foreground leading-relaxed",
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .6,
							delay: .2
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "gaGeD7" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto my-12 grid max-w-5xl gap-8 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard$1, {
						icon: e,
						title: i18n._({ id: "FQU5Sm" }),
						description: i18n._({ id: "rSoEbU" }),
						delay: .3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard$1, {
						icon: o$3,
						title: i18n._({ id: "VUMeMO" }),
						description: i18n._({ id: "qLz9ng" }),
						delay: .4
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard$1, {
						icon: o$2,
						title: i18n._({ id: "elV_rC" }),
						description: i18n._({ id: "h3zFHX" }),
						delay: .5
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "flex flex-col items-center justify-center gap-4 sm:flex-row",
				initial: {
					opacity: 0,
					y: 20
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: {
					duration: .6,
					delay: .6
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "lg",
					nativeButton: false,
					className: "h-11 gap-2 px-6",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://opencollective.com/reactive-resume/donate",
						target: "_blank",
						rel: "noopener",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {
								"aria-hidden": "true",
								weight: "fill",
								className: "text-rose-400 dark:text-rose-600"
							}),
							"Open Collective",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "sr-only",
								children: [
									" (",
									i18n._({ id: "b8VFy2" }),
									")"
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "lg",
					nativeButton: false,
					className: "h-11 gap-2 px-6",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://github.com/sponsors/AmruthPillai",
						target: "_blank",
						rel: "noopener",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {
								"aria-hidden": "true",
								weight: "fill",
								className: "text-zinc-400 dark:text-zinc-600"
							}),
							"GitHub Sponsors",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "sr-only",
								children: [
									" (",
									i18n._({ id: "b8VFy2" }),
									")"
								]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				className: "mt-8 text-center text-muted-foreground leading-relaxed",
				initial: { opacity: 0 },
				whileInView: { opacity: 1 },
				viewport: { once: true },
				transition: {
					duration: .6,
					delay: .8
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
					id: "XdwYgx",
					components: { 0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}) }
				})
			})
		]
	})]
});
var crowdinUrl = "https://crowdin.com/project/reactive-resume";
var getFaqItems = () => [
	{
		question: i18n._({ id: "UcFlBL" }),
		answer: i18n._({ id: "neTtOY" })
	},
	{
		question: i18n._({ id: "8U_RAG" }),
		answer: i18n._({ id: "pAIX4O" })
	},
	{
		question: i18n._({ id: "UsKNgU" }),
		answer: i18n._({ id: "j3mnZG" })
	},
	{
		question: i18n._({ id: "Kz-aix" }),
		answer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
			id: "-ajQ1Q",
			components: {
				0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: crowdinUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					className: buttonVariants({
						variant: "link",
						className: "h-auto px-0!"
					})
				}),
				1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only" })
			}
		})
	},
	{
		question: i18n._({ id: "YbQhsT" }),
		answer: i18n._({ id: "dl6JNA" })
	},
	{
		question: i18n._({ id: "ChyHA8" }),
		answer: i18n._({ id: "Cl3Ea6" })
	}
];
function FAQ() {
	const faqItems = getFaqItems();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "frequently-asked-questions",
		className: "flex flex-col gap-x-16 gap-y-6 p-4 md:p-8 lg:flex-row lg:gap-x-18 xl:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
			className: cn("flex-1 font-semibold text-2xl tracking-tight will-change-[transform,opacity] md:text-4xl xl:text-5xl", "flex shrink-0 flex-wrap items-center gap-x-1.5 lg:flex-col lg:items-start"),
			initial: {
				opacity: 0,
				x: -20
			},
			whileInView: {
				opacity: 1,
				x: 0
			},
			viewport: { once: true },
			transition: { duration: .45 },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
				id: "fAf7kF",
				components: {
					0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					2: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				}
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: { once: true },
			transition: {
				duration: .45,
				delay: .08
			},
			className: "max-w-2xl flex-2 will-change-[transform,opacity] lg:ml-auto 2xl:max-w-3xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion$1, {
				multiple: true,
				children: faqItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQItemComponent, {
					item,
					index
				}, item.question))
			})
		})]
	});
}
function FAQItemComponent({ item, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "will-change-[transform,opacity] last:border-b",
		initial: {
			opacity: 0,
			y: 10
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: { once: true },
		transition: {
			duration: .24,
			delay: Math.min(.16, index * .03)
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
			value: item.question,
			className: "group border-t",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
				className: "py-5",
				children: item.question
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
				className: "pb-5 text-muted-foreground leading-relaxed",
				children: item.answer
			})]
		})
	});
}
var getFeatures = () => [
	{
		id: "free",
		icon: o$4,
		title: i18n._({ id: "2POOFK" }),
		description: i18n._({ id: "tgBDLM" })
	},
	{
		id: "open-source",
		icon: t,
		title: i18n._({ id: "nynSHR" }),
		description: i18n._({ id: "omb6Pp" })
	},
	{
		id: "no-ads",
		icon: r,
		title: i18n._({ id: "kvaphW" }),
		description: i18n._({ id: "DOuBKp" })
	},
	{
		id: "instant-generation",
		icon: o$5,
		title: i18n._({ id: "3R7Rhd" }),
		description: i18n._({ id: "SFilD-" })
	},
	{
		id: "data-security",
		icon: e$1,
		title: i18n._({ id: "y5qXrf" }),
		description: i18n._({ id: "TjkDKu" })
	},
	{
		id: "self-host",
		icon: r$1,
		title: i18n._({ id: "BUwXA7" }),
		description: i18n._({ id: "pFFOow" })
	},
	{
		id: "languages",
		icon: e$2,
		title: i18n._({ id: "dlnOxD" }),
		description: i18n._({ id: "Fq1g80" })
	},
	{
		id: "auth",
		icon: o$6,
		title: i18n._({ id: "t4ROIC" }),
		description: i18n._({ id: "12sKIJ" })
	},
	{
		id: "2fa",
		icon: o$7,
		title: i18n._({ id: "0bP4Av" }),
		description: i18n._({ id: "leYNwS" })
	},
	{
		id: "unlimited-resumes",
		icon: o$8,
		title: i18n._({ id: "0PKG-K" }),
		description: i18n._({ id: "7OEX46" })
	},
	{
		id: "design",
		icon: t$1,
		title: i18n._({ id: "PHM5wp" }),
		description: i18n._({ id: "5wVMCc" })
	},
	{
		id: "templates",
		icon: t$2,
		title: i18n._({ id: "vu_Tj6" }),
		description: i18n._({ id: "f_ROcm" })
	},
	{
		id: "public",
		icon: e$3,
		title: i18n._({ id: "MJ4rM1" }),
		description: i18n._({ id: "6VXfKk" })
	},
	{
		id: "password-protection",
		icon: e$4,
		title: i18n._({ id: "8m1ayK" }),
		description: i18n._({ id: "pD3ydD" })
	},
	{
		id: "api-access",
		icon: o$9,
		title: i18n._({ id: "qOMroC" }),
		description: i18n._({ id: "awzEEa" })
	},
	{
		id: "more",
		icon: o$10,
		title: i18n._({ id: "MJ0Oh2" }),
		description: i18n._({ id: "s9lolx" })
	}
];
function FeatureCard({ icon: Icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: cn("group relative flex min-h-48 flex-col gap-4 overflow-hidden border-b bg-background p-6 transition-[background-color] duration-300 will-change-[transform,opacity]", "not-nth-[2n]:border-r xl:not-nth-[4n]:border-r", "hover:bg-secondary/30"),
		initial: {
			opacity: 0,
			y: 16
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			amount: .1
		},
		transition: {
			duration: .35,
			ease: "easeOut"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex rounded-md bg-primary/5 p-2.5 text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						size: 24,
						weight: "thin"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col gap-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-base tracking-tight transition-colors group-hover:text-primary",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm leading-relaxed",
					children: description
				})]
			})
		]
	});
}
function Features() {
	const features = (0, import_react.useMemo)(() => getFeatures(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "features",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "space-y-4 p-4 will-change-[transform,opacity] md:p-8 xl:py-16",
			initial: {
				opacity: 0,
				y: 20
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: { once: true },
			transition: { duration: .45 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-2xl tracking-tight md:text-4xl xl:text-5xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "PpZkda" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted-foreground leading-relaxed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "kyouzi" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 xs:grid-cols-2 border-t xl:grid-cols-4",
			children: features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, { ...feature }, feature.id))
		})]
	});
}
var getResourceLinks = () => [
	{
		url: "https://docs.rxresu.me",
		label: i18n._({ id: "TvY_XA" })
	},
	{
		url: "https://opencollective.com/reactive-resume/donate",
		label: i18n._({ id: "zCmezK" })
	},
	{
		url: "https://github.com/amruthpillai/reactive-resume",
		label: i18n._({ id: "PnzsrT" })
	},
	{
		url: "https://docs.rxresu.me/changelog",
		label: i18n._({ id: "CWe7wB" })
	}
];
var getCommunityLinks = () => [
	{
		url: "https://github.com/amruthpillai/reactive-resume/issues",
		label: i18n._({ id: "Q3LOVJ" })
	},
	{
		url: "https://crowdin.com/project/reactive-resume",
		label: i18n._({ id: "kAy5R9" })
	},
	{
		url: "https://reddit.com/r/reactiveresume",
		label: i18n._({ id: "0aX2NW" })
	},
	{
		url: "https://discord.gg/aSyA5ZSxpb",
		label: i18n._({ id: "OdPOhy" })
	}
];
var socialLinks = [
	{
		url: "https://github.com/amruthpillai/reactive-resume",
		label: i18n._({ id: "RkXlPZ" }),
		icon: t
	},
	{
		url: "https://linkedin.com/in/amruthpillai",
		label: i18n._({ id: "gggTBm" }),
		icon: e$5
	},
	{
		url: "https://x.com/KingOKings",
		label: i18n._({ id: "nhtR6Y" }),
		icon: e$6
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.footer, {
		id: "footer",
		className: "p-4 pb-8 will-change-[opacity] md:p-8 md:pb-12",
		initial: { opacity: 0 },
		whileInView: { opacity: 1 },
		viewport: { once: true },
		transition: { duration: .45 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 sm:col-span-2 lg:col-span-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandIcon, {
							variant: "logo",
							className: "size-10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-bold text-lg tracking-tight",
								children: "Reactive Resume"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-muted-foreground text-sm leading-relaxed",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "hNNcd_" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 pt-2",
							children: socialLinks.map((social) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "icon-sm",
								variant: "ghost",
								nativeButton: false,
								render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: social.url,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": `${social.label} (${i18n._({ id: "b8VFy2" })})`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(social.icon, {
										"aria-hidden": "true",
										size: 18
									})
								})
							}, social.label))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLinkGroup, {
					title: i18n._({ id: "s-MGs7" }),
					links: getResourceLinks()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLinkGroup, {
					title: i18n._({ id: "chL5IG" }),
					links: getCommunityLinks()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 sm:col-span-2 lg:col-span-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copyright, {})
				})
			]
		})
	});
}
function FooterLinkGroup({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-medium text-muted-foreground text-sm tracking-tight",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
				url: link.url,
				label: link.label
			}, link.url))
		})]
	});
}
function FooterLink({ url, label }) {
	const [isHovered, setIsHovered] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "relative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: url,
			target: "_blank",
			rel: "noopener",
			className: "relative inline-block text-sm transition-colors hover:text-foreground",
			onMouseEnter: () => setIsHovered(true),
			onMouseLeave: () => setIsHovered(false),
			children: [
				label,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dbtjJh" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					"aria-hidden": "true",
					initial: {
						width: 0,
						opacity: 0
					},
					animate: isHovered ? {
						width: "100%",
						opacity: 1
					} : {
						width: 0,
						opacity: 0
					},
					transition: {
						duration: .2,
						ease: "easeOut"
					},
					className: "pointer-events-none absolute inset-s-0 -bottom-0.5 h-px rounded-md bg-primary will-change-[width,opacity]"
				})
			]
		})
	});
}
var Spotlight = ({ duration = 7, gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)", gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)", gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)", width = 560, height = 1380, smallWidth = 240, translateY = -350, xOffset = 100 }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: 1.5 },
		className: "pointer-events-none absolute inset-0 h-full w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			animate: { x: [
				0,
				xOffset,
				0
			] },
			transition: {
				duration,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "reverse",
				ease: "easeInOut"
			},
			className: "pointer-events-none absolute inset-s-0 top-0 z-40 h-svh w-svw will-change-transform",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-s-0 top-0",
					style: {
						width: `${width}px`,
						height: `${height}px`,
						background: gradientFirst,
						transform: `translateY(${translateY}px) rotate(-45deg)`
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-s-0 top-0 origin-top-left",
					style: {
						height: `${height}px`,
						width: `${smallWidth}px`,
						background: gradientSecond,
						transform: "rotate(-45deg) translate(5%, -50%)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-s-0 top-0 origin-top-left",
					style: {
						height: `${height}px`,
						width: `${smallWidth}px`,
						background: gradientThird,
						transform: "rotate(-45deg) translate(-180%, -70%)"
					}
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			animate: { x: [
				0,
				-xOffset,
				0
			] },
			transition: {
				duration,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
				repeatType: "reverse"
			},
			className: "pointer-events-none absolute inset-e-0 top-0 z-40 h-svh w-svw will-change-transform",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-e-0 top-0",
					style: {
						width: `${width}px`,
						height: `${height}px`,
						background: gradientFirst,
						transform: `translateY(${translateY}px) rotate(45deg)`
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-e-0 top-0 origin-top-right",
					style: {
						height: `${height}px`,
						width: `${smallWidth}px`,
						background: gradientSecond,
						transform: "rotate(45deg) translate(-5%, -50%)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-e-0 top-0 origin-top-right",
					style: {
						height: `${height}px`,
						width: `${smallWidth}px`,
						background: gradientThird,
						transform: "rotate(45deg) translate(180%, -70%)"
					}
				})
			]
		})]
	});
};
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "hero",
		className: "relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden border-b py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spotlight, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "will-change-[transform,opacity]",
				initial: {
					opacity: 0,
					y: 100
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: 1.1,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CometCard, {
					glareOpacity: 0,
					className: "relative -mb-12 3xl:max-w-7xl max-w-4xl px-8 md:-mb-24 md:px-12 lg:px-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						loop: true,
						muted: true,
						autoPlay: true,
						playsInline: true,
						fetchPriority: "high",
						src: "/videos/timelapse.mp4",
						"aria-label": i18n._({ id: "ebRbMW" }),
						className: "pointer-events-none size-full rounded-md border object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-40% via-transparent to-background"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex max-w-2xl flex-col items-center gap-y-6 px-4 xs:px-0 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
						className: "will-change-[transform,opacity]",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .45,
							delay: .55
						},
						whileHover: {
							y: -2,
							scale: 1.01
						},
						whileTap: { scale: .985 },
						target: "_blank",
						rel: "noopener noreferrer",
						href: "https://docs.rxresu.me/getting-started",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "h-auto gap-1.5 px-3 py-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {
								"aria-hidden": "true",
								className: "size-3.5",
								weight: "fill"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "R2Xqfp" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "will-change-[transform,opacity]",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .45,
							delay: .7
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
							id: "pqe2G5",
							components: {
								0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-medium text-muted-foreground tracking-tight md:text-lg" }),
								1: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "mt-1 font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl" })
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						className: "max-w-xl text-base text-muted-foreground leading-relaxed will-change-[transform,opacity] md:text-lg",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .45,
							delay: .82
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "b0HpjH" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "flex flex-col items-center gap-3 will-change-[transform,opacity] sm:flex-row sm:gap-4",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .45,
							delay: .95
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "lg",
							nativeButton: false,
							className: "group relative overflow-hidden px-4",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative z-10 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "c3b0B0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$2, {
										"aria-hidden": "true",
										className: "size-4 transition-transform group-hover:translate-x-0.5"
									})]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "lg",
							variant: "ghost",
							className: "gap-2 px-4",
							nativeButton: false,
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://docs.rxresu.me",
								target: "_blank",
								rel: "noopener noreferrer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$7, {
										"aria-hidden": "true",
										className: "size-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "NgeSlx" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "dbtjJh" })
									})
								]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": "true",
				role: "presentation",
				className: "absolute inset-s-1/2 bottom-8 -translate-x-1/2",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					delay: 1.25,
					duration: .7
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "flex h-8 w-5 items-start justify-center rounded-full border border-muted-foreground/30 p-1.5 will-change-transform",
					animate: { y: [
						0,
						5,
						0
					] },
					transition: {
						duration: 1.5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, { className: "h-1.5 w-1 rounded-full bg-muted-foreground/50" })
				})
			})
		]
	});
}
var textClassName = cn("fill-transparent font-bold text-3xl leading-none tracking-tight");
var TextMaskEffect = ({ text, duration = 6, className, "aria-hidden": ariaHidden }) => {
	const svgRef = (0, import_react.useRef)(null);
	const [cursor, setCursor] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const [maskPosition, setMaskPosition] = (0, import_react.useState)({
		cx: "50%",
		cy: "50%"
	});
	(0, import_react.useEffect)(() => {
		if (svgRef.current && cursor.x !== null && cursor.y !== null) {
			const svgRect = svgRef.current.getBoundingClientRect();
			const cxPercentage = (cursor.x - svgRect.left) / svgRect.width * 100;
			const cyPercentage = (cursor.y - svgRect.top) / svgRect.height * 100;
			setMaskPosition({
				cx: `${cxPercentage}%`,
				cy: `${cyPercentage}%`
			});
		}
	}, [cursor]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref: svgRef,
		width: "100%",
		height: "100%",
		viewBox: "0 0 300 40",
		"aria-hidden": ariaHidden,
		"aria-label": "Text mask effect",
		className: cn("select-none", className),
		xmlns: "http://www.w3.org/2000/svg",
		onMouseEnter: () => setHovered(true),
		onMouseLeave: () => setHovered(false),
		onMouseMove: (e) => {
			setCursor({
				x: e.clientX,
				y: e.clientY
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("linearGradient", {
					id: "textGradient",
					gradientUnits: "userSpaceOnUse",
					cx: "50%",
					cy: "50%",
					r: "25%",
					children: hovered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#eab308"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "25%",
							stopColor: "#ef4444"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: "#3b82f6"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "75%",
							stopColor: "#06b6d4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#8b5cf6"
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.radialGradient, {
					r: "20%",
					id: "revealMask",
					animate: maskPosition,
					gradientUnits: "userSpaceOnUse",
					initial: {
						cx: "50%",
						cy: "50%"
					},
					transition: {
						duration: 0,
						ease: "easeOut"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "white"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "black"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
					id: "textMask",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "0",
						y: "0",
						width: "100%",
						height: "100%",
						fill: "url(#revealMask)"
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "50%",
				y: "50%",
				strokeWidth: "0.3",
				textAnchor: "middle",
				dominantBaseline: "middle",
				style: { opacity: hovered ? .7 : 0 },
				className: cn(textClassName, "stroke-zinc-300 dark:stroke-zinc-700"),
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.text, {
				x: "50%",
				y: "50%",
				strokeWidth: "0.3",
				textAnchor: "middle",
				dominantBaseline: "middle",
				transition: {
					duration,
					ease: "easeInOut"
				},
				initial: {
					strokeDashoffset: 1e3,
					strokeDasharray: 1e3
				},
				whileInView: {
					strokeDashoffset: 0,
					strokeDasharray: 1e3
				},
				className: cn(textClassName, "stroke-zinc-300 dark:stroke-zinc-700"),
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "50%",
				y: "50%",
				strokeWidth: "0.3",
				textAnchor: "middle",
				mask: "url(#textMask)",
				dominantBaseline: "middle",
				stroke: "url(#textGradient)",
				className: cn(textClassName),
				children: text
			})
		]
	});
};
function Prefooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "prefooter",
		className: "relative overflow-hidden py-16 md:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-s-1/4 top-0 size-96 rounded-full bg-primary/5 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-e-1/4 bottom-0 size-96 rounded-full bg-primary/5 blur-3xl" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextMaskEffect, {
				"aria-hidden": "true",
				text: "Reactive Resume",
				className: "hidden md:block"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "mx-auto max-w-3xl space-y-8 px-6 text-center will-change-[transform,opacity] md:px-8 xl:px-0",
				initial: {
					opacity: 0,
					y: 20
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .45 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold text-2xl tracking-tight md:text-4xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "omb6Pp" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground leading-relaxed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "ceOZ_x" })
				})]
			})]
		})]
	});
}
var getStatistics = (userCount, resumeCount) => [{
	id: "users",
	label: i18n._({ id: "Sxm8rQ" }),
	value: userCount,
	icon: o$2
}, {
	id: "resumes",
	label: i18n._({ id: "oTBjeH" }),
	value: resumeCount,
	icon: o$11
}];
function StatisticCard({ statistic, index }) {
	const Icon = statistic.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "group relative flex flex-col items-center justify-center gap-y-4 border-r border-b p-8 transition-colors last:border-e-0 hover:bg-secondary/30 sm:border-b-0 xl:py-12",
		initial: {
			opacity: 0,
			y: 20
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-50px"
		},
		transition: {
			duration: .5,
			delay: index * .1,
			ease: "easeOut"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "absolute inset-s-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/2",
					initial: {
						scale: .8,
						opacity: 0
					},
					whileInView: {
						scale: 1,
						opacity: 1
					},
					viewport: { once: true },
					transition: {
						duration: .8,
						delay: index * .1 + .2
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						size: 180,
						weight: "thin"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": "true",
				className: "relative rounded-full bg-primary/10 p-3 text-primary",
				whileHover: { scale: 1.05 },
				transition: {
					type: "spring",
					stiffness: 400,
					damping: 20
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					size: 24,
					weight: "thin"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountUp, {
				separator: ",",
				duration: .8,
				to: statistic.value,
				className: "font-bold text-5xl tracking-tight md:text-6xl"
			}, statistic.id),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative font-medium text-base text-muted-foreground tracking-tight",
				children: statistic.label
			})
		]
	});
}
function Statistics() {
	const [userCountResult, resumeCountResult] = useQueries({ queries: [orpc.statistics.user.getCount.queryOptions(), orpc.statistics.resume.getCount.queryOptions()] });
	if (!userCountResult.data || !resumeCountResult.data) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "statistics",
		"aria-labelledby": "stats-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "stats-heading",
			className: "sr-only",
			children: i18n._({ id: "KubxAw" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2",
			children: getStatistics(userCountResult.data, resumeCountResult.data).map((statistic, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatisticCard, {
				statistic,
				index
			}, statistic.id))
		})]
	});
}
function TemplateItem({ metadata }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "group relative shrink-0 will-change-transform",
		initial: {
			scale: 1,
			zIndex: 10
		},
		whileHover: {
			scale: 1.06,
			zIndex: 20
		},
		whileTap: { scale: .99 },
		transition: {
			type: "spring",
			stiffness: 320,
			damping: 26
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-page w-48 overflow-hidden rounded-md border bg-card shadow-lg transition-all duration-300 group-hover:shadow-2xl sm:w-56 md:w-64 lg:w-72",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: metadata.imageUrl,
					alt: metadata.name,
					className: "size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-white drop-shadow-lg",
						children: metadata.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" })
			]
		})
	});
}
function MarqueeRow({ templates, rowId, direction, duration = 40 }) {
	const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "flex gap-x-4 will-change-transform sm:gap-x-6",
		animate: { x: animateX },
		transition: { x: {
			repeat: Number.POSITIVE_INFINITY,
			repeatType: "loop",
			duration,
			ease: "linear"
		} },
		children: templates.map(([template, metadata], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateItem, { metadata }, `${rowId}-${template}-${index}`))
	});
}
function Templates() {
	const { row1, row2 } = (0, import_react.useMemo)(() => {
		const entries = Object.entries(templates);
		const half = Math.ceil(entries.length / 2);
		const firstHalf = entries.slice(0, half);
		const secondHalf = entries.slice(half);
		return {
			row1: [...firstHalf, ...firstHalf],
			row2: [...secondHalf, ...secondHalf]
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "templates",
		className: "overflow-hidden border-t-0! p-4 md:p-8 xl:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "space-y-4 will-change-[transform,opacity]",
			initial: {
				opacity: 0,
				y: 20
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: { once: true },
			transition: { duration: .35 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-2xl tracking-tight md:text-4xl xl:text-5xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "iTylMl" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted-foreground leading-relaxed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "9KYbCZ" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mt-8 -rotate-3 py-8 sm:-rotate-4 lg:mt-0 lg:-rotate-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-[280px] flex-col gap-y-4 sm:min-h-[320px] sm:gap-y-6 md:min-h-[380px] lg:min-h-[420px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarqueeRow, {
					templates: row1,
					rowId: "row1",
					direction: "left",
					duration: 45
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarqueeRow, {
					templates: row2,
					rowId: "row2",
					direction: "right",
					duration: 50
				})]
			})
		})]
	});
}
var email = "hello@amruthpillai.com";
var testimonials = [
	"Great site. Love the interactive interface. You can tell it's designed by someone who wants to use it.",
	"Truly everything about the UX is so intuitive, fluid and lets you customize your CV how you want and so rapidly. I thank you so much for putting the work to release something like this.",
	"I want to appreciate you for making your projects #openSource, most especially your Reactive Resume, which is the handiest truly-free resume maker I've come across. This is a big shoutout to you. Well done!",
	"I'd like to appreciate the great work you've done with rxresu.me. The website's design, smooth functionality, and ease of use under the free plan are really impressive. It's clear that a lot of thought and effort has gone into building and maintaining such a useful platform.",
	"I just wanted to reach you out and thank you personally for your wonderful project rxresu.me. It is very valuable, and the fact that it is open source, makes it all the more meaningful, since there are lots of people who struggle to make their CV look good. For my part, it saved me a lot of time and helped me shape my CV in a very efficient way.",
	"I appreciate your effort in open-sourcing and making it free for everyone to use, it's a great effort. By using this platform, I got a job secured in the government sector of Oman, that too in a ministry. Thank you for providing this platform. Keep going, appreciate the effort. ❤️",
	"Your CV generator just saved my day! Thank you so much, great work!",
	"I want to express my heartfelt gratitude and admiration for your incredible work and remarkable skills. Your projects, especially the Resume Builder, have been immensely helpful to me, and I deeply appreciate the effort and creativity you've poured into them.",
	"Hey! Thank you so much for making this fantastic tool! It helped me get a new job as a Research Software Engineer at Arizona State University.",
	"Wow, what an impressive profile! You are very talented. I'm also a fellow SWE on the job hunt and I came across a linked to Reactive Resume on Reddit and gave it a shot. This could easily be a paid product. Very clean and useful.",
	"Thank you for creating Reactive Resume. It is an amazing product, and I love the design and how it simplifies the resume-making experience. I've been trying to create a good resume for a decade to find my first job in tech, and your tool has been incredibly helpful."
];
function TestimonialCard({ testimonial }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "group relative flex w-full flex-col overflow-hidden text-pretty rounded-2xl border bg-card p-4 will-change-transform",
		initial: {
			scale: 1,
			boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0)"
		},
		whileHover: {
			scale: 1.2,
			zIndex: 100,
			boxShadow: "0 0 40px 0 rgba(0, 0, 0, 0.5)"
		},
		transition: {
			type: "spring",
			stiffness: 320,
			damping: 24
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$8, {
			weight: "fill",
			className: "absolute -right-2 -bottom-4 size-18 opacity-10 transition-[bottom] duration-200 group-hover:-bottom-16"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "flex-1 text-muted-foreground leading-relaxed",
			children: testimonial
		})]
	});
}
function TestimonialColumn({ columnId, testimonials }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex w-[320px] shrink-0 flex-col gap-y-4 sm:w-[360px] md:w-[400px]",
		children: testimonials.map((testimonial, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialCard, { testimonial }, `${columnId}-${index}`))
	});
}
function MarqueeMasonry({ columns, direction, duration = 30 }) {
	const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
	const marqueeColumns = [...columns, ...columns];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "flex items-start gap-x-4 will-change-transform",
		animate: { x: animateX },
		transition: { x: {
			repeat: Number.POSITIVE_INFINITY,
			repeatType: "loop",
			duration,
			ease: "linear"
		} },
		children: marqueeColumns.map((column, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialColumn, {
			columnId: `column-${index}`,
			testimonials: column
		}, index))
	});
}
function Testimonials() {
	const columns = (0, import_react.useMemo)(() => {
		const columns = [];
		for (let index = 0; index < testimonials.length; index += 2) columns.push(testimonials.slice(index, index + 2));
		return columns;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "testimonials",
		className: "overflow-hidden py-12 md:py-16 xl:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "mb-10 flex flex-col items-center space-y-4 px-4 text-center md:px-8",
			initial: {
				opacity: 0,
				y: 20
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: { once: true },
			transition: { duration: .6 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-2xl tracking-tight md:text-4xl xl:text-5xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "VUZDlr" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-4xl text-balance text-muted-foreground leading-relaxed",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, {
					id: "QUfElZ",
					values: { email },
					components: { 0: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${email}`,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "font-medium text-foreground underline underline-offset-2 transition-colors hover:text-primary"
					}) }
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-s-0 top-0 bottom-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-24 md:w-32 lg:w-48" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-e-0 top-0 bottom-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-24 md:w-32 lg:w-48" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarqueeMasonry, {
					columns,
					direction: "left",
					duration: 60
				})
			]
		})]
	});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main-content",
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto px-4 sm:px-6 lg:px-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-border border-x [&>section:first-child]:border-t-0 [&>section]:border-border [&>section]:border-t",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Statistics, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Templates, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonationBanner, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prefooter, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			})
		})]
	});
}
//#endregion
export { RouteComponent as component };
