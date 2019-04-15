var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var blogPostSchema = new Schema({
    title: { type: String, required: true }, /* Heading, REQUIRED */
    text: String, 
    createdDate: Date,
    updatedDate: Date
});

/* add created/updated date */
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