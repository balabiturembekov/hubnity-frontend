"use client";

import { FolderOpen } from "lucide-react";
import { ProjectCard } from "@/entities/project";
import { useFilteredProjects } from "@/features/project/hooks/use-filtered-projects";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/widgets/empty-state";
import { DashboardSectionHeader } from "@/widgets/header";
import { ProjectsListEmpty } from "./projects-list-empty";
import { ProjectsListSkeleton } from "./projects-list-skeleton";

export const ProjectsList = () => {
  const { projects, isLoading, isError } = useFilteredProjects();

  if (isLoading) {
    return <ProjectsListSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-8">
          <EmptyState
            icon={<FolderOpen className="h-12 w-12 mx-auto" />}
            title="Error"
            description="Failed to load projects"
          />
        </CardContent>
      </Card>
    );
  }

  if (!projects || projects.length === 0) {
    return <ProjectsListEmpty />;
  }

  return (
    <section className="space-y-4">
      <DashboardSectionHeader title="Projects" icon={FolderOpen}>
        <Badge variant="secondary" className="ml-2">
          {projects.length}
        </Badge>
      </DashboardSectionHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
