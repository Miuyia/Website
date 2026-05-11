'use client';

import Link from 'next/link';
import { useLocale } from '@/components/locale-provider';
import { formatDate, type PostMeta } from '@/lib/posts-types';

export function BlogIndexContent({ posts }: { posts: PostMeta[] }) {
  const { t, locale } = useLocale();
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
          {t.blog.eyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          {t.blog.pageTitle}
        </h1>
        <p className="text-[var(--muted)] max-w-xl">{t.blog.countTemplate(posts.length)}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-[var(--muted)]">{t.blog.empty}</p>
      ) : (
        <ul className="divide-y divide-[var(--border)]">
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-medium group-hover:underline underline-offset-4 decoration-1">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-[var(--muted)]">
                      {post.tags.map(tag => (
                        <li key={tag}>#{tag}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <time
                  dateTime={post.date}
                  className="font-mono text-xs text-[var(--muted)] shrink-0"
                >
                  {formatDate(post.date, locale === 'zh' ? 'zh' : 'en')}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
