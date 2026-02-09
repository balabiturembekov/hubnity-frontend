import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/90 py-20 text-primary-foreground sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg opacity-90 sm:text-xl">
            Join thousands of teams already using Hubnity to track their time
            and boost productivity. Start your free trial today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="w-full gap-2 sm:w-auto"
              asChild
            >
              <Link href="/register">
                Create Your Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-full border border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
