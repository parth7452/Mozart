"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COPY } from "@/lib/site";

export function FaqList() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {COPY.faq.items.map((item, index) => (
        <AccordionItem key={item.q} value={`item-${index}`}>
          <AccordionTrigger className="font-serif text-[15px] font-normal leading-snug sm:text-base">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-[15px] leading-relaxed">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
