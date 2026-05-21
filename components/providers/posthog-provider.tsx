"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthogClient = usePostHog();
  const lastPath = useRef<string>("");

  useEffect(() => {
    if (!posthogClient) return;
    const url =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    if (url === lastPath.current) return;
    lastPath.current = url;
    posthogClient.capture("$pageview", { $current_url: window.location.href });
  }, [pathname, searchParams, posthogClient]);

  return null;
}

function PostHogInit({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      ui_host: "https://us.posthog.com",
      capture_pageview: false, // handled manually via PostHogPageView
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: true, // mask text inputs for privacy
      },
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") ph.debug();
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogInit>{children}</PostHogInit>;
}
