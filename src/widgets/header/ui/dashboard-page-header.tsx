import type { ReactNode } from "react";

interface DashboardHeaderProps extends React.PropsWithChildren {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
}

export const DashboardPageHeader = ({
  title,
  subTitle,
  children,
}: DashboardHeaderProps) => {
  return (
    <div className="border-b bg-card px-6 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{subTitle}</p>
        </div>
        <div className="flex items-center gap-3">{children}</div>
      </div>
    </div>
  );
};
