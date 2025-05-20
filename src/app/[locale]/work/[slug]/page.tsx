import { baseURL, createI18nContent } from "@/app/resources";
import { formatDate } from "@/app/utils/formatDate";
import { addBasePath } from "@/app/utils/imageUtils";
import { getPosts } from "@/app/utils/utils";
import ScrollToHash from "@/components/ScrollToHash";
import { CustomMDX } from "@/components/mdx";
import { type Locale, type LocaleParams, routing } from "@/i18n/routing";
import { AvatarGroup, Button, Column, Flex, Heading, SmartImage, Text } from "@/once-ui/components";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { use } from "react";

interface WorkParams {
  params: Promise<
    LocaleParams & {
      slug: string;
    }
  >;
}

export async function generateStaticParams(): Promise<{ slug: string; locale: Locale }[]> {
  const { locales } = routing;

  return locales.flatMap((locale) => {
    const posts = getPosts(["src", "app", "[locale]", "work", "projects", locale]);
    return posts.map((post) => ({
      slug: post.slug,
      locale: locale,
    }));
  });
}

export async function generateMetadata({ params }: WorkParams): Promise<Metadata | undefined> {
  const { slug, locale } = await params;

  const t = await getTranslations();
  const { person } = createI18nContent(t);

  const post = getPosts(["src", "app", "[locale]", "work", "projects", locale]).find(
    (post) => post.slug === slug,
  );

  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, summary: description, images, team } = post.metadata;
  const ogImage = addBasePath("/images/avatar-og.webp");

  return {
    title,
    description,
    creator: person.name,
    icons: images.map((image) => ({
      url: image,
      type: "image/png",
      sizes: "any",
    })),
    authors: team.map((person) => ({ name: person.name, url: person.linkedIn })),
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/${locale}/work/${post.slug}`,
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
  } satisfies Metadata;
}

export default async function Project({ params }: WorkParams) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = getPosts(["src", "app", "[locale]", "work", "projects", locale]).find(
    (post) => post.slug === slug,
  );

  const t = await getTranslations();
  const { person } = createI18nContent(t);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/${locale}/work/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <Column maxWidth="xs" gap="16">
        <Button
          href={`/${locale}/work`}
          variant="tertiary"
          weight="default"
          size="s"
          prefixIcon="chevronLeft"
        >
          Projects
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Column>
      {post.metadata.images.length > 0 && (
        <SmartImage
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
