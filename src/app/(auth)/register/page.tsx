import { RegisterForm } from "@/features/auth";
import { AuthLayout } from "@/widgets/auth/ui/auth-layout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create account"
      description="Fill in your details to create a new account"
      footerText="Already have an account?"
      footerLink={{ text: "Sign in", href: "/login" }}
      showGoogleButton
    >
      <RegisterForm />
    </AuthLayout>
  );
}
