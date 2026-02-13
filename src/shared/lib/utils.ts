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

export const formatDurationFull = (seconds: number): string => {
  if (!Number.isFinite(seconds) || Number.isNaN(seconds) || seconds < 0) {
    return "0:00:00";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export const capitalize = (value: string) =>
  value.charAt(0) + value.slice(1).toLowerCase();
