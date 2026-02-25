import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

type LinkType = {
  label: string;
  href: string;
};

interface DashboardSectionHeaderProps extends React.ComponentProps<"div"> {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionChildren?: ReactNode;
  link?: LinkType;
}

export const DashboardSectionHeader = ({
  title,
  description,
  icon: Icon,
  className,
  children,
  link,
  actionChildren,
  ...props
}: DashboardSectionHeaderProps) => {
  return (
    <div>
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-1 sm:gap-0 items-center justify-between",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5 text-primary" />}
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            </div>
            {children}
          </div>
          {link && (
            <Button variant="link" className="group py-1 h-auto" asChild>
              <Link href={link.href}>
                {link.label}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">{actionChildren}</div>
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
