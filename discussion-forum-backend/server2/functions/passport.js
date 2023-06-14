const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const GOOGLE_CLIENT_ID = "23651203690-id1iv3m2n9lfdrv3knq9dc3a0mj5jh3q.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/user/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // Here, you can perform actions after the user is authenticated
    // For example, you can store the user's profile in the session or database
    // In this example, we'll log the user's profile to the console
    console.log(profile);
    return done(null, profile);
  }
)); 

passport.serializeUser((user,done)=>{
    done(null, user);
})
passport.deserializeUser((user,done)=>{
    done(null, user);
})