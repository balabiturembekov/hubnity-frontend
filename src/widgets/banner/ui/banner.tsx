"use client";

import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

type BannerVariantType = "default" | "blue" | "success" | "warning" | "danger";

interface BannerProps {
  variant?: BannerVariantType;
}

export const Banner = ({ variant = "default" }: BannerProps) => {
  const [open, setOpen] = useState(true);
  const Icon =
    variant === "success"
      ? CircleCheck
      : variant === "warning"
        ? TriangleAlert
        : variant === "danger"
          ? CircleAlert
          : Info;

  return (
    <div
      className={cn(
        "min-h-44 w-full flex items-start justify-between border border-gray-300 rounded-sm bg-gray-100 p-4 relative @container",
        {
          hidden: !open,
          "bg-blue-50 border-blue-200": variant === "blue",
          "bg-green-50 border-green-300": variant === "success",
          "bg-yellow-50 border-yellow-300": variant === "warning",
          "bg-red-50 border-red-300": variant === "danger",
        },
      )}
    >
      <Image
        src="https://server-assets.hubstaff.com/2b393f6ce9/vite/insights_banner_workforce-BkPOo9dL.svg"
        alt="Banner illustration"
        width={222}
        height={159}
        className="absolute bottom-0 right-15 hidden @[768px]:block"
      />
      <div className="flex gap-5 h-full">
        <div className="hidden sm:block size-4">
          <Icon
            className={cn("fill-gray-600 text-gray-100", {
              "fill-blue-500 text-blue-50": variant === "blue",
              "fill-green-600 text-green-50": variant === "success",
              "fill-yellow-500 text-yellow-50": variant === "warning",
              "fill-red-500 text-red-50": variant === "danger",
            })}
          />
        </div>

        <div className="flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-1 @[768px]:max-w-2/3 @[1024px]:max-w-3/4 @[1280px]:max-w-5/6 text-pretty">
            <h3 className="font-medium text-gray-800">
              Introducing Insights workforce analytics
            </h3>
            <p className="text-sm font-light text-muted-foreground">
              Reduce the stress of managing a remote team and gain visibility
              into what's going on in the workday. Uncover trends, benchmarks,
              and opportunities to coach your team to the next level.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-1 md:gap-2">
            <Button size="sm" variant="outline" className="w-full sm:w-fit">
              Try it now
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-full sm:w-fit hover:bg-gray-200"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
      >
        <X size={18} />
      </button>
    </div>
  );
};
export default Banner;
