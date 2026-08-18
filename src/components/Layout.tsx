import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/** Kononenko Si(6) ≈ 1.109s — wipe leave */
const WIPE_MS = 1109;
/** Kononenko Si(4) ≈ 0.424s — dim fade leave */
const FADE_MS = 424;
const WIPE_EASE = "cubic-bezier(0.8, 0, 0.2, 1)";
type LenisLike = {
  stop: () => void;
  start: () => void;
  scrollTo: (y: number, opts?: { immediate?: boolean; force?: boolean }) => void;
};

function getLenis(): LenisLike | null {
  return (window as Window & { __lenis?: LenisLike }).__lenis ?? null;
}

/** Routes that leave with the clip wipe (Kononenko gU set). */
function usesWipeLeave(pathname: string) {
  if (pathname === "/" || pathname === "/about") return true;
  return /^\/work\/[^/]+\/?$/.test(pathname);
}

function isProjectPath(pathname: string) {
  return /^\/work\/[^/]+\/?$/.test(pathname);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isCompact() {
  return window.matchMedia("(max-width: 900px)").matches;
}

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const wrapRef = useRef<HTMLDivElement>(null);
  const leaveRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef(location.pathname);
  const first = useRef(true);
  const animRef = useRef<Animation[]>([]);
  const [content, setContent] = useState<ReactNode>(outlet);
  const [leaving, setLeaving] = useState<ReactNode>(null);
  const [visible, setVisible] = useState(true);
  const [dimOn, setDimOn] = useState(false);
  const [wipeArmed, setWipeArmed] = useState(false);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-in", entry.isIntersecting);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );
    const scan = () => {
      root.querySelectorAll("[data-fade]").forEach((el) => io.observe(el));
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [content]);

  const revealInView = () => {
    const root = wrapRef.current;
    if (!root) return;
    root.querySelectorAll("[data-fade]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 40) {
        el.classList.add("is-in");
      }
    });
  };

  const finishSwap = (next: ReactNode) => {
    pathRef.current = location.pathname;
    setContent(next);
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    requestAnimationFrame(() => {
      revealInView();
      requestAnimationFrame(() => setVisible(true));
    });
  };

  const clearAnims = () => {
    animRef.current.forEach((a) => a.cancel());
    animRef.current = [];
  };

  useLayoutEffect(() => {
    if (!wipeArmed || !leaving || !leaveRef.current) return;

    const el = leaveRef.current;
    const lenis = getLenis();
    const scrollY = Math.round(window.scrollY);
    const bg =
      getComputedStyle(document.body).backgroundColor || "#f3f1ec";

    el.style.position = "fixed";
    el.style.inset = "0";
    el.style.overflow = "hidden";
    el.style.zIndex = "90";
    el.style.backgroundColor = bg;
    el.style.clipPath = "inset(0% 0% 0% 0%)";
    el.style.willChange = "clip-path";
    el.scrollTop = scrollY;

    lenis?.stop();
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    const driftMax = 250 * (window.innerHeight / 1080);
    const drift = Math.max(
      0,
      Math.min(driftMax, el.scrollHeight - el.clientHeight - el.scrollTop),
    );
    const startScroll = el.scrollTop;

    clearAnims();
    const clipAnim = el.animate(
      [
        { clipPath: "inset(0% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 100% 0%)" },
      ],
      { duration: WIPE_MS, easing: WIPE_EASE, fill: "forwards" },
    );
    animRef.current.push(clipAnim);

    const dim = document.querySelector(".page-dim");
    if (dim instanceof HTMLElement) {
      const dimAnim = dim.animate(
        [{ opacity: 0 }, { opacity: 0.8 }],
        { duration: WIPE_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
      );
      animRef.current.push(dimAnim);
    }

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / WIPE_MS);
      // approximate power2.inOut
      const e =
        p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      el.scrollTop = startScroll + drift * e;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const done = () => {
      cancelAnimationFrame(raf);
      clearAnims();
      setLeaving(null);
      setWipeArmed(false);
      if (dim instanceof HTMLElement) {
        dim.getAnimations().forEach((a) => a.cancel());
        dim.style.opacity = "";
      }
      lenis?.start();
      revealInView();
    };

    clipAnim.finished.then(done).catch(done);
    const watchdog = window.setTimeout(done, WIPE_MS + 200);
    return () => {
      window.clearTimeout(watchdog);
      cancelAnimationFrame(raf);
    };
  }, [wipeArmed, leaving]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      setContent(outlet);
      return;
    }
    if (location.pathname === pathRef.current) {
      setContent(outlet);
      return;
    }

    const from = pathRef.current;
    const next = outlet;
    clearAnims();

    if (prefersReducedMotion()) {
      pathRef.current = location.pathname;
      setLeaving(null);
      setWipeArmed(false);
      setDimOn(false);
      setContent(next);
      window.scrollTo(0, 0);
      setVisible(true);
      return;
    }

    const wipe =
      !isCompact() &&
      (usesWipeLeave(from) || isProjectPath(location.pathname));

    if (wipe) {
      setLeaving(content);
      pathRef.current = location.pathname;
      setContent(next);
      setVisible(true);
      setWipeArmed(true);
      return;
    }

    // Dim overlay fade (work listing → project, contact, etc.)
    setVisible(true);
    setDimOn(true);
    const hide = window.setTimeout(() => {
      finishSwap(next);
      requestAnimationFrame(() => {
        setDimOn(false);
      });
    }, FADE_MS);
    return () => window.clearTimeout(hide);
  }, [location.pathname, outlet]);

  return (
    <div className="site">
      <Header />
      {leaving ? (
        <div ref={leaveRef} className="page-leave" aria-hidden="true">
          <main>{leaving}</main>
          <Footer />
        </div>
      ) : null}
      <div
        ref={wrapRef}
        className={`page-fade${visible ? " is-in" : ""}${leaving ? " is-under" : ""}`}
      >
        <main>{content}</main>
        <Footer />
      </div>
      <div
        className={`page-dim${dimOn ? " is-on" : ""}`}
        aria-hidden="true"
      />
    </div>
  );
}
