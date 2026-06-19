import { t } from "@lingui/core/macro";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@reactive-resume/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@reactive-resume/ui/components/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@reactive-resume/ui/components/dropdown-menu";
import { downloadWithAnchor } from "@reactive-resume/utils/file";
import { cn } from "@reactive-resume/utils/style";
import { client, orpc } from "@/libs/orpc/client";

type Props = {
	campaignId: string;
	className?: string;
};

/** Export button that triggers JSON/CSV download via API */
function ExportButton({ campaignId }: { campaignId: string; className?: string }) {
	const [open, setOpen] = useState(false);

	const handleExport = useCallback(
		async (format: "json" | "csv") => {
			try {
				const result = await client.jobApplication.application.export({ campaignId, format });

				if (format === "csv" && typeof result.data === "string") {
					const blob = new Blob([result.data], { type: "text/csv;charset=utf-8" });
					downloadWithAnchor(blob, `job-applications-${new Date().toISOString().slice(0, 10)}.csv`);
				} else {
					const json = JSON.stringify(result.data, null, 2);
					const blob = new Blob([json], { type: "application/json" });
					downloadWithAnchor(blob, `job-applications-${new Date().toISOString().slice(0, 10)}.json`);
				}

				toast.success(t`Applications exported successfully.`);
			} catch {
				toast.error(t`Failed to export applications.`);
			} finally {
				setOpen(false);
			}
		},
		[campaignId],
	);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" size="sm">
						{t`Export`}
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleExport("json")}>{t`Export as JSON`}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleExport("csv")}>{t`Export as CSV`}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Import dialog that accepts JSON or CSV files */
function ImportButton({ campaignId }: { campaignId: string }) {
	const [open, setOpen] = useState(false);
	const [importing, setImporting] = useState(false);
	const queryClient = useQueryClient();

	const { mutate: importApplications } = useMutation(orpc.jobApplication.application.import.mutationOptions());

	const handleFileChange = useCallback(
		async (file: File) => {
			setImporting(true);
			const reader = new FileReader();

			reader.onload = async (event) => {
				const content = event.target?.result as string;

				let format: "json" | "csv";
				let data: z.infer<typeof importInputSchema>["data"];

				if (file.name.endsWith(".json")) {
					format = "json";
					try {
						data = JSON.parse(content);
					} catch {
						toast.error(t`Invalid JSON file.`);
						setImporting(false);
						return;
					}
				} else if (file.name.endsWith(".csv")) {
					format = "csv";
					data = content;
				} else {
					toast.error(t`Please select a JSON or CSV file.`);
					setImporting(false);
					return;
				}

				importApplications(
					{ campaignId, format, data },
					{
						onSuccess: ({ count }) => {
							toast.success(t`Imported ${count} applications.`);
							queryClient.invalidateQueries(orpc.jobApplication.application.list.queryOptions()).catch(() => {});
							setOpen(false);
							setImporting(false);
						},
						onError: () => {
							toast.error(t`Failed to import applications.`);
							setImporting(false);
						},
					},
				);
			};

			reader.readAsText(file);
		},
		[campaignId, importApplications, queryClient],
	);

	const handleDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();
			const file = event.dataTransfer.files[0];
			if (file) handleFileChange(file);
		},
		[handleFileChange],
	);

	const handleFileInput = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) handleFileChange(file);
		},
		[handleFileChange],
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button variant="outline" size="sm" onClick={() => setOpen(true)}>
				{t`Import`}
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t`Import Applications`}</DialogTitle>
					<DialogDescription>
						{t`Upload a JSON or CSV file to import job applications. JSON is the default format.`}
					</DialogDescription>
				</DialogHeader>

				<label
					className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors hover:border-primary/50 hover:bg-secondary/50"
					onDragOver={(e) => e.preventDefault()}
					onDrop={handleDrop}
				>
					<div className="text-center">
						<p className="text-muted-foreground text-sm">{t`Drag and drop a file here, or click to select`}</p>
						<input
							type="file"
							accept=".json,.csv"
							className="mt-4 block cursor-pointer text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:font-medium file:text-sm file:transition-colors file:hover:bg-secondary/80"
							onChange={handleFileInput}
						/>
					</div>
				</label>

				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)} disabled={importing}>
						{t`Cancel`}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

const importInputSchema = z.object({
	data: z.union([z.array(z.any()), z.string()]),
});

export function ExportImportButtons({ campaignId, className }: Props) {
	return (
		<div className={cn("flex gap-2", className)}>
			<ExportButton campaignId={campaignId} />
			<ImportButton campaignId={campaignId} />
		</div>
	);
}
