import { Link, Navigate, useParams } from "react-router-dom";
import WorkMedia from "../components/WorkMedia";
import { useLocale } from "../i18n";

export default function Project() {
  const { slug } = useParams();
  const { t, projects, projectBySlug } = useLocale();
  const project = slug ? projectBySlug(slug) : undefined;
  if (!project) return <Navigate to="/work" replace />;

  const related = projects
    .filter((p) => p.collection === project.collection && p.slug !== project.slug)
    .slice(0, 2);
  const gallery = project.images?.length ? project.images : [project.image];

  return (
    <article>
      <section className={`project-hero${project.fit === "contain" ? " is-portrait" : ""}`}>
        {project.fit === "contain" ? (
          <img className="project-hero-fill" src={project.image} alt="" aria-hidden="true" />
        ) : null}
        <img src={project.image} alt={project.title} />
        <div className="cap">
          <h1>
            {project.title.split(" ").slice(0, 2).join(" ")}
            <br />
            {project.title.split(" ").slice(2).join(" ")}
          </h1>
        </div>
      </section>

      <div className="project-body" data-fade="up">
        <p className="lede">{project.summary}</p>
        <div>
          <p className="copy">{project.body}</p>
          <div className="spec-grid">
            <div>
              <h3>{t.ui.reference}</h3>
              <p>{project.ref}</p>
            </div>
            <div>
              <h3>{t.ui.collection}</h3>
              <p>{project.collectionName}</p>
            </div>
            <div>
              <h3>{t.ui.idealFor}</h3>
              <p>{project.ideal}</p>
            </div>
            <div>
              <h3>{t.ui.applications}</h3>
              <p>{project.applications}</p>
            </div>
            <div>
              <h3>{t.ui.materials}</h3>
              <p>{project.materials}</p>
            </div>
            <div>
              <h3>{t.ui.finishes}</h3>
              <p>{project.finishes}</p>
            </div>
            <div>
              <h3>{t.ui.customisation}</h3>
              <p>{project.custom}</p>
            </div>
            <div>
              <h3>{t.ui.price}</h3>
              <p>{t.ui.onApplication}</p>
            </div>
          </div>
          <Link to={`/contact?project=${project.slug}`} className="project-enquire">
            {t.contact.enquireCta}
          </Link>
        </div>
      </div>

      <div className="project-gallery">
        {gallery.slice(1).map((src) => (
          <img key={src} src={src} alt="" data-fade />
        ))}
      </div>

      {related.length > 0 && (
        <>
          <div className="work-head">
            <span>
              {t.ui.relatedIn} {project.collectionName}
            </span>
            <Link to="/work">{t.ui.allWork}</Link>
          </div>
          <div className="work-grid" style={{ paddingBottom: "6vh" }}>
            {related.map((p) => (
              <Link to={`/work/${p.slug}`} className="work-card" data-fade key={p.slug}>
                <WorkMedia src={p.image} alt={p.title} fit={p.fit} position={p.position} />
                <div className="work-meta">
                  <h2>{p.title}</h2>
                  <p>
                    {p.ref} <em>{t.ui.visit}</em>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
