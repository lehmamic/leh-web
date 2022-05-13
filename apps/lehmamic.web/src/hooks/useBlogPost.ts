import axios from 'axios';
import { useQuery } from 'react-query';

import { environment } from '@environment/environment';
import { BlogPost } from '@models/blog-post';

export const fetchBlogPost = async (slug: string) => {
  const url = `${environment.baseApiUrl}/posts/${slug}`;
  const response = await axios.get<BlogPost>(url);

  return response.data;
};

export const useBlogPost = (slug: string) => {
  return useQuery(['posts', slug], () => fetchBlogPost(slug));
};
