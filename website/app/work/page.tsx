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
  title: "Demonstration Projects",
  description:
    "Explore illustrative web, AI, automation and cloud engineering concepts from SteadyOps.",
  alternates: { canonical: "/work" },
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="OUR WORK / DEMONSTRATION PROJECTS"
        title="Explore the engineering."
        description="Explore the problem, implementation approach and interactive demo behind each example."
      />
      <section className="section container">
        <WorkGrid />
      </section>
      <CTA />
    </>
  );
}
