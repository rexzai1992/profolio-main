"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  defaultPortfolioContent,
  isPortfolioContentLike,
  PORTFOLIO_CONTENT_STORAGE_KEY,
  type PortfolioContent,
} from "@/lib/site";

type PortfolioContentContextValue = {
  content: PortfolioContent;
  setContent: (nextContent: PortfolioContent) => void;
  resetContent: () => void;
};

const PortfolioContentContext = createContext<PortfolioContentContextValue | undefined>(
  undefined,
);

function loadStoredContent(): PortfolioContent {
  if (typeof window === "undefined") {
    return defaultPortfolioContent;
  }

  try {
    const raw = window.localStorage.getItem(PORTFOLIO_CONTENT_STORAGE_KEY);

    if (!raw) {
      return defaultPortfolioContent;
    }

    const parsed: unknown = JSON.parse(raw);

    if (!isPortfolioContentLike(parsed)) {
      return defaultPortfolioContent;
    }

    return parsed;
  } catch {
    return defaultPortfolioContent;
  }
}

export function PortfolioContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<PortfolioContent>(() => loadStoredContent());

  const setContent = useCallback((nextContent: PortfolioContent) => {
    setContentState(nextContent);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        PORTFOLIO_CONTENT_STORAGE_KEY,
        JSON.stringify(nextContent),
      );
    }
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultPortfolioContent);
  }, [setContent]);

  const value = useMemo(
    () => ({
      content,
      setContent,
      resetContent,
    }),
    [content, setContent, resetContent],
  );

  return (
    <PortfolioContentContext.Provider value={value}>
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  const context = useContext(PortfolioContentContext);

  if (!context) {
    throw new Error("usePortfolioContent must be used inside PortfolioContentProvider");
  }

  return context;
}
