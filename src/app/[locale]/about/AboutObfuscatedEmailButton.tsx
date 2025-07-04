"use client";

import { Button, IconButton } from "@once-ui-system/core";
import { emailMailToRedirect } from "@/utils/obfuscateEmailUtils";

export function AboutObfuscatedEmailButton() {
  return (
    <>
      <Button
        className="s-flex-hide"
        onClick={emailMailToRedirect}
        prefixIcon={"email"}
        label={"Email"}
        size="s"
        variant="secondary"
      />
      <IconButton
        className="s-flex-show"
        onClick={emailMailToRedirect}
        size="l"
        icon="email"
        variant="secondary"
      />
    </>
  );
}
