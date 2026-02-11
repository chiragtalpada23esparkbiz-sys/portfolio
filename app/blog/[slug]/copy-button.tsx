"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

interface CopyButtonProps {
  url: string;
}

export function CopyButton({ url }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border bg-background text-sm font-medium transition-all duration-200 hover:bg-muted"
      aria-label="Copy link"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Link2 className="h-4 w-4" />
          <span>Copy Link</span>
        </>
      )}
    </button>
  );
}
