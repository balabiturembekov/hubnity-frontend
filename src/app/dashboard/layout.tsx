import { DashboardHeader } from "@/widgets/header";
import { DashboardSidebar } from "@/widgets/sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
      </div>
    </div>
  );
}
