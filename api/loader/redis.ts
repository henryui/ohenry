import Redis from 'ioredis';

const redisLoader = () => {
  const redisOption = {
    port: parseInt(process.env.REDIS_PORT || '22223', 10),
    host: process.env.REDIS_HOST || 'host',
    password: process.env.REDIS_PASSWORD,
    retryStrategy(times: number) {
      // Same retry strategy with APP
      if (times > 100) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(times * 100, 3000);
    },
  };
  const client = new Redis(redisOption);
  return client;
};

export default redisLoader;
