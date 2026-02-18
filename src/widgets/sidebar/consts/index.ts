import {
  Activity,
  BarChart3,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  User,
  Users,
} from "lucide-react";

type DashboardSidebarLinks = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  isAdminOnly?: boolean;
  // color: string;
};

export const dashboardSidebarLinks: DashboardSidebarLinks[] = [
  {
    id: "1",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    // color: "text-[#fb2c36]",
  },
  {
    id: "2",
    label: "Time Tracking",
    href: "/dashboard/tracking",
    icon: BarChart3,
    // color: "text-[#ff6900]",
  },
  {
    id: "3",
    label: "Employees",
    href: "/dashboard/admin/employees",
    icon: Users,
    isAdminOnly: true,
    // color: "text-[#efb100]",
  },
  {
    id: "4",
    label: "Projects",
    href: "/dashboard/admin/projects",
    icon: FileText,
    isAdminOnly: true,
    // color: "text-[#00c951]",
  },
  {
    id: "5",
    label: "Reports",
    href: "/dashboard/admin/reports",
    icon: BarChart3,
    isAdminOnly: true,
    // color: "text-[#2b7fff]",
  },
  {
    id: "6",
    label: "Team & Activity",
    href: "/dashboard/admin/team-activity",
    icon: Activity,
    // color: "text-[#9810fa]",
  },
  {
    id: "7",
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
    // color: "text-[#ff2056]",
  },
];
