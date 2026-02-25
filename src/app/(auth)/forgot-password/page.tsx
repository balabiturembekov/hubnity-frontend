import { Lock } from "lucide-react";
import { ForgotPasswordForm } from "@/features/auth";
import { AuthCard } from "@/widgets/auth/ui/auth-card";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-primary/5 via-white to-primary/5 py-12 px-2">
      <AuthCard
        title="Hubnity"
        subtitle="Time Tracking & Team Management"
        cardIcon={Lock}
        cardTitle="Forgot password"
        cardDescription="Enter your email address to reset your password"
        footerText="Remember your password?"
        footerLink={{ text: "Sign in", href: "/login" }}
      >
        <ForgotPasswordForm />
      </AuthCard>
    </main>
  );
}
