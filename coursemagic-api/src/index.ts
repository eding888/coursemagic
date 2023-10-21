import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';
require('./googleStrategy');

const app = express();

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: Request, res: Response) => {
    res.redirect('/dashboard');
  }
);

const port = Bun.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
