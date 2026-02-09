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
