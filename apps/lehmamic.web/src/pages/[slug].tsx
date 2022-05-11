import { Box, Typography } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { useMemo } from 'react';

import { getBlogPostBySlug } from '@services/blog-post.service';
import { getSettings } from '@services/settings.service';
import { ensureSerializable } from '@utils/serialization';
import { BlogPost } from '@models/blog-post';
import { ParsedUrlQuery } from 'querystring';
import { extractBlogPostDescription, markdownToReact } from '@utils/transform-content';
import { Layout, LayoutProps } from '@components/Layout';
import { User } from '@models/user';
import { getUsersById } from '@services/user.service';
import { PostMetadata } from '@components/PostMetadata';
import { PostTags } from '@components/PostTags';

interface BlogPostPageProps {
  layoutProps: LayoutProps;
  post: BlogPost;
  authors: User[];
}

interface BlogPostUrlQuery extends ParsedUrlQuery {
  slug: string;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ layoutProps, post, authors }) => {
  const content = useMemo(() => markdownToReact(post.content), [post.content]);

  return (
    <Layout {...layoutProps}>
      <PostTags post={post} sx={(theme) => ({ mt: theme.spacing(5), mb: theme.spacing(1) })} />
      <Typography gutterBottom variant="h4" component="h4" sx={(theme) => ({  })}>
        {post.title}
      </Typography>
      <PostMetadata user={authors[0]} post={post} sx={(theme) => ({ my: theme.spacing(6) })} />
      <Typography
        variant="body1"
        color="text.secondary"
        component="section"
        sx={(theme) => ({ a: { color: theme.palette.primary.main } })}
      >
        {content}
      </Typography>
    </Layout>
  );
};

export default BlogPostPage;

export const getServerSideProps: GetServerSideProps<BlogPostPageProps, BlogPostUrlQuery> = async (context: GetServerSidePropsContext<BlogPostUrlQuery>): Promise<GetServerSidePropsResult<BlogPostPageProps>> => {
  const post = await getBlogPostBySlug(context.params?.slug)
  if (!post) {
    return {
      notFound: true,
    };
  }

  console.dir(post);
  const authors = await getUsersById(post.authors);
  console.dir(authors);

  const settings = await getSettings();
  const layoutProps: LayoutProps = {
    ...settings,
    contentTitle: post.title,
    description: extractBlogPostDescription(post),
    imageUrl: post.imageUrl ?? settings.coverImageUrl,
    path: `blog/${post.slug}`,
   };

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
      post: ensureSerializable(post),
      authors: ensureSerializable(authors),
    }
  }
}
