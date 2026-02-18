import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/shared/ui/card";
import type { SettingsItemType } from "@/widgets/settings/model/types";

export const SettingsCard = (setting: SettingsItemType) => {
  return (
    <div key={setting.id} className="flex flex-col gap-2">
      <div>
        <h2 className="text-muted-foreground">{setting.title}</h2>
      </div>
      <Card className="p-2">
        <CardContent className="flex flex-col gap-2 p-2">
          {setting.links.map((link) => (
            <Link
              href={link.href}
              key={link.id}
              className="flex items-center justify-between hover:bg-gray-50 py-2 px-3 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center min-w-12 size-12 rounded-xl text-slate-500 bg-slate-100">
                  {<link.icon size={20} />}
                </div>
                <div>
                  <h3 className="text-sm text-gray-800">{link.label}</h3>
                  <p className="text-xs text-muted-foreground">
                    {link.description}
                  </p>
                </div>
              </div>
              <ChevronRight className="text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
