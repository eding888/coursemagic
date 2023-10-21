import passport from 'passport';
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
  function(accessToken: string, refreshToken: string, profile: UserProfile, done: () => void) {
    done();
  }
));