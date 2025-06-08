import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import { Footer, Header, RouteGuard } from "@/components";
import { type LocaleParams, routing } from "@/i18n/routing";
import { Flex } from "@/once-ui/components";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type React from "react";
import type { Metadata } from "next";
import { baseURL, createI18nContent } from "@/app/resources";
import { addBasePath } from "@/app/utils/imageUtils";
import type { HomeParams } from "@/app/[locale]/page";

interface RootLayoutParams {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

export default async function RootLayout({ children, params }: RootLayoutParams) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Flex fillWidth minHeight="16" />
      <Header />
      <Flex
        position="relative"
        zIndex={0}
        fillWidth
        paddingY="l"
        paddingX="l"
        horizontal="center"
        flex={1}
      >
        <Flex horizontal="center" fillWidth minHeight="0">
          <RouteGuard>{children}</RouteGuard>
        </Flex>
      </Flex>
      <Footer />
    </NextIntlClientProvider>
  );
}
