import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { environment } from '@environment/environment';
import { BlogPost } from '@models/blog-post';

export const fetchBlogPostById = async (id: string) => {
  const url = `${environment.baseApiUrl}/posts/${id}`;
  const response = await axios.get<BlogPost>(url);

  return response.data;
};

export const useBlogPostById = (id: string) => {
  return useQuery(['posts', id], () => fetchBlogPostById(id));
};
