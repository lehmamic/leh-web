import { publishBlogPostById } from './../../../../services/blog-post.service';
import HttpStatus from 'http-status-codes';

import { nextConnectRequestHandler } from '@utils/http/next-connect-request-handler';

const handler = nextConnectRequestHandler();

handler.post(async (req, res) => {
  const { id } = req.query;

  const result = await publishBlogPostById(id as string);
  if(!result) {
    res.status(HttpStatus.NOT_FOUND);
    return;
  }

  res.status(HttpStatus.OK).json(result);
})

export default handler;
