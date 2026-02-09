"use client";

import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Page error:", error);
    }

    // Send error to Sentry
    try {
      Sentry.captureException(error, {
        tags: {
          errorPage: true,
          errorDigest: error.digest || "unknown",
        },
      });
    } catch (sentryError) {
      // If Sentry is not initialized or fails, log to console
      console.error("Failed to send error to Sentry:", sentryError);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle>Something went wrong</CardTitle>
          </div>
          <CardDescription>
            An unexpected error occurred. Please try refreshing the page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-destructive/10 p-3">
              <p className="text-sm font-medium text-destructive">
                Error: {error.message}
              </p>
              {error.digest && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              )}
              {error.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-muted-foreground">
                    Stack trace
                  </summary>
                  <pre className="mt-2 overflow-auto text-xs">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button onClick={reset} variant="default" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
