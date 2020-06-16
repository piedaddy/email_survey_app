const passport = require("passport"); //gives express idea how to handle auth
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users"); // one argumment like this means that we are trying to pull something out of mongoose
//User is now our model class, which means that it is connected to the mongoDB collection which will hold all the records

passport.serializeUser((user, done) => {
  //this user is whatever we pullled out of db below in the googlestrategy code
  done(null, user.id); //done is a callback that we have to call after we have finished soemthing, first arg is an err, second is the idnetifying piece of info
  //we use the user.id to indentify and make the cookie bc all users with have a user id, but some might in the future not have a google id, maybe theyll have a fb one etc
  //we use user.id to find a user that is stored in the DB
}); //turned mongoose model into id

passport.deserializeUser((id, done) => {
  //turn id back into mongoose model
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy( //this will help us identify a user coming in from the OAuth flow, OAuth flow is only to allow someone to sign in, after that we only care about our interal ids
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true, //if we encounter a proxy, we are telling it to trust it, so it can keep the httpS bc normally if it encounters a proxy on its way to or from the server it doesnt trust it and wont use https itll use http
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken); //this access token will come from when a user has logged in with google and passport took the necessary code

      // this query will return a promise
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        return done(null, existingUser);
        //first arg is err message
        //second arg is user record
      }
      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
      ///creating a model instance
    }
  )
); //creates new instance of google strategy
