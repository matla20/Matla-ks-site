import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { DEFAULT_CONTENT, SiteContent } from "./defaultContent";

const LOCAL_KEY = "matlaks-content";
const API_URL = `${import.meta.env.BASE_URL}api/content`;

function mergeContent(saved: Partial<SiteContent> | null): SiteContent {
  if (!saved || typeof saved !== "object") return DEFAULT_CONTENT;
  return {
    categories:
      Array.isArray(saved.categories) && saved.categories.length > 0
        ? saved.categories
        : DEFAULT_CONTENT.categories,
    catalog: Array.isArray(saved.catalog) ? saved.catalog : DEFAULT_CONTENT.catalog,
    gallery: Array.isArray(saved.gallery) ? saved.gallery : DEFAULT_CONTENT.gallery,
    testimonials: Array.isArray(saved.testimonials)
      ? saved.testimonials
      : DEFAULT_CONTENT.testimonials,
    footer: { ...DEFAULT_CONTENT.footer, ...(saved.footer ?? {}) },
    cloudinary: { ...DEFAULT_CONTENT.cloudinary, ...(saved.cloudinary ?? {}) },
  };
}

interface ContentContextValue {
  content: SiteContent;
  /** true when a remote API (Netlify function) is available */
  remoteAvailable: boolean;
  save: (next: SiteContent, password: string) => Promise<"remote" | "local">;
  /** checks the password against the server (when available) without saving */
  verifyPassword: (password: string) => Promise<boolean>;
  reset: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [remoteAvailable, setRemoteAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setRemoteAvailable(true);
            if (data && data.content) setContent(mergeContent(data.content));
          }
          return;
        }
      } catch {
        // no remote API (e.g. dev preview) — fall back to localStorage
      }
      try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (raw && !cancelled) setContent(mergeContent(JSON.parse(raw)));
      } catch {
        // ignore corrupt local data
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const save = useCallback(
    async (next: SiteContent, password: string): Promise<"remote" | "local"> => {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, content: next }),
        });
        if (res.status === 401) throw new Error("SENHA_INCORRETA");
        if (res.ok) {
          setContent(next);
          return "remote";
        }
      } catch (err) {
        if (err instanceof Error && err.message === "SENHA_INCORRETA") throw err;
        // network / 404 — remote not available, fall through to local save
      }
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      setContent(next);
      return "local";
    },
    []
  );

  const verifyPassword = useCallback(
    async (password: string): Promise<boolean> => {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, verify: true }),
        });
        if (res.status === 401) return false;
        if (res.ok) return true;
      } catch {
        // remote not available — fall back to the local default password
      }
      return password === "matla2026";
    },
    []
  );

  const reset = useCallback(() => {
    localStorage.removeItem(LOCAL_KEY);
    setContent(DEFAULT_CONTENT);
  }, []);

  return (
    <ContentContext.Provider
      value={{ content, remoteAvailable, save, verifyPassword, reset }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
