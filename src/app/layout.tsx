import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { getSiteBaseUrl } from "@/shared/lib/site-url";
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

const siteUrl = getSiteBaseUrl();
const title = "Hubnity - Time Tracking & Team Management";
const description =
  "Track time, manage projects, and boost productivity with Hubnity. Time tracking software for freelancers, agencies, and remote teams. Free trial, no credit card required.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Hubnity",
  },
  description,
  keywords: [
    "time tracking",
    "time tracker",
    "team management",
    "project management",
    "productivity",
    "timesheet",
    "billable hours",
    "invoicing",
    "remote team",
    "freelance",
    "Hubnity",
  ],
  openGraph: {
    type: "website",
    locale: "en",
    url: siteUrl,
    siteName: "Hubnity",
    title,
    description,
    images: [
      {
        url: `${siteUrl}/img/dashboard.png`,
        width: 1920,
        height: 1080,
        alt: "Hubnity time tracking dashboard with projects and productivity metrics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: siteUrl,
  },
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
