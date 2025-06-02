"use client";

import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { createContext, use, useEffect, useState } from "react";

const EmailSentContext = createContext<boolean>(false);
export const useEmailSentStatus = () => use(EmailSentContext);

interface ClientHomeWrapperProps {
  children: React.ReactNode;
}

export function ClientHomeWrapper({ children }: ClientHomeWrapperProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    const emailSentParam = searchParams.get("email_sent");
    if (emailSentParam === "true") {
      setIsEmailSent(true);

      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    // Provide the isEmailSent status to all children
    <EmailSentContext value={isEmailSent}>{children}</EmailSentContext>
  );
}
