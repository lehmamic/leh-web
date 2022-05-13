import bunyan from 'bunyan';

export const Logger: bunyan = bunyan.createLogger({
  name: 'leh-web',
  // other bunyan config
});
