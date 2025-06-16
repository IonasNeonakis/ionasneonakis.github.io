import type { Certification } from "@/app/resources/content-i18n";
import { DisplayCertification } from "@/components/about/certifications/DisplayCertification";
import type { Locale } from "@/i18n/routing";
import { Column, Heading, Text } from "@once-ui-system/core";
import React from "react";

interface CertificationsProps {
  title: string;
  certifications: Certification[];
  locale: Locale;
}

export function Certifications({ title, certifications, locale }: CertificationsProps) {
  return (
    <>
      <Heading as="h2" id={title} variant="display-strong-s" marginBottom="m">
        {title}
      </Heading>
      <Column fillWidth gap="l" marginBottom="40">
        {certifications.map((certification) => (
          <DisplayCertification
            key={certification.name}
            certification={certification}
            locale={locale}
          />
        ))}
      </Column>
    </>
  );
}
