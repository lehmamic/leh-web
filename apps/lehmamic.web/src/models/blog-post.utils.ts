import { BlogPostStatus } from './blog-post';

export const getStatusDisplayName = (status: BlogPostStatus): string => {
  if (status === 'published') {
    return 'Published';
  }

  if (status === 'draft') {
    return 'Draft';
  }

  throw new Error('Unknown blog post status');
};
