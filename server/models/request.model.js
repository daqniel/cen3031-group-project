/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var requestSchema = new Schema({
    clientId : {
        type: String,
        required: true
    }, //will use key value associated with User, namely User.email
    requestState: {
        type: String,
        enum: ['Declined', 'Pending', 'Accepted', 'Resolved'],
        default: 'Pending',
        required: true
    }, //Shows state of request, can be one of the following: Declined, Pending, or Accepted
    budget: {
        min: Number,
        max: Number
    },
    location: {
        from: String,
        to: String
    },
    travelDates: {
        departing: Date,
        returning: Date
    },
    numChildren: {
        required: true,
        type: Number
    },
    numAdults: {
        required: true,
        type: Number
    },
    partySize: Number,
    wantTravelInsurance: Boolean,
    wantCruise: Boolean,

    //text field is for other travel notes
    text: String,
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
requestSchema.pre('save', function(next) {

    if(this.budget.min < 0) this.budget.min = 0;
    if(this.budget.max < 0) this.budget.max = 0;
    if(this.numChildren < 0) this.numChildren = 0;
    if(this.numAdults < 0) this.numAdults = 0;

    this.partySize = this.numChildren + this.numAdults;

    this.updatedDate = new Date;
    if(!this.createdDate)
    {
        this.createdDate = new Date;
    }
    next();
});

/* Use schema to instantiate a Mongoose model */
var Request = mongoose.model('Request', requestSchema);

/* Export the model to make it available to other parts of your Node application */
module.exports = Request;
