"use client";

import { useCallback, useState } from "react";
import {
  IDLE_INTERVAL_OPTIONS,
  type IdleIntervalOption,
  idleThresholdSecondsToCustomMinutes,
  idleThresholdSecondsToInterval,
  intervalAndCustomToSeconds,
} from "@/features/settings";
import { cn } from "@/shared/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/shared/ui/combobox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export interface MemberIdleItem {
  user: { userId: string; email: string; name: string };
  idleThreshold: number;
}

/** Mock data until backend endpoint is ready. Replace with useGetMemberIdleSettingsQuery (or similar). */
const MOCK_MEMBERS_IDLE: MemberIdleItem[] = [
  {
    user: { userId: "1", email: "alice@example.com", name: "Alice Lastname" },
    idleThreshold: 300,
  },
  {
    user: { userId: "2", email: "bob@example.com", name: "Bob Lastname" },
    idleThreshold: 600,
  },
  {
    user: {
      userId: "3",
      email: "charlie@example.com",
      name: "Charlie Lastname",
    },
    idleThreshold: 120,
  },
  {
    user: { userId: "4", email: "diana@example.com", name: "Diana Lastname" },
    idleThreshold: 450,
  },
];

export function MembersIdleList() {
  const [items, setItems] = useState<MemberIdleItem[]>(MOCK_MEMBERS_IDLE);

  const updateMemberThreshold = useCallback(
    (userId: string, idleThreshold: number) => {
      setItems((prev) =>
        prev.map((item) =>
          item.user.userId === userId ? { ...item, idleThreshold } : item,
        ),
      );

      // TODO: when backend is ready, call useUpdateIndividualIdleSettingsMutation().mutate({ userId, payload: { idleThreshold } })
      // settingsService.updateIndividualIdleSettings(userId, { idleThreshold });
    },
    [],
  );

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <MemberIdleRow
          key={item.user.userId}
          item={item}
          onThresholdChange={(idleThreshold) =>
            updateMemberThreshold(item.user.userId, idleThreshold)
          }
        />
      ))}
    </div>
  );
}

function MemberIdleRow({
  item,
  onThresholdChange,
}: {
  item: MemberIdleItem;
  onThresholdChange: (idleThreshold: number) => void;
}) {
  const [interval, setInterval] = useState<IdleIntervalOption>(() =>
    idleThresholdSecondsToInterval(item.idleThreshold),
  );
  const [customMinutes, setCustomMinutes] = useState(() =>
    idleThresholdSecondsToCustomMinutes(item.idleThreshold),
  );

  const isCustomInterval = interval === "Custom";

  const applyThreshold = useCallback(
    (newInterval: IdleIntervalOption, newCustomMinutes: number) => {
      const seconds = intervalAndCustomToSeconds(newInterval, newCustomMinutes);
      onThresholdChange(seconds);
    },
    [onThresholdChange],
  );

  const handleIntervalChange = (newInterval: IdleIntervalOption | null) => {
    const value = newInterval ?? interval;
    setInterval(value);
    applyThreshold(value, customMinutes);
  };

  const handleCustomMinutesChange = (minutes: number) => {
    const clamped = Math.min(120, Math.max(1, minutes));
    setCustomMinutes(clamped);
    applyThreshold(interval, clamped);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border p-4",
        "bg-card",
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <span className="text-muted-foreground text-sm font-medium">
            {item.user.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium truncate">{item.user.name}</span>
          <span className="text-xs text-muted-foreground">
            {item.user.email}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`interval-${item.user.userId}`}>Interval</Label>
          <Combobox
            value={interval}
            onValueChange={(v) =>
              handleIntervalChange((v as IdleIntervalOption) ?? null)
            }
            id={`interval-${item.user.userId}`}
            items={[...IDLE_INTERVAL_OPTIONS]}
          >
            <ComboboxInput className="bg-white" />
            <ComboboxContent>
              <ComboboxEmpty>No items found</ComboboxEmpty>
              <ComboboxList>
                {(option) => (
                  <ComboboxItem key={option} value={option}>
                    {option}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        {isCustomInterval && (
          <div className="flex flex-col gap-2">
            <Label htmlFor={`custom-mins-${item.user.userId}`}>Minutes</Label>
            <div className="flex items-stretch">
              <Input
                id={`custom-mins-${item.user.userId}`}
                type="number"
                min={1}
                max={120}
                className="rounded-r-none w-24 bg-white"
                value={customMinutes}
                onChange={(e) =>
                  handleCustomMinutesChange(e.target.valueAsNumber || 1)
                }
              />
              <span className="bg-gray-100 border rounded-r-md flex items-center justify-center px-3 text-sm text-muted-foreground">
                mins
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
