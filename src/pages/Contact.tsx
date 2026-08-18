import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import { company } from "../data";
import { useLocale } from "../i18n";
import {
  formatEnquiryBody,
  interestIndexFor,
  readEnquiry,
  sendEnquiryEmail,
} from "../lib/enquiry";

type Channel = "whatsapp" | "mail";

export default function Contact() {
  const [sent, setSent] = useState<Channel | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params] = useSearchParams();
  const { t, projectBySlug } = useLocale();

  const project = useMemo(() => {
    const slug = params.get("project");
    return slug ? projectBySlug(slug) : undefined;
  }, [params, projectBySlug]);

  const defaultInterest = project
    ? t.contact.interests[interestIndexFor(project.collection)]
    : t.contact.interests[0];

  const labels = {
    name: t.contact.mailName,
    org: t.contact.mailOrg,
    phone: t.contact.mailPhone,
    email: t.contact.emailField,
    interest: t.contact.mailInterest,
    project: t.contact.mailProject,
  };

  function compose(form: HTMLFormElement) {
    const fields = readEnquiry(form);
    const subject = project
      ? `${t.contact.mailSubject} — ${project.ref} — ${fields.name || "ECOBE"}`
      : `${t.contact.mailSubject} — ${fields.name || "ECOBE"}`;
    const body = formatEnquiryBody(fields, labels, project);
    return { fields, subject, body };
  }

  function sendWhatsApp(form: HTMLFormElement) {
    const { fields, subject, body } = compose(form);
    if (fields.spam) {
      setSent("whatsapp");
      return;
    }
    window.open(
      `${company.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent("whatsapp");
  }

  async function sendMail(form: HTMLFormElement) {
    const emailInput = form.elements.namedItem("email");
    if (emailInput instanceof HTMLInputElement) {
      emailInput.setCustomValidity("");
      if (!emailInput.value.trim()) {
        emailInput.setCustomValidity(t.contact.mailNeedEmail);
        emailInput.reportValidity();
        emailInput.setCustomValidity("");
        return;
      }
    }
    if (!form.reportValidity()) return;

    const { fields, subject, body } = compose(form);
    if (fields.spam) {
      setSent("mail");
      return;
    }

    setError(null);
    setSending(true);
    const result = await sendEnquiryEmail({ form, fields, subject, body, project });
    setSending(false);
    if (result.ok) {
      setSent("mail");
      return;
    }
    setError(t.contact.mailError.replace("{{email}}", company.email));
  }

  return (
    <div className="page">
      <section className="page-hero">
        <Reveal as="h1" text={t.contact.heroTitle} />
        <p data-fade="up">{t.contact.heroLead}</p>
      </section>

      <div className="contact-grid">
        <div data-fade="up">
          <h3>{t.contact.whatsapp}</h3>
          <a href={company.whatsapp} target="_blank" rel="noreferrer">
            {company.phone}
          </a>
        </div>
        <div data-fade="up">
          <h3>{t.ui.phone}</h3>
          <a href={`tel:${company.phoneIntl}`}>{company.phone}</a>
        </div>
        <div data-fade="up">
          <h3>{t.ui.email}</h3>
          <a className="is-email" href={`mailto:${company.email}`}>
            {company.email}
          </a>
        </div>
        <div data-fade="up">
          <h3>{t.contact.address}</h3>
          <a href={company.maps} target="_blank" rel="noreferrer">
            {company.address}
            <br />
            {company.country}
          </a>
        </div>
        <div data-fade="up">
          <h3>{t.ui.hours}</h3>
          <p>
            {t.ui.hoursLines[0]}
            <br />
            {t.ui.hoursLines[1]}
            <br />
            {t.ui.hoursLines[2]}
          </p>
        </div>
        <div data-fade="up">
          <h3>{t.contact.tin}</h3>
          <p>{company.tin}</p>
        </div>
      </div>

      {sent ? (
        <div className="form-sent" data-fade="up">
          <p className="form-sent-title">{sent === "mail" ? t.contact.sentMail : t.contact.sent}</p>
          <p>{sent === "mail" ? t.contact.sentMailLead : t.contact.sentLead}</p>
        </div>
      ) : (
        <>
          {project ? (
            <p className="form-regarding" data-fade="up">
              <span>{t.contact.regarding}</span>
              <Link to={`/work/${project.slug}`}>
                {project.title} · {project.ref}
              </Link>
              <Link to="/contact" className="form-regarding-clear">
                {t.contact.regardingClear}
              </Link>
            </p>
          ) : null}
          <form
            className="form"
            data-fade="up"
            onSubmit={(e) => {
              e.preventDefault();
              sendWhatsApp(e.currentTarget);
            }}
          >
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="form-field">
              <label htmlFor="name">{t.contact.name}</label>
              <input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="form-field">
              <label htmlFor="org">{t.contact.organisation}</label>
              <input id="org" name="org" autoComplete="organization" />
            </div>
            <div className="form-field">
              <label htmlFor="phone">{t.contact.telephone}</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="form-field">
              <label htmlFor="email">{t.contact.emailField}</label>
              <input id="email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="form-field is-full">
              <label htmlFor="interest">{t.contact.interest}</label>
              <select id="interest" name="interest" key={project?.slug ?? "none"} defaultValue={defaultInterest}>
                {t.contact.interests.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="form-field is-full">
              <label htmlFor="message">{t.contact.brief}</label>
              <textarea id="message" name="message" placeholder={t.contact.placeholder} required />
            </div>
            {error ? (
              <p className="form-error is-full" role="alert">
                {error}
              </p>
            ) : null}
            <div className="form-actions is-full">
              <button type="submit" disabled={sending}>
                {t.contact.whatsappCta}
              </button>
              <button
                type="button"
                className="is-ghost"
                disabled={sending}
                onClick={(e) => {
                  const form = e.currentTarget.form;
                  if (!form) return;
                  void sendMail(form);
                }}
              >
                {sending ? t.contact.mailSending : t.contact.mailCta}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
