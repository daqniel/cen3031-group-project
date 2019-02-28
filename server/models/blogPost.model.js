/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var blogPostSchema = new Schema({
    blogID: Number, //(KEY) number associated with post, increments starting at 1 per post
    title: String, //heading
    text: String, //body of post
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
blogPostSchema.pre('save', function(next) {
    this.updatedDate = new Date;
    if(!this.createdDate)
    {
        this.createdDate = new Date;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var BlogPost = mongoose.model('BlogPost', blogPostSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = BlogPost;