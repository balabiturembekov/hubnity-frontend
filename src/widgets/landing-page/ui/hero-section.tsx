"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/20 via-primary/5 to-primary/15 mask-[linear-gradient(to_top,transparent_0%,black_20%)] mask-size-[100%_100%] mask-no-repeat">
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm shadow-sm">
            <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
            <span className="text-gray-700">
              New: Real-time team activity tracking
            </span>
          </div>
          <h1 className="relative mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Time Tracking That
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              className="bg-[linear-gradient(to_right,var(--color-primary),#1449e667,var(--color-primary))] bg-size-[200%_auto] bg-clip-text text-transparent"
            >
              {" "}
              Works for You
            </motion.span>
            <div className="absolute right-0 -top-30 pointer-events-none -z-10 h-100 w-100 rounded-full bg-linear-to-br from-primary/40 via-purple-400/30 to-indigo-500/20 opacity-90 blur-[100px]" />
          </h1>
          <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
            The all-in-one solution for teams who want to track time, manage
            projects, and boost productivity. Simple, powerful, and secure.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
              <Link href="/register">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <Link href="/login">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required • 21-day free trial
          </p>
          <Image
            src="/img/dashboard-illustration.png"
            alt="Dashboard Preview"
            width={1920}
            height={1200}
            priority
            unoptimized
            className="mt-12 w-full h-auto object-cover rounded-lg sm:rounded-xl rounded-b-none shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};
