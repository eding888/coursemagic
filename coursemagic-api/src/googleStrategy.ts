import passport from 'passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { findUserById, addUser, addClass, Class, User } from './database/postgreDataAccess';
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// Interface defining profile returned by succesful google auth
interface UserProfile {
  id: string;
  displayName: string;
  emails: Array<{ value: string }>;
}

passport.use(new GoogleStrategy({
    clientID: Bun.env.GOOGLE_CLIENT_ID,
    clientSecret: Bun.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  // Callback for successful google auth
  async function(accessToken: string, refreshToken: string, profile: UserProfile, done: VerifyCallback) {
    console.log(accessToken);
    console.log(refreshToken);
    const user: User = {
      id: profile.id,
      name: profile.displayName
    }
    console.log(user);
    const userInDB = await findUserById(profile.id);
    if(userInDB && userInDB.length === 0) {
      await addUser(user);
    }

    const newClass: Class = {
      userid: user.id,
      startTime: 10,
      endTime: 15,
      creditHours: 3,
      lectureHall: "hanes art center"
    };
    await addClass(newClass);

    // Create user profile to be stored in cookie. This cookie will be
    // accessible in req.user
    done(null, user);
  }
));


// IDEK what these do but it works so...
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: false | Express.User | null | undefined, done) {
  done(null, user);
});