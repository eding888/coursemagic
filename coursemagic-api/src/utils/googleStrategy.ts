import passport from 'passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { getUserById, addUser, Class, User } from '../database/postgreDataAccess';

import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

var GoogleStrategy = require('passport-google-oauth20').Strategy;

// Interface defining profile returned by succesful google auth
interface UserProfile {
  id: string;
  displayName: string;
  emails: Array<{ value: string }>;
}

export interface Auth{
  id: string;
}

passport.use(new GoogleStrategy({
    clientID: Bun.env.GOOGLE_CLIENT_ID,
    clientSecret: Bun.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  // Callback for successful google auth
  async function(accessToken: string, refreshToken: string, profile: UserProfile, done: VerifyCallback) {

    const expiresIn = 10 * 60;
    const auth: string = jwt.sign({id: profile.id}, Bun.env.SECRET || "hi", {expiresIn});
    const user: User = {
      auth: auth,
      id: profile.id,
      name: profile.displayName
    }
    const userInDB = await getUserById(profile.id);
    if(!userInDB || userInDB.length === 0) {
      await addUser(profile.id, profile.displayName);
    }
    // Create user profile to be stored in cookie. This cookie will be
    // accessible in req.user
    done(null, user);
  }
));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: false | Express.User | null | undefined, done) {
  done(null, user);
});