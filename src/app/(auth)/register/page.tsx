import { UserPlus } from "lucide-react";
import { RegisterForm } from "@/features/auth";
import { AuthCard } from "@/widgets/auth/ui/auth-card";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/5 py-12">
      <AuthCard
        title="Get started"
        subtitle="Create your account to start tracking time"
        cardIcon={UserPlus}
        cardTitle="Create account"
        cardDescription="Fill in your details to create a new account"
        footerText="Already have an account?"
        footerLink={{ text: "Sign in", href: "/login" }}
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
