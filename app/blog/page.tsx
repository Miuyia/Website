import type { Metadata } from 'next';
import { getAllPostMeta } from '@/lib/posts';
import { BlogIndexContent } from './blog-index-content';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes and essays by Meow.',
};

export default async function BlogIndexPage() {
  const posts = await getAllPostMeta();
  return <BlogIndexContent posts={posts} />;
}
