import type { PropsWithChildren } from "react";
import { AdminGuard } from "@/features/auth";

export default function AdminLayout({ children }: PropsWithChildren) {
  return <AdminGuard>{children}</AdminGuard>;
}
