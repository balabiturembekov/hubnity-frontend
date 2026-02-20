"use client";

import { DollarSign, Mail, Shield, User } from "lucide-react";
import { useState } from "react";
import { UserAvatar, useCurrentUser } from "@/entities/user";
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
  const { data: user } = useCurrentUser();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profile Information</CardTitle>
          </div>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b">
            <UserAvatar name={user.name} avatar={user.avatar} size="xl" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge
                variant={
                  user.role === "ADMIN" ||
                  user.role === "OWNER" ||
                  user.role === "SUPER_ADMIN"
                    ? "default"
                    : "secondary"
                }
                className="mt-2"
              >
                {user.role}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Full Name</p>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Hourly Rate</p>
                <p className="text-sm text-muted-foreground">
                  {user.hourlyRate
                    ? `$${user.hourlyRate.toFixed(2)}/hr`
                    : "Not set"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Role</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => setPasswordDialogOpen(true)}
            >
              <Shield className="h-4 w-4" />
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
      />
    </>
  );
};
