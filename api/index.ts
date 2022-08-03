import 'dotenv/config';
import express from 'express';
import { expressLoader, redisLoader, schema } from './loader';

(async () => {
  try {
    const startTime = Date.now();
    const app = express();

    const redisClient = redisLoader();
    expressLoader(app, redisClient);
    await schema.connect(process.env.MONGO_URI!);

    const server = app.listen(process.env.PORT || 3334, () => {
      // @ts-ignore
      app.server = server;
      const seconds = (Date.now() - startTime) / 1000;
      console.info(
        `APP started on port ${process.env.PORT || 3334} in ${seconds}`,
      );
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
