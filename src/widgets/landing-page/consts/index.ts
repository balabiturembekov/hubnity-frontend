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
    title: "User-Friendly Interface",
    description:
      "Designed with simplicity in mind, our platform is incredibly user-friendly, making it easy to navigate and use.",
    imageUrl: "/img/summaries-screenshot.png",
    imageAlt: "Summaries Illustration",
    className: "col-span-1 xl:col-span-2 2xl:col-span-3",
    imageClassName: "-right-10",
  },
  {
    id: "2",
    icon: UserRound,
    title: "Secure & Reliable",
    description:
      "Rest assured, your data is protected with the highest level of security measures. We prioritize your privacy.",
    imageUrl: "/img/summaries-screenshot.png",
    imageAlt: "Summaries Illustration",
    className: "xl:col-span-1 2xl:col-span-2",
    imageClassName: "left-1/2 -translate-x-1/2",
  },
  {
    id: "3",
    icon: UserRound,
    title: "24/7 Support",
    description:
      "Our dedicated support team is always available to assist you, no matter the time whether you have a question.",
    imageUrl: "/img/summaries-screenshot.png",
    imageAlt: "Summaries Illustration",
    className: "xl:col-span-1 2xl:col-span-2",
    imageClassName: " left-1/2 -translate-x-1/2",
  },
  {
    id: "4",
    icon: UserRound,
    title: "Scalable for team",
    description:
      "Our platform is thoughtfully engineering to grow alongside your business, offering flexible.",
    imageUrl: "/img/summaries-screenshot.png",
    imageAlt: "Summaries Illustration",
    className: "xl:col-span-2 2xl:col-span-3",
    imageClassName: "-left-10",
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
