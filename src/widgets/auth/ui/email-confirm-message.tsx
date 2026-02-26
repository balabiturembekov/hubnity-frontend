import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export const EmailConfirmMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-[14px] border border-border bg-background shadow-sm mb-6">
        <BadgeCheck className="h-7 w-7 text-foreground" strokeWidth={2} />
      </div>

      <div className="space-y-3 mb-8">
        <h3 className="text-[28px] font-semibold tracking-tight text-foreground">
          All done!
        </h3>
        <p className="text-[15px] text-muted-foreground w-full max-w-[300px] mx-auto leading-relaxed">
          Your email has been successfully verified. You can now access your
          account.
        </p>
      </div>

      <div className="w-full space-y-3">
        <Button
          asChild
          size="lg"
          className="w-full h-10 text-sm bg-[#2C62EE] hover:bg-[#2C62EE]/90"
        >
          <Link href="/login" className="gap-2">
            Continue to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full h-10 text-sm shadow-sm bg-white "
        >
          <Link href="/">Return to home</Link>
        </Button>
      </div>
    </div>
  );
};
