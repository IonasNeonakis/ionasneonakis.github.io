import {Column, Heading, Text} from "@/once-ui/components";
import React from "react";
import {Certification} from "@/app/resources/content-i18n";
import {DisplayCertification} from "@/components/about/certifications/DisplayCertification";

interface CertificationsProps {
  title: string;
  certifications: Certification[];
}

export function Certifications({title, certifications}: CertificationsProps) {
  return (
    <>
      <Heading as="h2" id={title} variant="display-strong-s" marginBottom="m">
        {title}
      </Heading>
      <Column fillWidth gap="l" marginBottom="40">
        {certifications.toSorted((a, b) => a.date.getTime() - b.date.getTime()).map((certification) => (
          <DisplayCertification key={certification.name} certification={certification}/>
        ))}
      </Column>
    </>

  )

}