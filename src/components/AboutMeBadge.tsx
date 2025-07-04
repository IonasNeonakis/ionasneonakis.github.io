import { Avatar, Badge, Flex, Text } from "@once-ui-system/core";
import { getTranslations } from "next-intl/server";
import { createI18nContent } from "@/app/resources";
import type { Locale } from "@/i18n/routing";
import styles from "./AboutMeBadge.module.scss";

interface AboutMeBadgeProps {
  locale: Locale;
}

export async function AboutMeBadge({ locale }: AboutMeBadgeProps) {
  const t = await getTranslations();

  const { about, person } = createI18nContent(t);

  return (
    <Badge className={styles.badge} href={`/${locale}/about`}>
      <Flex gap="4" vertical="center">
        <Avatar
          style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
          src={person.avatar}
          size="m"
        />
        <Text variant="label-strong-l" onBackground="brand-strong">
          {about.title}
        </Text>
      </Flex>
    </Badge>
  );
}
