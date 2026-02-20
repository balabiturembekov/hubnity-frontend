"use client";

import { useCurrentUser } from "@/entities/user";
import { CreateProjectButton } from "@/features/project/ui/create-project-button";
import { DashboardPageHeader } from "@/widgets/header";
import { ProjectsFilters, ProjectsStatsCards } from "@/widgets/project";
import { ProjectsList } from "@/widgets/project/ui/projects-list";
import { ProjectsPageSkeleton } from "@/widgets/project/ui/projects-page-skeleton";

export default function AdminProjectsPage() {
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) {
    return <ProjectsPageSkeleton />;
  }

  return (
    <div className="flex h-screen overflow-y-scroll bg-background">
      <div className="flex flex-1 flex-col">
        <main className="bg-linear-to-b from-primary/5 via-background to-background">
          <DashboardPageHeader
            title="Projects"
            subTitle="Manage and organize your projects"
          >
            <CreateProjectButton />
          </DashboardPageHeader>

          <div className="p-2 md:p-6 grid gap-4">
            <ProjectsStatsCards />
            <ProjectsFilters />
            <ProjectsList />
          </div>
        </main>
      </div>
    </div>
  );
}
