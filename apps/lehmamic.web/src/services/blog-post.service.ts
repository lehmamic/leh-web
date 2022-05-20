import { CreateOrUpdateBlogPostRequest } from './../models/blog-post';
import dayjs from 'dayjs';
import '@utils/dayjs.plugins';

import { BlogPost, BlogPostStatus, BlogPostType, BLOGPOSTS_COLLECTION } from '@models/blog-post';
import { connectToMongoDb } from '@utils/mongodb';
import { ObjectId } from 'mongodb';

export interface BlogPostFilter {
  type?: BlogPostType,
  status?: BlogPostStatus;
}

export const getBlogPosts = async (filter: BlogPostFilter = { }): Promise<BlogPost[]> => {
  const { db } = await connectToMongoDb();
  const posts = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).find(filter)
    .sort({ publishedAt: -1 })
    .toArray();

  return posts;
}

export const getBlogPostBySlug = async (slug: string | undefined): Promise<BlogPost | null> => {
  const { db } = await connectToMongoDb();
  const post = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).findOne({ slug: slug });

  return post;
}

export const getBlogPostById = async (id: string | undefined): Promise<BlogPost | null> => {
  const { db } = await connectToMongoDb();
  const post = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).findOne({ _id: new ObjectId(id) });

  return post;
}

export const createBlogPost = async (request: CreateOrUpdateBlogPostRequest): Promise<BlogPost> => {

  const { db } = await connectToMongoDb();

  const utcNow = dayjs.utc().toDate();
  const model: BlogPost = { ...request, _id: undefined as never, createdAt: utcNow, modifiedAt: utcNow, status: 'draft', authors: request.authors.map(a => new ObjectId(a)) };

  const result = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).insertOne(model);

  return { ...model, _id: result.insertedId };
}

export const updateBlogPost = async (id: string, request: CreateOrUpdateBlogPostRequest): Promise<BlogPost | null> => {

  const { db } = await connectToMongoDb();

  const post = await getBlogPostById(id);
  if (! post) {
    return null;
  }

  const utcNow = dayjs.utc().toDate();
  const model: BlogPost = {
    ...post,
    ...request,
    modifiedAt: utcNow,
    authors: request.authors.map(a => new ObjectId(a)),
   };

  await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).replaceOne({ _id: new ObjectId(id) }, model);

  return model;
}

export const deleteBlogPost = async (id: string): Promise<void> => {

  const { db } = await connectToMongoDb();

  await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

export const getAllTags = async (): Promise<string[]> => {
  const { db } = await connectToMongoDb();

  const result = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).aggregate<{ tags: string[]; }>([
    {
      $unwind: "$tags"
    },
    {
      $group: {_id: null, tags: { $addToSet: "$tags" }}
    },
  ]).toArray();

  return result[0].tags
    .filter(t => !!t)
    .sort((a, b) => a.localeCompare(b));
}

