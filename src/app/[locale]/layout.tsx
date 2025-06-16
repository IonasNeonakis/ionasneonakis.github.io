import { Footer, Header, RouteGuard } from "@/components";
import { type LocaleParams, routing } from "@/i18n/routing";
import { Flex } from "@once-ui-system/core";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type React from "react";

interface RootLayoutParams {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
