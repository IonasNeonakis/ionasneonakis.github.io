"use client";

import {useParams} from "next/navigation";

import {Fade, Flex, IconButton, Line, ToggleButton} from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

import {routes, createI18nContent} from "@/app/resources";
import {useTransition} from "react";
import {Locale, useRouter, usePathname, routing} from "@/i18n/routing";
import {useTranslations} from "next-intl";

export const Header = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname() ?? '';
  const {locale} = useParams();

  function handleLanguageChange(locale: string) {
    const nextLocale = locale as Locale;
    startTransition(() => {
      router.replace(
        pathname,
        {locale: nextLocale}
      )
    })
  }

  const t = useTranslations();
  const {person, about, blog, work, social} = createI18nContent(t);
  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9}/>
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9}/>
      <Flex
        fitHeight
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
      >
        <Flex paddingLeft="12" fillWidth vertical="center" textVariant="display-strong-xs">
          <Flex hide="s">{person.name}</Flex>
        </Flex>
        <Flex fillWidth horizontal="center">
          <Flex
            background="surface"
            border="neutral-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s">
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href={`/${locale}`} selected={pathname === "/"}/>
              )}
              <Line vert maxHeight="24"/>
              {routes["/about"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href={`/${locale}/about`}
                    label={about.label}
                    selected={pathname === "/about"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href={`/${locale}/about`}
                    selected={pathname === "/about"}
                  />
                </>
              )}
              {routes["/work"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href={`/${locale}/work`}
                    label={work.label}
                    selected={pathname.startsWith("/work")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href={`/${locale}/work`}
                    selected={pathname.startsWith("/work")}
                  />
                </>
              )}
              {routes["/blog"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href={`/${locale}/blog`}
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href={`/${locale}/blog`}
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            {routing.locales.length > 1 && <Flex
                background="surface"
                border="neutral-medium"
                borderStyle="solid"
                radius="m-4"
                shadow="l"
                padding="4"
                gap="2"
                vertical="center">
              {routing.locales.map((locale, index) => (
                <ToggleButton
                  key={index}
                  selected={locale === locale}
                  onClick={() => handleLanguageChange(locale)}
                  className={isPending && 'pointer-events-none opacity-60' || ''}
                >
                  {locale.toUpperCase()}
                </ToggleButton>
              ))}
            </Flex>
            }
            <Flex hide="s" gap="16">
              {social.map(
                (item) =>
                  item.link && (
                    <IconButton
                      key={item.name}
                      href={item.link}
                      icon={item.icon}
                      tooltip={item.name}
                      size="s"
                      variant="ghost"
                    />
                  ),
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
