/* Dependencies */
var mongoose = require("mongoose"),
  passport = require("passport"),
  bcrypt = require("bcryptjs"),
  User = require("../models/user.model.js");

/* Create a User */
exports.create = function(req, res) {
  // var user = new User({
  //   name: {
  //     first: req.query.fname,
  //     middle: req.query.mname,
  //     last: req.query.lname
  //   },
  //   email: req.query.email,
  //   phoneNumber: req.query.phoneNumber,
  //   password: req.query.password,
  //   isAdmin: req.query.isAdmin
  // });

  console.log(req.session);

  var user = new User({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.query.phoneNumber,
    password: req.query.password,
    isAdmin: false // should always be false on creation, can be changed into admin account after by another admin
  });


  /* Hash password and save to database */
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      user.save((err, newUser) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(newUser);
        }
      });
    });
  });
};

/* Show the current user */
exports.read = function(req, res) {
  req.body = req.user;
  res.json(req.user);
};

exports.readWithPassword = function(req, res) {
  if (req.params.password != undefined && req.user != undefined) {
    if (req.params.password != req.user.password) {
      res.status(404).json({ err: "Could not read, password mismatch." });
    } else {
      res.json(req.user);
    }
  } else if (!req.user) {
    res.status(404).json({ err: `User '${req.params.email}' not found` });
  } else {
    res.status(404).json({ err: "No password provided" });
  }
};

/* Update a user */
exports.update = function(req, res) {
  User.findOneAndUpdate(req.params, req.body, (err, updatedUser) => {
    if (err) res.status(404).send(err);
    else {
      res.json(updatedUser);
    }
  });
};

/* Delete a user */
exports.delete = function(req, res) {
  User.findOneAndRemove(req.params, (err, deletedUser) => {
    console.log(deletedUser);
    //NOTE: There maybe a more correct way to do this
    if (!deletedUser) res.status(404).send("User does not exist.");
    else res.send(deletedUser);
  });
};

/* retrieve all users */
exports.list = function(req, res) {
  User.find({}, (err, users) => {
    if (err) res.status(404).send(err);
    res.json(users);
    console.log("all users retrieved.");
  });
};

/* 
  Middleware: find a user by their email, then pass it to the next request handler. 
 */
exports.userByEmail = function(req, res, next, email) {
  User.findOne({
    email: req.params.email
  }).exec((err, user) => {
    if (err) {
      res.status(404).send(err);
      console.log("is this running?");
    } else {
      req.user = user;
      next();
    }
  });
};

exports.postAuth = function(req, res) {
  console.log('postAuth', req.user);
  if(req.session.passport.pageViews){
    req.session.passport.pageViews++;
  }
  else{
    req.session.passport.pageViews = 1;
  }
  console.log(req.session);
  res.json(req.user);
};

exports.logout = function(req, res) {
  req.session.destroy( err => {
    console.log('should be destroyed', req.session);
    if(err) res.status(400).send(err);
    else res.send('Logged Out!');
  });
};