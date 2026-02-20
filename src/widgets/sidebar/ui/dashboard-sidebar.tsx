"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCurrentUser } from "@/entities/user";
import { UserProfileDropdown } from "@/features/user";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { dashboardSidebarLinks } from "@/widgets/sidebar/consts";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const [openLinks, setOpenLinks] = useState<string[]>([]);

  const handleOpenLink = (link: string) => {
    if (!openLinks.includes(link)) {
      setOpenLinks((openLinks) => [...openLinks, link]);
    } else {
      const filtered = openLinks.filter((openLink) => openLink !== link);
      setOpenLinks(filtered);
    }
  };

  return (
    <div className="flex h-full w-0 min-[769px]:min-w-64 overflow-hidden flex-col border-r bg-background">
      <div className="flex min-h-16 items-center border-b px-6">
        <Link href="/" className="text-xl font-bold">
          Hubnity
        </Link>
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

          if (!item.childrenLinks) {
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
                  <Icon />
                  {item.label}
                </Link>
              </Button>
            );
          } else {
            return (
              <div key={item.id}>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-between pl-3 pr-0", {
                    "text-muted-foreground": !pathname.includes(item.href),
                  })}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleOpenLink(item.href)}
                    className="w-full flex items-center gap-2"
                  >
                    <Icon />
                    {item.label}
                  </Link>

                  <div
                    className="p-2 hover:text-gray-900 transition-colors"
                    onClick={() => handleOpenLink(item.href)}
                  >
                    <ChevronLeft
                      className={cn("transition-transform", {
                        "-rotate-90": openLinks.includes(item.href),
                      })}
                    />
                  </div>
                </Button>

                <AnimatePresence>
                  {openLinks.includes(item.href) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{
                        duration: 0.1,
                      }}
                      className="overflow-hidden relative flex gap-3 ml-4.5 mt-1"
                    >
                      <div className="absolute left-0 bottom-6 top-0 w-px bg-gray-300" />
                      <div className="flex flex-col gap-1 pl-3 w-full">
                        {item.childrenLinks.map((link) => {
                          const isChildActive = pathname === link.href;

                          return (
                            <div key={link.id} className="relative">
                              <div className="size-[13px] border-l border-b border-gray-300  absolute -left-[13px] top-3.5 -translate-y-1/2 rounded-bl-full" />
                              <Button
                                variant={isChildActive ? "default" : "ghost"}
                                className={cn("w-full justify-between z-10", {
                                  "text-muted-foreground": !isChildActive,
                                })}
                                asChild
                              >
                                <Link href={link.href}>{link.label}</Link>
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
        })}
      </nav>

      <div className="p-4 flex items-center gap-3 justify-between">
        <UserProfileDropdown />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full p-2 hover:bg-accent"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
