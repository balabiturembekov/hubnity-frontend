"use client";

import { format } from "date-fns";
import { Camera, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetProjectsQuery } from "@/entities/project";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { useUser, useUserStore } from "@/entities/user";
import {
  DeleteTimeEntryDialog,
  TimeEntriesFilterForm,
  UpdateTimeEntryDialog,
  useTimeEntriesStore,
} from "@/features/time-entry";
import { useFilteredTimeEntries } from "@/features/time-entry/hooks/use-filtered-time-entries";
import { formatDurationFull } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { ExportDialog } from "@/widgets/export";
import { DashboardSectionHeader } from "@/widgets/header";
import { ScreenshotGallery } from "@/widgets/screenshot-gallery";

export { TimeEntriesFilterForm } from "@/features/time-entry";

interface TimeEntriesTableProps {
  showActions?: boolean;
  isPreview?: boolean;
  userId?: string;
}

export function TimeEntriesTable({
  showActions = true,
  isPreview = false,
  userId,
}: TimeEntriesTableProps) {
  const { user: currentUser } = useUserStore();
  const { isAdmin } = useUser();
  const { data: projects } = useGetProjectsQuery();
  const { timeEntries, isLoading } = useFilteredTimeEntries(userId);
  const { searchQuery, projectId, period } = useTimeEntriesStore();

  const [screenshotGalleryOpen, setScreenshotGalleryOpen] = useState(false);
  const [entryForScreenshots, setEntryForScreenshots] =
    useState<TimeEntryEntity | null>(null);

  const isEmployee = currentUser?.role === "EMPLOYEE";

  const canEdit = (entry: TimeEntryEntity) => {
    return entry.userId === currentUser?.id || isAdmin;
  };

  const getProjectColor = (projectId?: string | null) => {
    if (!projectId || !projects) return undefined;
    const project = projects.find((p) => p.id === projectId);
    return project?.color;
  };

  return (
    <div className="space-y-4">
      <DashboardSectionHeader
        title="Time Entries"
        icon={FileText}
        actionChildren={!isPreview && <ExportDialog buttonLabel="Export" />}
        link={
          isPreview
            ? {
                label: "View All",
                href: "/dashboard/tracking",
              }
            : undefined
        }
      >
        {!isPreview && (
          <Badge variant="secondary" className="ml-2">
            {timeEntries?.length ?? 0}
          </Badge>
        )}
      </DashboardSectionHeader>

      <TimeEntriesFilterForm />

      <TooltipProvider>
        <div className="overflow-x-auto">
          <div className="w-full overflow-x-auto rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  {!isEmployee && <TableHead>User</TableHead>}
                  <TableHead>Project</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  {showActions && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      {!isEmployee && (
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                      )}
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      {showActions && (
                        <TableCell className="text-right">
                          <Skeleton className="h-8 w-16 ml-auto" />
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : timeEntries.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={
                        showActions ? (isEmployee ? 5 : 6) : isEmployee ? 4 : 5
                      }
                      className="h-64"
                    >
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Clock className="h-12 w-12 mb-4" />
                        <p className="text-lg font-medium">
                          {searchQuery ||
                          projectId !== "all" ||
                          period !== "all"
                            ? "No entries found"
                            : "No time entries yet"}
                        </p>
                        <p className="text-sm">
                          {searchQuery ||
                          projectId !== "all" ||
                          period !== "all"
                            ? "Try adjusting your filters"
                            : "Start tracking your time"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  timeEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      {!isEmployee && (
                        <TableCell className="font-medium flex flex-col">
                          <Button
                            className="p-0 justify-start h-auto"
                            variant="link"
                            asChild
                          >
                            <Link
                              className="font-medium"
                              href={`/dashboard/admin/employees/${entry.userId}`}
                            >
                              {entry.user.name}
                            </Link>
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            {entry.user.email}
                          </span>
                        </TableCell>
                      )}
                      <TableCell>
                        {entry.project ? (
                          <Badge
                            variant="outline"
                            style={{
                              borderColor: getProjectColor(entry.projectId),
                              color: getProjectColor(entry.projectId),
                            }}
                          >
                            {entry.project.name}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">
                            No project
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(entry.startTime),
                          "MMM dd, yyyy HH:mm",
                        )}
                      </TableCell>
                      <TableCell>
                        {entry.status === "RUNNING" ? (
                          <div className="flex items-center gap-2">
                            <span className="relative flex size-3">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                            </span>
                            <span className="text-green-500 font-medium">
                              Live
                            </span>
                          </div>
                        ) : (
                          formatDurationFull(entry.duration)
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            entry.status === "RUNNING"
                              ? "default"
                              : entry.status === "PAUSED"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {entry.status}
                        </Badge>
                      </TableCell>
                      {showActions && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setEntryForScreenshots(entry);
                                    setScreenshotGalleryOpen(true);
                                  }}
                                >
                                  <Camera className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View screenshots</p>
                              </TooltipContent>
                            </Tooltip>
                            {canEdit(entry) && (
                              <>
                                <UpdateTimeEntryDialog timeEntry={entry} />
                                <DeleteTimeEntryDialog timeEntry={entry} />
                              </>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <ScreenshotGallery
          timeEntryId={entryForScreenshots?.id || ""}
          open={screenshotGalleryOpen}
          onOpenChange={(open) => {
            setScreenshotGalleryOpen(open);
            if (!open) {
              setEntryForScreenshots(null);
            }
          }}
        />
      </TooltipProvider>
    </div>
  );
}
