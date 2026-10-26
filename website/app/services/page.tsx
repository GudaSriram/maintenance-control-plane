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
  title: "AI Agents, Agentic Workflows & Reliability",
  description:
    "Build, operate and maintain AI agents and agentic systems, with supporting web and cloud engineering.",
  alternates: { canonical: "/services" },
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="OUR CAPABILITIES"
        title="Build agents. Connect workflows. Keep improving."
        description="Our focus is AI agents and agentic systems: development, orchestration, reliability and ongoing maintenance."
      />
      <section className="section container">
        <Services />
      </section>
      <section className="section soft">
        <div className="container split">
          <Heading
            eyebrow="CONNECTED DELIVERY"
            title="Agents need more than a good first demo."
          />
          <div>
            <p>
              An agent needs useful tools, clear permissions and reliable integrations. Evaluation and monitoring help identify when its behaviour changes.
            </p>
            <p>
              We define those controls before launch and agree how model updates, failures and ongoing maintenance will be handled.
            </p>
            <div className="mt-6">
              <Button href="/implementation">See how we deliver</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <Heading
          eyebrow="ENGAGEMENT MODELS"
          title="Start with the scope you need."
        />
        <div className="principle-grid">
          {[
            [
              "Defined project",
              "An agreed scope, milestones and acceptance criteria for a specific delivery.",
            ],
            [
              "Focused consulting",
              "Architecture reviews, discovery and practical recommendations for your team.",
            ],
            [
              "Ongoing support",
              "Maintenance and improvements under a separately agreed support arrangement.",
            ],
          ].map(([t, d]) => (
            <article key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <TextLink href="/pricing">View indicative packages</TextLink>
        </div>
      </section>
      <section className="section container" id="supporting"><Heading eyebrow="SUPPORTING CAPABILITIES" title="Engineering around your agents." description="Websites, applications, business automation and cloud infrastructure remain available as supporting services." /><Services supporting /></section>
      <CTA />
    </>
  );
}
