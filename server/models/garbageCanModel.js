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
      default: 100,
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

garbageCanSchema.pre('validate', function (next) {
  if (this.capacityFilled > this.totalCapacity) {
    next(
      new Error('Capacity filled cannot be greater than the total capacity')
    );
  } else {
    next();
  }
});

const GarbageCan = mongoose.model('garbageCans', garbageCanSchema);

export default GarbageCan;
