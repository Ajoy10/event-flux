import { RequestHandler } from 'express';

export const protectedRoute: RequestHandler = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(new Error('Unauthenticated!')); // TODO: Better error management
  }
};
