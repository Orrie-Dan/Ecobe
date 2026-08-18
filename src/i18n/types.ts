export type Lang = "en" | "fr";

export type CollectionId =
  | "living"
  | "workspace"
  | "hospitality"
  | "institutional"
  | "outdoor"
  | "steel";

export type ProjectCopy = {
  title: string;
  meta: string;
  summary: string;
  body: string;
  ideal: string;
  applications: string;
  materials: string;
  finishes: string;
  custom: string;
};

export type Dictionary = {
  nav: { to: string; label: string }[];
  ui: {
    menu: string;
    close: string;
    email: string;
    order: string;
    navigation: string;
    media: string;
    address: string;
    hours: string;
    hoursLines: [string, string, string];
    phone: string;
    allRights: string;
    visit: string;
    seeAll: string;
    selectedWork: string;
    allWork: string;
    relatedIn: string;
    all: string;
    piece: string;
    pieces: string;
    gridView: string;
    listView: string;
    galleryView: string;
    reference: string;
    collection: string;
    idealFor: string;
    applications: string;
    materials: string;
    finishes: string;
    customisation: string;
    price: string;
    onApplication: string;
    founded: string;
    workshop: string;
    services: string;
    language: string;
  };
  home: {
    heroAlt: string;
    tagline: string;
    caption1: string;
    caption2: string;
    introAlt: string;
    servicesBody: string;
    factsLede: string;
    marquee: string[];
    chapter1Title: string;
    sketchAlt: string;
    chapter1Lead: string;
    chapter1Label: string;
    chapter1Body: string;
    workshopNotes: string;
    workshopNotesItems: string[];
    chapter2Title: string;
    chapter2Lead: string;
    chapter2Body: string;
    statsTitle: string;
    statsP1: string;
    statsP2: string;
    yearsLabel: string;
    productsLabel: string;
    disciplinesLabel: string;
    workshopLabel: string;
  };
  about: {
    heroAlt: string;
    heroTitle: string;
    philosophy: string;
    philosophyBody: string;
    workshopTitle: string;
    workshopP1: string;
    workshopP2: string;
  };
  contact: {
    heroTitle: string;
    heroLead: string;
    workshop: string;
    address: string;
    tin: string;
    whatsapp: string;
    map: string;
    emailField: string;
    whatsappCta: string;
    mailCta: string;
    sent: string;
    sentLead: string;
    sentMail: string;
    sentMailLead: string;
    mailError: string;
    mailSending: string;
    mailNeedEmail: string;
    regarding: string;
    regardingClear: string;
    enquireCta: string;
    name: string;
    organisation: string;
    telephone: string;
    interest: string;
    interests: string[];
    brief: string;
    placeholder: string;
    submit: string;
    submitting: string;
    mailSubject: string;
    mailName: string;
    mailOrg: string;
    mailPhone: string;
    mailInterest: string;
    mailProject: string;
  };
  work: {
    heroTitle: string;
    heroLead: string;
  };
  process: {
    heroAlt: string;
    heroTitle: string;
    introLead: string;
    stepsTitle: string;
    steps: { title: string; body: string }[];
    materialsTitle: string;
    materials: { name: string; body: string }[];
    sustainTitle: string;
    sustainLead: string;
    sustainPoints: { title: string; body: string }[];
    ctaTitle: string;
    ctaButton: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  privacy: {
    title: string;
    updated: string;
    sections: { heading: string; body: string }[];
  };
  reasonsTitles: {
    a: [string, string];
    b: [string, string];
  };
  reasons: { n: string; title: string; body: string }[];
  sites: { kind: string; place: string; line: string }[];
  workshop: { image: string; name: string; role: string; contain?: boolean }[];
  collections: { id: CollectionId; name: string; blurb: string; image: string }[];
  projects: Record<string, ProjectCopy>;
};
