import { useEffect, useRef, useState } from "react";

const POSTER = "/images/hero-video.jpg";
const SRC = "/videos/hero-workshop.mp4";

export default function HeroVideo({ alt }: { alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("playsinline", "true");

    const kick = () => {
      video.muted = true;
      const attempt = video.play();
      if (attempt) void attempt.catch(() => {});
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") kick();
    };

    video.addEventListener("canplay", kick);
    video.addEventListener("loadeddata", kick);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", kick);
    window.addEventListener("touchstart", kick, { passive: true });
    window.addEventListener("click", kick);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) kick();
      },
      { threshold: 0.1 },
    );
    io.observe(video);

    kick();
    const started = performance.now();
    const retry = window.setInterval(() => {
      if (!video.paused && !video.ended) {
        window.clearInterval(retry);
        return;
      }
      if (performance.now() - started > 12000) {
        window.clearInterval(retry);
        return;
      }
      kick();
    }, 400);

    return () => {
      window.clearInterval(retry);
      io.disconnect();
      video.removeEventListener("canplay", kick);
      video.removeEventListener("loadeddata", kick);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", kick);
      window.removeEventListener("touchstart", kick);
      window.removeEventListener("click", kick);
      video.pause();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return <img className="hero-poster" src={POSTER} alt={alt} />;
  }

  return (
    <video
      ref={videoRef}
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      aria-label={alt}
      src={SRC}
    />
  );
}
