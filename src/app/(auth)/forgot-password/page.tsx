import { FingerprintPattern } from "lucide-react";
import { ForgotPasswordForm } from "@/features/auth";
import { AuthLayout } from "@/widgets/auth/ui/auth-layout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      icon={FingerprintPattern}
      title="Forgot password?"
      description="No worries, we'll send you reset instructions"
      showBackToLogin
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
