import { LogIn } from "lucide-react";
import { LoginForm } from "@/features/auth";
import { AuthCard } from "@/widgets/auth/ui/auth-card";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/5 py-12">
      <AuthCard
        title="Hubnity"
        subtitle="Time Tracking & Team Management"
        cardIcon={LogIn}
        cardTitle="Welcome back"
        cardDescription="Enter your credentials to access your account"
        footerText="Don't have an account?"
        footerLink={{ text: "Create one", href: "/register" }}
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
