"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    if (!preRef.current) return;

    const code = preRef.current.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-zinc-300 dark:hover:bg-zinc-600"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
        )}
      </button>
      <pre
        ref={preRef}
        className={
          className ||
          "bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 p-3 sm:p-4 rounded-xl overflow-x-auto mb-6 text-xs sm:text-sm border border-zinc-200 dark:border-zinc-800 max-w-full whitespace-pre wrap-normal"
        }
      >
        {children}
      </pre>
    </div>
  );
}
