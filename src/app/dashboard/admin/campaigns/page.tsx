"use client";

import { useCurrentUser } from "@/entities/user";
import { CreateProjectButton } from "@/features/project/ui/create-project-button";
import { DashboardContainer } from "@/widgets/dashboard";
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
    <DashboardContainer>
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
    </DashboardContainer>
  );
}
