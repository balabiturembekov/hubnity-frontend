"use client";

import { Shield } from "lucide-react";
import { useCurrentUser } from "@/entities/user";
import { Card, CardContent } from "@/shared/ui/card";

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const { data: user } = useCurrentUser();

  if (!user) return null;

  if (!["ADMIN", "OWNER", "SUPER_ADMIN"].includes(user.role)) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
                  <p>Admin privileges required to access this page.</p>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  return children;
};
