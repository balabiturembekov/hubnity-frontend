import type { WorkSession } from "@/entities/dashboard-analytics";
import type { Performer } from "@/features/analytics/model/types";

export function aggregateByUser(entries: WorkSession[]): Performer[] {
  const map = new Map<string, Performer>();

  for (const entry of entries) {
    const existing = map.get(entry.userId);
    if (existing) {
      existing.hours += entry.durationHours;
      existing.entriesCount += 1;
      existing.avgEntryHours = +(
        existing.hours / existing.entriesCount
      ).toFixed(2);
    } else {
      map.set(entry.userId, {
        userId: entry.userId,
        userName: entry.userName,
        userEmail: entry.userEmail,
        hours: entry.durationHours,
        entriesCount: 1,
        avgEntryHours: entry.durationHours,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => b.hours - a.hours);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
