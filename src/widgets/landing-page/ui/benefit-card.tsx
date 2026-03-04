"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";
import type { BenefitCardItem } from "../consts";

export const BenefitCard = ({
  className,
  title,
  description,
  imageUrl,
  imageAlt,
  imageClassName,
  index,
}: BenefitCardItem & { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 75, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "min-h-0 relative row-span-1",
        className,
        index === 1 && "place-self-end",
      )}
    >
      <Card
        className={cn(
          "pb-0 px-0 hover:-translate-y-1 hover:shadow-lg transition-all ",
        )}
      >
        <CardContent className={cn("flex flex-col h-full gap-6 p-0")}>
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4 px-4 pt-2">
            <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
              {title}
            </h3>
            <p className={cn("text-muted-foreground text-sm sm:text-base")}>
              {description}
            </p>
          </div>

          <div
            className={cn(
              "relative w-full overflow-hidden mx-auto mt-auto rounded-br-xl",
              [1, 2].includes(index)
                ? "h-35 sm:h-80 lg:h-100 xl:h-50"
                : "h-35 sm:h-80",
            )}
          >
            <div
              className={cn(
                "border rounded-xl overflow-hidden absolute w-[90%] top-0",
                imageClassName,
              )}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={1280}
                height={720}
                unoptimized
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
