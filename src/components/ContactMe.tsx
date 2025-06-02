"use client";

import { mailchimp } from "@/app/resources";
import { useEmailSentStatus } from "@/components/ClientHomeWrapper";
import { SendContent } from "@/components/SendContent";
import type { Locale } from "@/i18n/routing";
import { Background, Column, Heading, Text } from "@/once-ui/components";
import { useTranslations } from "next-intl";
import React from "react";

interface ContactMeProps {
  locale: Locale;
}

export function ContactMe({ locale }: ContactMeProps) {
  const isSent = useEmailSentStatus();

  console.log("is sent", isSent);

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="64"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Background
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
      {isSent ? <MessageSentContent locale={locale} /> : <SendContent locale={locale} />}
    </Column>
  );
}

function MessageSentContent({ locale }: { locale: Locale }) {
  const t = useTranslations();
  return (
    <Column fillWidth horizontal="center" align="center" gap="8">
      <Heading variant="display-strong-xs">Message Envoyé :D</Heading>
      <Text wrap="balance" onBackground="neutral-medium">
        Et voilà :D
      </Text>
    </Column>
  );
}
