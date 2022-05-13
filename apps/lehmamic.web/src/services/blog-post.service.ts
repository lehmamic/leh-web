import { CreateBlogPostRequest } from './../models/blog-post';
import dayjs from 'dayjs';
import '@utils/dayjs.plugins';

import { BlogPost, BlogPostStatus, BlogPostType, BLOGPOSTS_COLLECTION } from '@models/blog-post';
import { connectToMongoDb } from '@utils/mongodb';

export interface BlogPostFilter {
  type?: BlogPostType,
  status?: BlogPostStatus;
}

export const getBlogPosts = async (filter: BlogPostFilter = { }): Promise<BlogPost[]> => {
  const { db } = await connectToMongoDb();
  const posts = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).find(filter)
    .sort({ publishedAt: -1 })
    .toArray();

  return posts
}

export const getBlogPostBySlug = async (slug: string | undefined): Promise<BlogPost | null> => {
  const { db } = await connectToMongoDb();
  const post = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).findOne({ slug: slug });

  return post
}

export const getBlogPostById = async (id: string | undefined): Promise<BlogPost | null> => {
  const { db } = await connectToMongoDb();
  const post = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).findOne({ _id: id });

  return post
}

export const createBlogPost = async (post: CreateBlogPostRequest): Promise<BlogPost> => {

  const { db } = await connectToMongoDb();

  const utcNow = dayjs.utc().toDate();
  const model: BlogPost = { ...post, _id: undefined as never, createdAt: utcNow, modifiedAt: utcNow, status: 'draft' };

  const result = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).insertOne(model);

  return { ...model, _id: result.insertedId }
}

