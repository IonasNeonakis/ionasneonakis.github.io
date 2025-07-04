import { Column, Heading, Icon, Text } from "@once-ui-system/core";
import { useTranslations } from "next-intl";

export function MessageSentContent() {
  const t = useTranslations();
  return (
    <Column fillWidth horizontal="center" align="center" gap="16">
      <Heading variant="display-strong-xs">{t("home.contact.success.title")}</Heading>
      <Text wrap="balance" onBackground="neutral-medium">
        {t("home.contact.success.description")}
      </Text>
      <Icon name="send" size="xl" />
    </Column>
  );
}
