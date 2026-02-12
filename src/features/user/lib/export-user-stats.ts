import type { TimeEntryEntity } from "@/entities/time-entry";
import type { UserEntity } from "@/entities/user";
import { downloadCSV, generateCSV } from "@/shared/lib/export/csv-export";

export const exportUserStatsToCSV = (
  users: UserEntity[],
  entries: TimeEntryEntity[],
  filename: string,
) => {
  const headers = [
    "User Name",
    "Email",
    "Role",
    "Total Entries",
    "Total Hours",
    "Status",
  ];

  const rows = users.map((user) => {
    const userEntries = entries.filter((e) => e.userId === user.id);
    const totalHours =
      userEntries.reduce((sum, e) => sum + e.duration, 0) / 3600;

    return [
      user.name,
      user.email,
      user.role,
      userEntries.length.toString(),
      totalHours.toFixed(2),
      user.status || "active",
    ];
  });

  const csv = generateCSV(headers, rows);
  downloadCSV(csv, filename);
};
