import { settingsItems } from "@/widgets/settings/consts";
import { SettingsCard } from "@/widgets/settings/ui/settings-card";

export const SettingsCards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
      {settingsItems.map((setting) => (
        <SettingsCard key={setting.id} {...setting} />
      ))}
    </div>
  );
};
