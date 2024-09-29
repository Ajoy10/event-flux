import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

export function setup(clientID: string, clientSecret: string) {
  passport.serializeUser((user: Profile, done) => {
    console.log('User', user.id);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    console.log(id);
    done(null, id);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: '/auth/google/callback',
      },
      function (accessToken, refreshToken, profile, done) {
        // The function run when google confirms their identity
        console.log('Got ', profile);
        // console.log(request);
        done(null, profile);
      }
    )
  );
}
