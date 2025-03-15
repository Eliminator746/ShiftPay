import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://equilita:ZedtZoyXDJO7e4z9@shiftpay.t8wqf.mongodb.net/?retryWrites=true&w=majority&appName=ShiftPay"
);

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

export { Users, Accounts };
