import axios from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { environment } from '../environment/environment';
import { BlogPost } from '@models/blog-post';
import { HttpHeaders } from '../utils/http';

export const publishBlogPost = async (id: string, token: string | null): Promise<BlogPost> => {
  const url = `${environment.baseApiUrl}/posts/${id}/publish`;

  const headers: HttpHeaders = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.post<BlogPost>(url, null, { headers });
  return response.data;
};

export const usePublishBlogPost = (): UseMutationResult<BlogPost, unknown, { id: string; }, unknown> => {
  // const { user } = useFirebaseAuth();

  return useMutation(async (data: { id: string; }) => {
    // const token = user ? await user.getIdToken() : null;
    const token = '';

    return await publishBlogPost(data.id, token);
  });
};
