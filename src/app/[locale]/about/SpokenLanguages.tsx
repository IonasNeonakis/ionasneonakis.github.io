import { Flex, Tag } from "@/once-ui/components";
import React from "react";

interface SpokenLanguagesProps {
  languages: string[];
}

export function SpokenLanguages({ languages }: SpokenLanguagesProps) {
  return (
    <Flex wrap gap="8">
      {languages.map((language, index) => (
        <Tag key={language} size="l">
          {language}
        </Tag>
      ))}
    </Flex>
  );
}
