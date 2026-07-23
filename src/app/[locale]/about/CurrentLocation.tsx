import { Flex, Icon } from "@once-ui-system/core";
import type { Person } from "@/app/resources/content-i18n";

interface CurrentLocationProps {
  person: Person;
}

export function CurrentLocation({ person }: CurrentLocationProps) {
  const { currentCompany } = person;

  return (
    <Flex gap="8" wrap horizontal="center">
      <Flex gap="2" vertical="center">
        <Icon name="briefcase" />
        {currentCompany.name}
      </Flex>
      <Flex gap="2" vertical="center">
        <Icon onBackground="accent-weak" name="globe" />
        {person.location}
      </Flex>
    </Flex>
  );
}
