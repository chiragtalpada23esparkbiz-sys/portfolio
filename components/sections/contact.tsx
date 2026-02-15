"use client";

import * as React from "react";
import Link from "next/link";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlurFade } from "@/components/ui/blur-fade";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  subject: z.string().min(4, "Subject must be at least 5 characters"),
  message: z.string().min(5, "Message must be at least 10 characters"),
  honeypot: z.string().optional(), // Honeypot field for bot detection
});

type ContactFormData = z.infer<typeof contactSchema>;

const iconMap = { email: Mail, phone: Phone, location: MapPin };
const personal = portfolioData.personal;

const contactInfo = portfolioData.contact.info.map((item) => ({
  icon: iconMap[item.type as keyof typeof iconMap],
  label: item.label,
  value: item.value,
  href: item.href,
}));

const socialLinks = portfolioData.contact.social_links;

// JSON-LD structured data for Contact Page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${personal.name}`,
  description: `Get in touch with ${personal.name} for full-stack web development, AI solutions, and software consulting services.`,
  mainEntity: {
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    email: personal.email,
    telephone: personal.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: personal.location.split(",")[0].trim(),
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: personal.phone.replace(/\s/g, ""),
      email: personal.email,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    sameAs: [personal.linkedin, personal.twitter],
  },
};

export function Contact() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMsg =
          response.status === 429
            ? "Too many requests. Please try again in a few minutes."
            : result.message || "Failed to send message";

        toast.error("Oops! Something went wrong", {
          description: errorMsg,
          icon: <AlertCircle className="h-5 w-5" />,
        });
        throw new Error(errorMsg);
      }

      setStatus("success");
      reset();

      toast.success("Message sent successfully!", {
        description:
          "Thanks for reaching out! I'll get back to you within 24-48 hours.",
        icon: (
          <Image
            src="/assistent_bot.webp"
            alt="AI Assistant"
            width={52}
            height={52}
            className="rounded-full object-cover"
          />
        ),
        duration: 6000,
      });

      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section
        id="contact"
        className="py-20 md:py-28"
        aria-labelledby="contact-heading"
      >
        {/* Header */}
        <BlurFade delay={0} inView>
          <header className="text-center mb-16">
            <h2
              id="contact-heading"
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Wherever you are in the world, let&apos;s work together on your
              next project.
            </p>
          </header>
        </BlurFade>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info - Left Column */}
            <div className="space-y-8">
              {/* Contact Information */}
              <BlurFade delay={0.1} inView>
                <div>
                  <h3 className="font-semibold text-lg mb-6">
                    Contact Information
                  </h3>
                  <address className="not-italic space-y-4">
                    {contactInfo.map((item, index) => (
                      <BlurFade
                        key={item.label}
                        delay={0.15 + index * 0.05}
                        inView
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <item.icon
                              className="h-5 w-5 text-muted-foreground"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{item.label}</p>
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                                suppressHydrationWarning
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-muted-foreground text-sm">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </BlurFade>
                    ))}
                  </address>
                </div>
              </BlurFade>

              {/* Follow Me */}
              <BlurFade delay={0.3} inView>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Follow Me</h3>
                  <nav
                    aria-label="Social media links"
                    className="flex flex-wrap gap-2"
                  >
                    {socialLinks.map((link) => (
                      <Button
                        key={link.label}
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </Link>
                      </Button>
                    ))}
                  </nav>
                </div>
              </BlurFade>
            </div>

            {/* Contact Form - Right Column */}
            <BlurFade delay={0.2} inView>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold text-lg mb-6">Send a Message</h3>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                  suppressHydrationWarning
                  aria-label="Contact form"
                >
                  {/* Honeypot field - hidden from users, visible to bots */}
                  <input
                    type="text"
                    {...register("honeypot")}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      autoComplete="name"
                      {...register("name")}
                      className={
                        errors.name ? "border-destructive" : "" + "mt-1"
                      }
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        className="text-sm text-destructive"
                        role="alert"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      {...register("email")}
                      className={
                        errors.email ? "border-destructive" : "" + "mt-1"
                      }
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-sm text-destructive"
                        role="alert"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      {...register("subject")}
                      className={
                        errors.subject ? "border-destructive" : "" + "mt-1"
                      }
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={
                        errors.subject ? "subject-error" : undefined
                      }
                    />
                    {errors.subject && (
                      <p
                        id="subject-error"
                        className="text-sm text-destructive"
                        role="alert"
                      >
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={4}
                      {...register("message")}
                      className={
                        errors.message ? "border-destructive" : "" + "mt-1"
                      }
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="text-sm text-destructive"
                        role="alert"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    disabled={status === "loading"}
                    aria-busy={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="animate-spin mr-2" aria-hidden="true">
                          ⏳
                        </span>
                        Sending...
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Message Sent!
                      </>
                    ) : status === "error" ? (
                      <>
                        <AlertCircle
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Failed to Send
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </div>
            </BlurFade>
          </div>
        </div>
      </Section>
    </>
  );
}
