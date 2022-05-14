import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { LayoutProps } from "@components/Layout";
import { getSettings } from "@services/settings.service";
import { ensureSerializable } from "@utils/serialization";
import * as React from 'react';
import { Autocomplete, Box, Button, Chip, Container, styled, TextField, Typography } from "@mui/material";
import Link from "@components/Link";
import { ChevronLeft, ContentSave } from "mdi-material-ui";
import { Controller, useForm } from 'react-hook-form';
import { BlogPost, CreateBlogPostRequest } from "@models/blog-post";
import { useCreateBlogPost } from "@hooks/useCreateBlogPost";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Form = styled('form')(() => ({ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }));

interface CreateBlogPostsPageProps {
  layoutProps: LayoutProps;
}

interface FormData {
  slug: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
}

const tags = ['ARCHITECTURE', 'CODE', 'SECURITY'];

const CreateBlogPostsPage: NextPage<CreateBlogPostsPageProps> = ({ layoutProps }) => {
  const {
    control,
    // setValue,
    getValues,
    // reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'all', reValidateMode: 'onChange' });
  const router = useRouter();
  const mutateCreateBlogPost = useCreateBlogPost();

  const createBlogPost = (): void => {
    const blogPostFormValues = getValues();

    const blogPost: CreateBlogPostRequest = {
      ...blogPostFormValues,
      type: 'post',
      authors: [],
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

  return (
    <Box sx={() => ({ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' })}>
      <Box sx={(theme) => ({ display: 'flex', flex: '0 0 auto', alignItems: 'center', mt: theme.spacing(3), px: theme.spacing(3) })}>
        <Button sx={{ display: 'inline-flex' }}>
          <ChevronLeft /> Posts
        </Button>
        <Typography color="text.secondary">{
        // getStatusText()
        }</Typography>
        <Box sx={{ flex: '1 0 auto' }} />
        <Button
          variant="contained"
          color="primary"
          disabled={!isValid}
          onClick={createBlogPost}
        >
          Create
        </Button>
      </Box>

      {/* Blog post main data */}
      <Box sx={(theme) => ({
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            mt: theme.spacing(5),
            mb: theme.spacing(3),
          })}>
        <Form>
          <Container maxWidth="md" sx={(theme) => ({ flex: '1 0 auto' })}>
            {/* title */}
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextField
                  id="title"
                  label="Title"
                  value={value}
                  error={!!error}
                  helperText={error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  sx={(theme) => ({ width: '100%', pb: theme.spacing(3) })}
                />
              )}
            />

            {/* content */}
            <Controller
              name="content"
              control={control}
              rules={{ required: 'Content is required' }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextField
                  id="content"
                  label="Content"
                  multiline
                  value={value}
                  error={!!error}
                  helperText={error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  sx={(theme) => ({ width: '100%', pb: theme.spacing(3), flex: '1 0 auto' })}
                />
              )}
            />
          </Container>

          <Box sx={(theme) => ({ width: '300px', flex: '0 0 auto', pr: theme.spacing(2) })}>
            {/* slug */}
            <Controller
              name="slug"
              control={control}
              rules={{
                required: 'Slug is required',
                pattern: {
                  value: /^([a-z]|\d|-)+$/,
                  message: 'Invalid slug format',
                }
              }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextField
                  id="slug"
                  label="Slug"
                  value={value}
                  error={!!error}
                  helperText={error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  sx={(theme) => ({ width: '100%', pb: theme.spacing(3) })}
                />
              )}
            />

            {/* image url */}
            <Controller
              name="imageUrl"
              control={control}
              rules={{}}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextField
                  id="imageUrl"
                  label="imageUrl"
                  value={value}
                  error={!!error}
                  helperText={error?.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  sx={(theme) => ({ width: '100%', pb: theme.spacing(3) })}
                />
              )}
            />

            {/* tags */}
            <Controller
              name="tags"
              control={control}
              rules={{}}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                // <TextField
                //   id="imageUrl"
                //   label="imageUrl"
                //   value={value}
                //   error={!!error}
                //   helperText={error?.message}
                //   onChange={onChange}
                //   onBlur={onBlur}
                //   sx={(theme) => ({ width: '100%', pb: theme.spacing(3) })}
                // />
                <Autocomplete
                  multiple
                  id="tags"
                  options={tags}
                  value={value}
                  freeSolo
                  onChange={onChange}
                  onBlur={onBlur}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      // eslint-disable-next-line react/jsx-key
                      <Chip size="small" variant="filled" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tags"
                      placeholder="Tags"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default CreateBlogPostsPage;

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<CreateBlogPostsPageProps>> => {
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
  },
});
