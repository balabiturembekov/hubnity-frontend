import { Loader2 } from "lucide-react";

export const ScreenLoader = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Loader2 size={64} className="animate-spin" />
    </div>
  );
};
