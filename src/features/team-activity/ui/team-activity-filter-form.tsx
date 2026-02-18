import { Filter, X } from "lucide-react";
import { periodsLabels, TeamActivityPeriod } from "@/entities/team-activity";
import { useUser } from "@/entities/user";
import { useTeamActivityStore } from "@/features/team-activity";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import { useFilteredTeamActivity } from "../hooks/use-filtered-team-activity";

export const TeamActivityFilterForm = () => {
  const { isAdmin } = useUser();
  const {
    period,
    userId,
    projectId,
    setPeriod,
    setUserId,
    setProjectId,
    reset,
  } = useTeamActivityStore();
  const { hasActiveFilters, projects, employees, isLoading } =
    useFilteredTeamActivity();

  if (!isAdmin) return null;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <CardTitle>Filters</CardTitle>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={reset} className="gap-2">
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
        <CardDescription>
          Filter team activity by period, member, and project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="period-filter">Period</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger id="period-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TeamActivityPeriod).map((period) => (
                    <SelectItem key={period} value={period}>
                      {periodsLabels[period]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="member-filter">Team Member</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select value={userId} onValueChange={setUserId}>
                <SelectTrigger id="member-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  {employees
                    .filter((u) => u.status === "ACTIVE")
                    .map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-filter">Project</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger id="project-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects
                    .filter((p) => p.status === "ACTIVE")
                    .map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
