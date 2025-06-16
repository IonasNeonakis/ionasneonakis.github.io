"use client";

import { emailMailToRedirect } from "@/utils/obfuscateEmailUtils";
import { IconButton } from "@once-ui-system/core";

export function ObfuscatedEmailButton() {
  return (
    <IconButton
      onClick={emailMailToRedirect}
      icon="email"
      tooltip="Email"
      size="s"
      variant="ghost"
    />
  );
}
