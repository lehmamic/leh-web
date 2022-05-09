export const BLOGPOSTS_COLLECTION = "posts";

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  imageUrl: string;
  content: string;
  tags: string[];
  createdAt: Date;
  modifedAt: Date;
  publishedAt: Date;
}
