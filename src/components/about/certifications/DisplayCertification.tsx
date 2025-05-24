import {Column, Tag, Text} from "@/once-ui/components";
import React from "react";
import {Certification} from "@/app/resources/content-i18n";
import Image from "next/image";

interface CertificationProps {
  certification: Certification
}

export function DisplayCertification({ certification}: CertificationProps) {

  const {name, certificationId, skills, date, organization, image, link} = certification

  return (
    <Column key={`${name}`} fillWidth gap="4">
      <Text id={name} variant="heading-strong-l">
        {name}
      </Text>
      <Text variant="heading-default-xs" onBackground="neutral-weak">
        {organization}
      </Text>
      <Text variant="heading-default-xs" onBackground="neutral-weak">
        {date.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long"
        })}

      </Text>

      <Text variant="heading-default-xs" onBackground="neutral-weak">
        {certificationId}
      </Text>

      <Text variant="heading-default-xs" onBackground="neutral-weak">
        {link}
      </Text>

      {skills.map((skill) => (
        <Tag key={skill} variant="neutral" size="s" onBackground="brand-weak">
          {skill}
        </Tag>
      ))}

      {image && (
        <Image alt={image.alt} src={image.src} width={image.width} height={image.height}/>
      )}
    </Column>
  )
}