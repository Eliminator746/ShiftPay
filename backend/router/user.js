import { Router } from "express";
import jwt from "jsonwebtoken";
import jwtSecretPassword from "../config.js";
import { Users, Accounts } from "../db.js";
import { UserValidation, SigninBody, updateBody } from "../types.js";
import { authMiddleware } from "../middleware/middleware.js";
const router = Router();

//----------------------------------------------------------------------------------------
//                                    SignUp
//----------------------------------------------------------------------------------------
router.post("/signup", async (req, res) => {
  const { firstName, lastName, password, username } = req.body;
  const bool = UserValidation.safeParse(req.body).success;

  if (!bool) {
    return res.status(400).send("Input fields missing");
  }

  const userPresent = await Users.findOne({ username });
  if (userPresent) {
    return res.status(409).json({
      mess: "User already created",
    });
  }

  const currentUser = await Users.create({
    username,
    firstName,
    lastName,
    password,
  });

  //------------------------Giving user random Bank Balance---------------------------------
  // Create new Account
  const bal = Math.floor(Math.random() * 10000) + 1;
  await Accounts.create({
    userId: currentUser._id,
    balance: bal,
  });

  return res.json({
    message: "User created successfully",
    balance: "User has the balance : " + bal + " in their account.",
  });
});

//----------------------------------------------------------------------------------------
//                                    SignIn
//----------------------------------------------------------------------------------------
router.post("/signin", async (req, res) => {
  console.log(req.body);

  const isValid = SigninBody.safeParse(req.body).success;
  if (!isValid) {
    return res.status(400).send("Invalid Input");
  }

  const user = await Users.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!user) {
    return res.status(411).json({
      message: "User not found",
    });
  }

  // Create JWT TOKEN
  const userId = user._id;
  const accessToken = jwt.sign({ userId }, jwtSecretPassword);

  return res.json({
    userId: req.userId,
    accessToken: accessToken,
  });
});

router.get("/currentuser", authMiddleware, async (req, res) => {
  if (!req.userId)
    return res.status(400).json({ message: "User ID not found" });
  const user= await Users.findById(req.userId)
  console.log(user);
  
  return res.status(200).json({ user: user.firstName });
});

//----------------------------------------------------------------------------------------
//                                    Update User Details
//----------------------------------------------------------------------------------------
router.put("/", authMiddleware, async (req, res) => {
  const input = req.body;
  const success = updateBody.safeParse(input).success;

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  const updatedVal = await Users.updateOne(
    { _id: req.userId },
    { $set: input }
  );

  res.status(200).json({
    message: "Updated successfully",
  });
});

//----------------------------------------------------------------------------------------
//                                    Filter in SearchBar
//  Searches users by firstname or lastname
//  It returns the `username`, `firstName`, and `lastName` of matching users.
//----------------------------------------------------------------------------------------
router.get("/bulk", authMiddleware, async (req, res) => {
  const query = req.query.filter || "";

  const searchIndb = await Users.find({
    $or: [
      { firstName: { $regex: new RegExp(query, "i") } },
      { lastName: { $regex: new RegExp(query, "i") } },
    ],
  });

  res.json({
    user: searchIndb.map((items) => ({
      username: items.username,
      firstName: items.firstName,
      lastName: items.lastName,
      userId: items._id,
    })),
  });
  // We aren't sending password in response
});

export default router;
