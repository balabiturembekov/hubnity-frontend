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
  path: string;
  isAdminOnly?: boolean;
};

type DashboardSidebarLinks = {
  id: string;
  label: string;
  path?: string;
  icon: LucideIcon;
  isAdminOnly?: boolean;
  childrenLinks?: ChildrenLink[];
};

export const dashboardSidebarLinks: DashboardSidebarLinks[] = [
  {
    id: "1",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "2",
    label: "Time Tracking",
    path: "/tracking",
    icon: BarChart3,
  },
  {
    id: "6",
    label: "Team & Activity",
    path: "/admin/team-activity",
    icon: Activity,
    isAdminOnly: true,
  },
  {
    id: "4",
    label: "Management",
    path: "/admin/campaigns",
    icon: FileText,
    isAdminOnly: true,
    // childrenLinks: [
    //   {
    //     id: "1",
    //     label: "Campaigns",
    //     href: "/dashboard/admin/campaigns",
    //     isAdminOnly: true,
    //   },
    //   {
    //     id: "2",
    //     label: "Jobs",
    //     href: "/dashboard/admin/campaigns/jobs",
    //     isAdminOnly: true,
    //   },
    // ],
  },
  {
    id: "5",
    label: "Summaries",
    path: "/summaries",
    icon: BarChart3,
    childrenLinks: [
      {
        id: "1",
        label: "Activity & Time",
        path: "/summaries",
        isAdminOnly: true,
      },
      {
        id: "2",
        label: "Full Reports",
        path: "/summaries/full-reports",
      },
    ],
  },
  {
    id: "3",
    label: "Employees",
    path: "/admin/employees",
    icon: Users,
    isAdminOnly: true,
  },
  {
    id: "7",
    label: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    id: "8",
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
    isAdminOnly: true,
    childrenLinks: [
      {
        id: "1",
        label: "General",
        path: "/admin/settings",
      },
      // {
      //   id: "2",
      //   label: "Organization",
      //   href: "/dashboard/admin/settings/organization",
      // },
      {
        id: "3",
        label: "Members",
        path: "/admin/settings/members",
      },
      {
        id: "4",
        label: "Activity & Tracking",
        path: "/admin/settings/activity-tracking",
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
