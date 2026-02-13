import { format } from "date-fns";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { useGetTeamActivityQuery } from "@/entities/team-activity";
import { exportToCSV } from "@/shared/lib/export/csv-export";
import { formatDurationFull } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { useTeamActivityStore } from "../model/team-activity.store";

export const ExportTeamActivityCSV = () => {
  const { period, userId, projectId } = useTeamActivityStore();
  const { data: teamActivity } = useGetTeamActivityQuery(
    period,
    userId === "all" ? undefined : userId,
    projectId === "all" ? undefined : projectId,
  );

  const handleExport = () => {
    if (!teamActivity || !teamActivity.members.length) {
      toast.error("No data to export");
      return;
    }

    const csvData = teamActivity.members.flatMap((member) =>
      member.projectBreakdown.map((project) => ({
        "Team Member": member.userName,
        Email: member.userEmail,
        "Hourly Rate": member.hourlyRate ? `$${member.hourlyRate}` : "-",
        Project: project.projectName || "No Project",
        "Hours Worked": formatDurationFull(project.hours * 3600),
        "Amount Earned": `$${project.earned.toFixed(2)}`,
        "Activity Level": member.activityLevel,
        "Total Hours": formatDurationFull(member.totalHours * 3600),
        "Total Earned": `$${member.totalEarned.toFixed(2)}`,
        "Last Activity":
          member.lastActivity &&
          !Number.isNaN(new Date(member.lastActivity).getTime())
            ? format(member.lastActivity, "yyyy-MM-dd HH:mm")
            : "-",
      })),
    );

    exportToCSV(
      csvData,
      `team-activity-${period}-${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
    toast.success("Data exported successfully");
  };

  return (
    <Button onClick={handleExport} variant="outline" className="gap-2">
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
};
