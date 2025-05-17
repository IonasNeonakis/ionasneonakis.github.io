import { CurrentLocation } from "@/app/[locale]/about/CurrentLocation";
import { SpokenLanguages } from "@/app/[locale]/about/SpokenLanguages";
import { baseURL, createI18nContent } from "@/app/resources";
import { Person } from "@/app/resources/content-i18n";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import React, { use } from "react";
import { GiSkills } from "react-icons/gi";

interface AboutParams {
  params: Promise<{
    locale: string;
  }>;
}

interface SkillSectionProps{
  title: string;
  skills: string[];
}

export function SkillSection({title, skills}: SkillSectionProps){
  return (
    <Flex gap="2">
      {title}
      <Flex wrap gap="2">
        {skills.map((skill) => (
          <Tag size="l" key={skill}>{skill}</Tag>
          )
          )}
      </Flex>
    </Flex>
  )
}

export function TechnicalSkills() {
  const backendSkills = [
    "Java",
    "Kotlin",
    "Spring Boot",
    "Spring",
    "Hibernate",
    "PostgreSQL",
    "MySQL",
    "Sql Server",
    "Flyway",
    "JUnit 5",
    "Mockito",
    "Mockk",
    "Strikt",
    "Testcontainers",
  ];

  return (
    <Flex gap="8" direction="column" fillWidth>
      <SkillSection title={"Backend"} skills={backendSkills} />

      <Flex gap="2">Fronted</Flex>
      <Flex gap="2">Devops</Flex>
      <Flex gap="2">Others</Flex>
      <Flex gap="2">SoftSkills</Flex>
    </Flex>
  );
}

export async function generateMetadata({ params }: AboutParams) {
  const { locale } = await params;
  const t = await getTranslations();
  const { about } = createI18nContent(t);

  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

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

export default function About({ params }: AboutParams) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations();

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
      title: about.studies.title,
      items: about.studies.institutions.map((institution) => institution.name),
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
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
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
        <Column
          className={styles.avatar}
          minWidth="160"
          paddingX="l"
          paddingBottom="xl"
          gap="m"
          flex={3}
          horizontal="center"
        >
          <Avatar src={person.avatar} size="xl" />
          <CurrentLocation person={person} />
          <SpokenLanguages languages={person.languages} />
          <TechnicalSkills />
        </Column>
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
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
            {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
              >
                {social.map(
                  (item) =>
                    item.link && (
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
                    ),
                )}
              </Flex>
            )}
          </Column>

          <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
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
                  {experience.images.length > 0 && (
                    <Flex fillWidth paddingTop="m" paddingLeft="40" wrap>
                      {experience.images.map((image, index) => (
                        <Flex
                          key={`${image.alt}${index}`}
                          border="neutral-medium"
                          radius="m"
                          minWidth={image.width}
                          height={image.height}
                        >
                          <SmartImage
                            enlarge
                            radius="m"
                            sizes={image.width.toString()}
                            alt={image.alt}
                            src={image.src}
                          />
                        </Flex>
                      ))}
                    </Flex>
                  )}
                </Column>
              ))}
            </Column>
          </>

          <>
            <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
              {about.studies.title}
            </Heading>
            <Column fillWidth gap="l" marginBottom="40">
              {about.studies.institutions.map((institution, index) => (
                <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                  <Text id={institution.name} variant="heading-strong-l">
                    {institution.name}
                  </Text>
                  <Text variant="heading-default-xs" onBackground="neutral-weak">
                    {institution.description}
                  </Text>
                </Column>
              ))}
            </Column>
          </>
        </Column>
      </Flex>
    </Column>
  );
}
