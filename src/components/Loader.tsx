import { useEffect, useState } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(onDone, 850);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <div className={`loader ${n >= 100 ? "is-done" : ""}`} aria-hidden="true">
      <div className="loader-bar" />
      <div className="loader-count">{String(n).padStart(2, "0")}</div>
    </div>
  );
}
