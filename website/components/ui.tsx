import { SiteLink } from "@/components/site-link";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Workflow,
  Cloud,
  Layers3,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { services, projects, principles, faqs } from "@/lib/content";
export const icons = {
  code: Code2,
  workflow: Workflow,
  cloud: Cloud,
  layers: Layers3,
  spark: Sparkles,
};
export function Button({
  children,
  href = "/contact",
  secondary = false,
}: {
  children: React.ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <SiteLink className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </SiteLink>
  );
}
export function Heading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function Services({ supporting = false }: { supporting?: boolean }) {
  return (
    <div className="service-grid">
      {services.filter(s => supporting ? !["ai-agents", "agentic-workflows", "agent-reliability"].includes(s.slug) : ["ai-agents", "agentic-workflows", "agent-reliability"].includes(s.slug)).sort((a,b) => ["ai-agents", "agentic-workflows", "agent-reliability"].indexOf(a.slug) - ["ai-agents", "agentic-workflows", "agent-reliability"].indexOf(b.slug)).map((s, i) => {
        const Icon = icons[s.icon as keyof typeof icons];
        return (
          <SiteLink
            className="service-card"
            key={s.slug}
            href={`/services/${s.slug}`}
          >
            <div className="card-top">
              <Icon size={29} />
              <span>0{i + 1}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.short}</p>
            <span className="text-link">
              Explore service <ArrowUpRight size={17} />
            </span>
          </SiteLink>
        );
      })}
    </div>
  );
}
export function Architecture() {
  return (
    <div
      className="architecture"
      aria-label="Connected engineering: web experiences, intelligent automation and cloud foundations"
    >
      <div className="arch-caption">
        <span className="tiny-dot" /> THE STEADYOPS APPROACH{" "}
        <span>01 — 03</span>
      </div>
      <div className="arch-orbit">
        <div className="arch-center">
          <Layers3 size={34} />
          <strong>
            One connected
            <br />
            technology partner.
          </strong>
        </div>
        <div className="arch-node node-one">
          <Code2 />
          <span>
            Digital experiences<small>BUILD</small>
          </span>
        </div>
        <div className="arch-node node-two">
          <Workflow />
          <span>
            Intelligent workflows<small>AUTOMATE</small>
          </span>
        </div>
        <div className="arch-node node-three">
          <Cloud />
          <span>
            Cloud foundations<small>SCALE</small>
          </span>
        </div>
      </div>
      <div className="arch-bottom">
        <ShieldCheck size={16} /> Reliability at every layer <span>↗</span>
      </div>
    </div>
  );
}
export function WorkGrid() {
  return <div className="project-index">
    <div className="project-index-note"><span>ENGINEERING EXAMPLES</span><p>Illustrative projects with interactive demos. Not client case studies.</p></div>
    {projects.map((p, i) => <SiteLink className="project-entry" href={`/work/${p.slug}`} key={p.slug}>
      <span className="project-entry-number">0{i + 1}</span>
      <div className="project-entry-copy"><span className="eyebrow">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><div className="project-stack">{p.stack.map(t => <span key={t}>{t}</span>)}</div></div>
      <div className="project-entry-action">Explore demo <ArrowUpRight size={18}/></div>
    </SiteLink>)}
  </div>;
}
export function Principles() {
  return (
    <div className="principle-grid">
      {principles.map(([t, d], i) => (
        <article key={t}>
          <span className="number">0{i + 1}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </article>
      ))}
    </div>
  );
}
export function FAQ() {
  return (
    <div className="faq-list">
      {faqs.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span>+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function CTA() {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow">BUILD. OPERATE. IMPROVE.</span>
          <h2>
            Ready for Agents
            <br />
            You Can Depend On?
          </h2>
          <p>
            Tell us what your agents need to do, or where your existing
            <br className="desktop" /> systems need attention.
          </p>
        </div>
        <Button>Discuss Your Agents</Button>
      </div>
    </section>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <SiteLink className="text-link" href={href}>
      {children}
      <ArrowRight size={17} />
    </SiteLink>
  );
}
