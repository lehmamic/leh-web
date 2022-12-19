import axios from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { environment } from '@environment/environment';
import { HttpHeaders } from '@utils/http';

export const deleteBlogPost = async (id: string, token: string | null): Promise<void> => {
  const url = `${environment.baseApiUrl}/posts/${id}`;

  const headers: HttpHeaders = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  await axios.delete(url, { headers });
};

export const useDeleteBlogPost = (): UseMutationResult<void, unknown, string, unknown> => {
  // const { user } = useFirebaseAuth();

  return useMutation(async (id: string) => {
    // const token = user ? await user.getIdToken() : null;
    const token = null;
    return await deleteBlogPost(id, token);
  });
};
