import { BlogPost, BlogPostStatus, BlogPostType } from "@models/blog-post";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { getSettings } from "@services/settings.service";
import { getBlogPostsPaged } from "@services/blog-post.service";
import { BlogPostCard } from "@components/post/BlogPostCard";
import { ensureSerializable } from "@utils/serialization";
import { Layout, LayoutProps } from "@components/Layout";
import { Masonry } from "@mui/lab";
import { ParsedUrlQuery } from "querystring";
import { PaginationResult } from "@models/pagination-result";

const pageSize = 2;

interface BlogPageProps {
  layoutProps: LayoutProps;
  posts: PaginationResult<BlogPost>;
}

interface BlogPageUrlQuery extends ParsedUrlQuery {
  page?: string;
}

const BlogPage: NextPage<BlogPageProps> = ( { layoutProps, posts }) => {

  return (
    <Layout {...layoutProps}>
      <Masonry columns={{ xs: 1, md: 1, lg: 2 }}
               spacing={3}
               defaultColumns={2}
               defaultSpacing={3}
               defaultHeight={450}>
        {posts.data.map((post, index) => (
          <BlogPostCard key={index} blogPost={post} />
        ))}
      </Masonry>
    </Layout>
  );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps<BlogPageProps, BlogPageUrlQuery> = async (context: GetServerSidePropsContext<BlogPageUrlQuery>): Promise<GetServerSidePropsResult<BlogPageProps>> => {
  const settings = await getSettings();
  const layoutProps: LayoutProps = {
    ...settings,
    imageUrl: settings.coverImageUrl,
    path: 'blog',
   };

   let page = parseInt(context.query.page as string ?? '0');
   if (isNaN(page)) {
    page = 0;
   }

   const posts = await getBlogPostsPaged(
    { type: BlogPostType.Post, status: BlogPostStatus.Published },
    { publishedAt: -1 },
    page * pageSize,
    pageSize);

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
      posts: ensureSerializable(posts),
    }
  }
}

