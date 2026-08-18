import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  alt: string;
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroVideo({ src, poster, alt }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduceMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    const kick = () => {
      if (document.visibilityState === "hidden") return;
      video.muted = true;
      const attempt = video.play();
      if (attempt) void attempt.catch(() => {});
    };

    const onPlaying = () => setPlaying(true);
    const onVisible = () => {
      if (document.visibilityState === "visible") kick();
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", kick);
    video.addEventListener("loadeddata", kick);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", kick);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) kick();
      },
      { threshold: 0.15 },
    );
    io.observe(video);

    kick();
    const started = performance.now();
    const retry = window.setInterval(() => {
      if (!video.paused && !video.ended) {
        window.clearInterval(retry);
        return;
      }
      if (performance.now() - started > 8000) {
        window.clearInterval(retry);
        return;
      }
      kick();
    }, 400);

    return () => {
      window.clearInterval(retry);
      io.disconnect();
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", kick);
      video.removeEventListener("loadeddata", kick);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", kick);
      video.pause();
    };
  }, [src, reduceMotion]);

  return (
    <>
      <img className="hero-poster" src={poster} alt="" aria-hidden="true" />
      {reduceMotion ? null : (
        <video
          ref={videoRef}
          className={`hero-video${playing ? " is-playing" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-label={alt}
          src={src}
        />
      )}
    </>
  );
}
