import { format } from "date-fns";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { greeting } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { DashboardPageHeader } from "@/widgets/header/ui/dashboard-page-header";

export default function DashboardPage() {
  return (
    <main>
      <DashboardPageHeader
        title={`${greeting()}, User!👋`}
        subTitle={format(new Date(), "EEEE, MMMM d, yyyy")}
      >
        <Link href="/dashboard/tracking">
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            View Tracking
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        {/*{isAdmin && (*/}
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/dashboard/admin/reports">
            <TrendingUp className="h-4 w-4" />
            View Reports
          </Link>
        </Button>
      </DashboardPageHeader>
    </main>
  );
}
