import type { CollectionId } from "../i18n/types";

export type EnquiryFields = {
  name: string;
  org: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  spam: boolean;
};

export type EnquiryProject = {
  slug: string;
  title: string;
  ref: string;
  collectionName: string;
};

export type EnquiryLabels = {
  name: string;
  org: string;
  phone: string;
  email: string;
  interest: string;
  project: string;
};

const WEB3FORMS = "https://api.web3forms.com/submit";

export function interestIndexFor(collection: CollectionId): number {
  switch (collection) {
    case "steel":
      return 0;
    case "living":
    case "workspace":
      return 1;
    default:
      return 2;
  }
}

export function readEnquiry(form: HTMLFormElement): EnquiryFields {
  const data = new FormData(form);
  return {
    name: String(data.get("name") || "").trim(),
    org: String(data.get("org") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    email: String(data.get("email") || "").trim(),
    interest: String(data.get("interest") || "").trim(),
    message: String(data.get("message") || "").trim(),
    spam: String(data.get("website") || "").trim().length > 0,
  };
}

export function formatEnquiryBody(
  fields: EnquiryFields,
  labels: EnquiryLabels,
  project?: EnquiryProject,
): string {
  const lines = [
    `${labels.name}: ${fields.name || "—"}`,
    `${labels.org}: ${fields.org || "—"}`,
    `${labels.phone}: ${fields.phone || "—"}`,
    `${labels.email}: ${fields.email || "—"}`,
    `${labels.interest}: ${fields.interest || "—"}`,
  ];

  if (project) {
    const path = `/work/${project.slug}`;
    const href = typeof window === "undefined" ? path : `${window.location.origin}${path}`;
    lines.push(
      `${labels.project}: ${project.title} (${project.ref}) — ${project.collectionName}`,
      href,
    );
  }

  lines.push("", fields.message);
  return lines.join("\n");
}

export async function sendEnquiryEmail(input: {
  form: HTMLFormElement;
  fields: EnquiryFields;
  subject: string;
  body: string;
  project?: EnquiryProject;
}): Promise<{ ok: true } | { ok: false }> {
  const access_key = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!access_key) {
    if (import.meta.env.DEV) {
      console.warn("VITE_WEB3FORMS_KEY is not set — email enquiries cannot be delivered.");
    }
    return { ok: false };
  }

  const formData = new FormData(input.form);
  formData.delete("website");
  formData.append("access_key", access_key);
  formData.append("subject", input.subject);
  formData.append("from_name", input.fields.name || "ECOBE website");
  formData.set("message", input.body);
  if (input.project) {
    formData.append("project", `${input.project.title} (${input.project.ref})`);
  }

  try {
    const response = await fetch(WEB3FORMS, {
      method: "POST",
      body: formData,
    });
    const data = (await response.json()) as { success?: boolean };
    if (response.ok && data.success) return { ok: true };
    return { ok: false };
  } catch {
    return { ok: false };
  }
}
