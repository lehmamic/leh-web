export const BLOGPOSTS_COLLECTION = "posts";

export type BlogPostStatus = 'draft' | 'published';

export const BlogPostStatus = {
  Draft: 'draft' as BlogPostStatus,
  Published: 'published' as BlogPostStatus,
};

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl: string;
  content: string;
  status: BlogPostStatus;
  tags: string[];
  authors: string[];
  createdAt: Date;
  modifedAt: Date;
  publishedAt: Date;
}
