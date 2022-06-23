import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { LayoutProps } from "@components/Layout";
import { BlogPostForm, FormData } from "@components/post/BlogPostForm";
import { useBlogPostById } from "@hooks/useBlogPostById";
import { useDeleteBlogPost } from "@hooks/useDeleteBlogPost";
import { usePublishBlogPost } from "@hooks/usePublishBlogPost";
import { useTags } from "@hooks/useTags";
import { useUnpublishBlogPost } from "@hooks/useUnpublishBlogPost";
import { useUpdateBlogPost } from "@hooks/useUpdateBlogPost";
import { useUsers } from "@hooks/useUsers";
import { CreateOrUpdateBlogPostRequest } from "@models/blog-post";
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
  const { data: post, refetch } = useBlogPostById(id);
  const mutateUpdateBlogPost = useUpdateBlogPost();
  const mutateDeleteBlogPost = useDeleteBlogPost();
  const mutatePublishBlogPost = usePublishBlogPost();
  const mutateUnpublishBlogPost = useUnpublishBlogPost();

  const updateBlogPost = (formValues: FormData): void => {
    const author = users?.find(u => u.userId === user?.sub);
    const blogPost: CreateOrUpdateBlogPostRequest = {
      ...formValues,
      type: 'post',
      authors: author ? [author._id] : [],
    };

    mutateUpdateBlogPost.mutate({ id, blogPost }, {
      onSuccess: (result) => {
        // setSnackbar({ open: true, text: 'The blog post has been saved.', severity: 'success' });
        // setBlogPostId(result.id);
      },
      onError: () => {
        // setSnackbar({ open: true, text: 'The blog post has not been saved due an error.', severity: 'error' });
      },
    });
  };

  const deleteBlogPost = (): void => {
    mutateDeleteBlogPost.mutate(id , {
      onSuccess: (result) => {
        // setSnackbar({ open: true, text: 'The blog post has been saved.', severity: 'success' });
        router.push(`/admin/manage/posts`, undefined, { shallow: true });
      },
      onError: () => {
        // setSnackbar({ open: true, text: 'The blog post has not been saved due an error.', severity: 'error' });
      },
    });
  }

  const publishBlogPost = ():void => {
    mutatePublishBlogPost.mutate({ id }, {
      onSuccess: (result) => {
        // setSnackbar({ open: true, text: 'The blog post has been saved.', severity: 'success' });
        refetch();
      },
      onError: () => {
        // setSnackbar({ open: true, text: 'The blog post has not been saved due an error.', severity: 'error' });
      },
    });
  }

  const unpublishBlogPost = ():void => {
    mutateUnpublishBlogPost.mutate({ id }, {
      onSuccess: (result) => {
        // setSnackbar({ open: true, text: 'The blog post has been saved.', severity: 'success' });
        refetch();
      },
      onError: () => {
        // setSnackbar({ open: true, text: 'The blog post has not been saved due an error.', severity: 'error' });
      },
    });
  }

  const navigateBack = () => {
    router.push(`/admin/manage/posts`, undefined, { shallow: true });
  };

  return (
    <BlogPostForm
      tags={tags}
      post={post}
      baseUrl={layoutProps.baseUrl}
      isSaving={mutateUpdateBlogPost.isLoading}
      isDeleting={mutateDeleteBlogPost.isLoading}
      isPublishing={mutatePublishBlogPost.isLoading}
      onSave={updateBlogPost}
      onDelete={deleteBlogPost}
      onPublish={publishBlogPost}
      onUnpublish={unpublishBlogPost}
      onBack={navigateBack}
    />
  );
};

export default withPageAuthRequired(EditBlogPostsPage);

export const getServerSideProps: GetServerSideProps<EditBlogPostsPageProps, BlogPostUrlQuery> = async (context: GetServerSidePropsContext<BlogPostUrlQuery>): Promise<GetServerSidePropsResult<EditBlogPostsPageProps>> => {
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
