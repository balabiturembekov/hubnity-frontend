"use client";

import { motion } from "framer-motion";
import { Briefcase, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { type HowItWorks, howItWorks } from "@/widgets/landing-page/consts";
import { SectionHeader } from "./section-header";

export const HowWeWorkSection = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="sm:py-12 sm:px-4 scroll-mt-15 lg:scroll-mt-10"
    >
      <div className="relative container space-y-24 mx-auto px-4 py-12 sm:rounded-lg bg-linear-to-br from-primary/6 via-primary/3 to-primary/7">
        <div className="absolute left-0 top-30 pointer-events-none h-100 w-100 rounded-full bg-linear-to-br from-primary/40 via-purple-400/30 to-indigo-500/20 opacity-25 blur-[100px]" />
        <div className="absolute right-0 bottom-30 pointer-events-none h-100 w-100 rounded-full bg-linear-to-br from-primary/40 via-purple-400/30 to-indigo-500/20 opacity-25 blur-[100px]" />
        <SectionHeader
          sectionId="how-it-works-title"
          title="How Hubnity Works"
          description="Discover the power of decentralized time tracking. Our AI-driven platform helps you manage your team's time and boost productivity effortlessly."
          badge="How It Works"
          Icon={Briefcase}
        />
        <div className="hidden lg:flex flex-col gap-12 relative">
          {howItWorks.map(({ icon: Icon, ...item }, index) => (
            <article
              key={item.id}
              className="relative grid grid-cols-[1fr_48px_1fr] w-full items-center gap-4"
            >
              <FeatureTitle
                title={item.title}
                description={item.description}
                index={index}
              />
              <div className="relative z-10 mb-4 flex items-center justify-center rounded-full bg-white">
                <FeatureIcon Icon={Icon} />
              </div>
              <FeatureImage item={item} index={index} />
            </article>
          ))}
          <div className="absolute h-full w-1 rounded-full bg-linear-to-b from-transparent via-primary/20 to-transparent top-0 left-[calc(50%-2px)] z-0"></div>
        </div>
        <div className="flex flex-col gap-12 lg:hidden">
          {howItWorks.map(({ icon: Icon, ...item }, index) => (
            <article
              key={item.id}
              className="w-full flex flex-col justify-center gap-6"
            >
              <FeatureTitle
                title={item.title}
                description={item.description}
                index={index}
                isMobile
              >
                <FeatureIcon Icon={Icon} isMobile />
              </FeatureTitle>
              <FeatureImage item={item} index={index} isMobile />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureIconProps {
  Icon: LucideIcon;
  isMobile?: boolean;
}

const FeatureIcon = ({ Icon, isMobile = false }: FeatureIconProps) => {
  return (
    <div
      className={cn(
        "flex mx-auto size-12 items-center justify-center rounded-full bg-primary/10",
        isMobile ? "mb-2" : "shadow-sm",
      )}
    >
      <Icon className="size-6 text-primary" />
    </div>
  );
};

interface FeatureTitleProps {
  title: string;
  description: string;
  index: number;
  isMobile?: boolean;
  children?: React.ReactNode;
}

const FeatureTitle = ({
  title,
  description,
  index,
  isMobile = false,
  children,
}: FeatureTitleProps) => {
  return (
    <div
      className={cn(
        "text-center max-w-100 mx-auto",
        !isMobile && index % 2 === 1 && "order-last",
      )}
    >
      {children}
      <h3 className="mb-2 text-xl sm:text-3xl font-bold text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface FeatureImageProps {
  index: number;
  item: Omit<HowItWorks, "icon">;
  isMobile?: boolean;
}

const FeatureImage = ({ item, index, isMobile = false }: FeatureImageProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isMobile ? 0 : index % 2 === 0 ? 100 : -100,
        y: isMobile ? 75 : 0,
        scale: isMobile ? 0.8 : 0.6,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      className={cn("mx-auto ", !isMobile && index % 2 === 1 && "order-first")}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="p-1.5 lg:p-2 rounded-lg hover:shadow-lg shadow-md bg-primary/10 hover:-translate-y-1 transition-all">
        <Image
          src={item.src}
          alt={item.imageAlt}
          width={item.width}
          height={item.height}
          className="rounded-md"
        />
      </div>
    </motion.div>
  );
};
