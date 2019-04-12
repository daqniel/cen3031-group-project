var mongoose = require("mongoose"),
  bcrypt = require("bcryptjs"),
  Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  name: {
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
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        /* unholy regex copy-pasted from stack overflow */
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      }
    }
  },
  password: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        //* US Phone number format, does she use any foreign vendors?*/
        /* regex by Igor Kravtsov http://regexlib.com/REDetails.aspx?regexp_id=58 */
        return /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/.test(
          v
        );
      }
    }
  },
  isAdmin: Boolean, //enables user to access admin pages and functions
  createdDate: Date,
  updatedDate: Date
});

/* create a 'pre' function that adds the updatedDate (and createdDate if not already there) property */
userSchema.pre("save", function(next) {
  this.updatedDate = new Date();
  if (!this.createdDate) {
    this.createdDate = new Date();
  }
  next();
});

userSchema.statics.hashPassword = function(password, callback) {
  /* Hash password and save to database */
  if (password) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        callback(hash);
      });
    });
  } else {
    callback(password);
  }
};

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model("User", userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
