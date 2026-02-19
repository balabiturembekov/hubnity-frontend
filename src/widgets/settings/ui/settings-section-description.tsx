interface SettingsSectionDescriptionProps {
  title: string;
  subTitle: string;
}

export const SettingsSectionDescription = ({
  title,
  subTitle,
}: SettingsSectionDescriptionProps) => {
  return (
    <div className="col-span-2 flex flex-col gap-2 w-1/2">
      <h2 className="text-xl">{title}</h2>
      <p className="font-light text-muted-foreground text-pretty">{subTitle}</p>
    </div>
  );
};
