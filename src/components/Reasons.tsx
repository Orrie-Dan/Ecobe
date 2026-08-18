import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n";

export default function Reasons() {
  const ref = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef(false);
  const [dark, setDark] = useState(false);
  const { t } = useLocale();
  const titleA = t.reasonsTitles.a;
  const titleB = t.reasonsTitles.b;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = Math.max(1, r.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -r.top / travel));
      const nextDark = progress >= 0.48;
      if (ringRef.current) {
        ringRef.current.style.setProperty("--spin", `${progress * 48}deg`);
      }
      if (nextDark !== darkRef.current) {
        darkRef.current = nextDark;
        setDark(nextDark);
      }
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
    };
  }, []);

  return (
    <section ref={ref} className={`reasons${dark ? " is-dark" : ""}`}>
      <div className="reasons-sticky">
        <div className="reasons-titles">
          <h2
            className={`reasons-title is-a${dark ? "" : " is-active"}`}
            aria-label={titleA.join(" ")}
            aria-hidden={dark}
          >
            {titleA.map((line) => (
              <span className="ln-mask" aria-hidden="true" key={line}>
                <span className="ln">{line}</span>
              </span>
            ))}
          </h2>
          <h2
            className={`reasons-title is-b${dark ? " is-active" : ""}`}
            aria-label={titleB.join(" ")}
            aria-hidden={!dark}
          >
            {titleB.map((line) => (
              <span className="ln-mask" aria-hidden="true" key={line}>
                <span className="ln">{line}</span>
              </span>
            ))}
          </h2>
        </div>

        <div ref={ringRef} className="reasons-ring">
          <svg
            className="reasons-spokes"
            viewBox="0 0 913 913"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="reasons-fade" cx="456.5" cy="456.5" r="456.5" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" stopOpacity="0" />
                <stop offset="0.16" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="1" />
              </radialGradient>
              <mask id="reasons-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="913" height="913">
                <rect width="913" height="913" fill="url(#reasons-fade)" />
              </mask>
            </defs>
            <g mask="url(#reasons-mask)" className="reasons-spokes-g">
              {Array.from({ length: 8 }, (_, i) => {
                const a = ((i * 45 - 120) * Math.PI) / 180;
                const x = 456.5 + Math.cos(a) * 395;
                const y = 456.5 + Math.sin(a) * 395;
                return (
                  <path
                    key={i}
                    d={`M456.5,456.5 L${x.toFixed(2)},${y.toFixed(2)}`}
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                );
              })}
            </g>
          </svg>
          <div className="reasons-nums">
            {t.reasons.map((r, i) => {
              const a = ((i * 45 - 120) * Math.PI) / 180;
              const x = Math.cos(a) * 42;
              const y = Math.sin(a) * 42;
              return (
                <span
                  key={r.n}
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}vh, ${y}vh)`,
                  }}
                  title={r.title}
                >
                  {r.n}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
