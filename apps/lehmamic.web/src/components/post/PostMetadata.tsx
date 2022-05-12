import { BlogPost } from "@models/blog-post";
import { User } from "@models/user";
import { Avatar, Box, SxProps, Theme, Typography } from "@mui/material";
import md5 from "md5";
import { useMemo } from "react";
import dayjs from 'dayjs';

export interface PostAuthorInfoProps {
  user: User;
  post: BlogPost;
  sx?: SxProps<Theme>;
}

export const PostMetadata: React.FC<PostAuthorInfoProps> = ({ user, post, sx = [] }) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const gravatarUrl = useMemo(() => `https://www.gravatar.com/avatar/${md5(user.email)}`, [user.email]);

  return (
    <Box sx={[
      { display: 'flex', flexDirection: 'row', alignItems: 'center' },
      ...(Array.isArray(sx) ? sx : [sx]),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any}>
      <Avatar alt={fullName} src={gravatarUrl} sx={{ width: 56, height: 56 }} />
      <Box sx={(theme) => ({ display: 'flex', flexDirection: 'column', ml: theme.spacing(2) })}>
        <Typography variant="subtitle1" component="span" sx={(theme) => ({ lineHeight: 1.4 })}>
          {fullName}
        </Typography>
        <Typography variant="subtitle1" component="span" sx={(theme) => ({ lineHeight: 1.4, fontWeight: 400, color: theme.palette.grey[500] })}>
          {dayjs(post.publishedAt).format("D MMMM YYYY")}
        </Typography>
      </Box>

    </Box>
  );
}
