
/* Dependencies */
var mongoose = require('mongoose'), 
    User = require('../models/user.model.js');

/* Create a User */
exports.create = function(req, res) {
  var user = new User(req.body);

  /* save to mongoDB */
  user.save(err => {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Show the current user */
exports.read = function(req, res) {
  req.body = req.user;
  res.json(req.user);
};

/* Update a user */
exports.update = function(req, res) {
  User.findOneAndUpdate(req.params, req.body, (err, updatedUser) => {
    if(err) res.status(404).send(err);
    else{
      res.json(updatedUser);
    }
  });
};

/* Delete a user */
exports.delete = function(req, res) {
  User.findOneAndRemove(req.params, (err, deletedUser) =>{
    console.log(deletedUser);
    //NOTE: There maybe a more correct way to do this
    if (!deletedUser) res.status(404).send("User does not exist.");
    else res.send(deletedUser);
  });
};


/* retrieve all users */
exports.list = function(req, res){
    User.find({}, (err, users) => {
        if (err) res.status(404).send(err);
        res.json(users);
        console.log('all users retrieved.');
    });
};

/* 
  Middleware: find a user by their email, then pass it to the next request handler. 
 */
exports.userByEmail = function(req, res, next, email) {
  User.findOne(req.params).exec((err, user) => {
    if(err) res.status(404).send(err);
    else {
      req.user = user;
      next();
    }
  });
};
