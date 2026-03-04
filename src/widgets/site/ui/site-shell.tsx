import type { PropsWithChildren } from "react";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export const SiteShell = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
