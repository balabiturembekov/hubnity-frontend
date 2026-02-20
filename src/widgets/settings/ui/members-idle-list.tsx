"use client";

import { useCallback, useState } from "react";
import {
  IDLE_INTERVAL_OPTIONS,
  type IdleIntervalOption,
  idleThresholdSecondsToCustomMinutes,
  idleThresholdSecondsToInterval,
  intervalAndCustomToSeconds,
} from "@/features/settings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Card, CardContent } from "@/shared/ui/card";
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
import { SettingsSectionDescription } from "./settings-section-description";

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
    },
    [],
  );

  return (
    <Card>
      <CardContent className="space-y-6">
        <SettingsSectionDescription
          title="Individual idle settings"
          subTitle="Override idle time for specific members"
        />
        <Accordion type="single" collapsible className="w-full space-y-4">
          {items.map((item) => (
            <MemberIdleRow
              key={item.user.userId}
              item={item}
              onThresholdChange={(idleThreshold) =>
                updateMemberThreshold(item.user.userId, idleThreshold)
              }
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
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

  const userSummary = (
    <div className="flex items-center gap-3 min-w-0 pr-4 sm:pr-0">
      <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
        <span className="text-muted-foreground text-sm font-medium">
          {item.user.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 text-left">
        <span className="text-sm font-medium truncate">{item.user.name}</span>
        <span className="text-xs text-muted-foreground">{item.user.email}</span>
      </div>
    </div>
  );

  const renderSettingsInputs = (suffix: "desktop" | "mobile") => (
    <>
      <div className="flex flex-col gap-2 w-full sm:max-w-[200px] sm:min-w-[150px]">
        <Label htmlFor={`interval-${item.user.userId}-${suffix}`}>
          Interval
        </Label>
        <Combobox
          value={interval}
          onValueChange={(v) =>
            handleIntervalChange((v as IdleIntervalOption) ?? null)
          }
          id={`interval-${item.user.userId}-${suffix}`}
          items={[...IDLE_INTERVAL_OPTIONS]}
        >
          <ComboboxInput className="bg-white max-w-none text-left" />
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
          <Label htmlFor={`custom-mins-${item.user.userId}-${suffix}`}>
            Minutes
          </Label>
          <div className="flex items-stretch">
            <Input
              id={`custom-mins-${item.user.userId}-${suffix}`}
              type="number"
              min={1}
              max={120}
              className="rounded-r-none w-full sm:w-24 bg-white"
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
    </>
  );

  return (
    <>
      <div className="hidden sm:flex items-center justify-between gap-4 rounded-lg border p-4 bg-card">
        {userSummary}
        <div className="flex items-center gap-3">
          {renderSettingsInputs("desktop")}
        </div>
      </div>

      <AccordionItem
        value={item.user.userId}
        className="border rounded-lg bg-card px-2 sm:hidden"
      >
        <AccordionTrigger className="hover:no-underline py-4 flex items-center">
          {userSummary}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 pb-2">
            {renderSettingsInputs("mobile")}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
