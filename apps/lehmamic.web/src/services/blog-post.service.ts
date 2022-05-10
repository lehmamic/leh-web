import { BlogPost, BLOGPOSTS_COLLECTION } from '@models/blog-post';
import { connectToMongoDb } from '@utils/mongodb';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { db } = await connectToMongoDb();
  const posts = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).find()
    .sort({ publishedAt: -1 }).toArray();

  return posts
}

export const getBlogPostBySlug = async (slug: string | undefined): Promise<BlogPost | null> => {
  const { db } = await connectToMongoDb();
  const post = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).findOne({ slug: slug });

  return post
}

