import type { MemberEntity } from "@/entities/organization";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { downloadCSV, generateCSV } from "@/shared/lib/export/csv-export";

export const exportUserStatsToCSV = (
  users: MemberEntity[],
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
      `${user.user.firstName} ${user.user.lastName}`,
      user.user.email,
      user.role,
      userEntries.length.toString(),
      totalHours.toFixed(2),
      user.status || "active",
    ];
  });

  const csv = generateCSV(headers, rows);
  downloadCSV(csv, filename);
};
