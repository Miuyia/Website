'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  dict,
  isLocale,
  type Dict,
  type Locale,
} from '@/lib/i18n';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Dict;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getInitialLocale();
    setLocaleState(saved);
    document.documentElement.lang = saved === 'zh' ? 'zh-Hans' : 'en';
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
    document.documentElement.lang = next === 'zh' ? 'zh-Hans' : 'en';
  }, []);

  // Before mount, always use DEFAULT_LOCALE to match SSR output
  const activeLocale = mounted ? locale : DEFAULT_LOCALE;

  const value = useMemo(
    () => ({ locale: activeLocale, setLocale, t: dict[activeLocale] }),
    [activeLocale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used inside <LocaleProvider>');
  }
  return ctx;
}
