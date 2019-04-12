const LocalStrategy = require("passport-local"),
  mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

/* get user model */
const User = require("../models/user.model");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Check if user exists
      console.log("MHMHMH");
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { msg: "Email not registered" });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, success) => {
            if (err) throw err;
            if (success) {
              return done(null, user);
            } else {
              return done(null, false, { msg: "Password incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    User.findOne({email: email}, (err, user) => {
      done(err, user);
    });
  });
};
