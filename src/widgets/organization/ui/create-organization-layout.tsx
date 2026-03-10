"use client";

import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { createOrganizationSteps } from "@/widgets/organization";

interface CreateOrganizationLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  className?: string;
}

export const CreateOrganizationLayout = ({
  currentStep,
  children,
  className,
}: CreateOrganizationLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="hidden lg:flex flex-col min-h-dvh gap-30 w-1/3 border-r bg-gray-100 border-input px-8 py-10 overflow-y-auto">
        <Image
          src="/img/hubnity-logo.png"
          alt="Hubnity logo"
          width={200}
          height={66}
        />

        <div className="flex flex-col gap-32">
          {createOrganizationSteps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-5 relative">
              <div
                className={cn(
                  "shrink-0 size-9 rounded-full flex items-center justify-center bg-input text-foreground",
                  {
                    "bg-primary text-white": currentStep >= index + 1,
                  },
                )}
              >
                {index + 1}
              </div>
              <div className="flex flex-col gap-1">
                <h3>{step.title}</h3>
                <p className="text-muted-foreground font-light">
                  {step.subTitle}
                </p>
              </div>

              <div
                className={cn(
                  "absolute top-14 left-4.25 bg-gray-200 h-26 w-0.5 rounded-full",
                  {
                    "bg-primary": currentStep >= index + 1,
                    hidden: createOrganizationSteps.length === index + 1,
                  },
                )}
              />
            </div>
          ))}
        </div>
      </aside>

      <aside className="flex items-center justify-between lg:hidden gap-6 w-full bg-gray-100 px-5 sm:px-10 py-3 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4 relative">
          <div className="flex items-end">
            <div className="shrink-0 size-9 rounded-full flex items-center justify-center bg-primary text-white">
              {currentStep}
            </div>
            <span className="text-primary">/3</span>
          </div>
          <div className="flex flex-col gap-0.5 font-semibold">
            <h3>{createOrganizationSteps[currentStep - 1].title}</h3>
            <p className="hidden sm:block text-muted-foreground font-light text-sm">
              {createOrganizationSteps[currentStep - 1].subTitle}
            </p>
          </div>
        </div>

        <Image
          src="/img/hubnity-logo-without-text.png"
          alt="Hubnity logo"
          width={40}
          height={40}
        />
      </aside>

      <div className="overflow-y-auto flex-1 px-5 sm:px-10 py-10 flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold">
            {createOrganizationSteps[currentStep - 1].title}
          </h1>
          <p className="text-muted-foreground">
            {createOrganizationSteps[currentStep - 1].subTitle}
          </p>
        </header>

        <main className={cn("flex-1 pb-12 lg:pb-0", className)}>
          {children}
        </main>
        {/* <footer className="w-full flex items-center justify-between mt-4 fixed lg:static bottom-0 left-0 bg-gray-100 lg:bg-background py-3 lg:py-0 px-5 sm:px-10 lg:px-0 shadow-[0_-1px_3px_0_#0000001a] lg:shadow-none">
          {currentStep !== 1 && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-10 text-sm"
            >
              <Link
                href={`/create-organization/${currentStep === 2 ? "step-1" : "step-2"}`}
              >
                <ArrowLeft className="mr-2 h-5 w-5" strokeWidth={2.5} />
                Back
              </Link>
            </Button>
          )}
          {currentStep !== 3 && (
            <Button
              size="lg"
              className={cn("h-10 text-sm", {
                "ml-auto": currentStep === 1,
              })}
              disabled={nextLinkDisabled}
              onClick={() => {
                if (!nextLinkDisabled) {
                  router.push(nextHref);
                }
              }}
            >
              Next step
              <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
            </Button>
          )}
          {currentStep === 3 && (
            <Button size="lg" className="h-10 text-sm">
              Finish
            </Button>
          )}
        </footer> */}
      </div>
    </div>
  );
};
