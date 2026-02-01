"use client";

import { Section, SectionHeader } from "@/components/ui/section";
import { companies } from "@/data";

export function Companies() {
  return (
    <Section id="companies" className="bg-muted/30">
      <SectionHeader
        title="Companies I've Worked With"
        description="Proud to have collaborated with these organizations"
      />

      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
        {companies.map((company) => (
          <div
            key={company.id}
            className="group relative"
          >
            {company.url && company.url !== "#" ? (
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                suppressHydrationWarning
              >
                <CompanyLogo company={company} />
              </a>
            ) : (
              <CompanyLogo company={company} />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function CompanyLogo({ company }: { company: (typeof companies)[0] }) {
  return (
    <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-default">
      {/* Placeholder logo */}
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border flex items-center justify-center group-hover:border-primary/30 transition-colors">
        <span className="text-3xl font-bold text-primary/50 group-hover:text-primary transition-colors">
          {company.name.charAt(0)}
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {company.name}
      </span>
    </div>
  );
}
