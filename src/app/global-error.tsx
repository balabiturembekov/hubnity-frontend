"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    try {
      Sentry.captureException(error, {
        tags: {
          globalError: true,
          errorDigest: error.digest || "unknown",
        },
      });
    } catch (sentryError) {
      // If Sentry is not initialized or fails, log to console
      console.error("Failed to send error to Sentry:", sentryError);
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
