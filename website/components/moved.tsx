import { SiteLink } from "@/components/site-link";
// Static-export friendly redirect: React 19 hoists the meta tag into <head>.
export function Moved({ to = "/" }: { to?: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <section className="page-hero">
      <meta httpEquiv="refresh" content={`0; url=${base}${to}`} />
      <div className="container">
        <span className="eyebrow">PAGE MOVED</span>
        <h1>This page has moved.</h1>
        <p><SiteLink href={to}>Continue to SteadyOps</SiteLink></p>
      </div>
    </section>
  );
}
