import { Link } from "react-router-dom";
import { useLocale } from "../i18n";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <section className="not-found">
      <span className="not-found-code">404</span>
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.body}</p>
      <Link to="/" className="not-found-link">
        {t.notFound.cta}
      </Link>
    </section>
  );
}
