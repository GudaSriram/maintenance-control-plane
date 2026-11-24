import type { Metadata } from "next";
import { Mail, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui";
import { CONTACT_EMAIL, FOUNDER, mailto, offer } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact SteadyOps",
  description: `Email ${FOUNDER} about your agent's next model, prompt or API change. ${offer.name} from ${offer.usd}.`,
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Tell us what’s changing next."
        description={`Email ${FOUNDER} directly. A few lines about your agent is enough to start; no technical brief needed.`}
      />
      <section className="section container contact-grid">
        <div className="contact-aside">
          <span className="eyebrow">EMAIL</span>
          <a className="contact-mail" href={mailto()}>
            <Mail size={28} /> {CONTACT_EMAIL}
          </a>
          <p>Clicking the address opens a pre-filled email with these questions:</p>
          <div className="contact-template">
            <ol>
              <li>What your agent does, and who uses it</li>
              <li>The change coming up (new model, prompt, API or tool) and when</li>
              <li>The task or rule that must keep working</li>
              <li>What it’s built with (framework, model provider, where it runs)</li>
              <li>Whether you’re an agency building it for a client</li>
            </ol>
          </div>
          <a className="button" href={mailto()}>
            Email {FOUNDER} <ArrowUpRight size={17} />
          </a>
          <p style={{ marginTop: 24 }}>
            Please don’t send credentials, customer data or confidential
            prompts by email. We’ll agree a secure way to share access if we
            work together.
          </p>
        </div>
        <aside className="contact-aside">
          <span className="eyebrow">WHAT HAPPENS NEXT</span>
          <h2>Three steps, no commitment.</h2>
          {[
            ["01", "A short call", "We talk through your agent, the upcoming change and what must keep working."],
            ["02", "A fixed quote", `For most agents, a ${offer.name} from ${offer.usd} (${offer.inr} in India). You see the scope before you agree.`],
            ["03", "Evidence, then a decision", "You get the test suite and a before-and-after report. Ongoing maintenance is optional."],
          ].map(([n, t, d]) => (
            <div className="contact-step" key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
          <p>Based in India. Working with teams in India, the USA, UK, Europe and beyond.</p>
        </aside>
      </section>
    </>
  );
}
