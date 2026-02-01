"use client";

import { Section, SectionHeader } from "@/components/ui/section";
import { approachSteps } from "@/data";
import { Lightbulb, Code, Rocket, ArrowRight } from "lucide-react";

const icons = {
  Lightbulb,
  Code,
  Rocket,
};

export function Approach() {
  return (
    <Section id="approach">
      <SectionHeader
        title="My Approach"
        description="How I take your ideas from concept to reality"
      />

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {approachSteps.map((step, index) => {
              const Icon = icons[step.icon as keyof typeof icons];
              return (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number and icon */}
                  <div className="relative mb-6">
                    {/* Background circle */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-card rounded-xl p-6 border hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow for mobile */}
                  {index < approachSteps.length - 1 && (
                    <div className="md:hidden my-4">
                      <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
