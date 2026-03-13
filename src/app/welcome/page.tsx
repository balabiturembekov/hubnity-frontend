import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export default function WelcomePage() {
  return (
    <main className="min-h-dvh flex overflow-hidden items-center bg-linear-to-br from-primary/5 via-white to-primary/5 pt-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="mb-8">
          <Image
            src="/img/hubnity-logo.png"
            alt="Hubnity Logo"
            width={220}
            height={110}
            priority
            unoptimized
          />
        </div>

        <div className="text-center space-y-4 mb-12 max-w-2xl px-4">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Welcome aboard!
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground leading-[1.6] max-w-md mx-auto">
            You've successfully verified your email. Now, let's get your
            workspace ready for your team.
          </p>

          <Button
            asChild
            size="lg"
            className="h-10 text-sm bg-primary border-primary-foreground mt-4"
          >
            <Link href="/create-organization/step-1">
              Create your organization
              <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
            </Link>
          </Button>
        </div>

        <Image
          src="/img/dashboard-illustration.png"
          alt="Dashboard Preview"
          width={1920}
          height={1200}
          priority
          unoptimized
          className="w-full h-auto object-cover rounded-lg sm:rounded-xl lg:rounded-2xl rounded-b-none shadow-sm mask-[linear-gradient(to_top,transparent_0%,black_120%)] mask-size-[100%_100%] mask-no-repeat border md:border-2 border-black"
        />
      </div>
    </main>
  );
}
