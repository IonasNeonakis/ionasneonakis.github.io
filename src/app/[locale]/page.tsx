import React from "react";

import { Avatar, Badge, Column, Flex, Heading, RevealFx, Text } from "@/once-ui/components";

import { baseURL, createI18nContent } from "@/app/resources";
import { addBasePath } from "@/app/utils/imageUtils";
import { ClientHomeWrapper } from "@/components/ClientHomeWrapper";
import { ContactMe } from "@/components/ContactMe";
import type { LocaleParams } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface HomeParams {
  params: Promise<LocaleParams>;
}

export async function generateMetadata({ params }: HomeParams): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations();
  const { home } = createI18nContent(t);

  const title = home.title;
  const description = home.description;
  const ogImage = addBasePath("/images/avatar-og.webp");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
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
          <Column>
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
              <Badge href={`/${locale}/about`}>
                <Flex gap="4" vertical="center">
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                  <Text variant="label-strong-l" onBackground="brand-strong">
                    {about.title}
                  </Text>
                </Flex>
              </Badge>
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
