'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useLocale } from './locale-provider';
import { LocaleToggle } from './locale-toggle';

export function SiteHeader() {
  const { t, locale } = useLocale();
  const [activeSection, setActiveSection] = useState('');
  const cooldownRef = useRef(false);

  useEffect(() => {
    const sectionIds = ['about', 'experience', 'works', 'moments', 'galleries', 'personal'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!cooldownRef.current && entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.05, rootMargin: '-10% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 1000);
  };

  const nav = [
    { href: '/#about', id: 'about' },
    { href: '/#experience', id: 'experience' },
    { href: '/#works', id: 'works' },
    { href: '/#moments', id: 'moments' },
    { href: '/#galleries', id: 'galleries' },
    { href: '/#personal', id: 'personal' },
  ];

  const navLabels = [
    t.nav.about,
    locale === 'zh' ? '经历' : 'Experience',
    locale === 'zh' ? '作品' : 'Works',
    locale === 'zh' ? '日常' : 'Moments',
    locale === 'zh' ? '旅行' : 'Travel',
    locale === 'zh' ? '更多' : 'More',
  ];

  const getActiveIndex = () => {
    if (activeSection === 'personal') return 5;
    if (activeSection === 'galleries') return 4;
    if (activeSection === 'moments') return 3;
    if (activeSection === 'works') return 2;
    if (activeSection === 'experience') return 1;
    if (activeSection === 'about') return 0;
    return 0;
  };

  const activeIndex = getActiveIndex();

  return (
    <header className="hidden md:flex flex-col items-center w-36 shrink-0 sticky top-0 h-screen bg-[var(--background)]/80 backdrop-blur-md z-40 py-10">
      {/* Logo */}
      <Link
        href="/"
        aria-label="Meow — home"
        className="font-serif text-xl leading-none tracking-tight text-[var(--foreground)] hover:opacity-70 transition-opacity duration-300 italic"
        style={{ fontOpticalSizing: 'auto', fontVariationSettings: "'SOFT' 50" }}
      >
        Meow
        <span className="inline-block ml-0.5 text-[var(--accent)]">.</span>
      </Link>

      {/* Nav links with vertical line indicator */}
      <nav className="absolute inset-y-0 flex items-center pointer-events-none">
        <div className="relative flex">
          {/* Track line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--border)] rounded-full" />
          {/* Active indicator slider */}
          <div
            className="absolute left-0 w-[2px] h-5 bg-[var(--foreground)] rounded-full transition-all duration-300 ease-out"
            style={{ top: `${activeIndex * 40 + 6}px` }}
          />
          {/* Links */}
          <ul className="flex flex-col gap-5 pl-5 text-sm pointer-events-auto">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`whitespace-nowrap transition-all duration-200 ${
                    activeIndex === i
                      ? 'text-[var(--foreground)] font-medium'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {navLabels[i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Locale toggle at bottom */}
      <div className="mt-auto">
        <LocaleToggle />
      </div>
    </header>
  );
}
