import type { LucideIcon } from "lucide-react";

export interface SettingLinkType {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export interface SettingsItemType {
  id: string;
  title: string;
  links: SettingLinkType[];
}
