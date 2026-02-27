"use client";

import { ArrowRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCurrentUser } from "@/entities/user";
import { UserProfileDropdown } from "@/features/user";
import { LANDING_HEADER_LINKS } from "@/shared/consts/landing-header-links";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";

export function Header() {
  const { data: user, isPending } = useCurrentUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
        isScrolled
          ? "bg-white/95 backdrop-blur supports-backdrop-filter:bg-primary/5 shadow-sm"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="container grid grid-cols-2 xl:grid-cols-[1fr_2fr_1fr] mx-auto items-center justify-between px-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/img/hubnity-logo-without-descr.png"
              alt="Hubnity logo"
              width={110}
              height={25}
            />
          </Link>
        </div>

        <nav className="hidden xl:flex items-center justify-center text-sm font-medium">
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
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <UserProfileDropdown />
          )}

          <Sheet>
            <SheetTrigger asChild>
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
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] border-l-0 shadow-2xl px-4 h-dvh"
            >
              <SheetHeader className="pb-6 border-b border-primary/10">
                <SheetTitle className="text-left">
                  <Image
                    src="/img/hubnity-logo-without-descr.png"
                    alt="Hubnity logo"
                    width={110}
                    height={25}
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-6">
                {LANDING_HEADER_LINKS.map((link) => (
                  <SheetClose asChild key={link.id}>
                    <Button
                      variant="ghost"
                      className="justify-between text-base font-medium h-12 px-4 hover:bg-primary/5 rounded-xl group transition-all"
                      asChild
                    >
                      <Link href={`/#${link.id}`}>
                        {link.label}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    </Button>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
