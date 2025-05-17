import { baseURL, createI18nContent } from "@/app/resources";
import { formatDate } from "@/app/utils/formatDate";
import { getPosts } from "@/app/utils/utils";
import ScrollToHash from "@/components/ScrollToHash";
import { CustomMDX } from "@/components/mdx";
import { routing } from "@/i18n/routing";
import { AvatarGroup, Button, Column, Heading, Row, Text } from "@/once-ui/components";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { use } from "react";

interface BlogParams {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams(): Promise<
  {
    slug: string;
    locale: string;
  }[]
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

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  const ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

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

export default function Blog({ params }: BlogParams) {
  const { slug, locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations();

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
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/${locale}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
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
