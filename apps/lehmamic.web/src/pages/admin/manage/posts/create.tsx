import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { LayoutProps } from "@components/Layout";
import { getSettings } from "@services/settings.service";
import { ensureSerializable } from "@utils/serialization";
import { CreateOrUpdateBlogPostRequest } from "@models/blog-post";
import { useCreateBlogPost } from "@hooks/useCreateBlogPost";
import { useRouter } from "next/router";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import { useTags } from "@hooks/useTags";
import { useUsers } from "@hooks/useUsers";
import { BlogPostForm, FormData } from "@components/post/BlogPostForm";

interface CreateBlogPostsPageProps {
  layoutProps: LayoutProps;
}

const CreateBlogPostsPage: NextPage<CreateBlogPostsPageProps> = ({ layoutProps }) => {
  const router = useRouter();
  const { user } = useUser();

  const { data: tags } = useTags();
  const { data: users } = useUsers();
  const mutateCreateBlogPost = useCreateBlogPost();

  const createBlogPost = (formValues: FormData): void => {
    const author = users?.find(u => u.userId === user?.sub);
    const blogPost: CreateOrUpdateBlogPostRequest = {
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
  };

  const navigateBack = () => {
    router.push(`/admin/manage/posts`, undefined, { shallow: true });
  };

  return (
    <BlogPostForm tags={tags} baseUrl={layoutProps.baseUrl} onSave={createBlogPost} onBack={navigateBack} />
  );
};

export default withPageAuthRequired(CreateBlogPostsPage);

export const getServerSideProps: GetServerSideProps<CreateBlogPostsPageProps> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<CreateBlogPostsPageProps>> => {
  const settings = await getSettings();
  const layoutProps: LayoutProps = {
    ...settings,
    imageUrl: settings.coverImageUrl,
    path: 'admin/manage/posts/create',
    };

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
    }
  }
};
