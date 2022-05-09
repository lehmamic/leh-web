import { Typography, CardContent, Card, CardMedia, CardActions, Chip } from '@mui/material';
import * as React from 'react';
import dayjs from 'dayjs';

import { BlogPost } from '@models/blog-post';

import Link from './Link';
import { clampContent, removeMarkdown } from '@utils/transform-content';

export interface BlogPostCardProps {
  blogPost: BlogPost;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ blogPost }: BlogPostCardProps) => {
  const content = React.useMemo(() => clampContent(removeMarkdown(blogPost.content), 293), [blogPost.content]);

  return (
    <Link underline="none" href={`/${blogPost.slug}`}>
      <Card
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[100],
          boxShadow: 0,
          width: '508px',
          padding: theme.spacing(2),
          ':hover': {
            boxShadow: 3,
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
        <CardContent sx={{ height: '234px' }}>
          <Typography gutterBottom variant="h5" component="div" sx={(theme) => ({ mb: theme.spacing(2) })}>
            {blogPost.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {dayjs(blogPost.publishedAt).format("D MMMM YYYY")}
          {blogPost.tags.map(tag => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </CardActions>
      </Card>
    </Link>
  );
};

