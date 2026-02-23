import { DashboardSidebar, MobileBottomNav } from "@/widgets/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background min-w-0">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col min-w-0 relative">
        {children}
        <MobileBottomNav />
      </div>
    </div>
  );
}
