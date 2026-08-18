import { useEffect, useRef, type ReactNode } from "react";

const lineOpts: IntersectionObserverInit = {
  threshold: 0.22,
  rootMargin: "0px 0px -8% 0px",
};

const blockOpts: IntersectionObserverInit = {
  threshold: 0.16,
  rootMargin: "0px 0px -10% 0px",
};

function observeToggle(
  el: Element,
  className: string,
  options: IntersectionObserverInit,
) {
  const io = new IntersectionObserver(([entry]) => {
    el.classList.toggle(className, entry.isIntersecting);
  }, options);
  io.observe(el);
  return () => io.disconnect();
}

export default function Reveal({
  text,
  className,
  as: Tag = "span",
  afterLast,
  label,
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  afterLast?: ReactNode;
  /** Accessible name when `afterLast` adds visible content (e.g. count). */
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const lines = text.split("\n");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeToggle(el, "in-view", lineOpts);
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      aria-label={label ?? text.replace(/\n/g, " ")}
    >
      {lines.map((line, i) => (
        <span className="ln-mask" aria-hidden="true" key={`${i}-${line}`}>
          <span className="ln">
            {line}
            {i === lines.length - 1 && afterLast ? <> {afterLast}</> : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function RevealBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeToggle(el, "is-in", blockOpts);
  }, []);
  return (
    <div ref={ref} className={className} data-fade>
      {children}
    </div>
  );
}
