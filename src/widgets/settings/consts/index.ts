import {
  Activity,
  AlarmClock,
  CalendarClock,
  Clock,
  Coffee,
  CreditCard,
  FileText,
  FolderRoot,
  Info,
  KanbanSquare,
  KeyRound,
  Landmark,
  LockKeyhole,
  MessageSquare,
  Monitor,
  Plane,
  Plug,
  Receipt,
  Settings,
  SlidersHorizontal,
  Timer,
  Trophy,
  Wallet,
} from "lucide-react";
import type { SettingsItemType } from "@/widgets/settings/model/types";

export const settingsItems: SettingsItemType[] = [
  {
    id: "1",
    title: "Organization",
    links: [
      {
        id: "1",
        label: "Company information",
        href: "/dashboard/admin/settings/organization",
        icon: Info,
        description:
          "Manage company name, logo, contact details and general organization info.",
      },
      {
        id: "2",
        label: "Security & Log in",
        href: "/dashboard/admin/settings/organization",
        icon: LockKeyhole,
        description:
          "Configure authentication, password policies and login security settings.",
      },
      {
        id: "3",
        label: "Projects & to-dos",
        href: "/dashboard/admin/settings/organization",
        icon: FolderRoot,
        description:
          "Create and manage projects, tasks and internal workflows.",
      },
      {
        id: "4",
        label: "Permissions",
        href: "/dashboard/admin/settings/organization",
        icon: KeyRound,
        description:
          "Define roles and control access levels across the organization.",
      },
    ],
  },
  {
    id: "2",
    title: "Members",
    links: [
      {
        id: "1",
        label: "Custom fields",
        href: "/dashboard/admin/settings/members",
        icon: SlidersHorizontal,
        description: "Create and manage additional profile fields for members.",
      },
      {
        id: "2",
        label: "Work time limits",
        href: "/dashboard/admin/settings/members",
        icon: Clock,
        description: "Set daily and weekly work hour limits for team members.",
      },
      {
        id: "3",
        label: "Payments",
        href: "/dashboard/admin/settings/members",
        icon: Wallet,
        description:
          "Configure payment rates, salaries and compensation details.",
      },
      {
        id: "4",
        label: "Achievements",
        href: "/dashboard/admin/settings/members",
        icon: Trophy,
        description: "Track milestones, badges and performance achievements.",
      },
    ],
  },
  {
    id: "3",
    title: "Activity & tracking",
    links: [
      {
        id: "1",
        label: "Activity",
        href: "/dashboard/admin/settings/activity-tracking",
        icon: Activity,
        description: "Monitor user activity levels and productivity metrics.",
      },
      {
        id: "2",
        label: "Timesheets",
        href: "/dashboard/admin/settings/activity-tracking",
        icon: CalendarClock,
        description: "Review and approve employee timesheets.",
      },
      {
        id: "3",
        label: "Time & tracking",
        href: "/dashboard/admin/settings/activity-tracking",
        icon: Timer,
        description: "Configure time tracking behavior and tracking rules.",
      },
      {
        id: "4",
        label: "Screenshots",
        href: "/dashboard/admin/settings/activity-tracking",
        icon: Monitor,
        description:
          "Manage screenshot capture frequency and storage settings.",
      },
    ],
  },
  {
    id: "4",
    title: "Policies",
    links: [
      {
        id: "1",
        label: "Time off",
        href: "/dashboard/admin/settings/policies",
        icon: Plane,
        description:
          "Set rules and approval flow for vacations and leave requests.",
      },
      {
        id: "2",
        label: "Work breaks",
        href: "/dashboard/admin/settings/policies",
        icon: Coffee,
        description: "Configure break duration, limits and compliance rules.",
      },
      {
        id: "3",
        label: "Overtime",
        href: "/dashboard/admin/settings/policies",
        icon: AlarmClock,
        description: "Define overtime policies and compensation rules.",
      },
    ],
  },
  {
    id: "5",
    title: "Integrations",
    links: [
      {
        id: "1",
        label: "All integrations",
        href: "/dashboard/admin/settings/integrations",
        icon: Plug,
        description:
          "Browse and manage all available third-party integrations.",
      },
      {
        id: "2",
        label: "Wise",
        href: "/dashboard/admin/settings/integrations",
        icon: Landmark,
        description: "Connect and configure Wise for international payments.",
      },
      {
        id: "3",
        label: "Jira",
        href: "/dashboard/admin/settings/integrations",
        icon: KanbanSquare,
        description: "Sync projects and tasks with Jira.",
      },
      {
        id: "4",
        label: "Slack",
        href: "/dashboard/admin/settings/integrations",
        icon: MessageSquare,
        description: "Connect Slack to receive notifications and updates.",
      },
    ],
  },
  {
    id: "6",
    title: "Billing",
    links: [
      {
        id: "1",
        label: "Billing information",
        href: "/dashboard/admin/settings/billing",
        icon: CreditCard,
        description:
          "Manage billing details, payment methods and company address.",
      },
      {
        id: "2",
        label: "Subscription invoices",
        href: "/dashboard/admin/settings/billing",
        icon: FileText,
        description: "View and download subscription invoices.",
      },
      {
        id: "3",
        label: "Subscription settings",
        href: "/dashboard/admin/settings/billing",
        icon: Settings,
        description: "Upgrade, downgrade or manage your subscription plan.",
      },
      {
        id: "4",
        label: "Client invoice",
        href: "/dashboard/admin/settings/billing",
        icon: Receipt,
        description: "Create and manage invoices issued to your clients.",
      },
    ],
  },
];
