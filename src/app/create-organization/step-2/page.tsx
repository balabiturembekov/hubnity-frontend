import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { MonitoringSetups } from "@/widgets/create-organization";
import { CreateOrganizationLayout } from "@/widgets/organization";

export default function CreateOrganizationStep2Page() {
  return (
    <CreateOrganizationLayout currentStep={2}>
      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-3xl font-semibold">Monitoring setup</h1>
          <p className="text-muted-foreground">
            Set up monitoring for your organization
          </p>
        </header>
        <MonitoringSetups />
        <div className="flex items-center justify-between mt-4">
          <Button asChild variant="outline" size="lg" className="h-10 text-sm">
            <Link href="/create-organization/step-1">
              <ArrowLeft className="mr-2 h-5 w-5" strokeWidth={2.5} />
              Back
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="h-10 text-sm bg-primary border-primary-foreground"
          >
            <Link href="/create-organization/step-3">
              Next step
              <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
            </Link>
          </Button>
        </div>
      </div>
    </CreateOrganizationLayout>
  );
}
