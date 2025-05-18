"use client";

import { Column, Flex, Text } from "@/once-ui/components";
import type React from "react";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    items: string[];
  }[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure }) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Column
      left="0"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
      position="fixed"
      paddingLeft="12"
      gap="32"
      hide="l"
    >
      {structure.map((section, sectionIndex) => (
        <Column key={`${section.title}${sectionIndex}`} gap="12">
          <Flex
            cursor="interactive"
            className={styles.hover}
            gap="8"
            vertical="center"
            onClick={() => scrollTo(section.title, 80)}
          >
            <Flex height="1" minWidth="16" background="neutral-strong" />
            <Text>{section.title}</Text>
          </Flex>
          {section.items.map((item) => (
            <Flex
              hide="l"
              key={`${item}`}
              style={{ cursor: "pointer" }}
              className={styles.hover}
              gap="12"
              paddingLeft="24"
              vertical="center"
              onClick={() => scrollTo(item, 80)}
            >
              <Flex height="1" minWidth="8" background="neutral-strong" />
              <Column fillWidth wrap textVariant="body-default-l" maxWidth={12}>
                <Text
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {item}
                </Text>
              </Column>
            </Flex>
          ))}
        </Column>
      ))}
    </Column>
  );
};

export default TableOfContents;
