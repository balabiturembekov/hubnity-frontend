"use client";

import { Download, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  type ScreenshotEntity,
  useDeleteScreenshotMutation,
  useScreenshotsByTimeEntryQuery,
} from "@/entities/screenshot";
import { apiUrl } from "@/shared/config/env";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Skeleton } from "@/shared/ui/skeleton";

interface ScreenshotGalleryProps {
  timeEntryId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScreenshotGallery({
  timeEntryId,
  open,
  onOpenChange,
}: ScreenshotGalleryProps) {
  const { data: screenshots, isLoading } = useScreenshotsByTimeEntryQuery(
    timeEntryId,
    undefined,
    { enabled: open },
  );
  const { mutate: deleteScreenshot, isPending: isDeleting } =
    useDeleteScreenshotMutation();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setSelectedImage(null);
    }
  }, [open]);

  const handleDeleteClick = (screenshotId: string) => {
    setShowDeleteConfirm(screenshotId);
  };

  const handleDeleteConfirm = () => {
    if (!showDeleteConfirm) return;
    deleteScreenshot(showDeleteConfirm);
    setShowDeleteConfirm(null);
  };

  const handleDownload = (screenshot: ScreenshotEntity) => {
    if (typeof window === "undefined") return;

    try {
      const link = document.createElement("a");
      link.href = screenshot.imageUrl;
      link.download = `screenshot-${screenshot.id}.jpg`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      if (document.body) {
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          if (link.parentNode) {
            document.body.removeChild(link);
          }
        }, 100);
      }
    } catch (error) {
      console.error("Failed to download screenshot:", error);
      toast.error(
        "Failed to download screenshot. You can try right-clicking and saving the image.",
      );
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Screenshots</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          ) : !screenshots || screenshots.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No screenshots for this time entry</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {screenshots.map((screenshot) => (
                <div
                  key={screenshot.id}
                  className="relative group cursor-pointer border rounded-lg overflow-hidden"
                  onClick={() => setSelectedImage(screenshot.imageUrl)}
                >
                  <div className="aspect-video relative bg-muted">
                    <Image
                      src={`${apiUrl}${screenshot.imageUrl}`}
                      alt={`Screenshot ${new Date(screenshot.timestamp).toISOString()}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={137}
                      height={77}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(screenshot);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(screenshot.id);
                        }}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 text-xs text-muted-foreground">
                    {isMounted
                      ? new Date(screenshot.timestamp).toLocaleString()
                      : new Date(screenshot.timestamp).toISOString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedImage && isMounted && open && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="relative max-w-[90vw] max-h-[90vh] p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Image
                  src={selectedImage}
                  alt="Screenshot full size"
                  width={50}
                  height={50}
                  className="w-full h-auto max-h-[90vh] object-contain rounded"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!showDeleteConfirm}
        onOpenChange={(open) => !open && setShowDeleteConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Screenshot</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this screenshot? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
