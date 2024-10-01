import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from 'passport-google-oauth20';
import User from '../User';

export function setup(clientID: string, clientSecret: string) {
  passport.serializeUser((user: GoogleProfile, done) => {
    console.log('User');
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    console.log('Deserialized User, ');
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
        // TODO: Have to handle, same email differnet oauth provider scenario
        User.findOrCreateUser(
          { googleId: profile.id },
          {
            fullname: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profileImagePath:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : null,
          }
        )
          .then((user) => {
            if (user) {
              done(null, user);
            } else {
              done(new Error('No user found and could not create user'), null);
            }
          })
          .catch((err) => {
            done(err);
          });
        // console.log(request);
      }
    )
  );
}
