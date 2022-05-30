import axios from 'axios';
import { useMutation, UseMutationResult } from 'react-query';

import { environment } from '../environment/environment';
import { BlogPost } from '@models/blog-post';
import { HttpHeaders } from '../utils/http';

export const unpublishBlogPost = async (id: string, token: string | null): Promise<BlogPost> => {
  const url = `${environment.baseApiUrl}/posts/${id}/unpublish`;

  const headers: HttpHeaders = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.post<BlogPost>(url, null, { headers });
  return response.data;
};

export const useUnpublishBlogPost = (): UseMutationResult<BlogPost, unknown, { id: string; }, unknown> => {
  // const { user } = useFirebaseAuth();

  return useMutation(async (data: { id: string; }) => {
    // const token = user ? await user.getIdToken() : null;
    const token = '';

    return await unpublishBlogPost(data.id, token);
  });
};
