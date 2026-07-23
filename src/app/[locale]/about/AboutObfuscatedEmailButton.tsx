"use client";

import { Button, Flex, IconButton } from "@once-ui-system/core";
import { emailMailToRedirect } from "@/utils/obfuscateEmailUtils";

export function AboutObfuscatedEmailButton() {
  return (
    <>
      <Flex s={{ hide: true }}>
        <Button
          onClick={emailMailToRedirect}
          prefixIcon={"email"}
          label={"Email"}
          size="s"
          variant="secondary"
        />
      </Flex>
      <Flex hide s={{ hide: false }}>
        <IconButton onClick={emailMailToRedirect} size="l" icon="email" variant="secondary" />
      </Flex>
    </>
  );
}
