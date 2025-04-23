import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  console.log("yeah", requestLocale)
  if (!routing.locales.includes(requestLocale as any)) {
    console.log("not found")
    // notFound();
  }

  return {
    locale: "fr",
    messages: (await import(`../../messages/fr.json`)).default
  };
})