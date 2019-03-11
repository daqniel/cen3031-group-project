/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var specialSchema = new Schema({
    // NOTE: do we really need a specialID? 
    // maybe we can just use the _id
    specialID: Number, //(KEY) number associated with post, increments starting at 1 per post
    specialName : String, //headline of special deal
    description: String, //more detailed information about special, including vendor
    expireDate: Date, //day when special will expire and no longer be valid
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
specialSchema.pre('save', function(next) {
    this.updatedDate = new Date;
    if(!this.createdDate)
    {
        this.createdDate = new Date;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Special = mongoose.model('Special', specialSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Special;
