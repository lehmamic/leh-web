import { ObjectId } from 'mongodb';

export const BLOGPOSTS_COLLECTION = "posts";

export type BlogPostStatus = 'draft' | 'published';

export const BlogPostStatus = {
  Draft: 'draft' as BlogPostStatus,
  Published: 'published' as BlogPostStatus,
};

export type BlogPostType = 'page' | 'post';

export const BlogPostType = {
  Page: 'page' as BlogPostType,
  Post: 'post' as BlogPostType,
};

export interface CreateBlogPostRequest {
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  content: string;
  type: BlogPostType;
  tags: string[];
  authors: ObjectId[];
};

export interface BlogPost {
  _id: ObjectId;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  content: string;
  status: BlogPostStatus;
  type: BlogPostType;
  tags: string[];
  authors: ObjectId[];
  createdAt: Date;
  modifiedAt: Date;
  publishedAt?: Date;
};

export const getStatusDisplayName = (status: BlogPostStatus): string => {
  if (status === 'published') {
    return 'Published';
  }

  if (status === 'draft') {
    return 'Draft';
  }

  throw new Error('Unknown blog post status');
};
