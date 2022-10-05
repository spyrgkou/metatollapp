const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please enter a username.'],
  },
  password: {
    type: String,
    minlength: [6, "Minimum password length is 6 characters"],
    required: [true, 'Please enter a password.'],
  },
  role: {
    type: String,
    default: "Basic",
    required: [true, 'Please enter a role.'],
  },
  name: {
    type: String,
    unique: true,
    required: [true, 'Please enter a name.'],
  },
  abbrevation: {
    type: String,
    unique: true,
    uppercase: true,
    required: [true, 'Please enter an abbrevation'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email']
  }
})

UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log("successful save");
})

UserSchema.statics.login = async function(username, password) {
  const user = await this.findOne({username});
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  } else {
    throw Error("incorrect username");
  }
}

module.exports = mongoose.model("Users", UserSchema);
