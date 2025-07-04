"use client";

import { Flex, Spinner } from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { hasLocale } from "next-intl";
import { useEffect } from "react";
import { routing } from "@/i18n/routing";

export function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const locale = extractSupportedLocaleFromNavigatorLanguages() || routing.defaultLocale;

    router.replace(`/${locale}`);
  }, [router]);
  return (
    <Flex fillHeight horizontal="center">
      <Spinner size="xl" />
    </Flex>
  );
}

function extractSupportedLocaleFromNavigatorLanguages() {
  if (typeof navigator === "undefined" || navigator.languages === undefined) {
    return null;
  }

  return navigator.languages
    .map((language) => language.split("-")[0])
    .find((language) => hasLocale(routing.locales, language));
}
