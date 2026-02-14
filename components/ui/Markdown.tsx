"use client";

import { marked } from "marked";
import { useMemo } from "react";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  const html = useMemo(() => {
    // Trim content and process markdown with line breaks enabled
    const processed = marked(content.trim(), { breaks: true, gfm: true }) as string;
    // Remove trailing <br> tags to prevent extra space at end
    return processed.replace(/(<br\s*\/?>)+\s*(<\/p>)?$/gi, "$2").trim();
  }, [content]);

  return (
    <div
      className={`prose prose-invert prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0 [&>p:first-child]:mt-0 [&>ul]:my-3 [&>ol]:my-3 [&>li]:my-1 [&>h1]:mt-4 [&>h1]:mb-2 [&>h2]:mt-4 [&>h2]:mb-2 [&>h3]:mt-3 [&>h3]:mb-2 [&>*:last-child]:mb-0 [&_br]:block [&_br]:mt-2 [&_br]:content-[''] leading-relaxed ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
