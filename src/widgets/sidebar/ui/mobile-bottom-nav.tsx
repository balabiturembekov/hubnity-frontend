"use client";

import { Bell, Clock, Home, Menu, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/entities/user";
import { UserProfileDropdown } from "@/features/user";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";

import { dashboardSidebarLinks } from "@/widgets/sidebar/consts";

const primaryLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Time",
    href: "/dashboard/tracking",
    icon: Clock,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserIcon,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();

  return (
    <div className="min-[769px]:hidden fixed bottom-10 left-2 right-6 z-50">
      <div className="bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg rounded-full flex items-center justify-between">
        {primaryLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Button
              key={link.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "flex-1 flex-col h-auto py-2 gap-1 rounded-2xl transition-transform active:scale-95 focus-visible:ring-0 focus-visible:ring-offset-0",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
              asChild
            >
              <Link href={link.href}>
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            </Button>
          );
        })}

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="flex-1 flex-col h-auto py-2 gap-1 rounded-2xl text-muted-foreground transition-transform active:scale-95 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Menu className="h-5 w-5" />
              <span className="text-[10px] font-medium">Menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh] rounded-t-3xl pt-4 pb-4 px-4 flex flex-col">
            <DrawerHeader className="text-left mb-6 px-2">
              <DrawerTitle className="text-xl font-bold">Hubnity</DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto pr-2 pb-8 scrollbar-hide">
              <nav className="flex flex-col gap-2">
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

                  if (!item.childrenLinks) {
                    return (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        key={item.id}
                        className={cn("w-full justify-start h-12 rounded-xl", {
                          "text-muted-foreground": !isActive,
                          "bg-primary/10 text-primary": isActive,
                        })}
                        asChild
                      >
                        <Link href={item.href}>
                          <Icon className="mr-3 h-5 w-5" />
                          <span className="text-base">{item.label}</span>
                        </Link>
                      </Button>
                    );
                  }

                  return (
                    <div key={item.id} className="flex flex-col gap-1 mb-2">
                      <div className="flex items-center gap-3 px-3 py-2 mt-2 text-muted-foreground font-medium">
                        <Icon className="h-5 w-5" />
                        <span className="text-sm uppercase tracking-wider">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 pl-8 relative">
                        <div className="absolute left-[20px] bottom-8 top-0 w-px bg-gray-300" />
                        {item.childrenLinks.map((link) => {
                          const isChildActive = pathname === link.href;

                          return (
                            <div key={link.id} className="relative">
                              <div className="size-[12px] border-l border-b border-gray-300  absolute -left-[12px] top-3.5 -translate-y-1/2 rounded-bl-md" />
                              <Button
                                variant={isChildActive ? "secondary" : "ghost"}
                                className={cn(
                                  "w-full justify-start h-11 rounded-xl",
                                  {
                                    "text-muted-foreground": !isChildActive,
                                    "bg-primary/10 text-primary": isChildActive,
                                  },
                                )}
                                asChild
                              >
                                <Link href={link.href}>
                                  <span className="text-[15px]">
                                    {link.label}
                                  </span>
                                </Link>
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="mt-auto pt-4 border-t px-2 flex items-center justify-between">
              <UserProfileDropdown />
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full p-2 hover:bg-accent"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
