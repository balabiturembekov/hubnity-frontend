"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useOrganizationRole } from "@/entities/organization";
import { UserProfileDropdown } from "@/features/user";
import { useGetOrganizationId } from "@/shared/hooks/use-get-organization-id";
import { buildOrgHref, cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { NotificationPopover } from "@/widgets/notification";
import { dashboardSidebarLinks } from "@/widgets/sidebar/consts";
import { TimerPopover } from "@/widgets/timer";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [openLinks, setOpenLinks] = useState<string[]>([]);
  const isUser = useOrganizationRole().isUser;
  const orgId = useGetOrganizationId();

  const handleOpenLink = (link: string) => {
    if (!openLinks.includes(link)) {
      setOpenLinks((openLinks) => [...openLinks, link]);
    } else {
      const filtered = openLinks.filter((openLink) => openLink !== link);
      setOpenLinks(filtered);
    }
  };

  useEffect(() => {
    const link = dashboardSidebarLinks.find(
      (l) =>
        l.childrenLinks && pathname.startsWith(buildOrgHref(orgId, l.path)),
    );

    if (!link) return;

    setOpenLinks((prevState) =>
      prevState.includes(link.id) ? prevState : [...prevState, link.id],
    );
  }, [pathname, orgId]);

  return (
    <div className="hidden min-[769px]:flex h-full w-0 min-[769px]:min-w-64 overflow-hidden flex-col border-r bg-background">
      <div className="flex min-h-16 items-center border-b px-6">
        <Link href="/" className="text-xl font-bold">
          <Image
            src="/img/hubnity-logo-without-descr.png"
            alt="Logo"
            width={110}
            height={25}
          />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        <TimerPopover />

        <Separator className="my-2" />

        {dashboardSidebarLinks.map((item) => {
          if (item.isAdminOnly && isUser) {
            return null;
          }

          const itemHref = buildOrgHref(orgId, item.path);
          const isActive = pathname === itemHref;
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
                <Link href={itemHref}>
                  <Icon />
                  {item.label}
                </Link>
              </Button>
            );
          } else {
            const isParentOpen = openLinks.includes(item.id);
            const firstNonAdminChild = item.childrenLinks.find(
              (link) => !link.isAdminOnly,
            );

            return (
              <div key={item.id}>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-between pl-3 pr-0", {
                    "text-muted-foreground": !pathname.startsWith(itemHref),
                  })}
                >
                  <Link
                    href={
                      !isUser
                        ? itemHref
                        : firstNonAdminChild?.path
                          ? buildOrgHref(orgId, firstNonAdminChild.path)
                          : itemHref
                    }
                    onClick={() => handleOpenLink(item.id)}
                    className="w-full flex items-center gap-2"
                  >
                    <Icon />
                    {item.label}
                  </Link>

                  <div
                    className="p-2 hover:text-gray-900 transition-colors"
                    onClick={() => handleOpenLink(item.id)}
                  >
                    <ChevronLeft
                      className={cn("transition-transform", {
                        "-rotate-90": isParentOpen,
                      })}
                    />
                  </div>
                </Button>

                <AnimatePresence>
                  {isParentOpen && (
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
                          const childHref = buildOrgHref(orgId, link.path);
                          const isChildActive = pathname === childHref;

                          if (link.isAdminOnly && isUser) {
                            return null;
                          }

                          return (
                            <div key={link.id} className="relative">
                              <div className="size-3.25 border-l border-b border-gray-300  absolute -left-3.25 top-3.5 -translate-y-1/2 rounded-bl-full" />
                              <Button
                                variant={isChildActive ? "default" : "ghost"}
                                className={cn("w-full justify-between z-10", {
                                  "text-muted-foreground": !isChildActive,
                                })}
                                asChild
                              >
                                <Link href={childHref}>{link.label}</Link>
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
        <NotificationPopover />
      </div>
    </div>
  );
}
