import { format } from "date-fns";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { downloadCSV, generateCSV } from "@/shared/lib/export/csv-export";

export const exportTimeEntriesToCSV = (
  entries: TimeEntryEntity[],
  filename: string,
) => {
  const headers = [
    "Date",
    "User",
    "Project",
    "Start Time",
    "End Time",
    "Duration (hours)",
    "Description",
    "Status",
  ];

  const rows = entries.map((entry) => {
    const startDate = new Date(entry.startTime);
    const endDate = entry.endTime ? new Date(entry.endTime) : null;
    const durationHours = (entry.duration / 3600).toFixed(2);

    return [
      format(startDate, "yyyy-MM-dd"),
      entry.user.name,
      entry.project?.name || "No project",
      format(startDate, "HH:mm:ss"),
      endDate ? format(endDate, "HH:mm:ss") : "-",
      durationHours,
      entry.description || "",
      entry.status,
    ];
  });

  const csv = generateCSV(headers, rows);
  downloadCSV(csv, filename);
};
