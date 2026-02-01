"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  "Full-Stack SaaS Apps",
  "AI-Powered Solutions",
  "GraphQL APIs",
  "Modern Web Apps",
];

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Gradient overlay at top */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Chirag Talpada
            </h1>

            {/* Role with rotating text */}
            <div className="flex items-center gap-3 text-xl md:text-2xl">
              <span className="text-muted-foreground">I build</span>
              <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 font-medium transition-all duration-500">
                {roles[currentRoleIndex]}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              Passionate full-stack developer with 3+ years of experience
              building scalable web applications and AI-powered solutions.
              Specialized in React, Next.js, AI, and modern cloud technologies!
            </p>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/chiragtalpada"
                  target="_blank"
                  rel="noopener noreferrer"
                  suppressHydrationWarning
                >
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://linkedin.com/in/chiragtalpada"
                  target="_blank"
                  rel="noopener noreferrer"
                  suppressHydrationWarning
                >
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://twitter.com/chiragtalpada"
                  target="_blank"
                  rel="noopener noreferrer"
                  suppressHydrationWarning
                >
                  Twitter
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#projects">Projects</Link>
              </Button>
            </div>

            {/* Contact Info Row */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@chiragtalpada.dev</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>open</span>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Online Badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground text-background text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online
              </div>

              {/* Profile Image Container */}
              <div className="relative w-[320px] h-[400px] md:w-[420px] md:h-[520px] lg:w-[480px] lg:h-[580px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/face_shot.jpg"
                  alt="Chirag Talpada - Full Stack Developer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 420px, 480px"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
