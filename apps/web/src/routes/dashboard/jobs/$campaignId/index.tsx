import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { ArrowLeftIcon, BriefcaseIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@reactive-resume/ui/components/button";
import { Separator } from "@reactive-resume/ui/components/separator";
import { orpc } from "@/libs/orpc/client";
import { DashboardHeader } from "../../-components/header";
import { ApplicationDetailSheet } from "../-components/application-detail-sheet";
import { CreateApplicationDialog } from "../-components/create-application-dialog";
import { KanbanBoard } from "../-components/kanban-board";

export const Route = createFileRoute("/dashboard/jobs/$campaignId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { campaignId } = Route.useParams();
	const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
	const [sheetOpen, setSheetOpen] = useState(false);

	const { data: campaigns } = useQuery(orpc.jobApplication.campaign.list.queryOptions());
	const { data: applications, isLoading } = useQuery(
		orpc.jobApplication.application.list.queryOptions({ input: { campaignId } }),
	);

	const campaign = campaigns?.find((c) => c.id === campaignId);
	// Derived from query cache — automatically reflects edits without extra state
	const selectedApplication = applications?.find((a) => a.id === selectedApplicationId) ?? null;

	const handleCardClick = (application: { id: string }) => {
		setSelectedApplicationId(application.id);
		setSheetOpen(true);
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-3">
					<Button
						variant="ghost"
						size="icon"
						className="shrink-0"
						nativeButton={false}
						render={<Link to="/dashboard/jobs" />}
					>
						<ArrowLeftIcon className="size-4" />
					</Button>
					<DashboardHeader title={campaign?.name ?? t`Campaign`} icon={BriefcaseIcon} />
				</div>
				<CreateApplicationDialog campaignId={campaignId} />
			</div>

			{campaign?.description && <p className="ps-12 text-muted-foreground text-sm">{campaign.description}</p>}

			<Separator />

			{isLoading && (
				<div className="flex gap-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="h-64 w-64 shrink-0 animate-pulse rounded-lg bg-secondary/40" />
					))}
				</div>
			)}

			{!isLoading && applications?.length === 0 && (
				<div className="flex flex-col items-center gap-4 py-20 text-center">
					<BriefcaseIcon weight="light" className="size-16 text-muted-foreground" />
					<div className="space-y-1">
						<p className="font-medium text-lg">
							<Trans>No applications yet</Trans>
						</p>
						<p className="text-muted-foreground text-sm">
							<Trans>Add your first job application to this campaign.</Trans>
						</p>
					</div>
					<CreateApplicationDialog campaignId={campaignId} />
				</div>
			)}

			{!isLoading && applications && applications.length > 0 && (
				<KanbanBoard applications={applications} campaignId={campaignId} onCardClick={handleCardClick} />
			)}

			<ApplicationDetailSheet
				application={selectedApplication}
				open={sheetOpen}
				onOpenChange={(next) => {
					if (!next) setSelectedApplicationId(null);
					setSheetOpen(next);
				}}
			/>
		</div>
	);
}
