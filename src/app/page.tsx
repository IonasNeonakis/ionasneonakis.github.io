"use client";

import { routing } from "@/i18n/routing";
import { Spinner } from "@/once-ui/components";
import { hasLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const locale = extractSupportedLocaleFromNavigatorLanguages() || routing.defaultLocale;

    router.replace(`/${locale}`);
  }, [router]);
  return <Spinner />;
}

function extractSupportedLocaleFromNavigatorLanguages() {
  if (typeof navigator === "undefined" || navigator.languages === undefined) {
    return null;
  }

  return navigator.languages
    .map((language) => language.split("-")[0])
    .find((language) => hasLocale(routing.locales, language));
}
