import axios from 'axios';
import { useQuery } from 'react-query';

import { environment } from '@environment/environment';

export const fetchTags = async () => {
  const url = `${environment.baseApiUrl}/tags`;
  const response = await axios.get<string[]>(url, { });

  return response.data;
};

export const useTags = () => {
  return useQuery(['tags'], () => fetchTags());
};
