import React from "react";
import { UserAvatar } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

const appUrlTableHeaders = [
  "Project",
  "Member",
  "App or site",
  "Time spent (h)",
  "Percent used",
];

const mockData = [
  {
    date: "Mon, Feb 16, 2026",
    isAllSpecific: false,
    project: "Hubnity",
    member: "Adelya Dadabaeyva",
    appOrSite: "Yandex",
    timeSpent: "3:51:51",
    percentUsed: 78,
  },
  {
    date: "Mon, Feb 16, 2026",
    isAllSpecific: false,
    project: "",
    member: "",
    appOrSite: "Microsoft® Windows®",
    timeSpent: "0:51:24",
    percentUsed: 17,
  },
  {
    date: "Mon, Feb 16, 2026",
    isAllSpecific: false,
    project: "",
    member: "",
    appOrSite: "Hubstaff",
    timeSpent: "0:03:24",
    percentUsed: 1,
  },
  {
    date: "Mon, Feb 16, 2026",
    isAllSpecific: true,
    project: "Hubnity",
    member: "Aidana Atimova",
    appOrSite: "Yandex",
    timeSpent: "3:51:51",
    percentUsed: 78,
  },
  {
    date: "Mon, Feb 16, 2026",
    isAllSpecific: true,
    project: "",
    member: "",
    appOrSite: "Microsoft® Windows®",
    timeSpent: "0:51:24",
    percentUsed: 17,
  },
  {
    date: "Mon, Feb 16, 2026",
    isAllSpecific: true,
    project: "",
    member: "",
    appOrSite: "Hubstaff",
    timeSpent: "0:03:24",
    percentUsed: 1,
  },
  {
    date: "Mon, Feb 15, 2026",
    isAllSpecific: false,
    project: "Hubstaff",
    member: "Adelya Dadabaeyva",
    appOrSite: "Yandex",
    timeSpent: "3:51:51",
    percentUsed: 78,
  },
  {
    date: "Mon, Feb 15, 2026",
    isAllSpecific: false,
    project: "",
    member: "",
    appOrSite: "Microsoft® Windows®",
    timeSpent: "0:51:24",
    percentUsed: 17,
  },
  {
    date: "Mon, Feb 15, 2026",
    isAllSpecific: false,
    project: "",
    member: "",
    appOrSite: "Hubstaff",
    timeSpent: "0:03:24",
    percentUsed: 1,
  },
  {
    date: "Mon, Feb 15, 2026",
    isAllSpecific: true,
    project: "Hubnity",
    member: "Aidana Atimova",
    appOrSite: "Yandex",
    timeSpent: "3:51:51",
    percentUsed: 78,
  },
  {
    date: "Mon, Feb 15, 2026",
    isAllSpecific: true,
    project: "",
    member: "",
    appOrSite: "Microsoft® Windows®",
    timeSpent: "0:51:24",
    percentUsed: 17,
  },
  {
    date: "Mon, Feb 15, 2026",
    isAllSpecific: true,
    project: "",
    member: "",
    appOrSite: "Hubstaff",
    timeSpent: "0:03:24",
    percentUsed: 1,
  },
];

interface AppsUrlsTableProps {
  isAll?: boolean;
  limit?: number;
}

const getProgressColor = (percent: number) => {
  if (percent > 70) return "bg-emerald-500";
  if (percent > 30) return "bg-blue-500";
  if (percent > 0) return "bg-orange-500";
  return "bg-slate-200";
};

export const AppsUrlsTable = ({ isAll = true, limit }: AppsUrlsTableProps) => {
  let filteredData = mockData.filter((item) =>
    isAll ? true : !item.isAllSpecific,
  );

  if (limit) {
    filteredData = filteredData.slice(0, limit);
  }

  // Group by date
  const groupedData = filteredData.reduce(
    (acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = [];
      }
      acc[item.date].push(item);
      return acc;
    },
    {} as Record<string, typeof filteredData>,
  );

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {appUrlTableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedData).map(([date, items]) => (
            <React.Fragment key={date}>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableCell
                  colSpan={5}
                  className="py-2 text-sm font-medium text-foreground"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                    {date}
                  </div>
                </TableCell>
              </TableRow>
              {items.map((item, index) => (
                <TableRow key={`${item.appOrSite}-${index}`}>
                  <TableCell>
                    {item.project ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {item.project}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/30"></span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.member ? (
                      <div className="flex items-center gap-3">
                        <UserAvatar
                          name={item.member}
                          className="h-8 w-8 ring-2 ring-background shadow-xs group-hover:ring-primary/10 transition-all"
                        />
                        <span className="text-sm font-medium">
                          {item.member}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground/30"></span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground/80 font-medium">
                      {item.appOrSite}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm tabular-nums text-muted-foreground font-medium">
                      {item.timeSpent}
                    </span>
                  </TableCell>
                  <TableCell className="w-[250px]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-muted-foreground">
                          Usage
                        </span>
                        <span className="font-semibold text-foreground">
                          {item.percentUsed}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted shadow-inner">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500 ease-in-out",
                            getProgressColor(item.percentUsed),
                          )}
                          style={{ width: `${item.percentUsed}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
