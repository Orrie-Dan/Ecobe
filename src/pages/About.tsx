import Reveal from "../components/Reveal";
import { useLocale } from "../i18n";

export default function About() {
  const { t } = useLocale();

  return (
    <article>
      <section className="about-hero">
        <div className="about-hero-media">
          <img src="/images/workshop.jpg" alt={t.about.heroAlt} />
        </div>
        <Reveal as="h1" className="about-hero-title" text={t.about.heroTitle} />
      </section>

      <section className="about-phil">
        <div className="about-grid">
          <p className="about-phil-label" data-fade="up">
            {t.about.philosophy}
          </p>
          <div className="about-phil-copy">
            <h2 className="fn-h5" data-fade="up">
              {t.about.philosophyBody}
            </h2>
            <ul className="about-sites">
              {t.sites.map((s) => (
                <li key={s.kind}>
                  <span>{s.kind}</span>
                  <span>{s.place}</span>
                  <span>{s.line}</span>
                  <svg className="about-sites-arrow" viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M2 2h6v6" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M2 8L8 2" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-team">
        <Reveal className="about-team-title" as="h2" text={t.about.workshopTitle} />
        <div className="about-team-leads">
          <p data-fade="up">{t.about.workshopP1}</p>
          <p data-fade="up" data-delay="1">
            {t.about.workshopP2}
          </p>
        </div>
        <div className="about-team-grid">
          {t.workshop.map((p, i) => (
            <figure className="about-person" data-fade key={p.name} data-delay={i % 4 === 1 ? "1" : undefined}>
              <img src={p.image} alt={p.name} className={p.contain ? "is-contain" : undefined} />
              <figcaption className="about-person-meta">
                <span>{p.name}</span>
                <span>{p.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="about-awards">
        <div className="about-grid about-awards-grid">
          {t.reasons.map((r) => (
            <article className="about-award" data-fade key={r.n}>
              <h3 className="fn-h5">{r.title}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
