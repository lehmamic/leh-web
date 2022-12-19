import { User } from '@models/user';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { environment } from '@environment/environment';

export const fetchUsers = async () => {
  const url = `${environment.baseApiUrl}/users`;
  const response = await axios.get<User[]>(url, { });

  return response.data;
};

export const useUsers = () => {
  return useQuery(['users'], () => fetchUsers());
};
