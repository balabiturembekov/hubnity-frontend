import { QueryClient } from "@tanstack/react-query";
import { useTopLoader } from "nextjs-toploader";
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
      onMutate: () => {
        const { start } = useTopLoader();
        start();
      },
      onSettled: () => {
        const { done } = useTopLoader();
        done();
      },
    },
  },
});
