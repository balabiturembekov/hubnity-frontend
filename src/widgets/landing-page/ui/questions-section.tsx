"use client";

import { motion } from "framer-motion";
import { CircleQuestionMark } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { questions } from "../consts";
import { SectionHeader } from "./section-header";

export const QuestionsSection = () => {
  const [open, setOpen] = useState<string | null>("1");

  return (
    <section
      id="faq"
      className="pb-20 pt-10 mt-4 scroll-mt-16 sm:scroll-mt-24 lg:scroll-mt-12"
    >
      <div className="container mx-auto px-4 space-y-18">
        <SectionHeader
          title="Frequently Asked Questions"
          description="Find answers to common questions about setting up your workspace, tracking time, and managing your team."
          badge="FAQ"
          Icon={CircleQuestionMark}
        />
        <Accordion
          type="single"
          collapsible
          className="max-w-3xl mx-auto flex flex-col gap-4"
          defaultValue="1"
          onValueChange={(value) => setOpen(value)}
        >
          {questions.map((question) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 75 }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <AccordionItem
                key={question.id}
                value={question.id}
                className={cn(
                  "px-4 hover:bg-gray-50 rounded-lg border last:border-b",
                  open === question.id
                    ? "bg-linear-to-br from-primary/10 via-primary/4 to-primary/6"
                    : "bg-card",
                )}
              >
                <AccordionTrigger>
                  <p className="font-bold">{question.question}</p>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-medium">{question.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
