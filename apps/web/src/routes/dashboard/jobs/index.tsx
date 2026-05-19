import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { BriefcaseIcon, PlusIcon } from "@phosphor-icons/react";
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
import { FormControl, FormItem, FormLabel, FormMessage } from "@reactive-resume/ui/components/form";
import { Input } from "@reactive-resume/ui/components/input";
import { Textarea } from "@reactive-resume/ui/components/textarea";
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
						void queryClient.invalidateQueries(orpc.jobApplication.campaign.list.queryOptions());
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
				</form>
			</DialogContent>
		</Dialog>
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
						<Link
							key={campaign.id}
							to="/dashboard/jobs/$campaignId"
							params={{ campaignId: campaign.id }}
							className="group flex flex-col gap-2 rounded-lg border bg-card p-5 shadow-xs transition-colors hover:border-primary/50"
						>
							<div className="flex items-start justify-between gap-2">
								<BriefcaseIcon weight="light" className="mt-0.5 size-5 shrink-0 text-primary" />
								<span className="whitespace-nowrap text-muted-foreground text-xs">
									{new Date(campaign.createdAt).toLocaleDateString()}
								</span>
							</div>
							<div>
								<p className="font-semibold leading-tight">{campaign.name}</p>
								{campaign.description && (
									<p className="mt-1 line-clamp-2 text-muted-foreground text-sm">{campaign.description}</p>
								)}
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
