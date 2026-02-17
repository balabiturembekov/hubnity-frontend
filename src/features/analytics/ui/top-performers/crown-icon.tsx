"use client";

import {
  type MedalRank,
  medalConfig,
} from "@/features/analytics/consts/medal-config";

interface CrownIconProps {
  rank: MedalRank;
}

export function CrownIcon({ rank }: CrownIconProps) {
  const config = medalConfig[rank];
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 18L4.5 8L8.5 12L12 6L15.5 12L19.5 8L21 18H3Z"
        fill={config.color}
        fillOpacity="0.25"
        stroke={config.color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="6" r="1.5" fill={config.color} />
      <circle cx="4.5" cy="8" r="1.2" fill={config.color} fillOpacity="0.6" />
      <circle cx="19.5" cy="8" r="1.2" fill={config.color} fillOpacity="0.6" />
    </svg>
  );
}
