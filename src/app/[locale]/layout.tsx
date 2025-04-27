import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";


import {Footer, Header, RouteGuard} from "@/components";
import {baseURL, createI18nContent} from "@/app/resources";

import {Raleway} from "next/font/google";
import {Source_Code_Pro} from "next/font/google";

import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import React from "react";
import {notFound} from "next/navigation";
import {Flex} from "@/once-ui/components";

interface LayoutParams {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(
  { params } : LayoutParams
) {
  const { locale } = await params;

  const t = await getTranslations();
  const {person, home} = createI18nContent(t);


  return {
    metadataBase: new URL(`https://${baseURL}/${locale}`),
    title: home.title,
    description: home.description,
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
      description: "Portfolio website showcasing my work.",
      url: baseURL,
      siteName: `${person.firstName}'s Portfolio`,
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
                                           children,
                                           params
                                         }: RootLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages(); // todo read documentation
  return (
    <NextIntlClientProvider messages={messages}>
      <Flex fillWidth minHeight="16"></Flex>
      <Header/>
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
      <Footer/>
    </NextIntlClientProvider>
  );
}
