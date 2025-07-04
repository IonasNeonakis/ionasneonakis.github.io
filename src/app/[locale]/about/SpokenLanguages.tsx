import { Flex, Tag } from "@once-ui-system/core";

interface SpokenLanguagesProps {
  languages: string[];
}

export function SpokenLanguages({ languages }: SpokenLanguagesProps) {
  return (
    <Flex wrap gap="8">
      {languages.map((language) => (
        <Tag key={language} size="l">
          {language}
        </Tag>
      ))}
    </Flex>
  );
}
