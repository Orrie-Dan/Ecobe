import { useLocale } from "../i18n";
import { company } from "../data";

export default function Privacy() {
  const { t } = useLocale();

  return (
    <article className="legal">
      <section className="legal-hero">
        <h1>{t.privacy.title}</h1>
        <p>{t.privacy.updated}</p>
      </section>

      <div className="legal-body">
        {t.privacy.sections.map((s, i) => (
          <div key={i}>
            <h2>{s.heading}</h2>
            <p>{s.body.replace("{{company}}", company.legal).replace("{{email}}", company.email)}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
