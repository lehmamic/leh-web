import { AdminLayout } from "@components/admin/AdminLayout";
import { LayoutProps } from "@components/Layout";
import { BlogPost, BlogPostType } from "@models/blog-post";
import { Box, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useBlogPosts } from "@hooks/useBlogPosts";
import { getSettings } from "@services/settings.service";
import { ensureSerializable } from "@utils/serialization";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { getStatusDisplayName } from "@models/blog-post.utils";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

interface ManageBlogPostsPageProps {
  layoutProps: LayoutProps;
}

const ManageBlogPostsPage: NextPage<ManageBlogPostsPageProps> = ({ layoutProps }) => {
  const router = useRouter();
  const { data } = useBlogPosts(BlogPostType.Post, null);

  const navigateToEditBlogPost = (post: BlogPost): void => {
    router.push(`/admin/manage/posts/${post._id}`);
  };

  const navigateToNewBlogPost = (): void => {
    router.push(`/admin/manage/posts/create`);
  };

  return (
    <AdminLayout {...layoutProps}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <h1>Posts</h1>
        <Box sx={{ flex: '1 0 auto' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Button
            variant="contained"
            color="primary"
            // disabled={Object.keys(errors).length > 0}
            onClick={navigateToNewBlogPost}
            // className={clsx({ [classes.buttonSuccess]: mutation.isSuccess, [classes.buttonFailed]: mutation.isError })}
          >
            New post
          </Button>
          {/* {mutation.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />} */}
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((p, index) => (
              <TableRow
                key={index}
                onClick={() => navigateToEditBlogPost(p)}
                sx={(theme) => ({
                  '&:last-child td, &:last-child th': { border: 0 },
                  ':hover': { cursor: 'pointer', backgroundColor: theme.palette.grey[100] },
                })}
              >
                <TableCell>{p.title}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={getStatusDisplayName(p.status)}
                    color={p.status === 'published' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
};

export default withPageAuthRequired(ManageBlogPostsPage);


export const getServerSideProps: GetServerSideProps<ManageBlogPostsPageProps> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ManageBlogPostsPageProps>> => {
  const settings = await getSettings();
  const layoutProps: LayoutProps = {
    ...settings,
    imageUrl: settings.coverImageUrl,
    path: 'admin/manage/posts',
    };

  return {
    props: {
      layoutProps: ensureSerializable(layoutProps),
    }
  }
};
