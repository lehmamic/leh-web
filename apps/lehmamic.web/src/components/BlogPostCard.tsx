import { Typography, CardContent, Card, CardMedia, CardActions, Chip, SxProps, Theme } from '@mui/material';
import * as React from 'react';
import dayjs from 'dayjs';

import { BlogPost } from '@models/blog-post';

import Link from './Link';
import { extractBlogPostDescription } from '@utils/transform-content';

export interface BlogPostCardProps {
  blogPost: BlogPost;
  sx?: SxProps<Theme>;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ sx = [], blogPost }: BlogPostCardProps) => {
  const content = React.useMemo(() => extractBlogPostDescription(blogPost), [blogPost]);

  return (
    <Link underline="none" href={`/${blogPost.slug}`} sx={
      [
        ...(Array.isArray(sx) ? sx : [sx]),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any}>
      <Card
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[100],
          boxShadow: 0,
          width: '508px',
          // padding: theme.spacing(2),
          ':hover': {
            // boxShadow: 3,
            cursor: 'pointer',
          },
        })}
      >
        {blogPost.imageUrl && (
          <CardMedia
            component="img"
            height="200"
            image={blogPost.imageUrl}
            alt={blogPost.title}
            sx={(theme) => ({ mt: theme.spacing(-2), mx: theme.spacing(-2), width: '508px' })}
          />
        )}
        <CardContent sx={(theme)=> ({ p: theme.spacing(2) })}>
          <Typography gutterBottom variant="h5" component="div" sx={(theme) => ({ mb: theme.spacing(2), lineHeight: 1 })}>
            {blogPost.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions sx={(theme) => ({ p: theme.spacing(2), borderTopWidth: 1, borderTopColor: theme.palette.divider, borderTopStyle: 'solid'})}>
          <Typography variant="body2" component="span" sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: theme.spacing(1) })}>
            {dayjs(blogPost.publishedAt).format("D MMMM YYYY")}
            {blogPost.tags.map(tag => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Typography>
        </CardActions>
      </Card>
    </Link>
  );
};

