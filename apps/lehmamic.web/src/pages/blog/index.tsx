import { BlogPost, BlogPostStatus, BlogPostType } from "@models/blog-post";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { getSettings } from "@services/settings.service";
import { getBlogPosts } from "@services/blog-post.service";
import { BlogPostCard } from "@components/post/BlogPostCard";
import { ensureSerializable } from "@utils/serialization";
import { Layout, LayoutProps } from "@components/Layout";
import { Masonry } from "@mui/lab";

interface BlogPageProps {
  layoutProps: LayoutProps;
  posts: BlogPost[];
}

const BlogPage: NextPage<BlogPageProps> = ( { layoutProps, posts }) => {

  return (
    <Layout {...layoutProps}>
      <Masonry columns={{ xs: 1, md: 1, lg: 2 }}
               spacing={3}
               defaultColumns={2}
               defaultSpacing={3}
               defaultHeight={450}>
        {posts.map((post, index) => (
          <BlogPostCard key={index} blogPost={post} />
        ))}
      </Masonry>
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

   const posts = await getBlogPosts({ type: BlogPostType.Post, status: BlogPostStatus.Published });

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
      posts: ensureSerializable(posts),
    }
  }
}

