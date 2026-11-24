import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { CONTACT_EMAIL, mailto } from "@/lib/site";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SteadyOps handles information you send by email.",
  alternates: { canonical: "/privacy" },
};
export default function Page() {
  return (
    <>
      <PageHero eyebrow="PRIVACY" title="Your information deserves care." description="Last updated 24 November 2026" />
      <section className="section container">
        <div className="prose">
          <h2>What this website collects</h2>
          <p>This website has no forms, accounts or advertising trackers. It is a static site hosted on GitHub Pages, which may keep standard server logs (such as IP address and browser type) for security and operations.</p>
          <h2>Emails you send us</h2>
          <p>If you email <a href={mailto()}>{CONTACT_EMAIL}</a>, we receive your name, email address and whatever you choose to include. We use it only to reply, assess your request and discuss a possible engagement. We don’t sell it or use it for marketing lists.</p>
          <p>Please don’t email credentials, customer personal data or confidential prompts. If we work together, we agree a secure way to share access.</p>
          <h2>Retention</h2>
          <p>Enquiries that don’t lead to an engagement are reviewed and deleted when no longer needed, normally within 12 months, unless we must keep them for legal reasons.</p>
          <h2>Client engagements</h2>
          <p>Access to systems and data during paid work is governed by the agreement for that engagement.</p>
          <h2>Your choices</h2>
          <p>Email <a href={mailto("Privacy request")}>{CONTACT_EMAIL}</a> to ask what we hold about you, or to have it corrected or deleted.</p>
        </div>
      </section>
    </>
  );
}
