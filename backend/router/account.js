import { Router } from 'express';
import { Accounts } from "../db.js";
import { authMiddleware } from "../middleware/middleware.js";
import mongoose from 'mongoose';
const router = Router();

//----------------------------------------------------------------------------------------
//                                    Get the User Balance
//----------------------------------------------------------------------------------------
router.get("/balance", authMiddleware, async (req, res) => {

  const currentUserAccount = await Accounts.findOne({ userId: req.userId });

  if (!currentUserAccount) {
    return res.status(400).json({
      msg: "Something went wrong!!",
    });
  }
  res.json({
    balance: currentUserAccount.balance,
  });
});

//----------------------------------------------------------------------------------------
//                                    Transfer money to another a/c
//----------------------------------------------------------------------------------------
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;

  try {
    const currentUserBalance = await Accounts.findOne({
      userId: req.userId,
    }).session(session);

    if (!currentUserBalance || amount > currentUserBalance.balance) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient Balance" });
    }

    // Get the recipient's account
    const toAccount = await Accounts.findOne({ userId: to }).session(
      session
    );
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Account",
      });
    }

    await Accounts.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    
    await Accounts.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    return res.json({
      message: "Transfer successfull",
    });

  } catch (error) {
    
    // If an error occurred, abort the whole transaction and undo any changes that might have happened
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .json({ error: "Transaction failed", details: error.message });

  } finally {
    
    // Ensure session ends whether the transaction succeeds or fails
    session.endSession();
  }
});

export default router;