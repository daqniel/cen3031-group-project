/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var vendorSchema = new Schema({
    name: String, //(KEY) number associated with note
    description: String, //what kind of company the vendor is
    phoneNumber: String,
    email: String,
    website: String,
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
vendorSchema.pre('save', function(next) {
    this.updatedDate = new Date;
    if(!this.createdDate)
    {
        this.createdDate = new Date;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Vendor = mongoose.model('Vendor', vendorSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Vendor;
