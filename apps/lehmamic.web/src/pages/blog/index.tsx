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
import { Pagination } from "@components/Pagination";
import { Box } from "@mui/material";

const DEFAULT_PAGE_SIZE = 2;

interface BlogPageProps {
  layoutProps: LayoutProps;
  posts: PaginationResult<BlogPost>;
  page: number;
  pageSize: number;
}

interface BlogPageUrlQuery extends ParsedUrlQuery {
  page?: string;
}

const BlogPage: NextPage<BlogPageProps> = ( { layoutProps, posts, page, pageSize }) => {

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
      <Box sx={(theme) => ({ display: 'flex', flexDirection: 'row', justifyContent: 'center', my: theme.spacing(4) })}>
        <Pagination current={page} total={posts.total / pageSize} />
      </Box>

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

   let page = parseInt(context.query.page as string ?? '1');
   if (isNaN(page) || page < 1) {
    page = 1;
   }

   const posts = await getBlogPostsPaged(
    { type: BlogPostType.Post, status: BlogPostStatus.Published },
    { publishedAt: -1 },
    (page - 1) * DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZE);

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
      posts: ensureSerializable(posts),
      page,
      pageSize: DEFAULT_PAGE_SIZE,
    }
  }
}

