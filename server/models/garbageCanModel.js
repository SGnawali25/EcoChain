import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const garbageCanSchema = new Schema(
  {
    coordinates: {
      type: String,
      required: true,
      unique: true,
    },
    totalCapacity: {
      type: Number,
      required: true,
      default: 10,
    },
    capacityFilled: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const GarbageCan = mongoose.model('garbageCans', garbageCanSchema);

export default GarbageCan;
