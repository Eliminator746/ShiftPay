const mongoose = require("mongoose");
const { number } = require("zod");
// mongoose.connect("mongodb://localhost:27017/payment_app?" +
//   'replicaSet=rs');
mongoose.connect("mongodb://localhost:27017/payment_app?directConnection=true" );

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const Users = mongoose.model("Users", userSchema);
const Accounts = mongoose.model("Accounts", accountSchema);

module.exports = {
  Users,Accounts
};
