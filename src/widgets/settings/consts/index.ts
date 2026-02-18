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
        href: "",
        icon: Info,
        description:
          "Manage company name, logo, contact details and general organization info.",
      },
      {
        id: "2",
        label: "Security & Log in",
        href: "",
        icon: LockKeyhole,
        description:
          "Configure authentication, password policies and login security settings.",
      },
      {
        id: "3",
        label: "Projects & to-dos",
        href: "",
        icon: FolderRoot,
        description:
          "Create and manage projects, tasks and internal workflows.",
      },
      {
        id: "4",
        label: "Permissions",
        href: "",
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
        href: "",
        icon: SlidersHorizontal,
        description: "Create and manage additional profile fields for members.",
      },
      {
        id: "2",
        label: "Work time limits",
        href: "",
        icon: Clock,
        description: "Set daily and weekly work hour limits for team members.",
      },
      {
        id: "3",
        label: "Payments",
        href: "",
        icon: Wallet,
        description:
          "Configure payment rates, salaries and compensation details.",
      },
      {
        id: "4",
        label: "Achievements",
        href: "",
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
        href: "",
        icon: Activity,
        description: "Monitor user activity levels and productivity metrics.",
      },
      {
        id: "2",
        label: "Timesheets",
        href: "",
        icon: CalendarClock,
        description: "Review and approve employee timesheets.",
      },
      {
        id: "3",
        label: "Time & tracking",
        href: "",
        icon: Timer,
        description: "Configure time tracking behavior and tracking rules.",
      },
      {
        id: "4",
        label: "Screenshots",
        href: "",
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
        href: "",
        icon: Plane,
        description:
          "Set rules and approval flow for vacations and leave requests.",
      },
      {
        id: "2",
        label: "Work breaks",
        href: "",
        icon: Coffee,
        description: "Configure break duration, limits and compliance rules.",
      },
      {
        id: "3",
        label: "Overtime",
        href: "",
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
        href: "",
        icon: Plug,
        description:
          "Browse and manage all available third-party integrations.",
      },
      {
        id: "2",
        label: "Wise",
        href: "",
        icon: Landmark,
        description: "Connect and configure Wise for international payments.",
      },
      {
        id: "3",
        label: "Jira",
        href: "",
        icon: KanbanSquare,
        description: "Sync projects and tasks with Jira.",
      },
      {
        id: "4",
        label: "Slack",
        href: "",
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
        href: "",
        icon: CreditCard,
        description:
          "Manage billing details, payment methods and company address.",
      },
      {
        id: "2",
        label: "Subscription invoices",
        href: "",
        icon: FileText,
        description: "View and download subscription invoices.",
      },
      {
        id: "3",
        label: "Subscription settings",
        href: "",
        icon: Settings,
        description: "Upgrade, downgrade or manage your subscription plan.",
      },
      {
        id: "4",
        label: "Client invoice",
        href: "",
        icon: Receipt,
        description: "Create and manage invoices issued to your clients.",
      },
    ],
  },
];
