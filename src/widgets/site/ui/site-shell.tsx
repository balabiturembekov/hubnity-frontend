import type { PropsWithChildren } from "react";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export const SiteShell = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
