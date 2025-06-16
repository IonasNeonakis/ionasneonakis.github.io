import { AboutObfuscatedEmailButton } from "@/app/[locale]/about/AboutObfuscatedEmailButton";
import { CurrentLocation } from "@/app/[locale]/about/CurrentLocation";
import { SpokenLanguages } from "@/app/[locale]/about/SpokenLanguages";
import { baseURL, createI18nContent } from "@/app/resources";
import { addBasePath } from "@/app/utils/imageUtils";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { Certifications } from "@/components/about/certifications/Certifications";
import { Skills } from "@/components/about/skillSection/Skills";
import type { LocaleParams } from "@/i18n/routing";
import { Avatar, Button, Column, Flex, Heading, IconButton, Text } from "@once-ui-system/core";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

interface AboutParams {
  params: Promise<LocaleParams>;
}

export async function generateMetadata({ params }: AboutParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  const { about } = createI18nContent(t);

  const title = about.title;
  const description = about.description;
  const ogImage = addBasePath("/images/avatar-og.webp");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}/blog`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function About({ params }: AboutParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const { person, about, social } = createI18nContent(t);

  const structure = [
    {
      title: about.intro.title,
      items: [],
    },
    {
      title: about.work.title,
      items: about.work.experiences.map((experience) => experience.company.name),
    },
    {
      title: about.certifications.title,
      items: [],
    },
    {
      title: about.studies.title,
      items: about.studies.institutions.map((institution) => institution.organization.name),
    },
  ];
  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.intro.description,
            url: `https://${baseURL}/${locale}/about`,
            image: addBasePath("/images/avatar.webp"),
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:")) // Filter out empty links and email links
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about.work.experiences[0].company || "",
            },
          }),
        }}
      />
      <Column
        left="0"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        position="fixed"
        paddingLeft="24"
        gap="32"
        hide="s"
      >
        <TableOfContents structure={structure} />
      </Column>
      <Flex fillWidth mobileDirection="column" horizontal="center">
        <Column className={styles.avatar} minWidth="160" paddingX="l" gap="m" flex={3}>
          <Column
            style={{
              maxHeight: "260px",
            }}
            gap="s"
            paddingBottom="xl"
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <CurrentLocation person={person} />
            <SpokenLanguages languages={person.languages} />
          </Column>
          <Column hide="s" gap="8" overflow="auto" horizontal="center" className={styles.skills}>
            <Skills />
          </Column>
        </Column>
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="16"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>

            <Column
              show="s"
              paddingTop="l"
              overflow="auto"
              horizontal="center"
              className={styles.skills}
            >
              <Skills />
            </Column>

            <Flex
              className={styles.blockAlign}
              paddingTop="20"
              paddingBottom="8"
              gap="8"
              wrap
              horizontal="center"
              fitWidth
            >
              {social.map((item) => (
                <div key={item.link}>
                  <Button
                    className="s-flex-hide"
                    key={item.name}
                    href={item.link}
                    prefixIcon={item.icon}
                    label={item.name}
                    size="s"
                    variant="secondary"
                  />
                  <IconButton
                    className="s-flex-show"
                    size="l"
                    key={`${item.name}-icon`}
                    href={item.link}
                    icon={item.icon}
                    variant="secondary"
                  />
                </div>
              ))}
              <AboutObfuscatedEmailButton />
            </Flex>
          </Column>

          <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="l">
            {about.intro.description}
          </Column>

          <>
            <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
              {about.work.title}
            </Heading>
            <Column fillWidth gap="l" marginBottom="40">
              {about.work.experiences.map((experience, index) => (
                <Column key={`${experience.company.name}-${experience.role}-${index}`} fillWidth>
                  <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                    <Flex vertical="center" gap="8">
                      <Image
                        width={experience.company.image.width}
                        height={experience.company.image.height}
                        alt={experience.company.image.alt}
                        src={experience.company.image.src}
                      />
                      <Text variant="heading-strong-l" id={experience.company.name}>
                        {experience.company.name}
                      </Text>
                    </Flex>

                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {experience.timeframe}
                    </Text>
                  </Flex>
                  <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                    {experience.role}
                  </Text>
                  <Column as="ul">
                    {experience.achievements.map((achievement, index: number) => (
                      <Text as="li" variant="body-default-m" key={`${experience.company}-${index}`}>
                        {achievement}
                      </Text>
                    ))}
                  </Column>
                </Column>
              ))}
            </Column>
          </>

          <Certifications
            title={about.certifications.title}
            certifications={about.certifications.certifications}
            locale={locale}
          />

          <>
            <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
              {about.studies.title}
            </Heading>
            <Column fillWidth gap="l" marginBottom="40">
              {about.studies.institutions.map((institution, index) => (
                <Column
                  key={`${institution.organization.name}-${institution.role}-${index}`}
                  fillWidth
                >
                  <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                    <Flex vertical="center" gap="8">
                      <Image
                        width={institution.organization.image.width}
                        height={institution.organization.image.height}
                        alt={institution.organization.image.alt}
                        src={institution.organization.image.src}
                      />
                      <Text variant="heading-strong-l" id={institution.organization.name}>
                        {institution.organization.name}
                      </Text>
                    </Flex>

                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.timeframe}
                    </Text>
                  </Flex>
                  <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                    {institution.role}
                  </Text>
                  <Column as="ul">
                    {institution.studiedFields.map((studiedField) => (
                      <Text marginBottom="8" as="li" variant="label-default-m" key={studiedField}>
                        {studiedField}
                      </Text>
                    ))}
                  </Column>
                </Column>
              ))}
            </Column>
          </>
        </Column>
      </Flex>
    </Column>
  );
}
