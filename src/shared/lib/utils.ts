import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (
  error: unknown,
  fallbackMessage?: string,
): string => {
  if (error instanceof AxiosError) {
    console.error("[Axios error]", error.response?.data || error.message);

    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    return error.message;
  }

  if (error instanceof Error) {
    console.error("[Generic error]", error.message);
    return error.message;
  }

  console.error("[Unknown error]", error);
  return String(fallbackMessage);
};

export const formatDurationFull = (hours: number): string => {
  if (!Number.isFinite(hours) || Number.isNaN(hours) || hours < 0) {
    return "0:00:00";
  }

  const totalSeconds = Math.floor(hours * 3600);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};
