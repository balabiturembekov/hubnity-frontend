import { Filter, Search, X } from "lucide-react";
import { useGetProjectsQuery } from "@/entities/project";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useFilteredTimeEntries } from "../hooks/use-filtered-time-entries";
import { useTimeEntriesStore } from "../model/time-entries.store";

export const TimeEntriesFilterForm = () => {
  const {
    searchQuery,
    projectId,
    period,
    setSearchQuery,
    setProjectId,
    setPeriod,
    resetFilters,
  } = useTimeEntriesStore();
  const { data: projects } = useGetProjectsQuery();
  const { timeEntries, totalCount, hasActiveFilters } =
    useFilteredTimeEntries();

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <CardTitle>Filters</CardTitle>
        </div>
        <CardDescription>Search and filter time entries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={projectId} onValueChange={setProjectId}>
            <SelectTrigger className="w-full sm:w-[180px]">
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
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
        {hasActiveFilters && (
          <div className="mt-3 text-sm text-muted-foreground">
            Showing {timeEntries.length} of {totalCount} time entries
          </div>
        )}
      </CardContent>
    </Card>
  );
};
