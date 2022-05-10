import { Header } from "@components/Header";
import { MaterialCover } from "@components/MaterialCover";
import { Container } from "@mui/material";
import { Settings } from "@models/settings";
import { BlogPost } from "@models/blog-post";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import * as React from 'react';
import { getSettings } from "@services/settings.service";
import { getBlogPosts } from "@services/blog-post.service";
import { BlogPostCard } from "@components/BlogPostCard";
import { ensureSerializable } from "@utils/serialization";


interface BlogPageProps {
  settings: Settings;
  posts: BlogPost[];
}


const BlogPage: NextPage<BlogPageProps> = ( { settings, posts }) => {

  return (
    <main>
      <Header title={settings.title} />
      <MaterialCover coverImage={settings.coverImageUrl} sx={(theme) => ({ mb: theme.spacing(5) })} />
      <Container maxWidth="lg" sx={(theme) => ({ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(3) })}>
        {posts.map((post) => (
          <BlogPostCard key={post._id} blogPost={post} />
        ))}
      </Container>
    </main>
  );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlogPageProps>> => {
  const settings = await getSettings();
  const posts = await getBlogPosts()

  return {
    props: {
      settings: ensureSerializable(settings),
      posts: ensureSerializable(posts),
    }
  }
}

