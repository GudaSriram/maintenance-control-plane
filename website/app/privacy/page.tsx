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
  title: "Privacy Policy Starter",
  description:
    "How SteadyOps intends to handle project enquiries. Policy starter for review before launch.",
  alternates: { canonical: "/privacy" },
};
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="PRIVACY"
        title="Your information deserves care."
        description="Privacy policy starter · Prepared for pre-launch review · 22 October 2026"
      />
      <section className="section container">
        <div className="prose">
          <div className="privacy-banner">
            This starter must be reviewed before public launch. SteadyOps must
            confirm its legal entity, contact address, processing providers,
            retention period and applicable legal obligations.
          </div>
          <h2>Information collected</h2>
          <p>
            The enquiry form collects your name, business email, company,
            country, service interest, budget, timeline and project description.
            A phone number and website are optional. Please do not include
            passwords, sensitive personal information or confidential customer
            records.
          </p>
          <h2>Why it is used</h2>
          <p>
            Enquiry information is used to assess your request, respond to you
            and discuss a potential engagement. Consent recorded on the form
            covers processing the enquiry; it is not marketing consent.
            Submission records include a timestamp, status and privacy notice
            version.
          </p>
          <h2>Service providers and security</h2>
          <p>
            Once configured, hosting, database, transactional email and
            bot-protection providers process information needed to deliver the
            service. Optional CRM or automation integrations may receive enquiry
            data. Before launch, SteadyOps must identify the selected providers
            and assess relevant international data transfers and safeguards.
          </p>
          <p>
            Access is restricted to authorized personnel and service
            credentials. Transport encryption, database access controls, input
            validation and abuse controls are used. No internet service can
            promise absolute security.
          </p>
          <h2>Retention and your choices</h2>
          <p>
            The intended default is to review unconverted enquiries after 90
            days and delete information no longer needed, subject to legal or
            contractual requirements. SteadyOps must adopt and operate an
            appropriate retention schedule before launch.
          </p>
          <p>
            You may request access, correction or deletion, or withdraw consent,
            through the project contact form. The final published policy must
            provide a verified direct privacy contact and explain applicable
            rights and complaint channels.
          </p>
          <h2>Cookies and spam protection</h2>
          <p>
            This application does not include analytics or advertising trackers.
            When enabled, Cloudflare Turnstile verifies form submissions to help
            prevent abuse. Additional analytics must be assessed and appropriate
            consent implemented before activation.
          </p>
          <h2>Updates</h2>
          <p>
            This notice should be reviewed when the processing purposes,
            providers or business details change. The current form records
            notice version 2026-10-22.
          </p>
          <TextLink href="/contact">Contact SteadyOps</TextLink>
        </div>
      </section>
    </>
  );
}
