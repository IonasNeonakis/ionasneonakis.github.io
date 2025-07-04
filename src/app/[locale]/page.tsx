import { Column, Heading, RevealFx, Text } from "@once-ui-system/core";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { baseURL, createI18nContent } from "@/app/resources";
import { addBasePath } from "@/app/utils/imageUtils";
import { AboutMeBadge } from "@/components/AboutMeBadge";
import { ClientHomeWrapper } from "@/components/ClientHomeWrapper";
import { ContactMe } from "@/components/ContactMe";
import type { LocaleParams } from "@/i18n/routing";

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

  const { home, person } = createI18nContent(t);

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
              <AboutMeBadge locale={locale} />
            </RevealFx>
          </Column>
        </Column>
        <RevealFx translateY="16" delay={0.6} horizontal="start">
          <ContactMe locale={locale} />
        </RevealFx>
      </Column>
    </ClientHomeWrapper>
  );
}
