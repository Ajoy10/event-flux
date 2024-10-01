import { Router } from 'express';
import passport from 'passport';
import { protectedRoute } from './middlewares';

const router = Router();

router.get('/verify', protectedRoute, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.delete('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.json(true);
  });
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    // TODO: type(?): offline for refresh token
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
  }),
  (req, res) => {
    console.log('Success');

    // TODO: Handle redirect properly
    res.redirect('/auth/google/success');
  }
);

router.get('/google/success', (req, res) => {
  res.redirect('http://localhost:4200');
  // .send(`Successfull login ${JSON.stringify(req.user)}`);
});

router.get('/google/failure', (req, res) => {
  res.send('Failure in login');
});

router.get('/', (req, res) => {
  res.send('New & improved authentication');
});

export default router;
