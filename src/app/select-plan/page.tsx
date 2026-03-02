import Image from "next/image";
import { CorePlans } from "@/widgets/select-plan";

export default function SelectPlanPage() {
  return (
    <main className="min-h-dvh flex overflow-hidden bg-linear-to-br from-primary/5 via-white to-primary/5 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="mb-12">
          <Image
            src="/img/hubnity-logo.png"
            alt="Hubnity Logo"
            width={180}
            height={90}
            priority
            unoptimized
          />
        </div>

        <CorePlans />
      </div>
    </main>
  );
}
