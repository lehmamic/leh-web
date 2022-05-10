import { BlogPost } from "@models/blog-post";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { getSettings } from "@services/settings.service";
import { getBlogPosts } from "@services/blog-post.service";
import { BlogPostCard } from "@components/BlogPostCard";
import { ensureSerializable } from "@utils/serialization";
import { Layout, LayoutProps } from "@components/Layout";
import { Container } from "@mui/material";

interface BlogPageProps {
  layoutProps: LayoutProps;
  posts: BlogPost[];
}

const BlogPage: NextPage<BlogPageProps> = ( { layoutProps, posts }) => {

  return (
    <Layout {...layoutProps}>
      <Container sx={(theme) => ({ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: theme.spacing(3) })}>
        {posts.map((post) => (
          <BlogPostCard key={post._id} blogPost={post} />
        ))}
      </Container>
    </Layout>
  );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlogPageProps>> => {
  const settings = await getSettings();
  const layoutProps: LayoutProps = {
    ...settings,
    imageUrl: settings.coverImageUrl,
    path: 'blog',
   };

   const posts = await getBlogPosts()

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
      posts: ensureSerializable(posts),
    }
  }
}

