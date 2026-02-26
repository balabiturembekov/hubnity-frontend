import Image from "next/image";
import Link from "next/link";
import { GoogleLogo } from "@/shared/icons/google-logo";
import { Button } from "@/shared/ui/button";

type FooterLink = {
  text: string;
  href: string;
};

export interface AuthLayoutProps {
  title?: string;
  description?: string;
  footerText?: string;
  footerLink?: FooterLink;
  showGoogleButton?: boolean;
  onGoogleClick?: () => void;
  children: React.ReactNode;
}

export function AuthLayout({
  title,
  description,
  footerText,
  footerLink,
  showGoogleButton = false,
  onGoogleClick,
  children,
}: AuthLayoutProps) {
  return (
    <main className="h-dvh flex">
      <div className="w-full lg:w-1/2 h-full min-h- overflow-y-auto flex items-center justify-center">
        <div className="flex flex-col justify-center gap-4 w-120 px-5 pb-4">
          <div className="lg:hidden w-fit self-center mb-5">
            <Image
              src="/img/hubnity-logo.png"
              alt="Hubnity Logo"
              width={200}
              height={100}
              priority
              unoptimized
            />
          </div>

          {(title || description) && (
            <div className="flex flex-col gap-2 mb-4">
              {title && <h1 className="text-3xl font-medium">{title}</h1>}
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
          )}

          {showGoogleButton && (
            <>
              <Button
                type="button"
                size="lg"
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

          <div className="flex flex-col gap-4">{children}</div>

          {(footerText || footerLink) && (
            <div className="flex items-center text-sm self-center mt-2">
              {footerText && <p>{footerText}</p>}
              {footerLink && (
                <Button variant="link" className="px-1" asChild>
                  <Link href={footerLink.href}>{footerLink.text}</Link>
                </Button>
              )}
            </div>
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
