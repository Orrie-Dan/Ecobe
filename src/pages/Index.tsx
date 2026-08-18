import { Link } from "react-router-dom";
import HeroVideo from "../components/HeroVideo";
import Reasons from "../components/Reasons";
import Reveal from "../components/Reveal";
import SketchBoard from "../components/SketchBoard";
import WorkMedia from "../components/WorkMedia";
import { company } from "../data";
import { useLocale } from "../i18n";

export default function Index() {
  const { t, featured } = useLocale();
  const marquee = [...t.home.marquee, ...t.home.marquee];

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <HeroVideo alt={t.home.heroAlt} />
        </div>
        <h1 className="hero-title">
          ECOBE
          <br />
          Trading <em>Company</em>
        </h1>
      </section>

      <section className="type-beat">
        <Reveal as="h2" className="type-beat-title" text={t.home.tagline} />
        <div className="captions">
          <p data-fade="up">{t.home.caption1}</p>
          <p data-fade="up" data-delay="1">
            {t.home.caption2}
          </p>
        </div>
      </section>

      <section className="bleed is-tall" data-fade>
        <img src="/images/intro.jpg" alt={t.home.introAlt} />
      </section>

      <section className="facts">
        <div className="facts-meta" data-fade="up">
          <div className="facts-row">
            <h3>{t.ui.founded}</h3>
            <p>{company.founded}</p>
          </div>
          <div className="facts-row">
            <h3>{t.ui.workshop}</h3>
            <p>
              Gatsata
              <br />
              Kigali, Rwanda
            </p>
          </div>
          <div className="facts-row">
            <h3>{t.ui.services}</h3>
            <p>{t.home.servicesBody}</p>
          </div>
        </div>
        <p className="facts-lede" data-fade="up" data-delay="1">
          {t.home.factsLede}
        </p>
      </section>

      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee">
          {marquee.map((item, i) => (
            <span key={`${item}-${i}`}>
              {item} <span>·</span>
            </span>
          ))}
        </div>
      </div>

      <section className="chapter">
        <Reveal className="chapter-kicker" as="h2" text={t.home.chapter1Title} />
        <div className="chapter-media is-sketch" data-fade>
          <img src="/images/drawing-sketch.png" alt={t.home.sketchAlt} />
        </div>
        <p className="chapter-lead" data-fade="up">
          {t.home.chapter1Lead}
        </p>
        <div className="chapter-copy" data-fade="up">
          <p className="label">
            {t.home.chapter1Label.split("\n").map((line, i, arr) => (
              <span key={line}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
          <p className="body">{t.home.chapter1Body}</p>
          <aside className="chapter-aside">
            <p className="aside-title">{t.home.workshopNotes}</p>
            <ul>
              {t.home.workshopNotesItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="chapter">
        <Reveal className="chapter-kicker" as="h2" text={t.home.chapter2Title} />
        <div className="chapter-media is-sketches" data-fade="up">
          <SketchBoard />
        </div>
        <p className="chapter-lead" data-fade="up">
          {t.home.chapter2Lead}
        </p>
        <div className="chapter-copy is-simple" data-fade="up">
          <p className="body">{t.home.chapter2Body}</p>
        </div>
      </section>

      <div className="work-head">
        <Reveal
          as="p"
          className="work-head-title"
          text={t.ui.selectedWork}
          label={`${t.ui.selectedWork.replace(/\n/g, " ")} (${featured.length}+)`}
          afterLast={<sup>({featured.length}+)</sup>}
        />
      </div>
      <div className="work-grid">
        {featured.map((p, i) => (
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
                {p.meta} <em>{t.ui.visit}</em>
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link className="see-all" to="/work">
        {t.ui.seeAll}
      </Link>

      <Reasons />

      <section className="stats">
        <div className="stats-intro" data-fade="up">
          <h2>
            {company.founded} {t.home.statsTitle.split("\n")[0]}
            <br />
            {t.home.statsTitle.split("\n")[1]}
          </h2>
          <div className="pair">
            <p>{t.home.statsP1}</p>
            <p>{t.home.statsP2}</p>
          </div>
        </div>
        <div className="stat-row">
          <div data-fade="up">
            <h3>8+</h3>
            <p>{t.home.yearsLabel}</p>
          </div>
          <div data-fade="up" data-delay="1">
            <h3>26+</h3>
            <p>{t.home.productsLabel}</p>
          </div>
          <div data-fade="up" data-delay="2">
            <h3>3</h3>
            <p>{t.home.disciplinesLabel}</p>
          </div>
          <div data-fade="up" data-delay="3">
            <h3>1</h3>
            <p>{t.home.workshopLabel}</p>
          </div>
        </div>
      </section>
    </>
  );
}
