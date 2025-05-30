import type { Certification } from "@/app/resources/content-i18n";
import type { Locale } from "@/i18n/routing";
import { Button, Column, Row, Tag, Text } from "@/once-ui/components";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface CertificationProps {
  certification: Certification;
  locale: Locale;
}

export function DisplayCertification({ certification, locale }: CertificationProps) {
  const t = useTranslations();

  const { name, certificationId, date, organization, link } = certification;

  return (
    <Column key={`${name}`} fillWidth gap="4">
      <Row vertical="center" gap="8">
        <Image
          alt={organization.image.alt}
          src={organization.image.src}
          width={organization.image.width}
          height={organization.image.height}
        />
        <Text id={name} variant="heading-strong-l">
          {name}
        </Text>
      </Row>

      <Text variant="body-default-s" onBackground="brand-weak">
        {organization.name} -{" "}
        {date.toLocaleDateString(locale, {
          year: "numeric",
        })}
      </Text>

      <Row horizontal="space-between" vertical="center">
        <Text variant="heading-default-xs" onBackground="neutral-weak">
          {t("about.certifications.id")}
          {certificationId}
        </Text>
        <Button
          size="s"
          variant="secondary"
          target="_blank"
          href={link}
          suffixIcon="arrowTopRightOnSquare"
        >
          {t("about.certifications.showCertificate")}
        </Button>
      </Row>
    </Column>
  );
}
