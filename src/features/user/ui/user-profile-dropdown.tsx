"use client";

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserAvatar, useUserStore } from "@/entities/user";
import { useLogoutMutation } from "@/features/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Skeleton } from "@/shared/ui/skeleton";

export const UserProfileDropdown = () => {
  const { user, clearUser } = useUserStore();
  const router = useRouter();
  const { mutateAsync: logout } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
    } catch {
    } finally {
      router.replace("/login");
    }
  };

  if (!user) {
    return <Skeleton className="w-40 h-10 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full hover:bg-accent p-1 transition-colors"
        >
          <UserAvatar name={user.name} avatar={user.avatar} size="md" />
          <span className="text-sm font-medium mr-1 hidden sm:block">
            {user.name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">
            <Settings className="mr-2 h-4 w-4" />
            Profile Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
