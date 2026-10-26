import type { Metadata } from "next";
import {
  PageHero,
  Heading,
  CTA,
  Services,
  Principles,
  WorkGrid,
  Button,
  FAQ,
  TextLink,
} from "@/components/ui";
import { Lifecycle, Pricing, ProjectDemo } from "@/components/interactive";
import { services, solutions, phases, projects } from "@/lib/content";
import { Check } from "lucide-react";
export const metadata: Metadata = {
  title: "Packages & Indicative Pricing",
  description:
    "Explore starting prices for web development, automation, AI agents and cloud consulting in INR and USD.",
  alternates: { canonical: "/pricing" },
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="PACKAGES & ENGAGEMENTS"
        title="A practical place to start."
        description="Choose a focused starting point, then shape the final scope together. Transparent expectations before implementation begins."
      />
      <section className="section container">
        <Pricing />
      </section>
      <section className="section soft">
        <div className="container faq-grid">
          <Heading eyebrow="BEFORE WE BEGIN" title="Clarity comes first." />
          <FAQ />
        </div>
      </section>
      <CTA />
    </>
  );
}
