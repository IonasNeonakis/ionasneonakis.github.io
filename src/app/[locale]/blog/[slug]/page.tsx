import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Button, Column, Heading, Row, Text } from "@/once-ui/components";
import {baseURL, createI18nContent} from "@/app/resources";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import { Metadata } from "next";
import {routing} from "@/i18n/routing";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

interface BlogParams {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {

  const locales = routing.locales;
  // Create an array to store all posts from all locales
  const allPosts: { slug: string; locale: "fr" | "en"; }[] = []; // todo change types here

  for (const locale of locales) {
    const posts = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]);
    allPosts.push(...posts.map(post => ({
      slug: post.slug,
      locale: locale,
    })));
  }

  return allPosts;
}

export async function generateMetadata( { params } : BlogParams) : Promise<Metadata | undefined> {
  const { slug, locale } = await params;

  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

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

export default async function Blog({params}: BlogParams) {
  const {slug, locale} = await params;
  setRequestLocale(locale)

  let post = getPosts(["src", "app", "[locale]", "blog", "posts", locale]).find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations();
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
      <Button href={`/${locale}/blog`} weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
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
