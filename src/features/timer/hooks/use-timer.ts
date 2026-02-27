import { useEffect, useMemo, useState } from "react";
import {
  useCreateTimeEntryMutation,
  useGetTimeEntriesQuery,
  usePauseTimeEntryMutation,
  useResumeTimeEntryMutation,
  useStopTimeEntryMutation,
} from "@/entities/time-entry";
import { useCurrentUser } from "@/entities/user";
import { useTimerStore } from "@/features/timer";
import { formatDurationFull } from "@/shared/lib/utils";

export const useTimer = () => {
  const { data: user } = useCurrentUser();
  const { data: latestEntries, isPending: isLatestPending } =
    useGetTimeEntriesQuery(
      user?.id
        ? {
            userId: user.id,
            limit: 1,
          }
        : undefined,
      {
        enabled: !!user?.id,
      },
    );

  const {
    status,
    activeEntryId,
    projectId,
    isLoading,
    setFromEntry,
    setProjectId,
    setLoading,
    reset,
  } = useTimerStore();

  const [displaySeconds, setDisplaySeconds] = useState(0);

  // Sync with server latest entry (limit 1)
  useEffect(() => {
    if (!user) return;
    if (!latestEntries) return;

    const latestEntry = latestEntries[0] ?? null;
    const isActive =
      latestEntry?.status === "RUNNING" || latestEntry?.status === "PAUSED";

    if (!latestEntry || !isActive) {
      reset();
      setDisplaySeconds(0);
      return;
    }

    setFromEntry(latestEntry);

    const baseDuration =
      typeof latestEntry.duration === "number" &&
      Number.isFinite(latestEntry.duration)
        ? latestEntry.duration
        : 0;

    if (latestEntry.status === "RUNNING") {
      const startedAt = new Date(latestEntry.startTime).getTime();
      const now = Date.now();
      const offset =
        Number.isFinite(startedAt) && startedAt <= now
          ? Math.max(0, Math.floor((now - startedAt) / 1000))
          : 0;

      setDisplaySeconds(baseDuration + offset);
    } else {
      setDisplaySeconds(baseDuration);
    }
  }, [user, latestEntries, reset, setFromEntry]);

  // Local ticking when running
  useEffect(() => {
    if (status !== "RUNNING") return;

    const interval = window.setInterval(() => {
      setDisplaySeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [status]);

  const { mutateAsync: createTimeEntry, isPending: isCreatePending } =
    useCreateTimeEntryMutation();
  const { mutateAsync: pauseTimeEntry, isPending: isPausePending } =
    usePauseTimeEntryMutation();
  const { mutateAsync: resumeTimeEntry, isPending: isResumePending } =
    useResumeTimeEntryMutation();
  const { mutateAsync: stopTimeEntry, isPending: isStopPending } =
    useStopTimeEntryMutation();

  const isMutating =
    isCreatePending || isPausePending || isResumePending || isStopPending;
  const isBusy = isLoading || isMutating;

  const start = async () => {
    if (!user) return;
    if (activeEntryId) return;

    try {
      setLoading(true);
      const entry = await createTimeEntry({
        userId: user.id,
        projectId: projectId === "none" ? null : projectId,
        startTime: new Date().toISOString(),
        status: "RUNNING",
      });

      setFromEntry(entry);

      const baseDuration =
        typeof entry.duration === "number" && Number.isFinite(entry.duration)
          ? entry.duration
          : 0;
      const startedAt = new Date(entry.startTime).getTime();
      const now = Date.now();
      const offset =
        Number.isFinite(startedAt) && startedAt <= now
          ? Math.max(0, Math.floor((now - startedAt) / 1000))
          : 0;

      setDisplaySeconds(baseDuration + offset);
    } finally {
      setLoading(false);
    }
  };

  const pause = async () => {
    if (!activeEntryId) return;

    try {
      setLoading(true);
      const entry = await pauseTimeEntry(activeEntryId);

      setFromEntry(entry);
      const baseDuration =
        typeof entry.duration === "number" && Number.isFinite(entry.duration)
          ? entry.duration
          : 0;
      setDisplaySeconds(baseDuration);
    } finally {
      setLoading(false);
    }
  };

  const resume = async () => {
    if (!activeEntryId) return;

    try {
      setLoading(true);
      const entry = await resumeTimeEntry(activeEntryId);

      setFromEntry(entry);

      const baseDuration =
        typeof entry.duration === "number" && Number.isFinite(entry.duration)
          ? entry.duration
          : 0;
      const startedAt = new Date(entry.startTime).getTime();
      const now = Date.now();
      const offset =
        Number.isFinite(startedAt) && startedAt <= now
          ? Math.max(0, Math.floor((now - startedAt) / 1000))
          : 0;

      setDisplaySeconds(baseDuration + offset);
    } finally {
      setLoading(false);
    }
  };

  const stop = async () => {
    if (!activeEntryId) return;

    try {
      setLoading(true);
      await stopTimeEntry(activeEntryId);
      reset();
      setDisplaySeconds(0);
    } finally {
      setLoading(false);
    }
  };

  const timeLabel = useMemo(
    () => formatDurationFull(displaySeconds ?? 0),
    [displaySeconds],
  );

  const isStarted = status !== "IDLE";
  const isPaused = status === "PAUSED";
  const isRunning = status === "RUNNING";

  const togglePause = async () => {
    if (!isStarted) return;
    if (isPaused) {
      await resume();
    } else {
      await pause();
    }
  };

  return {
    timeLabel,
    status,
    isStarted,
    isPaused,
    isRunning,
    isBusy,
    projectId,
    isLatestPending,
    start,
    stop,
    pause,
    resume,
    togglePause,
    setProjectId,
  };
};
