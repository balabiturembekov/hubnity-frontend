import { ArrowLeft, BadgeCheck, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogo } from "@/shared/icons/google-logo";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

type FooterLink = {
  text: string;
  href?: string;
  action?: () => void;
};

export interface AuthLayoutProps {
  title: string;
  description: string | React.ReactNode;
  footerText?: string;
  footerLink?: FooterLink;
  showGoogleButton?: boolean;
  onGoogleClick?: () => void;
  children?: React.ReactNode;
  showBackToLogin?: boolean;
  icon?: LucideIcon;
}

export function AuthLayout({
  title,
  description,
  footerText,
  footerLink,
  showGoogleButton = false,
  onGoogleClick,
  children,
  showBackToLogin,
  icon: Icon,
}: AuthLayoutProps) {
  return (
    <main className="h-dvh flex">
      <div className="w-full lg:w-1/2 h-full min-h- overflow-y-auto flex items-center justify-center">
        <div className="flex flex-col justify-center gap-4 w-120 px-5 pb-4">
          <div
            className={cn("flex flex-col items-center gap-2", {
              "mb-4": !!children,
            })}
          >
            <div className="lg:hidden w-fit mb-5">
              <Image
                src="/img/hubnity-logo.png"
                alt="Hubnity Logo"
                width={200}
                height={100}
                priority
                unoptimized
              />
            </div>
            {Icon && (
              <Card className="py-4 mb-4">
                <CardContent className="px-4">
                  <Icon className="h-7 w-7 text-foreground" strokeWidth={2} />
                </CardContent>
              </Card>
            )}
            <h1 className="text-3xl font-medium text-center">{title}</h1>
            <p className="text-muted-foreground text-center">{description}</p>
          </div>

          {showGoogleButton && (
            <>
              <Button
                type="button"
                variant="outline"
                className="h-12"
                onClick={onGoogleClick}
              >
                <GoogleLogo className="size-6" />
                <span>Sign in with Google</span>
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px w-full bg-input" />
                <span>or</span>
                <div className="h-px w-full bg-input" />
              </div>
            </>
          )}

          {children && <div className="flex flex-col gap-4">{children}</div>}

          {(footerText || footerLink) && (
            <div className="flex items-center text-sm self-center mt-2">
              {footerText && (
                <p className="text-muted-foreground">{footerText}</p>
              )}
              {footerLink &&
                (footerLink.action ? (
                  <Button
                    variant="link"
                    className="px-1"
                    onClick={footerLink.action}
                  >
                    {footerLink.text}
                  </Button>
                ) : (
                  <Button variant="link" className="px-1" asChild>
                    <Link href={footerLink.href ?? ""}>{footerLink.text}</Link>
                  </Button>
                ))}
            </div>
          )}

          {showBackToLogin && (
            <Button
              variant="ghost"
              className="w-fit mx-auto text-muted-foreground group"
              asChild
            >
              <Link href="/login">
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="hidden lg:block relative w-1/2 overflow-hidden bg-gray-100">
        <Image
          src="/img/hubnity-logo.png"
          alt="Hubnity Logo"
          width={300}
          height={300}
          className="ml-20 mt-20"
          priority
          unoptimized
        />
        <div className="shrink-0 w-fit absolute top-80 left-20 -right-120 border-8 border-black rounded-3xl mask-[linear-gradient(to_top,transparent_0%,black_110%)] mask-size-[100%_100%] mask-no-repeat">
          <Image
            src="/img/dashboard-illustration.png"
            alt="Dashboard Illustration"
            width={1920}
            height={1200}
            priority
            unoptimized
            className="rounded-2xl min-w-335"
          />
        </div>
      </div>
    </main>
  );
}
