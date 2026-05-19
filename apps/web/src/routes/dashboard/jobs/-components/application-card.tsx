import type { RouterOutput } from "@/libs/orpc/client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { t } from "@lingui/core/macro";
import { BriefcaseIcon, LinkIcon, MapPinIcon } from "@phosphor-icons/react";
import { Badge } from "@reactive-resume/ui/components/badge";
import { cn } from "@reactive-resume/utils/style";

type JobApplication = RouterOutput["jobApplication"]["application"]["list"][number];

type Props = {
	application: JobApplication;
	onClick: (application: JobApplication) => void;
};

export function ApplicationCard({ application, onClick }: Props) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: application.id,
		data: { application },
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<button
			type="button"
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				"w-full cursor-grab select-none rounded-md border bg-card p-3 text-left shadow-xs",
				"transition-colors hover:border-primary/30",
				isDragging && "cursor-grabbing opacity-50",
			)}
			onClick={() => onClick(application)}
			aria-label={t`${application.jobTitle} at ${application.company}`}
		>
			<p className="font-medium text-sm leading-tight">{application.jobTitle}</p>
			<p className="mt-0.5 text-muted-foreground text-xs">{application.company}</p>

			<div className="mt-2 flex flex-wrap items-center gap-1.5">
				{application.location && (
					<span className="flex items-center gap-0.5 text-muted-foreground text-xs">
						<MapPinIcon className="size-3" />
						{application.location}
					</span>
				)}
				{application.locationType && (
					<Badge variant="outline" className="h-4 px-1.5 text-[10px] capitalize">
						{application.locationType}
					</Badge>
				)}
				{application.resumeId && (
					<span className="flex items-center gap-0.5 text-muted-foreground text-xs" title={t`Resume linked`}>
						<BriefcaseIcon className="size-3" />
					</span>
				)}
				{application.jobUrl && (
					<span className="flex items-center gap-0.5 text-muted-foreground text-xs" title={t`Job URL`}>
						<LinkIcon className="size-3" />
					</span>
				)}
			</div>
		</button>
	);
}
