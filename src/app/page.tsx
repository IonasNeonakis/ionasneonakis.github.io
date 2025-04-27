import {redirect, routing} from "@/i18n/routing";
import {hasLocale} from "next-intl";


export default function Redirect() {
  const locale = extractLocaleFromNavigatorLanguages() || routing.defaultLocale;

  redirect({href: `/${locale}`, locale});
}

function extractLocaleFromNavigatorLanguages() {
  return navigator.languages
    .map((language) => language.split("-")[0])
    .find((language) => hasLocale(routing.locales, language));
}