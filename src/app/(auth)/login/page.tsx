import { LoginForm } from "@/features/auth";
import { AuthLayout } from "@/widgets/auth/ui/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your credentials to access your account"
      footerText="Don't have an account?"
      footerLink={{ text: "Create one", href: "/register" }}
      showGoogleButton
    >
      <LoginForm />
    </AuthLayout>
  );
}
