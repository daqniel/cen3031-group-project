/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var recommendationSchema = new Schema({
    recommendID: Number, //(KEY) number associated with recommendation, matches corresponding requestID
    clientID : String, //will use key value associated with User, namely User.email
    price: Number,
    travelDate: Date,
    groupSize: Number,
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
recommendationSchema.pre('save', function(next) {
    this.updatedDate = new Date;
    if(!this.createdDate)
    {
        this.createdDate = new Date;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Recommendation = mongoose.model('Recommendation', recommendationSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Recommendation;
