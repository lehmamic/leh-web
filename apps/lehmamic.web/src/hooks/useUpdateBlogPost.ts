import axios from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { environment } from '@environment/environment';
import { BlogPost, CreateOrUpdateBlogPostRequest } from '@models/blog-post';
import { HttpHeaders } from '@utils/http';


export const putBlogPost = async (id: string, blogPost: CreateOrUpdateBlogPostRequest, token: string | null): Promise<void> => {
  const url = `${environment.baseApiUrl}/posts/${id}`;

  const headers: HttpHeaders = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  await axios.put<BlogPost>(url, blogPost, { headers });
};

export const useUpdateBlogPost = (): UseMutationResult<void, unknown, { id: string; blogPost: CreateOrUpdateBlogPostRequest }, unknown> => {
  // const { user } = useFirebaseAuth();

  return useMutation(async (data: { id: string; blogPost: CreateOrUpdateBlogPostRequest }) => {
    // const token = user ? await user.getIdToken() : null;
    const token = null;
    await putBlogPost(data.id, data.blogPost, token);
  });
};
