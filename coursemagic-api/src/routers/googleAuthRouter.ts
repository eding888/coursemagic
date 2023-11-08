import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';

const googleAuthRouter = express.Router();

// Request for when google authentication is initialized. Redirects to google
googleAuthRouter.get('/auth/google',
  passport.authenticate('google', { session: true, scope: ['profile', 'email'] })
);

// Callback after successful request where stuff can be done.
googleAuthRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/swag' }),
  (req: Request, res: Response) => {
    res.redirect('/dashboard');
  }
);

export default googleAuthRouter;