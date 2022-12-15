import { Typography } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import { useMemo } from 'react';

import { getBlogPostBySlug } from '@services/blog-post.service';
import { getSettings } from '@services/settings.service';
import { ensureSerializable } from '@utils/serialization';
import { BlogPost } from '@models/blog-post';
import { extractBlogPostDescription, markdownToReact } from '@utils/transform-content';
import { Layout, LayoutProps } from '@components/Layout';
import { User } from '@models/user';
import { getUsersById } from '@services/user.service';

interface AboutPageProps {
  layoutProps: LayoutProps;
  post: BlogPost;
  authors: User[];
}

const AboutPage: NextPage<AboutPageProps> = ({ layoutProps, post, authors }) => {
  const content = useMemo(() => markdownToReact(post.content), [post.content]);

  return (
    <Layout {...layoutProps}>
      <Typography gutterBottom variant="h4" component="h4" sx={(theme) => ({  })}>
        {post.title}
      </Typography>
      <Typography variant="body1"
                  component="section"
                  color="text.secondary"
                  sx={(theme) => ({ pre: { backgroundColor: '#1E1E1E', borderRadius: '0.5em', p: theme.spacing(3) }})}>
        {content}
      </Typography>
    </Layout>
  );
};

export default AboutPage;

export const getServerSideProps: GetServerSideProps<AboutPageProps> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AboutPageProps>> => {
  const post = await getBlogPostBySlug('about')
  if (!post) {
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
    imageUrl: post.imageUrl ?? settings.coverImageUrl,
    path: `about`,
   };

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
      post: ensureSerializable(post),
      authors: ensureSerializable(authors),
    }
  }
}
