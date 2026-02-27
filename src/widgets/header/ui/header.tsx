"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCurrentUser } from "@/entities/user";
import { UserProfileDropdown } from "@/features/user";
import { Button } from "@/shared/ui/button";

export function Header() {
  const { data: user, isPending } = useCurrentUser();

  return (
    <header className="flex items-center justify-between sticky top-0 z-50 border-b min-h-16 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/img/hubnity-logo-without-descr.png"
            alt="Hubnity logo"
            width={110}
            height={25}
          />
        </Link>

        {!user || isPending ? (
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex" asChild>
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
      </div>
    </header>
  );
}
