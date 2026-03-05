"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCurrentUser } from "@/entities/user";
import { UserProfileDropdown } from "@/features/user";
import { LANDING_HEADER_LINKS } from "@/shared/consts/landing-header-links";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";

export function Header() {
  const { data: user, isPending } = useCurrentUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "flex items-center justify-between fixed w-full top-0 z-50 min-h-16 transition-all duration-500",
        isScrolled || (isMenuOpen && !isScrolled)
          ? "bg-white/95 backdrop-blur supports-backdrop-filter:bg-primary/5 shadow-sm"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="container grid grid-cols-2 xl:grid-cols-[1fr_2fr_1fr] mx-auto items-center justify-between px-4">
        <Link
          aria-label="Home page"
          href="/"
          className="flex items-center gap-2 w-fit"
        >
          <Image
            src="/img/hubnity-logo-without-descr.png"
            alt="Hubnity - Time tracking and team management"
            width={110}
            height={25}
          />
        </Link>

        <nav
          className="hidden xl:flex items-center justify-center text-sm font-medium"
          aria-label="Main navigation"
        >
          {LANDING_HEADER_LINKS.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              className={cn(
                isScrolled ? "hover:bg-white/60" : "hover:bg-primary/5",
              )}
              asChild
            >
              <Link href={`/#${link.id}`}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-4">
          {!user || isPending ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                className={cn(
                  "hidden sm:inline-flex",
                  isScrolled ? "hover:bg-white/60" : "hover:bg-primary/5",
                )}
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="gap-2" asChild>
                <Link href="/register">
                  Get Started
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <UserProfileDropdown
              isHideInitials
              className={cn(
                isScrolled ? "hover:bg-white/60" : "hover:bg-primary/5",
              )}
            />
          )}

          <Drawer
            aria-label="Mobile navigation"
            direction="right"
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}
          >
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "xl:hidden",
                  isScrolled ? "hover:bg-white/60" : "hover:bg-primary/5",
                )}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="px-4 pb-8 h-dvh rounded-none outline-none">
              <DrawerHeader className="pb-6 mt-4 border-b border-primary/10 px-0">
                <DrawerTitle className="flex items-center justify-between text-left">
                  <Image
                    src="/img/hubnity-logo-without-descr.png"
                    alt="Hubnity - Time tracking and team management"
                    width={110}
                    height={25}
                  />
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-primary/2 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </DrawerClose>
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col justify-between h-full w-full overflow-y-auto pt-2 pb-10">
                <div role="navigation" className="flex flex-col space-y-2">
                  {LANDING_HEADER_LINKS.map((link) => (
                    <DrawerClose asChild key={link.id}>
                      <Link
                        href={`/#${link.id}`}
                        className="rounded-xl px-4 py-3.5 text-[17px] font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground active:bg-secondary/80"
                      >
                        {link.label}
                      </Link>
                    </DrawerClose>
                  ))}
                </div>

                {!user && (
                  <div className="mt-8 flex flex-col gap-3 border-t border-border/40 pt-6">
                    <DrawerClose asChild>
                      <Button
                        className="h-14 w-full rounded-2xl text-[17px] font-semibold shadow-md"
                        asChild
                      >
                        <Link href="/register">Get Started Free</Link>
                      </Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Button
                        variant="outline"
                        className="h-14 w-full rounded-2xl text-[17px] font-semibold border-border/60 bg-secondary/30 hover:bg-secondary/60"
                        asChild
                      >
                        <Link href="/login">Sign In to Hubnity</Link>
                      </Button>
                    </DrawerClose>
                  </div>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
