import type { LucideIcon } from "lucide-react";
import { Badge } from "@/shared/ui/badge";

interface SectionHeaderProps {
  title: string;
  description: string;
  badge: string;
  Icon: LucideIcon;
  sectionId: string;
}

export const SectionHeader = ({
  title,
  description,
  badge,
  Icon,
  sectionId,
}: SectionHeaderProps) => {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <div className="mx-auto max-w-2xl text-center flex justify-center">
        <Badge
          variant="outline"
          className="bg-primary/10 text-base px-6 py-2 flex items-center font-semibold text-primary border-none shadow-sm"
        >
          <Icon className="mr-2 size-4!" />
          <span>{badge}</span>
        </Badge>
      </div>
      <h2
        id={sectionId}
        className="mb-4 text-4xl font-semibold text-gray-900 sm:text-5xl mt-6"
      >
        {title}
      </h2>
      <p className="mx-auto max-w-180 text-lg text-gray-600">{description}</p>
    </header>
  );
};
