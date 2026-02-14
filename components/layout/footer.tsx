"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin, Mail } from "lucide-react";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/chirag-talpada",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://x.com/CTalpada78529",
    icon: XIcon,
  },
  {
    name: "Email",
    href: "mailto:chiragtalpada0227@gmail.com",
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
            <h3 id="footer-nav-heading" className="font-semibold">Quick Links</h3>
            <nav aria-labelledby="footer-nav-heading" className="flex flex-col gap-2">
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
            <h3 id="footer-social-heading" className="font-semibold">Connect</h3>
            <nav aria-labelledby="footer-social-heading" className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Follow on ${link.name}`}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </nav>
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
