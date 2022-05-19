import { Form } from "@components/Form";
import { SimpleMDE } from "@components/SimpleMDE";
import { BlogPost } from "@models/blog-post";
import { Autocomplete, Box, Button, Chip, Container, FormHelperText, SxProps, TextField, Theme, Typography } from "@mui/material";
import { ChevronLeft } from "mdi-material-ui";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

export interface BlogPostFormProps {
  tags?: string[];
  post?: BlogPost;
  onSave?: (data: FormData) => void;
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

export const BlogPostForm: React.FC<BlogPostFormProps> = ({ tags, post, onSave, onBack, sx = [] }: BlogPostFormProps) => {
  const {
    control,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: { slug: post?.slug ?? '', title: post?.title ?? '', content: post?.content ?? '', imageUrl: post?.imageUrl ?? '', tags: post?.tags ?? [] },
  });

  const simpleMDEOptions = useMemo<EasyMDE.Options>(() => ({
    hideIcons: ['preview', 'side-by-side', 'fullscreen', 'guide'],
    showIcons: ['code', 'table'],
    status: false,
  }), []);

  const saveChanges = () => {
    if (onSave) {
      const formValues = getValues();
      onSave(formValues);
    }
  };

  const navigateBack = () => {
    if (onBack) {
      onBack();
    }
  }

  return (
    <Box sx={() => [
      { display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as any}>
    <Box sx={(theme) => ({ display: 'flex', flex: '0 0 auto', alignItems: 'center', mt: theme.spacing(3), px: theme.spacing(3) })}>
      <Button sx={{ display: 'inline-flex' }} onClick={navigateBack}>
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
        onClick={saveChanges}
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
          <Autocomplete
            id="tags"
            multiple
            options={tags ?? []}
            freeSolo
            onChange={(data, value) => {
              setValue("tags", value);
            }}
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
              />
            )}
          />
        </Box>
      </Form>
    </Box>
  </Box>
  );
};
