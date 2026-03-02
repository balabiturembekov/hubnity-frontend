"use client";

import { useState } from "react";
import { Popover, PopoverContent } from "@/shared/ui/popover";
import { NotificationPopoverContent } from "@/widgets/notification/ui/notification-popover-content";
import { NotificationPopoverHeader } from "@/widgets/notification/ui/notification-popover-header";
import { NotificationTrigger } from "@/widgets/notification/ui/notification-trigger";

export const NotificationPopover = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between">
        <NotificationTrigger />
      </div>

      <PopoverContent
        className="px-0 w-[95vw] sm:w-130 ml-5 pb-0"
        onWheel={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <NotificationPopoverHeader onClose={() => setOpen(false)} />
        <NotificationPopoverContent />
      </PopoverContent>
    </Popover>
  );
};
