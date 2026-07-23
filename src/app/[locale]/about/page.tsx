import { Avatar, Button, Column, Flex, Heading, IconButton, Text } from "@once-ui-system/core";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutObfuscatedEmailButton } from "@/app/[locale]/about/AboutObfuscatedEmailButton";
import { CurrentLocation } from "@/app/[locale]/about/CurrentLocation";
import { SpokenLanguages } from "@/app/[locale]/about/SpokenLanguages";
import { baseURL, createI18nContent } from "@/app/resources";
import { addBasePath } from "@/app/utils/imageUtils";
import styles from "@/components/about/about.module.scss";
import { Certifications } from "@/components/about/certifications/Certifications";
import { Skills } from "@/components/about/skillSection/Skills";
import TableOfContents from "@/components/about/TableOfContents";
import type { LocaleParams } from "@/i18n/routing";

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
        s={{ hide: true }}
      >
        <TableOfContents structure={structure} />
      </Column>
      <Flex fillWidth s={{ direction: "column" }} horizontal="center">
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
          <Column
            s={{ hide: true }}
            gap="8"
            overflow="auto"
            horizontal="center"
            className={styles.skills}
          >
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
              hide
              s={{ hide: false }}
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
                <Flex key={item.link}>
                  <Flex s={{ hide: true }}>
                    <Button
                      href={item.link}
                      prefixIcon={item.icon}
                      label={item.name}
                      size="s"
                      variant="secondary"
                    />
                  </Flex>
                  <Flex hide s={{ hide: false }}>
                    <IconButton size="l" href={item.link} icon={item.icon} variant="secondary" />
                  </Flex>
                </Flex>
              ))}
              <AboutObfuscatedEmailButton />
            </Flex>
          </Column>

          <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="l">
            {about.intro.description}
          </Column>

          <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
            {about.work.title}
          </Heading>
          <Column fillWidth gap="l" marginBottom="40">
            {about.work.experiences.map((experience) => (
              <Column key={`${experience.company.name}-${experience.role}`} fillWidth>
                <Flex fillWidth horizontal="between" vertical="end" marginBottom="4">
                  <Flex vertical="center" gap="8">
                    {experience.company.image && (
                      <Image
                        width={experience.company.image.width}
                        height={experience.company.image.height}
                        alt={experience.company.image.alt}
                        src={experience.company.image.src}
                      />
                    )}
                    <Text variant="heading-strong-l" id={experience.company.name}>
                      {experience.company.name}
                    </Text>
                  </Flex>

                  <Text variant="heading-default-xs" onBackground="neutral-weak">
                    {experience.timeframe}
                  </Text>
                </Flex>
                <Text variant="body-default-s" onBackground="brand-weak" marginBottom="8">
                  {experience.role}
                </Text>
                <Column as="ul" className={styles.achievementList}>
                  {experience.achievements.map((achievement) => (
                    <Text
                      as="li"
                      className={styles.achievementItem}
                      variant="body-default-m"
                      key={`${experience.company.name}-${achievement}`}
                    >
                      {achievement}
                    </Text>
                  ))}
                </Column>
              </Column>
            ))}
          </Column>

          <Certifications
            title={about.certifications.title}
            certifications={about.certifications.certifications}
            locale={locale}
          />

          <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
            {about.studies.title}
          </Heading>
          <Column fillWidth gap="l" marginBottom="40">
            {about.studies.institutions.map((institution) => (
              <Column key={`${institution.organization.name}-${institution.role}`} fillWidth>
                <Flex fillWidth horizontal="between" vertical="end" marginBottom="4">
                  <Flex vertical="center" gap="8">
                    {institution.organization.image && (
                      <Image
                        width={institution.organization.image.width}
                        height={institution.organization.image.height}
                        alt={institution.organization.image.alt}
                        src={institution.organization.image.src}
                      />
                    )}
                    <Text variant="heading-strong-l" id={institution.organization.name}>
                      {institution.organization.name}
                    </Text>
                  </Flex>

                  <Text variant="heading-default-xs" onBackground="neutral-weak">
                    {institution.timeframe}
                  </Text>
                </Flex>
                <Text variant="body-default-s" onBackground="brand-weak" marginBottom="8">
                  {institution.role}
                </Text>
                <Column as="ul" className={styles.studiedFieldList}>
                  {institution.studiedFields.map((studiedField) => (
                    <Text as="li" variant="label-default-m" key={studiedField}>
                      {studiedField}
                    </Text>
                  ))}
                </Column>
              </Column>
            ))}
          </Column>
        </Column>
      </Flex>
    </Column>
  );
}
