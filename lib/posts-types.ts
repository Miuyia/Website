export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  lang?: 'zh' | 'en';
};

export type Post = PostMeta & {
  html: string;
};

export function formatDate(iso: string, lang: 'zh' | 'en' = 'zh'): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (lang === 'en') {
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
