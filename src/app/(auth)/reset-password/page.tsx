import { RectangleEllipsis } from "lucide-react";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth";
import { AuthLayout } from "@/widgets/auth/ui/auth-layout";
import { ScreenLoader } from "@/widgets/loader";

const ResetPasswordContent = () => {
  return (
    <AuthLayout
      icon={RectangleEllipsis}
      title="Set new password"
      description="Enter new credentials to reset your password"
      showBackToLogin
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
