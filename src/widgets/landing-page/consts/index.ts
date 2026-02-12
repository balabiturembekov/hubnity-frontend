import {
  BarChart3,
  Camera,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  type LucideIcon,
  Play,
  Settings,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

type StatType = {
  id: string;
  value: string;
  label: string;
};

export const stats: StatType[] = [
  { id: "1", value: "99.9%", label: "Uptime" },
  { id: "2", value: "10K+", label: "Active Users" },
  { id: "3", value: "1M+", label: "Hours Tracked" },
  { id: "4", value: "24/7", label: "Support" },
];

type FeatureType = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
};

export const features: FeatureType[] = [
  {
    id: "1",
    icon: Clock,
    title: "Precise Time Tracking",
    description:
      "Track every minute with our intuitive timer. Start, pause, and resume with keyboard shortcuts for maximum efficiency.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "2",
    icon: Users,
    title: "Team Management",
    description:
      "Manage your entire team from one dashboard. Assign projects, set hourly rates, and monitor productivity in real-time.",
    color: "bg-green-500/10 text-green-600",
  },
  {
    id: "3",
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Get detailed insights with beautiful charts and reports. Export data to CSV for further analysis.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "4",
    icon: Camera,
    title: "Automatic Screenshots",
    description:
      "Optional automatic screenshot capture to track work activity. Fully configurable intervals and privacy controls.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "5",
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Your data is protected with JWT authentication, encrypted storage, and role-based access control.",
    color: "bg-red-500/10 text-red-600",
  },
  {
    id: "6",
    icon: Zap,
    title: "Real-time Sync",
    description:
      "Live updates across all devices. See team activity as it happens with WebSocket and SSE technology.",
    color: "bg-yellow-500/10 text-yellow-600",
  },
  {
    id: "7",
    icon: FileText,
    title: "Project Organization",
    description:
      "Organize work by projects with budgets, clients, and status time-entry. Keep everything in one place.",
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    id: "8",
    icon: TrendingUp,
    title: "Performance Insights",
    description:
      "Track productivity trends, identify bottlenecks, and make data-driven decisions with comprehensive reports.",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    id: "9",
    icon: Globe,
    title: "Multi-tenant Architecture",
    description:
      "Perfect for agencies and companies. Each organization has isolated data with custom settings.",
    color: "bg-cyan-500/10 text-cyan-600",
  },
];

type BenefitType = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const benefits: BenefitType[] = [
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

type HowItWorksType = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const howItWorks: HowItWorksType[] = [
  {
    id: "1",
    title: "Sign Up",
    description: "Create your account and set up your company in minutes",
    icon: Settings,
  },
  {
    id: "2",
    title: "Invite Team",
    description: "Add team members and assign them to projects",
    icon: Users,
  },
  {
    id: "3",
    title: "Start Tracking",
    description: "Begin time-entry time with our simple, intuitive interface",
    icon: Play,
  },
  {
    id: "4",
    title: "Analyze & Improve",
    description: "Review reports and insights to optimize your workflow",
    icon: BarChart3,
  },
];
