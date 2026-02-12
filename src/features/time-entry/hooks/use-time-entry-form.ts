import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  type TimeEntryEntity,
  useUpdateTimeEntryMutation,
} from "@/entities/time-entry";
import { handleError } from "@/shared/lib/utils";

const timeEntrySchema = z.object({
  projectId: z.string().optional(),
  description: z.string().optional(),
  duration: z.string().min(1, "Duration is required"),
});

type TimeEntryFormValues = z.infer<typeof timeEntrySchema>;

interface UseTimeEntryFormProps {
  entry: TimeEntryEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const parseDuration = (durationStr: string): number | null => {
  const trimmed = durationStr.trim();

  if (!trimmed) {
    return null;
  }

  // Try "2h 30m" format
  const hourMinMatch = trimmed.match(/(\d+)h\s*(\d+)m?/i);
  if (hourMinMatch) {
    const hours = parseInt(hourMinMatch[1], 10);
    const minutes = parseInt(hourMinMatch[2], 10);
    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes) ||
      hours < 0 ||
      minutes < 0 ||
      minutes >= 60
    ) {
      return null;
    }
    return hours * 3600 + minutes * 60;
  }

  // Try "2.5h" or "2h" format
  const hourMatch = trimmed.match(/([\d.]+)h?/i);
  if (hourMatch) {
    const hours = parseFloat(hourMatch[1]);
    if (Number.isNaN(hours) || !Number.isFinite(hours) || hours < 0) {
      return null;
    }
    const seconds = Math.round(hours * 3600);
    if (seconds > 2147483647) {
      return null;
    }
    return seconds;
  }

  // Try "150m" format
  const minMatch = trimmed.match(/(\d+)m/i);
  if (minMatch) {
    const minutes = parseInt(minMatch[1], 10);
    if (Number.isNaN(minutes) || minutes < 0) {
      return null;
    }
    const seconds = minutes * 60;
    if (seconds > 2147483647) {
      return null;
    }
    return seconds;
  }

  return null;
};

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const useTimeEntryForm = ({
  entry,
  open,
  onOpenChange,
}: UseTimeEntryFormProps) => {
  const { mutateAsync, isPending } = useUpdateTimeEntryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TimeEntryFormValues>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      projectId: "none",
      description: "",
      duration: "",
    },
  });

  useEffect(() => {
    if (open && entry) {
      const projectId = entry.projectId || "none";
      reset({
        projectId,
        description: entry.description || "",
        duration: formatDuration(entry.duration),
      });
    } else {
      reset({
        projectId: "none",
        description: "",
        duration: "",
      });
    }
  }, [entry, open, reset]);

  const onSubmit = async (data: TimeEntryFormValues) => {
    if (!entry) return;

    const duration = parseDuration(data.duration);
    if (duration === null) {
      toast.error(
        'Please enter duration in format: "2h 30m", "2.5h", or "150m"',
      );
      return;
    }

    if (duration <= 0) {
      toast.error("Duration must be greater than zero");
      return;
    }

    if (duration > 2147483647) {
      toast.error("Duration exceeds maximum allowed value (68+ years)");
      return;
    }

    try {
      await mutateAsync({
        id: entry.id,
        data: {
          duration,
          projectId:
            data.projectId && data.projectId !== "none" ? data.projectId : null,
          description: data.description || undefined,
        },
      });
      toast.success("Time entry updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(handleError(error, "Failed to update time entry"));
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  };
};
