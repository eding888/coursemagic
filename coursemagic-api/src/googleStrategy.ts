import passport from 'passport';
import { VerifyCallback } from 'passport-google-oauth20';
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
  function(accessToken: string, refreshToken: string, profile: UserProfile, done: VerifyCallback) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const user = {
      id: "123124",
      name: "swag"
    }
    done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: false | Express.User | null | undefined, done) {
  done(null, user);
});