import { cn } from "@/shared/lib/utils";

interface SettingsSectionDescriptionProps {
  title: string;
  subTitle: string;
  className?: string;
}

export const SettingsSectionDescription = ({
  title,
  subTitle,
  className,
}: SettingsSectionDescriptionProps) => {
  return (
    <div
      className={cn(
        "col-span-3 xl:col-span-2 flex flex-col gap-2 w-full",
        className,
      )}
    >
      <h2 className="text-xl">{title}</h2>
      <p className="font-light text-muted-foreground text-pretty">{subTitle}</p>
    </div>
  );
};
