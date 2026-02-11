"use client";

import { FolderOpen } from "lucide-react";
import { CreateProjectButton } from "@/features/project/ui/create-project-button";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/widgets/empty-state";

export const ProjectsListEmpty = () => {
  return (
    <Card>
      <CardContent className="py-12">
        <EmptyState
          icon={<FolderOpen className="h-12 w-12 mx-auto" />}
          title="No projects yet"
          description="Create your first project to start organizing your work"
          action={<CreateProjectButton variant="secondary" />}
        />
      </CardContent>
    </Card>
  );
};
