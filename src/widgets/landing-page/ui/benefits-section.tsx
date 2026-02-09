import { ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { benefits } from "@/widgets/landing-page/consts";

export const BenefitSection = () => {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Why teams choose Hubnity
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Join thousands of teams who have transformed their productivity
              with Hubnity.
            </p>
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                    <benefit.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md p-8 shadow-xl">
              <div className="mb-6 text-center">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  See It In Action
                </h3>
                <p className="text-gray-600">
                  Experience the power of Hubnity with our interactive demo
                </p>
              </div>
              <Button size="lg" className="w-full gap-2" asChild>
                <Link href="/register">
                  Try It Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
