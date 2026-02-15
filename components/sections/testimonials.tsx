"use client";

import * as React from "react";
import Image from "next/image";
import Script from "next/script";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import portfolioData from "@/data/portfolio.json";

const testimonials = portfolioData.testimonials;
const personal = portfolioData.personal;

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `Client Testimonials - ${personal.name}`,
  description: `Read what clients say about working with ${personal.name}, a ${personal.title} specializing in React, Next.js, and modern web technologies.`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: testimonials.map((testimonial, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: testimonial.name,
          jobTitle: testimonial.role,
          worksFor: {
            "@type": "Organization",
            name: testimonial.company,
          },
        },
        reviewBody: testimonial.content,
        reviewRating: {
          "@type": "Rating",
          ratingValue: testimonial.rating,
          bestRating: 5,
        },
        itemReviewed: {
          "@type": "ProfessionalService",
          name: `${personal.name} - Full-Stack Development Services`,
          description: "Professional full-stack web development services",
        },
      },
    })),
  },
};

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [direction, setDirection] = React.useState<"next" | "prev">("next");

  const goToPrevious = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const getCardIndex = (offset: number) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <Script
        id="testimonials-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section
        id="testimonials"
        className="py-20 md:py-28"
        aria-labelledby="testimonials-heading"
      >
        {/* Header */}
        <BlurFade delay={0} inView>
          <header className="text-center mb-16">
            <h2
              id="testimonials-heading"
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Client Testimonials
            </h2>
            <p className="text-muted-foreground text-lg">
              What clients and colleagues say about my development work
            </p>
          </header>
        </BlurFade>

        {/* Testimonial Content */}
        <BlurFade delay={0.1} inView>
          <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Stacked Cards */}
            <figure
              className="relative flex justify-center"
              aria-label={`Photo of ${currentTestimonial.name}`}
            >
              <div
                className="relative w-64 h-80"
                style={{ perspective: "1000px" }}
              >
                {/* Card Stack - Back cards */}
                {[2, 1].map((offset) => {
                  const cardIndex = getCardIndex(offset);
                  const testimonial = testimonials[cardIndex];
                  const rotation = offset === 2 ? 12 : 6;
                  const translateX = offset === 2 ? 24 : 12;
                  const scale = offset === 2 ? 0.9 : 0.95;
                  const zIndex = 10 - offset;

                  return (
                    <div
                      key={`back-${offset}`}
                      className={cn(
                        "absolute inset-0 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-out",
                        "bg-zinc-200 dark:bg-zinc-800"
                      )}
                      style={{
                        transform: `rotate(${rotation}deg) translateX(${translateX}px) scale(${scale})`,
                        zIndex,
                        opacity: offset === 2 ? 0.6 : 0.8,
                      }}
                      aria-hidden="true"
                    >
                      <Image
                        src={testimonial.image}
                        alt=""
                        fill
                        className="object-cover opacity-70"
                        sizes="256px"
                      />
                    </div>
                  );
                })}

                {/* Main card */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ease-out",
                    isAnimating &&
                      direction === "next" &&
                      "-translate-x-24 opacity-0 -rotate-12",
                    isAnimating &&
                      direction === "prev" &&
                      "translate-x-24 opacity-0 rotate-12"
                  )}
                  style={{ zIndex: 20 }}
                >
                  <Image
                    src={currentTestimonial.image}
                    alt={`${currentTestimonial.name}, ${currentTestimonial.role} at ${currentTestimonial.company}`}
                    fill
                    className="object-cover"
                    sizes="256px"
                    priority
                  />
                </div>

                {/* Decorative shadow beneath stack */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/10 dark:bg-black/30 blur-xl rounded-full"
                  style={{ zIndex: 0 }}
                  aria-hidden="true"
                />
              </div>
            </figure>

            {/* Right - Content */}
            <div className="space-y-6">
              {/* Visible testimonial with animation */}
              <article
                className={cn(
                  "transition-all duration-300",
                  isAnimating && "opacity-0 translate-y-2"
                )}
                aria-live="polite"
              >
                <header>
                  <h3 className="text-2xl font-bold">{currentTestimonial.name}</h3>
                  <p className="text-muted-foreground">
                    <span>{currentTestimonial.role}</span>
                    {" at "}
                    <span>{currentTestimonial.company}</span>
                  </p>
                </header>

                <blockquote className="mt-4">
                  <p className="text-muted-foreground text-lg leading-relaxed italic">
                    &ldquo;{currentTestimonial.content}&rdquo;
                  </p>
                </blockquote>
              </article>

              {/* Navigation */}
              <nav
                className="flex items-center gap-2 pt-4"
                aria-label="Testimonial navigation"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrevious}
                  disabled={isAnimating}
                  aria-label="Previous testimonial"
                  className="h-10 w-10 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  disabled={isAnimating}
                  aria-label="Next testimonial"
                  className="h-10 w-10 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Button>
                <span
                  className="ml-4 text-sm text-muted-foreground"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {currentIndex + 1} / {testimonials.length}
                </span>
              </nav>
            </div>
          </div>
        </div>
        </BlurFade>

        {/* SEO: All testimonials rendered for crawlers (visually hidden) */}
        <div className="sr-only" aria-hidden="false">
          <h3>All Client Testimonials</h3>
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              itemScope
              itemType="https://schema.org/Review"
            >
              <header>
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{testimonial.name}</span>
                  <span itemProp="jobTitle">{testimonial.role}</span>
                  <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                    <span itemProp="name">{testimonial.company}</span>
                  </span>
                </span>
              </header>
              <blockquote itemProp="reviewBody">{testimonial.content}</blockquote>
              <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content={String(testimonial.rating)} />
                <meta itemProp="bestRating" content="5" />
              </div>
              <div itemProp="itemReviewed" itemScope itemType="https://schema.org/ProfessionalService">
                <meta itemProp="name" content={`${personal.name} - Full-Stack Development Services`} />
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
