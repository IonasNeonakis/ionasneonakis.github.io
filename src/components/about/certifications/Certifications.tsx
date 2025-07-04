import { Column, Heading } from "@once-ui-system/core";
import type { Certification } from "@/app/resources/content-i18n";
import { DisplayCertification } from "@/components/about/certifications/DisplayCertification";
import type { Locale } from "@/i18n/routing";

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
