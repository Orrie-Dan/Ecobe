import { useEffect, useRef, useState, type RefObject } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { company } from "../data";
import { useLocale, type Lang } from "../i18n";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [away, setAway] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useLocale();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onHide = (e: Event) => {
      setAway(Boolean((e as CustomEvent<boolean>).detail));
    };
    window.addEventListener("ecobe:header-hide", onHide as EventListener);
    return () => window.removeEventListener("ecobe:header-hide", onHide as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`header${away && !open ? " is-away" : ""}${open ? " is-open" : ""}`}>
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-lines">
            <span>ECOBE</span>
            <span>Trading</span>
            <span className="is-serif">Company</span>
          </span>
        </Link>
        <div className="header-end">
          <nav className="nav" aria-label="Primary">
            <span className="nav-lines">
              {t.nav.map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [item.to === "/" ? "is-home" : "", isActive ? "is-active" : ""]
                      .filter(Boolean)
                      .join(" ") || undefined
                  }
                >
                  {`${item.label}${i < t.nav.length - 1 ? "," : ""}`}
                </NavLink>
              ))}
            </span>
          </nav>
          <LangSwitch lang={lang} setLang={setLang} label={t.ui.language} />
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.ui.close : t.ui.menu}
          </button>
        </div>
      </header>
      <nav
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <div className="mobile-menu-links">
          {t.nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${0.04 + i * 0.05}s` }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="mobile-menu-meta">
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}

function LangSwitch({
  lang,
  setLang,
  label,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  label: string;
}) {
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {(["en", "fr"] as Lang[]).map((code) => (
        <button
          key={code}
          type="button"
          className={lang === code ? "is-on" : undefined}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/** Hide header while footer occupies the top of the viewport (Kononenko footer pin). */
export function useFooterHeaderHide(ref: RefObject<HTMLElement | null>) {
  const hidden = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const emit = (next: boolean) => {
      if (next === hidden.current) return;
      hidden.current = next;
      window.dispatchEvent(new CustomEvent("ecobe:header-hide", { detail: next }));
    };

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      emit(r.top <= 0 && r.bottom > 0);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      emit(false);
    };
  }, [ref]);
}
