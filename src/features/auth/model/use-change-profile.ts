import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfileMutation, useUserStore } from "@/entities/user";
import { handleError } from "@/shared/lib/utils";
import {
  type ChangeProfileFormValues,
  changeProfileSchema,
} from "./auth.schema";

interface UseChangeProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const useChangeProfile = ({
  open,
  onOpenChange,
}: UseChangeProfileProps) => {
  const { user } = useUserStore();
  const { mutateAsync, isPending } = useUpdateProfileMutation();

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  // States for cropping - keeping them here for future restoration
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ChangeProfileFormValues>({
    resolver: zodResolver(changeProfileSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      hourlyRate: undefined,
      avatar: "",
    },
  });

  useEffect(() => {
    if (open && user) {
      reset({
        name: user.name,
        email: user.email,
        hourlyRate: user.hourlyRate || undefined,
        avatar: user.avatar || "",
      });
      setAvatarPreview(user.avatar || "");
      setCropDialogOpen(false);
      setImageToCrop("");
    }
  }, [open, user, reset]);

  const onSubmit = async (data: ChangeProfileFormValues) => {
    try {
      await mutateAsync({
        name: data.name,
        email: data.email,
        hourlyRate: data.hourlyRate,
        avatar: data.avatar || null,
      });

      toast.success("Profile updated successfully");
      onOpenChange(false);
    } catch (error) {
      console.error(handleError(error, "Failed to change profile"));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("Image size must be less than 50MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === "string") {
        setValue("avatar", reader.result, { shouldDirty: true });
        setAvatarPreview(reader.result);

        // setImageToCrop(reader.result);
        // setCropDialogOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setValue("avatar", "", { shouldDirty: true });
    setAvatarPreview("");
    const fileInput = document.getElementById("avatar") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setValue("avatar", croppedImage, { shouldDirty: true });
    setAvatarPreview(croppedImage);
    setImageToCrop("");
    setCropDialogOpen(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    handleClose,
    user,
    avatarPreview,
    handleAvatarChange,
    handleRemoveAvatar,
    cropDialogOpen,
    setCropDialogOpen,
    imageToCrop,
    handleCropComplete,
  };
};
