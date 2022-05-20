import HttpStatus from 'http-status-codes';
import { withValidation } from 'next-validations';

import { BlogPostValidator } from '@models/blog-post.validator';
import { deleteBlogPost, getBlogPostById, updateBlogPost } from '@services/blog-post.service';
import { nextConnectRequestHandler } from '@utils/http/next-connect-request-handler';
import { CreateOrUpdateBlogPostRequest } from '@models/blog-post';

const handler = nextConnectRequestHandler();

handler.get(async (req, res) => {
  const { id } = req.query;
  const post = await getBlogPostById(id as string);

  if (!post) {
    res.status(HttpStatus.NOT_FOUND);
    return;
  }

  res.status(HttpStatus.OK).json(post);
});

// const validate = withValidation({
//   schema: BlogPostValidator,
//   type: 'Joi',
//   mode: 'body',
// });

// handler.put(validate(), async (req, res) => {
handler.put(async (req, res) => {
  const { id } = req.query;
  const updateRequest = req.body as CreateOrUpdateBlogPostRequest;

  const result = await updateBlogPost(id as string, updateRequest);
  if(!result) {
    res.status(HttpStatus.NOT_FOUND);
    return;
  }

  res.status(HttpStatus.NO_CONTENT).end();
});

handler.delete(async (req, res) => {
  const { id } = req.query;
  await deleteBlogPost(id as string);

  res.status(HttpStatus.NO_CONTENT).end();
});

export default handler;
