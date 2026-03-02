import type { LucideIcon } from "lucide-react";
import { Badge } from "@/shared/ui/badge";

interface SectionHeaderProps {
  title: string;
  description: string;
  badge: string;
  Icon: LucideIcon;
}

export const SectionHeader = ({
  title,
  description,
  badge,
  Icon,
}: SectionHeaderProps) => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto max-w-2xl text-center">
        <Badge
          variant="outline"
          className="bg-primary/10 text-base px-6 py-2 font-semibold text-primary border-none shadow-sm"
        >
          <Icon className="mr-2 size-4!" />
          {badge}
        </Badge>
      </div>
      <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl mt-4">
        {title}
      </h2>
      <p className="mb-12 text-lg text-gray-600">{description}</p>
    </div>
  );
};
