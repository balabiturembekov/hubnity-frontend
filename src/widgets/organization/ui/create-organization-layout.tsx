import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { createOrganizationSteps } from "@/widgets/organization";

interface CreateOrganizationLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  nextLinkDisabled?: boolean;
}

export const CreateOrganizationLayout = ({
  currentStep,
  children,
  nextLinkDisabled = false,
}: CreateOrganizationLayoutProps) => {
  return (
    <div className="flex">
      <aside className="flex flex-col gap-30 h-dvh w-1/3 border-r bg-gray-100 border-input px-8 py-10">
        <Image
          src="/img/hubnity-logo.png"
          alt="Hubnity logo"
          width={200}
          height={50}
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

      <div className="max-h-dvh overflow-y-auto flex-1 px-5 sm:px-10 py-10 flex flex-col gap-4">
        <header>
          <h1 className="text-3xl font-semibold">
            {createOrganizationSteps[currentStep - 1].title}
          </h1>
          <p className="text-muted-foreground">
            {createOrganizationSteps[currentStep - 1].subTitle}
          </p>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="w-full flex items-center justify-between mt-4">
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
              asChild
              size="lg"
              className={cn("h-10 text-sm", {
                "ml-auto": currentStep === 1,
              })}
              disabled={nextLinkDisabled}
            >
              <Link
                href={`/create-organization/${currentStep === 1 ? "step-2" : "step-3"}`}
              >
                Next step
                <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
              </Link>
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
};
