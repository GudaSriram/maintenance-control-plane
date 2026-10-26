import { SiteLink } from "@/components/site-link";
import type { Metadata } from "next";
import { Layers3, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gudasriram.github.io/maintenance-control-plane",
  ),
  title: {
    default: "SteadyOps — Agent Reliability & Safe Upgrades",
    template: "%s | SteadyOps",
  },
  description:
    "Ongoing agent maintenance and safe upgrades. Keep critical tasks working through model, prompt and API changes.",
  openGraph: {
    type: "website",
    siteName: "SteadyOps",
    title: "Your agents work today. Keep them working through every change.",
    description:
      "Ongoing agent maintenance through model, prompt and API changes.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="ambient-sky" aria-hidden="true">
          {Array.from({ length: 42 }, (_, i) => (
            <span key={i} className={i % 7 === 0 ? "ambient-star" : "ambient-dot"}
              style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 23 + 7) % 100}%`, animationDelay: `${-(i % 9)}s`, animationDuration: `${6 + i % 5}s` }} />
          ))}
        </div>
        <SiteLink className="skip-link" href="#main">
          Skip to content
        </SiteLink>
        <Navigation />
        <main id="main">{children}</main>
        <footer>
          <div className="container">
            <div className="footer-top">
              <div>
                <SiteLink href="/" className="brand">
                  <Layers3 />
                  <span>
                    Steady<span>Ops</span>
                  </span>
                </SiteLink>
                <p>
                  Keep your agents reliable.
                  <br />
                  Make every upgrade safer.
                </p>
                <span className="footer-location">
                  Based in India. Built for a connected world.
                </span>
              </div>
              <div>
                <h4>SteadyOps</h4>
                <SiteLink href="/">Home</SiteLink><SiteLink href="/about">About</SiteLink><SiteLink href="/contact">Contact us</SiteLink>
              </div>
              <div>
                <h4>More from SteadyOps</h4>
                <SiteLink href="/services">Supporting services</SiteLink><SiteLink href="/work">Engineering examples</SiteLink><SiteLink href="/privacy">Privacy policy</SiteLink>
              </div>
            </div>
            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} SteadyOps. All rights reserved.
              </span>
              <span>Engineering with purpose.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
