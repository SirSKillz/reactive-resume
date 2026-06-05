import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { f as Link, m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as i18n } from "../_libs/lingui__core.mjs";
import { t as M } from "../_libs/ts-pattern.mjs";
import { m as orpc } from "./client-O01ffOLq.mjs";
import { t as Button$1 } from "./button-DJhXBADJ.mjs";
import { $t as e, At as o$1, Ct as e$5, Ft as o, K as o$3, Kt as t, Ot as e$2, Wt as e$1, _ as o$2, g as e$6, it as i, jt as e$4, m as r$1, nt as e$3, ot as r, s as t$1 } from "../_libs/phosphor-icons__react.mjs";
import { t as useDialogStore } from "./store-DBaE29-H.mjs";
import { t as Separator$1 } from "./separator-BDL9Bvz5.mjs";
import { t as DashboardHeader } from "./header-Cf1o68Wv.mjs";
import { o as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Trans } from "../_libs/lingui__react.mjs";
import { l as motion } from "../_libs/framer-motion.mjs";
import { t as authClient } from "./client-DOGrk0P1.mjs";
import { n as getReadableErrorMessage } from "./error-message-ClkvUIO8.mjs";
import { n as usePrompt } from "./use-prompt-DhB_ouZz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/authentication-BRCIXq4K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Get the display name for a social provider
*/
function getProviderName(providerId) {
	return M(providerId).with("credential", () => i18n._({ id: "8ZsakT" })).with("passkey", () => i18n._({ id: "FGSN4s" })).with("google", () => i18n._({ id: "eoe8BR" })).with("github", () => i18n._({ id: "RkXlPZ" })).with("linkedin", () => i18n._({ id: "gggTBm" })).with("custom", () => i18n._({ id: "ZXvM4L" })).exhaustive();
}
/**
* Get the icon component for a social provider
*/
function getProviderIcon(providerId) {
	return M(providerId).with("credential", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {})).with("passkey", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e, {})).with("google", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$1, {})).with("github", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t, {})).with("linkedin", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$2, {})).with("custom", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t$1, {})).exhaustive();
}
/**
* Hook to fetch and manage authentication accounts
*/
function useAuthAccounts() {
	const { data: accounts } = useQuery({
		queryKey: ["auth", "accounts"],
		queryFn: () => authClient.listAccounts(),
		select: ({ data }) => data ?? []
	});
	const getAccountByProviderId = (0, import_react.useCallback)((providerId) => accounts?.find((account) => account.providerId === providerId), [accounts]);
	return {
		accounts,
		hasAccount: (0, import_react.useCallback)((providerId) => !!getAccountByProviderId(providerId), [getAccountByProviderId]),
		getAccountByProviderId
	};
}
/**
* Hook to manage authentication provider linking/unlinking
*/
function useAuthProviderActions() {
	return {
		link: (0, import_react.useCallback)(async (provider) => {
			const providerName = getProviderName(provider);
			const toastId = toast.loading(i18n._({
				id: "RESom6",
				values: { providerName }
			}));
			const { error } = await authClient.linkSocial({
				provider,
				callbackURL: "/dashboard/settings/authentication"
			});
			if (error) {
				toast.error(getReadableErrorMessage(error, i18n._({ id: "7JGYd7" })), { id: toastId });
				return;
			}
			toast.dismiss(toastId);
		}, []),
		unlink: (0, import_react.useCallback)(async (provider, accountId) => {
			const providerName = getProviderName(provider);
			const toastId = toast.loading(i18n._({
				id: "2SLv_w",
				values: { providerName }
			}));
			const { error } = await authClient.unlinkAccount({
				providerId: provider,
				accountId
			});
			if (error) {
				toast.error(getReadableErrorMessage(error, i18n._({ id: "GwcR6M" })), { id: toastId });
				return;
			}
			toast.dismiss(toastId);
		}, [])
	};
}
/**
* Hook to get enabled social providers for the current user
* Possible values: "credential", "google", "github", "linkedin", "custom"
*/
function useEnabledProviders() {
	const { data: enabledProviders = [] } = useQuery(orpc.auth.providers.list.queryOptions());
	return { enabledProviders };
}
function PasskeysSection() {
	const queryClient = useQueryClient();
	const prompt = usePrompt();
	const { data: passkeys = [] } = useQuery({
		queryKey: ["auth", "passkeys"],
		queryFn: () => authClient.passkey.listUserPasskeys(),
		select: ({ data }) => data ?? []
	});
	const registerPasskeyMutation = useMutation({
		mutationFn: async () => {
			return await authClient.passkey.addPasskey();
		},
		onSuccess: async ({ data, error }) => {
			if (error) {
				toast.error(getReadableErrorMessage(error, i18n._({ id: "cAnMxb" })));
				return;
			}
			toast.success(i18n._({ id: "q3XMuh" }));
			await queryClient.invalidateQueries({ queryKey: ["auth", "passkeys"] });
			const name = await prompt(i18n._({ id: "r1G1jH" }), {
				description: i18n._({ id: "gX9H8C" }),
				defaultValue: "",
				confirmText: i18n._({ id: "tfDRzk" })
			});
			if (name === null) return;
			const passkeyId = typeof data?.id === "string" ? data.id : null;
			const passkeyName = name.trim();
			if (!passkeyId || passkeyName.length === 0) return;
			const { error: renameError } = await authClient.passkey.updatePasskey({
				id: passkeyId,
				name: passkeyName
			});
			if (renameError) {
				toast.error(getReadableErrorMessage(renameError, i18n._({ id: "s28fFF" })));
				return;
			}
			await queryClient.invalidateQueries({ queryKey: ["auth", "passkeys"] });
		},
		onError: () => {
			toast.error(i18n._({ id: "cAnMxb" }));
		}
	});
	const deletePasskeyMutation = useMutation({
		mutationFn: async (id) => {
			return await authClient.passkey.deletePasskey({ id });
		},
		onSuccess: async ({ error }) => {
			if (error) {
				toast.error(getReadableErrorMessage(error, i18n._({ id: "GZ-xB2" })));
				return;
			}
			toast.success(i18n._({ id: "4Y1ORc" }));
			await queryClient.invalidateQueries({ queryKey: ["auth", "passkeys"] });
		},
		onError: () => {
			toast.error(i18n._({ id: "GZ-xB2" }));
		}
	});
	const handleRegisterPasskey = () => {
		if (registerPasskeyMutation.isPending) return;
		registerPasskeyMutation.mutate();
	};
	const handleDeletePasskey = (id) => {
		if (deletePasskeyMutation.isPending) return;
		deletePasskeyMutation.mutate(id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .2,
			delay: .3,
			ease: "easeOut"
		},
		className: "will-change-[transform,opacity]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-x-3 font-medium text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "UZKLEA" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						onClick: handleRegisterPasskey,
						disabled: registerPasskeyMutation.isPending,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "KNYR4l" })]
					})]
				}),
				passkeys.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "pUbgxd" })
				}),
				passkeys.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: passkeys.map((passkey) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-md border bg-muted/40 px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium text-sm",
								children: passkey.name ?? i18n._({ id: "xowKks" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									variant: "destructive",
									size: "sm",
									onClick: () => handleDeletePasskey(passkey.id),
									disabled: deletePasskeyMutation.isPending,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "cnGeoo" })]
								})
							})]
						}, passkey.id);
					})
				})
			]
		})]
	});
}
function PasswordSection() {
	const navigate = useNavigate();
	const { openDialog } = useDialogStore();
	const { hasAccount } = useAuthAccounts();
	const hasPassword = (0, import_react.useMemo)(() => hasAccount("credential"), [hasAccount]);
	const handleUpdatePassword = (0, import_react.useCallback)(() => {
		if (hasPassword) openDialog("auth.change-password", void 0);
		else navigate({ to: "/auth/forgot-password" });
	}, [
		hasPassword,
		navigate,
		openDialog
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .2,
			delay: .1,
			ease: "easeOut"
		},
		className: "flex items-center justify-between gap-x-4 will-change-[transform,opacity]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "flex items-center gap-x-3 font-medium text-base",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "8ZsakT" })]
		}), M(hasPassword).with(true, () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "will-change-transform",
			whileHover: {
				y: -1,
				scale: 1.01
			},
			whileTap: { scale: .99 },
			transition: {
				duration: .14,
				ease: "easeOut"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "outline",
				onClick: handleUpdatePassword,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "KhtG3o" })]
			})
		})).with(false, () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "will-change-transform",
			whileHover: {
				y: -1,
				scale: 1.01
			},
			whileTap: { scale: .99 },
			transition: {
				duration: .14,
				ease: "easeOut"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "outline",
				nativeButton: false,
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth/forgot-password",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "2gHjVM" })
				})
			})
		})).exhaustive()]
	});
}
function SocialProviderSection({ provider, name, animationDelay = 0 }) {
	const { link, unlink } = useAuthProviderActions();
	const { hasAccount, getAccountByProviderId } = useAuthAccounts();
	const providerName = (0, import_react.useMemo)(() => name ?? getProviderName(provider), [name, provider]);
	const providerIcon = (0, import_react.useMemo)(() => getProviderIcon(provider), [provider]);
	const account = (0, import_react.useMemo)(() => getAccountByProviderId(provider), [getAccountByProviderId, provider]);
	const isConnected = (0, import_react.useMemo)(() => hasAccount(provider), [hasAccount, provider]);
	const handleLink = (0, import_react.useCallback)(async () => {
		await link(provider);
	}, [link, provider]);
	const handleUnlink = (0, import_react.useCallback)(async () => {
		if (!account?.accountId) return;
		await unlink(provider, account.accountId);
	}, [
		account,
		unlink,
		provider
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "will-change-[transform,opacity]",
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .2,
			delay: animationDelay,
			ease: "easeOut"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center justify-between gap-x-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-x-3 font-medium text-base",
				children: [providerIcon, providerName]
			}), M(isConnected).with(true, () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "will-change-transform",
				whileHover: {
					y: -1,
					scale: 1.01
				},
				whileTap: { scale: .99 },
				transition: {
					duration: .14,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "outline",
					onClick: handleUnlink,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "-K0AvT" })]
				})
			})).with(false, () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "will-change-transform",
				whileHover: {
					y: -1,
					scale: 1.01
				},
				whileTap: { scale: .99 },
				transition: {
					duration: .14,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "outline",
					onClick: handleLink,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$4, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "iSLIjg" })]
				})
			})).exhaustive()]
		})]
	});
}
function TwoFactorSection() {
	const { openDialog } = useDialogStore();
	const { hasAccount } = useAuthAccounts();
	const { data: session } = authClient.useSession();
	const hasPassword = (0, import_react.useMemo)(() => hasAccount("credential"), [hasAccount]);
	const hasTwoFactor = (0, import_react.useMemo)(() => session?.user.twoFactorEnabled ?? false, [session]);
	const handleTwoFactorAction = (0, import_react.useCallback)(() => {
		if (hasTwoFactor) openDialog("auth.two-factor.disable", void 0);
		else openDialog("auth.two-factor.enable", void 0);
	}, [hasTwoFactor, openDialog]);
	if (!hasPassword) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "will-change-[transform,opacity]",
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .2,
			delay: .2,
			ease: "easeOut"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center justify-between gap-x-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-x-3 font-medium text-base",
				children: [hasTwoFactor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$5, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(o, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "C4pKXW" })]
			}), M(hasTwoFactor).with(true, () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "will-change-transform",
				whileHover: {
					y: -1,
					scale: 1.01
				},
				whileTap: { scale: .99 },
				transition: {
					duration: .14,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "outline",
					onClick: handleTwoFactorAction,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o$2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "qERl58" })]
				})
			})).with(false, () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "will-change-transform",
				whileHover: {
					y: -1,
					scale: 1.01
				},
				whileTap: { scale: .99 },
				transition: {
					duration: .14,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "outline",
					onClick: handleTwoFactorAction,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(e$6, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { id: "DCRKbe" })]
				})
			})).exhaustive()]
		})]
	});
}
function RouteComponent() {
	const { enabledProviders } = useEnabledProviders();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, {
				icon: o$3,
				title: i18n._({ id: "P8fBlG" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: -20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .25,
					ease: "easeOut"
				},
				className: "grid max-w-xl gap-4 will-change-[transform,opacity]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwoFactorSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasskeysSection, {}),
					"google" in enabledProviders && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProviderSection, {
						provider: "google",
						animationDelay: .4
					}),
					"github" in enabledProviders && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProviderSection, {
						provider: "github",
						animationDelay: .5
					}),
					"linkedin" in enabledProviders && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProviderSection, {
						provider: "linkedin",
						animationDelay: .6
					}),
					"custom" in enabledProviders && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialProviderSection, {
						provider: "custom",
						animationDelay: .7,
						name: enabledProviders.custom
					})
				]
			})
		]
	});
}
//#endregion
export { RouteComponent as component };
