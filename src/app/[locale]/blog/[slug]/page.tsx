import { AvatarGroup, Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { baseURL, createI18nContent } from "@/app/resources";
import { formatDate } from "@/app/utils/formatDate";
import { addBasePath } from "@/app/utils/imageUtils";
import { getPosts } from "@/app/utils/utils";
import { CustomMDX } from "@/components/mdx";
import ScrollToHash from "@/components/ScrollToHash";
import { type LocaleParams, routing } from "@/i18n/routing";

interface BlogParams {
  params: Promise<
    LocaleParams & {
      slug: string;
    }
  >;
}

export async function generateStaticParams(): Promise<
  (LocaleParams & {
    slug: string;
  })[]
> {
  const locales = routing.locales;

  return locales.flatMap((locale) => {
    const posts = getPosts(["src", "app", "[locale]", "blog", "posts", locale]);
    return posts.map((post) => ({
      slug: post.slug,
      locale: locale,
    }));
  });
}

export async function generateMetadata({ params }: BlogParams): Promise<Metadata | undefined> {
  const { slug, locale } = await params;

  const post = getPosts(["src", "app", "[locale]", "blog", "posts", locale]).find(
    (post) => post.slug === slug,
  );

  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, summary: description } = post.metadata;
  const ogImage = addBasePath("/images/avatar-og.webp");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/${locale}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
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

export default async function Blog({ params }: BlogParams) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const post = getPosts(["src", "app", "[locale]", "blog", "posts", locale]).find(
    (post) => post.slug === slug,
  );

  if (!post) {
    notFound();
  }

  const { person } = createI18nContent(t);

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="xs" gap="l">
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
              : addBasePath("/images/avatar.webp"),
            url: `https://${baseURL}/${locale}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `https://${baseURL}/${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Button
        href={`/${locale}/blog`}
        weight="default"
        variant="tertiary"
        size="s"
        prefixIcon="chevronLeft"
      >
        Posts
      </Button>
      <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      <Row gap="12" vertical="center">
        {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
        <Text variant="body-default-s" onBackground="neutral-weak">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
      </Row>
      <Column as="article" fillWidth>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
