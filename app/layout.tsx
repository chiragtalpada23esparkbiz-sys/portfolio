import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";
import {
  PersonJsonLd,
  WebsiteJsonLd,
  WorkExperienceJsonLd,
  EducationJsonLd,
} from "@/components/seo/json-ld";
import { ChatProvider } from "@/components/chat/chat-context";
import { ChatModal } from "@/components/chat/chat-modal";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const baseUrl = process.env.BASE_URL || "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl || "https://chiragtalpada.dev"),
  title: {
    default: "Chirag Talpada | Full Stack Developer",
    template: "%s | Chirag Talpada",
  },
  description:
    "Full Stack Developer with 3+ years of experience specializing in React, Next.js, Node.js, GraphQL, and AI-powered applications. Building scalable web solutions at eSparkBiz.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "GraphQL Developer",
    "AI Developer",
    "LangChain",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Chirag Talpada",
  ],
  authors: [{ name: "Chirag Talpada", url: "https://chiragtalpada.dev" }],
  creator: "Chirag Talpada",
  publisher: "Chirag Talpada",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chiragtalpada.dev",
    siteName: "Chirag Talpada Portfolio",
    title: "Chirag Talpada | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and AI-powered applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chirag Talpada - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirag Talpada | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and AI-powered applications.",
    images: ["/og-image.png"],
    creator: "@chiragtalpada",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/face_shot.webp"
          imageSrcSet="/_next/image?url=%2Fface_shot.webp&w=640&q=75 640w, /_next/image?url=%2Fface_shot.webp&w=828&q=75 828w, /_next/image?url=%2Fface_shot.webp&w=1080&q=75 1080w"
          imageSizes="(max-width: 768px) 320px, (max-width: 1024px) 360px, 420px"
          fetchPriority="high"
        />
        <PersonJsonLd
          name="Chirag Talpada"
          jobTitle="Full Stack Developer"
          url={baseUrl}
          worksFor="eSparkBiz"
          sameAs={[
            "https://github.com/chiragtalpada",
            "https://linkedin.com/in/chiragtalpada",
            "https://twitter.com/chiragtalpada",
          ]}
        />
        <WebsiteJsonLd
          name="Chirag Talpada Portfolio"
          url={baseUrl}
          description="Full Stack Developer portfolio showcasing web development and AI projects"
        />
        <WorkExperienceJsonLd baseUrl={baseUrl} />
        <EducationJsonLd baseUrl={baseUrl} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChatProvider>
            <main className="min-h-screen">{children}</main>
            <Footer />
            <BottomNav />
            <Toaster />
            <ChatModal />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
