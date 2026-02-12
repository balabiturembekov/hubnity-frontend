"use client";

import { Archive, CheckCircle2 } from "lucide-react";
import type { ProjectEntity } from "@/entities/project";
import { useUserStore } from "@/entities/user";
import { DeleteProjectButton } from "@/features/project";
import { UpdateProjectButton } from "@/features/project/ui/update-project-button";
import { capitalize } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface ProjectCardProps {
  project: ProjectEntity;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { user } = useUserStore();
  const canManage =
    user?.role === "admin" ||
    user?.role === "OWNER" ||
    user?.role === "SUPER_ADMIN";

  return (
    <Card
      key={project.id}
      className="transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="h-3 w-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: project.color }}
              />
              <CardTitle className="text-lg">{project.name}</CardTitle>
            </div>
            {project.description && (
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            )}
          </div>
          {canManage && (
            <div className="flex gap-1 ml-2">
              <UpdateProjectButton project={project} />
              <DeleteProjectButton project={project} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {project.clientName && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Client</span>
              <span className="font-medium">{project.clientName}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge
              variant={project.status === "ACTIVE" ? "default" : "outline"}
              className={
                project.status === "ACTIVE"
                  ? "bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20"
                  : ""
              }
            >
              {project.status === "ACTIVE" ? (
                <CheckCircle2 className="mr-1 h-3 w-3" />
              ) : (
                <Archive className="mr-1 h-3 w-3" />
              )}
              {capitalize(project.status)}
            </Badge>
          </div>
          {project.budget && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-medium">
                ${project.budget.toLocaleString()}
              </span>
            </div>
          )}
          {/*{projectHours > 0 && (*/}
          {/*  <div className="flex items-center justify-between text-sm">*/}
          {/*    <span className="text-muted-foreground">*/}
          {/*      Hours Tracked*/}
          {/*    </span>*/}
          {/*    <span className="font-medium">*/}
          {/*      {projectHours.toFixed(1)}h*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*)}*/}
          <div
            className="h-2 w-full rounded-full"
            style={{ backgroundColor: project.color }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
