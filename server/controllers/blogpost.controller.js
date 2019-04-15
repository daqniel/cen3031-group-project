/* Dependencies */
var Blogpost = require("../models/blogpost.model.js");

/* retrieve all blogposts */
exports.list = function(req, res) {
  res.json(req.blogposts);
};

/* Create a blogpost */
exports.create = function(req, res) {
  var blogpost = new Blogpost(req.body);

  /* save to database */
  blogpost.save()
    .then(newBlogpost => res.json(newBlogpost))
    .catch(err => res.status(400).send(err));
};

/* Show the current blogpost */
exports.read = function(req, res) {
  Blogpost.findById(req.params)
    .then(foundBlogpost => res.json(foundBlogpost))
    .catch(err => res.status(400).send(err));
};

/* Update a blogpost */
exports.update = function(req, res) {
  Blogpost.findById(req.params)
    .then(foundBlogpost => {
      foundBlogpost.title = req.body.title;
      foundBlogpost.text = req.body.text;
      foundBlogpost.save()
        .then(updatedBlogpost => res.json(updatedBlogpost))
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
};

/* Delete a blogpost */
exports.delete = function(req, res) {
  Blogpost.findByIdAndRemove(req.params)
    .then(deletedBlogpost => res.json(deletedBlogpost))
    .catch(err => res.status(400).send(err));
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
    .then(foundBlogposts => req.blogposts = foundBlogposts)
    .catch(err => res.status(400).send(err))
    .then(() => next());
};