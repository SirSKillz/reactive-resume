import type { MessageDescriptor } from "@lingui/core";
import type { ApplicationMethod, ApplicationStatus, LocationType } from "@reactive-resume/schema/job-application";
import type { RouterOutput } from "@/libs/orpc/client";
import { msg, t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { PlusIcon } from "@phosphor-icons/react";
import { useStore } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
import { useConfirm } from "@/hooks/use-confirm";
import { orpc } from "@/libs/orpc/client";
import { useAppForm } from "@/libs/tanstack-form";

type JobApplication = RouterOutput["jobApplication"]["application"]["list"][number];

type Props = {
	campaignId: string;
	// Edit mode — pass the existing application plus controlled open state
	application?: JobApplication;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

const STATUS_OPTIONS: { value: ApplicationStatus; label: MessageDescriptor }[] = [
	{ value: "wishlist", label: msg`Wishlist` },
	{ value: "applied", label: msg`Applied` },
	{ value: "interviewing", label: msg`Interviewing` },
	{ value: "offer", label: msg`Offer` },
	{ value: "rejected", label: msg`Rejected` },
	{ value: "ghosted", label: msg`Ghosted` },
];

const LOCATION_TYPE_OPTIONS: { value: LocationType; label: MessageDescriptor }[] = [
	{ value: "remote", label: msg`Remote` },
	{ value: "hybrid", label: msg`Hybrid` },
	{ value: "onsite", label: msg`On-site` },
];

const METHOD_OPTIONS: { value: ApplicationMethod; label: MessageDescriptor }[] = [
	{ value: "linkedin", label: msg`LinkedIn` },
	{ value: "indeed", label: msg`Indeed` },
	{ value: "glassdoor", label: msg`Glassdoor` },
	{ value: "email", label: msg`Email` },
	{ value: "website", label: msg`Company Website` },
	{ value: "referral", label: msg`Referral` },
	{ value: "other", label: msg`Other` },
];

const formSchema = z.object({
	company: z.string().min(1),
	jobTitle: z.string().min(1),
	jobUrl: z.string(),
	location: z.string(),
	locationType: z.string(),
	salary: z.string(),
	status: z.string().min(1),
	jobDescription: z.string(),
	notes: z.string(),
	applicationMethod: z.string(),
	resumeId: z.string(),
	appliedAt: z.string(),
});

export function CreateApplicationDialog({
	campaignId,
	application,
	open: controlledOpen,
	onOpenChange: onControlledOpenChange,
}: Props) {
	const { i18n } = useLingui();
	const confirm = useConfirm();
	const isEditMode = application !== undefined;
	const [internalOpen, setInternalOpen] = useState(false);
	const open = isEditMode ? (controlledOpen ?? false) : internalOpen;
	const queryClient = useQueryClient();

	const { data: resumes } = useQuery(orpc.resume.list.queryOptions());

	const { mutate: createApplication, isPending: isCreating } = useMutation(
		orpc.jobApplication.application.create.mutationOptions(),
	);

	const { mutate: updateApplication, isPending: isUpdating } = useMutation(
		orpc.jobApplication.application.update.mutationOptions(),
	);

	const isPending = isCreating || isUpdating;

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
			appliedAt: "",
		},
		validators: { onSubmit: formSchema },
		onSubmit: ({ value }) => {
			const sharedFields = {
				company: value.company.trim(),
				jobTitle: value.jobTitle.trim(),
				jobUrl: value.jobUrl.trim() || null,
				location: value.location.trim() || null,
				locationType: (value.locationType as LocationType) || null,
				salary: value.salary.trim() || null,
				status: value.status as ApplicationStatus,
				jobDescription: value.jobDescription.trim() || null,
				notes: value.notes.trim() || null,
				applicationMethod: (value.applicationMethod as ApplicationMethod) || null,
				resumeId: value.resumeId || null,
				appliedAt: value.appliedAt ? new Date(value.appliedAt) : null,
			};

			if (isEditMode && application) {
				updateApplication(
					{ id: application.id, ...sharedFields },
					{
						onSuccess: () => {
							void queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions());
							toast.success(t`Application updated successfully.`);
							onControlledOpenChange?.(false);
							form.reset();
						},
						onError: () => {
							toast.error(t`Failed to update application. Please try again.`);
						},
					},
				);
			} else {
				createApplication(
					{ campaignId, ...sharedFields },
					{
						onSuccess: () => {
							void queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions());
							toast.success(t`Application created successfully.`);
							setInternalOpen(false);
							form.reset();
						},
						onError: () => {
							toast.error(t`Failed to create application. Please try again.`);
						},
					},
				);
			}
		},
	});

	const isDirty = useStore(form.store, (s) => s.isDirty);

	// Pre-fill form with existing application values when opening in edit mode
	useEffect(() => {
		if (open && application) {
			form.reset({
				company: application.company,
				jobTitle: application.jobTitle,
				jobUrl: application.jobUrl ?? "",
				location: application.location ?? "",
				locationType: application.locationType ?? "",
				salary: application.salary ?? "",
				status: application.status,
				jobDescription: application.jobDescription ?? "",
				notes: application.notes ?? "",
				applicationMethod: application.applicationMethod ?? "",
				resumeId: application.resumeId ?? "",
				appliedAt: application.appliedAt ? new Date(application.appliedAt).toISOString().split("T")[0] : "",
			});
		}
	}, [open, application, form.reset]);

	const handleOpenChange = async (next: boolean) => {
		if (!next && isDirty) {
			const ok = await confirm(t`Close dialog?`, {
				description: t`You have unsaved changes that will be lost.`,
				confirmText: t`Leave`,
				cancelText: t`Stay`,
			});
			if (!ok) return;
		}
		form.reset();
		if (isEditMode) {
			onControlledOpenChange?.(next);
		} else {
			setInternalOpen(next);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(next) => {
				void handleOpenChange(next);
			}}
		>
			{!isEditMode && (
				<DialogTrigger
					render={
						<Button>
							<PlusIcon className="size-4" />
							<Trans>Add Application</Trans>
						</Button>
					}
				/>
			)}
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? <Trans>Update Application</Trans> : <Trans>Add Job Application</Trans>}
					</DialogTitle>
					<DialogDescription>
						{isEditMode ? (
							<Trans>Update the details of this job application.</Trans>
						) : (
							<Trans>Track a new job application in this campaign.</Trans>
						)}
					</DialogDescription>
				</DialogHeader>

				<form
					className="contents"
					onSubmit={(event) => {
						event.preventDefault();
						event.stopPropagation();
						void form.handleSubmit();
					}}
				>
					<div className="grid gap-4 py-4 sm:grid-cols-2">
						<form.Field name="company">
							{(field) => (
								<FormItem hasError={field.state.meta.isTouched && field.state.meta.errors.length > 0}>
									<FormLabel>
										<Trans>Company</Trans> <span className="text-destructive">*</span>
									</FormLabel>
									<FormControl
										render={
											<Input
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
										}
									/>
									<FormMessage errors={field.state.meta.errors} />
								</FormItem>
							)}
						</form.Field>

						<form.Field name="jobTitle">
							{(field) => (
								<FormItem hasError={field.state.meta.isTouched && field.state.meta.errors.length > 0}>
									<FormLabel>
										<Trans>Job Title</Trans> <span className="text-destructive">*</span>
									</FormLabel>
									<FormControl
										render={
											<Input
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
										}
									/>
									<FormMessage errors={field.state.meta.errors} />
								</FormItem>
							)}
						</form.Field>

						<form.Field name="status">
							{(field) => (
								<FormItem>
									<FormLabel>
										<Trans>Status</Trans>
									</FormLabel>
									<FormControl
										render={
											<select
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="h-9 w-full rounded-md border border-input bg-background px-3 text-foreground text-sm"
											>
												{STATUS_OPTIONS.map((o) => (
													<option key={o.value} value={o.value}>
														{i18n._(o.label)}
													</option>
												))}
											</select>
										}
									/>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="applicationMethod">
							{(field) => (
								<FormItem>
									<FormLabel>
										<Trans>Application Method</Trans>
									</FormLabel>
									<FormControl
										render={
											<select
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="h-9 w-full rounded-md border border-input bg-background px-3 text-foreground text-sm"
											>
												<option value="">
													<Trans>— Select —</Trans>
												</option>
												{METHOD_OPTIONS.map((o) => (
													<option key={o.value} value={o.value}>
														{i18n._(o.label)}
													</option>
												))}
											</select>
										}
									/>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="jobUrl">
							{(field) => (
								<FormItem className="sm:col-span-2">
									<FormLabel>
										<Trans>Job URL</Trans>
									</FormLabel>
									<FormControl
										render={
											<Input
												type="url"
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="https://..."
											/>
										}
									/>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="locationType">
							{(field) => (
								<FormItem>
									<FormLabel>
										<Trans>Location Type</Trans>
									</FormLabel>
									<FormControl
										render={
											<select
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="h-9 w-full rounded-md border border-input bg-background px-3 text-foreground text-sm"
											>
												<option value="">
													<Trans>— Select —</Trans>
												</option>
												{LOCATION_TYPE_OPTIONS.map((o) => (
													<option key={o.value} value={o.value}>
														{i18n._(o.label)}
													</option>
												))}
											</select>
										}
									/>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="location">
							{(field) => (
								<FormItem>
									<FormLabel>
										<Trans>Location</Trans>
									</FormLabel>
									<FormControl
										render={
											<Input
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="City, Country"
											/>
										}
									/>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="salary">
							{(field) => (
								<FormItem>
									<FormLabel>
										<Trans>Salary</Trans>
									</FormLabel>
									<FormControl
										render={
											<Input
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="$80k – $100k"
											/>
										}
									/>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="appliedAt">
							{(field) => (
								<FormItem>
									<FormLabel>
										<Trans>Applied Date</Trans>
									</FormLabel>
									<FormControl
										render={
											<Input
												type="date"
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
										}
									/>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="resumeId">
							{(field) => (
								<FormItem className="sm:col-span-2">
									<FormLabel>
										<Trans>Linked Resume</Trans>
									</FormLabel>
									<FormControl
										render={
											<select
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												className="h-9 w-full rounded-md border border-input bg-background px-3 text-foreground text-sm"
											>
												<option value="">
													<Trans>— None —</Trans>
												</option>
												{resumes?.map((r) => (
													<option key={r.id} value={r.id}>
														{r.name}
													</option>
												))}
											</select>
										}
									/>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="notes">
							{(field) => (
								<FormItem className="sm:col-span-2">
									<FormLabel>
										<Trans>Notes</Trans>
									</FormLabel>
									<FormControl
										render={
											<Textarea
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												rows={2}
											/>
										}
									/>
								</FormItem>
							)}
						</form.Field>

						<form.Field name="jobDescription">
							{(field) => (
								<FormItem className="sm:col-span-2">
									<FormLabel>
										<Trans>Job Description</Trans>
									</FormLabel>
									<FormControl
										render={
											<Textarea
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												rows={4}
												placeholder={t`Paste the full job description here...`}
											/>
										}
									/>
								</FormItem>
							)}
						</form.Field>
					</div>

					<DialogFooter>
						<DialogClose
							render={
								<Button variant="outline" type="button">
									<Trans>Cancel</Trans>
								</Button>
							}
						/>
						<Button type="submit" disabled={isPending}>
							{isEditMode ? <Trans>Save Changes</Trans> : <Trans>Add Application</Trans>}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
