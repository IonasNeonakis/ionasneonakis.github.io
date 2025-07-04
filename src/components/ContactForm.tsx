"use client";

import { Button, Column, Flex, Heading, Input, Text, Textarea } from "@once-ui-system/core";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";
import { baseURL, contactMeForm, createI18nContent } from "@/app/resources";
import { EMAIL_SENT_SEARCH_PARAM } from "@/components/ClientHomeWrapper";
import type { Locale } from "@/i18n/routing";

function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
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
      setError(t("home.contact.enterValidEmail"));
    } else {
      setError("");
    }
  };

  const debouncedHandleChange = debounce(handleChange, 2000);

  const handleBlur = () => {
    if (!validateEmail(email)) {
      setError(t("home.contact.enterValidEmail"));
    }
  };

  return (
    <>
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
        action={contactMeForm.action}
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
            <Button type="submit" size="m" fillWidth suffixIcon="send">
              {t("home.contact.button")}
            </Button>
          </Column>
        </Flex>
        <input type="text" name="_honey" style={{ display: "none" }} />
        <input
          type="hidden"
          name="_subject"
          value={t("home.contact.mail.subject", { name: person.name })}
        />
        <input
          type="hidden"
          name="_autoresponse"
          value={t("home.contact.mail.autoresponse", { name: person.name })}
        />
        <input
          type="hidden"
          name="_next"
          value={`https://${baseURL}/${locale}?${EMAIL_SENT_SEARCH_PARAM}`}
        />
        <input type="hidden" name="_template" value="box" />
        <input type="hidden" name="_captcha" value="false" />
      </form>
    </>
  );
}
