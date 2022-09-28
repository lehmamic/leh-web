import { Typography, CardContent, Card, CardMedia, CardActions, Chip, SxProps, Theme, Box } from '@mui/material';
import * as React from 'react';
import dayjs from 'dayjs';

import { BlogPost } from '@models/blog-post';

import Link from '../Link';
import { extractBlogPostDescription, extractReadingTime } from '@utils/transform-content';
import { PostTags } from './PostTags';

export interface BlogPostCardProps {
  blogPost: BlogPost;
  sx?: SxProps<Theme>;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ sx = [], blogPost }: BlogPostCardProps) => {
  const content = React.useMemo(() => extractBlogPostDescription(blogPost), [blogPost]);
  const readingTime = React.useMemo(() => extractReadingTime(blogPost), [blogPost]);

  return (
    <Link underline="none" href={`/blog/${blogPost.slug}`} sx={
      [
        ...(Array.isArray(sx) ? sx : [sx]),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any}>
      <Card
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[100],
          boxShadow: 0,
          width: '405px',
          ':hover': {
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
        <CardActions sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: theme.spacing(1),
          p: theme.spacing(2),
          borderTopWidth: 1,
          borderTopColor: theme.palette.divider,
          borderTopStyle: 'solid',
          '& :not(:first-of-type)': {
            ml: '0px'
          }

        })}>
          <Box sx={(theme) => ({ display: 'flex', })}>
            <Typography variant="body2" component="span" noWrap sx={(theme) => ({ color: theme.palette.grey[700] })}>
              {dayjs(blogPost.publishedAt).format("D MMMM YYYY")} &#8226; {readingTime.text}
            </Typography>
          </Box>
          <PostTags post={blogPost} />
        </CardActions>
      </Card>
    </Link>
  );
};

