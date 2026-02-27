import { NotFoundPage } from "@/widgets/errors";
import { SiteShell } from "@/widgets/site/ui/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundPage />
    </SiteShell>
  );
}
