"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  validUntil?: string;
  credentialId: string;
  description: string;
  skills: string[];
  verifyUrl: string;
}

const certifications: Certification[] = [
  {
    id: "github-actions",
    title: "GitHub Actions Professional Certificate",
    issuer: "GitHub",
    date: "September 10, 2023",
    credentialId: "GH-PRO-16925-2023",
    description:
      "Certification showing expertise in building automated workflows and CI/CD pipelines with GitHub Actions.",
    skills: ["GitHub Actions", "DevOps"],
    verifyUrl: "#",
  },
  {
    id: "aws-solutions-architect",
    title: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    date: "June 15, 2023",
    validUntil: "June 15, 2026",
    credentialId: "AWS-12345-9876",
    description:
      "Advanced AWS certification demonstrating expertise in designing distributed systems and applications on AWS platform.",
    skills: ["AWS", "Docker", "Kubernetes"],
    verifyUrl: "#",
  },
  {
    id: "google-cloud",
    title: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "March 20, 2023",
    validUntil: "March 20, 2025",
    credentialId: "GCP-78901-2023",
    description:
      "Professional certification for designing and managing solutions on Google Cloud Platform.",
    skills: ["GCP", "Cloud Architecture", "Terraform"],
    verifyUrl: "#",
  },
  {
    id: "kubernetes",
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "January 20, 2023",
    validUntil: "January 20, 2026",
    credentialId: "CKA-45678-2023",
    description:
      "Certification demonstrating skills in Kubernetes cluster administration and container orchestration.",
    skills: ["Kubernetes", "Docker", "Linux"],
    verifyUrl: "#",
  },
];

export function Certifications() {
  return (
    <Section id="certifications" className="py-20 md:py-28">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Certifications
        </h2>
        <p className="text-muted-foreground text-lg">
          Professional credentials and certifications
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {certifications.map((cert) => (
          <CertificateCard key={cert.id} certification={cert} />
        ))}
      </div>
    </Section>
  );
}

function CertificateCard({ certification }: { certification: Certification }) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-900 text-white p-6 shadow-xl">
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-yellow-500" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-yellow-500" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-yellow-500" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-yellow-500" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-4 py-4">
        {/* Date */}
        <p className="text-gray-400 text-sm">{certification.date}</p>

        {/* Certificate label */}
        <div>
          <p className="text-yellow-500 font-semibold tracking-wider">
            CERTIFICATE
          </p>
          <p className="text-gray-500 text-sm">for</p>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold px-4">{certification.title}</h3>

        {/* Description */}
        <p className="text-gray-400 text-sm px-4 line-clamp-2">
          {certification.description}
        </p>

        {/* Issuer */}
        <p className="font-medium">{certification.issuer}</p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2">
          {certification.skills.map((skill) => (
            <Badge
              key={skill}
              className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/30"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Validity */}
        {certification.validUntil && (
          <p className="text-gray-400 text-sm">
            Valid Until: {certification.validUntil}
          </p>
        )}

        {/* Credential ID */}
        <div className="text-gray-500 text-xs">
          <p>Credential ID</p>
          <p>{certification.credentialId}</p>
        </div>

        {/* Verify Button */}
        <Button
          variant="outline"
          size="sm"
          className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
          asChild
        >
          <Link href={certification.verifyUrl} target="_blank">
            Verify Credential
            <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
