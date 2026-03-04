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
  UserRound,
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
    description: "Inside 100+ tools via browser extensions data to Hubnity",
    color: "bg-red-500/10 text-red-600",
  },
  {
    id: "6",
    icon: Users,
    title: "Report & Analysis",
    description:
      "See exactly how your team spends time on their work with Hubnity",
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

export interface BenefitCardItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
  imageClassName?: string;
}

export const benefitCards: BenefitCardItem[] = [
  {
    id: "1",
    icon: UserRound,
    title: "Everything at a Glance",
    description:
      "Navigate effortlessly through your workday. Our clean interface puts your most important metrics, from hours tracked to goal progress, right at your fingertips.",
    imageUrl: "/img/dashboard.png",
    imageAlt: "Dashboard Illustration",
    className: "col-span-1 xl:col-span-2 2xl:col-span-3",
    imageClassName: "-right-10 -bottom-5",
  },
  {
    id: "2",
    icon: UserRound,
    title: "Your Data is Protected",
    description:
      "Keep your workspace secure with enterprise-grade encryption. Manage access safely and ensure your company's data stays protected at all times.",
    imageUrl: "/img/login.png",
    imageAlt: "Login Illustration",
    className: "xl:col-span-1 2xl:col-span-2",
    imageClassName:
      "left-1/2 -translate-x-1/2 top-auto -bottom-5 sm:-bottom-15 lg:-bottom-30 xl:-bottom-5",
  },
  {
    id: "3",
    icon: UserRound,
    title: "Complete Team Visibility",
    description:
      "Get a clear view of your team's daily operations. Easily monitor activity logs, manage roles, and stay aligned with everyone's progress.",
    imageUrl: "/img/team-activity.png",
    imageAlt: "Team Activity Illustration",
    className: "xl:col-span-1 2xl:col-span-2",
    imageClassName:
      "left-1/2 -translate-x-1/2 top-auto -bottom-5 sm:-bottom-15 lg:-bottom-30 xl:-bottom-5",
  },
  {
    id: "4",
    icon: UserRound,
    title: "Personalized Insights",
    description:
      "Empower your team with individual performance stats. Users can track their own tracked time, analyze productivity trends, and manage personal settings.",
    imageUrl: "/img/profile.png",
    imageAlt: "Profile Illustration",
    className: "xl:col-span-2 2xl:col-span-3",
    imageClassName: "-right-10 -bottom-5",
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

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Alexey Smirnov",
    role: "Engineering Manager",
    company: "TechFlow Solutions",
    rating: 5,
    review:
      "This app has completely transformed how our development team tracks billable hours. The browser extension is incredibly seamless, and the timesheet generation saves me at least 3 hours every Friday.",
  },
  {
    id: "2",
    name: "Maria Ivanova",
    role: "Freelance Designer",
    company: "Creative Minds",
    rating: 5,
    review:
      "As a freelancer juggling multiple clients, accurate billing is everything. The ability to switch between projects with a single click and automatically generate professional invoices has been a game changer for my business. Highly recommended!",
  },
  {
    id: "3",
    name: "David Chen",
    role: "Operations Director",
    company: "Global Logistics",
    rating: 5,
    review:
      "Great tool for team transparency. It's much easier to see where our operational bottlenecks are now. The reporting dashboard is highly customizable and visualizes our resource allocation beautifully.",
  },
  {
    id: "4",
    name: "Elena Rostova",
    role: "Product Owner",
    company: "SaaS Builders",
    rating: 5,
    review:
      "Finally, a time tracker that my team actually doesn't hate using. The auto-tracking feature takes away the mental load of remembering to start and stop timers. Our recorded hours have gone up by 15% simply because we are no longer forgetting to log them.",
  },
  {
    id: "5",
    name: "Michael Peterson",
    role: "Agency Owner",
    company: "Peterson Digital",
    rating: 5,
    review:
      "The integrations are fantastic. It plugs directly into our project management tools, meaning we don't have to duplicate data entry. The customer support team was also incredibly helpful during our initial onboarding.",
  },
  {
    id: "6",
    name: "Sarah Williams",
    role: "HR Manager",
    company: "FinCorp Ltd",
    rating: 5,
    review:
      "We use this primarily for attendance and overtime tracking. The accuracy and ease of use are exactly what our corporate environment needed. It's robust enough for management but simple enough for daily employee use.",
  },
];

export interface Question {
  id: string;
  question: string;
  answer: string;
}

export const questions: Question[] = [
  {
    id: "1",
    question: "What is Hubnity, and who is it for?",
    answer:
      "Hubnity is a comprehensive time tracking and productivity platform designed for freelancers, agencies, and distributed teams to monitor work hours, track billable time, and generate seamless reports.",
  },
  {
    id: "2",
    question: "How does the auto-tracking feature work?",
    answer:
      "Our auto-tracking feature runs quietly in the background (via desktop app or browser extension), logging the apps and websites you use. It reconstructs your daily timeline so you can easily assign time blocks to specific tasks later.",
  },
  {
    id: "3",
    question: "Can I use Trackflow for client billing and invoicing?",
    answer:
      "Absolutely. You can mark specific projects and tasks as billable, assign custom hourly rates, and generate polished invoices directly from your tracked hours to send to clients.",
  },
  {
    id: "4",
    question: "What happens if I forget to start or stop the timer?",
    answer:
      "No problem! You can manually add, edit, or delete time entries after the fact. If you have auto-tracking enabled, you can also use your daily activity timeline to accurately fill in missing gaps.",
  },
  {
    id: "5",
    question: "Does Hubnity integrate with tools my team already uses?",
    answer:
      "Yes, Hubnity seamlessly integrates with over 50 popular project management and communication tools, including Jira, Trello, Asana, Slack, and Notion.",
  },
  {
    id: "6",
    question: "Is it suitable for remote and distributed teams?",
    answer:
      "Yes! Hubnity is built with remote teams in mind. It provides managers with clear visibility into team workloads and attendance, helping prevent burnout while maintaining accountability across different time zones.",
  },
  {
    id: "7",
    question: "Can I track time on my mobile phone?",
    answer:
      "Yes, we have dedicated mobile apps for both iOS and Android. You can start and stop timers, view your daily stats, and manage tasks while on the go.",
  },
  {
    id: "8",
    question: "How secure is my data?",
    answer:
      "We take data security very seriously. All user data is encrypted at rest and in transit. Our infrastructure is hosted on enterprise-grade cloud providers and is fully GDPR compliant.",
  },
  {
    id: "9",
    question: "How do timesheets and reporting work?",
    answer:
      "Hubnity automatically aggregates your tracked time into visual dashboards and timesheets. You can filter data by user, project, or date range, and export reports to CSV or PDF for payroll processing.",
  },
  {
    id: "10",
    question: "Is there a free trial, and do I need a credit card to sign up?",
    answer:
      "We offer a full-featured 14-day free trial on all paid plans, and you do not need a credit card to sign up. After the trial ends, you can choose to upgrade or switch to our basic free tier.",
  },
];
