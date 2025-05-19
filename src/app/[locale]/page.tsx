import React, { use } from "react";

import { Avatar, Button, Column, Flex, Heading, RevealFx, Text } from "@/once-ui/components";

import { baseURL, createI18nContent, routes } from "@/app/resources";
import { addBasePath } from "@/app/utils/imageUtils";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import type { LocaleParams } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface HomeParams {
  params: Promise<LocaleParams>;
}

export async function generateMetadata({ params }: HomeParams) {
  const { locale } = await params;

  const t = await getTranslations();
  const { home } = createI18nContent(t);

  const title = home.title;
  const description = home.description;
  const ogImage = addBasePath("/images/avatar.jpg");

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

export default function Home({ params }: HomeParams) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations();

  const { home, about, person } = createI18nContent(t);

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
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
        <Projects range={[1, 1]} locale={locale} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              {t("home.blog header")}
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" locale={locale} />
          </Flex>
        </Flex>
      )}
    </Column>
  );
}
