import { Flex, IconButton, Text } from "@once-ui-system/core";
import { useTranslations } from "next-intl";
import { createI18nContent } from "@/app/resources";
import { ObfuscatedEmailButton } from "@/components/ObfuscatedEmailButton";
import styles from "./Footer.module.scss";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const t = useTranslations();
  const { person, social } = createI18nContent(t);

  return (
    <Flex
      as="footer"
      position="relative"
      fillWidth
      padding="8"
      horizontal="center"
      mobileDirection="column"
    >
      <Flex
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="space-between"
        vertical="center"
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
          <Text onBackground="neutral-weak" />
        </Text>
        <Flex gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
          <ObfuscatedEmailButton />
        </Flex>
      </Flex>
      <Flex height="80" show="s" />
    </Flex>
  );
}
