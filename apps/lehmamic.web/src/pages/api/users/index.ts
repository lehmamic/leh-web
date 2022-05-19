import { getUsers } from '@services/user.service';
import HttpStatus from 'http-status-codes';

import { nextConnectRequestHandler } from '@utils/http/next-connect-request-handler';

const handler = nextConnectRequestHandler();

handler.get(async (req, res) => {

  const tags = await getUsers();

  res.status(HttpStatus.OK).json(tags);
});

export default handler;
