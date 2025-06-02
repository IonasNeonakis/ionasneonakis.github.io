"use client";

import { baseURL, createI18nContent, mailchimp } from "@/app/resources";
import type { Locale } from "@/i18n/routing";
import {
  Background,
  Button,
  Column,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
} from "@/once-ui/components";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";

function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

interface ContactMeProps {
  locale: Locale;
}

export function ContactMe({ locale }: ContactMeProps) {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const t = useTranslations();
  const { person } = createI18nContent(t);

  const validateEmail = (email: string): boolean => {
    if (email === "") {
      return true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const debouncedHandleChange = debounce(handleChange, 2000);

  const handleBlur = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    }
  };

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
      <Heading style={{ position: "relative" }} marginBottom="s" variant="display-strong-xs">
        {t("home.contact.header")}
      </Heading>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        {t("home.contact.description")}
      </Text>
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        action={mailchimp.action}
        method="post"
      >
        <Flex fillWidth maxWidth={30} mobileDirection="column" gap="8">
          <Column fillWidth gap="12">
            <Input
              id="email-input"
              name="email"
              type="email"
              label={t("home.contact.enterEmail")}
              required
              onChange={(e) => {
                if (error) {
                  handleChange(e);
                } else {
                  debouncedHandleChange(e);
                }
              }}
              onBlur={handleBlur}
              errorMessage={error}
            />
            <Textarea required id="textAria" name="content" label={t("home.contact.textArea")} />
            <Button type="submit" size="m" fillWidth>
              {t("home.contact.button")}
            </Button>
          </Column>
        </Flex>
        <input type="text" name="_honey" style={{ display: "none" }} />{" "}
        <input type="hidden" name="_subject" value={t("home.contact.mail.subject")} />
        <input
          type="hidden"
          name="_autoresponse"
          value={t("home.contact.mail.autoresponse", { name: person.name })}
        />
        <input type="hidden" name="_next" value={`https://${baseURL}/${locale}`} />
        <input type="hidden" name="_template" value="box" />
      </form>
    </Column>
  );
}
