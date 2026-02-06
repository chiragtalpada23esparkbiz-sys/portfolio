"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, container = true, id, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("py-16 md:py-24", className)}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-4 xl:px-32 md-short:px-12 lg-short:px-20">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    );
  },
);
Section.displayName = "Section";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, align = "center", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-12", align === "center" && "text-center", className)}
        {...props}
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    );
  },
);
SectionHeader.displayName = "SectionHeader";

export { Section, SectionHeader };
