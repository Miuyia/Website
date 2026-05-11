'use client';

const SOCIAL = [
  { href: 'mailto:247420935@qq.com', label: 'Email' },
  { href: 'https://xhslink.com/m/4Gqq19kgwoR', label: '小红书' },
  { href: 'https://github.com/Miuyia', label: 'GitHub' },
];

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--border)] mt-16">
      <div className="px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <p className="font-mono" suppressHydrationWarning>© {new Date().getFullYear()} Meow</p>
        <ul className="flex items-center gap-5">
          {SOCIAL.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--foreground)] transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
