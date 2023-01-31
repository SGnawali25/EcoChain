import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    garbageCan: {
      type: Schema.Types.ObjectId,
      ref: 'garbageCans',
      required: true,
    },
    wasteRecycled: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('transactions', transactionSchema);

export default Transaction;
