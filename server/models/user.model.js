/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
    name: { //first and last name of client associated with account
        first: {
            type: String,
            required: true
        },
        middle: String,
        last: {
            type: String,
            required: true
        }
    },
    /* NOTE: currently unhashed */
    email: {
        type: String,
        validate: {
            validator: function (v) {
                /* unholy regex copy-pasted from stack overflow */
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            }
        },
        required: true
    }, //(KEY) used for contact and clientID
    password: {
        type: String,
        required: true
    }, //will be hashed

    //TODO: Normalize phone number format
    phoneNumber: {
        type: String,
        validate: {
            validator: function (v) {
                /* US Phone number format, NOTE: does she use any foreign vendors?*/
                /* regex by Igor Kravtsov http://regexlib.com/REDetails.aspx?regexp_id=58 */
                return /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/.test(v);
            }
        }
    },
    isAdmin: Boolean, //enables user to access admin pages and functions
    createdDate: Date,
    updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
userSchema.pre('save', function (next) {
    this.updatedDate = new Date;
    if (!this.createdDate) {
        this.createdDate = new Date;
    }
    next();
});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);

//TODO: look into password hashing
//TODO: Look into passport.js

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;