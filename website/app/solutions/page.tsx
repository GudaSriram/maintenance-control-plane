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
  title: "Business Technology Solutions",
  description:
    "Solve practical business problems with AI, automation, web and cloud engineering.",
  alternates: { canonical: "/solutions" },
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="BUSINESS-FIRST SOLUTIONS"
        title="Start with the challenge. Build the right solution."
        description="Your business needs an outcome, not another disconnected tool. We connect practical engineering choices to the problems that matter."
      />
      <section className="section container">
        <div className="solution-list">
          {solutions.map(([title, challenge, approach, benefits, tech], i) => (
            <article id={`solution-${i}`} key={title}>
              <span className="number">0{i + 1}</span>
              <h3>{title}</h3>
              <h4>The challenge</h4>
              <p>{challenge}</p>
              <h4>Our approach</h4>
              <p>{approach}</p>
              <h4>Expected benefits</h4>
              <p>
                {benefits} Actual outcomes depend on scope, adoption and your
                operating environment.
              </p>
              <div className="tag-list">
                <span>{tech}</span>
              </div>
              <TextLink href="/contact">Discuss this challenge</TextLink>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
