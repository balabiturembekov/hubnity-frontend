import { EmailConfirmMessage } from "@/widgets/auth";
import { AuthLayout } from "@/widgets/auth/ui/auth-layout";

export default function EmailConfirmPage() {
  return (
    <AuthLayout>
      <EmailConfirmMessage />
    </AuthLayout>
  );
}
