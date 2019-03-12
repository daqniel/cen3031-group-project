/* Dependencies */
var Blogpost = require("../models/blogpost.model.js");

/* Create a Blogpost */
exports.create = function(req, res) {
  var blogpost = new Blogpost(req.body);

  /* save to mongoDB */
  blogpost.save(err => {
    if (err) {
      // console.log(err);
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
    // console.log(deletedBlogpost);
    if (!deletedBlogpost) res.status(404).send("Blogpost does not exist.");
    else res.send(deletedBlogpost);
  });
};

/* retrieve all blogposts */
exports.list = function(req, res) {
  Blogpost.find({}, (err, blogpost) => {
    if (err) res.status(404).send(err);
    res.json(blogpost);
    // console.log('all blogposts retrieved.');
  });
};

/* 
  Middleware: find a blogpost by ID, then pass it to the next request handler. 
 */
exports.blogpostByID = function(req, res, next) {
  blogpost_id = req.params.blogpost_id;
  Blogpost.findById(blogpost_id).exec((err, blogpost) => {
    if (err) res.status(404).send(err);
    else {
      req.blogpost = blogpost;
      next();
    }
  });
};
