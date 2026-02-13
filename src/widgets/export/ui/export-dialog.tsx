"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { useExportData } from "@/features/export";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface ExportDialogProps {
  buttonLabel?: string;
}

export function ExportDialog({ buttonLabel }: ExportDialogProps) {
  const {
    exportType,
    setExportType,
    userFilter,
    setUserFilter,
    projectFilter,
    setProjectFilter,
    dateFilter,
    setDateFilter,
    handleExport,
    isAdmin,
    isEmployee,
    users,
    projects,
  } = useExportData();
  const [open, setOpen] = useState(false);

  const onExport = () => {
    const success = handleExport();
    if (success) {
      setOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        {buttonLabel ? buttonLabel : "Export Data"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>
              Choose what to export and apply filters if needed
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="exportType">Export Type</Label>
              <Select
                value={exportType}
                onValueChange={(value: "entries" | "users" | "projects") =>
                  setExportType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select export type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entries">Time Entries</SelectItem>
                  {isAdmin && (
                    <SelectItem value="users">User Statistics</SelectItem>
                  )}
                  {isAdmin && (
                    <SelectItem value="projects">Project Statistics</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {exportType === "entries" && (
              <>
                {!isEmployee && (
                  <div className="grid gap-2">
                    <Label htmlFor="userFilter">User Filter</Label>
                    <Select value={userFilter} onValueChange={setUserFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All users" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All users</SelectItem>
                        {users?.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="projectFilter">Project Filter</Label>
                  <Select
                    value={projectFilter}
                    onValueChange={setProjectFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All projects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All projects</SelectItem>
                      <SelectItem value="none">No project</SelectItem>
                      {projects
                        ?.filter((p) => p.status === "ACTIVE")
                        .map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dateFilter">Date Range</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 days</SelectItem>
                      <SelectItem value="month">Last 30 days</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={onExport}>
              Export CSV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
