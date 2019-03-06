
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
      if(err) res.send(404).send(err);
      else{
        res.json(updatedUser);
      }
    });
    // User.findById(userID, (err, updatedUser) => {
    //     updatedUser.set(req.body); 
    //     updatedUser.save();
    //     if(err) res.send(404).send(err);
    //     else {
    //         res.json(updatedUser);
    //     }
    // });

  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
};

/* Delete a user */
exports.delete = function(req, res) {
    userID = req.params.userId;
    User.findById(userID, function(err, deletedUser){
        if (err) res.status(404).send(err);
        else deletedUser.remove(function(err){
            if (err){
                res.status(400).send(err);
            }
            console.log("Article deleted.");
            res.json(deletedUser);
        });
  /** TODO **/
  /* Remove the article */
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
  Middleware: find a user by its ID, then pass it to the next request handler. 

  Find the user using a mongoose query, 
        bind it to the request object as the property 'user', 
        then finally call next
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
