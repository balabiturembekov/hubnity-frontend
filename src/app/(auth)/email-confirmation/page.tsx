"use client";

import { MailOpen } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { AuthLayout } from "@/widgets/auth/ui/auth-layout";

export default function EmailConfirmPage() {
  return (
    <AuthLayout
      icon={MailOpen}
      title="Almost there!"
      description={
        <>
          We sent a confirmation email to{" "}
          <span className="text-foreground font-medium">example@gmail.com</span>
        </>
      }
      showBackToLogin
    >
      <Button>Resend email</Button>
    </AuthLayout>
  );
}
