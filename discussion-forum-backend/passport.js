const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const GOOGLE_CLIENT_ID = "23651203690-ogrdgr3iiamjks16pf36rhq8delb81sp.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser((user,done)=>{
    done(null, user);
})
passport.deserializeUser((user,done)=>{
    done(null, user);
})