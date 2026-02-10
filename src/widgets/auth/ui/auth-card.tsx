import { Clock, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

type footerLinkType = {
  text: string;
  href: string;
};

interface AuthCardProps extends React.ComponentProps<"div"> {
  title: string;
  subtitle?: string;
  cardTitle?: string;
  cardDescription?: string;
  footerText?: string;
  footerLink?: footerLinkType;
  cardIcon: LucideIcon;
}

export const AuthCard = ({
  title,
  subtitle,
  cardTitle,
  cardDescription,
  className,
  children,
  footerText,
  footerLink,
  cardIcon: CardIcon,
  ...props
}: AuthCardProps) => {
  return (
    <div className={cn("w-full max-w-lg", className)} {...props}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
          <Clock className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <CardIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">{cardTitle}</CardTitle>
          </div>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="mx-auto text-sm text-muted-foreground pt-2 gap-1">
          {footerText ?? footerText}
          {footerLink && (
            <Link
              href={footerLink.href}
              className="text-primary hover:underline font-medium"
            >
              {footerLink.text}
            </Link>
          )}
        </CardFooter>
      </Card>

      <div className="text-center mt-8 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Hubnity. All rights reserved.</p>
      </div>
    </div>
  );
};
