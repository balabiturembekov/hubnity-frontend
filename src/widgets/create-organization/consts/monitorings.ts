import {
  Activity,
  CalendarCheck,
  Camera,
  Clock,
  Coffee,
  FileText,
  Globe,
  type LucideIcon,
  MapPin,
  Palmtree,
  Receipt,
  Wallet,
} from "lucide-react";

export interface Monitoring {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  isPopular: boolean;
}

export const monitorings: Monitoring[] = [
  {
    id: "1",
    icon: Clock,
    title: "Time tracking",
    description: "Track time spent on tasks and campaigns",
    isPopular: true,
  },
  {
    id: "2",
    icon: CalendarCheck,
    title: "Attendance tracking",
    description: "Monitor employee attendance, shifts, and schedules",
    isPopular: true,
  },
  {
    id: "3",
    icon: Activity,
    title: "Activity levels",
    description: "Measure keyboard and mouse activity percentages",
    isPopular: false,
  },
  {
    id: "4",
    icon: Camera,
    title: "Screenshots",
    description: "Capture periodic screenshots of employee workstations",
    isPopular: false,
  },
  {
    id: "5",
    icon: Globe,
    title: "App & URL tracking",
    description: "Record which applications and websites are used",
    isPopular: false,
  },
  {
    id: "6",
    icon: Coffee,
    title: "Idle time detection",
    description: "Automatically detect and manage periods of inactivity",
    isPopular: true,
  },
  {
    id: "7",
    icon: Wallet,
    title: "Project budgeting",
    description: "Track time and costs against project budgets",
    isPopular: false,
  },
  {
    id: "8",
    icon: MapPin,
    title: "Location tracking",
    description: "Track GPS location for mobile or field workers",
    isPopular: false,
  },
  {
    id: "9",
    icon: Receipt,
    title: "Expense tracking",
    description: "Log and manage employee expenses and reimbursements",
    isPopular: false,
  },
  {
    id: "10",
    icon: Palmtree,
    title: "Time off management",
    description: "Manage vacation, sick leave, and holidays",
    isPopular: true,
  },
  {
    id: "11",
    icon: FileText,
    title: "Invoice generation",
    description: "Create invoices based on tracked billable hours",
    isPopular: false,
  },
];
