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
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return {
    title: p ? `${p.title} — Demo` : "Project not found",
    description: p?.description,
    alternates: { canonical: `/work/${slug}` },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageHero
        eyebrow={`${p.category} / DEMONSTRATION CONCEPT`}
        title={p.title}
        description={p.description}
      />
      <section className="section container">
        <div className="split">
          <div>
            <span className="eyebrow">THE BUSINESS PROBLEM</span>
            <h2>{p.problem}</h2>
          </div>
          <div>
            <h3>The proposed solution</h3>
            <p>{p.solution}</p>
            <div className="tag-list">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <p className="mt-6">
              Illustrative concept. No client, deployment or measured business
              outcome is claimed.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <Heading
            eyebrow="ARCHITECTURE OVERVIEW"
            title="How the pieces connect."
          />
          <div className="flow">
            {p.flow.map((f, i) => (
              <div key={f}>
                <span>0{i + 1}</span>
                {f}
              </div>
            ))}
          </div>
        </div>
        <ProjectDemo slug={slug} />
        <div className="engagement-note mt-10">
          <h3>Implementation notes</h3>
          <p>{p.summary}</p>
        </div>
        <div className="mt-8">
          <TextLink href="/work">Back to all demonstration projects</TextLink>
        </div>
      </section>
      <CTA />
    </>
  );
}
