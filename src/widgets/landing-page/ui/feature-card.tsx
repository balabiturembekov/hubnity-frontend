"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/shared/ui/card";
import type { Feature } from "../consts";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard = ({
  feature: { icon: Icon, ...feature },
  index,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 75, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
    >
      <Card className="group transition-all hover:shadow-lg hover:-translate-y-1 bg-linear-to-br from-primary/7 via-primary/2 to-primary/6 text-center">
        <CardContent className="p-6">
          <div
            className={`mb-4 inline-flex size-12 items-center justify-center rounded-full ${feature.color}`}
          >
            <Icon className="size-6" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            {feature.title}
          </h3>
          <p className="text-gray-600">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
