const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["openid", "profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Profile:", profile);
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
            isEmailConfirmed: true,
            provider: "google",
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        console.error("Error processing Google login:", err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'email', 'name', 'gender', 'profileUrl'] 
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("----------------");
      console.log(profile);
      console.log("----------------");

      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            isEmailConfirmed: true,
            facebookId: profile.id,
            provider: "facebook",
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error("User not found"), null);
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
