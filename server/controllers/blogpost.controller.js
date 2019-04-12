/* Dependencies */
var Blogpost = require("../models/blogpost.model.js");
var bcrypt = require("bcryptjs");

/* retrieve all blogposts */
exports.list = function(req, res) {
  res.json(req.blogposts);
};

/* Create a blogpost */
exports.create = function(req, res) {
  var blogpost = new Blogpost(req.body);

  /* save to database */
  blogpost.save(err => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(blogpost);
    }
  });
};

/* Show the current blogpost */
exports.read = function(req, res) {
  res.json(req.blogposts);
};

/* Update a blogpost */
exports.update = function(req, res) {
  Blogpost.findByIdAndUpdate(req.blogposts._id, req.body, (err, updatedBlogpost) => {
    if (err) res.send(404).send(err);
    else {
      //NOTE: currently returns the old document, not the updated one.
      // not sure which one is more useful.
      res.json(updatedBlogpost);
    }
  });
};

/* Delete a blogpost */
exports.delete = function(req, res) {
  Blogpost.findByIdAndRemove(req.blogposts._id, (err, deletedBlogpost) => {
    if(err) res.status(404).send(err);
    else res.json(deletedBlogpost);
  });
};

/**
 * Middleware: 
 */

/* find N blogposts and pass in req.blogposts sorted by created date, either newest or oldest */
exports.getNewOrOld = function (req, res, next) {
  /* if order=old query param is passed, gets N oldest blogposts */
  var order = req.query.order == 'old' ? 1 : -1;
  Blogpost.find()
    .sort({
      createdDate: order
    })
    .limit(parseInt(req.query.num))
    .exec((err, blogposts) => {
      if (err) res.status(404).send(err);
      else {
        req.blogposts = blogposts;
        next();
      }
    });
};

/* find a blogpost by ID, then pass it to the next request handler */
exports.blogpostByID = function(req, res, next) {
  Blogpost.findById(req.params.blogpostId).exec((err, blogpost) => {
    if (err) res.status(404).send(err);
    else {
      req.blogposts = blogpost;
      next();
    }
  });
};