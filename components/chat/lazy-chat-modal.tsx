"use client";

import dynamic from "next/dynamic";

const ChatModal = dynamic(
  () => import("./chat-modal").then((mod) => mod.ChatModal),
  { ssr: false },
);

export function LazyChatModal() {
  return <ChatModal />;
}
