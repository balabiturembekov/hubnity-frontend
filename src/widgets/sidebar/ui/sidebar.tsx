"use client";

import {
  Activity,
  BarChart3,
  FileText,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/entities/user";
import { cn } from "@/shared/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Time Tracking", href: "/tracking", icon: BarChart3 },
  { name: "Employees", href: "/admin/employees", icon: Users, adminOnly: true },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FileText,
    adminOnly: true,
  },
  { name: "Reports", href: "/admin/reports", icon: BarChart3, adminOnly: true },
  { name: "Time & Activity", href: "/admin/team-activity", icon: Activity },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUserStore();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">Hubnity</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          // Hide admin-only items for non-admin users
          if (
            item.adminOnly &&
            user?.role !== "admin" &&
            user?.role !== "OWNER" &&
            user?.role !== "SUPER_ADMIN"
          ) {
            return null;
          }

          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
