import { Typography } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { useMemo } from 'react';

import { getBlogPostBySlug } from '@services/blog-post.service';
import { getSettings } from '@services/settings.service';
import { ensureSerializable } from '@utils/serialization';
import { BlogPost } from '@models/blog-post';
import { ParsedUrlQuery } from 'querystring';
import { extractBlogPostDescription, markdownToReact } from '@utils/transform-content';
import { Layout, LayoutProps } from '@components/Layout';

interface BlogPostPageProps {
  layoutProps: LayoutProps;
  post: BlogPost
}

interface BlogPostUrlQuery extends ParsedUrlQuery {
  slug: string;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ layoutProps, post }) => {
  const content = useMemo(() => markdownToReact(post.content), [post.content]);

  return (
    <Layout {...layoutProps}>
      <Typography gutterBottom variant="h4" component="h4" sx={(theme) => ({ mt: theme.spacing(5) })}>
        {post.title}
      </Typography>
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
    }
  }
}
