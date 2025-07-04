"use client";

import { IconButton } from "@once-ui-system/core";
import { emailMailToRedirect } from "@/utils/obfuscateEmailUtils";

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
