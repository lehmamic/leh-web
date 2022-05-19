import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { LayoutProps } from "@components/Layout";
import { BlogPostForm, FormData } from "@components/post/BlogPostForm";
import { useBlogPostById } from "@hooks/useBlogPostById";
import { useTags } from "@hooks/useTags";
import { useUsers } from "@hooks/useUsers";
import { BlogPostType } from "@models/blog-post";
import { getBlogPostById } from "@services/blog-post.service";
import { getSettings } from "@services/settings.service";
import { ensureSerializable } from "@utils/serialization";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface EditBlogPostsPageProps {
  id: string;
  layoutProps: LayoutProps;
}

interface BlogPostUrlQuery extends ParsedUrlQuery {
  id: string;
}

const EditBlogPostsPage: NextPage<EditBlogPostsPageProps> = ({ id, layoutProps }) => {
  const router = useRouter();
  const { user } = useUser();

  const { data: tags } = useTags();
  const { data: users } = useUsers();
  const { data: post } = useBlogPostById(id);
  // const mutateCreateBlogPost = useCreateBlogPost();

  const updateBlogPost = (formValues: FormData): void => {
    /*
    const author = users?.find(u => u.userId === user?.sub);
    const blogPost: CreateBlogPostRequest = {
      ...formValues,
      type: 'post',
      authors: author ? [author._id] : [],
    };

    mutateCreateBlogPost.mutate(blogPost, {
      onSuccess: (result) => {
        // setSnackbar({ open: true, text: 'The blog post has been saved.', severity: 'success' });
        router.push(`/admin/manage/posts/${result._id}`, undefined, { shallow: true });
        // setBlogPostId(result.id);
      },
      onError: () => {
        // setSnackbar({ open: true, text: 'The blog post has not been saved due an error.', severity: 'error' });
      },
    });
    */
  };

  const navigateBack = () => {
    router.push(`/admin/manage/posts`, undefined, { shallow: true });
  };

  return (
    <BlogPostForm tags={tags} post={post} onSave={updateBlogPost} onBack={navigateBack} />
  );
};

export default withPageAuthRequired(EditBlogPostsPage);

export const getServerSideProps: GetServerSideProps<EditBlogPostsPageProps, BlogPostUrlQuery> = async (context: GetServerSidePropsContext<BlogPostUrlQuery>): Promise<GetServerSidePropsResult<EditBlogPostsPageProps>> => {
  // const post = await getBlogPostById(context.params?.id);
  // if (!post || post.type !== BlogPostType.Post) {
  //   return {
  //     notFound: true,
  //   };
  // }

  const settings = await getSettings();
  const layoutProps: LayoutProps = {
    ...settings,
    imageUrl: settings.coverImageUrl,
    path: 'admin/manage/posts/create',
    };

  return {
    props: {
      id: context.params?.id ?? '',
      layoutProps: ensureSerializable(layoutProps),
    }
  }
};
