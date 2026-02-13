import { format } from "date-fns";
import { Activity, TrendingUp } from "lucide-react";
import {
  TeamActivityBadgeColor,
  TeamActivityBadgeVariant,
} from "@/entities/team-activity";
import { UserAvatar, useUser } from "@/entities/user";
import { formatDurationFull } from "@/shared/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { EmptyState } from "@/widgets/empty-state";
import { useFilteredTeamActivity } from "../hooks/use-filtered-team-activity";

export const MembersTable = () => {
  const { isAdmin } = useUser();
  const { teamActivity, isLoading } = useFilteredTeamActivity();

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle>{isAdmin ? "Team Members" : "My Activity"}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {teamActivity?.members.length}
          </Badge>
        </div>
        <CardDescription>
          {isAdmin
            ? "Time worked and amounts earned per team member"
            : "Your time worked and amounts earned per project"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : teamActivity?.members.length === 0 ? (
          <EmptyState
            icon={<Activity className="h-12 w-12 mx-auto" />}
            title={isAdmin ? "No team activity" : "No activity"}
            description={
              isAdmin
                ? "No time entries found for the selected period and filters."
                : "No time entries found for the selected period."
            }
          />
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {teamActivity?.members.map((member) => (
              <AccordionItem
                key={member.userId}
                value={member.userId}
                className="border rounded-lg mb-2 px-4 transition-colors hover:bg-muted/50"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 w-full pr-4">
                    <UserAvatar
                      name={member.userName}
                      avatar={member.userAvatar || undefined}
                      size="md"
                    />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{member.userName}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.userEmail}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <div className="text-muted-foreground">Hours</div>
                        <div className="font-semibold">
                          {formatDurationFull(member.totalHours * 3600)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted-foreground">Earned</div>
                        <div className="font-semibold">
                          ${member.totalEarned.toFixed(2)}
                        </div>
                      </div>
                      <Badge
                        variant={
                          TeamActivityBadgeVariant[
                            member.activityLevel.toUpperCase() as keyof typeof TeamActivityBadgeVariant
                          ]
                        }
                        className={
                          TeamActivityBadgeColor[
                            member.activityLevel.toUpperCase() as keyof typeof TeamActivityBadgeColor
                          ]
                        }
                      >
                        {member.activityLevel}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 space-y-4 pb-4">
                    <div className="grid gap-4 md:grid-cols-3 text-sm">
                      <div className="rounded-lg border p-3">
                        <div className="text-muted-foreground mb-1">
                          Hourly Rate
                        </div>
                        <div className="font-semibold">
                          {member.hourlyRate
                            ? `$${member.hourlyRate}/hr`
                            : "Not set"}
                        </div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-muted-foreground mb-1">
                          Time Entries
                        </div>
                        <div className="font-semibold">
                          {member.entriesCount}
                        </div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-muted-foreground mb-1">
                          Last Activity
                        </div>
                        <div className="font-semibold">
                          {member.lastActivity &&
                          !Number.isNaN(new Date(member.lastActivity).getTime())
                            ? format(member.lastActivity, "MMM dd, yyyy HH:mm")
                            : "Never"}
                        </div>
                      </div>
                    </div>
                    {member.projectBreakdown.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Projects Breakdown
                        </div>
                        <div className="rounded-lg border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead className="text-right">
                                  Hours
                                </TableHead>
                                <TableHead className="text-right">
                                  Earned
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {member.projectBreakdown.map((project) => (
                                <TableRow
                                  key={
                                    project.projectId ||
                                    `no-project-${project.projectName}`
                                  }
                                  className="transition-colors hover:bg-muted/50"
                                >
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="h-3 w-3 rounded-full shrink-0"
                                        style={{
                                          backgroundColor:
                                            project.projectColor || "#6b7280",
                                        }}
                                      />
                                      <span className="font-medium">
                                        {project.projectName}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {formatDurationFull(project.hours * 3600)}
                                  </TableCell>
                                  <TableCell className="text-right font-semibold">
                                    ${project.earned.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};
