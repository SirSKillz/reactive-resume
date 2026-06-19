import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import {
	BriefcaseIcon,
	DotsThreeOutlineIcon,
	PencilSimpleLineIcon,
	PlusIcon,
	TrashSimpleIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@reactive-resume/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@reactive-resume/ui/components/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@reactive-resume/ui/components/dropdown-menu";
import { FormControl, FormItem, FormLabel, FormMessage } from "@reactive-resume/ui/components/form";
import { Input } from "@reactive-resume/ui/components/input";
import { Textarea } from "@reactive-resume/ui/components/textarea";
import { useConfirm } from "@/hooks/use-confirm";
import { useFormBlocker } from "@/hooks/use-form-blocker";
import { orpc } from "@/libs/orpc/client";
import { useAppForm } from "@/libs/tanstack-form";
import { DashboardHeader } from "../-components/header";

export const Route = createFileRoute("/dashboard/jobs/")({
	component: RouteComponent,
});

const formSchema = z.object({
	name: z.string().min(1),
	description: z.string(),
});

// -----------------------------------------------------------------------
// Create dialog
// -----------------------------------------------------------------------

function CreateCampaignDialog() {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const { mutate: createCampaign, isPending } = useMutation(orpc.jobApplication.campaign.create.mutationOptions());

	const form = useAppForm({
		defaultValues: { name: "", description: "" },
		validators: { onSubmit: formSchema },
		onSubmit: ({ value }) => {
			createCampaign(
				{ name: value.name, description: value.description || null },
				{
					onSuccess: () => {
						queryClient.invalidateQueries(orpc.jobApplication.campaign.list.queryOptions()).catch(() => {});
						toast.success(t`Campaign created successfully.`);
						setOpen(false);
						form.reset();
					},
					onError: () => {
						toast.error(t`Failed to create campaign. Please try again.`);
					},
				},
			);
		},
	});

	useFormBlocker(form);

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => {
				if (!next) form.reset();
				setOpen(next);
			}}
		>
			<DialogTrigger
				render={
					<Button>
						<PlusIcon className="size-4" />
						<Trans>New Campaign</Trans>
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						<Trans>Create Campaign</Trans>
					</DialogTitle>
					<DialogDescription>
						<Trans>A campaign groups job applications for a single job-search journey.</Trans>
					</DialogDescription>
				</DialogHeader>

				<form
					className="space-y-4"
					onSubmit={(event) => {
						event.preventDefault();
						event.stopPropagation();
						void form.handleSubmit();
					}}
				>
					<form.Field name="name">
						{(field) => (
							<FormItem hasError={field.state.meta.isTouched && field.state.meta.errors.length > 0}>
								<FormLabel>
									<Trans>Name</Trans>
								</FormLabel>
								<FormControl
									render={
										<Input
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder={t`e.g. Summer 2026 Search`}
										/>
									}
								/>
								<FormMessage errors={field.state.meta.errors} />
							</FormItem>
						)}
					</form.Field>

					<form.Field name="description">
						{(field) => (
							<FormItem>
								<FormLabel>
									<Trans>Description</Trans>{" "}
									<span className="text-muted-foreground text-xs">
										(<Trans>optional</Trans>)
									</span>
								</FormLabel>
								<FormControl
									render={
										<Textarea
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											rows={3}
											placeholder={t`What is this campaign about?`}
										/>
									}
								/>
							</FormItem>
						)}
					</form.Field>
				</form>

				<DialogFooter>
					<DialogClose
						render={
							<Button variant="outline" type="button">
								<Trans>Cancel</Trans>
							</Button>
						}
					/>
					<Button type="submit" disabled={isPending}>
						<Trans>Create</Trans>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// -----------------------------------------------------------------------
// Edit dialog
// -----------------------------------------------------------------------

function EditCampaignDialog({
	campaign,
	open,
	onOpenChange,
}: {
	campaign: { id: string; name: string; description: string | null };
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const queryClient = useQueryClient();

	const { mutate: updateCampaign, isPending } = useMutation(orpc.jobApplication.campaign.update.mutationOptions());

	const form = useAppForm({
		defaultValues: { name: campaign.name, description: campaign.description ?? "" },
		validators: { onSubmit: formSchema },
		onSubmit: ({ value }) => {
			updateCampaign(
				{ id: campaign.id, name: value.name, description: value.description || null },
				{
					onSuccess: () => {
						queryClient.invalidateQueries(orpc.jobApplication.campaign.list.queryOptions()).catch(() => {});
						toast.success(t`Campaign updated successfully.`);
						onOpenChange(false);
					},
					onError: () => {
						toast.error(t`Failed to update campaign. Please try again.`);
					},
				},
			);
		},
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger render={() => <></>} />
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>
						<Trans>Edit Campaign</Trans>
					</DialogTitle>
					<DialogDescription>
						<Trans>Update the campaign details.</Trans>
					</DialogDescription>
				</DialogHeader>

				<form
					className="space-y-4"
					onSubmit={(event) => {
						event.preventDefault();
						event.stopPropagation();
						void form.handleSubmit();
					}}
				>
					<form.Field name="name">
						{(field) => (
							<FormItem hasError={field.state.meta.isTouched && field.state.meta.errors.length > 0}>
								<FormLabel>
									<Trans>Name</Trans>
								</FormLabel>
								<FormControl
									render={
										<Input
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder={t`e.g. Summer 2026 Search`}
										/>
									}
								/>
								<FormMessage errors={field.state.meta.errors} />
							</FormItem>
						)}
					</form.Field>

					<form.Field name="description">
						{(field) => (
							<FormItem>
								<FormLabel>
									<Trans>Description</Trans>{" "}
									<span className="text-muted-foreground text-xs">
										(<Trans>optional</Trans>)
									</span>
								</FormLabel>
								<FormControl
									render={
										<Textarea
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											rows={3}
											placeholder={t`What is this campaign about?`}
										/>
									}
								/>
							</FormItem>
						)}
					</form.Field>
				</form>

				<DialogFooter>
					<DialogClose
						render={
							<Button variant="outline" type="button">
								<Trans>Cancel</Trans>
							</Button>
						}
					/>
					<Button type="submit" disabled={isPending}>
						<Trans>Save</Trans>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// -----------------------------------------------------------------------
// Campaign card with edit/delete actions
// -----------------------------------------------------------------------

function CampaignCard({
	campaign,
}: {
	campaign: { id: string; name: string; description: string | null; createdAt: Date };
}) {
	const confirm = useConfirm();
	const queryClient = useQueryClient();
	const [editOpen, setEditOpen] = useState(false);

	const { mutate: deleteCampaign, isPending } = useMutation(orpc.jobApplication.campaign.delete.mutationOptions());

	const handleDelete = async () => {
		const confirmed = await confirm(t`Delete Campaign`, {
			description: t`Are you sure you want to delete this campaign? All associated applications will also be deleted.`,
			confirmText: t`Delete`,
			cancelText: t`Cancel`,
		});
		if (!confirmed) return;

		deleteCampaign(
			{ id: campaign.id },
			{
				onSuccess: () => {
					queryClient.invalidateQueries(orpc.jobApplication.campaign.list.queryOptions()).catch(() => {});
					toast.success(t`Campaign deleted successfully.`);
				},
				onError: () => {
					toast.error(t`Failed to delete campaign. Please try again.`);
				},
			},
		);
	};

	return (
		<>
			<EditCampaignDialog campaign={campaign} open={editOpen} onOpenChange={setEditOpen} />
			<div className="group/relative flex flex-col gap-2 rounded-lg border bg-card p-5 shadow-xs transition-colors hover:border-primary/50">
				<Link className="absolute inset-0" to="/dashboard/jobs/$campaignId" params={{ campaignId: campaign.id }} />
				<div className="relative z-10 flex items-start justify-between gap-2">
					<BriefcaseIcon weight="light" className="mt-0.5 size-5 shrink-0 text-primary" />
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button
									variant="ghost"
									size="icon"
									className="size-7 shrink-0 opacity-0 transition-opacity group-hover/relative:opacity-100"
									onClick={(e) => e.preventDefault()}
								>
									<DotsThreeOutlineIcon className="size-4" />
								</Button>
							}
						/>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => setEditOpen(true)}>
								<PencilSimpleLineIcon className="size-4" />
								<Trans>Edit</Trans>
							</DropdownMenuItem>
							<DropdownMenuItem variant="destructive" onClick={handleDelete} disabled={isPending}>
								<TrashSimpleIcon className="size-4" />
								<Trans>Delete</Trans>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div>
					<p className="font-semibold leading-tight">{campaign.name}</p>
					{campaign.description && (
						<p className="mt-1 line-clamp-2 text-muted-foreground text-sm">{campaign.description}</p>
					)}
				</div>
				<span className="relative z-10 whitespace-nowrap text-muted-foreground text-xs">
					{new Date(campaign.createdAt).toLocaleDateString()}
				</span>
			</div>
		</>
	);
}

function RouteComponent() {
	const { data: campaigns, isLoading } = useQuery(orpc.jobApplication.campaign.list.queryOptions());

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between gap-x-4">
				<DashboardHeader title={t`Jobs`} icon={BriefcaseIcon} />
				<CreateCampaignDialog />
			</div>

			{isLoading && (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="h-28 animate-pulse rounded-lg bg-secondary/40" />
					))}
				</div>
			)}

			{!isLoading && campaigns?.length === 0 && (
				<div className="flex flex-col items-center gap-4 py-20 text-center">
					<BriefcaseIcon weight="light" className="size-16 text-muted-foreground" />
					<div className="space-y-1">
						<p className="font-medium text-lg">
							<Trans>No campaigns yet</Trans>
						</p>
						<p className="text-muted-foreground text-sm">
							<Trans>Create a campaign to start tracking your job applications.</Trans>
						</p>
					</div>
					<CreateCampaignDialog />
				</div>
			)}

			{!isLoading && campaigns && campaigns.length > 0 && (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{campaigns.map((campaign) => (
						<CampaignCard key={campaign.id} campaign={campaign} />
					))}
				</div>
			)}
		</div>
	);
}
