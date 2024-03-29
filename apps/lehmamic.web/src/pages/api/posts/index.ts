import { getBlogPostsPaged } from './../../../services/blog-post.service';
import HttpStatus from 'http-status-codes';

import { nextConnectRequestHandler } from '@utils/http/next-connect-request-handler';
import { BlogPostFilter, createBlogPost } from '@services/blog-post.service';
import { BlogPostType, BlogPostStatus, CreateOrUpdateBlogPostRequest } from '@models/blog-post';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

const handler = nextConnectRequestHandler();

handler.get(withApiAuthRequired(async (req, res) => {
  const { type, status } = req.query;

  const filter: BlogPostFilter = {};
  if (type) {
    filter.type = type as BlogPostType;
  }

  if (status) {
    filter.status = status as BlogPostStatus;
  }

  const posts = await getBlogPostsPaged(filter);

  res.status(HttpStatus.OK).json(posts.data);
}));

// const validate = withValidation({
//   schema: BlogPostValidator,
//   type: 'Joi',
//   mode: 'body',
// });

// handler.post(validate(), async (req, res) => {
handler.post(withApiAuthRequired(async (req, res) => {
  const createRequest = req.body as CreateOrUpdateBlogPostRequest;

  const createdPost = await createBlogPost(createRequest);

  res.status(HttpStatus.CREATED).json(createdPost);
}));

export default handler;
