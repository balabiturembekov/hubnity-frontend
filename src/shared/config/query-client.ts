import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
      onError: (e) => {
        toast.error(handleError(e));
      },
    },
  },
});
