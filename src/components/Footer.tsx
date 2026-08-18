import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFooterHeaderHide } from "./Header";
import { company } from "../data";
import { useLocale } from "../i18n";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  useFooterHeaderHide(ref);
  const { t } = useLocale();
  const { pathname } = useLocation();
  const workMatch = pathname.match(/^\/work\/([^/]+)$/);
  const orderTo = workMatch ? `/contact?project=${encodeURIComponent(workMatch[1])}` : "/contact";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("in-view", entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-grid">
        <Link to="/" className="footer-brand" aria-label={company.name}>
          <span>ECOBE</span>
          <span>Trading</span>
          <span className="is-serif">Company</span>
        </Link>

        <p className="footer-label is-nav">{t.ui.navigation}</p>
        <ul className="footer-list is-nav">
          {t.nav.map((item, i) => (
            <li key={item.to} className={i === 4 ? "is-break" : undefined}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
          <li>
            <Link to={orderTo}>{t.ui.order}</Link>
          </li>
        </ul>

        <p className="footer-label is-media">{t.ui.media}</p>
        <ul className="footer-list is-media">
          <li>
            <a href={company.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </li>
          <li>
            <a href={`tel:${company.phoneIntl}`}>{t.ui.phone}</a>
          </li>
          <li>
            <a href={`mailto:${company.email}`}>{t.ui.email}</a>
          </li>
        </ul>

        <p className="footer-label is-address">{t.ui.address}</p>
        <ul className="footer-list is-address">
          <li>{company.address}</li>
          <li>{company.country}</li>
        </ul>

        <p className="footer-label is-hours">{t.ui.hours}</p>
        <ul className="footer-list is-hours">
          {t.ui.hoursLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="footer-mark" aria-hidden="true">
        <svg
          className="footer-mark-svg"
          viewBox="0 0 1860 560"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <text
            x="20"
            y="490"
            textLength="1820"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
          >
            ECOBE
          </text>
        </svg>
      </div>

      <div className="footer-bottom">
        <span>{t.ui.allRights}</span>
        <Link to="/privacy">{t.privacy.title}</Link>
        <span>TIN {company.tin}</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
