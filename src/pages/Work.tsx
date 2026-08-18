import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import WorkMedia from "../components/WorkMedia";
import { useLocale, type CollectionId } from "../i18n";

type View = "grid" | "list" | "gallery";

export default function Work() {
  const [view, setView] = useState<View>("grid");
  const [filter, setFilter] = useState<CollectionId | "all">("all");
  const { t, projects } = useLocale();

  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.collection === filter)),
    [filter, projects],
  );

  const viewLabels: Record<View, string> = {
    grid: t.ui.gridView,
    list: t.ui.listView,
    gallery: t.ui.galleryView,
  };

  return (
    <div className="page">
      <section className="page-hero">
        <Reveal as="h1" text={t.work.heroTitle} />
        <p data-fade="up">{t.work.heroLead}</p>
      </section>

      <div className="filter-row">
        <button type="button" className={filter === "all" ? "is-on" : undefined} onClick={() => setFilter("all")}>
          {t.ui.all}
        </button>
        {t.collections.map((c) => (
          <button
            type="button"
            key={c.id}
            className={filter === c.id ? "is-on" : undefined}
            onClick={() => setFilter(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="toolbar">
        <span>
          {list.length} {list.length === 1 ? t.ui.piece : t.ui.pieces}
        </span>
        <div className="views">
          {(["grid", "list", "gallery"] as View[]).map((v) => (
            <button key={v} type="button" className={view === v ? "is-on" : undefined} onClick={() => setView(v)}>
              {viewLabels[v]}
            </button>
          ))}
        </div>
      </div>

      <div className={`project-grid is-${view}`}>
        {list.map((p, i) => (
          <Link
            to={`/work/${p.slug}`}
            className="work-card"
            data-fade
            data-delay={i % 2 === 1 ? "1" : undefined}
            key={p.slug}
          >
            <WorkMedia src={p.image} alt={p.title} fit={p.fit} position={p.position} />
            <div className="work-meta">
              <h2>{p.title}</h2>
              <p>
                {p.ref} · {p.collectionName} <em>{t.ui.visit}</em>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
