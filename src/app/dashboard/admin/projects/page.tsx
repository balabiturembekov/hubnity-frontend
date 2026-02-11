"use client";

import { CreateProjectButton } from "@/features/project/ui/create-project-button";
import { DashboardPageHeader } from "@/widgets/header";
import { ProjectsFilters, ProjectsStatsCards } from "@/widgets/project";
import { ProjectsList } from "@/widgets/project/ui/projects-list";

export default function AdminProjectsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="bg-linear-to-b from-primary/5 via-background to-background">
          <DashboardPageHeader
            title="Projects"
            subTitle="Manage and organize your projects"
          >
            <CreateProjectButton />
          </DashboardPageHeader>

          <div className="p-6">
            <div className="space-y-6">
              <ProjectsStatsCards />

              <ProjectsFilters />

              <ProjectsList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
