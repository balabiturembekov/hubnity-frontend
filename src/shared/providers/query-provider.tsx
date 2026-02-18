"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren, useState } from "react";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const [query] = useState(
    () =>
      new QueryClient({
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
      }),
  );
  return (
    <QueryClientProvider client={query}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
