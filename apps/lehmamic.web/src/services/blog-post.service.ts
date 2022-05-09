import { BlogPost, BLOGPOSTS_COLLECTION } from '@models/blog-post';
import { connectToMongoDb } from '@utils/mongodb';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { db } = await connectToMongoDb();
  const posts = await db.collection<BlogPost>(BLOGPOSTS_COLLECTION).find()
    .sort({ publishedAt: -1 }).toArray();

  return posts
}

