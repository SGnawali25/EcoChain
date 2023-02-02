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
  if (can) {
    can.coordinates = req.body.coordinates || can.coordinates;
    can.totalCapacity = req.body.totalCapacity || can.totalCapacity;
    can.capacityFilled = req.body.capacityFilled || can.capacityFilled;
    await can.save();
    res.json(can);
  } else {
    throw new AppError('Garbage can not found', 404);
  }
});

const validatePassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.params;
  console.log(req.user);
  if (password === process.env.CAN_PASSWORD) {
    const token = await jwt.sign(
      { userId: req.user._id, canId: id },
      process.env.JWT_SECRET || 'somesecretkey',
      {
        expiresIn: '120s',
      }
    );
    res.status(200).json({
      status: 'success',
      message: `Hi ${req.user.username}! You have authenticated successfully! Opening the can for 120 seconds.`,
      token,
    });
  } else {
    throw new AppError('Invalid password', 401);
  }
});

const calculateWaste = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const can = await GarbageCan.findById(id);
  if (can) {
    const { capacityFilled, totalCapacity } = can;
    const waste = (capacityFilled / totalCapacity) * 100;
    res.status(200).json({
      status: 'success',
      waste,
    });
  } else {
    throw new AppError('Garbage can not found', 404);
  }
});

export { getCans, getCan, createCan, deleteCan, updateCan, validatePassword };
