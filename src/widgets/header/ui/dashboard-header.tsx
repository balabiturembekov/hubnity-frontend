"use client";

import { Bell } from "lucide-react";
import { useCurrentUser } from "@/entities/user";
import { UserProfileDropdown } from "@/features/user";
import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { DashboardHeaderSkeleton } from "./dashboard-header-skeleton";

export const DashboardHeader = () => {
  const { data: user, isPending } = useCurrentUser();

  if (!user || isPending) return <DashboardHeaderSkeleton />;

  return (
    <TooltipProvider>
      <header className="flex min-h-16 items-center justify-between border-b px-2 md:px-6 gap-2">
        <div>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden relative rounded-full p-2 hover:bg-accent"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>

          <UserProfileDropdown className="md:hidden" />
        </div>
      </header>
    </TooltipProvider>
  );
};
