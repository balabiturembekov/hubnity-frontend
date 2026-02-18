// "use client";
//
// import { Activity, CalendarDays, Clock, Timer } from "lucide-react";
// import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
// import { StatsCard } from "@/entities/stats";
// import { StatsCardsSkeleton } from "@/widgets/skeleton";
//
// interface EmployeeDetailsTopStatsProps {
//   userId: string;
// }
//
// export const EmployeeDetailsTopStats = ({
//   userId,
// }: EmployeeDetailsTopStatsProps) => {
//   const {} = useScreen;
//
//   const isPending =
//     isThisWeekStatsPending || isThisMonthStatsPending || isTotalStatsPending;
//
//   if (!thisWeekStats || !thisMonthStats || !totalStats || isPending) {
//     return <StatsCardsSkeleton />;
//   }
//
//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//       <StatsCard
//         title="Hours this week"
//         icon={Clock}
//         stat={thisWeekStats.totalHours}
//         description=""
//       />
//       <StatsCard
//         title="Hours This Month"
//         icon={CalendarDays}
//         stat={thisMonthStats.totalHours}
//         description=""
//       />
//       <StatsCard
//         title="Activity Score"
//         icon={Activity}
//         stat={123}
//         description=""
//       />
//       <StatsCard
//         title="Total Sessions"
//         icon={Timer}
//         stat={totalStats.entriesCount}
//         description=""
//       />
//     </div>
//   );
// };
