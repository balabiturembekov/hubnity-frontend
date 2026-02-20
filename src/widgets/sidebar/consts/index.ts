import {
  Activity,
  BarChart3,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  Settings,
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
    id: "6",
    label: "Team & Activity",
    href: "/dashboard/admin/team-activity",
    icon: Activity,
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
    label: "Summaries",
    href: "/dashboard/admin/summaries",
    icon: BarChart3,
    isAdminOnly: true,
    childrenLinks: [
      {
        id: "1",
        label: "Activity & Time",
        href: "/dashboard/admin/summaries",
      },
      {
        id: "2",
        label: "Full Reports",
        href: "/dashboard/admin/summaries/full-reports",
      },
    ],
  },
  {
    id: "3",
    label: "Employees",
    href: "/dashboard/admin/employees",
    icon: Users,
    isAdminOnly: true,
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
    icon: Settings,
    isAdminOnly: true,
    childrenLinks: [
      {
        id: "1",
        label: "General",
        href: "/dashboard/admin/settings",
      },
      // {
      //   id: "2",
      //   label: "Organization",
      //   href: "/dashboard/admin/settings/organization",
      // },
      {
        id: "3",
        label: "Members",
        href: "/dashboard/admin/settings/members",
      },
      {
        id: "4",
        label: "Activity & tracking",
        href: "/dashboard/admin/settings/activity-tracking",
      },
      // {
      //   id: "5",
      //   label: "Policies",
      //   href: "/dashboard/admin/settings/policies",
      // },
      // {
      //   id: "6",
      //   label: "Integrations",
      //   href: "/dashboard/admin/settings/integrations",
      // },
      // {
      //   id: "7",
      //   label: "Billing",
      //   href: "/dashboard/admin/settings/billing",
      // },
    ],
  },
];
