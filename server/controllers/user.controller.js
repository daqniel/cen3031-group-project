/* Dependencies */
var User = require("../models/user.model.js");

/* retrieve all users */
exports.list = function(req, res) {
  User.find({})
    .then(users => res.json(users))
    .catch(err => res.status(400).send(err));
};

/* Create a user */
exports.create = function(req, res) {
  var user = new User(req.body);
  /* Always false on user creation, can be set true by another admin */
  user.isAdmin = false;

  /* hash password and save to database */
  User.hashPassword(user.password, hashed => {
    user.password = hashed;
    user.save()
      .then(newUser => res.json(newUser))
      .catch(err => res.status(400).send(err))
  });
};

/* Read a user */
exports.read = function(req, res) {
  User.findOne(req.params)
    .then(foundUser => res.json(foundUser))
    .catch(err => res.status(400).send(err));
};

/* Update a user */
exports.update = function(req, res) {
  User.findOne(req.params)
    .then(foundUser => {
      foundUser.email = req.body.email;
      foundUser.phoneNumber = req.body.phoneNumber;
      foundUser.name = req.body.name;
      /* if password is changed, re-hash */
      if (foundUser.password != req.body.password) {
        User.hashPassword(req.body.password, hashed => {
          foundUser.password = hashed;
          foundUser
            .save()
            .then(updatedUser => res.json(updatedUser))
            .catch(err => res.status(400).send(err));
        });
      } else {
        foundUser
          .save()
          .then(updatedUser => res.json(updatedUser))
          .catch(err => res.status(400).send(err));
      }
    })
    .catch(err => res.status(400).send(err));
};

/* Delete a user */
exports.delete = function(req, res) {
  User.findOneAndRemove(req.params)
    .then(deletedUser => res.json(deletedUser))
    .catch(err => res.status(400).send(err));
};

/* post authentication, send user object in response */
exports.postAuth = function(req, res) {
  res.json(req.user);
};

/* destroy session */
exports.logout = function(req, res) {
  req.session
    .destroy()
    .then(() => res.send("Logged Out!"))
    .catch(err => res.status(400).send(err));
};

/**
 * Middleware
 */

//TODO: Restrict Read/Update/Delete by email to admin.
