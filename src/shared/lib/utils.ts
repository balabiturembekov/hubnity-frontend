import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with conflict resolution
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string with resolved conflicts
 * @example
 * cn("px-2 py-1", "px-4") // => "py-1 px-4"
 * cn("text-red-500", condition && "text-blue-500") // => "text-blue-500" if condition is true
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts error message from various error types
 * @param error - Error object (AxiosError, Error, or unknown)
 * @param fallbackMessage - Message to return if error cannot be parsed
 * @returns User-friendly error message string
 * @example
 * handleError(new Error("Failed"), "Something went wrong") // => "Failed"
 * handleError(axiosError) // => Response message from server
 */
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

/**
 * Formats duration in seconds to HH:MM:SS format
 * @param seconds - Duration in seconds
 * @returns Formatted time string in HH:MM:SS format
 * @example
 * formatDurationFull(3661) // => "1:01:01"
 * formatDurationFull(7200) // => "2:00:00"
 * formatDurationFull(-10) // => "0:00:00"
 * formatDurationFull(NaN) // => "0:00:00"
 */
export const formatDurationFull = (seconds: number): string => {
  if (!Number.isFinite(seconds) || Number.isNaN(seconds) || seconds < 0) {
    return "0:00:00";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

/**
 * Returns a time-appropriate greeting based on current hour
 * @returns Greeting string
 * @example
 * greeting() // => "Good morning" (if before 12:00)
 * greeting() // => "Good afternoon" (if between 12:00-18:00)
 * greeting() // => "Good evening" (if after 18:00)
 */
export const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

/**
 * Capitalizes the first letter and lowercases the rest
 * @param value - String to capitalize
 * @returns Capitalized string
 * @example
 * capitalize("hELLO") // => "Hello"
 * capitalize("WORLD") // => "World"
 */
export const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

/**
 * Format seconds into a human-readable hours string
 * @param seconds - Duration in seconds
 * @returns Formatted string like "2.5" for 2.5 hours
 * @example
 * formatHours(3600) // => "1.00"
 * formatHours(7200) // => "2.00"
 * formatHours(0) // => "0.00"
 */
export function formatHours(seconds: number | undefined): string {
  if (
    seconds === undefined ||
    !Number.isFinite(seconds) ||
    Number.isNaN(seconds)
  ) {
    return "0.00";
  }

  const hours = seconds / 3600;
  return hours.toFixed(2);
}
