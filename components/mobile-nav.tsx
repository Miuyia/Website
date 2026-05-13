'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from './locale-provider';
import { LocaleToggle } from './locale-toggle';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const cooldownRef = useRef(false);
  const { locale } = useLocale();
  const isZh = locale === 'zh';

  // Track active section
  useEffect(() => {
    const sectionIds = ['about', 'experience', 'works', 'moments', 'galleries', 'personal'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!cooldownRef.current && entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.05, rootMargin: '-10% 0px -60% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const nav = [
    { id: 'about', label: isZh ? '关于' : 'About' },
    { id: 'experience', label: isZh ? '经历' : 'Experience' },
    { id: 'works', label: isZh ? '作品' : 'Works' },
    { id: 'moments', label: isZh ? '日常' : 'Moments' },
    { id: 'galleries', label: isZh ? '旅行' : 'Travel' },
    { id: 'personal', label: isZh ? '更多' : 'More' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 1000);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-lg flex items-center justify-center transition-transform duration-200 active:scale-90"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-up drawer */}
      <div
        role="dialog"
        aria-modal={open}
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-[var(--background)] shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-8 h-1 rounded-full bg-[var(--border)]" />
        </div>

        {/* Logo */}
        <div className="px-6 pb-4">
          <span
            className="font-serif text-lg tracking-tight text-[var(--foreground)] italic"
            style={{ fontOpticalSizing: 'auto', fontVariationSettings: "'SOFT' 50" }}
          >
            Meow<span className="inline-block ml-0.5 text-[var(--accent)]">.</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="px-6 pb-4">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] transition-colors ${
                    activeSection === item.id
                      ? 'text-[var(--foreground)] font-medium bg-[var(--foreground)]/5'
                      : 'text-[var(--muted)]'
                  }`}
                >
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]" />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Locale toggle */}
        <div className="px-6 pb-8 pt-2 border-t border-[var(--border)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">
              {isZh ? '语言' : 'Language'}
            </span>
            <LocaleToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
