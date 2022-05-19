import HttpStatus from 'http-status-codes';
import { withValidation } from 'next-validations';

import { BlogPostValidator } from '@models/blog-post.validator';
import { getBlogPostById } from '@services/blog-post.service';
import { nextConnectRequestHandler } from '@utils/http/next-connect-request-handler';

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
//   const { id } = req.query;
//   const post = await getBlogPostById(id as string);
//   if (!post) {
//     res.status(HttpStatus.NOT_FOUND);
//     return;
//   }

//   const updateRequest = req.body as BlogPost;
//   post.title = updateRequest.title;
//   post.content = updateRequest.content;
//   post.url = updateRequest.url;
//   post.image = updateRequest.image;
//   post.publishedAt = updateRequest.publishedAt;
//   post.status = updateRequest.status;

//   await updateBlogPost(id as string, post);

//   res.status(HttpStatus.NO_CONTENT).end();
// });

// handler.delete(async (req, res) => {
//   const { id } = req.query;
//   await deletelogPost(id as string);

//   res.status(HttpStatus.NO_CONTENT).end();
// });

export default handler;
