/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var requestSchema = new Schema({
    clientID : {
        type: String,
        required: true
    }, //will use key value associated with User, namely User.email
    requestState: {
        type: String,
        enum: ['Declined', 'Pending', 'Accepted', 'Resolved'],
        required: true
    }, //Shows state of request, can be one of the following: Declined, Pending, or Accepted
    budget: {
        // NOTE: Ask client if we should require budget information or not
        min: Number,
        max: Number
    },
    party: {
        children: Number,
        adults: Number
    },
    // Depending on what kind of info the client wants, we could add date ranges, or desired length of trip in days
    // for now that info could just be in the text field.
    text: String,
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
requestSchema.pre('save', function(next) {
    if(this.party.children < 0) this.party.children = 0;
    if(this.party.adults < 0) this.party.adults = 0;
    this.party.size = this.party.children + this.party.adults;
    this.updatedDate = new Date;
    if(!this.createdDate)
    {
        this.createdDate = new Date;
    }
    next();
});

/* Use schema to instantiate a Mongoose model */
var Request = mongoose.model('Request', requestSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Request;
