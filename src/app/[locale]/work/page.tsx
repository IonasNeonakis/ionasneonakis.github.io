import { baseURL, createI18nContent } from "@/app/resources";
import { getPosts } from "@/app/utils/utils";
import { Projects } from "@/components/work/Projects";
import type { LocaleParams } from "@/i18n/routing";
import { Column } from "@/once-ui/components";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

interface WorkParams {
  params: Promise<LocaleParams>;
}

export async function generateMetadata({ params }: WorkParams) {
  const { locale } = await params;

  const t = await getTranslations();
  const { work } = createI18nContent(t);

  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}/work/`,
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

export default function Work({ params }: WorkParams) {
  const { locale } = use(params);

  setRequestLocale(locale);
  const t = useTranslations();

  const allProjects = getPosts(["src", "app", "[locale]", "work", "projects", locale]);
  const { person, work } = createI18nContent(t);

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/projects`,
            image: `${baseURL}/og?title=Design%20Projects`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/projects/${project.slug}`,
              image: `${baseURL}/${project.metadata.image}`,
            })),
          }),
        }}
      />
      <Projects locale={locale} />
    </Column>
  );
}
