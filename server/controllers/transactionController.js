import asyncHandler from 'express-async-handler';
import GarbageCan from '../models/garbageCanModel.js';
import { AppError } from '../utils/errorUtils.js';
import Transaction from '../models/transactionModel.js';
import Mongoose from 'mongoose';

const addTransaction = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const wasteRecycled = req.body.wasteRecycled;
  const can = await GarbageCan.findById(req.params.id);
  if (!can) {
    next(new AppError('Invalid Garbage Can Id', 400));
  }
  if (can.capacityFilled + wasteRecycled <= can.totalCapacity) {
    const newTransaction = {
      user: user._id,
      garbageCan: can._id,
      wasteRecycled: wasteRecycled,
    };
    const transaction = await Transaction.create(newTransaction);
    user.transactions.push(transaction._id);
    user.ecoCoins += wasteRecycled;
    await user.save();
    can.capacityFilled += wasteRecycled;
    await can.save();
    res.status(201).json({
      message: 'Transaction successful',
      user: user,
    });
  } else {
    next(new AppError('Waste overload! Remove some waste and try again!', 400));
  }
});

export { addTransaction };
