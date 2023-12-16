import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';
import { setUserRefresh, User } from '../database/postgreDataAccess';

import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const googleAuthRouter = express.Router();

// Request for when google authentication is initialized. Redirects to google
googleAuthRouter.get('/auth/google',
  passport.authenticate('google', { session: true, scope: ['profile', 'email'] })
);

// Callback after successful request where stuff can be done.
googleAuthRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/home/googleAuthFailure' }),
  async (req: Request, res: Response) => {
    if(!req.user) {
      return res.status(500);
    }
    const user = req.user as User;

    // Create refresh token
    const expiresIn = 24 * 60 * 60;
    const refresh: string = jwt.sign({id: user.id}, Bun.env.SECRET || "hi", {expiresIn});
    
    // Save refresh to cookies
    res.cookie('refresh', refresh, {
      //domain: "localhost:3000/dashboard",
      secure: true,
      sameSite: true
    });

    await setUserRefresh(user.id, refresh);
    // Successful request goes to dashboard. User will be availble in cookie in req.user
    res.redirect('/dashboard');
  }
);

export default googleAuthRouter;