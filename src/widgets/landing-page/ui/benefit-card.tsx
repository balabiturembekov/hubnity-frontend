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
}: BenefitCardItem) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 75, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "h-full min-h-0 relative overflow-hidden row-span-1",
        className,
      )}
    >
      <Card className="pb-0 px-0">
        <CardContent className={cn("flex flex-col h-full gap-6 p-0")}>
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 px-4 pt-4">
            <h3 className="text-xl font-medium leading-tight sm:text-2xl">
              {title}
            </h3>
            <p className={cn("text-muted-foreground text-sm sm:text-base")}>
              {description}
            </p>
          </div>

          <div className="min-h-70 relative w-full overflow-hidden max-h-50 mx-auto">
            <div
              className={cn(
                "border rounded-xl overflow-hidden absolute w-[90%] top-0",
                imageClassName,
              )}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={300}
                height={311}
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
