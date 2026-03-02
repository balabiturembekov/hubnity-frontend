import {
  AlarmClock,
  ArchiveRestore,
  ChartNoAxesCombined,
  CheckCircle2,
  FolderOpen,
  GitBranch,
  type LucideIcon,
  Settings,
  Timer,
  Users,
} from "lucide-react";

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { id: "1", value: "99.9%", label: "Uptime" },
  { id: "2", value: "10K+", label: "Active Users" },
  { id: "3", value: "1M+", label: "Hours Tracked" },
  { id: "4", value: "24/7", label: "Support" },
];

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export const features: Feature[] = [
  {
    id: "1",
    icon: AlarmClock,
    title: "Auto tracking",
    description:
      "Record a calendar timeline of all your work activities throughout the day",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "2",
    icon: Timer,
    title: "Online work timer",
    description:
      "Capture every minute that your team spends accurately that helps you track",
    color: "bg-green-500/10 text-green-600",
  },
  {
    id: "3",
    icon: FolderOpen,
    title: "Timesheet report",
    description:
      "Use time tracking data to generate timesheets for every team member",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "4",
    icon: ArchiveRestore,
    title: "Easily invoicing",
    description:
      "Easily track billable time with one click multiple projects leave behind messy",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "5",
    icon: GitBranch,
    title: "Integrations tools",
    description: "Inside 100+ tools via browser extensions data to Trackflow",
    color: "bg-red-500/10 text-red-600",
  },
  {
    id: "6",
    icon: Users,
    title: "Report & Analysis",
    description:
      "See exactly how your team spends time on their work with Trackflow",
    color: "bg-yellow-500/10 text-yellow-600",
  },
];

interface Benefit {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    id: "1",
    icon: CheckCircle2,
    title: "Increase Productivity",
    description: "See exactly where time is spent and optimize workflows",
  },
  {
    id: "2",
    icon: CheckCircle2,
    title: "Accurate Billing",
    description: "Generate precise invoices based on tracked hours",
  },
  {
    id: "3",
    icon: CheckCircle2,
    title: "Better Planning",
    description: "Use historical data to estimate project timelines",
  },
  {
    id: "4",
    icon: CheckCircle2,
    title: "Team Transparency",
    description: "Everyone knows what everyone is working on",
  },
];

export interface HowItWorks {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  width: number;
  height: number;
  src: string;
}

export const howItWorks: HowItWorks[] = [
  {
    id: "1",
    title: "Organization Setup",
    description:
      "Create your organization profile and configure tracking settings to perfectly fit your team's workflow.",
    icon: Settings,
    width: 400,
    height: 201,
    src: "/img/organization-setups.png",
  },
  {
    id: "2",
    title: "Seamless Time Tracking",
    description:
      "Log working hours and switch between projects with a single click. Keep your focus on the task, not the timer.",
    icon: Timer,
    width: 400,
    height: 238,
    src: "/img/tracker.png",
  },
  {
    id: "3",
    title: "Analytics & Reports",
    description:
      "Gain actionable insights into your team's performance with detailed, real-time productivity reports.",
    icon: ChartNoAxesCombined,
    width: 400,
    height: 205,
    src: "/img/productivity-score.png",
  },
];
