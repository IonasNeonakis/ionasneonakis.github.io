import { baseURL, createI18nContent } from "@/app/resources";
import { Posts } from "@/components/blog/Posts";
import type { LocaleParams } from "@/i18n/routing";
import { Column, Heading } from "@/once-ui/components";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import {addBasePath} from "@/app/utils/imageUtils";

interface PageParams {
  params: Promise<LocaleParams>;
}

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;

  const t = await getTranslations();
  const { blog } = createI18nContent(t);

  const title = blog.title;
  const description = blog.description;
  const ogImage = addBasePath("/images/avatar.jpg");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}/blog`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }: PageParams) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations();
  const { person, blog } = createI18nContent(t);

  return (
    <Column maxWidth="s">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1}>
        <Posts range={[1, 3]} thumbnail locale={locale} />
        <Posts range={[4]} columns="2" locale={locale} />
      </Column>
    </Column>
  );
}
