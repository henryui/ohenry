import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { UserService } from '../services';
import { GoogleUserProfile, LeanUser } from '../services/UserService';

type UserTokens = {
  accessToken?: string;
  refreshToken?: string;
};

export type RequestUser = LeanUser & {
  tokens: UserTokens;
};

passport.serializeUser((user, done) =>
  done(null, {
    id: (user as RequestUser).id,
    tokens: (user as RequestUser).tokens,
  }),
);

passport.deserializeUser((desc: { id: string; tokens: UserTokens }, done) => {
  if (!desc?.id) return done(new Error('Session not found'));
  const { id, tokens } = desc;

  return UserService.findById(id)
    .then(user =>
      done(null, {
        ...user,
        id,
        tokens,
      }),
    )
    .catch(err => {
      console.error('Error deserializing user', err);
      return done(err);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://henry.brokerbay.ca:3334/auth/google/callback',
    },
    (accessToken, refreshToken, profile: GoogleUserProfile, done) => {
      UserService.createFromOAuth(profile)
        .then(user => {
          if (!user) return done(null, false);
          const reqUser: RequestUser = {
            ...user,
            tokens: {
              accessToken,
              refreshToken,
            },
          };
          return done(null, reqUser);
        })
        .catch(err => {
          console.error('Error creating/fetching google based user', err);
          return done(err);
        });
    },
  ),
);

export default passport;
