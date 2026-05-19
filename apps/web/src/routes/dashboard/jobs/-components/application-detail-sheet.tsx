import type { RouterOutput } from "@/libs/orpc/client";
import { msg, t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { ArrowRightIcon, ClockIcon, LinkIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@reactive-resume/ui/components/badge";
import { Button } from "@reactive-resume/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@reactive-resume/ui/components/dialog";
import { Separator } from "@reactive-resume/ui/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@reactive-resume/ui/components/tabs";
import { Textarea } from "@reactive-resume/ui/components/textarea";
import { useConfirm } from "@/hooks/use-confirm";
import { orpc } from "@/libs/orpc/client";
import { CreateApplicationDialog } from "./create-application-dialog";

type JobApplication = RouterOutput["jobApplication"]["application"]["list"][number];

type Props = {
	application: JobApplication | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const STATUS_COLORS: Record<string, string> = {
	wishlist: "secondary",
	applied: "outline",
	interviewing: "default",
	offer: "default",
	rejected: "destructive",
	ghosted: "secondary",
};

export function ApplicationDetailSheet({ application, open, onOpenChange }: Props) {
	const { i18n } = useLingui();
	const queryClient = useQueryClient();
	const [editOpen, setEditOpen] = useState(false);
	const [isEditingNotes, setIsEditingNotes] = useState(false);
	const [notesDraft, setNotesDraft] = useState("");
	const confirm = useConfirm();

	const statusLabels = useMemo<Record<string, string>>(
		() => ({
			wishlist: i18n._(msg`Wishlist`),
			applied: i18n._(msg`Applied`),
			interviewing: i18n._(msg`Interviewing`),
			offer: i18n._(msg`Offer`),
			rejected: i18n._(msg`Rejected`),
			ghosted: i18n._(msg`Ghosted`),
		}),
		[i18n],
	);

	const locationTypeLabels = useMemo<Record<string, string>>(
		() => ({
			remote: i18n._(msg`Remote`),
			hybrid: i18n._(msg`Hybrid`),
			onsite: i18n._(msg`On-site`),
		}),
		[i18n],
	);

	const methodLabels = useMemo<Record<string, string>>(
		() => ({
			linkedin: i18n._(msg`LinkedIn`),
			indeed: i18n._(msg`Indeed`),
			glassdoor: i18n._(msg`Glassdoor`),
			email: i18n._(msg`Email`),
			website: i18n._(msg`Company Website`),
			referral: i18n._(msg`Referral`),
			other: i18n._(msg`Other`),
		}),
		[i18n],
	);

	const { data: activities } = useQuery({
		...orpc.jobApplication.activity.listByApplication.queryOptions({
			input: { applicationId: application?.id ?? "" },
		}),
		enabled: !!application?.id && open,
	});

	const { mutate: deleteApplication } = useMutation(orpc.jobApplication.application.delete.mutationOptions());
	const { mutate: updateApplication, isPending: isSavingNotes } = useMutation(
		orpc.jobApplication.application.update.mutationOptions(),
	);

	const handleDelete = async () => {
		if (!application) return;
		const confirmed = await confirm(t`Delete Application`, {
			description: t`Are you sure you want to delete this application? This action cannot be undone.`,
			confirmText: t`Delete`,
			cancelText: t`Cancel`,
		});
		if (!confirmed) return;
		deleteApplication(
			{ id: application.id },
			{
				onSuccess: () => {
					void queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions());
					toast.success(t`Application deleted.`);
					onOpenChange(false);
				},
				onError: () => {
					toast.error(t`Failed to delete application.`);
				},
			},
		);
	};

	const handleSaveNotes = () => {
		if (!application) return;
		updateApplication(
			{ id: application.id, notes: notesDraft.trim() || null },
			{
				onSuccess: () => {
					void queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions());
					setIsEditingNotes(false);
					toast.success(t`Notes saved.`);
				},
				onError: () => {
					toast.error(t`Failed to save notes.`);
				},
			},
		);
	};

	if (!application) return null;

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
					<DialogHeader className="px-6 pt-6 pb-0">
						<DialogTitle className="truncate text-xl leading-tight">{application.jobTitle}</DialogTitle>
						<p className="mt-0.5 text-muted-foreground text-sm">{application.company}</p>
					</DialogHeader>

					<Separator className="mt-4" />

					<Tabs defaultValue="overview" className="flex min-h-0 flex-1 flex-col">
						<TabsList className="mx-6 mt-3 w-auto">
							<TabsTrigger value="overview">
								<Trans>Overview</Trans>
							</TabsTrigger>
							<TabsTrigger value="notes">
								<Trans>Notes</Trans>
							</TabsTrigger>
							<TabsTrigger value="description">
								<Trans>Job Description</Trans>
							</TabsTrigger>
							<TabsTrigger value="activity">
								<Trans>Activity</Trans>
							</TabsTrigger>
						</TabsList>

						<div className="flex-1 overflow-y-auto px-6 py-4">
							<TabsContent value="overview" className="mt-0 space-y-4">
								<div className="flex flex-wrap gap-2">
									<Badge
										variant={
											(STATUS_COLORS[application.status] ?? "secondary") as
												| "secondary"
												| "outline"
												| "default"
												| "destructive"
										}
									>
										{statusLabels[application.status] ?? application.status}
									</Badge>
									{application.locationType && (
										<Badge variant="outline" className="capitalize">
											{locationTypeLabels[application.locationType] ?? application.locationType}
										</Badge>
									)}
									{application.applicationMethod && (
										<Badge variant="outline">
											{methodLabels[application.applicationMethod] ?? application.applicationMethod}
										</Badge>
									)}
								</div>

								<div className="grid gap-3 sm:grid-cols-2">
									<Field label={t`Job URL`} className="sm:col-span-2">
										{application.jobUrl ? (
											<a
												href={application.jobUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-1 text-primary text-sm underline-offset-4 hover:underline"
											>
												<LinkIcon className="size-3.5 shrink-0" />
												<span className="truncate">{application.jobUrl}</span>
											</a>
										) : (
											<span className="text-muted-foreground text-sm">—</span>
										)}
									</Field>
									<Field label={t`Location`}>
										<span className="text-sm">{application.location ?? "—"}</span>
									</Field>
									<Field label={t`Salary`}>
										<span className="text-sm">{application.salary ?? "—"}</span>
									</Field>
									<Field label={t`Applied Date`}>
										<span className="text-sm">
											{application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : "—"}
										</span>
									</Field>
									<Field label={t`Resume`}>
										{application.resumeId ? (
											<Button
												variant="outline"
												size="sm"
												className="w-fit"
												nativeButton={false}
												render={<Link to="/builder/$resumeId" params={{ resumeId: application.resumeId }} />}
											>
												<Trans>View Resume</Trans>
												<ArrowRightIcon className="size-3.5" />
											</Button>
										) : (
											<span className="text-muted-foreground text-sm">—</span>
										)}
									</Field>
								</div>
							</TabsContent>

							<TabsContent value="notes" className="mt-0">
								{isEditingNotes ? (
									<div className="space-y-3">
										<Textarea
											value={notesDraft}
											onChange={(e) => setNotesDraft(e.target.value)}
											rows={8}
											placeholder={t`Add notes about this application...`}
											autoFocus
										/>
										<div className="flex gap-2">
											<Button size="sm" onClick={handleSaveNotes} disabled={isSavingNotes}>
												<Trans>Save</Trans>
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => setIsEditingNotes(false)}
												disabled={isSavingNotes}
											>
												<Trans>Cancel</Trans>
											</Button>
										</div>
									</div>
								) : (
									<div className="space-y-3">
										{application.notes ? (
											<p className="whitespace-pre-wrap text-sm">{application.notes}</p>
										) : (
											<p className="text-muted-foreground text-sm italic">
												<Trans>No notes yet.</Trans>
											</p>
										)}
										<Button
											variant="outline"
											size="sm"
											onClick={() => {
												setNotesDraft(application.notes ?? "");
												setIsEditingNotes(true);
											}}
										>
											<PencilSimpleIcon className="size-3.5" />
											<Trans>Edit Notes</Trans>
										</Button>
									</div>
								)}
							</TabsContent>

							<TabsContent value="description" className="mt-0">
								{application.jobDescription ? (
									<p className="whitespace-pre-wrap text-sm">{application.jobDescription}</p>
								) : (
									<p className="text-muted-foreground text-sm italic">
										<Trans>No job description saved.</Trans>
									</p>
								)}
							</TabsContent>

							<TabsContent value="activity" className="mt-0 space-y-3">
								{!activities || activities.length === 0 ? (
									<p className="text-muted-foreground text-sm">
										<Trans>No activity recorded yet.</Trans>
									</p>
								) : (
									activities.map((entry) => (
										<div key={entry.id} className="flex items-start gap-3">
											<ClockIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
											<div className="text-sm">
												{entry.type === "created" && (
													<span>
														<Trans>Application created</Trans>
													</span>
												)}
												{entry.type === "status_changed" && (
													<span>
														<Trans>
															Status changed from{" "}
															<strong>{statusLabels[entry.fromStatus ?? ""] ?? entry.fromStatus}</strong> to{" "}
															<strong>{statusLabels[entry.toStatus ?? ""] ?? entry.toStatus}</strong>
														</Trans>
													</span>
												)}
												{entry.type === "updated" && (
													<span>
														<Trans>Application updated</Trans>
													</span>
												)}
												<p className="mt-0.5 text-muted-foreground text-xs">
													{new Date(entry.createdAt).toLocaleString()}
												</p>
											</div>
										</div>
									))
								)}
							</TabsContent>
						</div>
					</Tabs>
					<Separator />
					<div className="flex items-center justify-between px-6 py-3">
						<Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
							<PencilSimpleIcon className="size-3.5" />
							<Trans>Edit Application</Trans>
						</Button>
						<Button variant="destructive" size="sm" onClick={handleDelete}>
							<TrashIcon className="size-3.5" />
							<Trans>Delete</Trans>
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{application && (
				<CreateApplicationDialog
					campaignId={application.campaignId}
					application={application}
					open={editOpen}
					onOpenChange={setEditOpen}
				/>
			)}
		</>
	);
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
	return (
		<div className={`grid gap-1 ${className ?? ""}`}>
			<span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">{label}</span>
			{children}
		</div>
	);
}
