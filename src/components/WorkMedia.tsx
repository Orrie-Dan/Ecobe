type Props = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  position?: string;
};

export default function WorkMedia({ src, alt, fit = "cover", position }: Props) {
  return (
    <div className={`work-card-media${fit === "contain" ? " is-contain" : ""}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
