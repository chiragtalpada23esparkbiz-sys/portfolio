"use client";

import dynamic from "next/dynamic";

const Avatar3D = dynamic(
  () => import("./avatar").then((mod) => mod.Avatar3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 animate-pulse" />
      </div>
    ),
  }
);

export function AvatarWrapper() {
  return (
    <div className="fixed bottom-8 right-8 w-48 h-64 z-40 hidden lg:block">
      <Avatar3D />
    </div>
  );
}
