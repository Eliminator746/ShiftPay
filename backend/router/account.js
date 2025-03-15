const express = require("express");
// Single routing
const router = express.Router();

const { Accounts } = require("../db.js");

const jwt = require("jsonwebtoken");
const jwtSecretPassword = require("../config.js");

const cors = require("cors");
const app = express();
app.use(cors());

const { authMiddleware } = require("../middleware/middleware.js");
const { default: mongoose } = require("mongoose");

//----------------------------------------

router.get("/balance", authMiddleware, async (req, res) => {
  const currentUserAccount = await Accounts.findOne({ userId: req.userId });

  if(!currentUserAccount){
    return res.status(411).json({
      msg : "Something went wrong!!"
  })
}
  res.json({
    balance: currentUserAccount.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const body = req.body;

  try {
    const currentUserBalance = await Accounts.findOne({ userId: req.userId }).session(session);

    if ( !currentUserBalance || body.amount > currentUserBalance.balance) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient Balance" });
    }

    
    // Get the recipient's account
    const toAccount = await Accounts.findOne({ userId: body.to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Account",
      });
    }

    //You send money, what to code. We've to Update db, isn't it

    // const currentBalance=await Accounts.updateOne({userId:req.userId},{balance:currentUserBalance.balance-body.amount})
    await Accounts.updateOne(
      { userId: req.userId },
      { $inc: { balance: -body.amount } }
    
    ).session(session);
    await Accounts.updateOne(
      { userId: body.to },
      { $inc: { balance: body.amount } }
    
    ).session(session);

    await session.commitTransaction();
    session.endSession(); // Always end the session after transaction

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    // If an error occurred, abort the whole transaction and
    // undo any changes that might have happened
    await session.abortTransaction();
    session.endSession();
     res.status(500).json({ error: "Transaction failed", details: error.message });
  }
});

module.exports = router;

//Problem in post transfer. It is not working. Error is coming


