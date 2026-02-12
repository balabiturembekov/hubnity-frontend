import type { ProjectEntity } from "@/entities/project";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { downloadCSV, generateCSV } from "@/shared/lib/export/csv-export";

export const exportProjectStatsToCSV = (
  projects: ProjectEntity[],
  entries: TimeEntryEntity[],
  filename: string,
) => {
  const headers = [
    "Project Name",
    "Client",
    "Status",
    "Budget",
    "Total Entries",
    "Total Hours",
    "Contributors",
  ];

  const rows = projects.map((project) => {
    const projectEntries = entries.filter((e) => e.projectId === project.id);
    const totalHours =
      projectEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;
    const uniqueUsers = new Set(projectEntries.map((e) => e.userId));

    return [
      project.name,
      project.clientName || "",
      project.status,
      project.budget?.toString() || "0",
      projectEntries.length.toString(),
      totalHours.toFixed(2),
      uniqueUsers.size.toString(),
    ];
  });

  const csv = generateCSV(headers, rows);
  downloadCSV(csv, filename);
};
