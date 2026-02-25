import { LockKeyhole } from "lucide-react";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth";
import { AuthCard, AuthCardSkeleton } from "@/widgets/auth";

const ResetPasswordContent = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-primary/5 via-white to-primary/5 py-12 px-2">
      <AuthCard
        title="Hubnity"
        subtitle="Time Tracking & Team Management"
        cardIcon={LockKeyhole}
        cardTitle="Reset Password"
        cardDescription="Enter new credentials to reset your password"
        footerText="Remember your password?"
        footerLink={{ text: "Sign in", href: "/login" }}
      >
        <ResetPasswordForm />
      </AuthCard>
    </main>
  );
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<AuthCardSkeleton />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
