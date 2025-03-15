const express = require("express");
// Single routing
const router = express.Router();

//-------------
const { Users,Accounts } = require("../db.js");
const { UserValidation, inputValidation } = require("../types.js");
const jwt = require("jsonwebtoken");
const jwtSecretPassword = require("../config.js");

const cors = require("cors");
const app = express();
app.use(cors());

//-------------
const { authMiddleware } = require("../middleware/middleware.js");

//-----------

router.post("/signup", async (req, res) => {
  const { firstName, lastName, password, username } = req.body;
  const bool = UserValidation.safeParse(req.body).success;

  if (!bool) {
    return res.status(400).send("Invalid Input");
  }

  const userPresent = await Users.findOne({ username });
  if (userPresent) {
    return res.status(409).json({
      mess: "User already created",
    });
  }

  //await Users.create(req.body)
  //changed here, added currentUser so that we can use this user id, in jwt sign
  const currentUser = await Users.create({
    username,
    firstName,
    lastName,
    password,
  });
  // we create the jwt token and also send it to user.
  const userId = currentUser._id;
  const accessToken = jwt.sign({ userId }, jwtSecretPassword);

  // giving user random wallet/bank balance
  //-----------Create new Account -------------------------
await Accounts.create({
  userId,
  balance : 1 + Math.floor(Math.random() * 10000)
})


  return res.json({
    message: "User created successfully",
    accessToken: accessToken,
  });
});

router.get("/signin", authMiddleware, async (req, res) => {
  const body = req.body;
  const isValid = UserValidation.safeParse(body).success;

  if (!isValid) {
    return res.send("Invalid Input");
  }

  //changed here userId: userId to userId: req.userId, req.userId coming from middleware
  res.json({
    userId: req.userId,
  });
});

//*****************************************PUT*******************************************/
//Here we first authenticate the user using the middleware and then with the request having the new userId attached to it, 
//In this route we update the row of users with that userid with whatever be the field is given to the req body
router.put("/", authMiddleware, async (req, res) => {
  //Verification of user is done using authentication token provided in header which is taken care by authMiddleware

  const body = req.body;

  const correctInput = inputValidation.safeParse(body);
  const success = inputValidation.safeParse(body).success;
  // console.log(correctInput);

  if (!success) {
    res.send("Invalid Input");
  }

  const updatedInputs = {};
  if (correctInput.data.firstName !== undefined) {
    updatedInputs.firstName = correctInput.data.firstName;
  }
  if (correctInput.data.lastName !== undefined) {
    updatedInputs.lastName = correctInput.data.lastName;
  }
  if (correctInput.data.password !== undefined) {
    updatedInputs.password = correctInput.data.password;
  }

  const updatedVal = await Users.updateOne(
    { _id: req.userId }, // Filter: find the user with this _id
    { $set: updatedInputs } // Update: apply the fields in updatedInputs
  );

  res.send("Updated Successfully");
});

//This end point will return the usernames, firstname and lastname of those user whose either firstname or lastname matches with the filter
//given to it.
router.get("/bulk", authMiddleware, async (req, res) => {
  const query = req.query.filter;

  const searchIndb = await Users.find({
    $or: [
      { firstName: { $regex: new RegExp(query, "i") } },
      { lastName: { $regex: new RegExp(query, "i") } },
    ],
  });
  //new RegExp : This creates a regular expression dynamically based on the value of query.

  res.json({
    user: searchIndb.map((items) => ({
      username: items.username,
      firstName: items.firstName,
      lastName: items.lastName,
      userId: items._id,
    }))
    //Except password, you can show everything
  });
});



module.exports = router;

//What we are doing in PUT req.
//Users can give any field, like firstName, lastName, password, and accordingly updating it in db
