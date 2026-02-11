import { Linkedin, Twitter, Facebook, Share2 } from "lucide-react";
import { CopyButton } from "./copy-button";

interface ShareCardProps {
  title: string;
  url: string;
}

export function ShareCard({ title, url }: ShareCardProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
  ];

  return (
    <div className="rounded-2xl border bg-linear-to-br from-primary/5 via-transparent to-purple-500/5 p-6 md:p-8 text-center">
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
        <Share2 className="h-6 w-6 text-primary" />
      </div>

      {/* Caption */}
      <h3 className="text-xl md:text-2xl font-bold mb-2">
        Enjoyed this article?
      </h3>
      <p className="text-muted-foreground mb-6">
        Share it with your network and let them know you&apos;re learning
        something new today!
      </p>

      {/* Share Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border bg-background text-sm font-medium transition-all duration-200 ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
            <span>{link.name}</span>
          </a>
        ))}
        <CopyButton url={url} />
      </div>
    </div>
  );
}
