import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { featuredSlugs, projectBases, type ProjectBase } from "../data";
import type { CollectionId, Dictionary, Lang, ProjectCopy } from "./types";
import { en } from "./en";
import { fr } from "./fr";

const catalogs: Record<Lang, Dictionary> = { en, fr };
const STORAGE_KEY = "ecobe-lang";

export type LocalizedProject = ProjectBase &
  ProjectCopy & {
    collectionName: string;
  };

type LocaleContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  projects: LocalizedProject[];
  featured: LocalizedProject[];
  collectionName: (id: CollectionId) => string;
  projectBySlug: (slug: string) => LocalizedProject | undefined;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr") return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

function localizeProjects(dict: Dictionary): LocalizedProject[] {
  const names = Object.fromEntries(dict.collections.map((c) => [c.id, c.name])) as Record<
    CollectionId,
    string
  >;
  return projectBases.map((base) => {
    const copy = dict.projects[base.slug];
    if (!copy) {
      throw new Error(`Missing project copy for slug: ${base.slug}`);
    }
    return {
      ...base,
      ...copy,
      collectionName: names[base.collection],
    };
  });
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === "undefined" ? "en" : readStoredLang(),
  );

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = catalogs[lang];

  const value = useMemo<LocaleContextValue>(() => {
    const projects = localizeProjects(t);
    const bySlug = new Map(projects.map((p) => [p.slug, p]));
    return {
      lang,
      setLang,
      t,
      projects,
      featured: featuredSlugs.map((slug) => bySlug.get(slug)!),
      collectionName: (id) => t.collections.find((c) => c.id === id)?.name ?? id,
      projectBySlug: (slug) => bySlug.get(slug),
    };
  }, [lang, setLang, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
