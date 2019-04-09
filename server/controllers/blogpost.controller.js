/* Dependencies */
var Blogpost = require("../models/blogpost.model.js");
var bcrypt = require("bcryptjs");

/* retrieve all blogposts */
exports.list = function(req, res) {
  res.json(req.blogpost);
};

/* Create a Blogpost */
exports.create = function(req, res) {
  var blogpost = new Blogpost(req.body);

  /* save to mongoDB */
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
  res.json(req.blogpost);
};

/* Update a blogpost */
exports.update = function(req, res) {
  Blogpost.findByIdAndUpdate(req.blogpost._id, req.body, (err, updatedBlogpost) => {
    if (err) res.send(404).send(err);
    else {
      //NOTE: currently returns the old document, not the updated one.
      res.json(updatedBlogpost);
    }
  });
};

/* Delete a blogpost */
exports.delete = function(req, res) {
  Blogpost.findByIdAndRemove(req.blogpost._id, (err, deletedBlogpost) => {
    if(err) res.status(404).send(err);
    else res.json(deletedBlogpost);
  });
};

/* 
  Middleware: find a blogpost by ID, then pass it to the next request handler. 
 */
exports.blogpostByID = function(req, res, next) {
  Blogpost.findById(req.params.blogpostId).exec((err, blogpost) => {
    if (err) res.status(404).send(err);
    else {
      req.blogpost = blogpost;
      next();
    }
  });
};

/* 
  Middleware: find N specials and pass on sorted by created date,
  either newest or oldest.
 */
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
        req.blogpost = blogposts;
        next();
      }
    });
};