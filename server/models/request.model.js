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
    //Names and birthdays of each person traveling. At least one traveler is required
    traveler1: {name: String, birthDate: Date, required: true},
    traveler2: {name: String, birthDate: Date},
    traveler3: {name: String, birthDate: Date},
    traveler4: {name: String, birthDate: Date},
    traveler5: {name: String, birthDate: Date},
    traveler6: {name: String, birthDate: Date},
    traveler7: {name: String, birthDate: Date},
    traveler8: {name: String, birthDate: Date},
    party: {
        children: Number,
        adults: Number
    },
    wantTravelInsurance: Boolean,
    wantCruise: Boolean,
    //text field is for other travel notes
    text: String,
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
requestSchema.pre('save', function(next) {
    if(this.party.children < 0) this.party.children = 0;
    if(this.party.adults < 0) this.party.adults = 0;
    this.party.size = this.party.children + this.party.adults;

    if(this.budget.min < 0) this.budget.min = 0;
    if(this.budget.max < 0) this.budget.max = 0;

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
