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
  title: "End-to-End Implementation",
  description:
    "A transparent delivery lifecycle from discovery and architecture to operations and optimization.",
  alternates: { canonical: "/implementation" },
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="HOW WE DELIVER"
        title="From Idea to Implementation. And Beyond."
        description="A coordinated delivery lifecycle, with clear decisions, reviewable milestones and an agreed path into operations."
      />
      <section className="section process-section">
        <div className="container">
          <Lifecycle />
        </div>
      </section>
      <section className="section container">
        <Heading
          eyebrow="CLARITY AT EVERY STAGE"
          title="A process designed to keep you involved."
          description="The depth of each phase depends on the engagement. We agree responsibilities, deliverables and acceptance criteria before work begins."
        />
        <div className="phase-details mt-12">
          {phases.map(([name, description, output], i) => (
            <article key={name}>
              <span className="number">0{i + 1}</span>
              <h3>{name}</h3>
              <p>{description}</p>
              <small>Typical deliverable: {output}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="section soft">
        <div className="container split">
          <Heading
            eyebrow="DELIVERY WITH OWNERSHIP"
            title="No black boxes. No ambiguous handoffs."
          />
          <div>
            <p>
              Changes to scope are discussed before implementation. Key
              decisions and dependencies are documented, and release readiness
              is assessed against the agreed criteria.
            </p>
            <p>
              Support scope, monitoring ownership, response expectations and
              ongoing costs are agreed separately. We make these
              responsibilities visible before launch.
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
