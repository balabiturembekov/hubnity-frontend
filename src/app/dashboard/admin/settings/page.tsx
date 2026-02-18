import { DashboardSectionHeader } from "@/widgets/header";
import { SettingsCards } from "@/widgets/settings";

export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="bg-linear-to-b from-primary/5 via-background to-background">
            <div className="p-2 md:p-6">
              <DashboardSectionHeader title="Settings" className="mb-5" />

              <SettingsCards />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
