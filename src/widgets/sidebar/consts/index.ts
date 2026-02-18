import {
  Activity,
  BarChart3,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  User,
  Users,
} from "lucide-react";

type ChildrenLink = {
  id: string;
  label: string;
  href: string;
};

type DashboardSidebarLinks = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  isAdminOnly?: boolean;
  childrenLinks?: ChildrenLink[];
};

export const dashboardSidebarLinks: DashboardSidebarLinks[] = [
  {
    id: "1",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "2",
    label: "Time Tracking",
    href: "/dashboard/tracking",
    icon: BarChart3,
  },
  {
    id: "3",
    label: "Employees",
    href: "/dashboard/admin/employees",
    icon: Users,
    isAdminOnly: true,
  },
  {
    id: "4",
    label: "Projects",
    href: "/dashboard/admin/projects",
    icon: FileText,
    isAdminOnly: true,
  },
  {
    id: "5",
    label: "Reports",
    href: "/dashboard/admin/reports",
    icon: BarChart3,
    isAdminOnly: true,
  },
  {
    id: "6",
    label: "Team & Activity",
    href: "/dashboard/admin/team-activity",
    icon: Activity,
  },
  {
    id: "7",
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    id: "8",
    label: "Settings",
    href: "/dashboard/admin/settings",
    icon: User,
  },
];
