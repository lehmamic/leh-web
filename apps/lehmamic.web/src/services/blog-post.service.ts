import { BlogPostStatus, BlogPostType } from './../models/blog-post';
import { BlogPost, BLOGPOSTS_COLLECTION } from '@models/blog-post';
import { connectToMongoDb } from '@utils/mongodb';

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const { db } = await connectToMongoDb();
  const posts = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).find({ status: BlogPostStatus.Published })
    .sort({ publishedAt: -1 })
    .toArray();

  return posts
}

export const getBlogPosts = async (type: BlogPostType = BlogPostType.Post): Promise<BlogPost[]> => {
  const { db } = await connectToMongoDb();
  const posts = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).find({ status: BlogPostStatus.Published, type })
    .sort({ publishedAt: -1 })
    .toArray();

  return posts
}

export const getBlogPostBySlug = async (slug: string | undefined): Promise<BlogPost | null> => {
  const { db } = await connectToMongoDb();
  const post = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).findOne({ slug: slug });

  return post
}

