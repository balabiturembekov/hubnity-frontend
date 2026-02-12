"use client";

import { FolderOpen } from "lucide-react";
import { ProjectCard } from "@/entities/project";
import { useGetProjectsQuery } from "@/entities/project/model/queries/use-get-projects.query";
import { Badge } from "@/shared/ui/badge";
import { DashboardSectionHeader } from "@/widgets/header";
import { ProjectsListEmpty, ProjectsListSkeleton } from "@/widgets/project";

export const ProjectsList = () => {
  const { data: projects, isPending } = useGetProjectsQuery();

  if (isPending) {
    return <ProjectsListSkeleton />;
  }

  if (!projects || !projects.length) {
    return <ProjectsListEmpty />;
  }

  return (
    <section className="space-y-4">
      <DashboardSectionHeader title="Projects" icon={FolderOpen}>
        <Badge variant="secondary" className="ml-2">
          {projects.length}
        </Badge>
      </DashboardSectionHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
