"use client";

import { mailchimp } from "@/app/resources";
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
      padding="64"
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
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity,
          size: mailchimp.effects.dots.size,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity,
        }}
      />
      {isSent ? <MessageSentContent /> : <ContactForm locale={locale} />}
    </Column>
  );
}
