import { getAllTags } from '@services/blog-post.service';
import HttpStatus from 'http-status-codes';

import { nextConnectRequestHandler } from '@utils/http/next-connect-request-handler';

const handler = nextConnectRequestHandler();

handler.get(async (req, res) => {

  const tags = await getAllTags();

  res.status(HttpStatus.OK).json(tags);
});

export default handler;
