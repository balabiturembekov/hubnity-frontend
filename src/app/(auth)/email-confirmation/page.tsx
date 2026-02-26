"use client";

import { MailOpen } from "lucide-react";
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
      footerText="Didn't receive the email?"
      footerLink={{
        text: "Click to resend",
        action: () => console.log("Click to resend"),
      }}
      showBackToLogin
    />
  );
}
