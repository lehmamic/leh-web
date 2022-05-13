import axios from 'axios';
import { useMutation, UseMutationResult } from 'react-query';

import { environment } from '../environment/environment';
import { BlogPost, CreateBlogPostRequest } from '@models/blog-post';
import { HttpHeaders } from '../utils/http';

export const postBlogPost = async (blogPost: CreateBlogPostRequest, token: string | null): Promise<BlogPost> => {
  const url = `${environment.baseApiUrl}/posts`;

  const headers: HttpHeaders = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.post<BlogPost>(url, blogPost, { headers });
  return response.data;
};

export const useCreateBlogPost = (): UseMutationResult<BlogPost, unknown, CreateBlogPostRequest, unknown> => {
  // const { user } = useFirebaseAuth();

  return useMutation(async (data: CreateBlogPostRequest) => {
    // const token = user ? await user.getIdToken() : null;
    const token = '';

    return await postBlogPost(data, token);
  });
};
