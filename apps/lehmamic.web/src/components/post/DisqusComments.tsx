import { BlogPost } from "@models/blog-post";
import { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/system";
import { DiscussionEmbed } from "disqus-react";

export interface DisqusCommentsProps {
  disqusShortname: string;
  baseUrl: string;
  post: BlogPost;
  sx?: SxProps<Theme>;
}

export const DisqusComments: React.FC<DisqusCommentsProps> = ({ disqusShortname, baseUrl, post, sx = [] }) => {
  const disqusConfig = {
    url: `${baseUrl}/posts/${post.slug}`, //https://your-site-url/post-slug",
    identifier: post._id.toString(),
    title: post.title ,
  };

  return (
    <Box>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Box>
  )
};
