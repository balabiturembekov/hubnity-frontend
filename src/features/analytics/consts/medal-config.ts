export const medalConfig = {
  1: {
    color: "hsl(var(--gold))",
    colorLight: "hsl(40, 92%, 90%)",
    colorMid: "hsl(40, 92%, 70%)",
    label: "1st Place",
    bgClass: "bg-[hsl(var(--gold))]/8",
    borderClass: "border-[hsl(var(--gold))]/30",
    textClass: "text-[hsl(var(--gold))]",
    ringClass: "ring-[hsl(var(--gold))]/40",
    shadowClass: "shadow-[0_8px_32px_-4px_hsl(40,92%,44%,0.2)]",
  },
  2: {
    color: "hsl(var(--silver))",
    colorLight: "hsl(215, 12%, 90%)",
    colorMid: "hsl(215, 12%, 72%)",
    label: "2nd Place",
    bgClass: "bg-[hsl(var(--silver))]/8",
    borderClass: "border-[hsl(var(--silver))]/25",
    textClass: "text-[hsl(var(--silver))]",
    ringClass: "ring-[hsl(var(--silver))]/35",
    shadowClass: "shadow-[0_8px_32px_-4px_hsl(215,12%,52%,0.15)]",
  },
  3: {
    color: "hsl(var(--bronze))",
    colorLight: "hsl(24, 68%, 90%)",
    colorMid: "hsl(24, 68%, 65%)",
    label: "3rd Place",
    bgClass: "bg-[hsl(var(--bronze))]/8",
    borderClass: "border-[hsl(var(--bronze))]/25",
    textClass: "text-[hsl(var(--bronze))]",
    ringClass: "ring-[hsl(var(--bronze))]/35",
    shadowClass: "shadow-[0_8px_32px_-4px_hsl(24,68%,38%,0.15)]",
  },
} as const;

export type MedalRank = keyof typeof medalConfig;
