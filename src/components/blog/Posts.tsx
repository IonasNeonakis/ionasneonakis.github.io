import { getPosts } from "@/app/utils/utils";
import type { Locale } from "@/i18n/routing";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  locale: Locale;
}

export function Posts({ range, columns = "1", thumbnail = false, locale }: PostsProps) {
  const allBlogs = getPosts(["src", "app", "[locale]", "blog", "posts", locale]);

  const sortedBlogs = allBlogs.toSorted((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} mobileColumns="1" fillWidth marginBottom="40" gap="m">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} locale={locale} />
          ))}
        </Grid>
      )}
    </>
  );
}
