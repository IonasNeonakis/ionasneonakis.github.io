import React from "react";

import { Avatar, Button, Column, Flex, Heading, RevealFx, Text } from "@/once-ui/components";

import { baseURL, createI18nContent, routes } from "@/app/resources";
import { addBasePath } from "@/app/utils/imageUtils";
import { ClientHomeWrapper } from "@/components/ClientHomeWrapper";
import { ContactMe } from "@/components/ContactMe";
import type { LocaleParams } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export interface HomeParams {
  params: Promise<LocaleParams>;
}


export default async function Home({ params }: HomeParams) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations();

  const { home, about, person } = createI18nContent(t);

  return (
    <ClientHomeWrapper>
      <Column maxWidth="m" horizontal="center">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: home.title,
              description: home.description,
              url: `https://${baseURL}/${locale}`,
              image: addBasePath("/images/avatar.webp"),
              publisher: {
                "@type": "Person",
                name: person.name,
                image: {
                  "@type": "ImageObject",
                  url: `https://${baseURL}/${person.avatar}`,
                },
              },
            }),
          }}
        />
        <Column fillWidth paddingY="l" gap="m">
          <Column maxWidth="s">
            <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
              <Heading wrap="balance" variant="display-strong-l">
                {home.headline}
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </RevealFx>
            <RevealFx translateY="12" delay={0.4} horizontal="start">
              <Button
                id="about"
                data-border="rounded"
                href={`/${locale}/about`}
                variant="secondary"
                size="m"
                arrowIcon
              >
                <Flex gap="8" vertical="center">
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                  {about.title}
                </Flex>
              </Button>
            </RevealFx>
          </Column>
        </Column>
        <RevealFx translateY="16" delay={0.6}>
          <ContactMe locale={locale} />
        </RevealFx>
      </Column>
    </ClientHomeWrapper>
  );
}
