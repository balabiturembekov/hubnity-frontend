"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Pause, Play, Square, Timer } from "lucide-react";
import { useGetProjectsQuery } from "@/entities/project";
import { useTimer } from "@/features/timer";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/shared/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";

export const TimerPopover = () => {
  const { data: projects, isPending: isProjectsPending } =
    useGetProjectsQuery();
  const {
    timeLabel,
    isStarted,
    isPaused,
    isBusy,
    projectId,
    isLatestPending,
    setProjectId,
    start,
    stop,
    togglePause,
  } = useTimer();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-between")}>
          <div className="flex items-center gap-2">
            <Timer />
            {isLatestPending ? (
              <Skeleton className="w-15 h-4" />
            ) : (
              <span
                className={cn("text-primary", {
                  "text-orange-400": isPaused,
                })}
              >
                {timeLabel}
              </span>
            )}
          </div>
          <ArrowUpRight />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "flex flex-col items-center transition-colors duration-75",
          {
            "bg-orange-100": isPaused,
          },
        )}
      >
        <PopoverHeader className="w-full mb-5">
          <Select
            value={projectId}
            onValueChange={setProjectId}
            disabled={isStarted || isBusy}
          >
            <SelectTrigger
              className={cn("w-full transition-colors duration-75", {
                "bg-orange-200 border-orange-200": isPaused,
              })}
            >
              <SelectValue placeholder="Select project" />
            </SelectTrigger>

            <SelectContent
              className={cn("transition-colors duration-75", {
                "bg-orange-200 border-orange-200": isPaused,
              })}
            >
              {!projects || isProjectsPending ? (
                <p>Loading...</p>
              ) : projects.length === 0 ? (
                <p>No projects</p>
              ) : (
                <>
                  <SelectItem value="none">No project</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      <div
                        className="size-2 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      {project.name}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </PopoverHeader>

        <span className="text-4xl font-semibold mb-4">{timeLabel}</span>

        <div className="flex items-center gap-3 relative h-9">
          <AnimatePresence>
            {!isStarted ? (
              <motion.div
                key="play"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
              >
                <Button
                  size="icon"
                  className="rounded-full"
                  onClick={start}
                  disabled={isBusy || isProjectsPending}
                >
                  <Play className="fill-white text-transparent" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="controls"
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.1,
                }}
              >
                <motion.div
                  initial={{ x: 24 }}
                  animate={{ x: 0 }}
                  exit={{ x: 24 }}
                  transition={{
                    duration: 0.1,
                  }}
                >
                  <Button
                    size="icon"
                    className="rounded-full"
                    onClick={togglePause}
                    disabled={isBusy}
                  >
                    {isPaused ? (
                      <Play className="fill-orange-100 text-transparent" />
                    ) : (
                      <Pause className="fill-white text-transparent" />
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ x: -24 }}
                  animate={{ x: 0 }}
                  exit={{ x: -24 }}
                  transition={{
                    duration: 0.1,
                  }}
                >
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                    onClick={stop}
                    disabled={isBusy}
                  >
                    <Square
                      className={cn(
                        "fill-white text-transparent transition-colors duration-75",
                        {
                          "fill-orange-100": isPaused,
                        },
                      )}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p></p>
      </PopoverContent>
    </Popover>
  );
};
