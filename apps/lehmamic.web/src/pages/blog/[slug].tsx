import { Box, Typography } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { useMemo } from 'react';

import { getBlogPostBySlug } from '@services/blog-post.service';
import { getSettings } from '@services/settings.service';
import { ensureSerializable } from '@utils/serialization';
import { BlogPost, BlogPostStatus, BlogPostType } from '@models/blog-post';
import { ParsedUrlQuery } from 'querystring';
import { extractBlogPostDescription, markdownToReact } from '@utils/transform-content';
import { Layout, LayoutProps } from '@components/Layout';
import { User } from '@models/user';
import { getUsersById } from '@services/user.service';
import { PostMetadata } from '@components/post/PostMetadata';
import { PostTags } from '@components/post/PostTags';
import { DisqusComments } from '@components/post/DisqusComments';

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
      {post.type === BlogPostType.Post && (
        <PostTags post={post} sx={(theme) => ({ mt: theme.spacing(5), mb: theme.spacing(1) })} />
      )}
      <Typography gutterBottom variant="h4" component="h4" sx={(theme) => ({  })}>
        {post.title}
      </Typography>
      {post.type === BlogPostType.Post && (
        <PostMetadata user={authors[0]} post={post} sx={(theme) => ({ my: theme.spacing(6) })} />
      )}
      <Typography variant="body1"
                  component="section"
                  color="text.secondary"
                  sx={(theme) => ({ pre: { backgroundColor: '#1E1E1E', borderRadius: '0.5em', p: theme.spacing(3) }})}>
        {content}
      </Typography>
      {layoutProps.disqus.shortName && <DisqusComments disqusShortname={layoutProps.disqus.shortName} baseUrl={layoutProps.baseUrl} post={post} />}
    </Layout>
  );
};

export default BlogPostPage;

export const getServerSideProps: GetServerSideProps<BlogPostPageProps, BlogPostUrlQuery> = async (context: GetServerSidePropsContext<BlogPostUrlQuery>): Promise<GetServerSidePropsResult<BlogPostPageProps>> => {
  const post = await getBlogPostBySlug(context.params?.slug)
  if (!post || post.type !== BlogPostType.Post) {
    return {
      notFound: true,
    };
  }

  const authors = await getUsersById(post.authors.map(a => a.toString()));

  const settings = await getSettings();

  const layoutProps: LayoutProps = {
    ...settings,
    contentTitle: post.title,
    description: extractBlogPostDescription(post),
    imageUrl: post.imageUrl && post.imageUrl !== '' ? post.imageUrl : settings.coverImageUrl,
    path: `blog/${post.slug}`,
    preview: post.status !== BlogPostStatus.Published,
   };

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
      post: ensureSerializable(post),
      authors: ensureSerializable(authors),
    }
  }
}
