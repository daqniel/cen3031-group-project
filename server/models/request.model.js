/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var partySchema = new Schema({
    children: [{
        age: Number
    }],
    adults: [{
        age: Number
    }]
});

partySchema.pre('save', next => {
    this.size = children.length + adults.length;
    this.minAge = Math.min(...children)
});

var requestSchema = new Schema({
    // requestID: Number, //(KEY) number associated with request, ideally starts at 1 and increases as requests are made
    clientID : String, //will use key value associated with User, namely User.email
    //TODO: validate states
    requestState: String, //Shows state of request, can be one of the following: Declined, Pending, or Accepted
    price:{
        min: Number,
        max: Number
    },
   // groupSize: Number,
      /* I think it may be better to implement this way,
       age information could be useful to her. I think this
       info should be required. */
    party: {
        type: partySchema,
        required: true
    },
    // party: [{
    //     children: [{
    //         age: Number
    //     }],
    //     adults: [{
    //         age: Number
    //     }],
    //     required: true
    // }],
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
requestSchema.pre('save', function(next) {
    this.updatedDate = new Date;
    if(!this.createdDate)
    {
        this.createdDate = new Date;
    }
    next();
});

// tripSchema.pre('save', (next) => {
//     this.numDays = (this.endDate - this.startDate)/86400000;
//     next();
// })

/* Use your schema to instantiate a Mongoose model */
var Request = mongoose.model('Request', requestSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Request;
