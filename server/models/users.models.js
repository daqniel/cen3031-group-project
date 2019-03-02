/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
    name: { //first and last name of client associated with account
        first: String,
        last: String,
    },
    password : String, //will be hashed
    username: String, //(KEY) uniquely identifies each client
    email: String, //(KEY) used for contact and uniquely def
    phoneNumber: String, //for contact
    isAdmin: Boolean, //enables user to access admin pages and functions
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
userSchema.pre('save', function(next) {
    this.updatedDate = new Date;
    if(!this.createdDate)
    {
        this.createdDate = new Date;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;