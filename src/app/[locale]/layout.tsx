import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import {Footer, Header, RouteGuard} from "@/components";
import {getMessages, setRequestLocale} from "next-intl/server";
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

interface RootLayoutParams {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: RootLayoutParams) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
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
