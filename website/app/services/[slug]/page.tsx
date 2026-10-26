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
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return {
    title: s?.title || "Service not found",
    description: s?.description,
    alternates: { canonical: `/services/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title={s.title}
        description={s.description}
      />
      <section className="section container split">
        <div>
          <Heading
            eyebrow="BUILT AROUND YOUR GOALS"
            title={s.short}
            description={s.outcome}
          />
          <div className="tag-list">
            {s.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="mt-8">
            <Button>Discuss Your Project</Button>
          </div>
        </div>
        <div>
          <h3>What we can help with</h3>
          <ul className="check-list">
            {s.items.map((t) => (
              <li key={t}>
                <Check size={17} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section soft">
        <div className="container split">
          <Heading
            eyebrow="A CLEAR DELIVERY PATH"
            title="Define. Build. Validate. Hand over."
          />
          <div>
            <p>
              We begin with discovery to understand your requirements, systems
              and constraints. A proposal then defines scope, dependencies,
              milestones and acceptance criteria.
            </p>
            <p>
              Implementation includes relevant testing and documentation.
              Deployment, training and support responsibilities are agreed
              before release.
            </p>
            {slug === "ai-agents" && (
              <p>
                AI designs include retrieval evaluation, prompt-injection
                safeguards, limited tool permissions and human approval for
                consequential actions. We avoid promising perfect answers or
                autonomous decisions beyond approved boundaries.
              </p>
            )}
            <div className="mt-6">
              <TextLink href="/implementation">See the full lifecycle</TextLink>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
