import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { environment } from '@environment/environment';
import { BlogPost, BlogPostStatus, BlogPostType } from '@models/blog-post';

export const fetchBlogPosts = async (type: BlogPostType | null = null, status: BlogPostStatus | null = null) => {
  const url = `${environment.baseApiUrl}/posts`;
  const response = await axios.get<BlogPost[]>(url, { params: { type, status } });

  return response.data;
};

export const useBlogPosts = (type: BlogPostType | null = null, status: BlogPostStatus | null = null) => {
  return useQuery(['posts', type, status], () => fetchBlogPosts(type, status));
};
