import HttpStatus from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { Logger } from '../logger/logger';

export const nextConnectRequestHandler = () => {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError: (err, req, res) => {
      Logger.error(err, 'An unhandled error happened');
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    },
  }).use((req, res, next) => {
    const startTime = process.hrtime();

    next();

    const elapsed = process.hrtime(startTime)[1] / 1000000; // divide by a million to get nano to milli

    Logger.info(
      { method: req.method, path: req.url, query: req.query, elapsed },
      `Request finished in ${elapsed} with status ${res.statusCode}`,
    );
  });
};
