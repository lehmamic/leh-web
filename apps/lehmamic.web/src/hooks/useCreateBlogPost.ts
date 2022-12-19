import axios from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { environment } from '../environment/environment';
import { BlogPost, CreateOrUpdateBlogPostRequest } from '@models/blog-post';
import { HttpHeaders } from '../utils/http';

export const postBlogPost = async (blogPost: CreateOrUpdateBlogPostRequest, token: string | null): Promise<BlogPost> => {
  const url = `${environment.baseApiUrl}/posts`;

  const headers: HttpHeaders = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.post<BlogPost>(url, blogPost, { headers });
  return response.data;
};

export const useCreateBlogPost = (): UseMutationResult<BlogPost, unknown, CreateOrUpdateBlogPostRequest, unknown> => {
  // const { user } = useFirebaseAuth();

  return useMutation(async (data: CreateOrUpdateBlogPostRequest) => {
    // const token = user ? await user.getIdToken() : null;
    const token = '';

    return await postBlogPost(data, token);
  });
};
