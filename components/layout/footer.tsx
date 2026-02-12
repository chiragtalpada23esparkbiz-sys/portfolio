"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/chiragtalpada",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/chiragtalpada",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/chiragtalpada",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:hello@chiragtalpada.dev",
    icon: Mail,
  },
];

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();
  const isBlogPage = pathname?.startsWith("/blog");

  // Blog-specific footer - Minimal
  if (isBlogPage) {
    return (
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 py-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Chirag Talpada. All rights
            reserved.
          </p>
          <p className="mt-1">Always learning. Always building.</p>
        </div>
      </footer>
    );
  }

  // Default portfolio footer
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 xl:px-32 md-short:px-12 lg-short:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
            >
              Chirag<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Full Stack Developer building scalable web applications and
              AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Chirag Talpada. All rights
            reserved.
          </p>
          <p className="mt-1">Always learning. Always building.</p>
        </div>
      </div>
    </footer>
  );
}
