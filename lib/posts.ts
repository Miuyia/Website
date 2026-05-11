import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import type { Post, PostMeta } from './posts-types';

export type { Post, PostMeta } from './posts-types';
export { formatDate } from './posts-types';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

async function readPostFiles(): Promise<string[]> {
  try {
    const entries = await readdir(POSTS_DIR);
    return entries.filter(f => f.endsWith('.md'));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

function parseFrontmatter(source: string, slug: string): { meta: PostMeta; body: string } {
  const { data, content } = matter(source);
  const meta: PostMeta = {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    date: typeof data.date === 'string' ? data.date : new Date(data.date ?? Date.now()).toISOString(),
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    lang: data.lang === 'en' ? 'en' : 'zh',
  };
  return { meta, body: content };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown);
  return String(file);
}

export async function getAllPostMeta(): Promise<PostMeta[]> {
  const files = await readPostFiles();
  const metas = await Promise.all(
    files.map(async file => {
      const slug = file.replace(/\.md$/, '');
      const source = await readFile(path.join(POSTS_DIR, file), 'utf8');
      const { meta } = parseFrontmatter(source, slug);
      return meta;
    }),
  );
  return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const files = await readPostFiles();
  if (!files.includes(`${slug}.md`)) return null;
  const source = await readFile(path.join(POSTS_DIR, `${slug}.md`), 'utf8');
  const { meta, body } = parseFrontmatter(source, slug);
  const html = await markdownToHtml(body);
  return { ...meta, html };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const files = await readPostFiles();
  return files.map(f => f.replace(/\.md$/, ''));
}
