import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface NotFoundPageProps {
  variant?: "default" | "dashboard";
}

export const NotFoundPage = ({ variant = "default" }: NotFoundPageProps) => {
  return (
    <main
      className={cn(
        "flex items-center justify-center bg-neutral-100 h-[80dvh]",
        {
          "h-dvh": variant === "dashboard",
        },
      )}
    >
      <div className="flex flex-col items-center text-center w-150 text-pretty px-5">
        <h1 className="text-base lg:text-xl text-muted-foreground mb-3 lg:mb-6">
          404 Not Found
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
          Oops! Page Not found
        </h2>
        <p className="text-base md: lg:text-xl text-muted-foreground mb-10">
          The page you are looking for doesn't exist. Click button below to go
          to the {variant === "default" ? "homepage" : "dashboard"}.
        </p>
        <Button size="lg" asChild>
          <Link href={variant === "default" ? "/" : "/dashboard"}>
            {variant === "default" ? "Back to Homepage" : "Back to Dashboard"}
          </Link>
        </Button>
      </div>
    </main>
  );
};
