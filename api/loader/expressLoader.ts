import helmet from 'helmet';
import express, { Express, Request, Response, NextFunction } from 'express';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import type { Redis } from 'ioredis';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import passport from './passport';
import assets from '../controllers/_assets.json';

const expressLoader = (app: Express, redisClient: Redis) => {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      permittedCrossDomainPolicies: false,
      referrerPolicy: false,
      expectCt: false,
    }),
  );

  const RedisStore = connectRedis(session);

  app.use(expressLayouts);
  app.set('view engine', 'ejs');
  app.use(
    express.static(path.join(__dirname, '..', '..', 'dist'), {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }),
  );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '10mb' }));

  const sessionCookieName = process.env.SESSION_COOKIE_NAME || 'connect.sid2';
  const sessionCookieDomain = process.env.SESSION_COOKIE_DOMAIN;
  const sessionSecret = process.env.SESSION_SECRET || 'sessionsecret2';
  const sessionMiddleware = session({
    store: new RedisStore({
      client: redisClient,
      prefix: 'henry:sess:',
    }),
    name: sessionCookieName,
    secret: sessionSecret,
    cookie: {
      maxAge: 168 * 60 * 60 * 1000,
      domain: sessionCookieDomain,
    },
    resave: false,
    saveUninitialized: false,
  });

  app.use(cookieParser());
  app.use(sessionMiddleware);

  const corsOptions = {
    origin: process.env.JWT_CORS_ORIGIN?.split(',') || '-',
    allowedHeaders: ['x-csrf-token', 'content-type'],
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', routes());

  app.get('/auth/google', (req, res, next) => {
    try {
      return passport.authenticate('google', { scope: ['email', 'profile'] })(
        req,
        res,
        next,
      );
    } catch (err) {
      return res.status(500).send('Google OAuth2 Error');
    }
  });

  app.get('/auth/google/callback', (req, res, next) => {
    try {
      return passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/google/failure',
      })(req, res, next);
    } catch (err) {
      return res.status(500).send('Google OAuth2 Callback Error');
    }
  });

  app.use('/', (_req, res) => {
    try {
      return res.render('home', {
        assets,
      });
    } catch (err) {
      console.error('Failed to render home', err);
      res.status(502).send('Home page cannot be loaded');
    }
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) =>
    res.status(500).json({
      name: err?.name,
      message: err?.message,
    }),
  );
};

export default expressLoader;
