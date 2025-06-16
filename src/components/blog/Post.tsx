"use client";

import { formatDate } from "@/app/utils/formatDate";
import type { PostData } from "@/app/utils/utils";
import type { Locale } from "@/i18n/routing";
import { Column, Flex, Heading, SmartImage, SmartLink, Tag, Text } from "@once-ui-system/core";
import styles from "./Posts.module.scss";

interface PostProps {
  post: PostData;
  thumbnail: boolean;
  locale: Locale;
}

export default function Post({ post, thumbnail, locale }: PostProps) {
  const tags = post.metadata.tag.split(",").map((tag: string) => tag.trim());
  return (
    <SmartLink
      fillWidth
      className={styles.hover}
      unstyled
      key={post.slug}
      href={`/${locale}/blog/${post.slug}`}
    >
      <Flex
        position="relative"
        mobileDirection="column"
        fillWidth
        paddingY="12"
        paddingX="16"
        gap="32"
      >
        {post.metadata.image && thumbnail && (
          <SmartImage
            priority
            maxWidth={20}
            className={styles.image}
            sizes="640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="m"
            src={post.metadata.image}
            alt={`Thumbnail of ${post.metadata.title}`}
            aspectRatio="16 / 9"
          />
        )}
        <Column position="relative" fillWidth gap="8" vertical="center">
          <Heading as="h2" variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt, false)}
          </Text>
          {tags.length > 0 && (
            <Flex gap="8">
              {tags.map((tag: string, index: number) =>
                index < 3 ? <Tag key={tag} label={tag} variant="neutral" /> : null,
              )}
            </Flex>
          )}
        </Column>
      </Flex>
    </SmartLink>
  );
}
