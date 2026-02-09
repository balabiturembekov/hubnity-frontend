"use client";

import { Toaster } from "sonner";
import { ErrorBoundary } from "@/widgets/error-boundary";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log global errors
        console.error("Global error boundary caught:", error, errorInfo);
        // You can send to error reporting service here
        // Example: logErrorToService(error, errorInfo);
      }}
    >
      {children}
      <Toaster position="top-right" richColors />
    </ErrorBoundary>
  );
}
