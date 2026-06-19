import type { DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import type { MessageDescriptor } from "@lingui/core";
import type { ApplicationStatus } from "@reactive-resume/schema/job-application";
import type { RouterOutput } from "@/libs/orpc/client";
import {
	DndContext,
	DragOverlay,
	PointerSensor,
	pointerWithin,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { msg, t } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@reactive-resume/ui/components/badge";
import { cn } from "@reactive-resume/utils/style";
import { orpc } from "@/libs/orpc/client";
import { ApplicationCard } from "./application-card";
import { BulkActionBar } from "./bulk-action-bar";
import { ExportImportButtons } from "./export-import";

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
	campaignId: string;
	onCardClick: (application: JobApplication) => void;
};

// Resolve a drag target ID to a column status. Column droppables report the status directly; card sortables report the card ID, so we look up the card's current status
function resolveStatus(overId: UniqueIdentifier, applications: JobApplication[]): ApplicationStatus | null {
	if (COLUMNS.some((c) => c.status === overId)) return overId as ApplicationStatus;
	const card = applications.find((a) => a.id === overId);
	return card ? card.status : null;
}

export function KanbanBoard({ applications, campaignId, onCardClick }: Props) {
	const { i18n } = useLingui();
	const [activeApplication, setActiveApplication] = useState<JobApplication | null>(null);
	const [dropPlaceholder, setDropPlaceholder] = useState<{ status: ApplicationStatus; index: number } | null>(null);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const { mutate: reorderColumn } = useMutation(orpc.jobApplication.application.reorderColumn.mutationOptions());

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

	const byStatus = useCallback(
		(status: ApplicationStatus) =>
			applications.filter((a) => a.status === status).sort((a, b) => a.position - b.position),
		[applications],
	);

	// Clear selection on Escape
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setSelectedIds(new Set());
				setLastSelectedId(null);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	const toggleSelection = useCallback(
		(appId: string, event: React.MouseEvent) => {
			const app = applications.find((a) => a.id === appId);
			if (!app) return;

			if (event.ctrlKey || event.metaKey) {
				// Toggle individual selection
				setSelectedIds((prev) => {
					const next = new Set(prev);
					if (next.has(appId)) next.delete(appId);
					else next.add(appId);
					return next;
				});
				setLastSelectedId(appId);
			} else if (event.shiftKey && lastSelectedId) {
				// Range select
				const allApps = applications;
				const startIdx = allApps.findIndex((a) => a.id === lastSelectedId);
				const endIdx = allApps.findIndex((a) => a.id === appId);
				if (startIdx !== -1 && endIdx !== -1) {
					const [minIdx, maxIdx] = [Math.min(startIdx, endIdx), Math.max(startIdx, endIdx)];
					const range = new Set(allApps.slice(minIdx, maxIdx + 1).map((a) => a.id));
					setSelectedIds(range);
				}
			} else {
				// Single select
				setSelectedIds(new Set([appId]));
				setLastSelectedId(appId);
			}
		},
		[applications, lastSelectedId],
	);

	const clearSelection = useCallback(() => {
		setSelectedIds(new Set());
		setLastSelectedId(null);
	}, []);

	const handleDragStart = useCallback(
		(event: DragStartEvent) => {
			const app = applications.find((a) => a.id === event.active.id);
			if (app) setActiveApplication(app);
		},
		[applications],
	);

	const handleDragOver = useCallback(
		(event: DragOverEvent) => {
			const { over } = event;
			if (!over || !activeApplication) {
				setDropPlaceholder(null);
				return;
			}
			const status = resolveStatus(over.id, applications);
			if (!status) {
				setDropPlaceholder(null);
				return;
			}

			// Only show placeholder when dragging to a different column
			if (status === activeApplication.status) {
				setDropPlaceholder(null);
				return;
			}

			// Compute drop index within target column
			const targetColumnApps = byStatus(status);
			let dropIndex = targetColumnApps.length;
			if (over.id !== status) {
				const overCard = applications.find((a) => a.id === over.id);
				if (overCard && overCard.status === status) {
					const idx = targetColumnApps.findIndex((a) => a.id === over.id);
					if (idx !== -1) dropIndex = idx;
				}
			}

			setDropPlaceholder({ status, index: dropIndex });
		},
		[activeApplication, applications, byStatus],
	);

	const handleDragEnd = (event: DragEndEvent) => {
		setActiveApplication(null);
		setDropPlaceholder(null);
		const { active, over } = event;
		if (!over) return;

		const draggedApp = applications.find((a) => a.id === active.id);
		if (!draggedApp) return;

		// Resolve target column status
		const targetStatus = resolveStatus(over.id, applications);
		if (!targetStatus) return;

		// Get current column apps (by status, ordered by position)
		const targetColumnApps = byStatus(targetStatus);

		// Compute drop index: if over.id is a card ID, find its position in target column; if column ID, append to end
		let dropIndex = targetColumnApps.length;
		if (over.id !== targetStatus) {
			const overCard = applications.find((a) => a.id === over.id);
			if (overCard) {
				const overCardStatus = overCard.status;
				// If the card we're over is already in the target column, use its position
				if (overCardStatus === targetStatus) {
					const idx = targetColumnApps.findIndex((a) => a.id === over.id);
					if (idx !== -1) dropIndex = idx;
				}
			}
		}

		// Build new column order: remove dragged card from source, insert at drop position in target
		const sourceStatus = draggedApp.status;
		const sourceColumnApps = byStatus(sourceStatus);
		const sourceWithoutDragged = sourceColumnApps.filter((a) => a.id !== draggedApp.id);

		// For same-column reorder: rebuild the entire source column
		// For cross-column move: rebuild both source and target columns
		let newTargetColumnApps: JobApplication[];
		if (sourceStatus === targetStatus) {
			// Same-column reorder: remove dragged, insert at drop position
			newTargetColumnApps = [...sourceWithoutDragged];
			const insertIdx = Math.min(dropIndex, newTargetColumnApps.length);
			newTargetColumnApps.splice(insertIdx, 0, draggedApp);
		} else {
			// Cross-column move: target column gets the dragged card inserted
			newTargetColumnApps = [...targetColumnApps];
			const insertIdx = Math.min(dropIndex, newTargetColumnApps.length);
			newTargetColumnApps.splice(insertIdx, 0, draggedApp);
		}

		// Only proceed if something actually changed
		const currentTargetOrder = targetColumnApps.map((a) => a.id);
		const newTargetOrder = newTargetColumnApps.map((a) => a.id);
		if (JSON.stringify(currentTargetOrder) === JSON.stringify(newTargetOrder)) return;

		const orderedIds = newTargetColumnApps.map((a) => a.id);

		// Optimistic update: reorder applications array in query cache
		queryClient.setQueryData(
			orpc.jobApplication.application.list.queryOptions({ input: { campaignId } }).queryKey,
			(old: JobApplication[] | undefined) => {
				if (!old) return old;
				const updated = [...old];
				// Update all cards in the target column to new positions
				for (let i = 0; i < newTargetColumnApps.length; i++) {
					const app = newTargetColumnApps[i];
					const idx = updated.findIndex((a) => a.id === app.id);
					if (idx !== -1) {
						updated[idx] = { ...updated[idx], status: targetStatus, position: i };
					}
				}
				// If cross-column move, also update source column positions
				if (sourceStatus !== targetStatus) {
					const newSourceColumnApps = sourceWithoutDragged;
					for (let i = 0; i < newSourceColumnApps.length; i++) {
						const app = newSourceColumnApps[i];
						const idx = updated.findIndex((a) => a.id === app.id);
						if (idx !== -1) {
							updated[idx] = { ...updated[idx], position: i };
						}
					}
				}
				return updated;
			},
		);

		reorderColumn(
			{ status: targetStatus, orderedIds },
			{
				onError: () => {
					toast.error(t`Failed to reorder applications.`);
					queryClient
						.invalidateQueries(orpc.jobApplication.application.list.queryOptions({ input: { campaignId } }))
						.catch(() => {});
				},
			},
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">{t`Job Applications`}</h2>
				<ExportImportButtons campaignId={campaignId} />
			</div>

			<DndContext
				sensors={sensors}
				collisionDetection={pointerWithin}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<div className="flex gap-3 overflow-x-auto pb-4">
					{COLUMNS.map(({ status, label }) => {
						const columnApps = byStatus(status);
						const placeholder = dropPlaceholder?.status === status ? dropPlaceholder.index : null;
						return (
							<KanbanColumn
								key={status}
								status={status}
								label={i18n.t(label)}
								applications={columnApps}
								onCardClick={onCardClick}
								draggedApplicationId={activeApplication?.id ?? null}
								dropPlaceholderIndex={placeholder}
								selectedIds={selectedIds}
								onToggleSelection={toggleSelection}
							/>
						);
					})}
				</div>

				<DragOverlay>
					{activeApplication && (
						<ApplicationCard
							application={activeApplication}
							onClick={() => {}}
							draggedApplicationId={null}
							selected={false}
							onToggleSelection={() => {}}
						/>
					)}
				</DragOverlay>
			</DndContext>

			<BulkActionBar selectedIds={selectedIds} onClearSelection={clearSelection} />
		</div>
	);
}

type ColumnProps = {
	status: ApplicationStatus;
	label: string;
	applications: JobApplication[];
	onCardClick: (application: JobApplication) => void;
	draggedApplicationId: string | null;
	dropPlaceholderIndex: number | null;
	selectedIds: Set<string>;
	onToggleSelection: (appId: string, event: React.MouseEvent) => void;
};

function KanbanColumn({
	status,
	label,
	applications,
	onCardClick,
	draggedApplicationId,
	dropPlaceholderIndex,
	selectedIds,
	onToggleSelection,
}: ColumnProps) {
	const { setNodeRef: setDroppableRef } = useDroppable({ id: status });

	return (
		<div
			ref={setDroppableRef}
			className={cn(
				"flex w-64 shrink-0 flex-col gap-2 rounded-lg bg-secondary/30 p-2 transition-colors",
				dropPlaceholderIndex !== null && "bg-primary/5 ring-2 ring-primary/50",
			)}
		>
			<div className="flex items-center justify-between px-1 py-0.5">
				<span className="font-medium text-sm">{label}</span>
				<Badge variant="secondary" className="h-5 px-1.5 text-xs">
					{applications.length}
				</Badge>
			</div>

			<SortableContext id={status} items={applications.map((a) => a.id)} strategy={verticalListSortingStrategy}>
				<div className="flex min-h-20 flex-col gap-2">
					{(() => {
						type Item = { type: "card"; app: JobApplication } | { type: "placeholder" };
						const items: Item[] = [];
						for (let i = 0; i < applications.length; i++) {
							if (dropPlaceholderIndex !== null && i === dropPlaceholderIndex) {
								items.push({ type: "placeholder" });
							}
							items.push({ type: "card", app: applications[i] });
						}
						if (dropPlaceholderIndex !== null && dropPlaceholderIndex === applications.length) {
							items.push({ type: "placeholder" });
						}
						return items.map((item, i) => {
							if (item.type === "placeholder") {
								return (
									<div
										key={`placeholder-${i}`}
										className="min-h-[60px] rounded-md border-2 border-primary/40 border-dashed bg-primary/5 p-3"
									/>
								);
							}
							return (
								<ApplicationCard
									key={item.app.id}
									application={item.app}
									onClick={onCardClick}
									draggedApplicationId={draggedApplicationId}
									selected={selectedIds.has(item.app.id)}
									onToggleSelection={onToggleSelection}
								/>
							);
						});
					})()}
				</div>
			</SortableContext>
		</div>
	);
}
