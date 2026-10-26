"use client";
import { SiteLink } from "@/components/site-link";
import { useState } from "react";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import { phases, packages, projects } from "@/lib/content";
export function Lifecycle() {
  const [active, setActive] = useState(0);
  return (
    <div className="lifecycle">
      <div
        className="phase-tabs"
        role="tablist"
        aria-label="Delivery lifecycle"
      >
        {phases.map(([name], i) => (
          <button
            key={name}
            id={`phase-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="phase-panel"
            tabIndex={active === i ? 0 : -1}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 7
                      : (active + (e.key === "ArrowRight" ? 1 : 7)) % 8;
                setActive(next);
                document.getElementById(`phase-${next}`)?.focus();
              }
            }}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {name}
          </button>
        ))}
      </div>
      <div
        className="phase-panel"
        id="phase-panel"
        role="tabpanel"
        aria-labelledby={`phase-${active}`}
        tabIndex={0}
      >
        <div className="phase-big">0{active + 1}</div>
        <div>
          <span className="eyebrow">THE DELIVERY LIFECYCLE</span>
          <h3>{phases[active][0]}</h3>
          <p>{phases[active][1]}</p>
          <div className="deliverable">
            <Check size={17} /> {phases[active][2]}
          </div>
        </div>
        <ArrowRight className="phase-arrow" size={40} />
      </div>
    </div>
  );
}
export function Pricing() {
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");
  return (
    <>
      <div className="currency" role="group" aria-label="Pricing region">
        <button
          aria-pressed={currency === "inr"}
          onClick={() => setCurrency("inr")}
        >
          India · INR
        </button>
        <button
          aria-pressed={currency === "usd"}
          onClick={() => setCurrency("usd")}
        >
          International · USD
        </button>
      </div>
      <div className="pricing-grid">
        {packages.map((p, i) => (
          <article key={p.name} className={i === 1 ? "featured" : ""}>
            <span className="eyebrow">
              0{i + 1} / {i === 3 ? "TAILORED ENGAGEMENT" : "DEFINED SCOPE"}
            </span>
            <h3>{p.name}</h3>
            <small>
              {i === 3 ? "Based on your requirements" : "Starting at"}
            </small>
            <div className="price">{p[currency]}</div>
            <ul>
              {p.items.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <SiteLink
              className="button secondary"
              href={`/contact?service=${encodeURIComponent(p.service)}`}
            >
              Discuss this package
              <ArrowUpRight size={15} />
            </SiteLink>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Indicative starting prices. Final scope and pricing are agreed in a
        proposal. Hosting, third-party subscriptions, AI usage and taxes may be
        charged separately.
      </p>
    </>
  );
}
export function ProjectDemo({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug)!;
  const [step, setStep] = useState(0);
  const [time, setTime] = useState("10:30");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  return (
    <div className="demo-box">
      <div className="demo-toolbar">
        <span className="tiny-dot" /> INTERACTIVE DEMONSTRATION{" "}
        <span>Local example · no data sent</span>
      </div>
      {slug === "clinic-booking" ? (
        <div className="demo-body">
          <h3>Request a consultation slot</h3>
          <p>Select a preferred time to see the enquiry handoff.</p>
          <div className="slot-buttons">
            {["09:00", "10:30", "14:00"].map((t) => (
              <button
                key={t}
                aria-pressed={time === t}
                onClick={() => {
                  setTime(t);
                  setStep(0);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="button" onClick={() => setStep(1)}>
            Preview request <ArrowRight size={16} />
          </button>
          {step > 0 && (
            <p role="status" className="demo-result">
              Example request prepared for {time}. A clinic administrator would
              confirm availability. No booking was made.
            </p>
          )}
        </div>
      ) : slug === "ai-support" ? (
        <div className="demo-body">
          <h3>A support assistant, with boundaries.</h3>
          <p>Try “services”, “pricing” or a question that needs a person.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAnswer(
                /price|pricing|cost/i.test(question)
                  ? "Indicative packages start at ₹15,000 / $350 for Web Launch. Final scope requires a consultation. Source: Service packages."
                  : /service|offer/i.test(question)
                    ? "SteadyOps covers web development, AI agents, business automation and cloud engineering. Source: Services overview."
                    : "This question needs a team member. A production assistant would offer human escalation.",
              );
            }}
          >
            <label htmlFor="demo-question">Your question</label>
            <div className="demo-input">
              <input
                id="demo-question"
                required
                maxLength={300}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button className="button">
                Ask <ArrowRight size={16} />
              </button>
            </div>
          </form>
          {answer && (
            <p role="status" className="demo-result">
              {answer}
              <small>Scripted demonstration; not a live AI response.</small>
            </p>
          )}
        </div>
      ) : (
        <div className="demo-body">
          <h3>
            {slug === "cloud-pipeline"
              ? "Walk through a controlled release."
              : "Follow an enquiry through the workflow."}
          </h3>
          <div className="demo-steps">
            {project.flow.map((f, i) => (
              <div key={f} className={i <= step ? "complete" : ""}>
                <span>{i < step ? "✓" : `0${i + 1}`}</span>
                {f}
              </div>
            ))}
          </div>
          <p role="status">
            {step === 3
              ? "Demonstration complete. No external system was changed."
              : step === 2
                ? "A person reviews the proposed action before continuing."
                : `Current stage: ${project.flow[step]}`}
          </p>
          <button
            className="button"
            onClick={() => setStep(step === 3 ? 0 : step + 1)}
          >
            {step === 3
              ? "Reset walkthrough"
              : step === 2
                ? "Approve example action"
                : "Continue walkthrough"}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
