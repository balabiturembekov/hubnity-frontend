"use client";

import { format } from "date-fns";
import { DollarSign, Mail, Shield, User } from "lucide-react";
import { useState } from "react";
import {
  useGetMemberQuery,
  useOrganizationRole,
} from "@/entities/organization";
import { UserAvatar, useGetCurrentUserQuery } from "@/entities/user";
import { ChangePasswordDialog } from "@/features/auth";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export const ProfileInfo = () => {
  const { data: user } = useGetCurrentUserQuery();
  const { role, isUser } = useOrganizationRole();
  const { data: userDetails } = useGetMemberQuery(
    "123123",
    user?.id as string,
    { enabled: !!user?.id },
  );
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <Card className="transition-shadow hover:shadow-md overflow-hidden h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profile Information</CardTitle>
          </div>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col justify-between h-full gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left pt-2 pb-6 border-b border-border/50">
            <div className="relative">
              <UserAvatar
                name={`${user.firstName} ${user.lastName}`}
                avatar={user.avatar}
                size="xl"
                className="h-20 w-20 ring-4 ring-background shadow-sm"
              />
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-sm border">
                <Shield className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                {`${user.firstName} ${user.lastName}`}
              </h3>
              <span className="text-sm font-medium text-muted-foreground">
                {user.email}
              </span>
              <span className="text-muted-foreground text-xs">
                Joined {format(user.createdAt, "dd/MM/yyyy")}
              </span>
              <div className="pt-2">
                <Badge
                  variant={!isUser ? "default" : "secondary"}
                  className="px-3 py-0.5 text-xs font-semibold tracking-wide"
                >
                  {role}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Full Name</p>
                <p className="text-sm text-muted-foreground">
                  {`${user.firstName} ${user.lastName}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground cursor-auto select-all">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <DollarSign className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Hourly Rate
                </p>
                <p className="text-sm text-muted-foreground font-semibold">
                  {userDetails?.hourlyRate
                    ? `$${userDetails?.hourlyRate.toFixed(2)}/hr`
                    : "Not set"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Role</p>
                <p className="text-sm text-muted-foreground capitalize font-medium">
                  {role}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2 rounded-xl h-11 border-dashed hover:border-solid hover:bg-primary/5 transition-all"
            onClick={() => setPasswordDialogOpen(true)}
          >
            <Shield className="h-4 w-4 text-muted-foreground" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      <ChangePasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
      />
    </>
  );
};
