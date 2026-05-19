import type { DragEndEvent } from "@dnd-kit/core";
import type { MessageDescriptor } from "@lingui/core";
import type { ApplicationStatus } from "@reactive-resume/schema/job-application";
import type { RouterOutput } from "@/libs/orpc/client";
import { DndContext, DragOverlay, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { msg, t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@reactive-resume/ui/components/badge";
import { orpc } from "@/libs/orpc/client";
import { ApplicationCard } from "./application-card";

type JobApplication = RouterOutput["jobApplication"]["application"]["list"][number];

const COLUMNS: { status: ApplicationStatus; label: MessageDescriptor }[] = [
	{ status: "wishlist", label: msg`Wishlist` },
	{ status: "applied", label: msg`Applied` },
	{ status: "interviewing", label: msg`Interviewing` },
	{ status: "offer", label: msg`Offer` },
	{ status: "rejected", label: msg`Rejected` },
	{ status: "ghosted", label: msg`Ghosted` },
];

type Props = {
	applications: JobApplication[];
	onCardClick: (application: JobApplication) => void;
};

export function KanbanBoard({ applications, onCardClick }: Props) {
	const { i18n } = useLingui();
	const [activeApplication, setActiveApplication] = useState<JobApplication | null>(null);
	const queryClient = useQueryClient();

	const { mutate: updateStatus } = useMutation(orpc.jobApplication.application.updateStatus.mutationOptions());

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

	const byStatus = (status: ApplicationStatus) => applications.filter((a) => a.status === status);

	const handleDragEnd = (event: DragEndEvent) => {
		setActiveApplication(null);
		const { active, over } = event;
		if (!over) return;

		// `over.id` is the column status string when dropped over a column droppable
		const newStatus = over.id as ApplicationStatus;
		if (!COLUMNS.some((c) => c.status === newStatus)) return;

		const app = applications.find((a) => a.id === active.id);
		if (!app || app.status === newStatus) return;

		// Optimistic update
		queryClient.setQueryData(
			orpc.jobApplication.application.list.queryOptions().queryKey,
			(old: JobApplication[] | undefined) => old?.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a)),
		);

		updateStatus(
			{ id: app.id, status: newStatus },
			{
				onError: () => {
					toast.error(t`Failed to update status.`);
					void queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions());
				},
			},
		);
	};

	return (
		<DndContext
			sensors={sensors}
			onDragStart={(e) => {
				const app = applications.find((a) => a.id === e.active.id);
				if (app) setActiveApplication(app);
			}}
			onDragEnd={handleDragEnd}
		>
			<div className="flex gap-3 overflow-x-auto pb-4">
				{COLUMNS.map(({ status, label }) => {
					const columnApps = byStatus(status);
					return (
						<KanbanColumn
							key={status}
							status={status}
							label={i18n._(label)}
							applications={columnApps}
							onCardClick={onCardClick}
						/>
					);
				})}
			</div>

			<DragOverlay>
				{activeApplication && <ApplicationCard application={activeApplication} onClick={() => {}} />}
			</DragOverlay>
		</DndContext>
	);
}

type ColumnProps = {
	status: ApplicationStatus;
	label: string;
	applications: JobApplication[];
	onCardClick: (application: JobApplication) => void;
};

function KanbanColumn({ status, label, applications, onCardClick }: ColumnProps) {
	return (
		<div className="flex w-64 shrink-0 flex-col gap-2 rounded-lg bg-secondary/30 p-2" data-status={status}>
			<div className="flex items-center justify-between px-1 py-0.5">
				<span className="font-medium text-sm">{label}</span>
				<Badge variant="secondary" className="h-5 px-1.5 text-xs">
					{applications.length}
				</Badge>
			</div>

			<SortableContext id={status} items={applications.map((a) => a.id)} strategy={verticalListSortingStrategy}>
				<DroppableColumn status={status}>
					{applications.map((app) => (
						<ApplicationCard key={app.id} application={app} onClick={onCardClick} />
					))}
				</DroppableColumn>
			</SortableContext>
		</div>
	);
}

function DroppableColumn({ status, children }: { status: ApplicationStatus; children: React.ReactNode }) {
	const { setNodeRef } = useDroppable({ id: status });

	return (
		<div ref={setNodeRef} className="flex min-h-20 flex-col gap-2">
			{children}
		</div>
	);
}
