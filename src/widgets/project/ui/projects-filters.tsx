"use client";

import { Filter, Search, X } from "lucide-react";
import { useProjectsStore } from "@/features/project";
import { useFilteredProjects } from "@/features/project/hooks/use-filtered-projects";
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
import { FilterSkeleton } from "@/widgets/skeleton";

export const ProjectsFilters = () => {
  const {
    searchQuery,
    statusFilter,
    setSearchQuery,
    setStatusFilter,
    resetFilters,
  } = useProjectsStore();
  const { projects, totalCount, hasActiveFilters, isLoading } =
    useFilteredProjects();

  if (isLoading) {
    return <FilterSkeleton />;
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <CardTitle>Filters</CardTitle>
        </div>
        <CardDescription>Search and filter projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, description, or client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
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
            Showing {projects.length} of {totalCount} projects
          </div>
        )}
      </CardContent>
    </Card>
  );
};
