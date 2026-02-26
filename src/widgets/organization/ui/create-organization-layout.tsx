import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { createOrganizationSteps } from "@/widgets/organization";

interface CreateOrganizationLayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

export const CreateOrganizationLayout = ({
  currentStep,
  children,
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

      <main className="h-dvh flex-1">{children}</main>
    </div>
  );
};
