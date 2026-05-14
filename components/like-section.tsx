'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'site-liked';

export function LikeSection({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'true') setLiked(true);
    } catch {}
    setMounted(true);
  }, []);

  const handleClick = useCallback(() => {
    const next = !liked;
    setLiked(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, String(next));
    } catch {}

    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    if (next) {
      const newHearts = Array.from({ length: 6 }, () => Date.now() + Math.random());
      setHearts(prev => [...prev, ...newHearts]);
      setTimeout(() => {
        setHearts(prev => prev.filter(h => !newHearts.includes(h)));
      }, 1500);
    }
  }, [liked]);

  return (
    <section className="py-20 flex flex-col items-center gap-5">
      <p className="font-serif italic text-lg sm:text-xl text-[var(--muted)]">
        {isZh ? '喜欢这个网站吗？' : 'Enjoyed the visit?'}
      </p>

      <div className="relative flex items-center justify-center">
        <button
          onClick={handleClick}
          aria-label={isZh ? '喜欢这个网站' : 'Like this site'}
          className="relative w-14 h-14 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-300 hover:border-red-300 hover:shadow-sm cursor-pointer"
          style={animating ? { animation: 'heart-bounce 0.6s ease-out' } : undefined}
        >
          <svg
            className={`w-6 h-6 transition-all duration-300 ${
              mounted && liked ? 'text-red-500' : 'text-[var(--muted)]'
            }`}
            viewBox="0 0 24 24"
            fill={mounted && liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={mounted && liked ? 0 : 1.5}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {hearts.map((id) => (
          <span
            key={id}
            className="absolute pointer-events-none text-red-400"
            style={{
              animation: 'float-heart 1.2s ease-out forwards',
              left: `calc(50% + ${Math.random() * 40 - 20}px)`,
              top: '50%',
              fontSize: `${10 + Math.random() * 8}px`,
            }}
          >
            &#10084;
          </span>
        ))}
      </div>

      <p className="font-mono text-xs text-[var(--muted)] transition-all duration-300">
        {mounted && liked
          ? (isZh ? '谢谢你的喜欢！' : 'Thanks for the love!')
          : (isZh ? '点击爱心' : 'Tap the heart')}
      </p>
    </section>
  );
}
