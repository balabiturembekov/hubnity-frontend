"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ScreenshotEntity } from "@/entities/screenshot";
import { apiUrl } from "@/shared/config/env";
import { formatDate } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export interface ScreenshotFullscreenViewerProps {
  screenshots: ScreenshotEntity[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScreenshotFullscreenViewer({
  screenshots,
  initialIndex,
  open,
  onOpenChange,
}: ScreenshotFullscreenViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i > 0 ? i - 1 : i));
      }
      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i < screenshots.length - 1 ? i + 1 : i));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, screenshots.length, onOpenChange]);

  useEffect(() => {
    if (open) {
      setCurrentIndex(
        Math.min(Math.max(0, initialIndex), screenshots.length - 1),
      );
    }
  }, [open, initialIndex, screenshots.length]);

  if (!open || screenshots.length === 0) {
    return null;
  }

  const currentScreenshot = screenshots[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === screenshots.length - 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFirst) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleBackdropClick = () => {
    onOpenChange(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="absolute left-0 top-0 h-screen w-screen bg-black/80 flex items-center justify-center z-20"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot fullscreen viewer"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          type="button"
          onClick={handleBackdropClick}
          className="text-white absolute top-4 right-4 hover:text-gray-400 transition-colors cursor-pointer"
        >
          <X />
        </button>

        <div
          onClick={handleContentClick}
          className="relative flex items-center"
        >
          <Button
            type="button"
            onClick={handlePrev}
            size="icon"
            variant="outline"
            disabled={isFirst}
            className="absolute top-1/2 -translate-y-1/2 left-4 xl:-left-14 z-10"
            aria-label="Previous screenshot"
          >
            <ChevronLeft />
          </Button>

          <div className="flex flex-col items-center gap-2">
            <Image
              src={`${apiUrl}${currentScreenshot.imageUrl}`}
              alt={currentScreenshot.imageUrl}
              width={1280}
              height={960}
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-sm text-white/90">
              {formatDate(currentScreenshot.timestamp)}
            </p>
          </div>

          <Button
            type="button"
            onClick={handleNext}
            size="icon"
            variant="outline"
            disabled={isLast}
            className="absolute top-1/2 -translate-y-1/2 right-4 xl:-right-14 z-10"
            aria-label="Next screenshot"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
