"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { AppsUrlsFilters } from "./apps-urls-filters";
import { AppsUrlsTable } from "./apps-urls-table";

interface AppsUrlsReportProps {
  isAll?: boolean;
}

export const AppsUrlsReport = ({ isAll = true }: AppsUrlsReportProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: new Date(new Date().getFullYear(), 0, 20),
  });

  return (
    <div className="flex flex-col gap-4">
      <AppsUrlsFilters date={date} setDate={setDate} />
      <AppsUrlsTable isAll={isAll} />
    </div>
  );
};
