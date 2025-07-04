import { Spinner } from "@once-ui-system/core";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";

interface LanguageImageProps {
  locale: Locale;
  size: number;
  isLoading: boolean;
}

export function LanguageImage({ locale, size, isLoading }: LanguageImageProps) {
  if (isLoading) {
    return <Spinner size="s" />;
  }

  return <Image src={`/images/flags/${locale}.svg`} alt={locale} width={size} height={size} />;
}
