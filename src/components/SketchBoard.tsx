import { useEffect, useRef, type PointerEvent } from "react";

const pieces = [
  {
    id: "gate",
    sketch: "/images/sketch-gate.png",
    alt: "Entrance gate sketch",
  },
  {
    id: "joint",
    sketch: "/images/sketch-joint.png",
    alt: "Steel and timber joint sketch",
  },
  {
    id: "stair",
    sketch: "/images/sketch-stair.png",
    alt: "Stair balustrade sketch",
  },
  {
    id: "desk",
    sketch: "/images/sketch-desk.png",
    alt: "Steel-frame desk sketch",
  },
] as const;

export default function SketchBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.5, h: 0 });
  const cur = useRef({ x: 0.5, y: 0.5, h: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const tick = () => {
      const el = ref.current;
      const t = target.current;
      const c = cur.current;
      c.x += (t.x - c.x) * 0.12;
      c.y += (t.y - c.y) * 0.12;
      c.h += (t.h - c.h) * 0.12;
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (c.x - 0.5).toFixed(3));
        el.style.setProperty("--my", (c.y - 0.5).toFixed(3));
        el.style.setProperty("--h", c.h.toFixed(3));
        const px = r.left + c.x * r.width;
        const py = r.top + c.y * r.height;
        el.querySelectorAll<HTMLElement>(".sketch-item").forEach((item) => {
          const ir = item.getBoundingClientRect();
          item.style.setProperty("--lx", `${px - ir.left}px`);
          item.style.setProperty("--ly", `${py - ir.top}px`);
        });
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    target.current.x = (e.clientX - r.left) / r.width;
    target.current.y = (e.clientY - r.top) / r.height;
    target.current.h = 1;
  }

  function onLeave() {
    target.current.h = 0;
  }

  return (
    <div
      ref={ref}
      className="sketch-board"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {pieces.map((p) => (
        <figure className={`sketch-item is-${p.id}`} key={p.id}>
          <img className="sketch-line" src={p.sketch} alt={p.alt} />
          <img className="sketch-lens" src={p.sketch} alt="" />
        </figure>
      ))}
    </div>
  );
}
