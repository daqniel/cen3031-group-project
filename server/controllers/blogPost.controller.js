
/* Dependencies */
var mongoose = require('mongoose'), 
    BlogPost = require('../models/blogPost.model.js');

/* Create a BlogPost */
exports.create = function(req, res) {
  var blogPost = new BlogPost(req.body);

  /* save to mongoDB */
  blogPost.save(err => {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(blogPost);
    }
  });
};

/* Show the current blogPost */
exports.read = function(req, res) {
  req.body = req.blogPost;
  res.json(req.blogPost);
};

/* Update a blogPost */
exports.update = function(req, res) {
  BlogPost.findOneAndUpdate(req.params, req.body, (err, updatedBlog) => {
    if(err) res.send(404).send(err);
    else{
      res.json(updatedBlog);
    }
  });
};

/* Delete a blogPost */
exports.delete = function(req, res) {
  BlogPost.findOneAndRemove(req.params, (err, deletedBlog) =>{
    console.log(deletedBlog);
    if (!deletedBlog) res.status(404).send("Blog post does not exist.");
    else res.send(deletedBlog);
  });
};


/* retrieve all blogPosts */
exports.list = function(req, res){
    BlogPost.find({}, (err, blogPost) => {
        if (err) res.status(404).send(err);
        res.json(blogPost);
        console.log('all blog posts retrieved.');
    });
};

/* 
  Middleware: find a blogPost by ID, then pass it to the next request handler. 
 */
exports.blogByID = function(req, res, next, ID) {
  BlogPost.findOne(req.params).exec((err, blogPost) => {
    if(err) res.status(404).send(err);
    else {
      req.blogPost = blogPost;
      next();
    }
  });
};
