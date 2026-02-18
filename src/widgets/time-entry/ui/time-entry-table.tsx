"use client";

import { format } from "date-fns";
import { Camera, Clock, FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useGetProjectsQuery } from "@/entities/project";
import {
  type TimeEntryEntity,
  useGetTimeEntriesQuery,
} from "@/entities/time-entry";
import { useUserStore } from "@/entities/user";
import {
  DeleteTimeEntryDialog,
  UpdateTimeEntryDialog,
} from "@/features/time-entry";
import { formatDurationFull } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
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

interface TimeEntriesTableProps {
  userId?: string;
  showActions?: boolean;
  isPreview?: boolean;
}

export function TimeEntriesTable({
  userId,
  showActions = true,
  isPreview = false,
}: TimeEntriesTableProps) {
  const { user: currentUser } = useUserStore();
  const { data: timeEntries, isLoading } = useGetTimeEntriesQuery({ userId });
  const { data: projects } = useGetProjectsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [screenshotGalleryOpen, setScreenshotGalleryOpen] = useState(false);
  const [entryForScreenshots, setEntryForScreenshots] =
    useState<TimeEntryEntity | null>(null);

  const isEmployee = currentUser?.role === "EMPLOYEE";
  const isAdmin =
    currentUser?.role === "ADMIN" ||
    currentUser?.role === "OWNER" ||
    currentUser?.role === "SUPER_ADMIN";

  const filteredEntries = useMemo(() => {
    if (!timeEntries) return [];

    let filtered = [...timeEntries];

    // Filter by user
    if (userId) {
      filtered = filtered.filter((e) => e.userId === userId);
    } else if (isEmployee) {
      filtered = filtered.filter((e) => e.userId === currentUser?.id);
    }

    // Filter by project
    if (projectFilter !== "all") {
      if (projectFilter === "none") {
        filtered = filtered.filter((e) => !e.projectId);
      } else {
        filtered = filtered.filter((e) => e.projectId === projectFilter);
      }
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (dateFilter === "today") {
        filtered = filtered.filter((e) => {
          const entryDate = new Date(e.startTime);
          return entryDate >= today;
        });
      } else if (dateFilter === "week") {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter((e) => {
          const entryDate = new Date(e.startTime);
          return entryDate >= weekAgo;
        });
      } else if (dateFilter === "month") {
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = filtered.filter((e) => {
          const entryDate = new Date(e.startTime);
          return entryDate >= monthAgo;
        });
      }
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.user.name.toLowerCase().includes(searchLower) ||
          e.project?.name.toLowerCase().includes(searchLower) ||
          e.description?.toLowerCase().includes(searchLower),
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      const timeA = new Date(a.startTime).getTime();
      const timeB = new Date(b.startTime).getTime();
      return timeB - timeA;
    });

    return filtered;
  }, [
    timeEntries,
    userId,
    isEmployee,
    currentUser?.id,
    projectFilter,
    dateFilter,
    searchTerm,
  ]);

  const canEdit = (entry: TimeEntryEntity) => {
    return entry.userId === currentUser?.id || isAdmin;
  };

  const getProjectColor = (projectId?: string | null) => {
    if (!projectId || !projects) return undefined;
    const project = projects.find((p) => p.id === projectId);
    return project?.color;
  };

  return (
    <>
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

      {/*<Card>*/}
      {/*  <CardContent>*/}
      <TooltipProvider>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative flex items-center">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-white"
                />
              </div>
            </div>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All projects</SelectItem>
                <SelectItem value="none">No project</SelectItem>
                {projects
                  ?.filter((p) => p.status === "ACTIVE")
                  .map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table - scroll horizontally on small screens */}
          <div className="w-full overflow-x-auto rounded-md border bg-white">
            <Table className="min-w-[800px]">
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
                ) : filteredEntries.length === 0 ? (
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
                          {searchTerm ||
                          projectFilter !== "all" ||
                          dateFilter !== "all"
                            ? "No entries found"
                            : "No time entries yet"}
                        </p>
                        <p className="text-sm">
                          {searchTerm ||
                          projectFilter !== "all" ||
                          dateFilter !== "all"
                            ? "Try adjusting your filters"
                            : "Start tracking your time"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      {!isEmployee && (
                        <TableCell className="font-medium">
                          {entry.user.name}
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
      {/*  </CardContent>*/}
      {/*</Card>*/}
    </>
  );
}
