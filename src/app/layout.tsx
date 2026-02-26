import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/shared/lib/utils";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { QueryProvider } from "@/shared/providers/query-provider";
import { TooltipProvider } from "@/shared/ui/tooltip";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hubnity - Time Tracking & Team Management",
  description:
    "Track time, manage projects, and boost productivity with Hubnity. The all-in-one time time-entry solution for teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.className, "antialiased relative")}>
        <QueryProvider>
          <TooltipProvider>
            <NextTopLoader color="var(--primary)" height={3} easing="ease" />
            {children}
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
