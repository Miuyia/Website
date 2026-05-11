'use client';

import Link from 'next/link';
import { Prose } from '@/components/prose';
import { useLocale } from '@/components/locale-provider';
import { formatDate, type Post } from '@/lib/posts-types';

export function PostContent({ post }: { post: Post }) {
  const { t, locale } = useLocale();
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="inline-block mb-8 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        {t.blog.back}
      </Link>

      <header className="mb-10 pb-8 border-b border-[var(--border)]">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--muted)] font-mono">
          <time dateTime={post.date}>
            {formatDate(post.date, locale === 'zh' ? 'zh' : 'en')}
          </time>
          {post.tags && post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-x-3">
              {post.tags.map(tag => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <Prose html={post.html} />
    </article>
  );
}
