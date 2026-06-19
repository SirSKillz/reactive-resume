import type { ApplicationStatus } from "@reactive-resume/schema/job-application";
import { t } from "@lingui/core/macro";
import { ArrowClockwiseIcon, TrashSimpleIcon } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { Badge } from "@reactive-resume/ui/components/badge";
import { Button } from "@reactive-resume/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@reactive-resume/ui/components/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { orpc } from "@/libs/orpc/client";

type Props = {
	selectedIds: Set<string>;
	onClearSelection: () => void;
};

/** Bulk action bar that appears when cards are selected */
export function BulkActionBar({ selectedIds, onClearSelection }: Props) {
	const queryClient = useQueryClient();
	const confirm = useConfirm();

	const { mutate: bulkUpdateStatus } = useMutation(orpc.jobApplication.application.bulkUpdateStatus.mutationOptions());

	const { mutate: bulkDelete } = useMutation(orpc.jobApplication.application.bulkDelete.mutationOptions());

	const handleStatusChange = useCallback(
		(status: ApplicationStatus) => {
			bulkUpdateStatus(
				{ ids: [...selectedIds], status },
				{
					onSuccess: () => {
						toast.success(t`Updated ${selectedIds.size} applications.`);
						queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions()).catch(() => {});
						onClearSelection();
					},
					onError: () => {
						toast.error(t`Failed to update applications.`);
					},
				},
			);
		},
		[selectedIds, bulkUpdateStatus, queryClient, onClearSelection],
	);

	const handleDelete = useCallback(async () => {
		const confirmed = await confirm(t`Delete ${selectedIds.size} applications?`, {
			description: t`This action cannot be undone. These applications and their activity logs will be permanently deleted.`,
			confirmText: t`Delete`,
		});
		if (!confirmed) return;

		bulkDelete(
			{ ids: [...selectedIds] },
			{
				onSuccess: () => {
					toast.success(t`Deleted ${selectedIds.size} applications.`);
					queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions()).catch(() => {});
					onClearSelection();
				},
				onError: () => {
					toast.error(t`Failed to delete applications.`);
				},
			},
		);
	}, [selectedIds, bulkDelete, queryClient, onClearSelection, confirm]);

	const statuses: { status: ApplicationStatus; label: string }[] = [
		{ status: "wishlist", label: t`Wishlist` },
		{ status: "applied", label: t`Applied` },
		{ status: "interviewing", label: t`Interviewing` },
		{ status: "offer", label: t`Offer` },
		{ status: "rejected", label: t`Rejected` },
		{ status: "ghosted", label: t`Ghosted` },
	];

	if (selectedIds.size === 0) return null;

	return (
		<div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg border bg-card p-3 shadow-lg">
			<Badge variant="secondary" className="px-2 py-1 text-sm">
				{selectedIds.size} {t`selected`}
			</Badge>

			<Button variant="default" size="sm" onClick={onClearSelection}>
				{t`Clear`}
			</Button>

			<div className="h-5 w-px bg-border" />

			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button variant="outline" size="sm">
							<ArrowClockwiseIcon className="size-4" />
							{t`Change status`}
						</Button>
					}
				/>
				<DropdownMenuContent align="end">
					{statuses.map(({ status, label }) => (
						<DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}>
							{label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<Button variant="destructive" size="sm" onClick={handleDelete}>
				<TrashSimpleIcon className="mr-1 size-4" />
				{t`Delete`}
			</Button>
		</div>
	);
}
