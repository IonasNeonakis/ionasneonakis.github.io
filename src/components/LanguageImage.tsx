import Image from "next/image";
import {Spinner} from "@/once-ui/components";

interface LanguageImageProps {
  locale: 'fr' | 'en';
  size: number;
  isLoading: boolean;
}

export function LanguageImage({locale, size, isLoading}: LanguageImageProps) {
  if (isLoading) {
    return <Spinner size="s" />
  }

  return (
      <Image
        src={`/images/flags/${locale}.svg`}
        alt={locale}
        width={size}
        height={size}
      />
  )
}
