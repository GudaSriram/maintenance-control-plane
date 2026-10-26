import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact SteadyOps",
  description:
    "Discuss ongoing maintenance and the next model, prompt or API change to your production agent.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="LET’S START A CONVERSATION"
        title="Let’s look at your next agent upgrade."
        description="Tell us what your agent does, what you need to change and which task must keep working."
      />
      <section className="section container contact-grid">
        <aside className="contact-aside">
          <span className="eyebrow">TELL US ABOUT YOUR SETUP</span>
          <h2>What needs to keep working?</h2>
          <p>
            You don’t need a complete technical brief. A business challenge and
            a sense of where you want to go are enough to start.
          </p>
          {[
            [
              "01",
              "Share your setup",
              "Tell us about your agents, connected tools and the issues you want to resolve.",
            ],
            [
              "02",
              "Explore the right approach",
              "We’ll clarify requirements, constraints and possible ways forward.",
            ],
            [
              "03",
              "Agree a clear next step",
              "If we’re a good fit, we’ll agree maintenance scope, support coverage and next steps.",
            ],
          ].map(([n, t, d]) => (
            <div className="contact-step" key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
          <p>
            Based in India. Welcoming enquiries from India, the USA, UK, Europe
            and beyond.
          </p>
        </aside>
        <div className="contact-aside"><h2>Enquiries are not enabled yet.</h2><p>This website currently has no connected enquiry delivery service. Please use your existing SteadyOps contact channel to discuss your agent.</p><p>Include the task your agent handles, the change you are planning, and what must keep working.</p></div>
      </section>
    </>
  );
}
