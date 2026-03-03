import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { cn } from "@/shared/lib/utils";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { QueryProvider } from "@/shared/providers/query-provider";
import { TooltipProvider } from "@/shared/ui/tooltip";

const manRope = Manrope({
  subsets: ["latin"],
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "Hubnity - Time Tracking & Team Management",
  description:
    "Track time, manage campaigns, and boost productivity with Hubnity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          manRope.className,
          "antialiased relative overflow-x-hidden",
        )}
      >
        <QueryProvider>
          <TooltipProvider>
            <NextTopLoader
              color="var(--primary)"
              height={3}
              easing="ease"
              showSpinner={false}
            />
            {children}
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
