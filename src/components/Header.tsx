"use client";

import { useParams } from "next/navigation";

import styles from "@/components/Header.module.scss";
import { Fade, Flex, IconButton, Line, ToggleButton } from "@once-ui-system/core";

import { createI18nContent, routes } from "@/app/resources";
import { LanguageDropdown } from "@/components/LanguageDropdown";

import { Link, type Locale, usePathname, useRouter } from "@/i18n/routing";
import { emailMailToRedirect } from "@/utils/obfuscateEmailUtils";
import { useTranslations } from "next-intl";
import type { Params } from "next/dist/server/request/params";
import { useTransition } from "react";

interface MyParams extends Params {
  locale: Locale;
}

export const Header = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname() ?? "";
  const { locale } = useParams<MyParams>();

  function handleLanguageChange(newLocale: Locale) {
    const nextLocale = newLocale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  const t = useTranslations();
  const { person, about, blog, work, social } = createI18nContent(t);
  return (
    <>
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
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
          <Flex hide="s">
            <Link className={styles.homeLink} href={"/"}>
              {person.name}
            </Link>
          </Flex>
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
                <ToggleButton
                  size="l"
                  prefixIcon="home"
                  href={`/${locale}`}
                  selected={pathname === "/"}
                />
              )}
              <Line vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    size="l"
                    href={`/${locale}/about`}
                    label={about.label}
                    selected={pathname === "/about"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    size="l"
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
                    size="l"
                    href={`/${locale}/work`}
                    label={work.label}
                    selected={pathname.startsWith("/work")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    size="l"
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
                    size="l"
                    href={`/${locale}/blog`}
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    size="l"
                    href={`/${locale}/blog`}
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )}
              <Flex className="s-flex-show">
                <LanguageDropdown
                  handleLanguageChange={handleLanguageChange}
                  currentLocale={locale}
                  isLoading={isPending}
                  placement="top-start"
                />
              </Flex>
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
            <Flex className="s-flex-hide">
              <LanguageDropdown
                handleLanguageChange={handleLanguageChange}
                currentLocale={locale}
                isLoading={isPending}
              />
            </Flex>

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
              <IconButton
                onClick={emailMailToRedirect}
                icon="email"
                tooltip="Email"
                size="s"
                variant="ghost"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
