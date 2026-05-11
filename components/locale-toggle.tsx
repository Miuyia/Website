'use client';

import { useLocale } from './locale-provider';

export function LocaleToggle() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div
      role="group"
      aria-label={t.toggle.aria}
      className="inline-flex items-center rounded-full border border-[var(--border)] p-0.5 text-xs font-mono"
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`px-2.5 py-0.5 rounded-full transition-colors ${
          locale === 'en'
            ? 'bg-[var(--foreground)] text-[var(--background)]'
            : 'text-[var(--muted)] hover:text-[var(--foreground)]'
        }`}
      >
        {t.toggle.en}
      </button>
      <button
        type="button"
        onClick={() => setLocale('zh')}
        aria-pressed={locale === 'zh'}
        className={`px-2.5 py-0.5 rounded-full transition-colors ${
          locale === 'zh'
            ? 'bg-[var(--foreground)] text-[var(--background)]'
            : 'text-[var(--muted)] hover:text-[var(--foreground)]'
        }`}
      >
        {t.toggle.zh}
      </button>
    </div>
  );
}
