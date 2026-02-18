"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { dashboardSidebarLinks } from "@/widgets/sidebar/consts";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUserStore();

  return (
    <div className="flex h-full w-0 min-[769px]:min-w-64 overflow-hidden flex-col border-r bg-background">
      <div className="flex min-h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">Hubnity</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {dashboardSidebarLinks.map((item) => {
          if (
            item.isAdminOnly &&
            user?.role !== "ADMIN" &&
            user?.role !== "OWNER" &&
            user?.role !== "SUPER_ADMIN"
          ) {
            return null;
          }

          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Button
              variant={isActive ? "default" : "ghost"}
              key={item.id}
              className={cn("w-full justify-start", {
                "text-muted-foreground": !isActive,
              })}
              asChild
            >
              <Link href={item.href}>
                <Icon
                // className={cn(item.color, {
                //   "text-white": isActive,
                // })}
                />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
