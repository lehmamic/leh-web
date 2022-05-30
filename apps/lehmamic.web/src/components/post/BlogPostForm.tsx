import { Form } from "@components/Form";
import { SimpleMDE } from "@components/SimpleMDE";
import { BlogPost, BlogPostStatus, getStatusDisplayName } from "@models/blog-post";
import { Autocomplete, Box, Button, Chip, Container, FormHelperText, SxProps, TextField, Theme, Typography } from "@mui/material";
import { ChevronLeft, TrashCanOutline } from "mdi-material-ui";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

export interface BlogPostFormProps {
  tags?: string[];
  post?: BlogPost;
  onSave?: (data: FormData) => void;
  onDelete?: () => void;
  onPublish?: () => void;
  onUnpublish?: () => void;
  onBack?: () => void;
  sx?: SxProps<Theme>;
}

export interface FormData {
  slug: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
}

export const BlogPostForm: React.FC<BlogPostFormProps> = ({ tags, post, onSave, onDelete, onPublish, onUnpublish, onBack, sx = [] }: BlogPostFormProps) => {

  const simpleMDEOptions = useMemo<EasyMDE.Options>(() => ({
    hideIcons: ['preview', 'side-by-side', 'fullscreen', 'guide'],
    showIcons: ['code', 'table'],
    status: false,
  }), []);

  const createDefaultValues = (post?: BlogPost) : FormData => {
    return {
      slug: post?.slug ?? '',
      title: post?.title ?? '',
      content: post?.content ?? '',
      imageUrl: post?.imageUrl ?? '',
      tags: post?.tags ?? [],
    };
  }

  const {
    control,
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: useMemo(() => createDefaultValues(post), [post]),
  });

  // required to set the real default value after the loading request returns
  useEffect(() => reset(createDefaultValues(post)), [reset, post]);

  const saveBlogPost = () => {
    if (onSave) {
      const formValues = getValues();
      onSave(formValues);
    }
  };

  const deleteBlogPost = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const navigateBack = () => {
    if (onBack) {
      onBack();
    }
  }

  const publishBlogPost = () => {
    if(onPublish) {
      onPublish();
    }
  };

  const unpublishBlogPost = () => {
    if(onUnpublish) {
      onUnpublish();
    }
  };

  return (
    <Box sx={() => [
      { display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as any}>
    <Box sx={(theme) => ({ display: 'flex', flex: '0 0 auto', alignItems: 'center', mt: theme.spacing(3), px: theme.spacing(3) })}>
      <Button sx={{ display: 'inline-flex' }} onClick={navigateBack}>
        <ChevronLeft /> Posts
      </Button>
      <Typography color="text.secondary" sx={(theme) => ({ ml: theme.spacing(2) })}>
        {getStatusDisplayName(post?.status ?? BlogPostStatus.Draft)}
      </Typography>
      <Box sx={{ flex: '1 0 auto' }} />
      {post && post.status === BlogPostStatus.Draft && (<Button onClick={publishBlogPost} sx={(theme) => ({ mr: theme.spacing(2) })}>Publish</Button>)}
      {post && post.status === BlogPostStatus.Published && (<Button onClick={unpublishBlogPost} sx={(theme) => ({ mr: theme.spacing(2) })}>Unpublish</Button>)}
      <Button
        variant="contained"
        color="primary"
        disabled={!isValid}
        onClick={saveBlogPost}
      >
        Save
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
              <>
                <SimpleMDE
                  id="content"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  options={simpleMDEOptions}
                  sx={(theme) => error ? {
                    border: `1px solid ${theme.palette.error.main}`,
                    borderRadius: '4px',
                  } : {}}
                />
                <FormHelperText error={!!error} sx={(theme) => ({ ml: theme.spacing(2) })}>
                  {error?.message}
                </FormHelperText>
              </>
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
            render={({ field: { onBlur, value }, fieldState: { error } }) => (
              <Autocomplete
                id="tags"
                multiple
                options={tags ?? []}
                freeSolo
                clearIcon={false}
                value={value}
                isOptionEqualToValue={(option, value) => option === value}
                onChange={(e, values) => setValue("tags", values)}
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
                    name="tags"
                    label="Tags"
                    placeholder="Tags"
                    variant="outlined"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            )}
          />

          {!!post && (
            <Button
              color="error"
              variant="outlined"
              // disabled={mutateDeleteBlogPost.isLoading}
              onClick={deleteBlogPost}
              sx={(theme) => ({ mt: theme.spacing(3), width: '100%' })}
            >
              <TrashCanOutline /> Delete post
            </Button>
          )}
        </Box>
      </Form>
    </Box>
  </Box>
  );
};
