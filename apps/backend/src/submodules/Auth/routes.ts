import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    //Todo: type(?): offline for refresh token
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
  }),
  (req, res) => {
    console.log('Success');
    res.redirect('/auth/google/success');
  }
);

router.get('/google/success', (req, res) => {
  res.send('Successfull login');
});

router.get('/google/failure', (req, res) => {
  res.send('Failure in login');
});

router.get('/', (req, res) => {
  res.send('New & improved authentication');
});

export default router;
