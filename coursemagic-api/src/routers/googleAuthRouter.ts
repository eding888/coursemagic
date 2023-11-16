import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';
import { User } from '../database/postgreDataAccess';

const googleAuthRouter = express.Router();

// Request for when google authentication is initialized. Redirects to google
googleAuthRouter.get('/auth/google',
  passport.authenticate('google', { session: true, scope: ['profile', 'email'] })
);

// Callback after successful request where stuff can be done.
googleAuthRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/fail' }),
  (req: Request, res: Response) => {
    if(req.user) {
      console.log((req.user as User).id);
    }
    // Successful request goes to dashboard. User will be availble in cookie in req.user
    res.redirect('/dashboard');
  }
);

export default googleAuthRouter;