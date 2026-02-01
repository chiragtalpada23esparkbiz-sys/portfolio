"use client";

import * as React from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Chen",
    role: "CTO at TechStart Inc.",
    content:
      "We tried to get Chirag to join our team full-time. He said he was busy 'building scalable solutions for multiple clients.' His work on our AI platform was exceptional.",
    avatar: "AC",
    bgColor: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Product Manager at InnovateLabs",
    content:
      "Chirag's ability to translate complex requirements into elegant solutions is remarkable. He delivered our workflow automation ahead of schedule with outstanding quality.",
    avatar: "SJ",
    bgColor: "from-purple-400 to-purple-600",
  },
  {
    id: 3,
    name: "Michael Roberts",
    role: "Founder at DataFlow Systems",
    content:
      "Working with Chirag was a game-changer for our startup. His full-stack expertise and attention to performance optimization significantly improved our platform's rankings.",
    avatar: "MR",
    bgColor: "from-green-400 to-green-600",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Engineering Lead at CloudScale",
    content:
      "Chirag seamlessly integrated into our team and delivered high-quality code consistently. His knowledge of GraphQL and Hasura transformed our API architecture.",
    avatar: "ED",
    bgColor: "from-orange-400 to-orange-600",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Section id="testimonials" className="py-20 md:py-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Client Testimonials
        </h2>
        <p className="text-muted-foreground text-lg">
          What people say about working with me
        </p>
      </div>

      {/* Testimonial Content */}
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Stacked Cards */}
          <div className="relative flex justify-center">
            <div className="relative w-64 h-80">
              {/* Background cards (stacked effect) */}
              <div className="absolute inset-0 rounded-2xl bg-muted/50 transform rotate-6 translate-x-4" />
              <div className="absolute inset-0 rounded-2xl bg-muted/30 transform -rotate-3 -translate-x-2" />

              {/* Main card */}
              <div
                className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${currentTestimonial.bgColor} flex items-center justify-center shadow-xl transition-all duration-500`}
              >
                <span className="text-8xl font-bold text-white/90">
                  {currentTestimonial.avatar}
                </span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">{currentTestimonial.name}</h3>
              <p className="text-muted-foreground">{currentTestimonial.role}</p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {currentTestimonial.content}
            </p>

            {/* Navigation */}
            <div className="flex items-center gap-2 pt-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="h-10 w-10 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="h-10 w-10 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              <span className="ml-4 text-sm text-muted-foreground">
                {currentIndex + 1} / {testimonials.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
