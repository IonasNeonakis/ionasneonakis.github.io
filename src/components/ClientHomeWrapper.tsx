"use client";

import { useSearchParams } from "next/navigation";
import type React from "react";
import { createContext, use, useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";

const EmailSentContext = createContext<boolean>(false);
export const useEmailSentStatus = () => use(EmailSentContext);

export const EMAIL_SENT_SEARCH_PARAM = "email_sent";

interface ClientHomeWrapperProps {
  children: React.ReactNode;
}

export function ClientHomeWrapper({ children }: ClientHomeWrapperProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    if (searchParams.has(EMAIL_SENT_SEARCH_PARAM)) {
      setIsEmailSent(true);

      router.replace("/");
    }
  }, [searchParams, router]);

  return <EmailSentContext value={isEmailSent}>{children}</EmailSentContext>;
}
