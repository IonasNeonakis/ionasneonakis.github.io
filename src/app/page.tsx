"use client";

import {routing} from "@/i18n/routing";
import {hasLocale} from "next-intl";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Spinner} from "@/once-ui/components";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const locale = extractSupportedLocaleFromNavigatorLanguages() || routing.defaultLocale;

    router.replace(`/${locale}`);
  }, [router]);
  return (
      <Spinner />
  );
}

function extractSupportedLocaleFromNavigatorLanguages() {
  if (typeof navigator === 'undefined' || navigator.languages === undefined) {
    return null
  }

  return navigator.languages
    .map((language) => language.split("-")[0])
    .find((language) => hasLocale(routing.locales, language));
}