import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hubnity - Time Tracking & Team Management",
  description:
    "Track time, manage projects, and boost productivity with Hubnity. The all-in-one time tracking solution for teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.className, "antialiased")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
