import type { Person } from "@/app/resources/content-i18n";
import { Flex, Icon } from "@once-ui-system/core";
import Image from "next/image";
import React from "react";

interface CurrentLocationProps {
  person: Person;
}

export function CurrentLocation({ person }: CurrentLocationProps) {
  const { currentCompany } = person;

  return (
    <Flex gap="8" wrap horizontal="center">
      <Flex gap="2" vertical="center">
        <Image
          src={currentCompany.image.src}
          height={currentCompany.image.height}
          width={currentCompany.image.width}
          alt={currentCompany.image.alt}
        />
        {currentCompany.name}
      </Flex>
      <Flex gap="2" vertical="center">
        <Icon onBackground="accent-weak" name="globe" />
        {person.location}
      </Flex>
    </Flex>
  );
}
