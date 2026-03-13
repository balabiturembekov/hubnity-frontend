import { format } from "date-fns";
import { Activity, TrendingUp } from "lucide-react";
import { useOrganizationRole } from "@/entities/organization";
import {
  TeamActivityBadgeColor,
  TeamActivityBadgeVariant,
} from "@/entities/team-activity";
import { UserAvatar } from "@/entities/user";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Badge } from "@/shared/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { EmptyState } from "@/widgets/empty-state";
import { DashboardSectionHeader } from "@/widgets/header";
import { ListItemsSkeleton } from "@/widgets/skeleton";
import { useFilteredTeamActivity } from "../hooks/use-filtered-team-activity";

export const MembersTable = () => {
  const isUser = useOrganizationRole().isUser;
  const { teamActivity, isLoading } = useFilteredTeamActivity();

  if (isLoading) {
    return <ListItemsSkeleton />;
  }

  return (
    <section className="overflow-y-auto">
      <DashboardSectionHeader
        title="Team Members"
        icon={Activity}
        description={
          !isUser
            ? "Time worked and amounts earned per team member"
            : "Your time worked and amounts earned per project"
        }
      >
        <Badge variant="secondary" className="ml-2">
          {teamActivity?.members.length}
        </Badge>
      </DashboardSectionHeader>
      <div className="mt-4">
        {teamActivity?.members.length === 0 ? (
          <EmptyState
            icon={<Activity className="h-12 w-12 mx-auto" />}
            title={!isUser ? "No team activity" : "No activity"}
            description={
              !isUser
                ? "No time entries found for the selected period and filters."
                : "No time entries found for the selected period."
            }
          />
        ) : (
          <Accordion
            type="single"
            collapsible
            className="w-full overflow-x-auto space-y-3"
          >
            {teamActivity?.members.map((member) => (
              <AccordionItem
                key={member.userId}
                value={member.userId}
                className="group border border-border rounded-xl px-2 sm:px-4 bg-card shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 min-w-[528px] overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-4 flex items-center">
                  <div className="flex items-center gap-4 w-full pr-4">
                    <div className="relative">
                      <UserAvatar
                        name={member.userName}
                        avatar={member.userAvatar || undefined}
                        size="md"
                        className="ring-2 ring-background shadow-sm"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-base tracking-tight text-foreground">
                        {member.userName}
                      </div>
                      <div className="text-xs font-medium text-muted-foreground mt-0.5">
                        {member.userEmail}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm shrink-0">
                      <div className="text-right flex flex-col items-end">
                        <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-0.5">
                          Hours
                        </div>
                        <div className="font-bold text-primary group-hover:text-primary transition-colors text-base">
                          {`${member.totalHours.toFixed(2)}h`}
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-0.5">
                          Earned
                        </div>
                        <div className="font-bold text-emerald-600 text-base">
                          ${member.totalEarned.toFixed(2)}
                        </div>
                      </div>
                      <Badge
                        variant={
                          TeamActivityBadgeVariant[
                            member.activityLevel.toUpperCase() as keyof typeof TeamActivityBadgeVariant
                          ]
                        }
                        className={`${
                          TeamActivityBadgeColor[
                            member.activityLevel.toUpperCase() as keyof typeof TeamActivityBadgeColor
                          ]
                        } px-2.5 py-0.5 text-xs font-semibold tracking-wide`}
                      >
                        {member.activityLevel}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 space-y-6 pb-4">
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                      <div className="rounded-xl border border-border/50 bg-primary/5 p-4 flex flex-col justify-center gap-1 transition-colors hover:bg-primary/10">
                        <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                          Hourly Rate
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {member.hourlyRate
                            ? `$${member.hourlyRate}/hr`
                            : "Not set"}
                        </div>
                      </div>
                      <div className="rounded-xl border border-border/50 bg-muted/30 p-4 flex flex-col justify-center gap-1 transition-colors hover:bg-muted/50">
                        <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                          Time Entries
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {member.entriesCount}
                        </div>
                      </div>
                      <div className="rounded-xl border border-border/50 bg-muted/30 p-4 flex flex-col justify-center gap-1 transition-colors hover:bg-muted/50 col-span-2 sm:col-span-1">
                        <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                          Last Activity
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          {member.lastActivity &&
                          !Number.isNaN(new Date(member.lastActivity).getTime())
                            ? format(member.lastActivity, "MMM dd, yyyy HH:mm")
                            : "Never"}
                        </div>
                      </div>
                    </div>
                    {member.projectBreakdown.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-sm font-semibold flex items-center gap-2 text-foreground">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          Projects Breakdown
                        </div>
                        <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
                          <Table>
                            <TableHeader className="bg-muted/30">
                              <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold">
                                  Project
                                </TableHead>
                                <TableHead className="text-right font-semibold">
                                  Hours
                                </TableHead>
                                <TableHead className="text-right font-semibold">
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
                                  className="transition-colors hover:bg-muted/40"
                                >
                                  <TableCell>
                                    <div className="flex items-center gap-3">
                                      <div
                                        className="h-3 w-3 rounded-full shrink-0 shadow-sm"
                                        style={{
                                          backgroundColor:
                                            project.projectColor || "#6b7280",
                                        }}
                                      />
                                      <span className="font-medium text-foreground">
                                        {project.projectName}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                    {`${project.hours.toFixed(2)}h`}
                                  </TableCell>
                                  <TableCell className="text-right font-semibold text-emerald-600/90">
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
      </div>
    </section>
  );
};
