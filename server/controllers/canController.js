import asyncHandler from 'express-async-handler';
import GarbageCan from '../models/garbageCanModel.js';
import { AppError } from '../utils/errorUtils.js';
import jwt from 'jsonwebtoken';

const getCans = asyncHandler(async (req, res, next) => {
  const cans = await GarbageCan.find({});
  res.status(200).json({
    status: 'success',
    data: cans,
  });
});

const getCan = asyncHandler(async (req, res, next) => {
  const can = await GarbageCan.findById(req.params.id);
  if (can) {
    res.json(can);
  } else {
    res.status(404);
    throw new AppError('Garbage can not found', 404);
  }
});

const createCan = asyncHandler(async (req, res, next) => {
  const can = await GarbageCan.create(req.body);
  res.status(201).json(can);
});

const deleteCan = asyncHandler(async (req, res, next) => {
  const can = await GarbageCan.findByIdAndDelete(req.params.id);
  if (can) {
    res.json(can);
  } else {
    throw new AppError('Garbage can not found', 404);
  }
});

const updateCan = asyncHandler(async (req, res, next) => {
  let can = await GarbageCan.findById(req.params.id);
  console.log(req.body);
  if (can) {
    can.coordinates = req.body.coordinates || can.coordinates;
    can.totalCapacity = req.body.totalCapacity || can.totalCapacity;
    can.capacityFilled =
      req.body.capacityFilled.toString() || can.capacityFilled;
    await can.save();
    res.json(can);
  } else {
    throw new AppError('Garbage can not found', 404);
  }
});

const validatePassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.params;
  if (password === process.env.CAN_PASSWORD) {
    const token = jwt.sign(
      { userId: req.user._id, canId: id },
      process.env.JWT_SECRET || 'somesecretkey',
      {
        expiresIn: '180s',
      }
    );
    res.status(200).json({
      status: 'success',
      message: `Hi ${req.user.username}! You have authenticated successfully! Opening the can for 180 seconds.`,
      token,
    });
  } else {
    throw new AppError('Invalid password', 401);
  }
});

const genRand = (min, max, decimalPlaces) => {
  const rand = Math.random() * (max - min) + min;
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
};

const calculateWaste = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { recycleToken } = req.body;
  const can = await GarbageCan.findById(id);
  if (can) {
    const { capacityFilled, totalCapacity } = can;
    const waste = genRand(0, totalCapacity - capacityFilled, 2);
    const decoded_data = jwt.verify(recycleToken, process.env.JWT_SECRET);
    if (
      decoded_data.canId !== id ||
      decoded_data.userId !== req.user._id.toString()
    ) {
      throw new AppError('Invalid token!', 401);
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const token = jwt.sign(
      {
        waste,
        canId: id,
        userId: req.user._id.toString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({
      status: 'success',
      data: waste,
      token,
    });
  } else {
    throw new AppError('Garbage can not found', 404);
  }
});

export {
  getCans,
  getCan,
  createCan,
  deleteCan,
  updateCan,
  validatePassword,
  calculateWaste,
};
