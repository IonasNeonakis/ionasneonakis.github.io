"use client";

import { contactMeForm } from "@/app/resources";
import { useEmailSentStatus } from "@/components/ClientHomeWrapper";
import { ContactForm } from "@/components/ContactForm";
import { MessageSentContent } from "@/components/MessageSentContent";
import type { Locale } from "@/i18n/routing";
import { Background, Column } from "@once-ui-system/core";
import React from "react";

interface ContactMeProps {
  locale: Locale;
}

export function ContactMe({ locale }: ContactMeProps) {
  const isSent = useEmailSentStatus();

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="48"
      radius="l"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: contactMeForm.effects.mask.x,
          y: contactMeForm.effects.mask.y,
          radius: contactMeForm.effects.mask.radius,
          cursor: contactMeForm.effects.mask.cursor,
        }}
        gradient={{
          display: contactMeForm.effects.gradient.display,
          opacity: contactMeForm.effects.gradient.opacity,
          x: contactMeForm.effects.gradient.x,
          y: contactMeForm.effects.gradient.y,
          width: contactMeForm.effects.gradient.width,
          height: contactMeForm.effects.gradient.height,
          tilt: contactMeForm.effects.gradient.tilt,
          colorStart: contactMeForm.effects.gradient.colorStart,
          colorEnd: contactMeForm.effects.gradient.colorEnd,
        }}
        dots={{
          display: contactMeForm.effects.dots.display,
          opacity: contactMeForm.effects.dots.opacity,
          size: contactMeForm.effects.dots.size,
          color: contactMeForm.effects.dots.color,
        }}
        grid={{
          display: contactMeForm.effects.grid.display,
          opacity: contactMeForm.effects.grid.opacity,
          color: contactMeForm.effects.grid.color,
          width: contactMeForm.effects.grid.width,
          height: contactMeForm.effects.grid.height,
        }}
        lines={{
          display: contactMeForm.effects.lines.display,
          opacity: contactMeForm.effects.lines.opacity,
        }}
      />
      {isSent ? <MessageSentContent /> : <ContactForm locale={locale} />}
    </Column>
  );
}
