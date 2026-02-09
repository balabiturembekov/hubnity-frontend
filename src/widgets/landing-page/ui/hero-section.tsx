import { ArrowRight, Play, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm shadow-sm">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-gray-700">
              New: Real-time team activity tracking
            </span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Time Tracking That
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Works for You
            </span>
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
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>
    </section>
  );
};
