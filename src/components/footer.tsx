import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./navigation";
import { site } from "@/lib/site";
import { PrivacySettings } from "./tracking";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" aria-label="Inland Digital Group home">
              <Logo />
            </Link>
            <p>
              Independent thinking.
              <br />
              Inland ambition.
            </p>
          </div>
          <div>
            <span className="eyebrow">Explore</span>
            <Link href="/web-design">Web design</Link>
            <Link href="/services">Digital growth</Link>
            <Link href="/work">Design lab</Link>
            <Link href="/about">The studio</Link>
          </div>
          <div>
            <span className="eyebrow">Around here</span>
            <Link href="/web-design/riverside">Riverside</Link>
            <Link href="/web-design/anaheim">Anaheim</Link>
            <Link href="/web-design/pomona">Pomona</Link>
            <Link href="/service-areas">
              All service areas <ArrowUpRight size={13} />
            </Link>
          </div>
          <div>
            <span className="eyebrow">Something in mind?</span>
            <Link href="/contact" className="footer-contact">
              Let’s make it
              <br />
              happen. <ArrowUpRight />
            </Link>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            {site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>}
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          inland<span>↗</span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Inland Digital Group</span>
          <span>Southern California. Forward thinking.</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <PrivacySettings />
          </div>
        </div>
      </div>
    </footer>
  );
}
