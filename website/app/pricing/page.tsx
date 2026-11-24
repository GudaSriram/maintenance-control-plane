import type { Metadata } from "next";
import { Check, ArrowUpRight } from "lucide-react";
import { PageHero, Heading, FAQ } from "@/components/ui";
import { SiteLink } from "@/components/site-link";
import { offer, mailto } from "@/lib/site";
export const metadata: Metadata = {
  title: "Pricing",
  description: `${offer.name} from ${offer.usd} (${offer.inr}). Fixed price, then optional monthly maintenance for production AI agents.`,
  alternates: { canonical: "/pricing" },
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="PRICING"
        title="Start with one fixed-price check."
        description="Prove what a change does to your agent before you commit to it. Ongoing maintenance is optional and priced from what the check finds."
      />
      <section className="section container">
        <div className="price-cards">
          <article className="price-card primary">
            <span className="eyebrow">START HERE</span>
            <h2>{offer.name}</h2>
            <div className="price">From {offer.usd}</div>
            <div className="price-sub">{offer.inr} for teams in India · {offer.duration} · One agent, one planned change</div>
            <ul>
              {offer.steps.map(([title, body]) => (
                <li key={title}><Check size={16} /><span><strong>{title}.</strong> {body}</span></li>
              ))}
            </ul>
            <a className="button" href={mailto()}>Book a Migration Check <ArrowUpRight size={17} /></a>
            <p style={{ marginTop: 20, fontSize: 12 }}>
              Founding clients: the first few checks are offered at a reduced price in exchange for a short, approved case study.
            </p>
          </article>
          <article className="price-card">
            <span className="eyebrow">AFTER THE CHECK</span>
            <h2>Ongoing maintenance</h2>
            <div className="price">Monthly</div>
            <div className="price-sub">Quoted after the check, based on the number of agents and how often they change</div>
            <ul>
              {[
                "Every model, prompt, tool and API change tested before release",
                "Regressions repaired, retested and reviewed with you",
                "Gradual rollouts with the previous version kept ready",
                "Model retirement dates tracked for your providers",
                "White-label option for agencies",
              ].map((item) => (
                <li key={item}><Check size={16} /><span>{item}</span></li>
              ))}
            </ul>
            <SiteLink className="button secondary" href="/contact">Ask about maintenance <ArrowUpRight size={17} /></SiteLink>
          </article>
        </div>
      </section>
      <section className="section soft">
        <div className="container faq-grid">
          <Heading eyebrow="QUESTIONS" title="Before we begin." />
          <FAQ />
        </div>
      </section>
    </>
  );
}
