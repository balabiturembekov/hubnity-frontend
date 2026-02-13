import { format } from "date-fns";
import { formatDurationFull } from "@/shared/lib/utils";
import type { TimeEntryEntity } from "../model/time-entry.types";

export const getEntryDate = (entry: TimeEntryEntity) => {
  let startDate: Date | null = null;
  let endDate: Date | null = null;
  try {
    const start = new Date(entry.startTime);
    if (!Number.isNaN(start.getTime())) {
      startDate = start;
    }
    if (entry.endTime) {
      const end = new Date(entry.endTime);
      if (!Number.isNaN(end.getTime())) {
        endDate = end;
      }
    }
  } catch {}

  if (!startDate) {
    return "Invalid date";
  }

  return (
    <>
      {format(startDate, "MMM dd, yyyy HH:mm")}
      {endDate && <> - {format(endDate, "HH:mm")}</>}
    </>
  );
};

export const getEntryDuration = (entry: TimeEntryEntity) => {
  const duration = entry.duration;
  if (
    duration === null ||
    duration === undefined ||
    !Number.isFinite(duration) ||
    Number.isNaN(duration) ||
    duration < 0
  ) {
    return formatDurationFull(0);
  }
  return formatDurationFull(duration);
};
