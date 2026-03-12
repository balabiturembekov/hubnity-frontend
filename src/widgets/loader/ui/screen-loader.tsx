import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ScreenLoaderProps {
  className?: string;
  size?: number;
}

export const ScreenLoader = ({ className, size = 64 }: ScreenLoaderProps) => {
  return (
    <div
      className={cn("w-full h-dvh flex items-center justify-center", className)}
    >
      <Loader2 size={size} className="animate-spin" />
    </div>
  );
};
