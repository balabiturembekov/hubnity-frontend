"use client";

import { X } from "lucide-react";
import { PopoverHeader, PopoverTitle } from "@/shared/ui/popover";

interface NotificationPopoverHeaderProps {
  onClose?: () => void;
}

export const NotificationPopoverHeader = ({
  onClose,
}: NotificationPopoverHeaderProps) => (
  <PopoverHeader className="flex flex-row items-center justify-between border-b px-5 pb-4">
    <PopoverTitle className="text-lg">Notifications</PopoverTitle>
    <button
      type="button"
      onClick={onClose}
      className="text-gray-400 hover:text-muted-foreground transition-colors cursor-pointer"
      aria-label="Close"
    >
      <X strokeWidth={1.5} />
    </button>
  </PopoverHeader>
);
