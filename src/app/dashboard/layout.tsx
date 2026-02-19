import { AuthProvider } from "@/shared/providers/auth-provider";
import { DashboardSidebar } from "@/widgets/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        {/*<DashboardHeader />*/}
        <AuthProvider>{children}</AuthProvider>
      </div>
    </div>
  );
}
