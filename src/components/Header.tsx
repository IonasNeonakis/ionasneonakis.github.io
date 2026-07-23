"use client";

import { Fade, Flex, IconButton, Line, ToggleButton } from "@once-ui-system/core";
import type { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { createI18nContent, routes } from "@/app/resources";
import styles from "@/components/Header.module.scss";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { Link, type Locale, usePathname, useRouter } from "@/i18n/routing";
import { emailMailToRedirect } from "@/utils/obfuscateEmailUtils";

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
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Flex
        fitHeight
        className={styles.headerPosition}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
      >
        <Flex paddingLeft="12" fillWidth vertical="center" textVariant="display-strong-xs">
          <Flex s={{ hide: true }}>
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
                  <Flex s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      size="l"
                      href={`/${locale}/about`}
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  </Flex>
                  <Flex hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      size="l"
                      href={`/${locale}/about`}
                      selected={pathname === "/about"}
                    />
                  </Flex>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Flex s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      size="l"
                      href={`/${locale}/work`}
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Flex>
                  <Flex hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      size="l"
                      href={`/${locale}/work`}
                      selected={pathname.startsWith("/work")}
                    />
                  </Flex>
                </>
              )}
              {routes["/blog"] && (
                <>
                  <Flex s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="book"
                      size="l"
                      href={`/${locale}/blog`}
                      label={blog.label}
                      selected={pathname.startsWith("/blog")}
                    />
                  </Flex>
                  <Flex hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      size="l"
                      href={`/${locale}/blog`}
                      selected={pathname.startsWith("/blog")}
                    />
                  </Flex>
                </>
              )}
              <Flex hide s={{ hide: false }}>
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
            <Flex s={{ hide: true }}>
              <LanguageDropdown
                handleLanguageChange={handleLanguageChange}
                currentLocale={locale}
                isLoading={isPending}
              />
            </Flex>

            <Flex s={{ hide: true }} gap="16">
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
