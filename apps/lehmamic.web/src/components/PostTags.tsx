import { BlogPost } from "@models/blog-post";
import { Box, Chip, SxProps, Theme } from "@mui/material";

export interface PostTagsProps {
  post: BlogPost;
  sx?: SxProps<Theme>;
}

export const PostTags: React.FC<PostTagsProps> = ({ post, sx = [] }) => {

  return (
    <Box sx={[
      (theme: Theme) =>({ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: theme.spacing(1), flexWrap: 'wrap' }),
      ...(Array.isArray(sx) ? sx : [sx]),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any}>

      {post.tags.map(tag => (
        <Chip key={tag} label={tag} size="small" />
      ))}
    </Box>
  );
}
