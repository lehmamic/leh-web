import { Container, Typography } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import * as React from 'react';
import { useMemo } from 'react';

import { Header } from '@components/Header';
import { MaterialCover } from '@components/MaterialCover';
import { getBlogPostBySlug } from '@services/blog-post.service';
import { getSettings } from '@services/settings.service';
import { ensureSerializable } from '@utils/serialization';
import { Settings } from '@models/settings';
import { BlogPost } from '@models/blog-post';
import { ParsedUrlQuery } from 'querystring';
import { markdownToReact } from '@utils/transform-content';

interface BlogPostPageProps {
  settings: Settings;
  post: BlogPost
}

interface BlogPostUrlQuery extends ParsedUrlQuery {
  slug: string;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ settings, post }) => {
  const content = useMemo(() => markdownToReact(post.content), [post.content]);

  return (
    <main>
      <Header title={settings.title} />
      <MaterialCover coverImage={post.imageUrl ?? settings.coverImageUrl} />
      <Container maxWidth="lg" component="article">
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
      </Container>
    </main>
  );
};

export default BlogPostPage;

export const getServerSideProps: GetServerSideProps<BlogPostPageProps, BlogPostUrlQuery> = async (context: GetServerSidePropsContext<BlogPostUrlQuery>): Promise<GetServerSidePropsResult<BlogPostPageProps>> => {
  const settings = await getSettings();
  const post = await getBlogPostBySlug(context.params?.slug)
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      settings: ensureSerializable(settings),
      post: ensureSerializable(post),
    }
  }
}
