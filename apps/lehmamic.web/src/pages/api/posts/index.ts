import HttpStatus from 'http-status-codes';

import { nextConnectRequestHandler } from '@utils/http/next-connect-request-handler';
import { BlogPostFilter, createBlogPost, getBlogPosts } from '@services/blog-post.service';
import { BlogPostType, BlogPostStatus, CreateOrUpdateBlogPostRequest } from '@models/blog-post';

const handler = nextConnectRequestHandler();

handler.get(async (req, res) => {
  const { type, status } = req.query;

  const filter: BlogPostFilter = {};
  if (type) {
    filter.type = type as BlogPostType;
  }

  if (status) {
    filter.status = status as BlogPostStatus;
  }

  const posts = await getBlogPosts(filter);

  res.status(HttpStatus.OK).json(posts);
});

// const validate = withValidation({
//   schema: BlogPostValidator,
//   type: 'Joi',
//   mode: 'body',
// });

// handler.post(validate(), async (req, res) => {
handler.post(async (req, res) => {
  const createRequest = req.body as CreateOrUpdateBlogPostRequest;

  const createdPost = await createBlogPost(createRequest);

  res.status(HttpStatus.CREATED).json(createdPost);
});

export default handler;
