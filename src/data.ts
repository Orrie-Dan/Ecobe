import type { CollectionId } from "./i18n/types";

export const company = {
  name: "ECOBE Trading Company",
  legal: "ECOBE Trading Company Ltd",
  founded: "2017",
  city: "Kigali",
  country: "Rwanda",
  address: "Gatsata — Kigali",
  phone: "0788740022",
  phoneIntl: "+250788740022",
  email: "e.t.c.ltd2017@gmail.com",
  tin: "107148510",
  whatsapp: "https://wa.me/250788740022",
  maps: "https://www.google.com/maps/search/?api=1&query=Gatsata+Kigali+Rwanda",
};

export type ProjectBase = {
  slug: string;
  ref: string;
  collection: CollectionId;
  image: string;
  images?: string[];
  /** Portrait / tight-framed shots should not be cropped to fill the card. */
  fit?: "cover" | "contain";
  position?: string;
};

const contain = { fit: "contain" as const };

export const projectBases: ProjectBase[] = [
  {
    slug: "entrance-gate",
    ref: "ECB-STL-001",
    collection: "steel",
    image: "/images/gate.jpg",
  },
  {
    slug: "stair-balustrade",
    ref: "ECB-STL-002",
    collection: "steel",
    image: "/images/stair.jpg",
  },
  {
    slug: "balcony-balustrade",
    ref: "ECB-STL-003",
    collection: "steel",
    image: "/images/balcony.jpg",
  },
  {
    slug: "lattice-gate",
    ref: "ECB-STL-004",
    collection: "steel",
    image: "/images/gate-lattice.jpg",
  },
  {
    slug: "glazed-entrance-door",
    ref: "ECB-STL-005",
    collection: "steel",
    image: "/images/timber-door.jpg",
    ...contain,
  },
  {
    slug: "ubumwe-lounge",
    ref: "ECB-LIV-001",
    collection: "living",
    image: "/images/lounge.jpg",
  },
  {
    slug: "kivu-lounge-chair",
    ref: "ECB-LIV-002",
    collection: "living",
    image: "/images/kivu.jpg",
  },
  {
    slug: "kigezi-coffee-tables",
    ref: "ECB-LIV-003",
    collection: "living",
    image: "/images/coffee.jpg",
  },
  {
    slug: "rugari-dining",
    ref: "ECB-LIV-004",
    collection: "living",
    image: "/images/dining.jpg",
    ...contain,
  },
  {
    slug: "family-dining-storage",
    ref: "ECB-LIV-005",
    collection: "living",
    image: "/images/family-dining.jpg",
    ...contain,
  },
  {
    slug: "display-storage",
    ref: "ECB-LIV-006",
    collection: "living",
    image: "/images/storage.jpg",
    ...contain,
  },
  {
    slug: "slatted-bed",
    ref: "ECB-LIV-007",
    collection: "living",
    image: "/images/bed.jpg",
  },
  {
    slug: "infant-cot",
    ref: "ECB-LIV-008",
    collection: "living",
    image: "/images/cot.jpg",
    ...contain,
  },
  {
    slug: "cantilever-shelving",
    ref: "ECB-LIV-009",
    collection: "living",
    image: "/images/shelving.jpg",
    images: ["/images/shelving.jpg", "/images/display-stand.jpg"],
    ...contain,
  },
  {
    slug: "radius-etagere",
    ref: "ECB-LIV-010",
    collection: "living",
    image: "/images/etagere.jpg",
    ...contain,
  },
  {
    slug: "executive-desk",
    ref: "ECB-WRK-001",
    collection: "workspace",
    image: "/images/desk.jpg",
  },
  {
    slug: "study-wardrobe",
    ref: "ECB-WRK-002",
    collection: "workspace",
    image: "/images/study.jpg",
    images: ["/images/study.jpg", "/images/wardrobe.jpg"],
    ...contain,
  },
  {
    slug: "banquet-chair",
    ref: "ECB-HOS-001",
    collection: "hospitality",
    image: "/images/banquet.jpg",
  },
  {
    slug: "high-bar-table",
    ref: "ECB-HOS-002",
    collection: "hospitality",
    image: "/images/bar.jpg",
    images: ["/images/bar.jpg", "/images/hero.jpg"],
    ...contain,
  },
  {
    slug: "terrace-table",
    ref: "ECB-HOS-003",
    collection: "hospitality",
    image: "/images/terrace.jpg",
    ...contain,
  },
  {
    slug: "service-trolley",
    ref: "ECB-HOS-004",
    collection: "hospitality",
    image: "/images/trolley.jpg",
    ...contain,
  },
  {
    slug: "school-desk",
    ref: "ECB-INS-001",
    collection: "institutional",
    image: "/images/school.jpg",
  },
  {
    slug: "church-chair",
    ref: "ECB-INS-002",
    collection: "institutional",
    image: "/images/church.jpg",
  },
  {
    slug: "pedestal-lectern",
    ref: "ECB-INS-003",
    collection: "institutional",
    image: "/images/lectern.jpg",
    ...contain,
  },
  {
    slug: "tabernacle-cabinet",
    ref: "ECB-INS-004",
    collection: "institutional",
    image: "/images/tabernacle.jpg",
    ...contain,
  },
  {
    slug: "garden-dining",
    ref: "ECB-OUT-001",
    collection: "outdoor",
    image: "/images/intro.jpg",
    images: ["/images/intro.jpg", "/images/intro.jpg", "/images/chair-batch.jpg"],
  },
  {
    slug: "picnic-table",
    ref: "ECB-OUT-002",
    collection: "outdoor",
    image: "/images/picnic.jpg",
    images: ["/images/picnic.jpg", "/images/picnic-frame.jpg"],
  },
  {
    slug: "steel-garden-chair",
    ref: "ECB-OUT-003",
    collection: "outdoor",
    image: "/images/steel-chair.jpg",
    ...contain,
  },
];

export const featuredSlugs = [
  "entrance-gate",
  "stair-balustrade",
  "ubumwe-lounge",
  "garden-dining",
  "study-wardrobe",
  "picnic-table",
  "lattice-gate",
  "slatted-bed",
] as const;

export const collectionImages: Record<CollectionId, string> = {
  living: "/images/living-cover.jpg",
  workspace: "/images/office-cover.jpg",
  hospitality: "/images/outdoor-cover.jpg",
  institutional: "/images/institutional-cover.jpg",
  outdoor: "/images/hospitality-cover.jpg",
  steel: "/images/steel-cover.jpg",
};

export const workshopImages = [
  { image: "/images/workshop.jpg", contain: false },
  { image: "/images/column.jpg", contain: false },
  { image: "/images/desk.jpg", contain: false },
  { image: "/images/cart-workshop.jpg", contain: false },
  { image: "/images/drawing-sketch.png", contain: true },
  { image: "/images/stair.jpg", contain: false },
  { image: "/images/lectern.jpg", contain: false },
  { image: "/images/picnic-frame.jpg", contain: false },
] as const;
