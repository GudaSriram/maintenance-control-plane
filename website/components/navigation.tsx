import { SiteLink } from "@/components/site-link";
import { Menu, ArrowUpRight, Layers3 } from "lucide-react";
const links = [["Who it’s for", "/#who-its-for"], ["Pricing", "/pricing"], ["About", "/about"], ["Contact", "/contact"]];
export function Navigation() {
  return (
    <header className="header">
      <div className="container nav">
        <SiteLink href="/" className="brand" aria-label="SteadyOps home">
          <Layers3 size={28} />
          <span>Steady<span>Ops</span></span>
        </SiteLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, url]) => <SiteLink key={url} href={url}>{label}</SiteLink>)}
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Toggle navigation"><Menu size={23}/><span>Menu</span></summary>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {links.map(([label,url]) => <SiteLink key={url} href={url}>{label}</SiteLink>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
