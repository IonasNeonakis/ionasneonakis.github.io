import { baseURL, createI18nContent } from "@/app/resources";
import { addBasePath } from "@/app/utils/imageUtils";
import { getPosts } from "@/app/utils/utils";
import { Projects } from "@/components/work/Projects";
import type { LocaleParams } from "@/i18n/routing";
import { Column } from "@once-ui-system/core";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface WorkParams {
  params: Promise<LocaleParams>;
}

export async function generateMetadata({ params }: WorkParams): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations();
  const { work } = createI18nContent(t);

  const title = work.title;
  const description = work.description;
  const ogImage = addBasePath("/images/avatar-og.webp");

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

export default async function Work({ params }: WorkParams) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations();

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
            url: `https://${baseURL}/${locale}/projects`,
            image: addBasePath("/images/avatar.webp"),
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `https://${baseURL}/${person.avatar}`,
              },
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/${locale}/projects/${project.slug}`,
              image: `${baseURL}/${project.metadata.image}`,
            })),
          }),
        }}
      />
      <Projects locale={locale} />
    </Column>
  );
}
