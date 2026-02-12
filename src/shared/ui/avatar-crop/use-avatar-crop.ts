import { useCallback, useState } from "react";
import type { Area, Point } from "react-easy-crop";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";

interface UseAvatarCropProps {
  imageSrc: string;
  onUtilitiesCropComplete: (croppedImage: string) => void;
  onOpenChange: (open: boolean) => void;
}

// Create image from blob and return as canvas
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });
}

// Get cropped image
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Calculate scale to ensure we crop the correct area
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Set canvas size to cropped area
  canvas.width = pixelCrop.width * scaleX;
  canvas.height = pixelCrop.height * scaleY;

  // Draw cropped image
  ctx.drawImage(
    image,
    pixelCrop.x * scaleX,
    pixelCrop.y * scaleY,
    pixelCrop.width * scaleX,
    pixelCrop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  // Convert to base64 with compression (quality 0.9 for good quality/size balance)
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result as string));
        reader.addEventListener("error", (error) => reject(error));
        reader.readAsDataURL(blob);
      },
      "image/jpeg",
      0.9,
    );
  });
}

export const useAvatarCrop = ({
  imageSrc,
  onUtilitiesCropComplete,
  onOpenChange,
}: UseAvatarCropProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = useCallback((crop: Point) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onUtilitiesCropComplete(croppedImage);
      onOpenChange(false);
    } catch (error) {
      console.error(handleError(error, "Failed to crop image"));
      toast.error("Failed to crop image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
    onOpenChange(open);
  };

  return {
    crop,
    zoom,
    isProcessing,
    croppedAreaPixels,
    onCropChange,
    onZoomChange,
    onCropCompleteCallback,
    handleSave,
    handleClose,
    setZoom,
  };
};
