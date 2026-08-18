import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useLocale } from "../i18n";

export default function Process() {
  const { t } = useLocale();
  const p = t.process;

  return (
    <article>
      <section className="process-hero">
        <div className="process-hero-media">
          <img src="/images/workshop.jpg" alt={p.heroAlt} />
        </div>
        <Reveal as="h1" className="process-hero-title" text={p.heroTitle} />
      </section>

      <section className="process-intro">
        <p className="lede" data-fade="up">
          {p.introLead}
        </p>
      </section>

      <section className="process-steps">
        <div className="process-steps-head" data-fade="up">
          <h2>{p.stepsTitle}</h2>
        </div>
        <ol className="process-steps-list">
          {p.steps.map((step, i) => (
            <li className="process-step" data-fade="up" key={i}>
              <span className="process-step-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="process-materials">
        <Reveal as="h2" className="process-materials-title" text={p.materialsTitle} />
        <div className="process-materials-grid">
          {p.materials.map((m) => (
            <div className="process-material" data-fade key={m.name}>
              <h3>{m.name}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="process-sustainability">
        <div className="process-sustain-grid">
          <div className="process-sustain-label" data-fade="up">
            <h2>{p.sustainTitle}</h2>
          </div>
          <div className="process-sustain-copy">
            <p className="fn-h5" data-fade="up">
              {p.sustainLead}
            </p>
            <ul className="process-sustain-list">
              {p.sustainPoints.map((pt, i) => (
                <li data-fade="up" key={i}>
                  <strong>{pt.title}</strong>
                  <span>{pt.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="process-cta" data-fade="up">
        <h2>{p.ctaTitle}</h2>
        <Link to="/contact" className="process-cta-link">
          {p.ctaButton}
        </Link>
      </section>
    </article>
  );
}
