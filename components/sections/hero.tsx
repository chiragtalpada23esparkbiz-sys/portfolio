"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { BlurFade } from "@/components/ui/blur-fade";

const roles = [
  "Full-Stack SaaS Apps",
  "AI-Powered Solutions",
  "Automation-Focused Systems",
  "Modern Web Apps",
];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = React.useState(0);
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      setKey((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-fit lg:min-h-[calc(100vh-4rem)] lg-short:min-h-fit flex items-start lg:items-center overflow-hidden group/hero"
    >
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 -z-10 pointer-events-auto" aria-hidden="true">
        <InteractiveGrid />
      </div>

      <div className="container mx-auto px-4 xl:px-32 md-short:px-12 lg-short:px-20 pt-12 pb-8 sm:pt-16 sm:pb-12 lg:pt-12 lg:pb-6 md-short:pt-16 md-short:pb-4 lg-short:pt-24 lg-short:pb-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 md-short:gap-6 lg-short:gap-6 items-center">
          {/* Left Column - Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-4 md-short:space-y-3 lg-short:space-y-3">
            {/* Name */}
            <BlurFade delay={0} direction="up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl md-short:text-4xl lg-short:text-4xl font-bold tracking-tight">
                Chirag Talpada
              </h1>
            </BlurFade>

            {/* Role with rotating text */}
            <BlurFade delay={0.1} direction="up">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-base sm:text-xl md:text-2xl lg:text-xl xl:text-2xl md-short:text-xl lg-short:text-lg">
                <span className="text-muted-foreground">I build</span>
                <span className="relative shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 md-short:px-3 md-short:py-1.5 lg-short:px-2.5 lg-short:py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                  <span
                    key={key}
                    className="inline-block font-semibold text-foreground text-sm sm:text-lg md:text-xl lg:text-lg xl:text-xl md-short:text-lg lg-short:text-base animate-[slideInBlur_0.4s_ease-out]"
                  >
                    {roles[currentRoleIndex]}
                  </span>
                </span>
                {/* Hidden text for SEO - all roles visible to search engines */}
                <span className="sr-only">
                  Full-Stack SaaS Apps, AI-Powered Solutions, Automation-Focused
                  Systems, and Modern Web Apps
                </span>
              </div>
            </BlurFade>

            {/* Description */}
            <BlurFade delay={0.2} direction="up">
              <p className="text-muted-foreground text-base sm:text-lg lg:text-base xl:text-lg md-short:text-base lg-short:text-sm max-w-2xl leading-relaxed">
                JavaScript-enthusiastic full-stack developer with 3+ years of
                experience building scalable web applications and AI-powered
                products. I specialize in React and Next.js on the frontend, build
                reliable backend systems with Node.js, and integrate AI agents,
                RAG-based chatbots, and automation workflows to deliver
                production-ready solutions on modern cloud architectures. I also
                leverage tools like Cursor, ChatGPT, and Claude Code to boost
                development productivity.
              </p>
            </BlurFade>

            {/* Social Buttons */}
            <BlurFade delay={0.3} direction="up">
              <nav aria-label="Social links and actions" className="flex flex-wrap gap-2 sm:gap-3 lg:gap-2 md-short:gap-2">
                <Button
                  variant="outline"
                  size="default"
                  className="sm:text-base"
                  asChild
                >
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=chiragtalpada0227@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    suppressHydrationWarning
                  >
                    Gmail
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="sm:text-base"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/chirag-talpada"
                    target="_blank"
                    rel="noopener noreferrer"
                    suppressHydrationWarning
                  >
                    LinkedIn
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="sm:text-base"
                  asChild
                >
                  <a
                    href="/chirag_talpada_cv.pdf"
                    download
                    suppressHydrationWarning
                  >
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                    Download CV
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="sm:text-base"
                  asChild
                >
                  <Link href="#projects">Projects</Link>
                </Button>
              </nav>
            </BlurFade>

            {/* Contact Info Row */}
            <BlurFade delay={0.4} direction="up">
              <address className="not-italic flex flex-wrap items-center gap-3 sm:gap-6 lg:gap-4 md-short:gap-4 lg-short:gap-3 text-xs sm:text-sm md-short:text-sm lg-short:text-xs text-muted-foreground pt-2 lg:pt-2 md-short:pt-1 lg-short:pt-1">
                <div className="hidden sm:flex items-center gap-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <a href="mailto:chiragtalpada0227@gmail.com">chiragtalpada0227@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" aria-hidden="true" />
                  <span>Gujarat, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
                  <span>Available for work</span>
                </div>
              </address>
            </BlurFade>
          </div>

          {/* Right Column - Profile Image */}
          <BlurFade delay={0.2} direction="right">
            <div className="relative flex justify-center lg:justify-end">
              <figure className="relative">
                {/* Online Badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground text-background text-sm font-medium" aria-label="Status: Online">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Online
                </div>

                {/* Profile Image Container */}
                <div className="hover:shadow-2xl relative w-70 h-87.5 sm:w-[320px] sm:h-100 md:w-90 md:h-112.5 lg:w-95 lg:h-118.75 xl:w-105 xl:h-131.25 md-short:w-70 md-short:h-87.5 lg-short:w-[320px] lg-short:h-100 lg:max-h-[calc(100vh-8rem)] rounded-2xl shadow-2xl aspect-4/5 overflow-hidden">
                  <Image
                    src="/face_shot.webp"
                    alt="Chirag Talpada - Full Stack JavaScript Developer specializing in React, Next.js, Node.js, and AI-powered solutions"
                    fill
                    className="object-cover z-0"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 360px, (max-width: 1280px) 380px, 420px"
                    quality={80}
                  />
                </div>
                <figcaption className="sr-only">Profile photo of Chirag Talpada</figcaption>
              </figure>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
